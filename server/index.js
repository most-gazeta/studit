/**
 * js://master — REST API (Express + MySQL)
 *
 * Запуск:  cp .env.example .env  →  npm i  →  npm start
 * Фронтенд подключается переменной VITE_API_URL=http://localhost:3001
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const JWT_TTL = "30d";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jsmaster",
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

const EMPTY_PROGRESS = {
  xp: 0, completed: {}, quiz: {}, tasks: {}, editors: {}, days: {}, events: [],
};

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));

// Фронтенд шлёт PUT/PATCH/DELETE как POST + X-HTTP-Method-Override
// (на shared-хостинге Apache часто режет «не-GET/POST» методы).
app.use((req, _res, next) => {
  const ov = req.headers["x-http-method-override"];
  if (req.method === "POST" && typeof ov === "string" && ov) req.method = ov.toUpperCase();
  next();
});

/* ---------------- helpers ---------------- */

const sign = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_TTL });

const publicUser = (u) => ({
  id: String(u.id),
  name: u.name,
  email: u.email,
  role: u.role,
  demo: Boolean(u.demo),
  createdAt: new Date(u.created_at).getTime(),
  lastLoginAt: u.last_login_at ? new Date(u.last_login_at).getTime() : null,
});

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Требуется вход" });
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Сессия истекла — войдите заново" });
  }
}

function adminOnly(req, res, next) {
  if (req.auth.role !== "admin") return res.status(403).json({ error: "Нужны права администратора" });
  next();
}

function computeStreak(days) {
  let streak = 0;
  if (!days) return 0;
  const today = new Date();
  for (let back = 0; back < 400; back++) {
    const key = new Date(today.getTime() - back * 86400000).toISOString().slice(0, 10);
    if (days[key] > 0) streak++;
    else if (back === 0) continue;
    else break;
  }
  return streak;
}

/* ---------------- auth ---------------- */

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || String(name).trim().length < 2)
      return res.status(400).json({ error: "Имя — минимум 2 символа" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim()))
      return res.status(400).json({ error: "Некорректный email" });
    if (!password || String(password).length < 6)
      return res.status(400).json({ error: "Пароль — минимум 6 символов" });

    const hash = await bcrypt.hash(String(password), 10);
    let result;
    try {
      [result] = await pool.execute(
        "INSERT INTO users (name, email, password_hash, last_login_at) VALUES (?, ?, ?, NOW())",
        [String(name).trim(), String(email).trim().toLowerCase(), hash]
      );
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY")
        return res.status(409).json({ error: "Пользователь с таким email уже существует" });
      throw e;
    }
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [result.insertId]);
    const user = rows[0];
    await pool.execute(
      "INSERT INTO progress (user_id, data) VALUES (?, ?)",
      [user.id, JSON.stringify(EMPTY_PROGRESS)]
    );
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [String(email || "").trim().toLowerCase()]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(String(password || ""), user.password_hash)))
      return res.status(401).json({ error: "Неверный email или пароль" });

    await pool.execute("UPDATE users SET last_login_at = NOW() WHERE id = ?", [user.id]);
    user.last_login_at = new Date();
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.get("/api/auth/me", auth, async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [req.auth.id]);
  if (!rows[0]) return res.status(401).json({ error: "Пользователь не найден" });
  res.json({ user: publicUser(rows[0]) });
});

/* ---------------- progress ---------------- */

app.get("/api/progress", auth, async (req, res) => {
  const [rows] = await pool.execute("SELECT data FROM progress WHERE user_id = ?", [req.auth.id]);
  res.json({ progress: rows[0] ? JSON.parse(rows[0].data) : EMPTY_PROGRESS });
});

