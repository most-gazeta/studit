export type BlockKind = "text" | "code" | "browser" | "tip" | "warn" | "info";

export interface BrowserPreset {
  name: string;
  code: string;
}

export type Block =
  | { kind: "text"; md: string }
  | { kind: "code"; title?: string; code: string; norun?: boolean }
  | { kind: "browser"; title?: string; presets: BrowserPreset[] }
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

export type LessonLanguage = "javascript" | "python";

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  minutes: number;
  /** язык примеров и песочницы урока (по умолчанию JavaScript) */
  language?: LessonLanguage;
  blocks: Block[];
  quiz: QuizQuestion[];
  tasks: Task[];
}

export interface Level {
  id: string;
  title: string;
  label: string;
  tagline: string;
  accent: string;
  lessons: Lesson[];
}
