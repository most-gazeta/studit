<?php
/**
 * js://master — настройки PHP API (cPanel + MySQL)
 *
 * ВАЖНО: пароль БД был опубликован в переписке — смените его в cPanel
 * (MySQL Databases → Set Password) и обновите здесь.
 */

// ---- База данных (cPanel) ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'mostnews_studit');
define('DB_USER', 'mostnews_studit');
define('DB_PASS', 'EsH68!zLfA6*');   // ← смените после публикации!

// ---- Безопасность ----
// Секрет подписи JWT-токенов. Замените на случайную строку от 64 символов,
// например: openssl rand -hex 32
define('JWT_SECRET', 'jsmaster-P0MeH9Te-JWT_SECRET-6f3a9c41d8e7b2560a1f4e9c7d3b8562');

// Ключ для разового создания демо-данных (seed.php?key=...)
define('SEED_KEY', 'jsmaster-seed-8d2c5f7a1b9e4630');

define('JWT_TTL', 30 * 24 * 3600); // токен живёт 30 дней

// Разрешённый источник для CORS. Если фронтенд лежит на том же домене —
// CORS вообще не участвует; для отладки с localhost укажите его явно.
define('CORS_ORIGIN', '*');

// Сколько уроков в курсе (синхронно с фронтендом)
define('TOTAL_LESSONS', 37);
