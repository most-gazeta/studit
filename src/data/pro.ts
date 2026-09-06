import type { Lesson } from "../lib/types";

export const proLessons: Lesson[] = [
  {
    id: "n1",
    title: "Регулярные выражения: база",
    subtitle: "Шаблоны, флаги, классы, якоря, наборы и диапазоны",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `Регулярное выражение — это **шаблон поиска** в строке. Создаётся литералом \`/шаблон/флаги\` или конструктором \`new RegExp("шаблон", "флаги")\`.

Флаги меняют поведение поиска:
- \`i\` — без учёта регистра
- \`g\` — глобально: искать **все** совпадения, а не первое
- \`m\` — многострочный режим: \`^\` и \`$\` срабатывают в начале/конце **каждой строки**
- \`s\` — «dotall»: точка ловит и перевод строки
- \`u\` — юникод-режим: корректно обрабатывает суррогатные пары и открывает класс \`\\p{...}\`
- \`y\` — «липкий» поиск строго с позиции \`lastIndex\` (разберём в следующем уроке)`,
      },
      {
        kind: "code",
        title: "Литералы и флаги",
        code: `const re = /\\d{4}-\\d{2}-\\d{2}/;
console.log(re.test("релиз: 2026-02-14")); // true

// g — все совпадения, i — без учёта регистра
console.log("Hello hello HELLO".match(/hello/gi)); // 3 штуки

// s — точка видит перевод строки
console.log("a\\nb".match(/a.b/));  // null
console.log("a\\nb".match(/a.b/s)); // ["a\\nb"]`,
      },
      {
        kind: "text",
        md: `## Классы символов

Класс — «один символ из набора»:

- \`\\d\` — цифра, \`\\D\` — не цифра
- \`\\s\` — пробельный символ, \`\\S\` — непробельный
- \`\\w\` — «словесный» (\`[a-zA-Z0-9_]\`), \`\\W\` — обратное. **Кириллицу не ловит!**
- \`.\` — любой символ, кроме перевода строки (если нет флага \`s\`)

С флагом \`u\` доступен юникод-класс \`\\p{...}\`: \`\\p{L}\` — любая буква любого алфавита, \`\\p{N}\` — число, \`\\p{Emoji}\` — эмодзи, \`\\p{Script=Cyrillic}\` — кириллица. Это современный способ работать с текстом на любом языке.`,
      },
      {
        kind: "code",
        title: "Классы в деле",
        code: `console.log("Цена 42 у.е.".match(/\\d+/g)); // ["42"]

// \\w кириллицу не видит:
console.log("привет".match(/\\w+/g)); // null!

// а \\p{L} с флагом u — видит буквы любого алфавита:
console.log("Привет 2026!".match(/\\p{L}+/gu)); // ["Привет"]
console.log("ёжик 🦔 бежит".match(/\\p{Script=Cyrillic}+/gu)); // ["ёжик", "бежит"]
console.log("x=1 y=2".match(/\\p{N}/gu));      // ["1", "2"]`,
      },
      {
        kind: "text",
        md: `## Якоря, граница слова, наборы

- \`^...\` — начало строки, \`...\$\` — конец. С флагом \`m\` — начало/конец **каждой** строки
- \`\\b\` — граница слова: переход между \`\\w\` и «не-\`\\w\`». \`\\bкот\\b\` не найдёт «кот» внутри «который»
- \`[...]\` — набор или диапазон: \`[а-яё]\`, \`[0-9a-f]\`. Символы внутри теряют спецзначение: \`[.]\` — просто точка
- \`[^...]\` — **отрицание**: любой символ, кроме перечисленных
- Спецсимволы ( \`. ^ $ * + ? ( ) [ ] { } | \\\` ) экранируются обратным слэшем: \`/\\d+\\.\\d+/\``,
      },
      {
        kind: "code",
        title: "Якоря и наборы",
        code: `const multiline = "12\\n34\\n56";
console.log(multiline.match(/^\\d+$/));   // null — без m строка целиком
console.log(multiline.match(/^\\d+$/gm)); // ["12", "34", "56"] — каждая строка

console.log("который кот".match(/\\bкот\\b/g)); // ["кот"]

console.log("hex: #3ddc97".match(/#[0-9a-f]{6}/i)); // ["#3ddc97"]
console.log("не-точка".replace(/[^а-яё]/gi, "_"));   // "не_точка"
console.log("3.14 + 2".match(/\\d+\\.\\d+/));        // ["3.14"] — точка экранирована`,
      },
      {
        kind: "tip",
        title: "Когда конструктор, а не литерал",
        md: `Литерал \`/.../\` читается и быстрее, и проще. \`new RegExp(...)\` нужен, когда шаблон **строится из строки** — например, из пользовательского ввода. Только не забудьте экранировать спецсимволы в этой строке, иначе пользователь сломает шаблон (или хуже — см. ReDoS в следующем уроке).`,
      },
      {
        kind: "warn",
        title: "Регистр и экранирование",
        md: `Символы \`/ . * + ? ^ $ ( ) [ ] { } | \\\` внутри шаблона значат особое. Хотите искать точку — пишите \`\\.\`, скобку — \`\\(\`. И наоборот: лишнее экранирование «съедает» смысл — \`[\\d]\` и \`\\d\` одинаковы, а вот \`\\b\` внутри \`[]\` уже не граница слова, а символ backspace.`,
      },
    ],
    quiz: [
      {
        q: "Какие флаги дадут поиск всех совпадений без учёта регистра?",
        options: ["gm", "gi", "ms", "uy"],
        answer: 1,
        explain: "g — глобально (все вхождения), i — игнорировать регистр. Классика: /слово/gi.",
      },
      {
        q: "Что найдёт [^0-9] в строке?",
        options: [
          "Любую цифру",
          "Любой символ, кроме цифры",
          "Число 0-9 как строку",
          "Ничего: синтаксис неверен",
        ],
        answer: 1,
        explain: "Каре ^ внутри набора в первой позиции — отрицание: любой символ, не входящий в диапазон.",
      },
      {
        q: "Зачем флаг m?",
        options: [
          "Делает точку всеядной",
          "^ и $ срабатывают на каждой строке, а не только на концах всей строки",
          "Включает юникод",
          "Разрешает многострочные шаблоны",
        ],
        answer: 1,
        explain: "Без m в '12\\n34' шаблон /^\\d+$/ не совпадёт; с m каждая линия проверяется отдельно.",
      },
    ],
    tasks: [
      {
        id: "n1t1",
        title: "Валидатор времени",
        md: `Реализуйте \`isTime(str)\` — \`true\`, если строка — время в формате \`ЧЧ:ММ\` с **реальными** значениями (00:00–23:59). \`"24:00"\`, \`"9:30"\`, \`"ab:cd"\` — \`false\`. Решите одной регуляркой.`,
        starter: `function isTime(str) {
  // регулярное выражение с якорями и диапазонами
}

console.log(isTime("23:59"), isTime("24:00"), isTime("9:30"));`,
        tests: `
await __test("'23:59' → true", () => isTime("23:59"), true);
await __test("'00:00' → true", () => isTime("00:00"), true);
await __test("'24:00' → false", () => isTime("24:00"), false);
await __test("'12:60' → false", () => isTime("12:60"), false);
await __test("'9:30' → false (нужно две цифры)", () => isTime("9:30"), false);
await __test("'12-30' → false", () => isTime("12-30"), false);
await __test("' 12:30' → false (якоря)", () => isTime(" 12:30"), false);`,
        solution: `function isTime(str) {
  return /^([01]\\d|2[0-3]):[0-5]\\d$/.test(str);
}`,
      },
      {
        id: "n1t2",
        title: "Сбор дат",
        md: `Реализуйте \`extractDates(text)\` — массив всех дат вида \`ГГГГ-ММ-ДД\` в тексте, в порядке встречи. Границы слов обязательны: часть более длинного числа датой не считается.`,
        starter: `function extractDates(text) {
  // флаг g + классы
}

console.log(extractDates("встреча 2026-02-14, дедлайн 2026-03-01"));`,
        tests: `
await __test("две даты в тексте", () =>
  extractDates("встреча 2026-02-14, дедлайн 2026-03-01"),
  ["2026-02-14", "2026-03-01"]);
await __test("дат нет", () => extractDates("просто текст"), []);
await __test("внутри длинного числа не ловится", () => extractDates("код 9992026-01-1999"), []);
await __test("повтор одной даты", () => extractDates("1999-12-31 и снова 1999-12-31").length, 2);`,
        solution: `function extractDates(text) {
  return text.match(/\\b\\d{4}-\\d{2}-\\d{2}\\b/g) ?? [];
}`,
      },
      {
        id: "n1t3",
        title: "camelCase из kebab-case",
        md: `Реализуйте \`camelize(str)\`: \`"background-color"\` → \`"backgroundColor"\`, \`"list-style-image"\` → \`"listStyleImage"\`. Используйте \`replace\` с регуляркой и функцией или группой. Строка без дефисов возвращается как есть.`,
        starter: `function camelize(str) {
  // replace + регулярка
}

console.log(camelize("background-color"));
console.log(camelize("width"));`,
        tests: `
await __test("один дефис", () => camelize("background-color"), "backgroundColor");
await __test("два дефиса", () => camelize("list-style-image"), "listStyleImage");
await __test("без дефисов", () => camelize("width"), "width");
await __test("дефис в начале", () => camelize("-webkit-transform"), "WebkitTransform");`,
        solution: `function camelize(str) {
  return str.replace(/-(\\w)/g, (m, ch) => ch.toUpperCase());
}`,
      },
    ],
  },

  {
    id: "n2",
    title: "Регулярные выражения: мастерство",
    subtitle: "Квантификаторы, группы, lookaround, ReDoS и методы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Квантификаторы: сколько раз?

- \`{n}\` — ровно n, \`{n,}\` — минимум n, \`{n,m}\` — от n до m
- \`+\` = \`{1,}\`, \`*\` = \`{0,}\`, \`?\` = \`{0,1}\`

По умолчанию квантификаторы **жадные**: хватают максимально возможное. Ленивый режим — вопрос после квантификатора (\`+?\`, \`*?\`, \`??\`): остановиться при **первой** возможности. Классика: вырезать все теги — \`/<.+?>/g\`, а не \`/<.+>/g\` (жадный съест строку до последнего \`>\`).`,
      },
      {
        kind: "code",
        title: "Жадность против лени",
        code: `const html = "<b>жирный</b> и <i>курсив</i>";

console.log(html.match(/<.+>/g));  // жадный: один «тег» на всю строку
console.log(html.match(/<.+?>/g)); // ленивый: все 4 тега

// квантификаторы на диапазоны
console.log("a aa aaaa".match(/a{2,3}/g)); // ["aa", "aaa"]`,
      },
      {
        kind: "text",
        md: `## Скобочные группы и ссылки

Группы \`(...)\` делают две вещи: **захватывают** фрагмент (доступен в результате и в замене как \`$1\`, \`$2\`…) и **группируют** для квантификаторов. Именованные группы — \`(?<имя>...)\`, доступ через \`$<имя>\` и \`groups.имя\`.

**Обратные ссылки**: \`\\1\` или \`\\k<имя>\` — «повтор того, что поймала группа» прямо внутри шаблона. Идеально для поиска повторов.

**Альтернация** \`|\` — «или»: \`/html|css|js/\`. Работает и внутри групп: \`/(ht|f)tps?/\`.`,
      },
      {
        kind: "code",
        title: "Группы и backreferences",
        code: `// перестановка дат в DD.MM.YYYY
console.log("2026-02-14".replace(/(\\d{4})-(\\d{2})-(\\d{2})/, "$3.$2.$1"));

// именованная группа
const m = "Грейс Хоппер".match(/(?<first>\\p{L}+)\\s+(?<last>\\p{L}+)/u);
console.log(m.groups.last); // Хоппер

// обратная ссылка: двойные слова
console.log("это это баг".match(/(\\p{L}+)\\s+\\1/giu)); // ["это это"]

// альтернация
console.log("учу js и css".match(/js|css/g)); // ["js", "css"]`,
      },
      {
        kind: "text",
        md: `## Опережающие и ретроспективные проверки

Lookaround проверяет контекст, **не включая** его в результат:

- \`(?=X)\` — после должно идти X (lookahead)
- \`(?!X)\` — после НЕ должно идти X
- \`(?<=X)\` — перед должно идти X (lookbehind)
- \`(?<!X)\` — перед НЕ должно идти X

Типичный приём — «пароль должен содержать цифру и быть от 8 символов»: \`/^(?=.*\\d).{8,}$/\` — проверка и длина в одном шаблоне.`,
      },
      {
        kind: "code",
        title: "Lookaround в деле",
        code: `// цифры, после которых идёт "px" — без самих "px"
console.log("margin: 10px 20em 30px".match(/\\d+(?=px)/g)); // ["10", "30"]

// числа, перед которыми НЕ минус: у "-3" позади стоит '-' — отброшено
console.log("5 -3 7".match(/(?<!-)\\d+/g)); // ["5", "7"]

const password = /^(?=.*\\d)(?=.*[a-zа-я]).{8,}$/i;
console.log(password.test("секрет42"));  // true
console.log(password.test("толькобуквы")); // false`,
      },
      {
        kind: "warn",
        title: "Катастрофический возврат (ReDoS)",
        md: `Вложенные квантификаторы вроде \`(a+)+\` порождают **экспоненциальное** число вариантов разбора, когда совпадения нет. Строка из 25 «a» и X заставит движок перебирать 2²⁵ комбинаций — вкладка повиснет. Это настоящая атака (ReDoS), если шаблон применяется к пользовательскому вводу. Правило: не допускайте, чтобы одна и та же позиция текста могла покрываться двумя квантификаторами; пользовательские шаблоны выполняйте с таймаутом.`,
      },
      {
        kind: "code",
        title: "ReDoS на 20 символах (замерьте время)",
        code: `console.time("ReDoS");
const evil = /(a+)+$/;
console.log(evil.test("a".repeat(20) + "X")); // false… но какой ценой
console.timeEnd("ReDoS"); // сотни миллисекунд на 20 символах!`,
      },
      {
        kind: "text",
        md: `## Методы RegExp и String

- \`re.test(str)\` — есть ли совпадение (boolean)
- \`re.exec(str)\` — подробный результат: группы, \`index\`, \`input\`. С флагами \`g\`/\`y\` продолжает с \`lastIndex\` — так итерируют совпадения вручную
- \`str.match(re)\` — без \`g\`: первое совпадение с группами; с \`g\`: только массив совпадений
- \`str.matchAll(re)\` — итератор **всех** совпадений с группами (флаг \`g\` обязателен)
- \`str.replace/replit\`, \`str.split(re)\`, \`str.search(re)\` — принимают регулярки напрямую
- Флаг \`y\` (sticky): \`exec\` ищет **строго** на позиции \`lastIndex\`, а не «ближайшее справа» — нужен для пошагового разбора (парсеров)`,
      },
      {
        kind: "code",
        title: "exec, matchAll и флаг y",
        code: `const str = "id:12 id:7 id:99";

for (const m of str.matchAll(/id:(\\d+)/g)) {
  console.log("нашли", m[1], "на позиции", m.index);
}

// sticky: поиск строго с lastIndex
const re = /\\d+/y;
re.lastIndex = 3;
console.log(re.exec("id:12")); // ["12"] — ровно с 3-й позиции
re.lastIndex = 0;
console.log(re.exec("id:12")); // null — с нуля цифр нет`,
      },
      {
        kind: "tip",
        title: "matchAll — современный выбор",
        md: `Нужны **все** совпадения **с группами**? \`matchAll\` — единственный метод, который отдаёт и то и другое сразу. \`match\` с флагом \`g\` группы теряет, а цикл с \`exec\` мутирует \`lastIndex\` — легко выстрелить себе в ногу.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт '<b>x</b> <i>y</i>'.match(/<.+>/)?",
        options: [
          "Только <b>",
          "Все четыре тега",
          "Одну строку от первого < до последнего >",
          "null",
        ],
        answer: 2,
        explain: "Жадный .+ идёт до последнего возможного > — до самого конца строки. Ленивый .+? остановился бы на первом.",
      },
      {
        q: "Чем (?=\\d) отличается от просто \\d?",
        options: [
          "Ничем",
          "Проверяет наличие цифры дальше, не включая её в результат и не потребляя",
          "Ищет цифру до, а не после",
          "Работает только с флагом g",
        ],
        answer: 1,
        explain: "Lookahead — assertion: смотрит вперёд, но позиция не сдвигается и символ в матч не входит.",
      },
      {
        q: "Почему (a+)+$ опасен на длинных строках без совпадения?",
        options: [
          "Регулярки всегда медленные",
          "Вложенные квантификаторы дают экспоненциальный перебор разбиений",
          "Из-за флага $",
          "Переполняется lastIndex",
        ],
        answer: 1,
        explain: "Каждую 'a' можно отнести к любому из уровней вложенности — 2^n вариантов. Это и есть ReDoS.",
      },
    ],
    tasks: [
      {
        id: "n2t1",
        title: "Ловец повторов",
        md: `Реализуйте \`findRepeats(text)\` — массив пар **одинаковых** слов, идущих подряд («это это», «раз раз»), через обратную ссылку \`\\1\`. Регистр не учитывать, кириллица обязательна (флаг \`u\`, класс \`\\p{L}\`).`,
        starter: `function findRepeats(text) {
  // группы + обратная ссылка
}

console.log(findRepeats("слово слово и раз раз"));`,
        tests: `
await __test("два повтора", () => findRepeats("слово слово и раз раз"), ["слово слово", "раз раз"]);
await __test("повторов нет", () => findRepeats("чистый текст без повторов"), []);
await __test("регистр не важен", () => findRepeats("Да да!"), ["Да да"]);
await __test("латиница тоже", () => findRepeats("the the cat"), ["the the"]);`,
        solution: `function findRepeats(text) {
  return text.match(/(\\p{L}+)\\s+\\1/giu) ?? [];
}`,
      },
      {
        id: "n2t2",
        title: "Маска карты",
        md: `Реализуйте \`maskCard(number)\`: из 16 цифр делает \`"**** **** **** 1111"\` — видны только **последние 4**, остальные заменены \`*\`, каждые 4 символа разделены пробелом. Используйте lookahead, а не срезы строки.`,
        starter: `function maskCard(number) {
  // lookahead (?=...)
}

console.log(maskCard("4111111111111111"));`,
        tests: `
await __test("стандартная маска", () => maskCard("4111111111111111"), "**** **** **** 1111");
await __test("другая карта", () => maskCard("5500000000000004"), "**** **** **** 0004");
await __test("все нули", () => maskCard("0000000000000000"), "**** **** **** 0000");`,
        solution: `function maskCard(number) {
  const masked = number.replace(/\\d(?=\\d{4})/g, "*");
  return masked.replace(/(.{4})(?=.)/g, "$1 ");
}`,
      },
      {
        id: "n2t3",
        title: "Разбор query-строки",
        md: `Реализуйте \`parseQuery(qs)\`: \`"?a=1&b=привет%20мир"\` → \`{ a: "1", b: "привет мир" }\`. Решите через \`matchAll\` + \`decodeURIComponent\` (не через URLSearchParams — тренируем регулярки). Пустая строка → \`{}\`.`,
        starter: `function parseQuery(qs) {
  // matchAll + группы
}

console.log(parseQuery("?a=1&b=привет%20мир"));`,
        tests: `
await __test("две пары", () => parseQuery("?a=1&b=2"), { a: "1", b: "2" });
await __test("декодирование", () => parseQuery("q=привет%20мир"), { q: "привет мир" });
await __test("без вопроса", () => parseQuery("x=10"), { x: "10" });
await __test("пустая строка", () => parseQuery(""), {});
await __test("пустое значение", () => parseQuery("flag="), { flag: "" });`,
        solution: `function parseQuery(qs) {
  const clean = qs.replace(/^\\?/, "");
  if (!clean) return {};
  return Object.fromEntries(
    [...clean.matchAll(/([^=&]+)=([^&]*)/g)].map(([, k, v]) => [
      decodeURIComponent(k),
      decodeURIComponent(v),
    ])
  );
}`,
      },
    ],
  },

  {
    id: "n3",
    title: "Бинарные данные и файлы",
    subtitle: "ArrayBuffer, типизированные массивы, Blob, FileReader",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `Когда данные — не текст и не числа JavaScript, а **сырые байты** (картинка, аудио, сетевой пакет), язык даёт двухэтажную модель:

1. **\`ArrayBuffer\`** — непрерывный кусок памяти фиксированной длины. Сам по себе пуст: к нему нельзя обратиться напрямую
2. **Представления (views)** — «очки» на эту память: \`Uint8Array\` (байты 0–255), \`Int32Array\`, \`Float64Array\` и другие — каждое трактует байты по-своему. \`DataView\` — гибкое представление с контролем **порядка байтов** (endianness) для чтения файловых и сетевых форматов

На один \`ArrayBuffer\` можно навесить несколько представлений сразу.`,
      },
      {
        kind: "code",
        title: "Память под микроскопом",
        code: `const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
const words = new Uint32Array(buffer);

bytes[0] = 255;
bytes[1] = 256;      // переполнение: 256 mod 256 = 0!
bytes[2] = -1;       // 255 — беззнаковый тип
console.log(bytes.slice(0, 4)); // [255, 0, 255, 0]

words[0] = 1;
console.log(bytes.slice(0, 4)); // [1, 0, 0, 0] — little-endian
console.log(bytes.length, words.length); // 8 и 2 — одна память, разные взгляды

const dv = new DataView(buffer);
console.log(dv.getUint32(0, false)); // big-endian чтение: 16777216`,
      },
      {
        kind: "text",
        md: `## Текст ↔ байты

\`TextEncoder\` превращает строку в \`Uint8Array\` в **UTF-8** (всегда), \`TextDecoder\` — обратно, с опциями \`fatal\` (бросать на битом UTF-8) и \`ignoreBOM\`. Кириллица в UTF-8 занимает 2 байта на символ, эмодзи — 4.`,
      },
      {
        kind: "code",
        title: "Кодирование",
        code: `const encoder = new TextEncoder();
const bytes = encoder.encode("Привет 🚀");

console.log(bytes);             // UTF-8 байты
console.log(bytes.length);      // 17: 6×2 + пробел + 4
console.log("Привет 🚀".length); // 8: UTF-16, эмодзи = 2 «символа»

const decoder = new TextDecoder("utf-8");
console.log(decoder.decode(bytes.slice(0, 12))); // "Привет"
console.log(decoder.decode(bytes));              // "Привет 🚀"`,
      },
      {
        kind: "text",
        md: `## Blob и File

**\`Blob\`** — неизменяемый «кусок данных» с MIME-типом: конструктор из строк/байтов, \`slice()\`, \`text()\`, \`arrayBuffer()\`, \`size\`, \`type\`. Из Blob делают \`URL.createObjectURL\` — временную ссылку для \`<img>\` или скачивания (не забудьте \`revokeObjectURL\`!).

**\`File\`** наследует Blob и добавляет \`name\` и \`lastModified\`. Из формы файлы приходят как \`FileList\` (\`input.files\`), а читает их **\`FileReader\`**: \`readAsText\`, \`readAsArrayBuffer\`, \`readAsDataURL\` (base64 — для превью картинок).`,
      },
      {
        kind: "code",
        title: "Blob в песочнице",
        code: `const blob = new Blob(["<h1>Привет</h1>"], { type: "text/html" });
console.log(blob.size, blob.type); // 21 "text/html"

const part = blob.slice(0, 9);
console.log(await part.text()); // "<h1>Приве"

const fromBytes = new Blob([new Uint8Array([74, 83])]); // байты "JS"
console.log(await fromBytes.text()); // "JS"`,
      },
      {
        kind: "code",
        title: "FileReader (браузерный API, запуск не требуется)",
        norun: true,
        code: `input.addEventListener("change", () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    preview.src = reader.result; // dataURL — base64-превью
  };
  reader.onerror = () => console.error(reader.error);

  reader.readAsDataURL(file); // или readAsText / readAsArrayBuffer
});`,
      },
      {
        kind: "tip",
        title: "Не копируйте то, что можно не копировать",
        md: `Современные API (\`fetch\`, Web Crypto, WebGL) принимают и отдают \`ArrayBuffer\`/\`TypedArray\` напрямую. Перекладывание байтов через строки и base64 — главный источник лишних аллокаций при работе с файлами.`,
      },
    ],
    quiz: [
      {
        q: "Что окажется в Uint8Array при записи 300?",
        options: ["300", "Ошибка RangeError", "44 (300 mod 256)", "0"],
        answer: 2,
        explain: "Беззнаковый байт хранит 0–255: значение заворачивается по модулю 256. 300 − 256 = 44.",
      },
      {
        q: "Зачем нужен DataView, если есть Uint32Array?",
        options: [
          "Он быстрее",
          "Даёт контролировать порядок байтов (endianness) при чтении/записи",
          "Работает со строками",
          "Это устаревшее имя Uint32Array",
        ],
        answer: 1,
        explain: "DataView.getUint32(offset, littleEndian) позволяет явно указать порядок байтов — критично для файловых форматов и сетевых протоколов.",
      },
      {
        q: "Чем File отличается от Blob?",
        options: [
          "File изменяемый",
          "File — Blob с name и lastModified, обычно из файловой системы",
          "Blob больше по размеру",
          "Ничем, это алиасы",
        ],
        answer: 1,
        explain: "File расширяет Blob метаданными файла. Всё, что умеет Blob, умеет и File.",
      },
    ],
    tasks: [
      {
        id: "n3t1",
        title: "Hex ↔ байты",
        md: `Реализуйте пару функций: \`hexToBytes(hex)\` — \`"ff00ab"\` → \`Uint8Array [255, 0, 171]\`, и \`bytesToHex(bytes)\` — обратно, в нижнем регистре с дополнением до двух знаков (\`"0b"\` → \`"0b"\`… точнее байт 11 → \`"0b"\`).`,
        starter: `function hexToBytes(hex) {
  // Uint8Array
}

function bytesToHex(bytes) {
  // toString(16) + padStart
}

console.log(hexToBytes("ff00ab"));
console.log(bytesToHex(new Uint8Array([255, 0, 11])));`,
        tests: `
await __test("hexToBytes('ff00ab')", () => [...hexToBytes("ff00ab")], [255, 0, 171]);
await __test("hexToBytes('00')", () => [...hexToBytes("00")], [0]);
await __test("bytesToHex([255,0,11]) → 'ff000b'", () => bytesToHex(new Uint8Array([255, 0, 11])), "ff000b");
await __test("round-trip", () => bytesToHex(hexToBytes("3ddc97")), "3ddc97");`,
        solution: `function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}`,
      },
      {
        id: "n3t2",
        title: "Измеритель UTF-8",
        md: `Реализуйте \`measure(str)\` через \`TextEncoder\`: объект \`{ chars, bytes }\`, где \`chars\` — длина строки в JS (UTF-16), \`bytes\` — реальный размер в UTF-8. \`measure("Привет")\` → \`{ chars: 6, bytes: 12 }\`.`,
        starter: `function measure(str) {
  // TextEncoder
}

console.log(measure("Привет"));
console.log(measure("abc"));`,
        tests: `
await __test("кириллица: 2 байта на символ", () => measure("Привет"), { chars: 6, bytes: 12 });
await __test("латиница: 1 байт", () => measure("abc"), { chars: 3, bytes: 3 });
await __test("эмодзи: 4 байта", () => measure("🚀"), { chars: 2, bytes: 4 });
await __test("пустая строка", () => measure(""), { chars: 0, bytes: 0 });`,
        solution: `function measure(str) {
  return { chars: str.length, bytes: new TextEncoder().encode(str).length };
}`,
      },
      {
        id: "n3t3",
        title: "Склейка буферов",
        md: `Реализуйте \`concatBytes(...chunks)\` — склеивает произвольное число \`Uint8Array\` в один новый массив. Пустой вызов → пустой \`Uint8Array\`.`,
        starter: `function concatBytes(...chunks) {
  // new Uint8Array(суммарная длина) + set
}

console.log(concatBytes(new Uint8Array([1, 2]), new Uint8Array([3]), new Uint8Array([4, 5])));`,
        tests: `
await __test("три куска", () => [...concatBytes(new Uint8Array([1, 2]), new Uint8Array([3]), new Uint8Array([4, 5]))], [1, 2, 3, 4, 5]);
await __test("пустые аргументы", () => [...concatBytes(new Uint8Array([]), new Uint8Array([7]))], [7]);
await __test("без аргументов", () => concatBytes().length, 0);
await __test("исходники не мутируют", () => {
  const a = new Uint8Array([1]);
  concatBytes(a, new Uint8Array([2]));
  return [...a];
}, [1]);`,
        solution: `function concatBytes(...chunks) {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}`,
      },
    ],
  },

  {
    id: "n4",
    title: "Сеть: fetch, CORS, WebSocket",
    subtitle: "HTTP-запросы, прерывания, прогресс и realtime-каналы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Fetch — базовый обмен

\`fetch(url, options)\` возвращает промис с \`Response\`: \`status\`, \`ok\` (200–299), тело читается **один раз** — \`json()\`, \`text()\`, \`blob()\`, \`arrayBuffer()\`. Тело запроса: строка, \`JSON.stringify\` (+ заголовок \`Content-Type: application/json\`), \`FormData\`, \`Blob\`, \`URLSearchParams\`.`,
      },
      {
        kind: "code",
        title: "Классические сценарии (браузер, запуск не требуется)",
        norun: true,
        code: `// GET + JSON
const res = await fetch("https://api.github.com/users/torvalds");
if (!res.ok) throw new Error("HTTP " + res.status);
const user = await res.json();

// POST
await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ item: "книга", qty: 2 }),
});

// форма как multipart/form-data — без ручных заголовков!
const fd = new FormData(document.forms.order);
fd.append("coupon", "SALE10");
await fetch("/api/orders", { method: "POST", body: fd });`,
      },
      {
        kind: "text",
        md: `## Ход загрузки, прерывание, прогресс

- **Прерывание**: \`AbortController\` — создаём \`signal\`, передаём в fetch, вызываем \`abort()\` → промис падает с \`AbortError\`. Так отменяют устаревшие запросы при быстром вводе в поиск
- **Прогресс скачивания**: \`response.body.getReader()\` — стрим: читаем чанки и считаем байты (заголовок \`Content-Length\` подскажет итог)
- **Прогресс отправки**: умеет \`XMLHttpRequest\` (\`xhr.upload.onprogress\`) — старый API до сих пор жив именно ради этого, плюс \`timeout\` и синхронные режимы (которые лучше не трогать)`,
      },
      {
        kind: "code",
        title: "AbortController и стрим (браузер, запуск не требуется)",
        norun: true,
        code: `const controller = new AbortController();
setTimeout(() => controller.abort(), 50); // передумать через 50 мс

try {
  await fetch("/huge-file", { signal: controller.signal });
} catch (err) {
  console.log(err.name); // "AbortError"
}

// прогресс скачивания через ReadableStream
const response = await fetch("/video.mp4");
const total = Number(response.headers.get("Content-Length"));
const reader = response.body.getReader();
let received = 0;
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  received += value.length;
  console.log(Math.round((received / total) * 100) + "%");
}`,
      },
      {
        kind: "warn",
        title: "CORS: браузер защищает пользователя",
        md: `Запросы «на другие сайты» ограничены политикой **CORS**: браузер сам добавляет \`Origin\`, а сервер должен ответить \`Access-Control-Allow-Origin\`. «Несimple»-запросы (JSON-тело, кастомные заголовки, методы кроме GET/POST/HEAD) предваряются **preflight** — OPTIONS-запросом, где сервер разрешает метод и заголовки. \`credentials: "include"\` тащит куки и требует от сервера конкретного происхождения, а не \`*\`. И главное: CORS защищает **пользователя** от вашего фронтенда; вашему бэкенду он не мешает принять запрос от curl.`,
      },
      {
        kind: "text",
        md: `## Объекты URL

\`new URL(str, base)\` — надёжный разбор: \`protocol\`, \`host\`, \`pathname\`, \`hash\` и живые \`searchParams\` (\`get/set/append/delete/has\`), которые сами кодируют значения. \`URLSearchParams\` живёт и отдельно — для тел запросов.`,
      },
      {
        kind: "code",
        title: "URL в песочнице",
        code: `const url = new URL("/users/42?tab=posts", "https://site.ru");
console.log(url.href); // https://site.ru/users/42?tab=posts
console.log(url.host, url.pathname);

url.searchParams.set("q", "привет мир");
console.log(url.toString()); // q=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82+%D0%BC%D0%B8%D1%80

const params = new URLSearchParams([["a", "1"], ["b", "x&y"]]);
console.log(params.toString()); // "a=1&b=x%26y" — & внутри значения экранирован`,
      },
      {
        kind: "text",
        md: `## Realtime: WebSocket, SSE, длинные опросы

- **WebSocket** — постоянный двунаправленный канал поверх одного TCP-соединения: \`new WebSocket("wss://…")\`, события \`onopen/onmessage/onclose/onerror\`, \`send()\` принимает строки и бинарники. Чаты, игры, биржевые тикеры
- **Server-Sent Events** — поток **только с сервера** через обычный HTTP: \`new EventSource("/feed")\` с **автопереподключением** и \`onmessage\`. Идеален для уведомлений
- **Длинные опросы** — «дедовский» fallback: клиент ждёт ответа, сервер держит соединение до появления данных, клиент переспрашивает. Нужен, только когда WS/SSE недоступны

**Возобновляемая загрузка файла**: клиент спрашивает у сервера, сколько байт уже получено, и докачивает с \`Content-Range\` / заголовком \`Range\` — прерванный гигабайт не начинается заново.`,
      },
      {
        kind: "code",
        title: "WebSocket и SSE (браузер, запуск не требуется)",
        norun: true,
        code: `const ws = new WebSocket("wss://chat.example/room/1");
ws.onopen = () => ws.send("всем привет");
ws.onmessage = (event) => console.log("пришло:", event.data);
ws.onclose = (e) => console.log("закрыт:", e.code, e.reason);

const feed = new EventSource("/notifications");
feed.onmessage = (e) => console.log("уведомление:", e.data);
feed.onerror = () => console.log("переподключаюсь..."); // EventSource сделает это сам`,
      },
      {
        kind: "tip",
        title: "Что брать",
        md: `Обычный запрос-ответ — \`fetch\`. Обновления с сервера без запросов — SSE (проще, HTTP-дружелюбен). Настоящий диалог в обе стороны — WebSocket. XHR — только если нужен прогресс **отправки** или поддержка древних браузеров.`,
      },
    ],
    quiz: [
      {
        q: "Когда браузер шлёт preflight (OPTIONS)?",
        options: [
          "Всегда при fetch",
          "Для «несimple»-запросов: JSON-тело, кастомные заголовки, PUT/DELETE…",
          "Только при ошибке сервера",
          "Только для WebSocket",
        ],
        answer: 1,
        explain: "Перед сложным кросс-доменным запросом браузер спрашивает сервер: «можно ли мне таким методом и с такими заголовками?».",
      },
      {
        q: "Что произойдёт при controller.abort()?",
        options: [
          "Запрос продолжится в фоне",
          "Промис fetch отклонится с ошибкой AbortError",
          "Страница перезагрузится",
          "Ничего: abort — рекомендация",
        ],
        answer: 1,
        explain: "Соединение рвётся, промис падает с err.name === 'AbortError' — его принято отличать от сетевых сбоев.",
      },
      {
        q: "Ключевое отличие SSE от WebSocket?",
        options: [
          "SSE быстрее",
          "SSE — односторонний поток с сервера с автопереподключением поверх HTTP",
          "WebSocket не умеет бинарные данные",
          "Их нет",
        ],
        answer: 1,
        explain: "EventSource: только server→client, авто-reconnect, обычный HTTP и прокси-дружелюбие. WebSocket — полноценный диалог.",
      },
    ],
    tasks: [
      {
        id: "n4t1",
        title: "Сборщик URL",
        md: `Реализуйте \`buildUrl(base, params)\` через \`new URL\` и \`searchParams\`: \`buildUrl("https://api.site/v1", { q: "js", page: 2 })\` → \`"https://api.site/v1?q=js&page=2"\`. Кириллица и пробелы должны кодироваться автоматически.`,
        starter: `function buildUrl(base, params) {
  // new URL + searchParams.set
}

console.log(buildUrl("https://api.site/v1", { q: "js", page: 2 }));`,
        tests: `
await __test("базовый случай", () => buildUrl("https://api.site/v1", { q: "js", page: 2 }), "https://api.site/v1?q=js&page=2");
await __test("кириллица кодируется", () => buildUrl("https://x.io/search", { q: "привет" }), "https://x.io/search?q=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82");
await __test("пустые params", () => buildUrl("https://x.io/a", {}), "https://x.io/a");
await __test("спецсимволы", () => buildUrl("https://x.io", { q: "a&b=c" }), "https://x.io/?q=a%26b%3Dc");`,
        solution: `function buildUrl(base, params) {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}`,
      },
      {
        id: "n4t2",
        title: "Разборщик URL",
        md: `Реализуйте \`parseUrl(str)\` → \`{ host, path, params }\`, где \`params\` — обычный объект из search-параметров. \`parseUrl("https://site.ru/api/users?page=2&q=js")\` → \`{ host: "site.ru", path: "/api/users", params: { page: "2", q: "js" } }\`.`,
        starter: `function parseUrl(str) {
  // new URL + Object.fromEntries
}

console.log(parseUrl("https://site.ru/api/users?page=2&q=js"));`,
        tests: `
await __test("полный разбор", () => parseUrl("https://site.ru/api/users?page=2&q=js"),
  { host: "site.ru", path: "/api/users", params: { page: "2", q: "js" } });
await __test("без параметров", () => parseUrl("https://x.io/"), { host: "x.io", path: "/", params: {} });
await __test("с портом", () => parseUrl("http://localhost:3000/a?x=1").host, "localhost:3000");`,
        solution: `function parseUrl(str) {
  const url = new URL(str);
  return {
    host: url.host,
    path: url.pathname,
    params: Object.fromEntries(url.searchParams),
  };
}`,
      },
      {
        id: "n4t3",
        title: "Сериализатор формы",
        md: `Реализуйте \`serializeForm(obj)\` — объект полей формы в query-строку **без** ведущего \`?\`, через \`URLSearchParams\`. Ключи — в алфавитном порядке (URLSearchParams сортирует через \`sort()\`).`,
        starter: `function serializeForm(obj) {
  // URLSearchParams + sort
}

console.log(serializeForm({ name: "Ада", age: 36 }));`,
        tests: `
await __test("две пары", () => serializeForm({ name: "Ада", age: 36 }), "age=36&name=%D0%90%D0%B4%D0%B0");
await __test("пробел → +", () => serializeForm({ q: "два слова" }), "q=%D0%B4%D0%B2%D0%B0+%D1%81%D0%BB%D0%BE%D0%B2%D0%B0");
await __test("пустой объект", () => serializeForm({}), "");
await __test("сортировка ключей", () => serializeForm({ z: 1, a: 2 }), "a=2&z=1");`,
        solution: `function serializeForm(obj) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, value);
  }
  params.sort();
  return params.toString();
}`,
      },
    ],
  },

  {
    id: "n5",
    title: "Хранение: куки, Storage, IndexedDB",
    subtitle: "Три яруса персистентности в браузере",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `В браузере три «полки» для данных, и у каждой свой характер:

- **Куки** — маленькие (≈4 КБ), улетают на сервер **с каждым запросом**, управляются и сервером (заголовок \`Set-Cookie\`), и JS (\`document.cookie\`)
- **localStorage / sessionStorage** — по ~5 МБ строк, только клиентские, синхронный API
- **IndexedDB** — полноценная клиентская БД: объекты, индексы, транзакции, мегабайты и гигабайты, асинхронный API

\`localStorage\` переживает закрытие браузера и общий для всех вкладок домена. \`sessionStorage\` живёт **только в своей вкладке**: перезакрыли вкладку — данных нет.`,
      },
      {
        kind: "browser",
        title: "Мини-браузер: localStorage вживую",
        presets: [
          {
            name: "Счётчик визитов",
            code: `try {
  var visits = Number(localStorage.getItem("visits") || 0) + 1;
  localStorage.setItem("visits", String(visits));
  document.body.innerHTML =
    '<p style="font: 15px system-ui">Вы заходили в эту песочницу <b>' + visits + '</b> раз(а).</p>' +
    '<p style="font:12px system-ui;color:#777">localStorage живёт в домене и переживает перезагрузку — запустите пресет ещё раз.</p>';
} catch (err) {
  document.body.innerHTML = '<p style="font:15px system-ui">localStorage недоступен в изолированном iframe: ' + err.message + '</p>';
}`,
          },
          {
            name: "Куки через document.cookie",
            code: `try {
  document.cookie = "demo=1; path=/";
  document.body.innerHTML =
    '<p style="font:15px system-ui">document.cookie сейчас: <code>' + (document.cookie || "(пусто — iframe без прав на куки)") + '</code></p>';
} catch (err) {
  document.body.innerHTML = '<p style="font:15px system-ui">Куки заблокированы: ' + err.message + '</p>';
}`,
          },
          {
            name: "JSON в Storage",
            code: `try {
  var state = { theme: "dark", tabs: ["урок 1", "урок 2"] };
  localStorage.setItem("state", JSON.stringify(state));
  var raw = localStorage.getItem("state");
  var back = JSON.parse(raw);
  document.body.innerHTML =
    '<p style="font:15px system-ui">сохранили объект, достали (переменная back):</p>' +
    '<pre style="font:13px monospace;background:#f2f4f8;padding:10px;border-radius:8px;color:#111">' + raw + '</pre>' +
    '<p style="font:12px system-ui;color:#777">Storage хранит только строки — отсюда обязательный JSON-сэндвич.</p>';
} catch (err) {
  document.body.innerHTML = '<p style="font:15px system-ui">Storage недоступен: ' + err.message + '</p>';
}`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Куки в деталях

Запись: \`document.cookie = "user=ada; path=/; max-age=86400; secure; samesite=strict"\`. Чтение возвращает **все** куки одной строкой — парсить вручную. Флаги:

- \`path\`, \`domain\` — область видимости
- \`expires\` / \`max-age\` — срок жизни (без них кука сессионная)
- \`secure\` — только HTTPS, \`samesite\` — защита от CSRF
- \`HttpOnly\` — ставится **только сервером**: JS такую куку не видит — это главная защита украденных токенов от XSS`,
      },
      {
        kind: "code",
        title: "Типичная обёртка над куками (браузер, запуск не требуется)",
        norun: true,
        code: `function setCookie(name, value, days) {
  const encoded = encodeURIComponent(value);
  let cookie = name + "=" + encoded + "; path=/";
  if (days) {
    const ms = Date.now() + days * 864e5;
    cookie += "; expires=" + new Date(ms).toUTCString();
  }
  document.cookie = cookie;
}

function getCookie(name) {
  const pair = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return pair ? decodeURIComponent(pair.split("=")[1]) : undefined;
}`,
      },
      {
        kind: "text",
        md: `## IndexedDB

Встроенная NoSQL-база: \`indexedDB.open(name, version)\` → \`onupgradeneeded\` (создаём **objectStore** при смене версии) → транзакции \`readwrite\` → \`store.add/put/get/delete\`, курсоры и индексы для выборок. Всё асинхронно и на событиях — на практике заворачивают в промисы или берут библиотеку (idb). Работает даже в Web Worker и вмещает куда больше, чем Storage.`,
      },
      {
        kind: "code",
        title: "IndexedDB: минимальный цикл (браузер, запуск не требуется)",
        norun: true,
        code: `const request = indexedDB.open("notes", 1);

request.onupgradeneeded = (e) => {
  const db = e.target.result;
  if (!db.objectStoreNames.contains("notes")) {
    db.createObjectStore("notes", { keyPath: "id" });
  }
};

request.onsuccess = () => {
  const db = request.result;
  const tx = db.transaction("notes", "readwrite");
  tx.objectStore("notes").put({ id: 1, text: "выучить IndexedDB" });
  tx.oncomplete = () => console.log("записано");
};`,
      },
      {
        kind: "tip",
        title: "Событие storage",
        md: `Когда **одна вкладка** меняет localStorage, **другие** получают событие \`storage\` с \`key\`, \`oldValue\`, \`newValue\`. Дешёвая синхронизация состояния между вкладками без сервера.`,
      },
      {
        kind: "warn",
        title: "Что нельзя хранить",
        md: `Токены авторизации в localStorage доступны **любому** скрипту на странице — одна XSS-дыра, и аккаунт угнан. Правильно: \`HttpOnly\`-куки, которые JS не видит. В Storage/IDB — только некритичные данные: черновики, настройки, кэш.`,
      },
    ],
    quiz: [
      {
        q: "Когда исчезают данные sessionStorage?",
        options: [
          "При перезагрузке страницы",
          "При закрытии вкладки",
          "Через 24 часа",
          "При очистке куки",
        ],
        answer: 1,
        explain: "sessionStorage живёт в рамках вкладки: F5 его сохраняет, закрытие вкладки — стирает.",
      },
      {
        q: "Чем HttpOnly-кука ценна для безопасности?",
        options: [
          "Она зашифрована",
          "JavaScript её не видит — XSS не украдёт токен через document.cookie",
          "Она не отправляется на сервер",
          "Она больше по размеру",
        ],
        answer: 1,
        explain: "Флаг ставит только сервер через Set-Cookie. Даже внедрённый скрипт не сможет прочитать такую куку.",
      },
      {
        q: "Когда срабатывает onupgradeneeded в IndexedDB?",
        options: [
          "При каждом открытии базы",
          "Когда запрашиваемая версия выше текущей (или база создаётся впервые)",
          "При каждой записи",
          "При переполнении хранилища",
        ],
        answer: 1,
        explain: "Это единственное место, где можно создавать/менять objectStore — миграции версионируются через номер версии базы.",
      },
    ],
    tasks: [
      {
        id: "n5t1",
        title: "Парсер кук",
        md: `Реализуйте \`parseCookies(str)\` — строку формата \`document.cookie\` (\`"a=1; b=hello%20world"\`) в объект с **декодированием** значений через \`decodeURIComponent\`. Пустая строка → \`{}\`.`,
        starter: `function parseCookies(str) {
  // split + decodeURIComponent
}

console.log(parseCookies("a=1; b=hello%20world"));`,
        tests: `
await __test("две куки", () => parseCookies("a=1; b=2"), { a: "1", b: "2" });
await __test("декодирование", () => parseCookies("msg=hello%20world"), { msg: "hello world" });
await __test("кириллица", () => parseCookies("имя=%D0%90%D0%B4%D0%B0"), { "имя": "Ада" });
await __test("пустая строка", () => parseCookies(""), {});
await __test("лишние пробелы", () => parseCookies("  a=1 ;  b=2 "), { a: "1", b: "2" });`,
        solution: `function parseCookies(str) {
  return Object.fromEntries(
    str
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((pair) => {
        const i = pair.indexOf("=");
        return [
          decodeURIComponent(pair.slice(0, i)),
          decodeURIComponent(pair.slice(i + 1)),
        ];
      })
  );
}`,
      },
      {
        id: "n5t2",
        title: "Свой Storage",
        md: `Реализуйте \`createStorage()\` — объект с интерфейсом localStorage: \`setItem\` (приводит к строке), \`getItem\` (нет ключа → \`null\`), \`removeItem\`, \`clear\` и геттер \`length\`. Внутри — \`Map\` (это учебная модель того, что браузер делает нативно).`,
        starter: `function createStorage() {
  // Map внутри замыкания
}

const s = createStorage();
s.setItem("x", 42);
console.log(s.getItem("x"), s.length); // "42" 1`,
        tests: `
await __test("set/get со строковым приведением", () => {
  const s = createStorage();
  s.setItem("x", 42);
  return s.getItem("x");
}, "42");
await __test("getItem несуществующего → null", () => createStorage().getItem("nope"), null);
await __test("removeItem", () => {
  const s = createStorage();
  s.setItem("a", "1");
  s.removeItem("a");
  return [s.getItem("a"), s.length];
}, [null, 0]);
await __test("clear и length", () => {
  const s = createStorage();
  s.setItem("a", "1");
  s.setItem("b", "2");
  const before = s.length;
  s.clear();
  return [before, s.length];
}, [2, 0]);
await __test("перезапись", () => {
  const s = createStorage();
  s.setItem("k", "v1");
  s.setItem("k", "v2");
  return [s.getItem("k"), s.length];
}, ["v2", 1]);`,
        solution: `function createStorage() {
  const data = new Map();
  return {
    setItem(key, value) {
      data.set(key, String(value));
    },
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    removeItem(key) {
      data.delete(key);
    },
    clear() {
      data.clear();
    },
    get length() {
      return data.size;
    },
  };
}`,
      },
      {
        id: "n5t3",
        title: "Записи с TTL",
        md: `Реализуйте \`withExpiry(key, value, ms, now)\` → \`{ key, value, expiresAt: now + ms }\` и \`isExpired(entry, now)\` → \`true\`, если срок вышел (\`now >= expiresAt\`). \`now\` — число-миллисекунды. Это ядро «куки на минималках» в localStorage.`,
        starter: `function withExpiry(key, value, ms, now) {
  // expiresAt
}

function isExpired(entry, now) {
  // сравнение
}

const e = withExpiry("token", "abc", 1000, 5000);
console.log(e, isExpired(e, 5999), isExpired(e, 6000));`,
        tests: `
await __test("expiresAt считается", () => withExpiry("k", "v", 1000, 5000),
  { key: "k", value: "v", expiresAt: 6000 });
await __test("ещё жива", () => isExpired(withExpiry("k", "v", 1000, 5000), 5999), false);
await __test("граница — уже мертва", () => isExpired(withExpiry("k", "v", 1000, 5000), 6000), true);
await __test("давно просрочена", () => isExpired(withExpiry("k", "v", 100, 0), 999999), true);`,
        solution: `function withExpiry(key, value, ms, now) {
  return { key, value, expiresAt: now + ms };
}

function isExpired(entry, now) {
  return now >= entry.expiresAt;
}`,
      },
    ],
  },

  {
    id: "n6",
    title: "Анимация и веб-компоненты",
    subtitle: "Безье, requestAnimationFrame, Custom Elements, Shadow DOM",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Анимация: CSS или JS?

**CSS** (\`transition\`, \`@keyframes\`) — дешевле: браузер анимирует на композиторе, часто вне основного потока. Кривая скорости задаётся **кривой Безье** \`cubic-bezier(x1, y1, x2, y2)\`: две контрольные точки тянут прогресс — \`ease\`, \`ease-in-out\` или собственный драматичный overshoot \`cubic-bezier(.68,-0.55,.27,1.55)\`. Для «рваных» шагов — \`steps(n)\`.

**JS** — когда нужна логика по ходу: \`requestAnimationFrame(callback)\` вызывает функцию **перед каждым кадром** (~60/120 в секунду, в такт дисплею — и только когда вкладка видна). Универсальный паттерн: тайминг-функция → прогресс → отрисовка кадра.`,
      },
      {
        kind: "browser",
        title: "Мини-браузер: анимации вживую",
        presets: [
          {
            name: "CSS transition и Безье",
            code: `document.body.innerHTML =
  '<style>.box{width:60px;height:60px;border-radius:12px;background:#f7df1e;' +
  'transition:transform 0.9s cubic-bezier(.68,-0.55,.27,1.55)}' +
  '.box.go{transform:translateX(220px) rotate(180deg)}</style>' +
  '<div class="box" id="b"></div>' +
  '<p style="font:12px system-ui;color:#777">cubic-bezier(.68,-0.55,.27,1.55) — с «перелётом»</p>';
var box = document.getElementById("b");
setTimeout(function () { box.classList.add("go"); }, 100);`,
          },
          {
            name: "JS-анимация на rAF",
            code: `document.body.innerHTML =
  '<div style="background:#eef1f6;border-radius:999px;height:16px;overflow:hidden">' +
  '<div id="bar" style="height:100%;width:0%;background:#3ddc97"></div></div>' +
  '<p id="p" style="font:13px monospace;margin-top:8px"></p>';
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
var bar = document.getElementById("bar");
var p = document.getElementById("p");
var start = performance.now();
var duration = 1500;
function frame(now) {
  var progress = Math.min((now - start) / duration, 1);
  var eased = easeInOutCubic(progress);
  bar.style.width = (eased * 100).toFixed(1) + "%";
  p.textContent = "кадр: progress=" + progress.toFixed(3) + " → eased=" + eased.toFixed(3);
  if (progress < 1) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
          },
          {
            name: "Custom Element + Shadow DOM",
            code: `class JsBadge extends HTMLElement {
  static get observedAttributes() { return ["level"]; }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    var level = this.getAttribute("level") || "junior";
    this.shadowRoot.innerHTML =
      "<style>:host{display:inline-block} .b{font:700 13px system-ui;padding:5px 14px;" +
      "border-radius:999px;border:2px solid currentColor} .junior{color:#059669}" +
      ".middle{color:#0284c7}.senior{color:#e11d48}</style>" +
      '<span class="b ' + level + '">' + level + "</span>";
  }
}
if (!customElements.get("js-badge")) customElements.define("js-badge", JsBadge);
document.body.innerHTML =
  "<p><js-badge level='junior'></js-badge> <js-badge level='middle'></js-badge> <js-badge level='senior'></js-badge></p>" +
  "<p style='font:12px system-ui;color:#777'>Через секунду первый бейдж мутирует в senior — сработает attributeChangedCallback.</p>";
setTimeout(function () {
  document.querySelector("js-badge").setAttribute("level", "senior");
}, 1000);`,
          },
          {
            name: "template, слоты и события",
            code: `var tpl = document.createElement("template");
tpl.innerHTML =
  "<style>.card{border:2px solid #e2e8f0;border-radius:12px;padding:12px;font:14px system-ui}" +
  "header{font-weight:700;color:#0f172a;margin-bottom:6px} ::slotted(p){color:#475569}</style>" +
  '<div class="card"><header><slot name="title">Без названия</slot></header>' +
  "<div><slot></slot></div></div>";
class InfoCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(tpl.content.cloneNode(true));
    this.shadowRoot.querySelector(".card").addEventListener("click", (e) => {
      var path = e.composedPath().map((n) => n.nodeName).slice(0, 4).join(" → ");
      this.append(Object.assign(document.createElement("p"), {
        textContent: "клик! e.target=" + e.target.nodeName + " | путь: " + path,
        style: "font:12px monospace;color:#059669;margin:6px 0 0",
      }));
    });
  }
}
if (!customElements.get("info-card")) customElements.define("info-card", InfoCard);
document.body.innerHTML =
  '<info-card><h3 slot="title">Слоты и события</h3><p>Этот абзац из light DOM попал в безымянный слот. Кликните по карточке.</p></info-card>';`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Веб-компоненты: четыре кита

1. **Custom Elements** — \`customElements.define("my-el", class extends HTMLElement {…})\`. Имя обязано содержать дефис. Жизненный цикл: \`connectedCallback\` (вставлен в DOM), \`disconnectedCallback\`, \`attributeChangedCallback\` (+ static \`observedAttributes\`), \`adoptedCallback\`
2. **Shadow DOM** — \`this.attachShadow({ mode: "open" })\` создаёт **инкапсулированное** дерево: стили и разметка не протекают наружу и внутрь. \`mode: "closed"\` закрывает доступ даже к \`el.shadowRoot\`
3. **\`<template>\`** — «замороженный» HTML: не рендерится, скрипты не выполняются; вставка — \`tpl.content.cloneNode(true)\`
4. **Слоты** — проекция light DOM в тень: \`<slot name="x">\` принимает детей с \`slot="x"\`; стиль проекции — \`::slotted()\`

События из тени **ретаргетятся**: снаружи \`e.target\` — сам компонент-хозяин, а настоящий путь виден в \`e.composedPath()\` (событие «пробивает» границу, только если \`composed: true\`). Стили наружу выводят через CSS-переменные и \`::part()\`.`,
      },
      {
        kind: "code",
        title: "Каркас компонента (браузер, запуск не требуется)",
        norun: true,
        code: `class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "role"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML =
      "<style>strong { color: #0f172a }</style>" +
      "<strong></strong> <span></span>";
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const [name, role] = this.shadowRoot.querySelectorAll("strong, span");
    if (name) name.textContent = this.getAttribute("name") ?? "";
    if (role) role.textContent = this.getAttribute("role") ?? "";
  }
}

customElements.define("user-card", UserCard);
// <user-card name="Ада" role="инженер"></user-card>`,
      },
      {
        kind: "warn",
        title: "Тень не наследует всё",
        md: `Внутрь Shadow DOM **наследуются** CSS-переменные и inherit-свойства (шрифты, color), но **не проходят** внешние классы и селекторы — в этом смысл инкапсуляции. Хотите темизировать компонент снаружи — принимайте CSS-переменные: \`background: var(--badge-bg, #eee)\`.`,
      },
      {
        kind: "tip",
        title: "Зачем это в 2026-м",
        md: `Все крупные дизайн-системы (виджеты банков, встроенные чаты, YouTube-плеер) — веб-компоненты: они живут в чужих страницах и не ломаются от чужого CSS. А фреймворки вроде React или Vue под капотом делают ровно то же, что \`requestAnimationFrame\`-цикл: diff → патч DOM → кадр.`,
      },
    ],
    quiz: [
      {
        q: "С чем синхронизируется requestAnimationFrame?",
        options: [
          "С setInterval 16 мс",
          "С частотой обновления экрана, вызываясь перед отрисовкой кадра",
          "С микрозадачами",
          "С сетевыми запросами",
        ],
        answer: 1,
        explain: "rAF вызывается перед каждым кадром дисплея (60/120 Гц) и автоматически паузится в фоновой вкладке — экономия батареи.",
      },
      {
        q: "Что даёт mode: 'open' у Shadow DOM?",
        options: [
          "Компонент виден на странице",
          "Доступ к дереву через element.shadowRoot (у closed — нет)",
          "Открытые стили для всей страницы",
          "Разрешение на события",
        ],
        answer: 1,
        explain: "open/closed управляет только видимостью shadowRoot снаружи. Инкапсуляция стилей есть в обоих режимах.",
      },
      {
        q: "Когда вызывается connectedCallback?",
        options: [
          "В конструкторе",
          "Каждый раз, когда элемент вставляют в документ",
          "При изменении атрибута",
          "Только при первом рендере страницы",
        ],
        answer: 1,
        explain: "Элемент можно вынимать и вставлять повторно — connectedCallback/disconnectedCallback сработают на каждом переезде.",
      },
    ],
    tasks: [
      {
        id: "n6t1",
        title: "Кривая ускорения",
        md: `Реализуйте \`easeInOutCubic(t)\` — классическую тайминг-функцию: при \`t < 0.5\` → \`4t³\`, иначе \`1 - (-2t + 2)³ / 2\`. \`easeInOutCubic(0)\` = 0, \`(1)\` = 1, \`(0.5)\` = 0.5.`,
        starter: `function easeInOutCubic(t) {
  // две ветки
}

console.log(easeInOutCubic(0), easeInOutCubic(0.25), easeInOutCubic(0.5), easeInOutCubic(1));`,
        tests: `
await __test("начало", () => easeInOutCubic(0), 0);
await __test("конец", () => easeInOutCubic(1), 1);
await __test("середина", () => easeInOutCubic(0.5), 0.5);
await __test("первая четверть", () => easeInOutCubic(0.25), 0.0625);
await __test("симметрия: f(0.75) = 1 - f(0.25)", () =>
  Math.round(easeInOutCubic(0.75) * 10000), Math.round((1 - easeInOutCubic(0.25)) * 10000));`,
        solution: `function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}`,
      },
      {
        id: "n6t2",
        title: "Движок tween",
        md: `Реализуйте \`tween(from, to, t, easeFn)\` — промежуточное значение между \`from\` и \`to\` в момент прогресса \`t\` (0–1) с тайминг-функцией: \`from + (to - from) * easeFn(t)\`. \`tween(100, 200, 0.5, x => x)\` → \`150\`.`,
        starter: `function tween(from, to, t, easeFn) {
  // интерполяция
}

console.log(tween(100, 200, 0.5, (x) => x));
console.log(tween(0, 300, 0.25, (x) => x * x));`,
        tests: `
await __test("линейная середина", () => tween(100, 200, 0.5, (x) => x), 150);
await __test("t=0 → from", () => tween(50, 500, 0, (x) => x * x), 50);
await __test("t=1 → to", () => tween(50, 500, 1, (x) => x * x), 500);
await __test("квадратичный easing", () => tween(0, 300, 0.5, (x) => x * x), 75);
await __test("обратное направление", () => tween(200, 100, 0.5, (x) => x), 150);`,
        solution: `function tween(from, to, t, easeFn) {
  return from + (to - from) * easeFn(t);
}`,
      },
      {
        id: "n6t3",
        title: "Имена для Custom Elements",
        md: `Имя пользовательского элемента **обязано** быть kebab-case. Реализуйте \`camelToKebab(str)\`: \`"userName"\` → \`"user-name"\`, \`"MyLongComponent"\` → \`"my-long-component"\` (первую заглавную тоже в нижний регистр).`,
        starter: `function camelToKebab(str) {
  // replace + toLowerCase
}

console.log(camelToKebab("userName"));
console.log(camelToKebab("MyLongComponent"));`,
        tests: `
await __test("обычный camelCase", () => camelToKebab("userName"), "user-name");
await __test("PascalCase", () => camelToKebab("MyLongComponent"), "my-long-component");
await __test("уже в нижнем регистре", () => camelToKebab("badge"), "badge");
await __test("аббревиатуры не важны", () => camelToKebab("jsBadge"), "js-badge");`,
        solution: `function camelToKebab(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}`,
      },
    ],
  },
];
