<?php
/**
 * Разовое создание демо-данных: админ + 3 студента с реалистичным прогрессом.
 *
 *   https://ваш-домен.ru/api/seed.php?key=ВАШ_SEED_KEY
 *
 * Ключ берётся из config.php (SEED_KEY). Скрипт идемпотентен: существующие
 * email пропускаются. После инициализации файл рекомендуется удалить.
 */
declare(strict_types=1);

require __DIR__ . '/config.php';
require __DIR__ . '/db.php';
require __DIR__ . '/helpers.php';

header('Content-Type: text/plain; charset=utf-8');

if (($_GET['key'] ?? '') !== SEED_KEY) {
    http_response_code(403);
    exit("Доступ запрещён. Используйте seed.php?key=<SEED_KEY из config.php>\n");
}

$LESSONS = [];
foreach (['j' => 9, 'm' => 9, 'b' => 5, 's' => 8, 'n' => 6] as $prefix => $count) {
    for ($i = 1; $i <= $count; $i++) $LESSONS[] = $prefix . $i;
}

/** Прогресс: N пройденных уроков, «размазанных» по прошедшим дням */
function make_progress(array $lessons, int $doneCount, float $spreadDays, int $lastActiveDaysAgo): array
{
    $p = ['xp' => 0, 'completed' => [], 'quiz' => [], 'tasks' => [], 'editors' => [], 'days' => [], 'events' => []];
    $now = time() * 1000;
    $done = array_slice($lessons, 0, $doneCount);

    foreach ($done as $i => $id) {
        $daysAgo = max(0, $lastActiveDaysAgo - (int) round($i * ($spreadDays / max($doneCount, 1))));
        $ts = $now - $daysAgo * 86400000 - ($i % 5) * 3600000;
        $p['completed'][$id] = $ts;
        $day = date('Y-m-d', (int) ($ts / 1000));
        $p['days'][$day] = ($p['days'][$day] ?? 0) + 50;
        $p['events'][] = ['ts' => $ts, 'text' => "Урок пройден: $id", 'xp' => 50];
        $p['xp'] += 50;
    }
    usort($p['events'], function ($a, $b) { return $b['ts'] <=> $a['ts']; });

    // пустые карты — как JSON-объекты {}
    foreach (['completed', 'quiz', 'tasks', 'editors', 'days'] as $key) {
        $p[$key] = empty($p[$key]) ? new stdClass() : (object) $p[$key];
    }
    return $p;
}

$users = [
    ['Дмитрий Соколов', 'admin@jsmaster.ru', 'admin123', 'admin', 12, 30, 1],
    ['Мария Орлова',    'maria@demo.ru',     'demo123',  'user',  11, 18, 0],
    ['Илья Волков',     'ilya@demo.ru',      'demo123',  'user',   5,  8, 2],
    ['Аня Кузнецова',   'anya@demo.ru',      'demo123',  'user',  24, 40, 0],
];

echo "js://master — создание демо-данных\n----------------------------------\n";

foreach ($users as list($name, $email, $pass, $role, $done, $spread, $lastActive)) {
    $exists = db()->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $exists->execute([$email]);
    if ((int) $exists->fetchColumn() > 0) {
        echo "— $email уже существует, пропускаем\n";
        continue;
    }

    $progress = make_progress($LESSONS, $done, $spread, $lastActive);
    $hash = password_hash($pass, PASSWORD_BCRYPT);

    db()->prepare(
        'INSERT INTO users (name, email, password_hash, role, demo, last_login_at)
         VALUES (?, ?, ?, ?, 1, NOW())'
    )->execute([$name, $email, $hash, $role]);

    $userId = (int) db()->lastInsertId();
    db()->prepare(
        'INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data) VALUES (?, ?, ?, ?, ?)'
    )->execute([
        $userId,
        $progress['xp'],
        count((array) $progress['completed']),
        count((array) $progress['completed']) * 2,
        json_encode($progress, JSON_UNESCAPED_UNICODE),
    ]);

    echo "+ $email ($role) — " . count((array) $progress['completed']) . '/' . TOTAL_LESSONS
        . " уроков, {$progress['xp']} XP\n";
}

echo "\nГотово. Вход администратора: admin@jsmaster.ru / admin123\n";
echo "Не забудьте удалить seed.php (или сменить SEED_KEY в config.php).\n";
