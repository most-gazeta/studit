import type { Block, Lesson } from "../lib/types";
import { getLessonPosition } from "../data/course";
import type { ProgressState } from "../hooks/useProgress";
import { Rich } from "../lib/markdown";
import { CodeBlock } from "./CodeBlock";
import { Quiz } from "./Quiz";
import { Task } from "./Task";
import { Reveal } from "../hooks/useReveal";
import {
  IconArrowLeft, IconArrowRight, IconBook, IconBulb, IconClock, IconCode,
  IconFlag, IconInfo, IconTrophy, IconWarn, IconZap, IconCheckCircle,
} from "./icons";

function Callout({ block }: { block: Extract<Block, { kind: "tip" | "warn" | "info" }> }) {
  const cfg = {
    tip: { icon: <IconBulb className="w-4.5 h-4.5" />, label: "приём", color: "#3ddc97" },
    warn: { icon: <IconWarn className="w-4.5 h-4.5" />, label: "осторожно", color: "#ffb454" },
    info: { icon: <IconInfo className="w-4.5 h-4.5" />, label: "к сведению", color: "#4cc3ff" },
  }[block.kind];
  return (
    <div
      className="rounded-xl border px-5 py-4"
      style={{ borderColor: `${cfg.color}35`, background: `${cfg.color}0a` }}
    >
      <div className="flex items-center gap-2.5 mb-1.5" style={{ color: cfg.color }}>
        {cfg.icon}
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em]">{cfg.label}</span>
        <span className="font-semibold text-[13.5px] normal-case tracking-normal text-ink">{block.title}</span>
      </div>
      <Rich md={block.md} className="[&_p]:text-[13.5px] [&_p]:my-1.5" />
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return <Rich md={block.md} />;
    case "code":
      return <CodeBlock code={block.code} title={block.title} norun={block.norun} />;
    default:
      return <Callout block={block} />;
  }
}

