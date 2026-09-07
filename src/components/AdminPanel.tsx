import { useCallback, useEffect, useMemo, useState } from "react";
import {
  computeUserStats, deleteUser, getUsers, reseedDemo, remoteMode,
  resetUserProgress, timeAgo, updateUser, type User, type UserStats,
} from "../lib/auth";
import { apiAdminStats, apiAdminSetRole, apiAdminReset, apiAdminDelete } from "../lib/api";
import { courses, flatLessonsOf } from "../data/courses";
import { Avatar } from "./Dashboard";

const allFlat = courses.flatMap((c) => flatLessonsOf(c.id));
const totalLessons = allFlat.length;
import {
  IconChart, IconCrown, IconDownload, IconLogout, IconReset, IconSearch,
  IconShield, IconTrash, IconUsers, IconX, IconZap, IconBook,
} from "./icons";

function StatTile({
  icon, value, label, sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="font-display font-bold text-[1.7rem] text-ink leading-none">{value}</span>
      </div>
      <p className="text-[13px] font-medium text-[#c3d2ec] mt-2">{label}</p>
      <p className="font-mono text-[11px] text-dim mt-0.5">{sub}</p>
    </div>
  );
}

function ProgressBar({ percent, accent = "#f7df1e" }: { percent: number; accent?: string }) {
  return (
    <div className="w-24 h-2 rounded-full bg-panel2 overflow-hidden border border-line shrink-0">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${percent}%`, background: accent }}
      />
    </div>
  );
}

export function AdminPanel({ currentUser, onHome, onLogout }: { currentUser: User; onHome: () => void; onLogout: () => void }) {
  const [query, setQuery] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null); // "delete" | "reset" | "reseed" | "wipe"
  const [loading, setLoading] = useState(remoteMode);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats[]>(() =>
    remoteMode ? [] : getUsers().map(computeUserStats)
  );

  const refresh = useCallback(async () => {
    if (remoteMode) {
      setLoading(true);
      setLoadError(null);
      try {
        setStats(await apiAdminStats());
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : "Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    } else {
      setStats(getUsers().map(computeUserStats));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = stats.filter(
    (s) =>
      s.user.name.toLowerCase().includes(query.toLowerCase()) ||
      s.user.email.toLowerCase().includes(query.toLowerCase())
  );

  const weekAgo = Date.now() - 7 * 86400000;
  const active = stats.filter((s) => s.lastActivity > weekAgo).length;
  const totalXp = stats.reduce((s, x) => s + x.progress.xp, 0);
  const avgPercent = stats.length ? Math.round(stats.reduce((s, x) => s + x.percent, 0) / stats.length) : 0;
  const sortedByXp = [...stats].sort((a, b) => b.progress.xp - a.progress.xp);
  const profile = profileId ? stats.find((s) => s.user.id === profileId) : null;

  /* аналитика по урокам: сколько пользователей прошли каждый урок (по курсам) */
  const lessonStats = useMemo(() => {
    const map = new Map<string, number>();
    allFlat.forEach((l) => map.set(l.id, 0));
    stats.forEach((s) => {
      Object.keys(s.progress.completed).forEach((id) => {
        if (map.has(id)) map.set(id, (map.get(id) ?? 0) + 1);
      });
    });
    return allFlat.map((l) => ({
      lesson: l,
      level: l.level,
      count: map.get(l.id) ?? 0,
    }));
  }, [stats]);
  const maxLessonCount = Math.max(1, ...lessonStats.map((l) => l.count));

  const exportCsv = () => {
    const rows = [
      ["Имя", "Email", "Роль", "Регистрация", "Последняя активность", "Уроков", "Задач", "XP", "Прогресс %"],
      ...stats.map((s) => [
        s.user.name,
        s.user.email,
        s.user.role === "admin" ? "админ" : "студент",
        new Date(s.user.createdAt).toLocaleDateString("ru-RU"),
        new Date(s.lastActivity).toLocaleDateString("ru-RU"),
        String(s.lessonsDone),
        String(s.tasksDone),
        String(s.progress.xp),
        String(s.percent),
      ]),
    ];
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jsmaster-users.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /** Выполняет действие (локально или через API) и обновляет данные */
  const act = (fn: () => void | Promise<void>) => async () => {
    await fn();
    setConfirm(null);
    await refresh();
  };

  const setRole = (id: string, role: "user" | "admin") =>
    remoteMode ? apiAdminSetRole(id, role) : Promise.resolve(updateUser(id, { role })).then(() => undefined);
  const resetProgress = (id: string) =>
    remoteMode ? apiAdminReset(id) : Promise.resolve(resetUserProgress(id));
  const removeUser = (id: string) =>
    remoteMode ? apiAdminDelete(id) : Promise.resolve(deleteUser(id));

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 pb-16">
      {/* ---- заголовок ---- */}
      <div className="flex items-center gap-3 flex-wrap rise">
        <span className="w-10 h-10 rounded-xl bg-js/10 border border-js/35 text-js flex items-center justify-center">
          <IconShield className="w-5 h-5" />
        </span>
        <div>
          <h1 className="font-display font-bold text-[1.5rem] text-ink leading-tight">Панель администратора</h1>
          <p className="font-mono text-[12px] text-dim">
            пользователи · успех · аналитика курса
            <span className={`ml-2 px-1.5 py-0.5 rounded border text-[10px] ${remoteMode ? "border-mint/40 text-mint" : "border-line text-dim"}`}>
              {remoteMode ? "MySQL API" : "localStorage"}
            </span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={exportCsv} className="btn-ghost py-2 px-3 text-[12.5px]">
            <IconDownload className="w-4 h-4" /> CSV
          </button>
          <button onClick={onHome} className="btn-ghost py-2 px-3 text-[12.5px]">
            <IconBook className="w-4 h-4" /> К курсу
          </button>
          <button onClick={onLogout} className="btn-ghost py-2 px-3 text-[12.5px]">
            <IconLogout className="w-4 h-4" /> Выйти
          </button>
        </div>
      </div>

      {/* ---- сводка ---- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatTile icon={<IconUsers className="w-5 h-5 text-js" />} value={String(stats.length)} label="пользователей" sub={`${stats.filter((s) => s.user.role === "admin").length} админ · ${stats.filter((s) => s.user.demo).length} демо`} />
        <StatTile icon={<IconZap className="w-5 h-5 text-sky" />} value={String(active)} label="активны за 7 дней" sub={`из ${stats.length} зарегистрированных`} />
        <StatTile icon={<IconChart className="w-5 h-5 text-mint" />} value={`${avgPercent}%`} label="средний прогресс" sub={`${totalXp} XP на всех`} />
        <StatTile icon={<IconCrown className="w-5 h-5 text-coral" />} value={sortedByXp[0]?.user.name.split(" ")[0] ?? "—"} label="лидер по XP" sub={`${sortedByXp[0]?.progress.xp ?? 0} XP`} />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 mt-4">
        {/* ---- таблица пользователей ---- */}
        <div className="panel overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
            <h2 className="font-display font-bold text-[15px] text-ink">Пользователи</h2>
            <div className="ml-auto relative">
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="имя или email…"
                className="bg-panel2/60 border border-line rounded-lg pl-9 pr-3 py-2 text-[13px] text-ink outline-none focus:border-js/60 w-44 sm:w-56 placeholder:text-dim"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="font-mono text-[10.5px] uppercase tracking-widest text-dim border-b border-line">
                  <th className="text-left font-medium px-5 py-2.5">пользователь</th>
                  <th className="text-left font-medium px-3 py-2.5 hidden md:table-cell">последняя активность</th>
                  <th className="text-left font-medium px-3 py-2.5">уроки</th>
                  <th className="text-left font-medium px-3 py-2.5 hidden sm:table-cell">XP</th>
                  <th className="text-left font-medium px-3 py-2.5">прогресс</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center">
                      <span className="inline-flex items-center gap-2.5 font-mono text-[12.5px] text-mute">
                        <span className="w-4 h-4 border-2 border-js/30 border-t-js rounded-full spin-slow" />
                        загружаем из базы…
                      </span>
                    </td>
                  </tr>
                )}
                {!loading && loadError && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center font-mono text-[12.5px] text-coral">
                      {loadError} · <button className="underline" onClick={() => refresh()}>повторить</button>
                    </td>
                  </tr>
                )}
                {!loading && !loadError && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-dim font-mono text-[12.5px]">
                      никто не найден по запросу «{query}»
                    </td>
                  </tr>
                )}
                {filtered.map((s) => (
                  <tr
                    key={s.user.id}
                    className="border-b border-line/60 hover:bg-panel2/50 transition-colors cursor-pointer group"
                    onClick={() => setProfileId(s.user.id)}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar user={s.user} size="sm" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-ink truncate">{s.user.name}</span>
                            {s.user.role === "admin" && <IconCrown className="w-3.5 h-3.5 text-js shrink-0" />}
                            {s.user.demo && <span className="font-mono text-[9.5px] text-dim border border-line rounded px-1">demo</span>}
                          </div>
                          <div className="font-mono text-[11px] text-dim truncate">{s.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11.5px] text-mute hidden md:table-cell whitespace-nowrap">
                      {timeAgo(s.lastActivity)}
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] text-[#c3d2ec] whitespace-nowrap">
                      {s.lessonsDone}/{totalLessons}
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] text-js hidden sm:table-cell">{s.progress.xp}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar percent={s.percent} accent={s.percent === 100 ? "#3ddc97" : "#f7df1e"} />
                        <span className="font-mono text-[11px] text-mute w-8">{s.percent}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-mono text-[11px] text-dim opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        профиль →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- правая колонка ---- */}
        <div className="space-y-4">
          {/* лидерборд */}
          <div className="panel p-5">
            <h2 className="font-display font-bold text-[15px] text-ink mb-4 flex items-center gap-2">
              <IconCrown className="w-4.5 h-4.5 text-js" /> Топ студентов
            </h2>
            <div className="space-y-2.5">
              {sortedByXp.slice(0, 5).map((s, i) => (
                <button
                  key={s.user.id}
                  onClick={() => setProfileId(s.user.id)}
                  className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-panel2 transition-colors text-left"
                >
                  <span className={`w-5 font-display font-bold text-[13px] ${i === 0 ? "text-js" : "text-dim"}`}>{i + 1}</span>
                  <Avatar user={s.user} size="sm" />
                  <span className="text-[13px] font-medium text-ink truncate">{s.user.name}</span>
                  <span className="ml-auto font-mono text-[11.5px] text-js whitespace-nowrap">{s.progress.xp} XP</span>
                </button>
              ))}
            </div>
          </div>

          {/* сервисные действия */}
          <div className="panel p-5">
            <h2 className="font-display font-bold text-[15px] text-ink mb-3">Сервис</h2>
            <div className="space-y-2">
              <button onClick={() => refresh()} className="w-full btn-ghost py-2 px-3 text-[12.5px] justify-between">
                <span className="flex items-center gap-2"><IconSearch className="w-4 h-4" /> Обновить данные</span>
              </button>
              {remoteMode && (
                <p className="font-mono text-[10.5px] text-mint leading-relaxed pt-1">
                  режим: сервер + MySQL · демо-данные создаются командой <span className="text-ink">npm run seed</span>
                </p>
              )}
              {!remoteMode && confirm === "reseed" ? (
                <div className="rounded-lg border border-amber/40 bg-amber/5 p-3 pop-in">
                  <p className="text-[12px] text-[#ffe3bd] mb-2">Демо-студенты будут пересозданы с исходным прогрессом. Продолжить?</p>
                  <div className="flex gap-2">
                    <button onClick={act(reseedDemo)} className="flex-1 py-1.5 rounded-md bg-amber/20 border border-amber/40 text-amber text-[12px] font-semibold">Да</button>
                    <button onClick={() => setConfirm(null)} className="flex-1 py-1.5 rounded-md border border-line text-mute text-[12px]">Отмена</button>
                  </div>
                </div>
              ) : !remoteMode ? (
                <button onClick={() => setConfirm("reseed")} className="w-full btn-ghost py-2 px-3 text-[12.5px] justify-between">
                  <span className="flex items-center gap-2"><IconReset className="w-4 h-4" /> Пересоздать демо-студентов</span>
                </button>
              ) : null}
              <p className="font-mono text-[10.5px] text-dim leading-relaxed pt-1">
                Демо-аккаунты помечены бейджем demo — их можно безопасно удалять и пересоздавать.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- аналитика по урокам ---- */}
      <div className="panel p-5 sm:p-6 mt-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <h2 className="font-display font-bold text-[15px] text-ink flex items-center gap-2">
            <IconChart className="w-4.5 h-4.5 text-sky" /> Проходимость уроков
          </h2>
          <span className="font-mono text-[11px] text-dim">сколько пользователей закрыли урок · помогает найти «узкие места»</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 max-h-72 overflow-auto pr-2">
          {lessonStats.map((ls, i) => (
            <div key={ls.lesson.id} className="flex items-center gap-2.5 py-1">
              <span className="font-mono text-[10px] text-dim w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[12px] text-[#c3d2ec] truncate flex-1" title={ls.lesson.title}>{ls.lesson.title}</span>
              <div className="w-16 h-1.5 rounded-full bg-panel2 overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(ls.count / maxLessonCount) * 100}%`, background: ls.level?.accent ?? "#f7df1e" }}
                />
              </div>
              <span className="font-mono text-[10.5px] text-mute w-5 text-right shrink-0">{ls.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- модалка профиля ---- */}
      {profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setProfileId(null); setConfirm(null); }} />
          <div className="relative panel w-full max-w-lg max-h-[88vh] overflow-auto rise">
            <div className="sticky top-0 bg-panel border-b border-line px-6 py-4 flex items-center gap-3">
              <Avatar user={profile.user} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-[16px] text-ink truncate">{profile.user.name}</h3>
                  {profile.user.role === "admin" && <IconCrown className="w-4 h-4 text-js shrink-0" />}
                </div>
                <p className="font-mono text-[11.5px] text-dim truncate">
                  {profile.user.email} · регистрация {new Date(profile.user.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
              <button onClick={() => { setProfileId(null); setConfirm(null); }} className="ml-auto p-2 text-mute hover:text-ink">
                <IconX className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { v: `${profile.percent}%`, l: "курс" },
                  { v: String(profile.progress.xp), l: "XP" },
                  { v: `${profile.lessonsDone}/${totalLessons}`, l: "уроков" },
                  { v: String(profile.tasksDone), l: "задач" },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border border-line bg-panel2/50 py-3">
                    <div className="font-display font-bold text-[17px] text-ink">{s.v}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-dim mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10.5px] uppercase tracking-widest text-dim mb-2.5">по уровням</div>
                <div className="space-y-2.5">
                  {(() => {
                    // Определяем курс на основе завершённых уроков
                    const completedIds = Object.keys(profile.progress.completed);
                    const hasPython = completedIds.some(id => id.startsWith("py"));
                    const course = hasPython ? courses.find(c => c.id === "py") : courses.find(c => c.id === "js");
                    const levels = course?.levels ?? [];
                    
                    return levels.map((level) => {
                      const done = level.lessons.filter((l) => profile.progress.completed[l.id]).length;
                      const pct = Math.round((done / level.lessons.length) * 100);
                      return (
                        <div key={level.id} className="flex items-center gap-3">
                          <span className="font-mono text-[11px] w-16 shrink-0" style={{ color: level.accent }}>{level.title}</span>
                          <div className="flex-1 h-2 rounded-full bg-panel2 overflow-hidden border border-line">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: level.accent }} />
                          </div>
                          <span className="font-mono text-[11px] text-mute w-12 text-right">{done}/{level.lessons.length}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {profile.progress.events.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[10.5px] uppercase tracking-widest text-dim mb-2">последние события</div>
                  <ul className="space-y-1.5">
                    {profile.progress.events.slice(0, 5).map((ev, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12.5px] text-[#c3d2ec]">
                        <span className="w-1.5 h-1.5 rounded-full bg-js shrink-0" />
                        <span className="truncate">{ev.text}</span>
                        <span className="ml-auto font-mono text-[10.5px] text-dim shrink-0">{timeAgo(ev.ts)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* действия */}
              <div className="mt-6 pt-5 border-t border-line space-y-2">
                <div className="font-mono text-[10.5px] uppercase tracking-widest text-dim">действия</div>

                {profile.user.id !== currentUser.id && (
                  <button
                    onClick={act(() => setRole(profile.user.id, profile.user.role === "admin" ? "user" : "admin"))}
                    className="w-full btn-ghost py-2 px-3 text-[12.5px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <IconCrown className="w-4 h-4 text-js" />
                      {profile.user.role === "admin" ? "Снять роль администратора" : "Назначить администратором"}
                    </span>
                  </button>
                )}

                {confirm === "reset" ? (
                  <div className="rounded-lg border border-amber/40 bg-amber/5 p-3 pop-in">
                    <p className="text-[12px] text-[#ffe3bd] mb-2">Весь прогресс пользователя будет стёрт. Продолжить?</p>
                    <div className="flex gap-2">
                      <button onClick={act(() => resetProgress(profile.user.id))} className="flex-1 py-1.5 rounded-md bg-amber/20 border border-amber/40 text-amber text-[12px] font-semibold">Стереть</button>
                      <button onClick={() => setConfirm(null)} className="flex-1 py-1.5 rounded-md border border-line text-mute text-[12px]">Отмена</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setConfirm("reset")} className="w-full btn-ghost py-2 px-3 text-[12.5px] justify-between">
                    <span className="flex items-center gap-2"><IconReset className="w-4 h-4 text-amber" /> Сбросить прогресс</span>
                  </button>
                )}

                {profile.user.id !== currentUser.id && (
                  confirm === "delete" ? (
                    <div className="rounded-lg border border-coral/40 bg-coral/5 p-3 pop-in">
                      <p className="text-[12px] text-[#ffd6dc] mb-2">Аккаунт и весь прогресс будут удалены безвозвратно.</p>
                      <div className="flex gap-2">
                        <button
                          onClick={act(async () => { await removeUser(profile.user.id); setProfileId(null); })}
                          className="flex-1 py-1.5 rounded-md bg-coral/20 border border-coral/40 text-coral text-[12px] font-semibold"
                        >
                          Удалить
                        </button>
                        <button onClick={() => setConfirm(null)} className="flex-1 py-1.5 rounded-md border border-line text-mute text-[12px]">Отмена</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirm("delete")}
                      className="w-full flex items-center gap-2 py-2 px-3 rounded-[10px] border border-coral/30 text-coral text-[12.5px] font-medium hover:bg-coral/10 transition-colors"
                    >
                      <IconTrash className="w-4 h-4" /> Удалить аккаунт
                    </button>
                  )
                )}

                {profile.user.id === currentUser.id && (
                  <p className="font-mono text-[10.5px] text-dim">Себя удалить или разжаловать нельзя — нужен ещё один админ.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
