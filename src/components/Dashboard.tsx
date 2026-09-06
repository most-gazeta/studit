import type { User } from "../lib/auth";
import { timeAgo } from "../lib/auth";
import type { ProgressState } from "../hooks/useProgress";
import { flatLessons, levels, totalLessons, totalTasks } from "../data/course";
import {
  IconBook, IconCheckCircle, IconCode, IconCrown, IconFlame, IconLock,
  IconLogout, IconPlay, IconTrophy, IconZap, IconTarget, IconArrowRight,
} from "./icons";

const AVATAR_COLORS = ["#f7df1e", "#3ddc97", "#4cc3ff", "#ff7a8f", "#ffb454", "#b8e63d"];

export function avatarColor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export function Avatar({ user, size = "md" }: { user: User; size?: "sm" | "md" | "lg" }) {
  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const cls = size === "lg" ? "w-16 h-16 text-xl rounded-2xl" : size === "sm" ? "w-8 h-8 text-[11px] rounded-lg" : "w-10 h-10 text-[13px] rounded-xl";
  return (
    <span
      className={`${cls} shrink-0 flex items-center justify-center font-display font-bold border`}
      style={{
        color: avatarColor(user.id),
        borderColor: `${avatarColor(user.id)}55`,
        background: `${avatarColor(user.id)}14`,
      }}
    >
      {initials}
    </span>
  );
}

/* ---------- достижения ---------- */
function computeAchievements(p: ProgressState) {
  const done = (ids: string[]) => ids.every((id) => p.completed[id]);
  const lessonIds = (li: number) => levels[li].lessons.map((l) => l.id);
  const days = Object.keys(p.days).filter((d) => p.days[d] > 0).sort();
  let streak = 0;
  if (days.length) {
    const today = new Date();
    for (let back = 0; back < 400; back++) {
      const d = new Date(today.getTime() - back * 86400000).toISOString().slice(0, 10);
      if (p.days[d] > 0) streak++;
      else if (back === 0) continue; // сегодня мог ещё не заниматься
      else break;
    }
  }
  const allCorrect = flatLessons.some(
    (l) =>
      l.quiz.length > 0 &&
      (p.quiz[l.id] ?? []).length === l.quiz.length &&
      l.quiz.every((q, i) => p.quiz[l.id]?.[i] === q.answer) &&
      l.tasks.every((t) => p.tasks[l.id]?.[t.id])
  );

  return {
    streak,
    list: [
      { icon: IconPlay, name: "Первые шаги", desc: "Пройти первый урок", on: Object.keys(p.completed).length >= 1 },
      { icon: IconZap, name: "Сотня", desc: "Набрать 100 XP", on: p.xp >= 100 },
      { icon: IconZap, name: "Полкило опыта", desc: "Набрать 500 XP", on: p.xp >= 500 },
      { icon: IconTrophy, name: "Тысячник", desc: "Набрать 1000 XP", on: p.xp >= 1000 },
      { icon: IconBook, name: levels[0].title, desc: `Все уроки уровня «${levels[0].label}»`, on: done(lessonIds(0)) },
      { icon: IconBook, name: levels[1].title, desc: `Все уроки уровня «${levels[1].label}»`, on: done(lessonIds(1)) },
      { icon: IconBook, name: levels[2].title, desc: `Все уроки уровня «${levels[2].label}»`, on: done(lessonIds(2)) },
      { icon: IconBook, name: levels[3].title, desc: `Все уроки уровня «${levels[3].label}»`, on: done(lessonIds(3)) },
      { icon: IconBook, name: levels[4].title, desc: `Все уроки уровня «${levels[4].label}»`, on: done(lessonIds(4)) },
      { icon: IconTarget, name: "Перфекционист", desc: "Урок без единой ошибки", on: allCorrect },
      { icon: IconFlame, name: "Марафонец", desc: "Серия занятий 3+ дня", on: streak >= 3 },
      { icon: IconCrown, name: "Финишёр", desc: `Пройти все ${totalLessons} уроков`, on: Object.keys(p.completed).length >= totalLessons },
    ],
  };
}

function last14(p: ProgressState) {
  const out: { day: string; label: string; xp: number }[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    out.push({ day: key, label: d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }), xp: p.days[key] ?? 0 });
  }
  return out;
}

