const API_PATH = "/api/period-dates";
const GITHUB_PAGES_ORIGIN = "https://choi975.github.io";
const DEFAULT_INTERVAL_DAYS = 28;
const REMINDER_THRESHOLD_DAYS = 3;
const BEIJING_UTC_OFFSET_MS = 8 * 60 * 60 * 1000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (!isOriginAllowed(request, url)) {
        return json(request, { error: "Origin not allowed" }, 403);
      }

      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(request),
        });
      }

      if (url.pathname !== API_PATH) {
        return json(request, { error: "Not found" }, 404);
      }

      try {
        if (request.method === "GET") {
          return json(request, await listDates(env));
        }

        if (request.method === "PUT") {
          const authError = authenticateWrite(request, env);
          if (authError) return authError;

          const body = await request.json().catch(() => null);
          const validation = validateDates(body?.dates);
          if (!validation.ok) {
            return json(request, { error: validation.error }, 400);
          }

          await replaceDates(env, validation.dates);
          return json(request, await listDates(env));
        }

        return json(request, { error: "Method not allowed" }, 405, {
          allow: "GET, PUT, OPTIONS",
        });
      } catch (error) {
        console.error("period-dates API error", error);
        return json(request, { error: "数据库操作失败，请稍后重试。" }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env) {
    await runScheduled(env);
  },
};

export async function runScheduled(env) {
  const result = await env.DB.prepare(`
    SELECT start_date AS date, is_confirmed AS confirmed
    FROM period_dates
    ORDER BY start_date ASC
  `).all();

  const dates = (result.results || [])
    .map((row) => row.date)
    .filter((date) => typeof date === "string" && isValidDateString(date));

  const prediction = getNextPrediction(dates);
  if (!prediction) {
    return { pushed: false, reason: "no-dates" };
  }

  const { next, remaining } = prediction;
  if (remaining < 0) {
    return { pushed: false, reason: "overdue" };
  }
  if (remaining > REMINDER_THRESHOLD_DAYS) {
    return { pushed: false, reason: "too-far", remaining };
  }

  const pushDate = getTodayIsoDateInBeijing();
  const alreadyPushed = await env.DB.prepare(`
    SELECT 1
    FROM bark_push_log
    WHERE predicted_date = ? AND push_date = ?
  `).bind(next, pushDate).first();
  if (alreadyPushed) {
    return { pushed: false, reason: "already-pushed", remaining };
  }

  if (typeof env.BARK_URL !== "string" || env.BARK_URL.length === 0) {
    console.error("Bark reminder skipped: BARK_URL secret is not configured.");
    return { pushed: false, reason: "no-bark-url" };
  }

  const message = `倒计时：${remaining}天`;
  const barkUrl = `${env.BARK_URL.replace(/\/+$/, "")}/${encodeURIComponent(message)}`;
  const response = await fetch(barkUrl);
  if (!response.ok) {
    throw new Error(`Bark push failed with HTTP ${response.status}`);
  }

  await env.DB.prepare(`
    INSERT OR IGNORE INTO bark_push_log (predicted_date, push_date, message, pushed_at)
    VALUES (?, ?, ?, ?)
  `).bind(next, pushDate, message, new Date().toISOString()).run();

  return { pushed: true, message, remaining, next };
}

export function getNextPrediction(dates) {
  const sorted = [...new Set(dates.filter(isValidDateString))].sort();
  if (sorted.length === 0) return null;

  const last = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  const interval = previous ? daysBetween(previous, last) : DEFAULT_INTERVAL_DAYS;
  const next = addDays(last, interval);
  const remaining = daysBetween(getTodayIsoDateInBeijing(), next);

  return { next, interval, remaining };
}

function getTodayIsoDateInBeijing() {
  const shifted = new Date(Date.now() + BEIJING_UTC_OFFSET_MS);
  return [
    shifted.getUTCFullYear(),
    String(shifted.getUTCMonth() + 1).padStart(2, "0"),
    String(shifted.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function daysBetween(fromIso, toIso) {
  return Math.round(
    (Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / 86400000,
  );
}

function addDays(iso, days) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function listDates(env) {
  const result = await env.DB.prepare(`
    SELECT start_date AS date, is_confirmed AS confirmed
    FROM period_dates
    ORDER BY start_date ASC
  `).all();

  return {
    dates: (result.results || []).map((row) => ({
      date: row.date,
      confirmed: Boolean(row.confirmed),
    })),
  };
}

async function replaceDates(env, dates) {
  const statements = [
    env.DB.prepare("DELETE FROM period_dates"),
    ...dates.map((date) =>
      env.DB.prepare("INSERT INTO period_dates (start_date, is_confirmed) VALUES (?, 1)").bind(date),
    ),
  ];

  // D1 batches are transactional, so a failed insert restores the deleted rows.
  await env.DB.batch(statements);
}

function authenticateWrite(request, env) {
  if (typeof env.EDIT_PASSWORD !== "string" || env.EDIT_PASSWORD.length === 0) {
    return json(request, { error: "服务器尚未配置编辑密码。" }, 503);
  }

  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return json(request, { error: "需要编辑密码。" }, 401, {
      "www-authenticate": 'Bearer realm="sien-day editor"',
    });
  }

  const match = authorization.match(/^Bearer\s+([^\s]+)$/i);
  if (!match) {
    return json(request, { error: "Authorization 格式无效。" }, 401, {
      "www-authenticate": 'Bearer realm="sien-day editor"',
    });
  }

  if (match[1] !== env.EDIT_PASSWORD) {
    return json(request, { error: "编辑密码错误。" }, 403);
  }

  return null;
}

function validateDates(input) {
  if (!Array.isArray(input)) {
    return { ok: false, error: "dates 必须是日期数组。" };
  }

  if (input.length === 0) {
    return { ok: false, error: "请至少保留一个日期。" };
  }

  if (!input.every(isValidDateString)) {
    return { ok: false, error: "日期必须是有效的 YYYY-MM-DD 格式。" };
  }

  return {
    ok: true,
    dates: [...new Set(input)].sort(),
  };
}

function isValidDateString(value) {
  if (typeof value !== "string") return false;

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function isOriginAllowed(request, url) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  return origin === GITHUB_PAGES_ORIGIN || origin === url.origin;
}

function json(request, data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...corsHeaders(request),
      ...extraHeaders,
    },
  });
}

function corsHeaders(request) {
  const origin = request.headers.get("origin");
  const headers = {
    "access-control-allow-methods": "GET, PUT, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };

  if (origin && isOriginAllowed(request, new URL(request.url))) {
    headers["access-control-allow-origin"] = origin;
  }
  return headers;
}
