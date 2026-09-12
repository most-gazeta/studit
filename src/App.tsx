import { useEffect, useRef, useState } from "react";
import {
  getCourse, findLessonAny, flatLessonsOf, courses, ALL_TOTALS, type CourseId,
} from "./data/courses";
import {
  useProgress,
  readProgress,
  writeProgress,
  clearProgress,
  isProgressEmpty,
} from "./hooks/useProgress";
import {
  seedIfNeeded, getSessionUserId, getUserById, login, register, logout,
  touchLogin, remoteMode, loginRemote, registerRemote, bootRemote,
  logoutRemote, getRemoteCachedUser, type User,
} from "./lib/auth";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";
import { LessonView } from "./components/LessonView";
import { Playground } from "./components/Playground";
import { AuthView } from "./components/AuthView";
import { Dashboard, Avatar } from "./components/Dashboard";
import { AdminPanel } from "./components/AdminPanel";
import { CourseHub } from "./components/CourseHub";
import {
  IconLogo, IconMenu, IconX, IconZap, IconTrophy, IconUser, IconCrown, IconLogout, IconChevron,
} from "./components/icons";

type View =
  | { type: "hub" }
  | { type: "home" }
  | { type: "lesson"; id: string }
  | { type: "playground" }
  | { type: "auth" }
  | { type: "dashboard" }
  | { type: "admin" };

function bootUser(): User | null {
  if (remoteMode) {
    // серверный режим: мгновенно показываем кэш, затем проверяем токен через API
    return getRemoteCachedUser();
  }
  seedIfNeeded();
  const id = getSessionUserId();
  return id ? getUserById(id) : null;
}

/** Перенос гостевого прогресса в аккаунт при входе/регистрации */
function importGuestProgress(userId: string) {
  const guest = readProgress("guest");
  const target = readProgress(userId);
  if (isProgressEmpty(target) && !isProgressEmpty(guest)) {
    writeProgress(userId, guest);
    clearProgress("guest");
  }
}

