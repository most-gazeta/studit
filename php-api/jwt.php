<?php
/**
 * Минимальный JWT (HS256) без внешних библиотек.
 * Токен: base64url(header).base64url(payload).base64url(hmac_sha256)
 */

function b64u_encode(string $s): string
{
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function b64u_decode(string $s): string
{
    return base64_decode(strtr($s, '-_', '+/'));
}

function jwt_encode(array $payload): string
{
    $header = b64u_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + JWT_TTL;
    $body = b64u_encode(json_encode($payload));
    $sig  = b64u_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$sig";
}

/** Возвращает payload или null, если подпись/срок невалидны */
function jwt_decode(string $token): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;

    list($h, $b, $s) = $parts;
    $expected = b64u_encode(hash_hmac('sha256', "$h.$b", JWT_SECRET, true));
    if (!hash_equals($expected, $s)) return null;

    $payload = json_decode(b64u_decode($b), true);
    if (!is_array($payload)) return null;
    if (isset($payload['exp']) && $payload['exp'] < time()) return null;
    return $payload;
}
