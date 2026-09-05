/**
 * Песочница для выполнения JavaScript в Web Worker.
 * Перехватывает console.*, поддерживает тесты через __test(),
 * завершает зависший код по таймауту.
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

const WORKER_SRC = `
self.onmessage = async function (e) {
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
  globalThis.load = function (id) {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve({ id: id, name: "Юзер " + id }); }, 15);
    });
  };
  var code = e.data.code || "";
  var tests = e.data.tests || "";
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
    blobUrl = URL.createObjectURL(
      new Blob([WORKER_SRC], { type: "application/javascript" })
    );
  }
  return blobUrl;
}

export function runCode(
  userCode: string,
  tests = "",
  timeoutMs = 3000
): Promise<RunResult> {
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
        error: "Превышено время выполнения (3 c). Возможно, бесконечный цикл.",
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

    worker.postMessage({ code: userCode, tests });
  });
}
