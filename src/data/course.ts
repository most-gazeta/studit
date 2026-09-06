import type { Lesson, Level } from "../lib/types";
import { juniorLessons } from "./junior";
import { middleLessons } from "./middle";
import { seniorLessons } from "./senior";
import { extraJunior, extraMiddle, extraSenior } from "./extra";

export const levels: Level[] = [
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
    id: "senior",
    title: "Senior",
    label: "Глубина и инженерия",
    tagline:
      "Event Loop, метпрограммирование, прототипы до самого дна, память, ФП и архитектура. Мышление, за которое платят больше.",
    accent: "#ff7a8f",
    lessons: [...seniorLessons, ...extraSenior],
  },
];

export const flatLessons: (Lesson & { level: Level; index: number })[] = [];
levels.forEach((level) => {
  level.lessons.forEach((lesson, i) => {
    flatLessons.push({ ...lesson, level, index: i });
  });
});

export function getLesson(id: string) {
  return flatLessons.find((l) => l.id === id);
}

export function getLessonPosition(id: string) {
  const idx = flatLessons.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? flatLessons[idx - 1] : null,
    next: idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null,
    number: idx + 1,
  };
}

export const totalLessons = flatLessons.length;
export const totalTasks = flatLessons.reduce((s, l) => s + l.tasks.length, 0);
export const totalTests = flatLessons.reduce(
  (s, l) => s + l.tasks.reduce((t, task) => t + (task.tests.match(/__test\(/g)?.length ?? 0), 0),
  0
);
export const totalQuiz = flatLessons.reduce((s, l) => s + l.quiz.length, 0);
export const totalMinutes = flatLessons.reduce((s, l) => s + l.minutes, 0);
