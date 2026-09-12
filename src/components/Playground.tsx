import { useEffect, useState } from "react";
import { runCode, type RunResult, type RunLanguage } from "../lib/runner";
import {
  IconPlay, IconReset, IconTerminal, IconWarn,
} from "./icons";

const JS_SNIPPETS: { name: string; code: string }[] = [
  {
    name: "Порядок event loop",
    code: `console.log("1: синхронно");
setTimeout(() => console.log("4: макрозадача"), 0);
Promise.resolve().then(() => console.log("3: микрозадача"));
console.log("2: снова синхронно");`,
  },
  {
    name: "Фибоначчи с мемоизацией",
    code: `const memo = new Map();
function fib(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fib(n - 1) + fib(n - 2);
  memo.set(n, value);
  return value;
}
console.time("fib(500)");
console.log(fib(500));
console.timeEnd("fib(500)");`,
  },
  {
    name: "Классы и наследование",
    code: `class Shape {
  constructor(name) { this.name = name; }
  area() { return 0; }
  describe() { return this.name + ": " + this.area().toFixed(2); }
}
class Circle extends Shape {
  constructor(r) { super("круг"); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}
console.log(new Circle(3).describe());`,
  },
  {
    name: "async/await + Promise.all",
    code: `const fakeFetch = async (id) => {
  await sleep(30 + Math.random() * 40);
  return { id,  "ответ-" + id };
};

console.time("параллельно");
const results = await Promise.all([1, 2, 3].map(fakeFetch));
console.timeEnd("параллельно");
console.log(results);`,
  },
];

const PY_SNIPPETS: { name: string; code: string }[] = [
  {
    name: "Hello, Python",
    code: `print("Привет, Python!")

name = "Гвидо"
print(f"Создатель языка — {name}")
print(type(42), type("str"), type(None))`,
  },
  {
    name: "Comprehensions и срезы",
    code: `squares = [x ** 2 for x in range(10)]
print(squares)
print(squares[::-1])          # разворот
print([x for x in squares if x % 2 == 0])`,
  },
  {
    name: "Декоратор-логгер",
    code: `def log_calls(fn):
    def wrapper(*args, **kwargs):
        print("-> вызов", fn.__name__, args)
        result = fn(*args, **kwargs)
        print("<- результат:", result)
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(2, 3)`,
  },
  {
    name: "Генератор Фибоначчи",
    code: `from itertools import islice

def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print(list(islice(fib(), 12)))`,
  },
  {
    name: "dataclass",
    code: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p = Point(1.5, 2.5)
print(p)
print(p == Point(1.5, 2.5))`,
  },
];

const KEY_PREFIX = "jsmaster-playground";

export function Playground({ language = "javascript" }: { language?: RunLanguage }) {
  const snippets = language === "python" ? PY_SNIPPETS : JS_SNIPPETS;
  const [code, setCode] = useState(() => {
    try {
      return localStorage.getItem(`${KEY_PREFIX}-${language}`) ?? snippets[0].code;
    } catch {
      return snippets[0].code;
    }
  });
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(`${KEY_PREFIX}-${language}`, code);
    } catch {
      /* ignore */
    }
  }, [code, language]);

  const run = async () => {
    setRunning(true);
    const res = await runCode(code, "", { language, timeoutMs: language === "python" ? 30000 : 3000 });
    setResult(res);
    setRunning(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const s = el.selectionStart;
      const indent = language === "python" ? "    " : "  ";
      const next = code.slice(0, s) + indent + code.slice(el.selectionEnd);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + indent.length;
      });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 pt-8">
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
          language === "python" ? "bg-[#4b8bbe]/10 border-[#4b8bbe]/35 text-[#4b8bbe]" : "bg-js/10 border-js/30 text-js"
        }`}>
          <IconTerminal className="w-4.5 h-4.5" />
        </span>
        <div>
          <h1 className="font-display font-bold text-xl text-ink">
            Песочница {language === "python" ? "Python" : "JavaScript"}
          </h1>
          <p className="text-[12.5px] text-dim font-mono">
            свободный полигон · Ctrl/⌘+Enter — запустить
            {language === "python"
              ? " · код выполняет настоящий интерпретатор (первый запуск грузит Pyodide)"
              : " · доступны sleep(ms) и load(id)"}
          </p>
        </div>
        <select
          value=""
          onChange={(e) => {
            const s = snippets.find((x) => x.name === e.target.value);
            if (s) {
              setCode(s.code);
              setResult(null);
            }
          }}
          className="ml-auto bg-panel2 border border-line rounded-lg px-3 py-2 text-[13px] text-mute outline-none hover:border-line2 cursor-pointer"
        >
          <option value="" disabled>
            примеры…
          </option>
          {snippets.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-line bg-[#0a1120] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-[#0d1628]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-2 font-mono text-[12px] text-mute">
              scratchpad.{language === "python" ? "py" : "js"}
            </span>
            <button
              onClick={run}
              disabled={running}
              className="ml-auto btn-primary py-1.5 px-3 text-[12.5px]"
            >
              {running ? (
                <span className="w-3.5 h-3.5 border-2 border-[#1a1600]/25 border-t-[#1a1600] rounded-full spin-slow" />
              ) : (
                <IconPlay className="w-3 h-3" strokeWidth={2.4} />
              )}
              {running ? (language === "python" ? "интерпретация…" : "…") : "запустить"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            className="editor min-h-[420px] lg:min-h-[480px]"
          />
        </div>

        <div className="rounded-xl border border-line bg-[#080e1b] overflow-hidden flex flex-col">
          <div className="flex items-center px-4 py-2.5 border-b border-line bg-[#0d1628]">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-dim">консоль</span>
            {result && (
              <span className="ml-auto font-mono text-[11px] text-dim">{Math.round(result.duration)} мс</span>
            )}
            <button
              onClick={() => setResult(null)}
              className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-dim hover:text-coral transition-colors"
            >
              <IconReset className="w-3 h-3" /> очистить
            </button>
          </div>
          <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-auto">
            {!result && !running && (
              <div className="text-dim italic text-[12.5px]">
                // вывод появится здесь.
                {language === "python"
                  ? "\n// print() перехватывается; первый запуск грузит интерпретатор ~5–10 с"
                  : "\n// console.log, console.warn, console.error — всё перехватывается."}
              </div>
            )}
            {running && (
              <div className="flex items-center gap-2.5 text-js">
                <span className="w-4 h-4 border-2 border-js/30 border-t-js rounded-full spin-slow" />
                {language === "python" ? "интерпретируем Python…" : "выполняется…"}
              </div>
            )}
            {result && !running && (
              <>
                {result.logs.length === 0 && !result.error && !result.timedOut && (
                  <div className="text-dim italic">— пусто —</div>
                )}
                {result.logs.map((l, i) => (
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
                {(result.error || result.timedOut) && (
                  <div className="flex items-start gap-2 text-coral mt-2">
                    <IconWarn className="w-4 h-4 mt-0.5 shrink-0" />
                    {result.timedOut
                      ? "Превышено время выполнения — вероятно, бесконечный цикл."
                      : result.error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
