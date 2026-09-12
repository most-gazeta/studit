<?php
/**
 * js://master — PHP API · единая точка входа
 * Загружается в public_html/api/index.php; .htaccess направляет сюда все /api/*
 *
 * Контракт полностью совпадает с server/index.js (Express + MySQL).
 */
require_once __DIR__ . '/lib.php';

/* ---------- CORS ---------- */
header('Access-Control-Allow-Origin: ' . FRONTEND_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-HTTP-Method-Override');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = http_method();
$path   = current_path();
$pdo    = db();

try {
    /* ---------- health ---------- */
    if ($path === '/health' && $method === 'GET') {
        $pdo->query('SELECT 1');
        json_out(['ok' => true, 'db' => 'connected']);
    }

    /* ---------- auth ---------- */
    if ($path === '/auth/register' && $method === 'POST') {
        $body     = get_json_body();
        $name     = trim((string) ($body['name'] ?? ''));
        $email    = strtolower(trim((string) ($body['email'] ?? '')));
        $password = (string) ($body['password'] ?? '');

        if (mb_strlen($name) < 2)                       json_out(['error' => 'Имя — минимум 2 символа'], 400);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_out(['error' => 'Некорректный email'], 400);
        if (strlen($password) < 6)                      json_out(['error' => 'Пароль — минимум 6 символов'], 400);

        $hash = password_hash($password, PASSWORD_BCRYPT);
        try {
            $st = $pdo->prepare('INSERT INTO users (name, email, password_hash, last_login_at) VALUES (?, ?, ?, NOW())');
            $st->execute([$name, $email, $hash]);
        } catch (PDOException $e) {
            if ((int) $e->errorInfo[1] === 1062) json_out(['error' => 'Пользователь с таким email уже существует'], 409);
            throw $e;
        }
        $user = $pdo->query('SELECT * FROM users WHERE id = ' . (int) $pdo->lastInsertId())->fetch();
        $pdo->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
            ->execute([$user['id'], json_encode(empty_progress())]);
        json_out(['token' => sign_token($user), 'user' => public_user($user)]);
    }

    if ($path === '/auth/login' && $method === 'POST') {
        $body  = get_json_body();
        $email = strtolower(trim((string) ($body['email'] ?? '')));
        $st    = $pdo->prepare('SELECT * FROM users WHERE email = ?');
        $st->execute([$email]);
        $user = $st->fetch();
        if (!$user || !password_verify((string) ($body['password'] ?? ''), $user['password_hash'])) {
            json_out(['error' => 'Неверный email или пароль'], 401);
        }
        $pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);
        $user['last_login_at'] = date('Y-m-d H:i:s');
        json_out(['token' => sign_token($user), 'user' => public_user($user)]);
    }

    if ($path === '/auth/me' && $method === 'GET') {
        $me   = auth();
        $st   = $pdo->prepare('SELECT * FROM users WHERE id = ?');
        $st->execute([$me['id']]);
        $user = $st->fetch();
        if (!$user) json_out(['error' => 'Пользователь не найден'], 401);
        json_out(['user' => public_user($user)]);
    }

    /* ---------- progress ---------- */
    if ($path === '/progress' && $method === 'GET') {
        $me  = auth();
        $st  = $pdo->prepare('SELECT data FROM progress WHERE user_id = ?');
        $st->execute([$me['id']]);
        $row = $st->fetch();
        json_out(['progress' => $row ? (json_decode($row['data'], true) ?: empty_progress()) : empty_progress()]);
    }

    if ($path === '/progress' && $method === 'PUT') {
        $me   = auth();
        $body = get_json_body();
        $data = $body['progress'] ?? null;
        if (!is_array($data)) json_out(['error' => 'Ожидается { progress: ProgressState }'], 400);

        $merged      = array_merge(empty_progress(), $data);
        $lessonsDone = count($merged['completed'] ?? []);
        $tasksDone   = 0;
        foreach (($merged['tasks'] ?? []) as $m) $tasksDone += count(array_filter((array) $m));

        $pdo->prepare(
            'INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE xp = VALUES(xp), lessons_done = VALUES(lessons_done),
               tasks_done = VALUES(tasks_done), data = VALUES(data)'
        )->execute([$me['id'], (int) ($merged['xp'] ?? 0), $lessonsDone, $tasksDone, json_encode($merged, JSON_UNESCAPED_UNICODE)]);

        // новые события — в журнал (только с ts больше уже известного)
        $events = $merged['events'] ?? [];
        if (is_array($events) && $events) {
            $maxTs = (int) $pdo->query('SELECT COALESCE(MAX(ts),0) FROM xp_events WHERE user_id = ' . (int) $me['id'])->fetchColumn();
            $ins   = $pdo->prepare('INSERT INTO xp_events (user_id, ts, text, xp) VALUES (?, ?, ?, ?)');
            $added = 0;
            foreach ($events as $e) {
                if (!is_array($e) || ($e['ts'] ?? 0) <= $maxTs) continue;
                $ins->execute([$me['id'], (int) $e['ts'], mb_substr((string) ($e['text'] ?? ''), 0, 255), (int) ($e['xp'] ?? 0)]);
                if (++$added >= 50) break;
            }
        }
        json_out(['ok' => true]);
    }

    /* ---------- admin ---------- */
    if ($path === '/admin/stats' && $method === 'GET') {
        $me = auth();
        require_admin($me);
        $rows = $pdo->query(
            'SELECT u.id, u.name, u.email, u.role, u.demo, u.created_at, u.last_login_at, p.xp, p.data
             FROM users u LEFT JOIN progress p ON p.user_id = u.id
             ORDER BY u.created_at ASC'
        )->fetchAll();

        $stats = [];
        foreach ($rows as $r) {
            $progress    = $r['data'] ? (json_decode($r['data'], true) ?: empty_progress()) : empty_progress();
            $lessonsDone = count($progress['completed'] ?? []);
            $tasksDone   = 0;
            foreach (($progress['tasks'] ?? []) as $m) $tasksDone += count(array_filter((array) $m));

            $last = $r['last_login_at'] ? strtotime($r['last_login_at']) * 1000 : 0;
            foreach (($progress['events'] ?? []) as $e)   $last = max($last, (int) ($e['ts'] ?? 0));
            foreach (($progress['completed'] ?? []) as $ts) $last = max($last, (int) $ts);

            $stats[] = [
                'user'         => public_user($r),
                'progress'     => $progress,
                'lessonsDone'  => $lessonsDone,
                'tasksDone'    => $tasksDone,
                'percent'      => (int) round($lessonsDone / TOTAL_LESSONS * 100),
                'streak'       => compute_streak($progress['days'] ?? null),
                'lastActivity' => $last,
            ];
        }
        json_out(['stats' => $stats]);
    }

    if (preg_match('#^/admin/users/(\d+)$#', $path, $m)) {
        $me = auth();
        require_admin($me);
        $id = (int) $m[1];

        if ($method === 'PATCH') {
            $role = get_json_body()['role'] ?? '';
            if (!in_array($role, ['user', 'admin'], true)) json_out(['error' => "Роль должна быть 'user' или 'admin'"], 400);
            if ($id === (int) $me['id']) json_out(['error' => 'Нельзя менять роль самому себе'], 400);
            $pdo->prepare('UPDATE users SET role = ? WHERE id = ?')->execute([$role, $id]);
            json_out(['ok' => true]);
        }

        if ($method === 'DELETE') {
            if ($id === (int) $me['id']) json_out(['error' => 'Нельзя удалить собственный аккаунт'], 400);
            $pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$id]); // CASCADE чистит прогресс
            json_out(['ok' => true]);
        }
    }

    if (preg_match('#^/admin/users/(\d+)/reset$#', $path, $m) && $method === 'POST') {
        $me = auth();
        require_admin($me);
        $id = (int) $m[1];
        $pdo->prepare('DELETE FROM progress WHERE user_id = ?')->execute([$id]);
        $pdo->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
            ->execute([$id, json_encode(empty_progress())]);
        $pdo->prepare('DELETE FROM xp_events WHERE user_id = ?')->execute([$id]);
        json_out(['ok' => true]);
    }

    json_out(['error' => 'Эндпоинт не найден: ' . $method . ' ' . $path], 404);
} catch (Throwable $e) {
    error_log('[jsmaster] ' . $e->getMessage());
    json_out(['error' => 'Ошибка сервера'], 500);
}
