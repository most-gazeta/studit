import type { Lesson } from "../lib/types";

/** j9 — закрывает: "use strict", alert/prompt/confirm, комментарии, стиль, ниндзя-код,
 *  качество кода, отладка, Mocha/тестирование, полифилы */
export const extraJunior: Lesson[] = [
  {
    id: "j9",
    title: "Строгий режим и культура кода",
    subtitle: '"use strict", взаимодействие с пользователем, стиль, отладка и тесты',
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## "use strict"

До 2009 года (ES3) JavaScript прощал почти всё: молча создавал глобальные переменные, игнорировал ошибки. Директива \`"use strict"\` в начале скрипта или функции включает **строгий режим** — современное поведение:

- присваивание без объявления — \`ReferenceError\` (а не тихая глобальная переменная)
- \`this\` в обычной функции — \`undefined\` (а не глобальный объект)
- запрещены восьмеричные литералы \`0777\`, оператор \`with\`, дубли параметров
- запись в \`writable: false\` свойства и удаление неудаляемого — ошибки

**Модули (\`import\`/\`export\`) и классы всегда работают в строгом режиме** — в новом коде директиву можно не писать, но понимать её нужно: она встречается в старых библиотеках.`,
      },
      {
        kind: "code",
        title: "Строгий режим в действии",
        code: `"use strict";

try {
  undeclaredVar = 5; // без строгого режима создалась бы глобальная переменная!
} catch (e) {
  console.log("Поймали:", e.name, "—", e.message);
}

function plain() {
  return this; // в строгом режиме — undefined, а не globalThis
}
console.log("this в функции:", plain());

// дубли параметров и восьмеричные литералы здесь уже SyntaxError`,
      },
      {
        kind: "text",
        md: `## Взаимодействие с пользователем: alert, prompt, confirm

Три «оконные» функции браузера — исторически первые способы спросить пользователя:

- \`alert(msg)\` — модалка с кнопкой «ОК», **блокирует страницу**, пока не закроют
- \`prompt(question, default)\` — модалка с полем ввода; «ОК» → строка, «Отмена» → \`null\`
- \`confirm(question)\` — «ОК» → \`true\`, «Отмена» → \`false\`

В песочнице их нет (это API браузера), поэтому пример ниже — без запуска.`,
      },
      {
        kind: "code",
        title: "browser-only (не запускается в песочнице)",
        norun: true,
        code: `alert("Сервер будет обновлён через 5 минут");

const name = prompt("Как вас зовут?", "Гость"); // "ОК" → строка, "Отмена" → null
if (name === null) console.log("Пользователь передумал");

const agreed = confirm("Удалить аккаунт безвозвратно?");
console.log(agreed); // true | false`,
      },
      {
        kind: "warn",
        title: "Почему их не видно в современных сайтах",
        md: `Модалки браузера: 1) **останавливают весь JS и отрисовку** страницы; 2) выглядят чужеродно, их нельзя стилизовать; 3) на мобильных работают криво. В продакшене их заменяют собственными диалогами в DOM. Но знать тройку нужно — она до сих пор встречается в учебных примерах и быстрых прототипах.`,
      },
      {
        kind: "text",
        md: `## Комментарии и стиль

- \`// однострочный\` и \`/* блочный */\` — для людей. Комментарии **объясняют «почему»**, а не «что делает код» (это должен говорить сам код).
- JSDoc (\`/** ... */\`) описывает функцию для IDE и генераторов документации.
- Стиль: camelCase для переменных/функций, PascalCase для классов и конструкторов, UPPER_SNAKE для констант-настроек, отступы 2 пробела. За соблюдением следят **ESLint** (логика) и **Prettier** (форматирование) — настройте один раз и забудьте о спорах.`,
      },
      {
        kind: "code",
        title: "Ниндзя-код против читаемого",
        code: `// ❌ ниндзя-код: короткие имена, магия, «умные» выражения
const d = (a, b) => a * b - ((a + b) / 2) * 0.1;

// ✅ имена объясняют намерение, магия вынесена в константу
const LOYALTY_DISCOUNT = 0.1;
function totalWithDiscount(price, count) {
  const subtotal = price * count;
  const discount = ((subtotal + count) / 2) * LOYALTY_DISCOUNT;
  return subtotal - discount;
}

// оба считают одно и то же — но второй можно читать через год
console.log(d(10, 4), totalWithDiscount(10, 4));`,
      },
      {
        kind: "tip",
        title: "Антиприёмы ниндзя-кода",
        md: `- однобуквенные переменные \`l\`, \`O\`, \`data\`, \`result\` там, где можно назвать точно
- «умные» однострочники из пяти тернарников
- числа без объяснения: \`* 86400000\` вместо \`MS_IN_DAY\`
- комментарии, пересказывающие код, и устаревшие комментарии (хуже только отсутствующие)`,
      },
      {
        kind: "text",
        md: `## Отладка в браузере

Главный инструмент — **DevTools** (F12):

- вкладка **Sources**: клик по номеру строки ставит **breakpoint** — выполнение остановится, и можно смотреть переменные, **Scope**, **Call Stack**, выполнять выражения в **Watch**
- оператор \`debugger;\` в коде — тот же breakpoint, но из файла (работает, когда DevTools открыты)
- \`console.log\` — быстро, но грубо; \`console.table(массив)\` и \`console.dir(объект)\` — нагляднее
- вкладка **Network** покажет запросы, **Performance** — что тормозит отрисовку`,
      },
      {
        kind: "text",
        md: `## Тестирование: Mocha и друзья

Ручная проверка \`console.log\` не масштабируется. Автоматические тесты описывают **ожидаемое поведение** и прогоняются одной командой — и при каждом изменении кода:

- **Mocha** — каркас: \`describe\` (группа) + \`it\` (случай)
- **Chai / assert** — проверки-«ассерты»: \`assert.equal(sum(2,3), 5)\`
- **Sinon** — шпионы и заглушки; современные альтернативы: **Vitest**, **Jest**

Идея ровно та же, что у автопроверки заданий этого курса: тест вызывает функцию и сравнивает факт с ожиданием.`,
      },
      {
        kind: "code",
        title: "Так выглядит Mocha-тест (не запускается здесь)",
        norun: true,
        code: `import { assert } from "chai";
import { sum } from "./sum.js";

describe("sum", () => {
  it("складывает положительные числа", () => {
    assert.equal(sum(2, 3), 5);
  });

  it("выбрасывает ошибку для NaN-аргументов", () => {
    assert.throws(() => sum(NaN, 1));
  });
});`,
      },
      {
        kind: "code",
        title: "Мини-ассерт своими руками (запустите)",
        code: `function assertEqual(actual, expected, name) {
  if (actual === expected) {
    console.log("PASS  " + name);
  } else {
    console.error("FAIL  " + name + " — ожидалось " + expected + ", получено " + actual);
  }
}

assertEqual(2 + 2, 4, "арифметика");
assertEqual("a" + "b", "ab", "конкатенация");
assertEqual([1, 2].length, 3, "этот тест честно упадёт");`,
      },
      {
        kind: "tip",
        title: "Полифилы",
        md: `**Полифил** — библиотека, которая реализует новую возможность языка на старых окружениях: проверяет «есть ли фича» и, если нет, вешает свою реализацию (\`if (!Array.prototype.at) { ... }\`). Главный сборник — **core-js** (идёт в паре с Babel). Нужность полифилов проверяют на **caniuse.com**. Этим словом иногда называют и «заплатку» для старого браузера вообще.`,
      },
    ],
    quiz: [
      {
        q: "Что делает \"use strict\" с присваиванием необъявленной переменной?",
        options: [
          "Создаёт глобальную переменную",
          "Бросает ReferenceError",
          "Молча игнорирует",
          "Преобразует в const",
        ],
        answer: 1,
        explain:
          "Без строгого режима x = 5 создала бы свойство глобального объекта; в строгом — это ошибка, спасающая от опечаток.",
      },
      {
        q: "Чем плохи alert/prompt/confirm в реальных продуктах?",
        options: [
          "Они устарели и удалены из стандарта",
          "Блокируют страницу и поток JS, не стилизуются",
          "Работают только в Firefox",
          "Возвращают только числа",
        ],
        answer: 1,
        explain:
          "Модальное окно браузера останавливает выполнение скриптов и отрисовку, а внешний вид нельзя изменить — поэтому используют собственные диалоги.",
      },
      {
        q: "Что такое полифил?",
        options: [
          "Инструмент сборки кода",
          "Реализация новой фичи для старых окружений",
          "Фреймворк тестирования",
          "Тип комментария",
        ],
        answer: 1,
        explain:
          "Полифил проверяет наличие возможности (например, Array.prototype.at) и добавляет свою реализацию, если её нет.",
      },
    ],
    tasks: [
      {
        id: "j9t1",
        title: "Честное деление",
        md: `Качественный код не прячет ошибки. Реализуйте \`divide(a, b)\`: обычный результат \`a / b\`, но при \`b === 0\` — **бросает** \`new Error("Деление на ноль")\` (а не возвращает \`Infinity\` или \`NaN\`).`,
        starter: `function divide(a, b) {
  // проверьте b и бросьте Error
}

console.log(divide(10, 4));
try {
  divide(1, 0);
} catch (e) {
  console.log(e.message);
}`,
        tests: `
await __test("обычное деление", () => divide(10, 4), 2.5);
await __test("ноль в знаменателе → Error", () => {
  try { divide(1, 0); return "не бросил"; }
  catch (e) { return [e instanceof Error, e.message]; }
}, [true, "Деление на ноль"]);
await __test("отрицательные числа работают", () => divide(-9, 3), -3);`,
        solution: `function divide(a, b) {
  if (b === 0) throw new Error("Деление на ноль");
  return a / b;
}`,
      },
      {
        id: "j9t2",
        title: "Микро-фреймворк тестирования",
        md: `Реализуйте \`expect(actual)\` — возвращает объект с методом \`toBe(expected)\`:
- если \`actual === expected\` — метод молча проходит (возвращает \`undefined\`)
- иначе бросает \`Error\` с сообщением ровно вида: \`Ожидалось <expected>, получено <actual>\`

Это упрощённая версия \`expect\` из Jest/Vitest.`,
        starter: `function expect(actual) {
  // верните { toBe(expected) }
}

expect(2 + 2).toBe(4); // проходит молча
try {
  expect(1 + 1).toBe(3);
} catch (e) {
  console.log(e.message); // Ожидалось 3, получено 2
}`,
        tests: `
await __test("равенство проходит молча", () => { expect(2 + 2).toBe(4); return "ok"; }, "ok");
await __test("неравенство бросает с точным сообщением", () => {
  try { expect(1 + 1).toBe(3); return "не бросил"; }
  catch (e) { return e.message; }
}, "Ожидалось 3, получено 2");
await __test("строгое сравнение: 1 и '1' не равны", () => {
  try { expect(1).toBe("1"); return "не бросил"; }
  catch (e) { return e.message; }
}, "Ожидалось 1, получено 1");
await __test("toBe возвращает undefined при успехе", () => expect(5).toBe(5), undefined);`,
        solution: `function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error("Ожидалось " + expected + ", получено " + actual);
      }
    },
  };
}`,
      },
    ],
  },
];

