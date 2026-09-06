/**
 * Слой совместимости: исторически приложение знало один курс (JavaScript).
 * Все старые экспорты указывают на данные JS-курса из реестра courses.ts.
 * Новый код должен использовать courses.ts напрямую.
 */
import { jsCourse, flatLessonsOf, getLessonOf, getLessonPositionOf, totalsOf } from "./courses";

export const levels = jsCourse.levels;
export const flatLessons = flatLessonsOf("js");

export function getLesson(id: string) {
  return getLessonOf("js", id);
}

export function getLessonPosition(id: string) {
  return getLessonPositionOf("js", id);
}

const totals = totalsOf("js");
export const totalLessons = totals.lessons;
export const totalTasks = totals.tasks;
export const totalTests = totals.tests;
export const totalQuiz = totals.quiz;
export const totalMinutes = totals.minutes;
