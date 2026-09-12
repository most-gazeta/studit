<?php
/**
 * js://master — REST API на чистом PHP + MySQL (без Composer).
 * Работает на любом cPanel / shared-хостинге с PHP 7.4+ и PDO MySQL.
 *
 * Разворачивается в public_html/api. Фронтенд: VITE_API_URL=/api
 *
 * Совместим с фронтенд-клиентом (src/lib/api.ts):
 *   PUT/PATCH/DELETE приходят как POST + заголовок X-HTTP-Method-Override.
 */

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-HTTP-Method-Override');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

/* ---------- helpers ---------- */

function respond($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
function fail(string $msg, int $code = 400): void {
    respond(['error' => $msg], $code);
}
function body(): array {
    $raw = file_get_contents('php://input');
    $d = json_decode($raw ?: 'null', true);
    return is_array($d) ? $d : [];
}
function b64url(string $d): string {
    return rtrim(strtr(base64_encode($d), '+/', '-_'), '=');
}
function jwtSign(array $payload): string {
    $h = b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $p = b64url(json_encode($payload));
    $s = b64url(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));
    return "$h.$p.$s";
}
function jwtVerify(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $s] = $parts;
    $expect = b64url(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));
    if (!hash_equals($expect, $s)) return null;
    $data = json_decode(base64_decode(strtr($p, '-_', '+/')) ?: 'null', true);
    if (!is_array($data) || ($data['exp'] ?? 0) < time()) return null;
    return $data;
}
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER, DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
            );
        } catch (PDOException $e) {
            fail('Не удалось подключиться к базе данных', 500);
        }
    }
    return $pdo;
}

/* ---------- auth middleware ---------- */

function authenticate(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = preg_match('/^Bearer\s+(.+)$/i', $header, $m) ? $m[1] : null;
    if (!$token) fail('Требуется вход', 401);
    $payload = jwtVerify($token);
    if (!$payload) fail('Сессия истекла — войдите заново', 401);
    return $payload; // ['id'=>..,'role'=>..]
}
function adminOnly(array $auth): void {
    if (($auth['role'] ?? '') !== 'admin') fail('Нужны права администратора', 403);
}

/* ---------- domain ---------- */

const EMPTY_PROGRESS = [
    'xp' => 0, 'completed' => (object)[], 'quiz' => (object)[],
    'tasks' => (object)[], 'editors' => (object)[], 'days' => (object)[], 'events' => [],
];
const TOTAL_LESSONS = 37;

function publicUser(array $u): array {
    return [
        'id' => (string)$u['id'],
        'name' => $u['name'],
        'email' => $u['email'],
        'role' => $u['role'],
        'demo' => (bool)$u['demo'],
        'createdAt' => strtotime($u['created_at']) * 1000,
        'lastLoginAt' => $u['last_login_at'] ? strtotime($u['last_login_at']) * 1000 : null,
    ];
}

function computeStreak(array $days): int {
    $streak = 0;
    for ($back = 0; $back < 400; $back++) {
        $key = date('Y-m-d', time() - $back * 86400);
        if (($days[$key] ?? 0) > 0) $streak++;
        elseif ($back === 0) continue;
        else break;
    }
    return $streak;
}

function buildStats(array $u, ?array $progress): array {
    $progress = $progress ?: json_decode(json_encode(EMPTY_PROGRESS), true);
    $completed = $progress['completed'] ?? [];
    $tasks = $progress['tasks'] ?? [];
    $lessonsDone = count($completed);
    $tasksDone = 0;
    foreach ($tasks as $m) foreach ((array)$m as $v) if ($v) $tasksDone++;
    $eventTs = array_map(fn($e) => $e['ts'] ?? 0, $progress['events'] ?? []);
    $lastActivity = max(
        $u['last_login_at'] ? strtotime($u['last_login_at']) * 1000 : 0,
        ...array_values($completed),
        ...$eventTs,
        0
    );
    return [
        'user' => publicUser($u),
        'progress' => $progress,
        'lessonsDone' => $lessonsDone,
        'tasksDone' => $tasksDone,
        'percent' => (int)round($lessonsDone / TOTAL_LESSONS * 100),
        'streak' => computeStreak((array)($progress['days'] ?? [])),
        'lastActivity' => $lastActivity,
    ];
}

function createToken(array $u): string {
    return jwtSign(['id' => (int)$u['id'], 'role' => $u['role'], 'exp' => time() + JWT_TTL_SECONDS]);
}

/* ---------- routes ---------- */

$method = $_SERVER['REQUEST_METHOD'];
$override = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? '';
if ($method === 'POST' && in_array($override, ['PUT', 'PATCH', 'DELETE'], true)) $method = $override;

$route = '/' . trim($_GET['route'] ?? '', '/');

