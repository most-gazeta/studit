<?php
/**
 * js://master — PHP API · конфигурация
 * Загружается на хостинг в public_html/api/config.php
 *
 * ВАЖНО: смените пароль БД и JWT_SECRET после первой настройки
 * (пароль был передан в чате — считайте его скомпрометированным).
 */

// --- База данных (cPanel) ---
const DB_HOST = 'localhost';
const DB_NAME = 'mostnews_studit';
const DB_USER = 'mostnews_studit';
const DB_PASS = 'EsH68!zLfA6*';

// --- Секрет для подписи JWT. ОБЯЗАТЕЛЬНО замените на свою длинную случайную строку! ---
const JWT_SECRET = 'jsmaster-ЗАМЕНИТЕ-НА-64-СЛУЧАЙНЫХ-СИМВОЛА-0123456789abcdef';
const JWT_TTL    = 60 * 60 * 24 * 30; // 30 дней

// --- Разрешённый источник фронтенда (для CORS). '*' — любой (удобно при локальной разработке) ---
const FRONTEND_ORIGIN = '*';

const TOTAL_LESSONS = 37; // junior 9 + middle 9 + browser 5 + senior 8 + pro 6

/** PDO-подключение (один раз за запрос) */
function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        } catch (PDOException $e) {
            json_out(['error' => 'Не удалось подключиться к базе данных'], 500);
        }
    }
    return $pdo;
}
