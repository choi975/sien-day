const INITIAL_DATES = ["2026-03-28", "2026-04-25", "2026-05-23", "2026-06-18"];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (url.pathname === "/api/period-dates") {
      if (request.method === "GET") {
        return json(await listDates(env));
      }

      if (request.method === "PUT") {
        const body = await request.json().catch(() => null);
        const dates = normalizeDates(body?.dates);

        if (!dates.length) {
          return json({ error: "请至少保留一个日期。" }, 400);
        }

        await replaceDates(env, dates);
        return json(await listDates(env));
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

async function ensureSeeded(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS period_dates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_date TEXT NOT NULL UNIQUE,
      is_confirmed INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `).run();

  const first = await env.DB.prepare("SELECT COUNT(*) AS count FROM period_dates").first();
  if (first?.count) return;

  const statements = INITIAL_DATES.map((date) =>
    env.DB.prepare("INSERT OR IGNORE INTO period_dates (start_date, is_confirmed) VALUES (?, 1)").bind(date),
  );
  await env.DB.batch(statements);
}

async function listDates(env) {
  await ensureSeeded(env);
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
  await ensureSeeded(env);
  const statements = [
    env.DB.prepare("DELETE FROM period_dates"),
    ...dates.map((date) =>
      env.DB.prepare("INSERT INTO period_dates (start_date, is_confirmed) VALUES (?, 1)").bind(date),
    ),
  ];
  await env.DB.batch(statements);
}

function normalizeDates(input) {
  if (!Array.isArray(input)) return [];

  return [...new Set(input)]
    .filter((value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value))
    .filter((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()))
    .sort();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,PUT,OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}