/** m8 — закрывает: методы примитивов, числа, строки, юникод, Date и время, BigInt, Intl (база) */
export const extraMiddle: Lesson[] = [
  {
    id: "m8",
    title: "Числа, строки, Date и BigInt",
    subtitle: "Методы примитивов, округление, Unicode, работа с датами",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Методы у примитивов

Странность JavaScript: у примитивов (\`5\`, \`"str"\`, \`true\`) **есть методы** — \`toFixed\`, \`toUpperCase\`, \`split\`. Как? В момент обращения к свойству движок создаёт временный **объект-обёртку** (\`Number\`, \`String\`, \`Boolean\`), выполняет метод и уничтожает обёртку.

Исключения — \`null\` и \`undefined\`: у них обёрток нет, \`null.toFixed()\` — ошибка.

Создавать обёртки вручную (\`new Number(5)\`) **не нужно**: получается объект, и \`typeof\` скажет \`"object"\`, а проверки \`if\` начнут вести себя странно.`,
      },
      {
        kind: "code",
        title: "Обёртки за работой",
        code: `console.log((3.14159).toFixed(2)); // "3.14" — строка, не число!
console.log("привет".toUpperCase()); // ПРИВЕТ

const n = 255;
console.log(n.toString(2), n.toString(16)); // 11111111 ff

console.log(typeof new Number(5)); // object — антипаттерн
console.log(new Number(5) == 5);   // true  (приведение)
console.log(new Number(5) === 5);  // false (разные типы)`,
      },
      {
        kind: "text",
        md: `## Числа

Внутри JS хранит числа в формате **IEEE-754** (64 бита): отсюда \`0.1 + 0.2 !== 0.3\` — двоичная дробь 0.1 бесконечна, как 1/3 в десятичной.

- Округление: \`Math.round\` (до ближайшего), \`floor\` (вниз), \`ceil\` (вверх), \`trunc\` (отбросить дробь)
- \`toFixed(n)\` — строка с n знаками, **тоже округляет**
- \`parseInt(str, radix)\` — целое из начала строки, с системой счисления
- \`parseFloat\` — дробное
- \`Number.isFinite\`, \`Number.isInteger\`, \`Number.isNaN\` — надёжные проверки
- \`Math.min/max\`, \`Math.pow\`, \`Math.hypot\`, \`Math.random()\` ∈ [0; 1)`,
      },
      {
        kind: "code",
        title: "Округления и разборы",
        code: `console.log(Math.round(6.35 * 10) / 10); // 6.4: 6.35 хранится как 6.34999…
console.log(Math.trunc(-6.7), Math.floor(-6.7)); // -6 и -7 — trunc просто отбрасывает
console.log((6.35).toFixed(1)); // "6.3" — строка и банковское округление

console.log(parseInt("120px"));    // 120 — читает до первого «не числа»
console.log(parseFloat("12.5em")); // 12.5
console.log(parseInt("ff", 16));   // 255 — шестнадцатеричная
console.log(parseInt("0b101"));    // 5 — префиксы 0b/0x/0o parseInt понимает

console.log(Number.isInteger(5.0), Number.isFinite(1 / 0)); // true false
console.log(Math.random() < 1); // всегда true`,
      },
      {
        kind: "text",
        md: `## Строки и Unicode

Строки **неизменяемы**: методы возвращают новую строку. Полезный набор: \`slice\` (подстрока, умеет отрицательные индексы), \`includes/startsWith/endsWith\`, \`indexOf\`, \`padStart/padEnd\`, \`repeat\`, \`trim\`, \`replace/replaceAll\`, \`split/join\`, \`toLowerCase/toUpperCase\`.

Внутри JS строки — последовательность 16-битных кодов **UTF-16**. Символы вне базовой плоскости (эмодзи, редкая математика) занимают **две** ячейки — суррогатную пару: у \`"😂"\` длина 2! \`for..of\` и spread знают об этом и обходят правильно, а \`charAt\`/индексы — нет. \`codePointAt\` читает полный код, \`String.fromCodePoint\` — создаёт.`,
      },
      {
        kind: "code",
        title: "Методы строк и суррогатные пары",
        code: `const s = "  Привет, мир  ";
console.log(s.trim().toUpperCase()); // ПРИВЕТ, МИР

console.log("a,b,c".split(",").reverse().join("|")); // c|b|a
console.log("42".padStart(6, "0"));   // 000042
console.log("ха".repeat(3));          // хахаха
console.log("JavaScript".slice(-6));  // Script — отрицательные индексы

const emoji = "😂";
console.log(emoji.length);        // 2 — UTF-16, суррогатная пара
console.log([...emoji].length);   // 1 — spread видит символ целиком
console.log(emoji.codePointAt(0)); // 128514
console.log("𝒳".length, [..."𝒳"].length); // 2 1`,
      },
      {
        kind: "text",
        md: `## Дата и время

\`Date\` хранит **миллисекунды с 1 января 1970 UTC** (timestamp). Создать можно четырьмя способами:

- \`new Date()\` — сейчас
- \`new Date(ms)\` — из timestamp; \`Date.now()\` — timestamp без объекта (быстрее для замеров)
- \`new Date("2024-01-15")\` — строка **в UTC** (формат ISO)
- \`new Date(2024, 0, 15, 10, 30)\` — компоненты **в местной таймзоне**, месяц **с нуля**!

Геттеры: \`getFullYear\`, \`getMonth()\` (0–11!), \`getDate\` (день месяца), \`getDay()\` (день недели, 0 = вс), \`getHours/Minutes/Seconds\`, у всех есть UTC-варианты. Разность двух дат — миллисекунды.`,
      },
      {
        kind: "code",
        title: "Date на практике",
        code: `const now = new Date();
console.log(now.getFullYear(), now.getMonth() + 1, now.getDate());

// месяц с нуля: 0 = январь
console.log(new Date(2024, 0, 15).getMonth()); // 0

const start = new Date(2020, 0, 1);
const end = new Date(2020, 11, 31);
console.log(Math.round((end - start) / 86400000)); // 365 дней

console.log(new Date(0).toISOString()); // 1970-01-01T00:00:00.000Z
console.log(new Date("2024-01-15").getUTCDate()); // 15 — строка парсится как UTC

const t0 = Date.now(); // замер времени без создания объекта
for (let i = 0; i < 1e5; i++) {}
console.log("цикл занял мс:", Date.now() - t0);`,
      },
      {
        kind: "warn",
        title: "Две классические ловушки дат",
        md: `1. **Месяцы с нуля**: \`new Date(2024, 1, 3)\` — это 3 **февраля**. Почти каждый новичок (и не только) попадается.
2. **Таймзоны**: \`"2024-01-15"\` парсится как полночь UTC, а \`new Date(2024, 0, 15)\` — полночь **местная**. В разных часовых поясах это разные моменты. Храните даты как ISO-строки или timestamp и приводите к поясу только на границе с пользователем (через \`Intl\`).`,
      },
      {
        kind: "text",
        md: `## BigInt

Для целых за пределами \`2^53 - 1\` (\`Number.MAX_SAFE_INTEGER\`) есть отдельный тип — \`BigInt\`: литерал с суффиксом \`n\` или \`BigInt(...)\`.

- арифметика — как у чисел, но **смешивать с Number нельзя** (\`1n + 1\` — TypeError)
- деление \`/\` отбрасывает дробную часть: \`7n / 2n === 3n\`
- сравнения между типами работают: \`10n == 10\` → \`true\`, но \`10n === 10\` → \`false\``,
      },
      {
        kind: "code",
        title: "BigInt",
        code: `const huge = 123456789123456789123456789n;
console.log(huge * 2n); // точная арифметика без потерь
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 — уже неточно!
console.log(huge > Number.MAX_SAFE_INTEGER); // true

// console.log(huge + 1); // TypeError: нельзя смешивать типы
console.log(BigInt(10) + 5n); // 15n
console.log(7n / 2n);         // 3n — дробь отброшена
console.log(10n == 10, 10n === 10); // true false`,
      },
      {
        kind: "tip",
        title: "Рецепты на каждый день",
        md: `- Деньги — в **целых копейках** (или BigInt), никогда в дробных рублях
- Даты в API — **ISO-строки**, вычисление разниц — через timestamp
- Форматирование чисел и дат для пользователя — \`Intl.NumberFormat\` / \`Intl.DateTimeFormat\` (о них — в уроке «Разное» уровня senior)
- Сравнивать дроби — через \`Math.abs(a - b) < Number.EPSILON\` или работу в целых`,
      },
    ],
    quiz: [
      {
        q: "Почему '😂'.length === 2?",
        options: [
          "Эмодзи — это два символа по стандарту",
          "UTF-16 хранит его суррогатной парой из двух 16-битных кодов",
          "length считает байты",
          "Ошибка движка",
        ],
        answer: 1,
        explain:
          "В UTF-16 символы выше U+FFFF занимают две кодовые единицы. for..of, spread и codePointAt работают с символом целиком.",
      },
      {
        q: "Какой месяц вернёт getMonth() для 15 марта?",
        options: ["3", "2", "15", "зависит от таймзоны"],
        answer: 1,
        explain: "Месяцы в Date нумеруются с нуля: март — это 2.",
      },
      {
        q: "Что случится при 10n + 5?",
        options: ["15n", "15", "TypeError — смешивание типов запрещено", "105"],
        answer: 2,
        explain: "BigInt и Number нельзя складывать напрямую. Нужно явно: 10n + BigInt(5).",
      },
      {
        q: "Как движок даёт примитиву методы?",
        options: [
          "Примитивы — скрытые объекты",
          "Создаёт временную обёртку на время вызова",
          "Методы подмешаны в Object.prototype",
          "Это невозможно без явного new",
        ],
        answer: 1,
        explain:
          "На момент доступа к свойству создаётся объект-обёртка (Number/String/Boolean), метод выполняется, обёртка уничтожается. У null/undefined обёрток нет.",
      },
    ],
    tasks: [
      {
        id: "m8t1",
        title: "Русские склонения",
        md: `Реализуйте \`plural(n, one, few, many)\` — строку вида «N слов» с правильным склонением:
- 1, 21, 101 → форма **one** («1 яблоко»)
- 2–4, 22–24 → **few** («3 яблока»)
- 5–20, 25–30, 11–14 → **many** («11 яблок», «25 яблок»)

Правило: исключения 11–14 и 111–114 всегда many; иначе смотрите на последнюю цифру.`,
        starter: `function plural(n, one, few, many) {
  // правила склонения
}

console.log(plural(1, "яблоко", "яблока", "яблок"));
console.log(plural(3, "яблоко", "яблока", "яблок"));
console.log(plural(11, "яблоко", "яблока", "яблок"));
console.log(plural(21, "яблоко", "яблока", "яблок"));`,
        tests: `
await __test("1 → one", () => plural(1, "яблоко", "яблока", "яблок"), "1 яблоко");
await __test("3 → few", () => plural(3, "яблоко", "яблока", "яблок"), "3 яблока");
await __test("5 → many", () => plural(5, "яблоко", "яблока", "яблок"), "5 яблок");
await __test("11 → many (исключение)", () => plural(11, "яблоко", "яблока", "яблок"), "11 яблок");
await __test("14 → many (исключение)", () => plural(14, "яблоко", "яблока", "яблок"), "14 яблок");
await __test("21 → one", () => plural(21, "яблоко", "яблока", "яблок"), "21 яблоко");
await __test("111 → many (исключение)", () => plural(111, "яблоко", "яблока", "яблок"), "111 яблок");
await __test("102 → few", () => plural(102, "письмо", "письма", "писем"), "102 письма");`,
        solution: `function plural(n, one, few, many) {
  const abs = Math.abs(n);
  const d10 = abs % 10;
  const d100 = abs % 100;
  let word;
  if (d10 === 1 && d100 !== 11) word = one;
  else if (d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) word = few;
  else word = many;
  return n + " " + word;
}`,
      },
      {
        id: "m8t2",
        title: "Расстояние между датами",
        md: `Реализуйте \`daysBetween(a, b)\`: на вход две строки \`"YYYY-MM-DD"\`, на выход — количество суток между ними (всегда \`>= 0\`, порядок аргументов не важен). Чтобы не споткнуться о переводы часов, парсите даты **в UTC**.`,
        starter: `function daysBetween(a, b) {
  // Date + 86400000 мс в сутках
}

console.log(daysBetween("2024-01-01", "2024-01-31"));
console.log(daysBetween("2020-01-01", "2021-01-01")); // високосный год`,
        tests: `
await __test("30 дней января", () => daysBetween("2024-01-01", "2024-01-31"), 30);
await __test("одна и та же дата → 0", () => daysBetween("2024-05-05", "2024-05-05"), 0);
await __test("високосный год — 366", () => daysBetween("2020-01-01", "2021-01-01"), 366);
await __test("порядок аргументов не важен", () => daysBetween("2021-01-01", "2020-01-01"), 366);
await __test("через месяц", () => daysBetween("2024-02-28", "2024-03-01"), 2);`,
        solution: `function daysBetween(a, b) {
  const d1 = new Date(a + "T00:00:00Z");
  const d2 = new Date(b + "T00:00:00Z");
  return Math.abs(Math.round((d2 - d1) / 86400000));
}`,
      },
    ],
  },

  {
    id: "m9",
    title: "Map, Set и настройка свойств",
    subtitle: "Коллекции с любыми ключами, Symbol, ToPrimitive, дескрипторы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Map

\`Map\` — коллекция «ключ → значение», где ключом может быть **что угодно**: объект, функция, NaN. В отличие от объекта:

- порядок итерации — строго **порядок вставки** (у объектов целочисленные ключи идут первыми)
- есть \`size\`, \`has\`, \`set\` возвращает сам Map — удобно цепочкой
- перебирается \`for..of\` напрямую

Методы: \`set/get/has/delete/clear\`, итераторы \`keys()\`, \`values()\`, \`entries()\`, создание из пар: \`new Map([[k, v], ...])\`.`,
      },
      {
        kind: "code",
        title: "Map против объекта",
        code: `const prices = new Map();
prices.set("яблоко", 120).set("груша", 180); // цепочка — set вернул Map

const user = { id: 1 };
const visits = new Map();
visits.set(user, 3); // объект — ключ!
console.log(visits.get(user)); // 3
console.log(visits.get({ id: 1 })); // undefined — другой объект не тот же ключ

console.log(prices.size, prices.has("слива")); // 2 false
for (const [product, price] of prices) {
  console.log(product, "—", price);
}
console.log([...prices.keys()]); // ["яблоко", "груша"]`,
      },
      {
        kind: "text",
        md: `## Set

\`Set\` — множество **уникальных** значений: \`add/has/delete/size\`, дубликаты игнорируются. Классика — удаление повторов: \`[...new Set(arr)]\`.

Сравнение — по алгоритму **SameValueZero**: почти как \`===\`, но \`NaN\` считается равным самому себе (в обычном \`===\` — нет).`,
      },
      {
        kind: "code",
        title: "Set и уникальность",
        code: `const nums = [1, 2, 2, 3, 3, 3, NaN, NaN];
console.log([...new Set(nums)]); // [1, 2, 3, NaN] — NaN один!

const tags = new Set();
tags.add("js").add("ts").add("js");
console.log(tags.size); // 2

console.log(NaN === NaN);          // false — обычное равенство
console.log(new Set([NaN]).has(NaN)); // true — SameValueZero`,
      },
      {
        kind: "text",
        md: `## WeakMap и WeakSet

У «слабых» версий ключи — **только объекты**, и ссылки на них **слабые**: если на объект не ссылается никто, кроме WeakMap, сборщик мусора удаляет и объект, и запись. Ни \`size\`, ни итерации — «живая» статистика, а не хранилище.

Применения: кэш результатов по объекту, «служебные данные» для чужих объектов (без загрязнения), отслеживание посещений. \`WeakRef\` и \`FinalizationRegistry\` — развитие идеи, разберём в уроке «Разное».`,
      },
      {
        kind: "code",
        title: "WeakMap-кэш",
        code: `const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = Object.keys(obj).length * 100;
  cache.set(obj, result);
  return result;
}

let request = { id: 1, user: "ada" };
console.log(expensiveCalc(request)); // 200 — посчитали
console.log(expensiveCalc(request)); // 200 — из кэша
request = null; // объект и запись в WeakMap станут мусором вместе`,
      },
      {
        kind: "text",
        md: `## Symbol

\`Symbol(...)\` создаёт **уникальный** идентификатор, даже при одинаковом описании. Символы:

- не видны в \`for..in\`, \`Object.keys\`, \`JSON.stringify\` — «скрытые» свойства
- но видны в \`Object.getOwnPropertySymbols\` и копируются при spread
- глобальный реестр: \`Symbol.for("key")\` возвращает один символ на всё окружение, \`Symbol.keyFor(sym)\` — имя
- «системные» символы: \`Symbol.iterator\`, \`Symbol.toPrimitive\`, \`Symbol.hasInstance\`, \`Symbol.species\` — точки расширения языка`,
      },
      {
        kind: "code",
        title: "Символы",
        code: `const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — уникальность гарантирована
console.log(id1.description); // id

const globalA = Symbol.for("app.token");
console.log(globalA === Symbol.for("app.token")); // true — реестр

const user = { name: "Ада" };
user[id1] = 42;
console.log(user[id1]); // 42
console.log(Object.keys(user)); // ["name"] — символ не перечисляется
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
console.log({ ...user }[id1]); // 42 — spread символы копирует`,
      },
      {
        kind: "text",
        md: `## Преобразование объектов в примитивы

Все операторы (кроме \`===\`) работают с примитивами, поэтому объект в \`obj * 2\` или \`String(obj)\` **приводится**. Алгоритм:

1. Если есть \`obj[Symbol.toPrimitive](hint)\` — вызывается с подсказкой: \`"string"\` (вывод, шаблонные строки), \`"number"\` (математика) или \`"default"\` (\`+\`, \`==\`)
2. Иначе для \`"string"\`: \`toString()\`, затем \`valueOf()\`; для остальных — наоборот
3. Результат обязан быть примитивом`,
      },
      {
        kind: "code",
        title: "Symbol.toPrimitive",
        code: `const money = {
  value: 1500,
  [Symbol.toPrimitive](hint) {
    console.log("hint:", hint);
    return hint === "string" ? this.value + " руб." : this.value;
  },
};

console.log(String(money)); // hint: string → "1500 руб."
console.log(money * 2);     // hint: number → 3000
console.log(money + "?");   // hint: default → "1500 руб.?"

const legacy = {
  toString: () => "семь",
  valueOf: () => 7,
};
console.log(String(legacy), legacy * 3); // семь 21 — без toPrimitive`,
      },
      {
        kind: "text",
        md: `## Флаги и дескрипторы свойств

Каждое свойство объекта, кроме значения, имеет три **флага**:

- \`writable\` — можно ли перезаписывать
- \`enumerable\` — видно ли в \`for..in\`, \`Object.keys\`, \`JSON.stringify\`
- \`configurable\` — можно ли удалять и менять флаги

Читаются через \`Object.getOwnPropertyDescriptor\`, ставятся через \`Object.defineProperty\`. Массовые режимы: \`Object.preventExtensions\` (нельзя добавлять), \`Object.seal\` (+ нельзя удалять), \`Object.freeze\` (+ нельзя менять — полная заморозка).`,
      },
      {
        kind: "code",
        title: "defineProperty и freeze",
        code: `const config = { version: 2 };

Object.defineProperty(config, "SECRET", {
  value: "s3cr3t",
  writable: false,    // не перезаписать
  enumerable: false,  // не видно в keys и JSON
  configurable: false,
});

config.SECRET = "взлом"; // молча игнорируется (вне строгого режима)
console.log(config.SECRET); // s3cr3t
console.log(Object.keys(config)); // ["version"]
console.log(JSON.stringify(config)); // {"version":2}

console.log(Object.getOwnPropertyDescriptor(config, "SECRET"));

const point = Object.freeze({ x: 1, y: 2 });
point.x = 99;
console.log(point.x); // 1 — заморожено
console.log(Object.isFrozen(point)); // true`,
      },
      {
        kind: "warn",
        title: "Геттеры/сеттеры — это тоже дескрипторы",
        md: `Свойства \`get x() {}\` и \`set x(v) {}\` (уроки про классы) создают не «data-дескриптор» со \`value\`, а **accessor-дескриптор** с \`get\`/\`set\`. У свойства не может быть одновременно \`value\` и \`get\`. \`Object.freeze\` глушит и сеттеры — запись в \`point.x\` выше именно поэтому бессильна.`,
      },
      {
        kind: "tip",
        title: "Map или объект?",
        md: `Ключи — только строки, данные приходят как JSON, структура известна заранее → **объект**. Ключи — любые значения, важен порядок, нужны size/has/итерация, коллекция живёт и меняется → **Map**. Для уникальности — **Set**, для кэша по живым объектам — **WeakMap**.`,
      },
    ],
    quiz: [
      {
        q: "Чем ключи Map отличаются от ключей объекта?",
        options: [
          "Только регистром",
          "В Map ключом может быть любой тип, включая объекты и NaN",
          "В Map ключи только числа",
          "Отличий нет",
        ],
        answer: 1,
        explain:
          "Объект приводит ключи к строкам (кроме символов), Map хранит ключ как есть — объекты сравниваются по ссылке.",
      },
      {
        q: "Чему равно Symbol('id') === Symbol('id')?",
        options: ["true", "false", "TypeError", "зависит от реестра"],
        answer: 1,
        explain: "Каждый вызов Symbol() создаёт новый уникальный символ; одинаковые символы даёт только Symbol.for() через глобальный реестр.",
      },
      {
        q: "Какой флаг делает свойство невидимым для Object.keys?",
        options: ["writable: false", "configurable: false", "enumerable: false", "visible: false"],
        answer: 2,
        explain: "enumerable управляет перечислимостью: for..in, Object.keys/values/entries и JSON.stringify пропускают такие свойства.",
      },
      {
        q: "Когда у вызова Symbol.toPrimitive подсказка \"number\"?",
        options: ["При выводе в консоль", "В математических операциях", "При сложении со строкой", "Никогда"],
        answer: 1,
        explain: "Математика (*, -, <, бинарные операции) просит number; вывод — string; + и == — default.",
      },
    ],
    tasks: [
      {
        id: "m9t1",
        title: "Уникальные значения",
        md: `Реализуйте \`countUnique(arr)\` — количество **различных** значений в массиве, используя \`Set\`. Обратите внимание: \`NaN\` считается одним значением, сколько бы раз ни встречался.`,
        starter: `function countUnique(arr) {
  // Set
}

console.log(countUnique([1, 1, 2, 3, 3]));
console.log(countUnique([NaN, NaN, "NaN"]));`,
        tests: `
await __test("числа с повторами", () => countUnique([1, 1, 2, 3, 3]), 3);
await __test("пустой массив", () => countUnique([]), 0);
await __test("NaN — одно значение", () => countUnique([NaN, NaN]), 1);
await __test("типы не смешиваются", () => countUnique(["1", 1, true]), 3);
await __test("объекты по ссылке", () => {
  const o = { a: 1 };
  return countUnique([o, o, { a: 1 }]);
}, 2);`,
        solution: `function countUnique(arr) {
  return new Set(arr).size;
}`,
      },
      {
        id: "m9t2",
        title: "Частотный словарь",
        md: `Реализуйте \`groupCount(strings)\` — возвращает \`Map\`, где ключ — строка, значение — сколько раз она встретилась. Порядок ключов — порядок **первого появления**.`,
        starter: `function groupCount(strings) {
  // Map + цикл
}

console.log([...groupCount(["a", "b", "a"]).entries()]);`,
        tests: `
await __test("считает вхождения", () => [...groupCount(["a", "b", "a"]).entries()], [["a", 2], ["b", 1]]);
await __test("возвращает именно Map", () => groupCount([]) instanceof Map, true);
await __test("пустой вход — пустая Map", () => groupCount([]).size, 0);
await __test("порядок первого появления", () => [...groupCount(["x", "y", "x", "z", "y"]).keys()], ["x", "y", "z"]);`,
        solution: `function groupCount(strings) {
  const map = new Map();
  for (const s of strings) {
    map.set(s, (map.get(s) ?? 0) + 1);
  }
  return map;
}`,
      },
    ],
  },
];