/* ---- health ---- */
if ($route === '/health' && $method === 'GET') {
    db()->query('SELECT 1');
    respond(['ok' => true, 'db' => 'connected']);
}

/* ---- seed (одноразовая инициализация демо-данных) ---- */
if ($route === '/seed') {
    if (($_GET['key'] ?? '') !== SETUP_KEY) fail('Неверный ключ инициализации', 403);
    seedDemo();
    respond(['ok' => true, 'message' => 'Демо-данные созданы. Войдите: admin@jsmaster.ru / admin123']);
}

/* ---- auth ---- */
if ($route === '/auth/register' && $method === 'POST') {
    $in = body();
    $name = trim($in['name'] ?? '');
    $email = strtolower(trim($in['email'] ?? ''));
    $password = $in['password'] ?? '';
    if (mb_strlen($name) < 2) fail('Имя — минимум 2 символа');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Некорректный email');
    if (strlen($password) < 6) fail('Пароль — минимум 6 символов');

    $stmt = db()->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) fail('Пользователь с таким email уже существует', 409);

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = db()->prepare('INSERT INTO users (name, email, password_hash, last_login_at) VALUES (?,?,?,NOW())');
    $stmt->execute([$name, $email, $hash]);
    $id = (int)db()->lastInsertId();
    db()->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
        ->execute([$id, json_encode(EMPTY_PROGRESS, JSON_UNESCAPED_UNICODE)]);

    $u = fetchUser($id);
    respond(['token' => createToken($u), 'user' => publicUser($u)]);
}

if ($route === '/auth/login' && $method === 'POST') {
    $in = body();
    $email = strtolower(trim($in['email'] ?? ''));
    $stmt = db()->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $u = $stmt->fetch();
    if (!$u || !password_verify($in['password'] ?? '', $u['password_hash']))
        fail('Неверный email или пароль', 401);
    db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$u['id']]);
    $u['last_login_at'] = date('Y-m-d H:i:s');
    respond(['token' => createToken($u), 'user' => publicUser($u)]);
}

if ($route === '/auth/me' && $method === 'GET') {
    $auth = authenticate();
    $u = fetchUser((int)$auth['id']);
    if (!$u) fail('Пользователь не найден', 401);
    respond(['user' => publicUser($u)]);
}

/* ---- progress ---- */
if ($route === '/progress' && $method === 'GET') {
    $auth = authenticate();
    $stmt = db()->prepare('SELECT data FROM progress WHERE user_id = ?');
    $stmt->execute([(int)$auth['id']]);
    $row = $stmt->fetch();
    $data = $row ? json_decode($row['data'], true) : null;
    respond(['progress' => $data ?: json_decode(json_encode(EMPTY_PROGRESS), true)]);
}

if ($route === '/progress' && $method === 'PUT') {
    $auth = authenticate();
    $in = body();
    $data = is_array($in['progress'] ?? null) ? $in['progress'] : null;
    if (!$data) fail('Ожидается { progress: ProgressState }');

    $empty = json_decode(json_encode(EMPTY_PROGRESS), true);
    $merged = array_merge($empty, $data);
    $lessonsDone = count($merged['completed'] ?? []);
    $tasksDone = 0;
    foreach ((array)($merged['tasks'] ?? []) as $m) foreach ((array)$m as $v) if ($v) $tasksDone++;

    $json = json_encode($merged, JSON_UNESCAPED_UNICODE);
    db()->prepare(
        'INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data) VALUES (?,?,?,?,?)
         ON DUPLICATE KEY UPDATE xp=VALUES(xp), lessons_done=VALUES(lessons_done),
           tasks_done=VALUES(tasks_done), data=VALUES(data)'
    )->execute([(int)$auth['id'], (int)($merged['xp'] ?? 0), $lessonsDone, $tasksDone, $json]);

    // новые события — в журнал
    $events = $merged['events'] ?? [];
    if (is_array($events) && $events) {
        $maxTs = (int)db()->query('SELECT COALESCE(MAX(ts),0) FROM xp_events WHERE user_id=' . (int)$auth['id'])->fetchColumn();
        $ins = db()->prepare('INSERT INTO xp_events (user_id, ts, text, xp) VALUES (?,?,?,?)');
        foreach (array_slice($events, 0, 50) as $e) {
            if (!is_array($e) || ($e['ts'] ?? 0) <= $maxTs) continue;
            $ins->execute([(int)$auth['id'], (int)$e['ts'], mb_substr((string)($e['text'] ?? ''), 0, 255), (int)($e['xp'] ?? 0)]);
        }
    }
    respond(['ok' => true]);
}

/* ---- admin ---- */
if ($route === '/admin/stats' && $method === 'GET') {
    $auth = authenticate();
    adminOnly($auth);
    $rows = db()->query(
        'SELECT u.*, p.data FROM users u LEFT JOIN progress p ON p.user_id = u.id ORDER BY u.created_at ASC'
    )->fetchAll();
    $stats = array_map(fn($r) => buildStats($r, $r['data'] ? json_decode($r['data'], true) : null), $rows);
    respond(['stats' => $stats]);
}

