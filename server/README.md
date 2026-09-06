# js://master — сервер (Express + MySQL)

> **Shared-хостинг без Node.js?** Используйте готовый API на чистом PHP —
> папка `php-api/` в корне проекта (инструкция в `php-api/README.md`).
> Эндпоинты и формат данных идентичны, фронтенд работает с обоими.

Фронтенд платформы умеет работать в двух режимах:

| Режим | Когда | Где данные |
|---|---|---|
| **Демо** (по умолчанию) | `VITE_API_URL` не задана | localStorage браузера |
| **Сервер + MySQL** | задана `VITE_API_URL` | MySQL через этот API |

```
┌──────────────┐   HTTPS/JSON    ┌────────────────┐   SQL    ┌───────┐
│  React SPA   │ ──────────────► │ Express API    │ ───────► │ MySQL │
│  (браузер)   │  Bearer-токен   │ server/index.js│  mysql2  │  8+   │
└──────────────┘                 └────────────────┘          └───────┘
```

## 1. База данных

```bash
mysql -u root -p < schema.sql        # создаст БД jsmaster и 3 таблицы
```

Таблицы: `users` (bcrypt-хеш пароля, роль, даты), `progress` (JSON-состояние
курса + денормализованные xp/lessons_done/tasks_done для админ-запросов),
`xp_events` (журнал начислений).

## 2. Настройка и запуск

```bash
cd server
cp .env.example .env                 # см. ниже; создайте файл вручную
npm install
npm run seed                         # админ + 3 демо-студента
npm start                            # http://localhost:3001
```

Содержимое `.env`:

```ini
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ваш_пароль
DB_NAME=jsmaster
JWT_SECRET=длинная_случайная_строка_обязательно_замените
FRONTEND_ORIGIN=http://localhost:5173
```

Проверка: `GET /api/health` → `{"ok":true,"db":"connected"}`.

## 3. Подключение фронтенда

`VITE_API_URL` — это **полный базовый URL API, включая сегмент `/api`**:

```bash
# в корне проекта (Node-сервер)
VITE_API_URL=http://localhost:3001/api npm run dev
# или для production-сборки
VITE_API_URL=https://api.ваш-домен.ru/api npm run build
```

Без переменной сайт остаётся в демо-режиме (localStorage) — ничего не ломается.

## 4. API

| Метод | Путь | Доступ | Назначение |
|---|---|---|---|
| POST | `/api/auth/register` | все | регистрация `{name,email,password}` → `{token,user}` |
| POST | `/api/auth/login` | все | вход `{email,password}` → `{token,user}` |
| GET | `/api/auth/me` | токен | текущий пользователь |
| GET | `/api/progress` | токен | прогресс пользователя |
| PUT | `/api/progress` | токен | сохранить прогресс `{progress}` (дебаунс 0.9 с на клиенте) |
| GET | `/api/admin/stats` | админ | все пользователи со статистикой |
| PATCH | `/api/admin/users/:id` | админ | смена роли `{role}` |
| POST | `/api/admin/users/:id/reset` | админ | сброс прогресса |
| DELETE | `/api/admin/users/:id` | админ | удаление (CASCADE чистит прогресс) |

Аутентификация — JWT в заголовке `Authorization: Bearer <token>`, TTL 30 дней.

## 5. Продакшен-чеклист

- `JWT_SECRET` — из переменных окружения, ≥ 64 символов
- MySQL-пользователь с правами только на БД `jsmaster`
- HTTPS (nginx/caddy) + `FRONTEND_ORIGIN` = точный домен фронтенда
- `bcryptjs` можно заменить на нативный `bcrypt` (argon2 — ещё лучше)
- Rate-limit на `/api/auth/*` (например, `express-rate-limit`)
