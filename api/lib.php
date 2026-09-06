<?php
/**
 * js://master — PHP API · вспомогательные функции
 * Не зависит от Composer: JWT (HS256) реализован вручную,
 * пароли — встроенным password_hash()/password_verify().
 */
require_once __DIR__ . '/config.php';

/* ---------- JSON / HTTP ---------- */

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function get_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: 'null', true);
    return is_array($data) ? $data : [];
}

function http_method(): string
{
    // Фронтенд шлёт PUT/PATCH/DELETE как POST + X-HTTP-Method-Override
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m === 'POST') {
        $ov = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? ($_GET['_method'] ?? '');
        if ($ov !== '') $m = strtoupper($ov);
    }
    return strtoupper($m);
}

function current_path(): string
{
    // отрезаем префикс .../api, оставляя "/auth/login", "/progress" и т.д.
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    $uri = strtok($uri, '?');                       // без query-строки
    $pos = stripos($uri, '/api');
    if ($pos !== false) $uri = substr($uri, $pos + 4);
    return '/' . trim($uri, '/');
}

function bearer_token(): ?string
{
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if ($h === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strtolower($k) === 'authorization') { $h = $v; break; }
        }
    }
    if (preg_match('/Bearer\s+(.+)/i', $h, $m)) return trim($m[1]);
    return null;
}

/* ---------- JWT (HS256, без Composer) ---------- */

function b64url(string $s): string
{
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function b64url_decode(string $s): string
{
    return base64_decode(strtr($s, '-_', '+/')) ?: '';
}

function jwt_encode(array $payload): string
{
    $header  = b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $body    = b64url(json_encode($payload));
    $sig     = b64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$sig";
}

function jwt_decode(string $token): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $check = b64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    if (!hash_equals($check, $sig)) return null;
    $payload = json_decode(b64url_decode($body), true);
    if (!is_array($payload)) return null;
    if (isset($payload['exp']) && $payload['exp'] < time()) return null;
    return $payload;
}

function sign_token(array $user): string
{
    return jwt_encode([
        'id'   => (int) $user['id'],
        'role' => $user['role'],
        'iat'  => time(),
        'exp'  => time() + JWT_TTL,
    ]);
}

/* ---------- Авторизация ---------- */

/** Возвращает payload токена или завершает запрос с 401 */
function auth(): array
{
    $token = bearer_token();
    if (!$token) json_out(['error' => 'Требуется вход'], 401);
    $payload = jwt_decode($token);
    if (!$payload) json_out(['error' => 'Сессия истекла — войдите заново'], 401);
    return $payload;
}

function require_admin(array $payload): void
{
    if (($payload['role'] ?? '') !== 'admin') {
        json_out(['error' => 'Нужны права администратора'], 403);
    }
}

/* ---------- Модели ---------- */

function public_user(array $u): array
{
    return [
        'id'          => (string) $u['id'],
        'name'        => $u['name'],
        'email'       => $u['email'],
        'role'        => $u['role'],
        'demo'        => (bool) ($u['demo'] ?? false),
        'createdAt'   => strtotime($u['created_at']) * 1000,
        'lastLoginAt' => $u['last_login_at'] ? strtotime($u['last_login_at']) * 1000 : null,
    ];
}

function empty_progress(): array
{
    return ['xp' => 0, 'completed' => [], 'quiz' => [], 'tasks' => [], 'editors' => [], 'days' => [], 'events' => []];
}

function compute_streak(?array $days): int
{
    if (!$days) return 0;
    $streak = 0;
    $today  = new DateTimeImmutable('today');
    for ($back = 0; $back < 400; $back++) {
        $key = $today->modify("-$back days")->format('Y-m-d');
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
