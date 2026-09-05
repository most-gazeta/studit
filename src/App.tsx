import { useEffect, useState } from "react";
import { flatLessons, getLesson, totalLessons } from "./data/course";
import { useProgress } from "./hooks/useProgress";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";
import { LessonView } from "./components/LessonView";
import { Playground } from "./components/Playground";
import { IconLogo, IconMenu, IconX, IconZap, IconTrophy } from "./components/icons";

type View = { type: "home" } | { type: "lesson"; id: string } | { type: "playground" };

export default function App() {
  const { state, answerQuiz, passTask, completeLesson, saveEditor, resetAll } = useProgress();
  const [view, setView] = useState<View>({ type: "home" });
  const [menuOpen, setMenuOpen] = useState(false);

  // автозавершение урока: квиз полностью верен + все задачи пройдены
  useEffect(() => {
    for (const lesson of flatLessons) {
      if (state.completed[lesson.id]) continue;
      const answers = state.quiz[lesson.id] ?? [];
      const quizOk =
        lesson.quiz.length > 0 && lesson.quiz.every((q, i) => answers[i] === q.answer);
      const tasksOk = lesson.tasks.every((t) => state.tasks[lesson.id]?.[t.id]);
      if (quizOk && tasksOk) completeLesson(lesson.id);
    }
  }, [state.quiz, state.tasks, state.completed, completeLesson]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMenuOpen(false);
  }, [view]);

  const openLesson = (id: string) => setView({ type: "lesson", id });
  const doneCount = Object.keys(state.completed).length;
  const percent = Math.round((doneCount / totalLessons) * 100);
  const allDone = doneCount === totalLessons;

  const lesson = view.type === "lesson" ? getLesson(view.id) : null;

  const ringR = 9;
  const ringC = 2 * Math.PI * ringR;

  return (
    <div className="min-h-screen">
      <div className="ambient" />

      {/* ---- шапка ---- */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg border border-line text-mute hover:text-ink hover:bg-panel2 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню курса"
          >
            {menuOpen ? <IconX className="w-4.5 h-4.5" /> : <IconMenu className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setView({ type: "home" })}
            className="flex items-center gap-2.5 group"
            aria-label="На главную"
          >
            <span className="text-js group-hover:scale-105 transition-transform">
              <IconLogo className="w-7 h-7" />
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-ink">
              js<span className="text-dim">://</span>master
            </span>
            <span className="hidden sm:inline chip border-line text-dim text-[10px]">
              junior → senior
            </span>
          </button>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-4">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[12.5px] px-2.5 py-1.5 rounded-lg border ${
                allDone ? "border-mint/40 bg-mint/10 text-mint" : "border-line text-mute"
              }`}
              title="Очки опыта за пройденные квизы и задачи"
            >
              {allDone ? <IconTrophy className="w-3.5 h-3.5" /> : <IconZap className="w-3.5 h-3.5 text-js" />}
              {state.xp} XP
            </span>

            <span className="flex items-center gap-2" title={`Пройдено ${doneCount} из ${totalLessons} уроков`}>
              <svg viewBox="0 0 24 24" className="w-7 h-7 -rotate-90">
                <circle cx="12" cy="12" r={ringR} fill="none" stroke="#1d2c4d" strokeWidth="3" />
                <circle
                  cx="12"
                  cy="12"
                  r={ringR}
                  fill="none"
                  stroke={allDone ? "#3ddc97" : "#f7df1e"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={ringC}
                  strokeDashoffset={ringC * (1 - percent / 100)}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="font-mono text-[12.5px] text-mute hidden sm:inline">
                {percent}%
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto lg:grid lg:grid-cols-[290px_1fr]">
        {/* ---- сайдбар (desktop) ---- */}
        <aside className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] border-r border-line">
          <Sidebar
            progress={state}
            currentLessonId={view.type === "lesson" ? view.id : null}
            onOpenLesson={openLesson}
            onHome={() => setView({ type: "home" })}
            onPlayground={() => setView({ type: "playground" })}
            onReset={resetAll}
          />
        </aside>

        {/* ---- мобильный drawer ---- */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-deep border-r border-line rise shadow-2xl">
              <div className="h-14 flex items-center px-4 border-b border-line">
                <span className="text-js">
                  <IconLogo className="w-6 h-6" />
                </span>
                <span className="ml-2 font-mono text-[14px] font-semibold text-ink">
                  js<span className="text-dim">://</span>master
                </span>
                <button
                  className="ml-auto p-2 text-mute hover:text-ink"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <IconX className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="h-[calc(100%-3.5rem)]">
                <Sidebar
                  progress={state}
                  currentLessonId={view.type === "lesson" ? view.id : null}
                  onOpenLesson={openLesson}
                  onHome={() => setView({ type: "home" })}
                  onPlayground={() => setView({ type: "playground" })}
                  onReset={resetAll}
                />
              </div>
            </div>
          </div>
        )}

        {/* ---- контент ---- */}
        <main className="min-w-0">
          {view.type === "home" && (
            <Home
              progress={state}
              xp={state.xp}
              onOpenLesson={openLesson}
              onPlayground={() => setView({ type: "playground" })}
            />
          )}
          {view.type === "lesson" && lesson && (
            <LessonView
              key={lesson.id}
              lesson={lesson}
              levelTitle={lesson.level.title}
              levelAccent={lesson.level.accent}
              progress={state}
              onAnswer={(qi, opt) => {
                const q = lesson.quiz[qi];
                const prevAnswer = (state.quiz[lesson.id] ?? [])[qi];
                const firstCorrect = prevAnswer !== q.answer;
                answerQuiz(lesson.id, qi, opt, opt === q.answer, firstCorrect);
              }}
              onSaveCode={(taskId, code) => saveEditor(taskId, code)}
              onPassTask={(taskId) => passTask(lesson.id, taskId)}
              onOpenLesson={openLesson}
              onHome={() => setView({ type: "home" })}
            />
          )}
          {view.type === "lesson" && !lesson && (
            <div className="p-16 text-center text-mute font-mono">урок не найден</div>
          )}
          {view.type === "playground" && <Playground />}
        </main>
      </div>

      {/* ---- подвал ---- */}
      <footer className="border-t border-line mt-4">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-mono text-dim">
          <span className="text-mute">
            js<span className="text-dim">://</span>master — интерактивный курс JavaScript
          </span>
          <span className="hidden sm:inline">теория + песочница + автотесты</span>
          <span className="ml-auto">
            ECMA-262 · {totalLessons} уроков · прогресс хранится в вашем браузере
          </span>
        </div>
      </footer>
    </div>
  );
}
