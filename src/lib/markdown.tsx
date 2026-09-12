import type { ReactNode } from "react";

function inline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    const k = `${keyBase}-${i}`;
    if (p.startsWith("`") && p.endsWith("`") && p.length > 2)
      return (
        <code key={k} className="rich-code">
          {p.slice(1, -1)}
        </code>
      );
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4)
      return <strong key={k}>{p.slice(2, -2)}</strong>;
    return p;
  });
}

/**
 * Мини-разметка: ## заголовок, ### подзаголовок, - список, 1. нумерованный,
 * `код`, **жирный**, пустая строка — абзац.
 */
export function Rich({ md, className = "" }: { md: string; className?: string }) {
  const lines = md.split("\n");
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let olist: string[] = [];
  let bk = 0;

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={bk++}>{inline(para.join(" "), `p${bk}`)}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={bk++}>
          {list.map((it, i) => (
            <li key={i}>{inline(it, `li${bk}-${i}`)}</li>
          ))}
        </ul>
      );
      list = [];
    }
    if (olist.length) {
      blocks.push(
        <ol key={bk++}>
          {olist.map((it, i) => (
            <li key={i}>{inline(it, `ol${bk}-${i}`)}</li>
          ))}
        </ol>
      );
      olist = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      blocks.push(<h4 key={bk++}>{inline(line.slice(4), `h4${bk}`)}</h4>);
    } else if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(<h3 key={bk++}>{inline(line.slice(3), `h3${bk}`)}</h3>);
    } else if (/^[-*] /.test(line.trim())) {
      flushPara();
      list.push(line.trim().replace(/^[-*] /, ""));
    } else if (/^\d+\. /.test(line.trim())) {
      flushPara();
      olist.push(line.trim().replace(/^\d+\. /, ""));
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();

  return <div className={`rich ${className}`}>{blocks}</div>;
}
