import { levels, flatLessons, totalLessons, totalTasks, totalTests, totalMinutes } from "../data/course";
import type { ProgressState } from "../hooks/useProgress";
import { Reveal } from "../hooks/useReveal";
import { Terminal } from "./Terminal";
import {
  IconArrowRight, IconCheck, IconClock, IconCode, IconLayers, IconPlay,
  IconTerminal, IconTrophy, IconZap,
} from "./icons";

export function lessonStatus(id: string, p: ProgressState): "done" | "started" | "new" {
  if (p.completed[id]) return "done";
  const hasQuiz = (p.quiz[id] ?? []).some((a) => a !== null);
  const hasTasks = Object.values(p.tasks[id] ?? {}).some(Boolean);
  return hasQuiz || hasTasks ? "started" : "new";
}

const TOPICS = [
  "замыкания", "Event Loop", "прототипы", "Promise.all", "async/await", "Proxy",
  "генераторы", "curry + pipe", "WeakMap", "this и bind", "деструктуризация",
  "map/filter/reduce", "классы и #private", "модули ESM", "сборка мусора", "эмиттеры",
];

export function Home({
  progress,
  xp,
  onOpenLesson,
  onPlayground,
}: {
  progress: ProgressState;
  xp: number;
  onOpenLesson: (id: string) => void;
  onPlayground: () => void;
}) {
  const doneCount = Object.keys(progress.completed).length;
  const percent = Math.round((doneCount / totalLessons) * 100);
  const nextLesson = flatLessons.find((l) => lessonStatus(l.id, progress) !== "done");

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
      {/* ---- открытие: код, а не баннер ---- */}
      <section className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-12 items-center pt-12 lg:pt-16 pb-16">
        <Reveal>
          <div className="chip border-js/30 text-js bg-js/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-js glow-pulse" />
            интерактивный курс · 5 уровней · от основ до платформы
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight text-ink">
            JavaScript
            <br />
            <span className="text-js">от junior</span> <span className="text-dim">до</span>{" "}
            <span className="text-sky">senior</span>
          </h1>
          <p className="mt-6 text-mute text-[15.5px] leading-relaxed max-w-xl">
            Не видео на 40 часов, а плотная практика: читаешь концентрат теории, запускаешь живые
            примеры прямо в уроке, проходишь квиз и решаешь задачи, которые{" "}
            <strong className="text-ink">проверяются автотестами</strong>. Прогресс сохраняется —
            можно уйти и вернуться.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="btn-primary px-5 py-3 text-[14.5px]" onClick={() => onOpenLesson(nextLesson?.id ?? "j1")}>
              <IconPlay className="w-4 h-4" strokeWidth={2.4} />
              {doneCount === 0 ? "Начать с первого урока" : doneCount === totalLessons ? "Курс пройден — повторить" : `Продолжить: ${nextLesson?.title}`}
            </button>
            <button className="btn-ghost py-3" onClick={onPlayground}>
              <IconTerminal className="w-4 h-4" />
              Песочница
            </button>
          </div>

          <div className="mt-8 max-w-xl">
            <div className="flex items-center justify-between font-mono text-[12px] text-mute mb-2">
              <span>прогресс курса</span>
              <span className="text-ink">
                {doneCount}/{totalLessons} · {percent}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-panel2 border border-line overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-mint via-js to-sky transition-all duration-700"
                style={{ width: `${Math.max(percent, 1.5)}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center gap-4 font-mono text-[12px] text-dim">
              <span className="inline-flex items-center gap-1.5 text-js">
                <IconZap className="w-3.5 h-3.5" /> {xp} XP
              </span>
              {doneCount === totalLessons && (
                <span className="inline-flex items-center gap-1.5 text-mint">
                  <IconTrophy className="w-3.5 h-3.5" /> все уроки закрыты
                </span>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="relative">
          <div className="absolute -top-6 -right-2 sm:right-6 chip border-mint/30 text-mint bg-mint/5 float-y z-10">
            {"=> стрелочные функции"}
          </div>
          <div className="absolute -bottom-5 -left-2 sm:left-4 chip border-sky/30 text-sky bg-sky/5 float-y z-10" style={{ animationDelay: "1.4s" }}>
            {"await Promise.all()"}
          </div>
          <Terminal />
        </Reveal>
      </section>

      {/* ---- статистика ---- */}
      <Reveal>
        <section className="grid grid-cols-2 lg:grid-cols-4 border border-line rounded-xl overflow-hidden bg-panel/50">
          {[
            { icon: <IconLayers className="w-5 h-5 text-js" />, value: String(totalLessons), label: "уроков с теорией и практикой" },
            { icon: <IconCode className="w-5 h-5 text-sky" />, value: String(totalTasks), label: "заданий с эталонными решениями" },
            { icon: <IconCheck className="w-5 h-5 text-mint" />, value: `${totalTests}+`, label: "автотестов проверяют ваш код" },
            { icon: <IconClock className="w-5 h-5 text-coral" />, value: `≈${Math.round(totalMinutes / 60)} ч`, label: "плотного чтения и кода" },
          ].map((s, i) => (
            <div key={i} className={`p-5 sm:p-6 ${i > 0 ? "border-l border-line max-lg:border-l-0 max-lg:[&:nth-child(3)]:border-t max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(n+3)]:border-t lg:border-t-0" : ""} ${i >= 1 ? "lg:border-l" : ""}`}>
              <div className="flex items-center gap-2.5">
                {s.icon}
                <span className="font-display font-bold text-2xl text-ink">{s.value}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-mute leading-snug">{s.label}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* ---- карта курса ---- */}
      <section className="mt-20">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Карта курса</h2>
              <p className="text-mute mt-2 text-[14.5px]">Пять уровней, один путь: язык → ядро → браузер → инженерия → платформа. Урок закрывается, когда пройден квиз и все задания.</p>
            </div>
            <div className="font-mono text-[12px] text-dim">
              {doneCount === totalLessons ? "// маршрут завершён" : "// рекомендуемый порядок — сверху вниз"}
            </div>
          </div>
        </Reveal>

        <div className="space-y-6">
          {levels.map((level, li) => {
            const levelDone = level.lessons.filter((l) => lessonStatus(l.id, progress) === "done").length;
            const levelPercent = Math.round((levelDone / level.lessons.length) * 100);
            return (
              <Reveal key={level.id} delay={li * 90}>
                <div className="panel overflow-hidden group hover:border-line2 transition-colors">
                  <div className="grid lg:grid-cols-[300px_1fr]">
                    <div className="p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-line relative overflow-hidden">
                      <div
                        className="absolute -right-8 -top-10 font-display font-extrabold text-[110px] leading-none opacity-[0.07] select-none"
                        style={{ color: level.accent }}
                      >
                        {String(li + 1).padStart(2, "0")}
                      </div>
                      <div className="chip mb-4" style={{ borderColor: `${level.accent}55`, color: level.accent, background: `${level.accent}0d` }}>
                        уровень {li + 1} · {level.title}
                      </div>
                      <h3 className="font-display font-bold text-xl text-ink">{level.label}</h3>
                      <p className="mt-2.5 text-[13.5px] text-mute leading-relaxed">{level.tagline}</p>
                      <div className="mt-5">
                        <div className="flex justify-between font-mono text-[11.5px] text-dim mb-1.5">
                          <span>{levelDone}/{level.lessons.length} уроков</span>
                          <span style={{ color: level.accent }}>{levelPercent}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-panel2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${levelPercent}%`, background: level.accent }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="grid sm:grid-cols-2 gap-2">
                        {level.lessons.map((lesson, i) => {
                          const st = lessonStatus(lesson.id, progress);
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => onOpenLesson(lesson.id)}
                              className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg border transition-all duration-200 group/item ${
                                st === "done"
                                  ? "border-mint/25 bg-mint/[0.04] hover:bg-mint/[0.09] hover:border-mint/40"
                                  : st === "started"
                                    ? "border-js/25 bg-js/[0.04] hover:bg-js/[0.09] hover:border-js/40"
                                    : "border-line bg-panel2/40 hover:bg-panel2 hover:border-line2 hover:translate-x-1"
                              }`}
                            >
                              <span
                                className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-mono text-[11.5px] font-semibold border ${
                                  st === "done"
                                    ? "bg-mint/15 border-mint/40 text-mint"
                                    : st === "started"
                                      ? "bg-js/10 border-js/40 text-js"
                                      : "bg-panel3 border-line text-mute"
                                }`}
                              >
                                {st === "done" ? <IconCheck className="w-3.5 h-3.5" strokeWidth={2.6} /> : String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[13.5px] font-medium text-ink truncate">{lesson.title}</span>
                                <span className="block text-[11.5px] text-dim font-mono">{lesson.minutes} мин · {lesson.tasks.length} зад. · {lesson.quiz.length} вопр.</span>
                              </span>
                              <IconArrowRight className="w-4 h-4 ml-auto shrink-0 text-dim opacity-0 group-hover/item:opacity-100 group-hover/item:text-ink transition-all" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---- механика урока ---- */}
      <section className="mt-20">
        <Reveal>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-10">
            Как устроен каждый урок
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {[
            { n: "01", t: "Концентрат теории", d: "Без воды: только то, что спрашивают на ревью и собеседованиях. С предупреждениями о ловушках.", c: "#f7df1e", off: "lg:mt-0" },
            { n: "02", t: "Живые примеры", d: "Каждый блок кода запускается кнопкой — вывод консоли появляется прямо в уроке.", c: "#4cc3ff", off: "lg:mt-8" },
            { n: "03", t: "Квиз с разбором", d: "Вопросы на понимание, а не на память. Каждый ответ сопровождается объяснением.", c: "#3ddc97", off: "lg:mt-16" },
            { n: "04", t: "Задачи + автотесты", d: "Пишете код в редакторе, тесты проверяют. Застряли — эталонное решение в один клик.", c: "#ff7a8f", off: "lg:mt-24" },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className={s.off}>
              <div className="panel p-5 h-full hover:border-line2 transition-colors relative overflow-hidden">
                <div className="font-display font-extrabold text-4xl" style={{ color: `${s.c}33` }}>
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold text-[15px] text-ink">{s.t}</h3>
                <p className="mt-2 text-[13px] text-mute leading-relaxed">{s.d}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${s.c}, transparent)` }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- бегущая строка тем ---- */}
      <Reveal className="mt-20">
        <div className="relative border-y border-line py-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex gap-10 w-max ticker-track">
            {[...TOPICS, ...TOPICS].map((t, i) => (
              <span key={i} className="font-mono text-[13px] text-dim whitespace-nowrap">
                <span className="text-js mr-10">//</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---- финальный призыв ---- */}
      <Reveal className="mt-20">
        <div className="panel relative overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-[0.05] font-mono text-[11px] leading-5 text-js select-none pointer-events-none p-4 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i}>const mastery = practice(theory, tasks, feedback); // повторять до senior</div>
            ))}
          </div>
          <h2 className="relative font-display font-bold text-2xl sm:text-[2rem] leading-tight text-ink max-w-2xl mx-auto">
            Пройдите все {totalLessons} уроков — и JavaScript перестанет быть магией
          </h2>
          <p className="relative text-mute mt-4 max-w-xl mx-auto text-[14.5px]">
            Каждое задание из курса — упрощённая версия того, что пишут в реальных проектах.
            Решите их все — и собеседование уровня middle станет формальностью.
          </p>
          <button
            className="relative btn-primary px-6 py-3.5 text-[15px] mt-7"
            onClick={() => onOpenLesson(nextLesson?.id ?? "j1")}
          >
            <IconPlay className="w-4 h-4" strokeWidth={2.4} />
            {doneCount === 0 ? "Урок 01 — Первый код" : `Урок ${String((nextLesson ? flatLessons.indexOf(nextLesson) + 1 : totalLessons)).padStart(2, "0")} — ${nextLesson?.title ?? "финиш"}`}
          </button>
        </div>
      </Reveal>
    </div>
  );
}
