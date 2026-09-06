/**
 * Демо-данные: админ + 3 студента с реалистичным прогрессом.
 * Запуск:  npm run seed
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const EMPTY = { xp: 0, completed: {}, quiz: {}, tasks: {}, editors: {}, days: {}, events: [] };

// id уроков соответствуют фронтенду (src/data/*.ts)
const LESSONS = [
  ...Array.from({ length: 9 }, (_, i) => `j${i + 1}`),
  ...Array.from({ length: 9 }, (_, i) => `m${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `b${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `s${i + 1}`),
  ...Array.from({ length: 6 }, (_, i) => `n${i + 1}`),
];
const TOTAL = LESSONS.length; // 37

function makeProgress(doneCount, spreadDays, lastActiveDaysAgo) {
  const p = JSON.parse(JSON.stringify(EMPTY));
  const now = Date.now();
  const done = LESSONS.slice(0, doneCount);
  done.forEach((id, i) => {
    // завершение «размазано» по прошлому, последнее — недавно
    const daysAgo = Math.max(0, lastActiveDaysAgo - Math.round(i * (spreadDays / Math.max(doneCount, 1))));
    const ts = now - daysAgo * 86400000 - (i % 5) * 3600000;
    p.completed[id] = ts;
    const day = new Date(ts).toISOString().slice(0, 10);
    p.days[day] = (p.days[day] || 0) + 50;
    p.events.push({ ts, text: `Урок пройден: ${id}`, xp: 50 });
    p.xp += 50;
  });
  p.events.sort((a, b) => b.ts - a.ts);
  return p;
}

async function main() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "jsmaster",
  });

  const users = [
    { name: "Дмитрий Соколов", email: "admin@jsmaster.ru", pass: "admin123", role: "admin", progress: makeProgress(12, 30, 1) },
    { name: "Мария Орлова", email: "maria@demo.ru", pass: "demo123", role: "user", progress: makeProgress(11, 18, 0) },
    { name: "Илья Волков", email: "ilya@demo.ru", pass: "demo123", role: "user", progress: makeProgress(5, 8, 2) },
    { name: "Аня Кузнецова", email: "anya@demo.ru", pass: "demo123", role: "user", progress: makeProgress(24, 40, 0) },
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.pass, 10);
    const [[{ already }]] = await pool.query("SELECT COUNT(*) AS already FROM users WHERE email = ?", [u.email]);
    if (already) {
      console.log(`— ${u.email} уже существует, пропускаем`);
      continue;
    }
    const [res] = await pool.execute(
      "INSERT INTO users (name, email, password_hash, role, demo, last_login_at) VALUES (?, ?, ?, ?, 1, NOW())",
      [u.name, u.email, hash, u.role]
    );
    const lessonsDone = Object.keys(u.progress.completed).length;
    const tasksDone = lessonsDone * 2;
    await pool.execute(
      "INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data) VALUES (?, ?, ?, ?, ?)",
      [res.insertId, u.progress.xp, lessonsDone, tasksDone, JSON.stringify(u.progress)]
    );
    console.log(`+ ${u.email} (${u.role}) — ${lessonsDone}/${TOTAL} уроков, ${u.progress.xp} XP`);
  }

  await pool.end();
  console.log("Готово. Вход: admin@jsmaster.ru / admin123");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
