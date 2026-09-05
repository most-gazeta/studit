import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "const","let","var","function","return","if","else","for","while","do",
  "switch","case","break","continue","new","class","extends","super",
  "import","export","from","default","try","catch","finally","throw",
  "async","await","yield","typeof","instanceof","of","in","this","static",
  "get","set","delete","void","#private",
]);

const LITERALS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);

const BUILTINS = new Set([
  "console","Math","JSON","Promise","Array","Object","String","Number",
  "Boolean","Symbol","Map","Set","WeakMap","WeakSet","WeakRef","Date",
  "RegExp","Error","TypeError","RangeError","SyntaxError","Reflect","Proxy",
  "globalThis","window","document","setTimeout","setInterval","clearTimeout",
  "clearInterval","queueMicrotask","structuredClone","BigInt","performance",
  "fetch","parseInt","parseFloat","isNaN","isFinite","localStorage","alert",
  "AbortController","FinalizationRegistry","Iterator","Generator",
]);

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?\b|\b0[xXbBoO][\da-fA-F_]+\b)|([A-Za-z_$][\w$]*)|([\s\S])/g;

export function highlight(code: string): ReactNode[] {
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
  const re = new RegExp(TOKEN_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
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
      if (KEYWORDS.has(word)) cls = "tok-k";
      else if (LITERALS.has(word)) cls = "tok-l";
      else if (BUILTINS.has(word)) cls = "tok-b";
      else if (code[re.lastIndex] === "(") cls = "tok-f";
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
