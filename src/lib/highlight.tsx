import type { ReactNode } from "react";
import type { LessonLanguage } from "./types";

const KEYWORDS_JS = new Set([
  "const","let","var","function","return","if","else","for","while","do",
  "switch","case","break","continue","new","class","extends","super",
  "import","export","from","default","try","catch","finally","throw",
  "async","await","yield","typeof","instanceof","of","in","this","static",
  "get","set","delete","void","#private",
]);

const LITERALS_JS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);

const BUILTINS_JS = new Set([
  "console","Math","JSON","Promise","Array","Object","String","Number",
  "Boolean","Symbol","Map","Set","WeakMap","WeakSet","WeakRef","WeakRef","Date",
  "RegExp","Error","TypeError","RangeError","SyntaxError","Reflect","Proxy",
  "globalThis","window","document","setTimeout","setInterval","clearTimeout",
  "clearInterval","queueMicrotask","structuredClone","BigInt","performance",
  "fetch","parseInt","parseFloat","isNaN","isFinite","localStorage","alert",
  "AbortController","FinalizationRegistry","Iterator","Generator",
]);

const KEYWORDS_PY = new Set([
  "def","return","if","elif","else","for","while","in","not","and","or","is",
  "class","import","from","as","with","try","except","finally","raise",
  "lambda","yield","global","nonlocal","pass","break","continue","del",
  "assert","async","await","match","case",
]);

const LITERALS_PY = new Set(["True", "False", "None"]);

const BUILTINS_PY = new Set([
  "print","len","range","str","int","float","list","dict","set","tuple",
  "bool","type","isinstance","issubclass","enumerate","zip","map","filter",
  "sorted","reversed","sum","min","max","abs","round","input","open","super",
  "property","repr","hasattr","getattr","setattr","iter","next","vars","id",
  "Exception","ValueError","TypeError","KeyError","IndexError","AttributeError",
  "StopIteration","NotImplementedError","functools","itertools","dataclasses",
  "dataclass","field","wraps","math","random","time","json","re","os","sys",
  "self","islice","Optional","Union",
]);

interface LangRules {
  keywords: Set<string>;
  literals: Set<string>;
  builtins: Set<string>;
}

const RULES: Record<LessonLanguage, LangRules> = {
  javascript: { keywords: KEYWORDS_JS, literals: LITERALS_JS, builtins: BUILTINS_JS },
  python: { keywords: KEYWORDS_PY, literals: LITERALS_PY, builtins: BUILTINS_PY },
};

export function highlight(code: string, lang: LessonLanguage = "javascript"): ReactNode[] {
  const rules = RULES[lang] ?? RULES.javascript;
  const commentSrc = lang === "python" ? "#[^\\n]*" : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  const tokenRe = new RegExp(
    `(${commentSrc})|("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|(\\b\\d[\\d_]*(?:\\.\\d+)?\\b|\\b0[xXbBoO][\\da-fA-F_]+\\b)|([A-Za-z_$][\\w$]*)|([\\s\\S])`,
    "g"
  );

  const out: ReactNode[] = [];
  let plain = "";
  let key = 0;
  const flush = () => {
    if (plain) {
      out.push(
        <span key={key++} className="tok-p">
          {plain}
        </span>
      );
      plain = "";
    }
  };
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(code))) {
    if (m[1]) {
      flush();
      out.push(
        <span key={key++} className="tok-c">
          {m[1]}
        </span>
      );
    } else if (m[2]) {
      flush();
      out.push(
        <span key={key++} className="tok-s">
          {m[2]}
        </span>
      );
    } else if (m[3]) {
      flush();
      out.push(
        <span key={key++} className="tok-n">
          {m[3]}
        </span>
      );
    } else if (m[4]) {
      const word = m[4];
      let cls: string | null = null;
      if (rules.keywords.has(word)) cls = "tok-k";
      else if (rules.literals.has(word)) cls = "tok-l";
      else if (rules.builtins.has(word)) cls = "tok-b";
      else if (code[tokenRe.lastIndex] === "(") cls = "tok-f";
      else if (/^[A-Z]/.test(word)) cls = "tok-t";
      if (!cls) plain += word;
      else {
        flush();
        out.push(
          <span key={key++} className={cls}>
            {word}
          </span>
        );
      }
    } else {
      plain += m[5];
    }
  }
  flush();
  return out;
}
