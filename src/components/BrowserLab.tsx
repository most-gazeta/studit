import { useCallback, useEffect, useRef, useState } from "react";
import type { BrowserPreset } from "../lib/types";
import { IconPlay, IconReset } from "./icons";

interface LabLog {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

const SHIM = `
<script>
(function () {
  var fmt = function (v) {
    try {
      if (typeof v === "string") return v;
      if (typeof v === "object" && v !== null) return JSON.stringify(v);
      return String(v);
    } catch (e) { return String(v); }
  };
  ["log", "info", "warn", "error"].forEach(function (level) {
    console[level] = function () {
      var args = Array.prototype.slice.call(arguments);
      parent.postMessage({ src: "jsmaster-lab", level: level, text: args.map(fmt).join(" ") }, "*");
    };
  });
  window.addEventListener("error", function (e) {
    parent.postMessage({ src: "jsmaster-lab", level: "error", text: e.message || "Ошибка в скрипте" }, "*");
  });
})();
</script>`;

function buildDoc(userCode: string): string {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  :root { color-scheme: dark; }
  body { margin: 0; padding: 12px 14px; background: #0d1628; color: #dce7fb;
         font: 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
  button { background: #1c2c4e; color: #dce7fb; border: 1px solid #35507f; border-radius: 7px;
           padding: 6px 12px; font: inherit; cursor: pointer; }
  button:hover { background: #24375f; }
  input, textarea, select { background: #12203c; color: #dce7fb; border: 1px solid #35507f;
           border-radius: 7px; padding: 6px 9px; font: inherit; }
  code { background: #15223e; padding: 0 5px; border-radius: 5px; }
  * { box-sizing: border-box; }
</style>
${SHIM}
</head>
<body>
${userCode}
</body>
</html>`;
}

export function BrowserLab({ title, presets }: { title?: string; presets: BrowserPreset[] }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [code, setCode] = useState(presets[0]?.code ?? "");
  const [logs, setLogs] = useState<LabLog[]>([]);
  const [runKey, setRunKey] = useState(0);
  const [running, setRunning] = useState(true);
  const logsRef = useRef<LabLog[]>([]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.src !== "jsmaster-lab") return;
      logsRef.current = [...logsRef.current, { level: d.level, text: d.text }].slice(-200);
      setLogs(logsRef.current);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const run = useCallback(() => {
    logsRef.current = [];
    setLogs([]);
    setRunning(true);
    setRunKey((k) => k + 1);
  }, []);

  const pickPreset = (i: number) => {
    setPresetIdx(i);
    setCode(presets[i].code);
    logsRef.current = [];
    setLogs([]);
    setRunning(true);
    setRunKey((k) => k + 1);
  };

  const reset = () => {
    setCode(presets[presetIdx].code);
  };

  return (
    <div className="rounded-xl border border-[#ffa94d]/25 bg-[#0a1120] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 flex-wrap px-4 py-2.5 border-b border-line bg-[#0d1628]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-mono text-[12px] text-[#ffa94d] truncate">
          {title ?? "browser-lab"}
        </span>
        <span className="ml-auto font-mono text-[10.5px] text-dim border border-line rounded px-1.5 py-0.5">
          iframe · живой DOM
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap px-4 py-2 border-b border-line bg-[#0b1322]">
        {presets.map((p, i) => (
          <button
            key={p.name}
            onClick={() => pickPreset(i)}
            className={`font-mono text-[11.5px] px-2.5 py-1 rounded-md border transition-colors ${
              i === presetIdx
                ? "border-[#ffa94d]/50 bg-[#ffa94d]/10 text-[#ffa94d]"
                : "border-line text-mute hover:text-ink hover:border-line2"
            }`}
          >
            {p.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-mono px-2 py-1 rounded-md border border-line text-mute hover:text-ink hover:border-line2 transition-colors"
            title="Вернуть код примера"
          >
            <IconReset className="w-3.5 h-3.5" /> сброс
          </button>
          <button
            onClick={run}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#ffa94d]/10 border border-[#ffa94d]/40 text-[#ffa94d] hover:bg-[#ffa94d]/20 transition-all active:scale-95"
          >
            <IconPlay className="w-3 h-3" strokeWidth={2.4} /> запустить
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-line">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                run();
              }
            }}
            spellCheck={false}
            className="editor min-h-[260px] max-h-[420px]"
          />
        </div>
        <div className="flex flex-col">
          <div className="p-2.5 border-b border-line bg-[#0b1322]">
            <iframe
              key={runKey}
              title="browser-lab"
              sandbox="allow-scripts"
              srcDoc={buildDoc(code)}
              onLoad={() => setRunning(false)}
              className="w-full h-[190px] rounded-lg border border-line bg-[#0d1628]"
            />
          </div>
          <div className="flex-1 px-4 py-2.5 bg-[#080e1b] max-h-[160px] overflow-auto">
            <div className="font-mono text-[10.5px] uppercase tracking-widest text-dim mb-1.5 flex items-center gap-2">
              консоль страницы
              {running && <span className="w-3 h-3 border-2 border-[#ffa94d]/30 border-t-[#ffa94d] rounded-full spin-slow" />}
            </div>
            <div className="font-mono text-[12.5px] leading-relaxed">
              {logs.length === 0 && !running && (
                <div className="text-dim italic">— кликайте, вводите текст, наблюдайте —</div>
              )}
              {logs.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.level === "error" ? "text-coral" : l.level === "warn" ? "text-amber" : "text-[#a9bddf]"
                  }
                >
                  <span className="text-dim mr-2 select-none">›</span>
                  {l.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