/** s7 — закрывает: конструкторы и new, F.prototype, встроенные прототипы,
 *  методы прототипов и __proto__, Object.create(null), instanceof,
 *  расширение встроенных классов, Symbol.species/hasInstance, примеси */
export const extraSenior: Lesson[] = [
  {
    id: "s7",
    title: "Прототипы глубже",
    subtitle: "F.prototype, встроенные прототипы, instanceof, примеси",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Конструкторы и new — до появления class

Исторически классы писали функциями-конструкторами. У каждой функции есть свойство \`prototype\` (объект с полем \`constructor\`). При \`new F()\` движок:

1. создаёт пустой объект
2. вешает ему \`[[Prototype]] = F.prototype\`
3. выполняет F с \`this\` = этот объект
4. возвращает объект (если F не вернула свой объект)

Классы — это синтаксис ровно над этим механизмом: \`class User {}\` создаёт функцию \`User\`, её методы кладутся в \`User.prototype\`.`,
      },
      {
        kind: "code",
        title: "Функция-конструктор",
        code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " издаёт звук";
};

const rex = new Animal("Рекс");
console.log(rex.speak()); // найдено в прототипе
console.log(Object.getPrototypeOf(rex) === Animal.prototype); // true
console.log(Animal.prototype.constructor === Animal); // true

// воссоздание экземпляра «по образцу»
const clone = new rex.constructor("Бобик");
console.log(clone.name, clone.speak());`,
      },
      {
        kind: "text",
        md: `## Встроенные прототипы

«Всё есть объект» — на самом деле цепочка прототипов:

- верхушка — \`Object.prototype\` (\`toString\`, \`hasOwnProperty\`, \`valueOf\`)
- \`Array.prototype\`, \`Function.prototype\`, \`Number.prototype\`, \`String.prototype\`… наследуют от него
- конец цепочки — \`null\`

Именно поэтому \`[1,2].toString()\` «находится»: его нет у массива → идём в \`Array.prototype\` → нашли. И именно поэтому у \`(5).toFixed\` и \`"abc".slice\` есть жизнь: у примитивов методы лежат в прототипах обёрток.`,
      },
      {
        kind: "code",
        title: "Цепочка до null",
        code: `const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype);            // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));                   // null

console.log(arr.toString === Array.prototype.toString);   // true
console.log(arr.hasOwnProperty === Object.prototype.hasOwnProperty); // true
console.log((5).toFixed === Number.prototype.toFixed);    // true`,
      },
      {
        kind: "text",
        md: `## Методы прототипов и «голые» объекты

- \`Object.getPrototypeOf(obj)\` / \`Object.setPrototypeOf(obj, proto)\` — современный доступ к \`[[Prototype]]\`
- \`__proto__\` — устаревший геттер/сеттер (живёт в \`Object.prototype\`); в спецификации оставлен для веба, в новом коде не используется
- \`Object.create(proto, [descriptors])\` — создание с заданным прототипом
- \`Object.create(null)\` — объект **без прототипа**: идеальный «чистый словарь», у которого даже \`toString\` нет, а \`__proto__\` — обычное свойство`,
      },
      {
        kind: "code",
        title: "Голый словарь",
        code: `const dict = Object.create(null);
dict.key = "значение";
dict["__proto__"] = 5; // здесь это просто строка-ключ, без магии

console.log(dict.toString);    // undefined — наследовать не от кого
console.log(dict.key, dict["__proto__"]); // значение 5
console.log(Object.keys(dict)); // ["key", "__proto__"]

const usual = {};
console.log("toString" in usual); // true — из Object.prototype`,
      },
      {
        kind: "text",
        md: `## instanceof

Оператор \`obj instanceof Class\` идёт по цепочке прототипов и проверяет: встречается ли где-то \`Class.prototype\`. Поэтому \`new HttpError() instanceof Error\` — \`true\`. Поведение настраивается статическим \`Symbol.hasInstance\` — так можно сделать проверку по структуре, а не по происхождению.`,
      },
      {
        kind: "code",
        title: "instanceof и Symbol.hasInstance",
        code: `class HttpError extends Error {
  constructor(status) {
    super("HTTP " + status);
    this.status = status;
  }
}

const err = new HttpError(404);
console.log(err instanceof HttpError); // true
console.log(err instanceof Error);     // true — цепочка
console.log(err instanceof Object);    // true

class Duck {
  static [Symbol.hasInstance](obj) {
    return Boolean(obj && obj.quack); // «если крякает — утка»
  }
}
console.log({ quack() {} } instanceof Duck); // true — утиная типизация!`,
      },
      {
        kind: "text",
        md: `## Расширение встроенных классов и Symbol.species

\`class PowerArray extends Array\` наследует всё. Тонкость: встроенные методы (\`map\`, \`filter\`) создают результат через \`Symbol.species\` — по умолчанию **подкласс**. Переопределив статический геттер, можно вернуть базовый класс:`,
      },
      {
        kind: "code",
        title: "Наследник Array",
        code: `class PowerArray extends Array {
  get isEmpty() {
    return this.length === 0;
  }
  static get [Symbol.species]() {
    return Array; // map/filter будут возвращать обычный Array
  }
}

const pa = new PowerArray(1, 2, 3);
console.log(pa.isEmpty);        // false — свой геттер
const doubled = pa.map((x) => x * 2);
console.log(doubled instanceof PowerArray); // false
console.log(doubled.constructor === Array); // true — species сработал`,
      },
      {
        kind: "text",
        md: `## Примеси (mixins)

В JS у класса один родитель, но часто хочется «прикрутить» готовое поведение: логирование, события, сериализацию. **Примесь** — объект с методами, который сливается с прототипом через \`Object.assign\`. Это композиция в действии: поведение добавляется, наследование не трогается.`,
      },
      {
        kind: "code",
        title: "Mixin: события для любого класса",
        code: `const eventMixin = {
  on(event, handler) {
    if (!this._handlers) this._handlers = {};
    (this._handlers[event] ??= []).push(handler);
  },
  emit(event, ...args) {
    (this._handlers?.[event] ?? []).forEach((h) => h(...args));
  },
};

class Order {
  constructor(id) { this.id = id; }
}
Object.assign(Order.prototype, eventMixin);

const order = new Order(7);
order.on("paid", (sum) => console.log("Заказ", order.id, "оплачен:", sum));
order.emit("paid", 1500); // Заказ 7 оплачен: 1500`,
      },
      {
        kind: "warn",
        title: "Не расширяйте встроенные прототипы",
        md: `Добавить \`Array.prototype.myHelper\` технически можно — и это почти всегда ошибка: изменение глобально, конфликтует с библиотеками и будущим стандартом (вдруг язык добавит метод с тем же именем, но другой семантикой?). Единственное оправдание — **полифил** недостающей стандартной возможности.`,
      },
    ],
    quiz: [
      {
        q: "Что происходит с F.prototype при new F()?",
        options: [
          "Копируется в свойства объекта",
          "Становится [[Prototype]] нового объекта",
          "Вызывается как функция",
          "Замораживается",
        ],
        answer: 1,
        explain: "Новый объект получает ссылку на F.prototype — методы живут в одном месте, экземпляры их только наследуют.",
      },
      {
        q: "Чем заканчивается любая цепочка прототипов?",
        options: ["Object.prototype", "window", "null", "undefined"],
        answer: 2,
        explain: "Object.prototype.__proto__ === null — на null поиск свойства останавливается и возвращается undefined.",
      },
      {
        q: "Зачем нужен Object.create(null)?",
        options: [
          "Создаёт замороженный объект",
          "Объект без прототипа — чистый словарь без унаследованных свойств",
          "Создаёт копию Object",
          "Объект без свойств вообще",
        ],
        answer: 1,
        explain:
          "У такого объекта нет toString, hasOwnProperty и даже __proto__ как геттера — идеально для словарей, ключи в которые приходят извне.",
      },
    ],
    tasks: [
      {
        id: "s7t1",
        title: "Mixin логирования",
        md: `Создайте примесь \`logMixin\` с методом \`log(msg)\`, который возвращает строку \`"[<this.name>] <msg>"\`. Примените её через \`Object.assign\` к прототипу класса \`Worker\` (поле \`name\`). Проверьте: \`new Worker("Робот").log("привет")\` → \`"[Робот] привет"\`. Сам класс объявите сами.`,
        starter: `const logMixin = {
  // log(msg)
};

class Worker {
  constructor(name) { this.name = name; }
}
Object.assign(Worker.prototype, logMixin);

console.log(new Worker("Робот").log("привет"));`,
        tests: `
await __test("метод возвращает форматированную строку", () => new Worker("Робот").log("привет"), "[Робот] привет");
await __test("берёт name из this", () => new Worker("Дрон-2").log("старт"), "[Дрон-2] старт");
await __test("метод живёт в прототипе, а не в экземпляре", () => Worker.prototype.hasOwnProperty("log"), true);
await __test("экземпляр не имеет собственного log", () => Object.hasOwn(new Worker("x"), "log"), false);`,
        solution: `const logMixin = {
  log(msg) {
    return "[" + this.name + "] " + msg;
  },
};

class Worker {
  constructor(name) { this.name = name; }
}
Object.assign(Worker.prototype, logMixin);`,
      },
      {
        id: "s7t2",
        title: "inherits: наследование без class",
        md: `Реализуйте \`inherits(Child, Parent)\` — классическую связку прототипов:
1. \`Child.prototype = Object.create(Parent.prototype)\`
2. восстановите \`Child.prototype.constructor = Child\`

После этого экземпляры \`Child\` должны видеть методы \`Parent\` и проходить \`instanceof Parent\`. Для проверки в редакторе уже есть \`Animal\`/\`Dog\` — используйте \`Animal.call(this, ...)\` в конструкторе наследника.`,
        starter: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " говорит";
};

function Dog(name) {
  Animal.call(this, name); // конструктор родителя
}

function inherits(Child, Parent) {
  // Object.create + constructor
}

inherits(Dog, Animal);
const d = new Dog("Рекс");
console.log(d.speak(), d instanceof Animal, d.constructor === Dog);`,
        tests: `
function A(v) { this.v = v; }
A.prototype.get = function () { return this.v; };
function B(v) { A.call(this, v * 2); }

await __test("методы родителя видны", () => {
  inherits(B, A);
  return new B(21).get();
}, 42);
await __test("instanceof родителя — true", () => {
  inherits(B, A);
  return new B(1) instanceof A;
}, true);
await __test("constructor восстановлен", () => {
  inherits(B, A);
  return new B(1).constructor === B;
}, true);
await __test("собственный прототип не тронут", () => {
  inherits(B, A);
  return Object.getPrototypeOf(B.prototype) === A.prototype;
}, true);`,
        solution: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " говорит";
};

function Dog(name) {
  Animal.call(this, name);
}

function inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

inherits(Dog, Animal);`,
      },
    ],
  },

  {
    id: "s8",
    title: "Разное: рекурсия, декораторы и глубины языка",
    subtitle: "Стек, глобальный объект, promisify, async-итераторы, eval, биты, Intl, WeakRef",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Рекурсия и стек вызовов

Каждый вызов функции кладёт в **стек вызовов** кадр (фрейм) с аргументами и локальными переменными. Рекурсия — это когда кадры складываются стопкой, пока не дойдут до базового случая. Стек ограничен (~10⁴ кадров): бесконечная рекурсия закончится \`RangeError: Maximum call stack size exceeded\`.

Рекурсия сияет на **рекурсивных структурах** — деревьях, вложенных массивах, DOM. Для плоских циклов честнее итерация: она не ест стек.`,
      },
      {
        kind: "code",
        title: "Рекурсия и предел стека",
        code: `function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
console.log(factorial(10)); // 3628800

function dive(n) {
  return dive(n + 1); // базового случая нет
}
try {
  dive(0);
} catch (e) {
  console.log(e.name + ":", e.message);
}`,
      },
      {
        kind: "text",
        md: `## Глобальный объект

Хранит глобальные переменные и встроенные API: \`window\` в браузере, \`global\` в Node, а с ES2020 — единое имя **\`globalThis\`**.

- \`var\` и \`function\` на верхнем уровне скрипта становятся **свойствами** глобального объекта; \`let\`/\`const\` — нет (это одна из причин их предпочитать)
- обращение к несуществующему свойству даст \`undefined\`, но чтение необъявленной переменной — \`ReferenceError\`
- глобальные переменные — зло: используют точечно (\`globalThis.APP_VERSION = ...\`), чтобы не засорять пространство имён`,
      },
      {
        kind: "code",
        title: "globalThis",
        code: `globalThis.APP_VERSION = "2.1.0";
console.log(APP_VERSION); // можно читать без префикса

console.log("setTimeout" in globalThis); // true — API среды живут здесь
console.log("Object" in globalThis);     // true — и встроенные классы

// var на верхнем уровне скрипта стал бы свойством globalThis;
// let/const остаются в лексическом окружении скрипта — так безопаснее`,
      },
      {
        kind: "text",
        md: `## Объект функции, NFE, new Function

Функция — объект: у неё есть \`name\` (имя), \`length\` (число параметров до rest) и можно вешать свои свойства — например, счётчик вызовов вместо замыкания.

**NFE** (Named Function Expression) — функция-выражение с именем: имя видно **только внутри** и позволяет функции надёжно ссылаться на себя даже после переприсваивания переменной.

\`new Function("a", "b", "return a + b")\` создаёт функцию **из строки**: её замыкание — только глобальная область. Используется в шаблонизаторах и генераторах кода; в прикладном коде почти не нужен.`,
      },
      {
        kind: "code",
        title: "Функция-объект и NFE",
        code: `function sum(a, b) { return a + b; }
console.log(sum.name, sum.length); // sum 2

let counter = function me(n) {
  me.calls = (me.calls ?? 0) + 1; // NFE: имя видно внутри
  return n <= 0 ? me.calls : me(n - 1);
};
counter(3); counter(2);
console.log("вызовов:", counter.calls); // 2

const adder = new Function("a", "b", "return a + b;");
console.log(adder(20, 22)); // 42 — замыкание только глобальное`,
      },
      {
        kind: "text",
        md: `## Декораторы, переадресация и промисификация

**Декоратор** — обёртка, меняющая поведение функции, не трогая её саму: кэширование, debounce (урок про Event Loop), логирование, ограничение частоты. Ключевой приём — передать \`this\` и **все** аргументы: \`fn.apply(this, args)\` или \`fn.call(this, ...args)\`.

**Промисификация** — превращение функции «в стиле колбэков» \`f(..., callback(err, res))\` в функцию, возвращающую промис. Именно так \`fs.readFile\` стал \`fs.promises.readFile\`.`,
      },
      {
        kind: "code",
        title: "promisify своими руками",
        code: `function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

function legacyLoad(id, callback) {
  setTimeout(() => {
    if (id > 0) callback(null, { id, status: "loaded" });
    else callback(new Error("Некорректный id"));
  }, 20);
}

const loadAsync = promisify(legacyLoad);
console.log(await loadAsync(7));
try {
  await loadAsync(-1);
} catch (e) {
  console.log("Ошибку промисификация донесла:", e.message);
}`,
      },
      {
        kind: "text",
        md: `## Асинхронные итераторы

Обычный \`for..of\` ждёт синхронный протокол. Для потоков данных, где каждая порция приходит асинхронно, есть **асинхронный протокол**: метод \`[Symbol.asyncIterator]()\`, чей \`next()\` возвращает **промис** \`{ value, done }\`. Обход — \`for await (const x of source)\`. Асинхронные генераторы (\`async function*\`) позволяют писать такие источники с \`yield\` и \`await\`.`,
      },
      {
        kind: "code",
        title: "for await..of",
        code: `const pagedApi = {
  [Symbol.asyncIterator]() {
    let page = 0;
    return {
      async next() {
        page++;
        await sleep(15); // «запрос к серверу»
        return page <= 3
          ? { value: "страница " + page, done: false }
          : { done: true };
      },
    };
  },
};

for await (const page of pagedApi) {
  console.log("получили:", page);
}`,
      },
      {
        kind: "text",
        md: `## Eval и ссылочный тип

\`eval(code)\` выполняет строку как код **в текущей области видимости**. Опасен (выполнит что угодно, включая пришедшее от пользователя — XSS) и мешает оптимизациям движка. Современные замены: \`JSON.parse\` для данных, \`new Function\` для шаблонного кода, динамический \`import()\` для модулей.

**Ссылочный тип** — тонкость спецификации: запись \`obj.method\` — это не просто значение, а «ссылка» (база + имя). Вызов \`obj.method()\` берёт \`this\` из базы. Скобки \`(obj.method)()\` ссылку сохраняют, а вот запятая \`(0, obj.method)()\` — **отбрасывает**, и \`this\` теряется. Приём исторически использовался для обрезки контекста.`,
      },
      {
        kind: "code",
        title: "Потеря ссылки через запятую",
        code: `console.log(eval("2 + 2 * 2")); // 8 — но так в продакшене не делают

const obj = {
  name: "Ада",
  who() { return this && this.name; },
};

console.log(obj.who());    // Ада — вызов по ссылке
console.log((obj.who)());  // Ада — скобки ссылку сохранили
const detached = obj.who;  // присваивание превратило в обычное значение
console.log(detached());   // undefined — this больше не obj
console.log((0, obj.who)()); // undefined — запятая отбросила базу`,
      },
      {
        kind: "text",
        md: `## Побитовые операторы

Работают с числами как с **32-битными целыми**: \`&\` И, \`|\` ИЛИ, \`^\` исключающее ИЛИ, \`~\` НЕ, \`<<\`/\`>>\` сдвиги, \`>>>\` беззнаковый сдвиг. В прикладном коде встречаются редко, но идиомы знать нужно:

- \`x | 0\` — быстрое отбрасывание дроби
- \`x >>> 0\` — привести к беззнаковому 32-битному
- флаги разрешений: \`READ | WRITE\`, проверка \`perms & ADMIN\``,
      },
      {
        kind: "code",
        title: "Биты и флаги",
        code: `console.log(5 & 3);  // 1  (101 & 011 = 001)
console.log(5 | 3);  // 7
console.log(5 ^ 3);  // 6
console.log(~5);     // -6
console.log(7.9 | 0, -7.9 | 0); // 7 -7 — быстрый trunc

const READ = 1, WRITE = 2, ADMIN = 4;
let perms = READ | WRITE;            // 3
console.log(Boolean(perms & ADMIN)); // false — нет права админа
perms |= ADMIN;
console.log(Boolean(perms & ADMIN)); // true`,
      },
      {
        kind: "text",
        md: `## Intl: интернационализация

Встроенный модуль локализации — без библиотек:

- \`Intl.NumberFormat\` — числа, валюты, проценты
- \`Intl.DateTimeFormat\` — даты под локаль
- \`Intl.Collator\` — корректная сортировка строк (знает про «ё» и регистр)
- \`Intl.PluralRules\` — правила склонений (автоматизирует задачу про «яблоко/яблока/яблок»)`,
      },
      {
        kind: "code",
        title: "Intl в деле",
        code: `const money = new Intl.NumberFormat("ru-RU", {
  style: "currency", currency: "RUB", maximumFractionDigits: 0,
});
console.log(money.format(1234567)); // 1 234 567 ₽

const date = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" });
console.log(date.format(new Date(2026, 0, 1)));

const collator = new Intl.Collator("ru");
console.log(["яблоко", "Арбуз", "ёж"].sort(collator.compare));

const pr = new Intl.PluralRules("ru-RU");
console.log([pr.select(1), pr.select(3), pr.select(5)]); // one few many`,
      },
      {
        kind: "text",
        md: `## WeakRef и FinalizationRegistry

\`WeakRef(obj)\` — **слабая ссылка**: \`ref.deref()\` вернёт объект, пока тот жив, и \`undefined\` после сборки мусора. \`FinalizationRegistry(callback)\` вызывает колбэк, когда зарегистрированный объект собран, передавая «удержанное» значение.

Гарантировать **момент** сборки нельзя — это инструменты для оптимистичных кэшей и освобождения внешних ресурсов (файлов, WebGL-текстур), но не для логики приложения.`,
      },
      {
        kind: "code",
        title: "Слабые ссылки",
        code: `const registry = new FinalizationRegistry((marker) => {
  console.log("Объект собран. Маркер:", marker);
});

let heavy = { payload: "данные" };
const ref = new WeakRef(heavy);
registry.register(heavy, "кэш-запись");

console.log(ref.deref() === heavy); // true — пока объект жив
heavy = null;
console.log(ref.deref() ?? "уже собран");
// сборка произойдёт «когда-нибудь» — момент не гарантирован,
// поэтому финализатор здесь может и не успеть сработать`,
      },
      {
        kind: "tip",
        title: "Куда двигаться дальше",
        md: `Языковая часть завершена. Дальше — **спецификация ECMA-262** (читать как справочник), внутренности V8 и профилирование, TypeScript, тестирование (Vitest/Playwright), Node.js-инженерия. И главное: пет-проекты — знание закрепляется только кодом, который кому-то нужен.`,
      },
    ],
    quiz: [
      {
        q: "Чем закончится рекурсия без базового случая?",
        options: [
          "Бесконечным циклом без ошибки",
          "RangeError — переполнение стека вызовов",
          "NaN",
          "Зависанием сборщика мусора",
        ],
        answer: 1,
        explain: "Каждый вызов добавляет кадр в стек; когда лимит исчерпан, движок бросает RangeError: Maximum call stack size exceeded.",
      },
      {
        q: "Что делает промисификация?",
        options: [
          "Ускоряет промисы",
          "Превращает функцию с колбэком (err, result) в функцию, возвращающую промис",
          "Отменяет промис",
          "Повторяет промис при ошибке",
        ],
        answer: 1,
        explain: "Классический мост от колбэк-API к async/await: обёртка возвращает new Promise и вызывает колбэк внутри.",
      },
      {
        q: "Чем опасен eval?",
        options: [
          "Медленнее обычного кода на 20%",
          "Выполняет произвольный код в текущей области — дыра безопасности и барьер для оптимизаций",
          "Не работает в строгом режиме",
          "Возвращает только строки",
        ],
        answer: 1,
        explain:
          "Если в eval попала строка от пользователя — это выполнение любого кода (XSS). Плюс движок не может оптимизировать область видимости с eval.",
      },
      {
        q: "Что делает x | 0?",
        options: [
          "Обнуляет x",
          "Отбрасывает дробную часть, приводя к 32-битному целому",
          "Проверяет чётность",
          "Округляет до ближайшего",
        ],
        answer: 1,
        explain: "Побитовое И с нулём приводит число к int32: 7.9 | 0 → 7, -7.9 | 0 → -7. Работает только для чисел в диапазоне int32.",
      },
    ],
    tasks: [
      {
        id: "s8t1",
        title: "Своя промисификация",
        md: `Реализуйте \`promisify(fn)\`: возвращает функцию, которая вызывает \`fn(...args, callback)\`, где \`callback(err, result)\`; при \`err\` промис **отклоняется** с этой ошибкой, иначе **разрешается** результатом. Остальные аргументы и \`this\` должны проходить насквозь.`,
        starter: `function promisify(fn) {
  // new Promise + колбэк
}

function legacyLoad(id, callback) {
  setTimeout(() => callback(null, { id, ok: true }), 10);
}

console.log(await promisify(legacyLoad)(7));`,
        tests: `
await __test("успех разрешается результатом", async () => {
  const legacy = (id, cb) => setTimeout(() => cb(null, id * 2), 5);
  return await promisify(legacy)(21);
}, 42);
await __test("ошибка отклоняет промис", async () => {
  const legacy = (cb) => setTimeout(() => cb(new Error("сбой")), 5);
  try { await promisify(legacy)(); return "не упал"; }
  catch (e) { return e.message; }
}, "сбой");
await __test("несколько аргументов проходят", async () => {
  const legacy = (a, b, cb) => setTimeout(() => cb(null, a + b), 5);
  return await promisify(legacy)(20, 22);
}, 42);
await __test("возвращает именно Promise", () => {
  const legacy = (cb) => cb(null, 1);
  return promisify(legacy)() instanceof Promise;
}, true);`,
        solution: `function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.apply(this, [...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }]);
    });
  };
}`,
      },
      {
        id: "s8t2",
        title: "Рекурсивная сумма дерева",
        md: `Реализуйте \`deepSum(arr)\` — сумму чисел во **вложенных** массивах любой глубины, рекурсией: \`deepSum([1, [2, [3, 4]], 5])\` → \`15\`. Проверка \`Array.isArray(x)\` подскажет, где нырять глубже.`,
        starter: `function deepSum(arr) {
  // рекурсия + Array.isArray
}

console.log(deepSum([1, [2, [3, 4]], 5]));`,
        tests: `
await __test("плоский массив", () => deepSum([1, 2, 3]), 6);
await __test("вложенный", () => deepSum([1, [2, [3, 4]], 5]), 15);
await __test("глубокий", () => deepSum([[[[10]]]]), 10);
await __test("пустой", () => deepSum([]), 0);
await __test("смешанные уровни", () => deepSum([[1], [[2]], [[[3]]], 4]), 10);`,
        solution: `function deepSum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += Array.isArray(item) ? deepSum(item) : item;
  }
  return sum;
}`,
      },
    ],
  },
];
