CREATE TABLE IF NOT EXISTS bark_push_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  predicted_date TEXT NOT NULL,
  push_date TEXT NOT NULL,
  message TEXT NOT NULL,
  pushed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_bark_push_log_dedupe
  ON bark_push_log (predicted_date, push_date);
