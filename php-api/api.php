<?php
/**
 * js://master — REST API (PHP 7.4+ / MySQL)
 *
 * Роутинг: /api/<path> → api.php?path=<path> (см. .htaccess)
 * Примеры:
 *   POST /api/auth/login          {"email","password"}
 *   GET  /api/progress            Authorization: Bearer <token>
 *   PUT  /api/progress            {"progress": {...}}
 *   GET  /api/admin/stats         (только админ)
 */
declare(strict_types=1);

require __DIR__ . '/config.php';
require __DIR__ . '/db.php';
require __DIR__ . '/jwt.php';
require __DIR__ . '/helpers.php';

// ---- CORS ----
header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path   = isset($_GET['path']) ? trim((string) $_GET['path'], '/') : '';
$method = $_SERVER['REQUEST_METHOD'];

// Shared-хостинг часто блокирует PUT/PATCH/DELETE, поэтому фронтенд шлёт
// POST с заголовком X-HTTP-Method-Override — уважаем его.
$override = isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])
    ? strtoupper((string) $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])
    : '';
if ($method === 'POST' && in_array($override, ['PUT', 'PATCH', 'DELETE'], true)) {
    $method = $override;
}

try {
    route($method, $path);
    json_out(['error' => 'Метод не найден'], 404);
} catch (PDOException $e) {
    error_log('jsmaster PDO: ' . $e->getMessage());
    json_out(['error' => 'Ошибка базы данных'], 500);
} catch (Throwable $e) {
    error_log('jsmaster: ' . $e->getMessage());
    json_out(['error' => 'Ошибка сервера'], 500);
}

/* ================= маршруты ================= */

function route(string $method, string $path): void
{
    if ($method === 'GET' && $path === 'health') {
        db()->query('SELECT 1');
        json_out(['ok' => true, 'db' => 'connected', 'lessons' => TOTAL_LESSONS]);
    }
    if ($method === 'POST' && $path === 'auth/register') { handle_register(); }
    if ($method === 'POST' && $path === 'auth/login')    { handle_login(); }

    $auth = require_auth();

    if ($method === 'GET' && $path === 'auth/me')        { handle_me($auth); }
    if ($method === 'GET' && $path === 'progress')       { handle_get_progress($auth); }
    if ($method === 'PUT' && $path === 'progress')       { handle_put_progress($auth); }

    if (strpos($path, 'admin/') === 0) {
        require_admin($auth);
        handle_admin($method, $path, $auth);
    }
}

/* ================= аутентификация ================= */

function handle_register(): void
{
    $in       = json_input();
    $name     = trim((string) ($in['name'] ?? ''));
    $email    = strtolower(trim((string) ($in['email'] ?? '')));
    $password = (string) ($in['password'] ?? '');

    if (mb_strlen($name) < 2)                     json_out(['error' => 'Имя — минимум 2 символа'], 400);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_out(['error' => 'Некорректный email'], 400);
    if (strlen($password) < 6)                    json_out(['error' => 'Пароль — минимум 6 символов'], 400);

    $hash = password_hash($password, PASSWORD_BCRYPT);

    try {
        $st = db()->prepare(
            'INSERT INTO users (name, email, password_hash, last_login_at) VALUES (?, ?, ?, NOW())'
        );
        $st->execute([$name, $email, $hash]);
    } catch (PDOException $e) {
        if ((int) $e->getCode() === 23000) {
            json_out(['error' => 'Пользователь с таким email уже существует'], 409);
        }
        throw $e;
    }

    $userId = (int) db()->lastInsertId();
    db()->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
        ->execute([$userId, json_encode(empty_progress(), JSON_UNESCAPED_UNICODE)]);

    $user = db()->prepare('SELECT * FROM users WHERE id = ?');
    $user->execute([$userId]);
    $row = $user->fetch();

    json_out(['token' => jwt_encode(['id' => (int) $row['id'], 'role' => $row['role']]), 'user' => public_user($row)]);
}

function handle_login(): void
{
    $in       = json_input();
    $email    = strtolower(trim((string) ($in['email'] ?? '')));
    $password = (string) ($in['password'] ?? '');

    $st = db()->prepare('SELECT * FROM users WHERE email = ?');
    $st->execute([$email]);
    $user = $st->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_out(['error' => 'Неверный email или пароль'], 401);
    }

    db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);
    $user['last_login_at'] = date('Y-m-d H:i:s');

    json_out([
        'token' => jwt_encode(['id' => (int) $user['id'], 'role' => $user['role']]),
        'user'  => public_user($user),
    ]);
}

function handle_me(array $auth): void
{
    $st = db()->prepare('SELECT * FROM users WHERE id = ?');
    $st->execute([$auth['id']]);
    $user = $st->fetch();
    if (!$user) json_out(['error' => 'Пользователь не найден'], 401);
    json_out(['user' => public_user($user)]);
}

/* ================= прогресс ================= */

function handle_get_progress(array $auth): void
{
    $st = db()->prepare('SELECT data FROM progress WHERE user_id = ?');
    $st->execute([$auth['id']]);
    $row = $st->fetch();

    $progress = $row ? json_decode($row['data'], true) : null;
    if (!is_array($progress)) $progress = [];
    json_out(['progress' => $progress + (array) empty_progress()]);
}

