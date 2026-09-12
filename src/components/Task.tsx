import { useState } from "react";
import type { Task as TaskData } from "../lib/types";
import { runCode, type RunResult, type RunLanguage } from "../lib/runner";
import { highlight } from "../lib/highlight";
import { Rich } from "../lib/markdown";
import { IconCheckCircle, IconXCircle, IconPlay, IconEye, IconReset, IconCode, IconWarn } from "./icons";

export function Task({
  lessonId,
  task,
  passed,
  savedCode,
  onSave,
  onPassed,
  language = "javascript",
}: {
  lessonId: string;
  task: TaskData;
  passed: boolean;
  savedCode?: string;
  onSave: (code: string) => void;
  onPassed: () => void;
  language?: RunLanguage;
}) {
  const [code, setCode] = useState(savedCode ?? task.starter);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const run = async () => {
    setRunning(true);
    setShowSolution(false);
    onSave(code);
    const res = await runCode(code, task.tests, {
      language,
      timeoutMs: language === "python" ? 30000 : 4000,
    });
    setResult(res);
    setRunning(false);
    if (res.tests.length > 0 && res.tests.every((t) => t.pass)) {
      onPassed();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const indent = language === "python" ? "    " : "  ";
      const next = code.slice(0, start) + indent + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + indent.length;
      });
    }
  };

  const passCount = result?.tests.filter((t) => t.pass).length ?? 0;
  const totalTests = result?.tests.length ?? 0;

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${passed ? "border-mint/40" : "border-line"} bg-[#0a1120]`}>
      <div className="px-5 py-4 border-b border-line bg-[#0d1628] flex items-start gap-3">
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
            passed ? "bg-mint/15 border-mint/40 text-mint" : "bg-panel3 border-line text-js"
          }`}
        >
          {passed ? <IconCheckCircle className="w-4.5 h-4.5" /> : <IconCode className="w-4 h-4" />}
        </span>
        <div className="min-w-0">
          <h4 className="font-semibold text-[15px] text-ink leading-tight">
            Задание · {task.title}
            {passed && <span className="ml-2 text-mint font-mono text-[11px] uppercase tracking-wider">решено</span>}
          </h4>
          <div className="mt-1">
            <Rich md={task.md} className="[&_p]:my-1 [&_p]:text-[13.5px] [&_li]:text-[13.5px]" />
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          className="editor"
          rows={Math.min(22, Math.max(7, code.split("\n").length + 1))}
        />
        <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-dim select-none pointer-events-none">
          editor.js
        </span>
      </div>

      <div className="px-4 py-3 border-t border-line bg-[#0d1628] flex flex-wrap items-center gap-2">
        <button onClick={run} disabled={running} className="btn-primary py-2 px-3.5 text-[13px]">
          {running ? (
            <span className="w-4 h-4 border-2 border-[#1a1600]/25 border-t-[#1a1600] rounded-full spin-slow" />
          ) : (
            <IconPlay className="w-3.5 h-3.5" strokeWidth={2.4} />
          )}
          {running ? "Проверяем…" : "Запустить тесты"}
        </button>
        <button
          onClick={() => setShowSolution((v) => !v)}
          className="btn-ghost py-2 px-3 text-[12.5px] font-mono"
        >
          <IconEye className="w-4 h-4" />
          {showSolution ? "скрыть решение" : "решение"}
        </button>
        <button
          onClick={() => {
            setCode(task.starter);
            setResult(null);
          }}
          className="btn-ghost py-2 px-3 text-[12.5px] font-mono"
          title="Сбросить к начальному коду"
        >
          <IconReset className="w-4 h-4" />
          сброс
        </button>
        {result && totalTests > 0 && (
          <span className={`ml-auto font-mono text-[12px] ${passCount === totalTests ? "text-mint" : "text-coral"}`}>
            {passCount}/{totalTests} тестов
          </span>
        )}
      </div>

      {result && (result.tests.length > 0 || result.error || result.logs.length > 0) && (
        <div className="border-t border-line bg-[#080e1b] px-4 py-3 pop-in space-y-1.5">
          {result.error && (
            <div className="flex items-start gap-2 text-coral font-mono text-[12.5px] mb-2">
              <IconWarn className="w-4 h-4 mt-0.5 shrink-0" /> {result.error}
            </div>
          )}
          {result.timedOut && (
            <div className="flex items-start gap-2 text-amber font-mono text-[12.5px] mb-2">
              <IconWarn className="w-4 h-4 mt-0.5 shrink-0" /> Таймаут: код выполнялся дольше 4 секунд.
            </div>
          )}
          {result.tests.map((t, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 font-mono text-[12.5px] px-3 py-2 rounded-lg border ${
                t.pass ? "border-mint/25 bg-mint/5" : "border-coral/25 bg-coral/5"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {t.pass ? (
                <IconCheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-mint" />
              ) : (
                <IconXCircle className="w-4 h-4 mt-0.5 shrink-0 text-coral" />
              )}
              <div className="min-w-0">
                <div className={t.pass ? "text-[#c9eedd]" : "text-[#ffd6dc]"}>{t.name}</div>
                {!t.pass && (
                  <div className="text-dim text-[11.5px] mt-0.5 break-all">
                    получено: <span className="text-coral">{t.actual}</span> · ожидалось:{" "}
                    <span className="text-mint">{t.expected}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {result.logs.filter((l) => l.level === "error").length === 0 &&
            result.logs.length > 0 &&
            result.tests.length === 0 && (
              <div className="font-mono text-[12.5px] text-[#a9bddf]">
                {result.logs.map((l, i) => (
                  <div key={i}>
                    <span className="text-dim mr-2">›</span>
                    {l.text}
                  </div>
                ))}
              </div>
            )}
        </div>
      )}

      {showSolution && (
        <div className="border-t border-amber/25 bg-[#0d1424] pop-in">
          <div className="px-4 pt-2.5 pb-1 font-mono text-[10.5px] uppercase tracking-widest text-amber">
            эталонное решение — сначала попробуйте сами!
          </div>
          <div className="code-scroll">
            <pre>{highlight(task.solution)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
