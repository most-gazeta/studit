import { useState } from "react";
import { levels } from "../data/course";
import type { ProgressState } from "../hooks/useProgress";
import { lessonStatus } from "./Home";
import { IconCheck, IconHome, IconPlay, IconReset, IconTerminal } from "./icons";

export function Sidebar({
  progress,
  currentLessonId,
  onOpenLesson,
  onHome,
  onPlayground,
  onReset,
}: {
  progress: ProgressState;
  currentLessonId: string | null;
  onOpenLesson: (id: string) => void;
  onHome: () => void;
  onPlayground: () => void;
  onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <button
          onClick={onHome}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-[13.5px] font-medium transition-colors ${
            !currentLessonId
              ? "border-js/30 bg-js/5 text-js"
              : "border-transparent text-mute hover:text-ink hover:bg-panel2"
          }`}
        >
          <IconHome className="w-4 h-4" /> Главная · карта курса
        </button>
        <button
          onClick={onPlayground}
          className="w-full -mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-transparent text-[13.5px] font-medium text-mute hover:text-ink hover:bg-panel2 transition-colors"
        >
          <IconTerminal className="w-4 h-4" /> Песочница
        </button>

        {levels.map((level, li) => {
          const done = level.lessons.filter((l) => lessonStatus(l.id, progress) === "done").length;
          return (
            <div key={level.id}>
              <div className="px-3 mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    {String(li + 1).padStart(2, "0")} · {level.title}
                  </span>
                  <span className="font-mono text-[10.5px]" style={{ color: level.accent }}>
                    {done}/{level.lessons.length}
                  </span>
                </div>
                <div className="mt-1.5 h-[3px] rounded-full bg-panel2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(done / level.lessons.length) * 100}%`, background: level.accent }}
                  />
                </div>
              </div>
              <div className="space-y-0.5">
                {level.lessons.map((lesson, i) => {
                  const st = lessonStatus(lesson.id, progress);
                  const active = currentLessonId === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onOpenLesson(lesson.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] transition-all duration-150 group ${
                        active
                          ? "bg-panel3 border border-line2 text-ink"
                          : "border border-transparent text-mute hover:text-ink hover:bg-panel2"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-semibold ${
                          st === "done"
                            ? "bg-mint/15 text-mint"
                            : st === "started"
                              ? "bg-js/10 text-js"
                              : "bg-panel2 text-dim group-hover:text-mute"
                        }`}
                      >
                        {st === "done" ? (
                          <IconCheck className="w-3 h-3" strokeWidth={3} />
                        ) : active ? (
                          <IconPlay className="w-2.5 h-2.5 text-js" strokeWidth={2.6} />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-line">
        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-mono text-dim hover:text-coral hover:bg-coral/5 border border-transparent hover:border-coral/25 transition-colors"
          >
            <IconReset className="w-3.5 h-3.5" /> сбросить прогресс
          </button>
        ) : (
          <div className="rounded-lg border border-coral/30 bg-coral/5 p-3 pop-in">
            <p className="text-[12px] text-[#ffd6dc] mb-2.5 leading-snug">
              Весь прогресс, XP и решения будут удалены безвозвратно.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
                className="flex-1 py-1.5 rounded-md bg-coral/20 border border-coral/40 text-coral text-[12px] font-semibold hover:bg-coral/30 transition-colors"
              >
                Да, сбросить
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 py-1.5 rounded-md border border-line text-mute text-[12px] hover:text-ink transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