export default function App() {
  const [user, setUser] = useState<User | null>(bootUser);
  const [view, setView] = useState<View>({ type: "hub" });
  const [courseId, setCourseId] = useState<CourseId>("js");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [booting, setBooting] = useState(remoteMode);
  const accountRef = useRef<HTMLDivElement | null>(null);

  // серверный режим: проверяем токен при загрузке и подтягиваем прогресс
  useEffect(() => {
    if (!remoteMode) return;
    let cancelled = false;
    bootRemote()
      .then((u) => {
        if (cancelled) return;
        setUser(u);
        // adoptRemoteUser уже записал свежий прогресс в localStorage —
        // перечитываем его в состояние, иначе отложенная синхронизация
        // отправит на сервер устаревшую локальную копию.
        if (u) reload(u.id);
      })
      .finally(() => {
        if (!cancelled) setBooting(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // прогресс текущего аккаунта (или гостя)
  const storageId = user?.id ?? "guest";
  const { state, answerQuiz, passTask, completeLesson, saveEditor, resetAll, reload } = useProgress(storageId);

  // автозавершение урока: квиз полностью верен + все задачи пройдены (по всем курсам)
  useEffect(() => {
    for (const course of courses) {
      for (const lesson of flatLessonsOf(course.id)) {
        if (state.completed[lesson.id]) continue;
        const answers = state.quiz[lesson.id] ?? [];
        const quizOk =
          lesson.quiz.length > 0 && lesson.quiz.every((q, i) => answers[i] === q.answer);
        const tasksOk = lesson.tasks.every((t) => state.tasks[lesson.id]?.[t.id]);
        if (quizOk && tasksOk) completeLesson(lesson.id, lesson.title);
      }
    }
  }, [state.quiz, state.tasks, state.completed, completeLesson]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMenuOpen(false);
    setAccountMenu(false);
  }, [view]);

  // закрытие меню аккаунта по клику вне
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountMenu(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const openLesson = (id: string) => {
    const found = findLessonAny(id);
    if (found) setCourseId(found.course.id);
    setView({ type: "lesson", id });
  };
  const totalLessons = ALL_TOTALS.lessons;
  const doneCount = Object.keys(state.completed).length;
  const percent = Math.round((doneCount / totalLessons) * 100);
  const allDone = doneCount === totalLessons;

  const lesson = view.type === "lesson" ? findLessonAny(view.id) ?? null : null;
  const course = getCourse(courseId);
  const ringR = 9;
  const ringC = 2 * Math.PI * ringR;

  const doLogout = () => {
    if (remoteMode) logoutRemote();
    else logout();
    setUser(null);
    setView({ type: "hub" });
  };

  const guardedAdmin = user?.role === "admin" ? view.type === "admin" : false;
  const effectiveView: View =
    view.type === "admin" && !guardedAdmin
      ? { type: "home" }
      : view.type === "dashboard" && !user
        ? { type: "auth" }
        : view;

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
            onClick={() => setView({ type: "hub" })}
            className="flex items-center gap-2.5 group"
            aria-label="К выбору курсов"
          >
            <span className="text-js group-hover:scale-105 transition-transform">
              <IconLogo className="w-7 h-7" />
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-ink">
              js<span className="text-dim">://</span>master
            </span>
            <span className="hidden sm:inline chip border-line text-dim text-[10px]">
              3 курса · JS + PY + BE
            </span>
          </button>

          <div className="ml-auto flex items-center gap-2 sm:gap-3.5">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[12.5px] px-2.5 py-1.5 rounded-lg border ${
                allDone ? "border-mint/40 bg-mint/10 text-mint" : "border-line text-mute"
              }`}
              title="Очки опыта за пройденные квизы и задачи"
            >
              {allDone ? <IconTrophy className="w-3.5 h-3.5" /> : <IconZap className="w-3.5 h-3.5 text-js" />}
              {state.xp} XP
            </span>

            <span className="hidden sm:flex items-center gap-2" title={`Пройдено ${doneCount} из ${totalLessons} уроков`}>
              <svg viewBox="0 0 24 24" className="w-7 h-7 -rotate-90">
                <circle cx="12" cy="12" r={ringR} fill="none" stroke="#1d2c4d" strokeWidth="3" />
                <circle
                  cx="12" cy="12" r={ringR} fill="none"
                  stroke={allDone ? "#3ddc97" : "#f7df1e"}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={ringC}
                  strokeDashoffset={ringC * (1 - percent / 100)}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="font-mono text-[12.5px] text-mute">{percent}%</span>
            </span>

            {/* ---- аккаунт ---- */}
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountMenu((v) => !v)}
                  className={`flex items-center gap-2 rounded-lg border px-1.5 py-1 transition-colors ${
                    accountMenu ? "border-line2 bg-panel2" : "border-line hover:border-line2 hover:bg-panel2"
                  }`}
                  aria-label="Меню аккаунта"
                >
                  <Avatar user={user} size="sm" />
                  <span className="hidden md:block text-[13px] font-medium text-ink max-w-[110px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <IconChevron className={`w-3.5 h-3.5 text-dim transition-transform ${accountMenu ? "rotate-180" : ""}`} />
                </button>

                {accountMenu && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-60 panel shadow-[0_18px_50px_rgba(0,0,0,0.5)] overflow-hidden pop-in z-50">
                    <div className="px-4 py-3.5 border-b border-line bg-panel2/40">
                      <p className="text-[13.5px] font-semibold text-ink truncate">{user.name}</p>
                      <p className="font-mono text-[11px] text-dim truncate">{user.email}</p>
                      {user.role === "admin" && (
                        <span className="chip border-js/40 text-js bg-js/5 mt-2">
                          <IconCrown className="w-3 h-3" /> администратор
                        </span>
                      )}
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={() => setView({ type: "dashboard" })}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-mute hover:text-ink hover:bg-panel2 transition-colors"
                      >
                        <IconUser className="w-4 h-4" /> Личный кабинет
                      </button>
                      {user.role === "admin" && (
                        <button
                          onClick={() => setView({ type: "admin" })}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-mute hover:text-ink hover:bg-panel2 transition-colors"
                        >
                          <IconCrown className="w-4 h-4 text-js" /> Админ-панель
                        </button>
                      )}
                      <button
                        onClick={doLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-mute hover:text-coral hover:bg-coral/5 transition-colors"
                      >
                        <IconLogout className="w-4 h-4" /> Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setView({ type: "auth" })} className="btn-primary px-3.5 py-2 text-[13px]">
                <IconUser className="w-4 h-4" />
                <span className="hidden sm:inline">Войти</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto lg:grid lg:grid-cols-[290px_1fr]">
        {/* ---- сайдбар (desktop) ---- */}
        <aside className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] border-r border-line">
          <Sidebar
            course={course}
            progress={state}
            currentLessonId={view.type === "lesson" ? view.id : null}
            onOpenLesson={openLesson}
            onHome={() => setView({ type: "home" })}
            onPlayground={() => setView({ type: "playground" })}
            onReset={resetAll}
            onHub={() => setView({ type: "hub" })}
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
                  course={course}
                  progress={state}
                  currentLessonId={view.type === "lesson" ? view.id : null}
                  onOpenLesson={openLesson}
                  onHome={() => setView({ type: "home" })}
                  onPlayground={() => setView({ type: "playground" })}
                  onReset={resetAll}
                  onHub={() => setView({ type: "hub" })}
                />
              </div>
            </div>
          </div>
        )}

        {/* ---- контент ---- */}
        <main className="min-w-0">
          {booting ? (
            <div className="flex flex-col items-center justify-center py-36 gap-3.5">
              <span className="w-9 h-9 border-2 border-js/25 border-t-js rounded-full spin-slow" />
              <span className="font-mono text-[12.5px] text-mute">подключение к серверу…</span>
            </div>
          ) : (
          <>
          {effectiveView.type === "hub" && (
            <CourseHub
              progress={state}
              onOpenCourse={(id) => {
                setCourseId(id as CourseId);
                setView({ type: "home" });
              }}
            />
          )}
          {effectiveView.type === "home" && (
            <Home
              course={course}
              progress={state}
              xp={state.xp}
              onOpenLesson={openLesson}
              onPlayground={() => setView({ type: "playground" })}
              onHub={() => setView({ type: "hub" })}
            />
          )}
          {effectiveView.type === "lesson" && lesson && (
            <LessonView
              key={lesson.id}
              course={lesson.course}
              lesson={lesson}
              levelTitle={lesson.level.title}
              levelAccent={lesson.level.accent}
              progress={state}
              onAnswer={(qi, opt) => {
                const q = lesson.quiz[qi];
                const prevAnswer = (state.quiz[lesson.id] ?? [])[qi];
                const firstCorrect = prevAnswer !== q.answer;
                answerQuiz(lesson.id, qi, opt, opt === q.answer, firstCorrect, lesson.title);
              }}
              onSaveCode={(taskId, code) => saveEditor(taskId, code)}
              onPassTask={(taskId) => passTask(lesson.id, taskId, lesson.tasks.find((t) => t.id === taskId)?.title)}
              onOpenLesson={openLesson}
              onHome={() => {
                setCourseId(lesson.course.id);
                setView({ type: "home" });
              }}
            />
          )}
          {effectiveView.type === "lesson" && !lesson && (
            <div className="p-16 text-center text-mute font-mono">урок не найден</div>
          )}
          {effectiveView.type === "playground" && <Playground language={course.language} />}

          {effectiveView.type === "auth" && (
            <AuthView
              guestXp={readProgress("guest").xp}
              doLogin={remoteMode ? loginRemote : login}
              doRegister={remoteMode ? registerRemote : register}
              onGuest={() => setView({ type: "home" })}
              onAuthed={() => {
                if (remoteMode) {
                  // loginRemote/registerRemote уже перенесли прогресс и сохранили пользователя
                  const u = getRemoteCachedUser();
                  if (u) setUser(u);
                  setView({ type: "dashboard" });
                  return;
                }
                const id = getSessionUserId();
                const u = id ? getUserById(id) : null;
                if (u) {
                  importGuestProgress(u.id);
                  reload(u.id); // сразу показать перенесённый гостевой прогресс
                  setUser(u);
                }
                setView({ type: "dashboard" });
              }}
            />
          )}

          {effectiveView.type === "dashboard" && user && (
            <Dashboard
              user={user}
              progress={state}
              onOpenLesson={openLesson}
              onLogout={doLogout}
              onAdmin={user.role === "admin" ? () => setView({ type: "admin" }) : undefined}
            />
          )}

          {effectiveView.type === "admin" && user?.role === "admin" && (
            <AdminPanel currentUser={user} onHome={() => setView({ type: "home" })} onLogout={doLogout} />
          )}
          </>
          )}
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
            ECMA-262 · {totalLessons} уроков ·{" "}
            {remoteMode ? (
              <span className="text-mint">режим: сервер + MySQL</span>
            ) : user ? (
              `аккаунт: ${user.email}`
            ) : (
              "демо-режим: данные в вашем браузере"
            )}
          </span>
        </div>
      </footer>
    </div>
  );
}

// touchLogin используется при старте сессии, чтобы админ видел актуальный «последний вход»
if (typeof window !== "undefined" && !remoteMode) {
  const id = getSessionUserId();
  if (id) touchLogin(id);
}
