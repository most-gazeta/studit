import { useCallback, useEffect, useRef, useState } from "react";
import { remoteMode, getToken, apiSaveProgress } from "../lib/api";

export interface ProgressEvent {
  ts: number;
  text: string;
  xp: number;
}

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
  /** день YYYY-MM-DD -> набрано XP */
  days: Record<string, number>;
  /** последние события (новые в начале) */
  events: ProgressEvent[];
}

export const PROGRESS_PREFIX = "jsmaster-progress-v1";
const LEGACY_KEY = "jsmaster-progress-v1";

export const EMPTY: ProgressState = {
  xp: 0,
  completed: {},
  quiz: {},
  tasks: {},
  editors: {},
  days: {},
  events: [],
};

export function progressKey(storageId: string) {
  return `${PROGRESS_PREFIX}:${storageId}`;
}

export function readProgress(storageId: string): ProgressState {
  try {
    // миграция со старой общей схемы
    if (storageId === "guest") {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy && !localStorage.getItem(progressKey("guest"))) {
        localStorage.setItem(progressKey("guest"), legacy);
        localStorage.removeItem(LEGACY_KEY);
      }
    }
    const raw = localStorage.getItem(progressKey(storageId));
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    const merged = { ...EMPTY, ...parsed };
    // PHP/MySQL отдают пустые JSON-объекты как массивы [] — приводим карты к объектам
    const asObject = (v: unknown): Record<string, unknown> =>
      v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
    merged.completed = asObject(merged.completed) as ProgressState["completed"];
    merged.quiz = asObject(merged.quiz) as ProgressState["quiz"];
    merged.tasks = asObject(merged.tasks) as ProgressState["tasks"];
    merged.editors = asObject(merged.editors) as ProgressState["editors"];
    merged.days = asObject(merged.days) as ProgressState["days"];
    if (!Array.isArray(merged.events)) merged.events = [];
    return merged;
  } catch {
    return { ...EMPTY };
  }
}

export function writeProgress(storageId: string, state: ProgressState) {
  try {
    localStorage.setItem(progressKey(storageId), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function clearProgress(storageId: string) {
  try {
    localStorage.removeItem(progressKey(storageId));
  } catch {
    /* ignore */
  }
}

export function isProgressEmpty(s: ProgressState): boolean {
  return s.xp === 0 && Object.keys(s.completed).length === 0 && Object.keys(s.tasks).length === 0;
}

function dayKey(ts = Date.now()): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function bump(s: ProgressState, text: string, gained: number): ProgressState {
  const d = dayKey();
  return {
    ...s,
    xp: s.xp + gained,
    days: { ...s.days, [d]: (s.days[d] ?? 0) + gained },
    events: [{ ts: Date.now(), text, xp: gained }, ...s.events].slice(0, 60),
  };
}

/**
 * Прогресс, привязанный к учётной записи (или "guest").
 * При смене storageId состояние перечитывается из localStorage.
 */
export function useProgress(storageId: string) {
  const [state, setState] = useState<ProgressState>(() => readProgress(storageId));

  useEffect(() => {
    setState(readProgress(storageId));
  }, [storageId]);

  // При смене аккаунта пропускаем одну запись, чтобы не затереть
  // чужой ключ устаревшим состоянием предыдущего пользователя.
  const savedKey = useRef(storageId);
  useEffect(() => {
    if (savedKey.current !== storageId) {
      savedKey.current = storageId;
      return;
    }
    writeProgress(storageId, state);
  }, [storageId, state]);

  // Серверный режим: отложенная синхронизация с MySQL через API
  useEffect(() => {
    if (!remoteMode || storageId === "guest" || !getToken()) return;
    const t = setTimeout(() => {
      apiSaveProgress(state).catch(() => {
        /* офлайн — данные останутся локально, отправятся при следующем изменении */
      });
    }, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, storageId]);

  const answerQuiz = useCallback(
    (
      lessonId: string,
      qIndex: number,
      option: number,
      correct: boolean,
      firstCorrect: boolean,
      label?: string
    ) => {
      setState((s) => {
        const arr = [...(s.quiz[lessonId] ?? [])];
        while (arr.length <= qIndex) arr.push(null);
        arr[qIndex] = option;
        const gained = correct && firstCorrect ? 5 : 0;
        const next = { ...s, quiz: { ...s.quiz, [lessonId]: arr } };
        return gained ? bump(next, `Верный ответ: ${label ?? lessonId}, вопрос ${qIndex + 1}`, gained) : next;
      });
    },
    []
  );

  const passTask = useCallback((lessonId: string, taskId: string, label?: string) => {
    setState((s) => {
      if (s.tasks[lessonId]?.[taskId]) return s;
      const next = {
        ...s,
        tasks: { ...s.tasks, [lessonId]: { ...(s.tasks[lessonId] ?? {}), [taskId]: true } },
      };
      return bump(next, `Задача пройдена: ${label ?? taskId}`, 20);
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, label?: string) => {
    setState((s) => {
      if (s.completed[lessonId]) return s;
      const next = { ...s, completed: { ...s.completed, [lessonId]: Date.now() } };
      return bump(next, `Урок пройден: ${label ?? lessonId}`, 30);
    });
  }, []);

  const saveEditor = useCallback((taskId: string, code: string) => {
    setState((s) => ({ ...s, editors: { ...s.editors, [taskId]: code } }));
  }, []);

  /** Перечитать состояние с диска для заданного хранилища (после импорта/админских действий) */
  const reload = useCallback((sid: string) => {
    savedKey.current = sid;
    setState(readProgress(sid));
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...EMPTY });
    clearProgress(storageId);
  }, [storageId]);

  return { state, answerQuiz, passTask, completeLesson, saveEditor, resetAll, reload };
}

export type ProgressApi = ReturnType<typeof useProgress>;