if (preg_match('#^/admin/users/(\d+)$#', $route, $m)) {
    $auth = authenticate();
    adminOnly($auth);
    $userId = (int)$m[1];

    if ($method === 'PATCH') {
        $role = body()['role'] ?? '';
        if (!in_array($role, ['user', 'admin'], true)) fail("Роль должна быть 'user' или 'admin'");
        if ($userId === (int)$auth['id']) fail('Нельзя менять роль самому себе');
        db()->prepare('UPDATE users SET role = ? WHERE id = ?')->execute([$role, $userId]);
        respond(['ok' => true]);
    }
    if ($method === 'DELETE') {
        if ($userId === (int)$auth['id']) fail('Нельзя удалить собственный аккаунт');
        db()->prepare('DELETE FROM users WHERE id = ?')->execute([$userId]); // CASCADE чистит прогресс
        respond(['ok' => true]);
    }
}

if (preg_match('#^/admin/users/(\d+)/reset$#', $route, $m) && $method === 'POST') {
    $auth = authenticate();
    adminOnly($auth);
    $userId = (int)$m[1];
    db()->prepare('DELETE FROM progress WHERE user_id = ?')->execute([$userId]);
    db()->prepare('INSERT INTO progress (user_id, data) VALUES (?, ?)')
        ->execute([$userId, json_encode(EMPTY_PROGRESS, JSON_UNESCAPED_UNICODE)]);
    db()->prepare('DELETE FROM xp_events WHERE user_id = ?')->execute([$userId]);
    respond(['ok' => true]);
}

function fetchUser(int $id): ?array {
    $stmt = db()->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch() ?: null;
}

/* ---- seed demo ---- */
function lessonIds(): array {
    $ids = [];
    foreach (range(1, 9) as $i) $ids[] = "j$i";
    foreach (range(1, 9) as $i) $ids[] = "m$i";
    foreach (range(1, 5) as $i) $ids[] = "b$i";
    foreach (range(1, 8) as $i) $ids[] = "s$i";
    foreach (range(1, 6) as $i) $ids[] = "n$i";
    return $ids;
}
function makeProgress(int $doneCount, float $spreadDays, int $lastActiveDaysAgo): array {
    $lessons = lessonIds();
    $p = json_decode(json_encode(EMPTY_PROGRESS), true);
    $now = time() * 1000;
    $done = array_slice($lessons, 0, $doneCount);
    foreach ($done as $i => $id) {
        $daysAgo = max(0, $lastActiveDaysAgo - (int)round($i * ($spreadDays / max($doneCount, 1))));
        $ts = $now - $daysAgo * 86400000 - ($i % 5) * 3600000;
        $p['completed'][$id] = $ts;
        $day = date('Y-m-d', (int)($ts / 1000));
        $p['days'][$day] = ($p['days'][$day] ?? 0) + 50;
        $p['events'][] = ['ts' => $ts, 'text' => "Урок пройден: $id", 'xp' => 50];
        $p['xp'] += 50;
    }
    usort($p['events'], fn($a, $b) => $b['ts'] <=> $a['ts']);
    return $p;
}
function seedDemo(): void {
    $users = [
        ['Дмитрий Соколов', 'admin@jsmaster.ru', 'admin123', 'admin', makeProgress(12, 30, 1)],
        ['Мария Орлова', 'maria@demo.ru', 'demo123', 'user', makeProgress(11, 18, 0)],
        ['Илья Волков', 'ilya@demo.ru', 'demo123', 'user', makeProgress(5, 8, 2)],
        ['Аня Кузнецова', 'anya@demo.ru', 'demo123', 'user', makeProgress(24, 40, 0)],
    ];
    foreach ($users as [$name, $email, $pass, $role, $progress]) {
        $stmt = db()->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
        $stmt->execute([$email]);
        if ((int)$stmt->fetchColumn() > 0) continue; // идемпотентно
        $hash = password_hash($pass, PASSWORD_BCRYPT);
        db()->prepare('INSERT INTO users (name,email,password_hash,role,demo,last_login_at) VALUES (?,?,?,?,1,NOW())')
            ->execute([$name, $email, $hash, $role]);
        $id = (int)db()->lastInsertId();
        $lessonsDone = count($progress['completed']);
        db()->prepare('INSERT INTO progress (user_id,xp,lessons_done,tasks_done,data) VALUES (?,?,?,?,?)')
            ->execute([$id, $progress['xp'], $lessonsDone, $lessonsDone * 2, json_encode($progress, JSON_UNESCAPED_UNICODE)]);
    }
}

fail('Маршрут не найден: ' . $method . ' ' . $route, 404);
