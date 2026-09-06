import { useEffect, useRef, useState } from "react";
import { highlight } from "../lib/highlight";

interface Line {
  kind: "cmd" | "out" | "ok";
  text: string;
}

const SCRIPT: Line[] = [
  { kind: "cmd", text: 'const путь = ["junior", "middle", "senior"];' },
  { kind: "cmd", text: "const навыки = путь.flatMap(уровень => учить(уровень));" },
  { kind: "out", text: "// 26 уроков · 52 задания · 160+ автотестов" },
  { kind: "cmd", text: "навыки.at(-1)" },
  { kind: "ok", text: '"уверенный JavaScript-инженер"' },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [phase, setPhase] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let line = 0;
    let char = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (line >= SCRIPT.length) {
        // пауза и перезапуск
        timer.current = window.setTimeout(() => {
          if (cancelled) return;
          setLines([]);
          setPhase(0);
          line = 0;
          char = 0;
          step();
        }, 4200);
        return;
      }
      const current = SCRIPT[line];
      if (current.kind === "cmd") {
        if (char === 0) setPhase(line);
        if (char < current.text.length) {
          char++;
          setTyping(current.text.slice(0, char));
          timer.current = window.setTimeout(step, 26 + Math.random() * 30);
        } else {
          setLines((prev) => [...prev, current]);
          setTyping("");
          line++;
          char = 0;
          timer.current = window.setTimeout(step, 340);
        }
      } else {
        setLines((prev) => [...prev, current]);
        line++;
        timer.current = window.setTimeout(step, 420);
      }
    };

    timer.current = window.setTimeout(step, 700);
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="relative rounded-xl border border-line bg-[#0a1120] shadow-[0_20px_60px_rgba(0,0,0,0.5)] scanlines overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-[#0d1628]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[12px] text-mute">js-master — интерактивная сессия</span>
        <span className="ml-auto chip border-js/30 text-js bg-js/5">live</span>
      </div>
      <div className="p-4 sm:p-5 font-mono text-[13px] leading-[1.9] min-h-[228px]">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i} className="flex gap-2">
              <span className="text-js select-none">❯</span>
              <span className="text-[#d7e3f8]">{highlight(l.text)}</span>
            </div>
          ) : l.kind === "out" ? (
            <div key={i} className="text-dim">
              {l.text}
            </div>
          ) : (
            <div key={i} className="text-mint">
              ← {l.text}
            </div>
          )
        )}
        {typing !== "" && (
          <div className="flex gap-2">
            <span className="text-js select-none">❯</span>
            <span className="text-[#d7e3f8] cursor-blink">{highlight(typing)}</span>
          </div>
        )}
        {typing === "" && phase < SCRIPT.length && (
          <div className="cursor-blink text-transparent">_</div>
        )}
      </div>
    </div>
  );
}
