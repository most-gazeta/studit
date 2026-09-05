import type { QuizQuestion } from "../lib/types";
import { IconCheckCircle, IconXCircle, IconTarget } from "./icons";

export function Quiz({
  questions,
  answers,
  onAnswer,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  onAnswer: (qIndex: number, option: number) => void;
}) {
  const answeredCount = answers.filter((a) => a !== null && a !== undefined).length;
  const correctCount = questions.reduce(
    (s, q, i) => s + (answers[i] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const chosen = answers[qi] ?? null;
        const answered = chosen !== null;
        return (
          <div key={qi} className="panel p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-panel3 border border-line flex items-center justify-center font-mono text-[12px] text-js font-semibold">
                {qi + 1}
              </span>
              <p className="font-semibold text-[15px] leading-snug text-ink pt-0.5">{q.q}</p>
            </div>

            <div className="grid gap-2 mt-4">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = q.answer === oi;
                let cls =
                  "border-line bg-panel2/50 text-[#c3d2ec] hover:border-line2 hover:bg-panel2 hover:translate-x-1";
                if (answered) {
                  if (isCorrect)
                    cls = "border-mint/50 bg-mint/10 text-mint";
                  else if (isChosen)
                    cls = "border-coral/50 bg-coral/10 text-coral";
                  else cls = "border-line bg-panel2/30 text-dim";
                }
                return (
                  <button
                    key={oi}
                    disabled={answered}
                    onClick={() => onAnswer(qi, oi)}
                    className={`flex items-center gap-3 text-left px-4 py-2.5 rounded-lg border font-mono text-[13px] transition-all duration-200 disabled:cursor-default ${cls}`}
                  >
                    <span className="shrink-0 w-5 h-5 rounded-md border border-line2 flex items-center justify-center text-[10px] opacity-80">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="font-body text-[13.5px]">{opt}</span>
                    {answered && isCorrect && (
                      <IconCheckCircle className="w-4.5 h-4.5 ml-auto shrink-0 text-mint" />
                    )}
                    {answered && isChosen && !isCorrect && (
                      <IconXCircle className="w-4.5 h-4.5 ml-auto shrink-0 text-coral" />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div
                className={`mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed px-4 py-3 rounded-lg border pop-in ${
                  chosen === q.answer
                    ? "border-mint/30 bg-mint/5 text-[#bfeedd]"
                    : "border-coral/30 bg-coral/5 text-[#ffd9de]"
                }`}
              >
                {chosen === q.answer ? (
                  <IconCheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-mint" />
                ) : (
                  <IconXCircle className="w-4 h-4 mt-0.5 shrink-0 text-coral" />
                )}
                <span>
                  <strong className={chosen === q.answer ? "text-mint" : "text-coral"}>
                    {chosen === q.answer ? "Верно. " : "Не совсем. "}
                  </strong>
                  {q.explain}
                </span>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-2.5 text-[13px] font-mono text-mute">
        <IconTarget className="w-4 h-4 text-js" />
        отвечено {answeredCount}/{questions.length} · верно {correctCount}
        {correctCount === questions.length && answeredCount === questions.length && (
          <span className="text-mint font-semibold">— блок пройден ✓</span>
        )}
      </div>
    </div>
  );
}
