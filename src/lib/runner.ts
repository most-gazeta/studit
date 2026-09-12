/**
 * Песочница для выполнения JavaScript и Python в Web Worker.
 * - JS: нативно, перехват console.*, тесты через __test()
 * - Python: через Pyodide (CDN), перехват stdout/stderr, тесты через __test()
 * Зависший код завершается по таймауту (worker.terminate()).
 */

export interface LogEntry {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

export interface TestResult {
  name: string;
  pass: boolean;
  actual: string;
  expected: string;
}

export interface RunResult {
  logs: LogEntry[];
  error: string | null;
  timedOut: boolean;
  tests: TestResult[];
  duration: number;
}

export type RunLanguage = "javascript" | "python";

export interface RunOptions {
  language?: RunLanguage;
  timeoutMs?: number;
}

const PYODIDE_VERSION = "v0.26.4";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

const WORKER_SRC = `
self.onmessage = async function (e) {
  var lang = e.data.language || "javascript";
  var code = e.data.code || "";
  var tests = e.data.tests || "";

  var fmt = function (v) {
    try {
      if (typeof v === "string") return v;
      if (v === null) return "null";
      if (v === undefined) return "undefined";
      if (typeof v === "function") return "[Function " + (v.name || "anonymous") + "]";
      if (v instanceof Error) return v.name + ": " + v.message;
      if (typeof v === "symbol") return v.toString();
      if (typeof v === "bigint") return v.toString() + "n";
      var s = JSON.stringify(v, function (k, val) {
        if (typeof val === "function") return "[Function " + (val.name || "anonymous") + "]";
        if (typeof val === "bigint") return val.toString() + "n";
        if (typeof val === "symbol") return val.toString();
        if (val === undefined) return "[undefined]";
        if (typeof val === "number" && Number.isNaN(val)) return "[NaN]";
        if (val === Infinity) return "[Infinity]";
        return val;
      });
      return s === undefined ? String(v) : s;
    } catch (err) { return String(v); }
  };

  /* ================= Python (Pyodide) ================= */
  if (lang === "python") {
    try {
      self.postMessage({ type: "log", level: "info", text: "⟳ Загружаем интерпретатор Python (Pyodide)…" });
      importScripts("__PYODIDE_CDN__pyodide.js");
      var py = await loadPyodide({ indexURL: "__PYODIDE_CDN__" });
      py.setStdout({ batched: function (s) { self.postMessage({ type: "log", level: "log", text: s }); } });
      py.setStderr({ batched: function (s) { self.postMessage({ type: "log", level: "error", text: s }); } });

      var prelude = [
        "__results = []",
        "def __test(name, fn, expected):",
        "    try:",
        "        actual = fn()",
        "        __results.append({'name': name, 'pass': bool(actual == expected), 'actual': repr(actual), 'expected': repr(expected)})",
        "    except Exception as e:",
        "        __results.append({'name': name, 'pass': False, 'actual': repr(e), 'expected': repr(expected)})",
      ].join("\\n");

      py.runPython(prelude + "\\n" + code + "\\n" + tests);

      var results = py.globals.get("__results").toJs({ dict_converter: Object.fromEntries });
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        self.postMessage({
          type: "test",
          result: { name: r.name, pass: r.pass === true, actual: r.actual, expected: r.expected },
        });
      }
      self.postMessage({ type: "done", error: null });
    } catch (err) {
      var msg = String((err && err.message) || err);
      self.postMessage({ type: "log", level: "error", text: msg });
      self.postMessage({ type: "done", error: msg });
    }
    return;
  }

  /* ================= JavaScript ================= */
  ["log", "info", "warn", "error"].forEach(function (level) {
    console[level] = function () {
      var args = Array.prototype.slice.call(arguments);
      self.postMessage({ type: "log", level: level, text: args.map(fmt).join(" ") });
    };
  });
  var deepEq = function (a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    var ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (var i = 0; i < ka.length; i++) {
      if (!deepEq(a[ka[i]], b[ka[i]])) return false;
    }
    return true;
  };
  globalThis.__test = async function (name, fn, expected) {
    try {
      var actual = await fn();
      self.postMessage({
        type: "test",
        result: { name: name, pass: deepEq(actual, expected), actual: fmt(actual), expected: fmt(expected) }
      });
    } catch (err) {
      self.postMessage({
        type: "test",
        result: { name: name, pass: false, actual: fmt(err), expected: fmt(expected) }
      });
    }
  };
  globalThis.sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  globalThis.load = async function (id) {
    await new Promise(function (r) { setTimeout(r, 15); });
    return { id: id, name: "Юзер " + id };
  };
  var full = 'return (async function () {\\n' + code + '\\n' + tests + '\\n})();';
  try {
    var fn = new Function(full);
    await fn();
    self.postMessage({ type: "done", error: null });
  } catch (err) {
    self.postMessage({ type: "log", level: "error", text: fmt(err) });
    self.postMessage({ type: "done", error: fmt(err) });
  }
};
`;

let blobUrl: string | null = null;

function workerUrl(): string {
  if (!blobUrl) {
    const src = WORKER_SRC.split("__PYODIDE_CDN__").join(PYODIDE_CDN);
    blobUrl = URL.createObjectURL(new Blob([src], { type: "application/javascript" }));
  }
  return blobUrl;
}

export function runCode(userCode: string, tests = "", opts: RunOptions = {}): Promise<RunResult> {
  const language: RunLanguage = opts.language ?? "javascript";
  const timeoutMs = opts.timeoutMs ?? (language === "python" ? 30000 : 3000);

  return new Promise((resolve) => {
    let worker: Worker;
    try {
      worker = new Worker(workerUrl());
    } catch (err) {
      resolve({
        logs: [],
        error: "Не удалось запустить песочницу: " + String(err),
        timedOut: false,
        tests: [],
        duration: 0,
      });
      return;
    }
    const logs: LogEntry[] = [];
    const testsArr: TestResult[] = [];
    const start = performance.now();
    let settled = false;

    const finish = (partial: Partial<RunResult>) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve({
        logs,
        error: null,
        timedOut: false,
        tests: testsArr,
        duration: performance.now() - start,
        ...partial,
      });
    };

    const timer = setTimeout(() => {
      finish({
        timedOut: true,
        error:
          language === "python"
            ? "Превышено время (30 c): загрузка интерпретатора или бесконечный цикл."
            : "Превышено время выполнения (3 c). Возможно, бесконечный цикл.",
      });
    }, timeoutMs);

    worker.onmessage = (e: MessageEvent) => {
      const m = e.data as
        | { type: "log"; level: LogEntry["level"]; text: string }
        | { type: "test"; result: TestResult }
        | { type: "done"; error: string | null };
      if (m.type === "log") logs.push({ level: m.level, text: m.text });
      else if (m.type === "test") testsArr.push(m.result);
      else finish({ error: m.error });
    };

    worker.onerror = (e) => {
      finish({ error: e.message || "Ошибка выполнения" });
    };

    worker.postMessage({ code: userCode, tests, language });
  });
}