app.put("/api/progress", auth, async (req, res) => {
  const data = req.body && req.body.progress;
  if (!data || typeof data !== "object")
    return res.status(400).json({ error: "Ожидается { progress: ProgressState }" });

  const merged = { ...EMPTY_PROGRESS, ...data };
  const lessonsDone = Object.keys(merged.completed || {}).length;
  const tasksDone = Object.values(merged.tasks || {}).reduce(
    (s, m) => s + Object.values(m || {}).filter(Boolean).length, 0
  );

  await pool.execute(
    `INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE xp = VALUES(xp), lessons_done = VALUES(lessons_done),
       tasks_done = VALUES(tasks_done), data = VALUES(data)`,
    [req.auth.id, merged.xp || 0, lessonsDone, tasksDone, JSON.stringify(merged)]
  );

  // новые события — в журнал (по ts)
  const events = Array.isArray(merged.events) ? merged.events : [];
  if (events.length) {
    const [[{ max_ts }]] = await pool.query(
      "SELECT COALESCE(MAX(ts), 0) AS max_ts FROM xp_events WHERE user_id = ?",
      [req.auth.id]
    );
    const fresh = events.filter((e) => e && e.ts > max_ts).slice(0, 50);
    for (const e of fresh) {
      await pool.execute(
        "INSERT INTO xp_events (user_id, ts, text, xp) VALUES (?, ?, ?, ?)",
        [req.auth.id, e.ts, String(e.text || "").slice(0, 255), Number(e.xp) || 0]
      );
    }
  }
  res.json({ ok: true });
});

/* ---------------- admin ---------------- */

app.get("/api/admin/stats", auth, adminOnly, async (_req, res) => {
  const [rows] = await pool.execute(`
    SELECT u.id, u.name, u.email, u.role, u.demo, u.created_at, u.last_login_at,
           p.xp, p.data
    FROM users u
    LEFT JOIN progress p ON p.user_id = u.id
    ORDER BY u.created_at ASC
  `);
  const stats = rows.map((r) => {
    const progress = r.data ? JSON.parse(r.data) : { ...EMPTY_PROGRESS };
    const lessonsDone = Object.keys(progress.completed || {}).length;
    const tasksDone = Object.values(progress.tasks || {}).reduce(
      (s, m) => s + Object.values(m || {}).filter(Boolean).length, 0
    );
    const eventTs = (progress.events || []).map((e) => e.ts || 0);
    const lastActivity = Math.max(
      r.last_login_at ? new Date(r.last_login_at).getTime() : 0,
      ...eventTs,
      ...Object.values(progress.completed || {}),
      0
    );
    const TOTAL_LESSONS = 37;
    return {
      user: publicUser(r),
      progress,
      lessonsDone,
      tasksDone,
      percent: Math.round((lessonsDone / TOTAL_LESSONS) * 100),
      streak: computeStreak(progress.days),
      lastActivity,
    };
  });
  res.json({ stats });
});

app.patch("/api/admin/users/:id", auth, adminOnly, async (req, res) => {
  const { role } = req.body || {};
  if (role !== "user" && role !== "admin")
    return res.status(400).json({ error: "Роль должна быть 'user' или 'admin'" });
  if (String(req.params.id) === String(req.auth.id))
    return res.status(400).json({ error: "Нельзя менять роль самому себе" });
  await pool.execute("UPDATE users SET role = ? WHERE id = ?", [role, req.params.id]);
  res.json({ ok: true });
});

app.post("/api/admin/users/:id/reset", auth, adminOnly, async (req, res) => {
  await pool.execute("DELETE FROM progress WHERE user_id = ?", [req.params.id]);
  await pool.execute(
    "INSERT INTO progress (user_id, data) VALUES (?, ?)",
    [req.params.id, JSON.stringify(EMPTY_PROGRESS)]
  );
  await pool.execute("DELETE FROM xp_events WHERE user_id = ?", [req.params.id]);
  res.json({ ok: true });
});

app.delete("/api/admin/users/:id", auth, adminOnly, async (req, res) => {
  if (String(req.params.id) === String(req.auth.id))
    return res.status(400).json({ error: "Нельзя удалить собственный аккаунт" });
  await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]); // CASCADE чистит прогресс
  res.json({ ok: true });
});

/* ---------------- misc ---------------- */

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch {
    res.status(500).json({ ok: false, db: "unreachable" });
  }
});

app.listen(PORT, () => {
  console.log(`js://master API слушает http://localhost:${PORT}`);
  console.log(`MySQL: ${process.env.DB_HOST || "localhost"}/${process.env.DB_NAME || "jsmaster"}`);
});
