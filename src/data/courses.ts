import type { Lesson, Level, LessonLanguage } from "../lib/types";
import type { ProgressState } from "../hooks/useProgress";
import { juniorLessons } from "./junior";
import { middleLessons } from "./middle";
import { browserLessons } from "./browser";
import { seniorLessons } from "./senior";
import { extraJunior, extraMiddle, extraSenior } from "./extra";
import { proLessons } from "./pro";
import { pythonLessons } from "./python";

export type CourseId = "js" | "py";

export interface CourseDef {
  id: CourseId;
  /** короткая метка-глиф: JS / PY */
  code: string;
  title: string;
  shortTitle: string;
  language: LessonLanguage;
  tagline: string;
  description: string;
  accent: string;
  accent2: string;
  levels: Level[];
  skills: string[];
}

export const jsCourse: CourseDef = {
  id: "js",
  code: "JS",
  title: "JavaScript от junior до senior",
  shortTitle: "JavaScript",
  language: "javascript",
  tagline: "Язык браузера и Node.js — от первого console.log до Event Loop, Proxy и веб-компонентов.",
  description:
    "37 уроков в пяти уровнях: основы, ядро языка, браузер, инженерная глубина и платформа. Каждый пример запускается в песочнице, каждое задание проверяется автотестами.",
  accent: "#f7df1e",
  accent2: "#3ddc97",
  levels: [
    {
      id: "junior",
      title: "Junior",
      label: "Основы языка",
      tagline:
        "Синтаксис, типы, функции, коллекции и культура кода. Фундамент, без которого всё остальное — карточный домик.",
      accent: "#3ddc97",
      lessons: [...juniorLessons, ...extraJunior],
    },
    {
      id: "middle",
      title: "Middle",
      label: "Ядро языка",
      tagline:
        "Замыкания, this, прототипы, промисы, модули и все коллекции языка — то, что отличает пишущего код от понимающего его.",
      accent: "#4cc3ff",
      lessons: [...middleLessons, ...extraMiddle],
    },
    {
      id: "browser",
      title: "Browser",
      label: "DOM, события и формы",
      tagline:
        "Язык встречает окружение: дерево документа, события, геометрия, формы и загрузка страницы. Код становится интерфейсом.",
      accent: "#ffa94d",
      lessons: browserLessons,
    },
    {
      id: "senior",
      title: "Senior",
      label: "Глубина и инженерия",
      tagline:
        "Event Loop, метпрограммирование, прототипы до самого дна, память, ФП и архитектура. Мышление, за которое платят больше.",
      accent: "#ff7a8f",
      lessons: [...seniorLessons, ...extraSenior],
    },
    {
      id: "pro",
      title: "Pro",
      label: "Регулярки, сеть и платформа",
      tagline:
        "Регулярные выражения до ReDoS, бинарные данные, сеть от fetch до WebSocket, хранилища, анимации и веб-компоненты.",
      accent: "#b8e63d",
      lessons: proLessons,
    },
  ],
  skills: [
    "замыкания", "Event Loop", "прототипы", "Promise.all", "async/await", "Proxy",
    "генераторы", "curry + pipe", "WeakMap", "this и bind", "деструктуризация",
    "map/filter/reduce", "классы и #private", "модули ESM", "сборка мусора", "эмиттеры",
  ],
};

export const pyCourse: CourseDef = {
  id: "py",
  code: "PY",
  title: "Python от junior до senior",
  shortTitle: "Python",
  language: "python",
  tagline: "Язык данных и бэкенда — от print и срезов до декораторов, генераторов и dataclass.",
  description:
    "12 уроков в трёх уровнях с настоящим интерпретатором Python в браузере: примеры запускаются, задачи проверяются автотестами — как и в курсе JavaScript.",
  accent: "#4b8bbe",
  accent2: "#ffd43b",
  levels: [
    {
      id: "pyjunior",
      title: "Junior",
      label: "Основы Python",
      tagline:
        "Синтаксис отступов, типы, условия, циклы, функции и списки с comprehensions — база, на которой стоит весь язык.",
      accent: "#4b8bbe",
      lessons: pythonLessons.slice(0, 5),
    },
    {
      id: "pymiddle",
      title: "Middle",
      label: "Структуры и функции",
      tagline:
        "Словари, множества, строки, замыкания и декораторы, ООП — словарный запас уверенного питониста.",
      accent: "#ffd43b",
      lessons: pythonLessons.slice(5, 9),
    },
    {
      id: "pysenior",
      title: "Senior",
      label: "Глубина языка",
      tagline:
        "Генераторы, протоколы исключений и контекстных менеджеров, типизация и dataclass — язык изнутри.",
      accent: "#306998",
      lessons: pythonLessons.slice(9),
    },
  ],
  skills: [
    "списки и срезы", "comprehensions", "декораторы", "генераторы", "dataclass",
    "f-строки", "ООП и super", "замыкания", "nonlocal", "исключения", "with",
    "типизация", "PEP 8", "dict/set/tuple",
  ],
};