function handle_put_progress(array $auth): void
{
    $in   = json_input();
    $data = isset($in['progress']) && is_array($in['progress']) ? $in['progress'] : null;
    if ($data === null) json_out(['error' => 'Ожидается { progress: ProgressState }'], 400);

    $merged      = $data + (array) empty_progress();
    $completed   = is_array($merged['completed']) ? $merged['completed'] : [];
    $tasks       = is_array($merged['tasks']) ? $merged['tasks'] : [];
    $lessonsDone = count($completed);
    $tasksDone   = 0;
    foreach ($tasks as $lessonTasks) {
        if (is_array($lessonTasks)) $tasksDone += count(array_filter($lessonTasks));
    }

    db()->prepare(
        'INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           xp = VALUES(xp), lessons_done = VALUES(lessons_done),
           tasks_done = VALUES(tasks_done), data = VALUES(data)'
    )->execute([
        $auth['id'],
        (int) ($merged['xp'] ?? 0),
        $lessonsDone,
        $tasksDone,
        json_encode($merged, JSON_UNESCAPED_UNICODE),
    ]);

    // новые события — в журнал
    $events = isset($merged['events']) && is_array($merged['events']) ? $merged['events'] : [];
    if ($events) {
        $max = (int) db()->query(
            'SELECT COALESCE(MAX(ts), 0) FROM xp_events WHERE user_id = ' . db()->quote((string) $auth['id'])
        )->fetchColumn();

        $ins = db()->prepare('INSERT INTO xp_events (user_id, ts, text, xp) VALUES (?, ?, ?, ?)');
        $added = 0;
        foreach ($events as $e) {
            if (!is_array($e) || !isset($e['ts']) || $e['ts'] <= $max) continue;
            $ins->execute([
                $auth['id'],
                (int) $e['ts'],
                mb_substr((string) ($e['text'] ?? ''), 0, 255),
                (int) ($e['xp'] ?? 0),
            ]);
            if (++$added >= 50) break;
        }
    }

    json_out(['ok' => true]);
}

/* ================= админ ================= */

function handle_admin(string $method, string $path, array $auth): void
{
    if ($method === 'GET' && $path === 'admin/stats') {
        admin_stats();
    }

    $segments = explode('/', $path); // admin / users / {id} / [reset]
    if (count($segments) >= 3 && $segments[1] === 'users') {
        $userId = (int) $segments[2];
        if ($userId <= 0) json_out(['error' => 'Некорректный id пользователя'], 400);

        if ($method === 'PATCH' && count($segments) === 3)  { admin_set_role($userId, $auth); }
        if ($method === 'POST' && ($segments[3] ?? '') === 'reset') { admin_reset($userId); }
        if ($method === 'DELETE' && count($segments) === 3) { admin_delete($userId, $auth); }
    }

    json_out(['error' => 'Метод не найден'], 404);
}

function admin_stats(): void
{
    $rows = db()->query(
        'SELECT u.id, u.name, u.email, u.role, u.demo, u.created_at, u.last_login_at, p.xp, p.data
         FROM users u
         LEFT JOIN progress p ON p.user_id = u.id
         ORDER BY u.created_at ASC'
    )->fetchAll();

    $stats = [];
    foreach ($rows as $r) {
        $progress  = $r['data'] ? json_decode($r['data'], true) : [];
        if (!is_array($progress)) $progress = [];
        $completed = is_array($progress['completed'] ?? null) ? $progress['completed'] : [];
        $tasks     = is_array($progress['tasks'] ?? null) ? $progress['tasks'] : [];
        $days      = is_array($progress['days'] ?? null) ? $progress['days'] : [];
        $events    = is_array($progress['events'] ?? null) ? $progress['events'] : [];

        $lessonsDone = count($completed);
        $tasksDone   = 0;
        foreach ($tasks as $lessonTasks) {
            if (is_array($lessonTasks)) $tasksDone += count(array_filter($lessonTasks));
        }

        $lastActivity = $r['last_login_at'] ? strtotime($r['last_login_at']) * 1000 : 0;
        foreach ($events as $e) {
            if (is_array($e) && isset($e['ts'])) $lastActivity = max($lastActivity, (int) $e['ts']);
        }
        foreach ($completed as $ts) {
            $lastActivity = max($lastActivity, (int) $ts);
        }

        $stats[] = [
            'user'        => public_user($r),
            'progress'    => $progress + (array) empty_progress(),
            'lessonsDone' => $lessonsDone,
            'tasksDone'   => $tasksDone,
            'percent'     => (int) round($lessonsDone / TOTAL_LESSONS * 100),
            'streak'      => compute_streak($days),
            'lastActivity' => $lastActivity,
        ];
    }

    json_out(['stats' => $stats]);
}

function admin_set_role(int $userId, array $auth): void
{
    $in   = json_input();
    $role = $in['role'] ?? '';
    if ($role !== 'user' && $role !== 'admin') {
        json_out(['error' => "Роль должна быть 'user' или 'admin'"], 400);
    }
    if ($userId === (int) $auth['id']) {
        json_out(['error' => 'Нельзя менять роль самому себе'], 400);
    }
    db()->prepare('UPDATE users SET role = ? WHERE id = ?')->execute([$role, $userId]);
    json_out(['ok' => true]);
}

function admin_reset(int $userId): void
{
    db()->prepare('DELETE FROM progress WHERE user_id = ?')->execute([$userId]);
    db()->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
        ->execute([$userId, json_encode(empty_progress(), JSON_UNESCAPED_UNICODE)]);
    db()->prepare('DELETE FROM xp_events WHERE user_id = ?')->execute([$userId]);
    json_out(['ok' => true]);
}

function admin_delete(int $userId, array $auth): void
{
    if ($userId === (int) $auth['id']) {
        json_out(['error' => 'Нельзя удалить собственный аккаунт'], 400);
    }
    // ON DELETE CASCADE чистит progress и xp_events
    db()->prepare('DELETE FROM users WHERE id = ?')->execute([$userId]);
    json_out(['ok' => true]);
}
