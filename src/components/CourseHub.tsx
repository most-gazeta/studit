import type { ProgressState } from "../hooks/useProgress";
import { courses, totalsOf, courseStats, type CourseDef } from "../data/courses";
import { Reveal } from "../hooks/useReveal";
import { Terminal } from "./Terminal";
import {
  IconArrowRight, IconCheck, IconClock, IconCode, IconFlag, IconPlay, IconZap,
} from "./icons";

function CourseCard({
  course,
  progress,
  onOpen,
  delay,
}: {
  course: CourseDef;
  progress: ProgressState;
  onOpen: (courseId: string) => void;
  delay: number;
}) {
  const totals = totalsOf(course.id);
  const stats = courseStats(course.id, progress);
  const ringR = 30;
  const ringC = 2 * Math.PI * ringR;

  return (
    <Reveal delay={delay}>
      <button
        onClick={() => onOpen(course.id)}
        className="group w-full text-left panel overflow-hidden transition-all duration-300 hover:border-line2 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="grid sm:grid-cols-[110px_1fr_auto] gap-5 p-6 sm:p-7 items-center">
          {/* глиф языка */}
          <div className="hidden sm:flex flex-col items-center gap-2.5">
            <span
              className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center font-display font-extrabold text-2xl transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2"
              style={{
                color: course.id === "js" ? "#141414" : "#0d1626",
                background: `linear-gradient(135deg, ${course.accent}, ${course.accent2})`,
                borderColor: course.accent,
              }}
            >
              {course.code}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-dim">
              {course.language}
            </span>
          </div>

          {/* описание */}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-display font-bold text-[1.35rem] text-ink leading-tight group-hover:text-white transition-colors">
                {course.title}
              </h3>
              {stats.percent === 100 ? (
                <span className="chip border-mint/40 text-mint bg-mint/5">
                  <IconCheck className="w-3 h-3" /> пройден
                </span>
              ) : stats.started ? (
                <span className="chip border-js/40 text-js bg-js/5">в процессе</span>
              ) : (
                <span className="chip border-line text-dim">новый</span>
              )}
            </div>
            <p className="text-mute text-[13.5px] mt-2 leading-relaxed max-w-2xl">{course.tagline}</p>

            <div className="mt-3.5 flex items-center gap-2 flex-wrap font-mono text-[11.5px] text-dim">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-line bg-panel2/50">
                {course.levels.length} уровня
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-line bg-panel2/50">
                <IconCode className="w-3 h-3" /> {totals.lessons} уроков
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-line bg-panel2/50">
                <IconFlag className="w-3 h-3" /> {totals.tasks} заданий
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-line bg-panel2/50">
                <IconClock className="w-3 h-3" /> ≈{Math.round(totals.minutes / 60)} ч
              </span>
            </div>

            <div className="mt-3.5 max-w-md">
              <div className="flex justify-between font-mono text-[10.5px] text-dim mb-1">
                <span>{stats.lessonsDone}/{totals.lessons} уроков</span>
                <span style={{ color: course.accent }}>{stats.percent}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-panel2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${stats.percent}%`, background: `linear-gradient(90deg, ${course.accent}, ${course.accent2})` }}
                />
              </div>
            </div>
          </div>

          {/* действие */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <svg viewBox="0 0 72 72" className="w-[72px] h-[72px] -rotate-90">
                <circle cx="36" cy="36" r={ringR} fill="none" stroke="#16233f" strokeWidth="6" />
                <circle
                  cx="36" cy="36" r={ringR} fill="none"
                  stroke={course.accent}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={ringC} strokeDashoffset={ringC * (1 - stats.percent / 100)}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[13px] text-ink">
                {stats.percent}%
              </span>
            </div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-[13.5px] transition-all duration-200 group-hover:gap-3"
              style={{
                background: course.accent,
                color: course.id === "js" ? "#141414" : "#0d1626",
              }}
            >
              <IconPlay className="w-3.5 h-3.5" strokeWidth={2.6} />
              {stats.percent === 100 ? "Повторить" : stats.started ? "Продолжить" : "Начать курс"}
            </span>
          </div>
        </div>
        <div className="h-[3px] w-full transition-all duration-300" style={{ background: `linear-gradient(90deg, ${course.accent}, transparent 70%)` }} />
      </button>
    </Reveal>
  );
}

export function CourseHub({
  progress,
  onOpenCourse,
}: {
  progress: ProgressState;
  onOpenCourse: (courseId: string) => void;
}) {
  const jsStats = courseStats("js", progress);
  const pyStats = courseStats("py", progress);
  const anyStarted = jsStats.started || pyStats.started;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
      {/* ---- открытие платформы ---- */}
      <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center pt-12 lg:pt-16 pb-14">
        <Reveal>
          <div className="chip border-js/30 text-js bg-js/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-js glow-pulse" />
            платформа · 2 курса · один путь к senior
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.06] tracking-tight text-ink">
            Два языка.
            <br />
            Один путь — <span className="text-js">до мастерства</span>
          </h1>
          <p className="mt-6 text-mute text-[15.5px] leading-relaxed max-w-xl">
            Плотная практика вместо видео: концентрат теории, живые примеры, которые
            выполняются прямо в уроке, квизы и задачи с автотестами. Прогресс каждого
            курса — свой, XP и достижения — общие на аккаунт.
          </p>
          <div className="mt-7 flex items-center gap-5 flex-wrap font-mono text-[12.5px] text-dim">
            <span className="inline-flex items-center gap-2 text-ink">
              <IconCode className="w-4 h-4 text-js" /> {courses.reduce((s, c) => s + totalsOf(c.id).lessons, 0)} уроков
            </span>
            <span className="inline-flex items-center gap-2 text-ink">
              <IconFlag className="w-4 h-4 text-sky" /> {courses.reduce((s, c) => s + totalsOf(c.id).tasks, 0)} заданий
            </span>
            <span className="inline-flex items-center gap-2 text-ink">
              <IconZap className="w-4 h-4 text-mint" /> XP и стрик — общие
            </span>
          </div>
        </Reveal>

        <Reveal delay={140} className="relative">
          <div className="absolute -top-6 -right-1 sm:right-8 chip border-js/30 text-js bg-js/5 float-y z-10">
            {"// JavaScript"}
          </div>
          <div className="absolute -bottom-5 -left-1 sm:left-6 chip border-[#4b8bbe]/40 text-[#4b8bbe] bg-[#4b8bbe]/5 float-y z-10" style={{ animationDelay: "1.4s" }}>
            {"# Python"}
          </div>
          <Terminal language={anyStarted && pyStats.percent > jsStats.percent ? "python" : "javascript"} badge="выбор языка" />
        </Reveal>
      </section>

      {/* ---- курсы ---- */}
      <section>
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Выберите курс</h2>
            <p className="font-mono text-[12px] text-dim">// можно проходить оба — по очереди или параллельно</p>
          </div>
        </Reveal>
        <div className="space-y-5">
          {courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={progress}
              onOpen={onOpenCourse}
              delay={i * 110}
            />
          ))}
        </div>
      </section>

      {/* ---- как устроено ---- */}
      <Reveal className="mt-16">
        <div className="panel p-6 sm:p-7">
          <h3 className="font-display font-bold text-[15px] text-ink mb-4">Как устроено обучение</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { n: "01", t: "Теория", d: "концентрат без воды, с ловушками" },
              { n: "02", t: "Живой код", d: "запускается прямо в уроке" },
              { n: "03", t: "Квиз", d: "с разбором каждого ответа" },
              { n: "04", t: "Автотесты", d: "задачи проверяются сами" },
            ].map((s, i) => (
              <div key={s.n} className="flex sm:block items-center gap-3">
                <span className="font-display font-extrabold text-xl text-dim">{s.n}</span>
                <span className="sm:mt-1.5 block">
                  <span className="block text-[13.5px] font-semibold text-ink">{s.t}</span>
                  <span className="block text-[12px] text-mute mt-0.5">{s.d}</span>
                </span>
                {i < 3 && <IconArrowRight className="w-4 h-4 text-dim ml-auto sm:hidden" />}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---- темы обоих курсов ---- */}
      <Reveal className="mt-10">
        <div className="relative border-y border-line py-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex gap-10 w-max ticker-track">
            {[...courses.flatMap((c) => c.skills), ...courses.flatMap((c) => c.skills)].map((t, i) => (
              <span key={i} className="font-mono text-[13px] text-dim whitespace-nowrap">
                <span className="mr-10 text-js">//</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
