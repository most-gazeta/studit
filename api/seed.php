<?php
/**
 * js://master — наполнение демо-данными (админ + 3 студента).
 *
 * Запуск из консоли:   php api/seed.php
 * или через браузер:   https://ваш-сайт/api/seed.php   (ПОСЛЕ запуска удалите файл!)
 *
 * Идемпотентен: существующие email пропускаются, ничего не затирается.
 */
require_once __DIR__ . '/lib.php';

$isCli = PHP_SAPI === 'cli';
if (!$isCli) header('Content-Type: text/plain; charset=utf-8');

function out(string $s): void
{
    echo $s . "\n";
}

function make_progress(int $doneCount, float $spreadDays, int $lastActiveDaysAgo): array
{
    global $lessonIds;
    $p   = empty_progress();
    $now = (int) round(microtime(true) * 1000);
    $done = array_slice($lessonIds, 0, $doneCount);
    foreach ($done as $i => $id) {
        $daysAgo = max(0, $lastActiveDaysAgo - (int) round($i * ($spreadDays / max($doneCount, 1))));
        $ts      = $now - $daysAgo * 86400000 - ($i % 5) * 3600000;
        $p['completed'][$id] = $ts;
        $day = date('Y-m-d', intdiv($ts, 1000));
        $p['days'][$day] = ($p['days'][$day] ?? 0) + 50;
        $p['events'][] = ['ts' => $ts, 'text' => 'Урок пройден: ' . $id, 'xp' => 50];
        $p['xp'] += 50;
    }
    usort($p['events'], fn($a, $b) => $b['ts'] <=> $a['ts']);
    return $p;
}

$lessonIds = [];
foreach (range(1, 9) as $i) $lessonIds[] = "j$i";
foreach (range(1, 9) as $i) $lessonIds[] = "m$i";
foreach (range(1, 5) as $i) $lessonIds[] = "b$i";
foreach (range(1, 8) as $i) $lessonIds[] = "s$i";
foreach (range(1, 6) as $i) $lessonIds[] = "n$i";

$users = [
    ['Дмитрий Соколов', 'admin@jsmaster.ru', 'admin123', 'admin', make_progress(12, 30, 1)],
    ['Мария Орлова',    'maria@demo.ru',     'demo123',  'user',  make_progress(11, 18, 0)],
    ['Илья Волков',     'ilya@demo.ru',      'demo123',  'user',  make_progress(5, 8, 2)],
    ['Аня Кузнецова',   'anya@demo.ru',      'demo123',  'user',  make_progress(24, 40, 0)],
];

$pdo = db();
foreach ($users as [$name, $email, $pass, $role, $progress]) {
    $st = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $st->execute([$email]);
    if ((int) $st->fetchColumn() > 0) {
        out("— $email уже существует, пропускаем");
        continue;
    }
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $pdo->prepare('INSERT INTO users (name, email, password_hash, role, demo, last_login_at) VALUES (?, ?, ?, ?, 1, NOW())')
        ->execute([$name, $email, $hash, $role]);
    $id          = (int) $pdo->lastInsertId();
    $lessonsDone = count($progress['completed']);
    $tasksDone   = $lessonsDone * 2;
    $pdo->prepare('INSERT INTO progress (user_id, xp, lessons_done, tasks_done, data) VALUES (?, ?, ?, ?, ?)')
        ->execute([$id, $progress['xp'], $lessonsDone, $tasksDone, json_encode($progress, JSON_UNESCAPED_UNICODE)]);
    out("+ $email ($role) — $lessonsDone/" . TOTAL_LESSONS . ' уроков, ' . $progress['xp'] . ' XP');
}

out('');
out('Готово. Вход администратора: admin@jsmaster.ru / admin123');
out('!!! Теперь удалите файл api/seed.php с сервера !!!');
