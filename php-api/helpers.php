<?php
/** Общие помощники API */

function json_input(): array
{
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw !== false && $raw !== '' ? $raw : 'null', true);
    return is_array($data) ? $data : [];
}

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function empty_progress(): array
{
    return [
        'xp'        => 0,
        'completed' => (object) [],
        'quiz'      => (object) [],
        'tasks'     => (object) [],
        'editors'   => (object) [],
        'days'      => (object) [],
        'events'    => [],
    ];
}

/** Строка Authorization: Bearer <token> (совместимо с mod_php и CGI/FPM) */
function bearer_token(): ?string
{
    $auth = '';
    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strtolower($k) === 'authorization') { $auth = (string) $v; break; }
        }
    }
    if ($auth === '' && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    }
    if ($auth === '' && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    if (stripos($auth, 'Bearer ') !== 0) return null;
    return trim(substr($auth, 7));
}

function require_auth(): array
{
    $token = bearer_token();
    if ($token === null) json_out(['error' => 'Требуется вход'], 401);
    $payload = jwt_decode($token);
    if ($payload === null || !isset($payload['id'])) {
        json_out(['error' => 'Сессия истекла — войдите заново'], 401);
    }
    return $payload;
}

function require_admin(array $auth): void
{
    if (($auth['role'] ?? '') !== 'admin') {
        json_out(['error' => 'Нужны права администратора'], 403);
    }
}

function public_user(array $u): array
{
    return [
        'id'          => (string) $u['id'],
        'name'        => $u['name'],
        'email'       => $u['email'],
        'role'        => $u['role'],
        'demo'        => (bool) $u['demo'],
        'createdAt'   => strtotime($u['created_at']) * 1000,
        'lastLoginAt' => $u['last_login_at'] ? strtotime($u['last_login_at']) * 1000 : null,
    ];
}

function compute_streak(array $days): int
{
    $streak = 0;
    for ($back = 0; $back < 400; $back++) {
        $key = date('Y-m-d', time() - $back * 86400);
        if (($days[$key] ?? 0) > 0) {
            $streak++;
        } elseif ($back === 0) {
            continue; // сегодня мог ещё не заниматься
        } else {
            break;
        }
    }
    return $streak;
}