export function LessonView({
  lesson,
  levelTitle,
  levelAccent,
  progress,
  onAnswer,
  onSaveCode,
  onPassTask,
  onOpenLesson,
  onHome,
}: {
  lesson: Lesson;
  levelTitle: string;
  levelAccent: string;
  progress: ProgressState;
  onAnswer: (qIndex: number, option: number) => void;
  onSaveCode: (taskId: string, code: string) => void;
  onPassTask: (taskId: string) => void;
  onOpenLesson: (id: string) => void;
  onHome: () => void;
}) {
  const { prev, next, number } = getLessonPosition(lesson.id);
  const answers = progress.quiz[lesson.id] ?? [];
  const taskFlags = progress.tasks[lesson.id] ?? {};
  const completed = Boolean(progress.completed[lesson.id]);
  const quizCorrect = lesson.quiz.every((q, i) => answers[i] === q.answer);
  const tasksDone = lesson.tasks.filter((t) => taskFlags[t.id]).length;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-16">
      {/* шапка урока */}
      <header className="pt-8 pb-8 border-b border-line">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={onHome} className="btn-ghost py-1.5 px-3 text-[12.5px]">
            <IconArrowLeft className="w-3.5 h-3.5" /> курс
          </button>
          <span className="chip" style={{ borderColor: `${levelAccent}50`, color: levelAccent, background: `${levelAccent}0d` }}>
            {levelTitle} · урок {String(number).padStart(2, "0")}
          </span>
          <span className="chip border-line text-mute">
            <IconClock className="w-3 h-3" /> ≈{lesson.minutes} мин
          </span>
        </div>
        <h1 className="font-display font-bold text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight text-ink mt-5">
          {lesson.title}
        </h1>
        <p className="text-mute mt-2.5 text-[14.5px]">{lesson.subtitle}</p>

        {/* индикатор прохождения */}
        <div className="mt-6 flex items-center gap-2 font-mono text-[11.5px]">
          {[
            { label: "теория", done: true, icon: <IconBook className="w-3.5 h-3.5" /> },
            { label: "квиз", done: quizCorrect && answers.length > 0, icon: <IconFlag className="w-3.5 h-3.5" /> },
            { label: `задачи ${tasksDone}/${lesson.tasks.length}`, done: tasksDone === lesson.tasks.length, icon: <IconCode className="w-3.5 h-3.5" /> },
          ].map((s, i) => (
            <span key={i}>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border transition-colors ${
                  s.done ? "border-mint/40 bg-mint/10 text-mint" : "border-line text-dim"
                }`}
              >
                {s.icon} {s.label}
              </span>
              {i < 2 && <span className="text-dim mx-1.5">→</span>}
            </span>
          ))}
        </div>
      </header>

      {/* тело урока */}
      <div className="mt-8 space-y-7">
        {lesson.blocks.map((block, i) => (
          <Reveal key={i} threshold={0.05}>
            <BlockView block={block} />
          </Reveal>
        ))}
      </div>

      {/* квиз */}
      <section className="mt-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-9 h-9 rounded-lg bg-js/10 border border-js/30 text-js flex items-center justify-center">
              <IconFlag className="w-4.5 h-4.5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">Проверь себя</h2>
              <p className="text-[12.5px] text-dim font-mono">+5 XP за каждый верный ответ</p>
            </div>
          </div>
        </Reveal>
        <Quiz questions={lesson.quiz} answers={answers} onAnswer={onAnswer} />
      </section>

      {/* задачи */}
      <section className="mt-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-9 h-9 rounded-lg bg-sky/10 border border-sky/30 text-sky flex items-center justify-center">
              <IconCode className="w-4.5 h-4.5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">Практика</h2>
              <p className="text-[12.5px] text-dim font-mono">+20 XP за задачу · код выполняется в песочнице</p>
            </div>
          </div>
        </Reveal>
        <div className="space-y-6">
          {lesson.tasks.map((task) => (
            <Reveal key={task.id} threshold={0.04}>
              <Task
                lessonId={lesson.id}
                task={task}
                passed={Boolean(taskFlags[task.id])}
                savedCode={progress.editors[task.id]}
                onSave={(code) => onSaveCode(task.id, code)}
                onPassed={() => onPassTask(task.id)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* баннер завершения */}
      {completed && (
        <div className="mt-14 panel border-mint/40 bg-mint/[0.06] p-6 sm:p-8 text-center rise">
          <div className="inline-flex w-12 h-12 rounded-xl bg-mint/15 border border-mint/40 text-mint items-center justify-center mb-3">
            <IconTrophy className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-ink">Урок пройден!</h3>
          <p className="text-mute text-[13.5px] mt-2">
            Квиз и все задачи закрыты. <span className="text-js font-mono">+30 XP</span> за урок — так и складывается мастерство.
          </p>
          {next && (
            <button className="btn-primary mt-5" onClick={() => onOpenLesson(next.id)}>
              Следующий урок: {next.title} <IconArrowRight className="w-4 h-4" />
            </button>
          )}
          {!next && (
            <p className="mt-5 inline-flex items-center gap-2 text-mint font-mono text-[13px]">
              <IconCheckCircle className="w-4 h-4" /> Это был последний урок курса. Вы — молодец.
            </p>
          )}
        </div>
      )}

      {/* навигация */}
      <nav className="mt-12 flex items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <button onClick={() => onOpenLesson(prev.id)} className="btn-ghost max-w-[46%]">
            <IconArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">{prev.title}</span>
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button onClick={() => onOpenLesson(next.id)} className="btn-ghost max-w-[46%] ml-auto">
            <span className="truncate">{next.title}</span>
            <IconArrowRight className="w-4 h-4 shrink-0" />
          </button>
        ) : (
          <button onClick={onHome} className="btn-primary ml-auto">
            <IconZap className="w-4 h-4" /> К карте курса
          </button>
        )}
      </nav>
    </div>
  );
}
