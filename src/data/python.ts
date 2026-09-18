import type { Lesson } from "../lib/types";
import { pythonLessons as juniorLessons } from "./python_junior";
import { pythonLessons as middleLessons } from "./python_middle";
import { pythonLessons as seniorLessons } from "./python_senior";

export const pythonLessons: Lesson[] = [
  ...juniorLessons,
  ...middleLessons,
  ...seniorLessons,
];
