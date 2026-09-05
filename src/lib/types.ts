export type BlockKind = "text" | "code" | "tip" | "warn" | "info";

export type Block =
  | { kind: "text"; md: string }
  | { kind: "code"; title?: string; code: string; norun?: boolean }
  | { kind: "tip" | "warn" | "info"; title: string; md: string };

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Task {
  id: string;
  title: string;
  md: string;
  starter: string;
  /** Код с вызовами await __test('имя', () => ..., expected) — выполняется в песочнице вместе с кодом ученика */
  tests: string;
  solution: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  minutes: number;
  blocks: Block[];
  quiz: QuizQuestion[];
  tasks: Task[];
}

export type LevelId = "junior" | "middle" | "senior";

export interface Level {
  id: LevelId;
  title: string;
  label: string;
  tagline: string;
  accent: string;
  lessons: Lesson[];
}
