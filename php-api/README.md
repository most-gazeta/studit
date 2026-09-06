# js://master — запуск на PHP-хостинге (cPanel + MySQL)

Эта папка — **полноценный REST API на чистом PHP** (7.4+, без Composer),
зеркало Node-версии из `server/`. Работает на любом shared-хостинге.

```
┌──────────────┐   HTTPS/JSON   ┌─────────────────┐   PDO    ┌─────────────────┐
│  React SPA   │ ─────────────► │ api.php (PHP)   │ ───────► │ mostnews_studit │
│  (браузер)   │  Bearer-токен  │ в корне сайта   │          │ (MySQL)         │
└──────────────┘                └─────────────────┘          └─────────────────┘
```

## Шаг 1. Таблицы в MySQL

1. cPanel → **phpMyAdmin** → слева база **mostnews_studit**
2. Вкладка **Импорт** → выберите `schema.sql` → «Вперёд»
   (или вкладка **SQL** → вставьте содержимое)

Создаются 3 таблицы: `users`, `progress`, `xp_events` (utf8mb4, внешние ключи
с `ON DELETE CASCADE`).

## Шаг 2. Загрузка файлов

cPanel → **Файловый менеджер** → `public_html`. Загрузите **содержимое**
папки `php-api` (не саму папку) в корень сайта:

```
public_html/
├── api.php
├── config.php        ← секреты!
├── db.php
├── jwt.php
├── helpers.php
├── seed.php
├── schema.sql
└── .htaccess         ← обязательно включите «показывать скрытые файлы»
```

Проверка: откройте `https://ваш-домен.ru/api/health` →
должно вернуть `{"ok":true,"db":"connected",...}`.

> Альтернатива: можно загрузить файлы в подпапку `public_html/api/` —
> правило rewrite универсальное, адреса останутся теми же
> (`https://домен/api/health`).

## Шаг 3. Настройка config.php

- **`DB_PASS`** — пароль был опубликован в переписке: **смените его**
  (cPanel → MySQL Databases → Set Password) и впишите новый.
- **`JWT_SECRET`** — замените на случайную строку (например, вывод
  `openssl rand -hex 32` или 64 случайных символа).
- **`SEED_KEY`** — любой сложный ключ для разовой инициализации.

## Шаг 4. Демо-данные

1. В `.htaccess` временно закомментируйте блок `<FilesMatch ...seed...>`
2. Откройте `https://ваш-домен.ru/api/seed.php?key=ВАШ_SEED_KEY`
3. Создадутся: админ **admin@jsmaster.ru / admin123** и три студента
   (`maria@demo.ru`, `ilya@demo.ru`, `anya@demo.ru`, пароль `demo123`)
4. Верните блок `.htaccess` на место (или удалите `seed.php`)

## Шаг 5. Фронтенд

В корне проекта (на вашей машине). `VITE_API_URL` — это база API **вместе с
сегментом `/api`**:

```bash
VITE_API_URL=https://ваш-домен.ru/api npm run build
```

Содержимое `dist/` загрузите в `public_html` (рядом с `api.php` — файлы не
пересекаются: `index.html` + `assets/` против `api.php` и служебных файлов).

После этого регистрация/вход, прогресс, XP и админ-панель работают **из
MySQL**: зайдите с двух разных устройств — данные общие. В подвале сайта
появится метка «режим: сервер + MySQL».

## Шаг 6. Чек-лист безопасности

- [ ] Пароль БД сменён после публикации
- [ ] `JWT_SECRET` — уникальный и длинный
- [ ] `config.php`, `db.php`, `jwt.php`, `helpers.php` закрыты `.htaccess`
      (проверка: прямой запрос должен вернуть 403)
- [ ] `seed.php` удалён или защищён
- [ ] Сайт работает по HTTPS (cPanel → AutoSSL)

## Приложение: эндпоинты

| Метод | Путь | Доступ | Назначение |
|---|---|---|---|
| GET | `/api/health` | все | проверка БД |
| POST | `/api/auth/register` | все | `{name,email,password}` → `{token,user}` |
| POST | `/api/auth/login` | все | `{email,password}` → `{token,user}` |
| GET | `/api/auth/me` | токен | текущий пользователь |
| GET | `/api/progress` | токен | прогресс |
| PUT | `/api/progress` | токен | `{progress}` — сохранение (фронтенд шлёт с дебаунсом) |
| GET | `/api/admin/stats` | админ | все пользователи со статистикой |
| PATCH | `/api/admin/users/:id` | админ | `{role}` — смена роли |
| POST | `/api/admin/users/:id/reset` | админ | сброс прогресса |
| DELETE | `/api/admin/users/:id` | админ | удаление (CASCADE) |

Аутентификация — JWT в заголовке `Authorization: Bearer <token>`, TTL 30 дней.
Пароли — `password_hash()` (bcrypt, cost 10).
