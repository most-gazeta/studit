import type { Lesson, Level, LessonLanguage } from "../lib/types";
import type { ProgressState } from "../hooks/useProgress";
import { juniorLessons } from "./junior";
import { middleLessons } from "./middle";
import { browserLessons } from "./browser";
import { seniorLessons } from "./senior";
import { extraJunior, extraMiddle, extraSenior } from "./extra";
import { proLessons } from "./pro";
import { pythonLessons } from "./python";
import { backendLessons } from "./backend";

export type CourseId = "js" | "py" | "be";

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
  tagline: "Язык данных и бэкенда — от print и срезов до декораторов, генераторов, Git и настройки окружения.",
  description:
    "18 уроков в трёх уровнях с настоящим интерпретатором Python в браузере: примеры запускаются, задачи проверяются автотестами — как и в курсе JavaScript.",
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
      label: "Глубина языка и инструменты",
      tagline:
        "Генераторы, исключения, типизация, модули, регулярные выражения, функциональный стиль, командная строка, Git и настройка окружения — полный набор профессионала.",
      accent: "#306998",
      lessons: pythonLessons.slice(9),
    },
  ],
  skills: [
    "списки и срезы", "comprehensions", "декораторы", "генераторы", "dataclass",
    "f-строки", "ООП и super", "замыкания", "nonlocal", "исключения", "with",
    "типизация", "PEP 8", "dict/set/tuple", "модули и пакеты", "ввод/вывод",
    "JSON и CSV", "регулярные выражения", "map/filter/reduce", "functools.partial",
    "командная строка", "Git и контроль версий", "виртуальные окружения", "pip и requirements.txt",
  ],
};

export const backendCourse: CourseDef = {
  id: "be",
  code: "BE",
  title: "Python Backend Developer",
  shortTitle: "Backend",
  language: "python",
  tagline: "Django, PostgreSQL, Elasticsearch, Docker — полный стек backend-разработки на Python.",
  description:
    "16 уроков в семи спринтах: Django и базы данных, Docker и деплой, Elasticsearch и ETL-процессы, Code Review и SOLID, асинхронное программирование и FastAPI, авторизация и аутентификация, микросервисы и устойчивость сервисов. Практические проекты: REST API, контейнеризация, синхронизация данных, тестирование, FastAPI с кешированием, JWT/OAuth, микросервисная архитектура.",
  accent: "#092e20",
  accent2: "#44b78b",
  levels: [
    {
      id: "be-sprint1",
      title: "Спринт 1",
      label: "Django и базы данных",
      tagline:
        "Проектирование БД, Django ORM, REST API на Django REST Framework, админка и миграции.",
      accent: "#092e20",
      lessons: backendLessons.slice(0, 4),
    },
    {
      id: "be-sprint2",
      title: "Спринт 2",
      label: "Docker и деплой",
      tagline:
        "Контейнеризация приложений, docker-compose, Nginx как reverse proxy, uWSGI, продакшн-конфигурация.",
      accent: "#2496ed",
      lessons: backendLessons.slice(4, 6),
    },
    {
      id: "be-sprint3",
      title: "Спринт 3",
      label: "Elasticsearch и ETL",
      tagline:
        "Полнотекстовый поиск, индексы и агрегации, ETL-процессы для синхронизации данных из PostgreSQL в Elasticsearch.",
      accent: "#fed10a",
      lessons: backendLessons.slice(6, 8),
    },
    {
      id: "be-sprint4",
      title: "Спринт 4",
      label: "Code Review и качество кода",
      tagline:
        "Принципы код-ревью, SOLID-принципы, функциональное тестирование API, документация Swagger/OpenAPI.",
      accent: "#9c27b0",
      lessons: backendLessons.slice(8, 10),
    },
    {
      id: "be-sprint5",
      title: "Спринт 5",
      label: "Асинхронность и FastAPI",
      tagline:
        "Асинхронное программирование, корутины, FastAPI, кеширование с Redis, продакшн-конфигурация.",
      accent: "#00bcd4",
      lessons: backendLessons.slice(10, 13),
    },
    {
      id: "be-sprint6",
      title: "Спринт 6",
      label: "Авторизация и аутентификация",
      tagline:
        "JWT токены, OAuth 2.0, двухфакторная аутентификация, капча, безопасность API.",
      accent: "#e91e63",
      lessons: backendLessons.slice(13, 14),
    },
    {
      id: "be-sprint7",
      title: "Спринт 7",
      label: "Микросервисы и устойчивость",
      tagline:
        "Микросервисная архитектура, gRPC, message brokers, rate limiting, circuit breaker, мониторинг и логирование.",
      accent: "#ff5722",
      lessons: backendLessons.slice(14),
    },
  ],
  skills: [
    "проектирование БД", "нормализация", "индексы", "Django ORM", "миграции",
    "админка Django", "REST API", "Django REST Framework", "сериализаторы", "ViewSets",
    "Docker", "docker-compose", "Nginx", "uWSGI", "SSL/TLS",
    "Elasticsearch", "полнотекстовый поиск", "агрегации", "ETL", "инкрементальная синхронизация",
    "Airflow", "PostgreSQL", "reverse proxy", "контейнеризация",
    "Code Review", "SOLID", "функциональное тестирование", "pytest", "Swagger", "OpenAPI",
    "async/await", "корутины", "asyncio", "FastAPI", "Pydantic", "Redis", "кеширование",
    "JWT", "OAuth 2.0", "OpenID Connect", "двухфакторная аутентификация", "TOTP", "капча", "reCAPTCHA",
    "микросервисы", "gRPC", "RabbitMQ", "Apache Kafka", "Circuit Breaker", "Rate Limiting",
    "health checks", "мониторинг", "Prometheus", "Grafana", "структурированное логирование",
  ],
};

export const courses: CourseDef[] = [jsCourse, pyCourse, backendCourse];

export function getCourse(id: CourseId): CourseDef {
  return courses.find((c) => c.id === id) ?? jsCourse;
}

/** Определяет курс по id урока */
export function courseOfLesson(lessonId: string): CourseDef {
  if (lessonId.startsWith("py")) return pyCourse;
  if (lessonId.startsWith("be")) return backendCourse;
  return jsCourse;
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
