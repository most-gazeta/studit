<?php
/**
 * js://master — конфигурация PHP + MySQL (cPanel / shared-хостинг)
 *
 * ВНИМАНИЕ: этот файл содержит пароль БД. Он закрыт от прямого доступа
 * через .htaccess (Require all denied), но дополнительно:
 *   1) Смените пароль БД в cPanel (он «засветился» в переписке) и обновите его здесь.
 *   2) Смените JWT_SECRET на длинную случайную строку.
 */

const DB_HOST = 'localhost';          // на cPanel почти всегда localhost
const DB_NAME = 'mostnews_studit';    // ваша база
const DB_USER = 'mostnews_studit';    // ваш пользователь
const DB_PASS = 'EsH68!zLfA6*';       // ВАШ ПАРОЛЬ — смените его и обновите здесь

// Секрет для подписи JWT. Обязательно замените на случайную строку 64+ символов.
const JWT_SECRET = 'Zm9yLWpzLW1hc3Rlci1wbGVhc2UtY2hhbmdlLXRoaXMtc2VjcmV0LXRva2VuLTEyMzQ1Njc4OTA';

// Ключ для одноразовой инициализации демо-данных (маршрут /seed).
// После первого запуска рекомендуется сменить или удалить маршрут.
const SETUP_KEY = 'jsmaster-setup-2026';

const JWT_TTL_SECONDS = 30 * 24 * 3600; // 30 дней
