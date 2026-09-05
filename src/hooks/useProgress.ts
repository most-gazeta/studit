import { useCallback, useEffect, useState } from "react";

export interface ProgressState {
  xp: number;
  /** lessonId -> timestamp завершения */
  completed: Record<string, number>;
  /** lessonId -> выбранные варианты по вопросам (null = нет ответа) */
  quiz: Record<string, (number | null)[]>;
  /** lessonId -> taskId -> пройдено */
  tasks: Record<string, Record<string, boolean>>;
  /** taskId -> сохранённый код ученика */
  editors: Record<string, string>;
}

const KEY = "jsmaster-progress-v1";

const EMPTY: ProgressState = { xp: 0, completed: {}, quiz: {}, tasks: {}, editors: {} };

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* quota — ignore */
    }
  }, [state]);

  const answerQuiz = useCallback(
    (lessonId: string, qIndex: number, option: number, correct: boolean, firstCorrect: boolean) => {
      setState((s) => {
        const arr = [...(s.quiz[lessonId] ?? [])];
        while (arr.length <= qIndex) arr.push(null);
        arr[qIndex] = option;
        return { ...s, quiz: { ...s.quiz, [lessonId]: arr }, xp: correct && firstCorrect ? s.xp + 5 : s.xp };
      });
    },
    []
  );

  const passTask = useCallback((lessonId: string, taskId: string) => {
    setState((s) => {
      if (s.tasks[lessonId]?.[taskId]) return s;
      return {
        ...s,
        tasks: { ...s.tasks, [lessonId]: { ...(s.tasks[lessonId] ?? {}), [taskId]: true } },
        xp: s.xp + 20,
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setState((s) => {
      if (s.completed[lessonId]) return s;
      return { ...s, completed: { ...s.completed, [lessonId]: Date.now() }, xp: s.xp + 30 };
    });
  }, []);

  const saveEditor = useCallback((taskId: string, code: string) => {
    setState((s) => ({ ...s, editors: { ...s.editors, [taskId]: code } }));
  }, []);

  const resetAll = useCallback(() => {
    setState(EMPTY);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { state, answerQuiz, passTask, completeLesson, saveEditor, resetAll };
}

export type ProgressApi = ReturnType<typeof useProgress>;
