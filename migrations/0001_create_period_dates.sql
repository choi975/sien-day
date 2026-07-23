CREATE TABLE IF NOT EXISTS period_dates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start_date TEXT NOT NULL UNIQUE,
  is_confirmed INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO period_dates (start_date, is_confirmed)
VALUES
  ('2026-03-28', 1),
  ('2026-04-25', 1),
  ('2026-05-23', 1),
  ('2026-06-18', 1);
