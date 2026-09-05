import { useState } from "react";
import { highlight } from "../lib/highlight";
import { runCode, type RunResult } from "../lib/runner";
import { IconCopy, IconPlay, IconCheck, IconWarn } from "./icons";

export function CodeBlock({
  code,
  title,
  norun = false,
}: {
  code: string;
  title?: string;
  norun?: boolean;
}) {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setRunning(true);
    const res = await runCode(code);
    setResult(res);
    setRunning(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard недоступен */
    }
  };

  return (
    <div className="rounded-xl border border-line bg-[#0a1120] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-[#0d1628]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-mono text-[12px] text-mute truncate">{title ?? "snippet.js"}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-mono px-2 py-1 rounded-md border border-line text-mute hover:text-ink hover:border-line2 transition-colors"
            title="Скопировать код"
          >
            {copied ? <IconCheck className="w-3.5 h-3.5 text-mint" /> : <IconCopy className="w-3.5 h-3.5" />}
            {copied ? "готово" : "copy"}
          </button>
          {!norun && (
            <button
              onClick={run}
              disabled={running}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-semibold px-2.5 py-1 rounded-md bg-js/10 border border-js/30 text-js hover:bg-js/20 hover:border-js/50 transition-all active:scale-95 disabled:opacity-60"
            >
              {running ? (
                <span className="w-3.5 h-3.5 border-2 border-js/30 border-t-js rounded-full spin-slow" />
              ) : (
                <IconPlay className="w-3 h-3" strokeWidth={2.4} />
              )}
              {running ? "выполняется…" : "запустить"}
            </button>
          )}
        </div>
      </div>

      <div className="code-scroll">
        <pre>{highlight(code)}</pre>
      </div>

      {result && (
        <div className="border-t border-line bg-[#080e1b] pop-in">
          <div className="px-4 pt-2.5 pb-1 flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-dim">консоль</span>
            <span className="font-mono text-[10.5px] text-dim ml-auto">{Math.round(result.duration)} мс</span>
          </div>
          <div className="px-4 pb-3 font-mono text-[12.5px] leading-relaxed">
            {result.logs.length === 0 && !result.error && (
              <div className="text-dim italic py-1">— вывод пуст —</div>
            )}
            {result.logs.map((l, i) => (
              <div
                key={i}
                className={
                  l.level === "error"
                    ? "text-coral"
                    : l.level === "warn"
                      ? "text-amber"
                      : "text-[#a9bddf]"
                }
              >
                <span className="text-dim mr-2 select-none">›</span>
                {l.text}
              </div>
            ))}
            {result.error && (
              <div className="flex items-start gap-2 text-coral mt-1">
                <IconWarn className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{result.error}</span>
              </div>
            )}
            {result.timedOut && (
              <div className="text-amber mt-1 flex items-center gap-2">
                <IconWarn className="w-4 h-4 shrink-0" /> Выполнение остановлено по таймауту — проверьте циклы.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