export function Dashboard({
  user,
  progress,
  onOpenLesson,
  onLogout,
  onAdmin,
}: {
  user: User;
  progress: ProgressState;
  onOpenLesson: (id: string) => void;
  onLogout: () => void;
  onAdmin?: () => void;
}) {
  const lessonsDone = Object.keys(progress.completed).length;
  const percent = Math.round((lessonsDone / totalLessons) * 100);
  let tasksDone = 0;
  for (const l of Object.values(progress.tasks)) for (const v of Object.values(l)) if (v) tasksDone++;
  const nextLesson = flatLessons.find((l) => !progress.completed[l.id]);
  const { streak, list } = computeAchievements(progress);
  const unlocked = list.filter((a) => a.on).length;
  const activity = last14(progress);
  const maxDay = Math.max(1, ...activity.map((a) => a.xp));
  const ringR = 52;
  const ringC = 2 * Math.PI * ringR;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 pb-16">
      {/* ---- профиль ---- */}
      <div className="panel p-6 sm:p-7 rise relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-js via-sky to-mint opacity-70" />
        <div className="flex flex-wrap items-center gap-4">
          <Avatar user={user} size="lg" />
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display font-bold text-[1.45rem] text-ink leading-tight">{user.name}</h1>
              {user.role === "admin" && (
                <span className="chip border-js/40 text-js bg-js/5">
                  <IconCrown className="w-3 h-3" /> админ
                </span>
              )}
              {user.demo && <span className="chip border-line text-dim">демо</span>}
            </div>
            <p className="font-mono text-[12.5px] text-mute mt-1">
              {user.email} · в курсе с {new Date(user.createdAt).toLocaleDateString("ru-RU")}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {user.role === "admin" && onAdmin && (
              <button onClick={onAdmin} className="btn-ghost py-2 px-3 text-[12.5px]">
                <IconCrown className="w-4 h-4 text-js" /> Админ-панель
              </button>
            )}
            <button onClick={onLogout} className="btn-ghost py-2 px-3 text-[12.5px]">
              <IconLogout className="w-4 h-4" /> Выйти
            </button>
          </div>
        </div>

        {nextLesson && (
          <button
            onClick={() => onOpenLesson(nextLesson.id)}
            className="mt-5 w-full flex items-center gap-3 rounded-lg border border-js/30 bg-js/5 hover:bg-js/10 px-4 py-3 text-left transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-js text-[#1a1600] flex items-center justify-center shrink-0">
              <IconPlay className="w-4 h-4" strokeWidth={2.6} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10.5px] uppercase tracking-widest text-js">
                {lessonsDone === 0 ? "начать обучение" : "продолжить"}
              </span>
              <span className="block text-[14px] font-semibold text-ink truncate">
                Урок {String(flatLessons.indexOf(nextLesson) + 1).padStart(2, "0")} — {nextLesson.title}
              </span>
            </span>
            <IconArrowRight className="w-4 h-4 ml-auto text-js shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* ---- статистика: большой процент + метрики ---- */}
      <div className="grid md:grid-cols-[290px_1fr] gap-4 mt-5">
        <div className="panel p-6 flex flex-col items-center justify-center text-center rise">
          <div className="relative">
            <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
              <circle cx="60" cy="60" r={ringR} fill="none" stroke="#16233f" strokeWidth="10" />
              <circle
                cx="60" cy="60" r={ringR} fill="none"
                stroke={percent === 100 ? "#3ddc97" : "#f7df1e"}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={ringC} strokeDashoffset={ringC * (1 - percent / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-extrabold text-3xl text-ink">{percent}%</span>
              <span className="font-mono text-[10.5px] text-dim uppercase tracking-widest">курса</span>
            </div>
          </div>
          <p className="font-mono text-[12.5px] text-mute mt-3">
            {lessonsDone} из {totalLessons} уроков
          </p>
          {percent === 100 && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-mint text-[13px] font-semibold">
              <IconTrophy className="w-4 h-4" /> Курс пройден полностью!
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <IconZap className="w-4.5 h-4.5 text-js" />, value: String(progress.xp), label: "очков опыта", extra: "квизы · задачи · уроки" },
            { icon: <IconCode className="w-4.5 h-4.5 text-sky" />, value: `${tasksDone}/${totalTasks}`, label: "задач решено", extra: "с автотестами" },
            { icon: <IconFlame className="w-4.5 h-4.5 text-coral" />, value: String(streak), label: streak === 1 ? "день серии" : "дней серии", extra: streak > 0 ? "не прерывайте!" : "займитесь сегодня" },
            { icon: <IconCheckCircle className="w-4.5 h-4.5 text-mint" />, value: `${unlocked}/${list.length}`, label: "достижений", extra: "коллекционируйте" },
          ].map((s, i) => (
            <div key={i} className="panel p-5 rise" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-2">{s.icon}<span className="font-display font-bold text-2xl text-ink">{s.value}</span></div>
              <p className="text-[13px] font-medium text-[#c3d2ec] mt-1.5">{s.label}</p>
              <p className="font-mono text-[11px] text-dim mt-0.5">{s.extra}</p>
            </div>
          ))}

          {/* прогресс по уровням — во всю ширину нижней строки */}
          <div className="panel p-5 col-span-2 lg:col-span-4">
            <div className="font-mono text-[10.5px] uppercase tracking-widest text-dim mb-3">прогресс по уровням</div>
            <div className="space-y-3">
              {levels.map((level) => {
                const done = level.lessons.filter((l) => progress.completed[l.id]).length;
                const pct = Math.round((done / level.lessons.length) * 100);
                return (
                  <div key={level.id} className="flex items-center gap-3">
                    <span className="font-mono text-[11.5px] w-20 shrink-0" style={{ color: level.accent }}>
                      {level.title}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-panel2 overflow-hidden border border-line">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${level.accent}88, ${level.accent})` }}
                      />
                    </div>
                    <span className="font-mono text-[11.5px] text-mute w-16 text-right shrink-0">
                      {done}/{level.lessons.length} · {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ---- активность + события ---- */}
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <div className="panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-[15.5px] text-ink">Активность за 14 дней</h2>
            <span className="font-mono text-[11px] text-dim">XP / день</span>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {activity.map((a) => (
              <div key={a.day} className="flex-1 flex flex-col items-center gap-1 group" title={`${a.label}: ${a.xp} XP`}>
                <span className="font-mono text-[9px] text-dim opacity-0 group-hover:opacity-100 transition-opacity">
                  {a.xp || ""}
                </span>
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${a.xp ? "bg-gradient-to-t from-js/50 to-js group-hover:to-mint" : "bg-panel2 border border-line"}`}
                  style={{ height: a.xp ? `${Math.max(8, (a.xp / maxDay) * 100)}%` : "4px" }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-dim mt-2">
            <span>{activity[0].label}</span>
            <span>сегодня</span>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="font-display font-bold text-[15.5px] text-ink mb-4">Последние события</h2>
          {progress.events.length === 0 ? (
            <p className="text-mute text-[13.5px]">
              Пока тихо. Пройдите первый квиз — и здесь появится лента событий.
            </p>
          ) : (
            <ul className="space-y-2 max-h-56 overflow-auto pr-1">
              {progress.events.slice(0, 12).map((ev, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px]">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-js" />
                  <span className="text-[#c3d2ec] truncate">{ev.text}</span>
                  <span className="ml-auto shrink-0 font-mono text-[11px] text-js">+{ev.xp}</span>
                  <span className="shrink-0 font-mono text-[11px] text-dim w-20 text-right">{timeAgo(ev.ts)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---- достижения ---- */}
      <div className="panel p-6 mt-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-[15.5px] text-ink">Достижения</h2>
          <span className="font-mono text-[11.5px] text-mute">
            открыто {unlocked} из {list.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {list.map((a, i) => {
            const Ico = a.icon;
            return (
              <div
                key={i}
                className={`relative rounded-xl border p-4 text-center transition-all duration-300 ${
                  a.on
                    ? "border-js/35 bg-js/[0.06] hover:border-js/60 hover:-translate-y-0.5"
                    : "border-line bg-panel2/40 opacity-60"
                }`}
                title={a.desc}
              >
                <span className={`inline-flex w-10 h-10 rounded-xl items-center justify-center border ${
                  a.on ? "bg-js/10 border-js/40 text-js" : "bg-panel2 border-line text-dim"
                }`}>
                  {a.on ? <Ico className="w-5 h-5" /> : <IconLock className="w-4.5 h-4.5" />}
                </span>
                <p className={`mt-2.5 text-[12.5px] font-semibold leading-tight ${a.on ? "text-ink" : "text-mute"}`}>{a.name}</p>
                <p className="font-mono text-[10px] text-dim mt-1 leading-snug">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