export const courses: CourseDef[] = [jsCourse, pyCourse];

export function getCourse(id: CourseId): CourseDef {
  return courses.find((c) => c.id === id) ?? jsCourse;
}

/** Определяет курс по id урока (уроки Python имеют префикс "py") */
export function courseOfLesson(lessonId: string): CourseDef {
  return lessonId.startsWith("py") ? pyCourse : jsCourse;
}

/* ---------- производные данные ---------- */

export interface FlatLesson extends Lesson {
  level: Level;
  index: number;
  course: CourseDef;
}

const flatCache = new Map<CourseId, FlatLesson[]>();

export function flatLessonsOf(courseId: CourseId): FlatLesson[] {
  let list = flatCache.get(courseId);
  if (!list) {
    list = [];
    for (const level of getCourse(courseId).levels) {
      level.lessons.forEach((lesson, i) => {
        (list as FlatLesson[]).push({ ...lesson, level, index: i, course: getCourse(courseId) });
      });
    }
    flatCache.set(courseId, list);
  }
  return list;
}

export function getLessonOf(courseId: CourseId, id: string): FlatLesson | undefined {
  return flatLessonsOf(courseId).find((l) => l.id === id);
}

/** Ищет урок во всех курсах */
export function findLessonAny(id: string): FlatLesson | undefined {
  for (const c of courses) {
    const found = getLessonOf(c.id, id);
    if (found) return found;
  }
  return undefined;
}

export function getLessonPositionOf(courseId: CourseId, id: string) {
  const flat = flatLessonsOf(courseId);
  const idx = flat.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
    number: idx + 1,
  };
}

export interface CourseTotals {
  lessons: number;
  tasks: number;
  tests: number;
  quiz: number;
  minutes: number;
}

const totalsCache = new Map<CourseId, CourseTotals>();

export function totalsOf(courseId: CourseId): CourseTotals {
  let t = totalsCache.get(courseId);
  if (!t) {
    const flat = flatLessonsOf(courseId);
    t = {
      lessons: flat.length,
      tasks: flat.reduce((s, l) => s + l.tasks.length, 0),
      tests: flat.reduce(
        (s, l) => s + l.tasks.reduce((x, task) => x + (task.tests.match(/__test\(/g)?.length ?? 0), 0),
        0
      ),
      quiz: flat.reduce((s, l) => s + l.quiz.length, 0),
      minutes: flat.reduce((s, l) => s + l.minutes, 0),
    };
    totalsCache.set(courseId, t);
  }
  return t;
}

export const ALL_TOTALS: CourseTotals = courses.reduce(
  (acc, c) => {
    const t = totalsOf(c.id);
    return {
      lessons: acc.lessons + t.lessons,
      tasks: acc.tasks + t.tasks,
      tests: acc.tests + t.tests,
      quiz: acc.quiz + t.quiz,
      minutes: acc.minutes + t.minutes,
    };
  },
  { lessons: 0, tasks: 0, tests: 0, quiz: 0, minutes: 0 }
);

/* ---------- прогресс по курсу ---------- */

export interface CourseProgress {
  lessonsDone: number;
  tasksDone: number;
  percent: number;
  nextLesson: FlatLesson | null;
  started: boolean;
}

export function courseStats(courseId: CourseId, p: ProgressState): CourseProgress {
  const flat = flatLessonsOf(courseId);
  let tasksDone = 0;
  for (const l of flat) {
    const flags = p.tasks[l.id];
    if (flags) tasksDone += Object.values(flags).filter(Boolean).length;
  }
  const lessonsDone = flat.filter((l) => p.completed[l.id]).length;
  const nextLesson = flat.find((l) => !p.completed[l.id]) ?? null;
  return {
    lessonsDone,
    tasksDone,
    percent: flat.length ? Math.round((lessonsDone / flat.length) * 100) : 0,
    nextLesson,
    started: lessonsDone > 0 || Object.keys(p.quiz).some((k) => getLessonOf(courseId, k)),
  };
}
