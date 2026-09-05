import type { Lesson } from "../lib/types";

export const juniorLessons: Lesson[] = [
  {
    id: "j1",
    title: "Первый код и переменные",
    subtitle: "console.log, let и const, имена, динамическая типизация",
    minutes: 20,
    blocks: [
      {
        kind: "text",
        md: `JavaScript — язык, который живёт везде: в браузере, на сервере (Node.js, Deno, Bun), в мобильных приложениях и даже в микроконтроллерах. Он **интерпретируемый** и **динамически типизируемый**: типы проверяются во время выполнения, а не заранее.

Главный инструмент разработчика — консоль. Функция \`console.log()\` выводит значения и работает и в браузере, и в Node.js. Нажмите «Запустить» — код выполнится в изолированной песочнице прямо на этой странице.`,
      },
      {
        kind: "code",
        title: "hello.js — ваша первая программа",
        code: `console.log("Привет, JavaScript!");

const year = 1995;
console.log("Год рождения языка:", year);
console.log("Возраст:", 2026 - year, "лет");`,
      },
      {
        kind: "text",
        md: `## Переменные

Переменная — это именованная «коробка» для данных. Современный JavaScript объявляет переменные двумя способами:

- \`let\` — значение можно **переприсвоить** позже
- \`const\` — значение присваивается **один раз** при объявлении

Устаревшее \`var\` вы встретите в старом коде. Оно отличается областью видимости и «всплытием» — пока просто знайте, что в новом коде его не пишут.

Имена могут содержать буквы, цифры, \`_\` и \`$\`, но не могут начинаться с цифры. Регистр важен: \`user\` и \`User\` — разные переменные. Стиль — camelCase: \`monthlySalary\`, \`userProfileData\`.`,
      },
      {
        kind: "code",
        title: "let против const",
        code: `let score = 0;
score = 10;        // ок: let можно переприсваивать
score += 5;        // сокращение от score = score + 5
console.log(score); // 15

const PI = 3.14159;
// PI = 3;         // TypeError: Assignment to constant variable

const user = { name: "Ада" };
user.name = "Грейс"; // ок: const защищает саму переменную, не содержимое
console.log(user.name);`,
      },
      {
        kind: "tip",
        title: "Правило по умолчанию",
        md: `Всегда начинайте с \`const\`. Переходите на \`let\`, только если значение действительно должно меняться. Такой код легче читать: если видите \`const\` — переменная не переприсваивается, точка.`,
      },
      {
        kind: "text",
        md: `## Динамическая типизация

Тип связан со значением, а не с переменной. Оператор \`typeof\` возвращает строку с типом значения.`,
      },
      {
        kind: "code",
        title: "typeof в действии",
        code: `let value = 42;
console.log(typeof value); // number

value = "теперь строка";
console.log(typeof value); // string

console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof {});        // object
console.log(typeof console.log); // function`,
      },
      {
        kind: "warn",
        title: "Историческая странность",
        md: `\`typeof null\` возвращает \`"object"\` — это официальная ошибка первых версий языка, которую не исправляют ради совместимости. Запомните этот случай: на собеседованиях спрашивают часто.`,
      },
    ],
    quiz: [
      {
        q: "Что запрещает const?",
        options: [
          "Любые изменения значения и содержимого",
          "Переприсваивание самой переменной",
          "Использование переменной в функциях",
          "Объявление без начального значения",
        ],
        answer: 1,
        explain:
          "const запрещает только переприсваивание переменной. Содержимое объекта или массива, хранящегося в const, менять можно.",
      },
      {
        q: "Какое имя переменной корректно?",
        options: ["2fast", "my-value", "_total2", "let"],
        answer: 2,
        explain:
          "Имя не может начинаться с цифры, содержать дефис и совпадать с зарезервированным словом let. _total2 — корректно.",
      },
      {
        q: "Что вернёт typeof null?",
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        answer: 2,
        explain: "Это знаменитая историческая ошибка языка: typeof null === \"object\".",
      },
    ],
    tasks: [
      {
        id: "j1t1",
        title: "Приветствие",
        md: `Реализуйте функцию \`greet(name)\`, которая возвращает строку вида \`Привет, Ада!\` для имени \`"Ада"\`. Используйте шаблонную строку (обратные кавычки).`,
        starter: `function greet(name) {
  // ваш код
}

console.log(greet("Ада"));`,
        tests: `
await __test("greet('Ада') → 'Привет, Ада!'", () => greet("Ада"), "Привет, Ада!");
await __test("greet('Грейс') → 'Привет, Грейс!'", () => greet("Грейс"), "Привет, Грейс!");
await __test("greet('Эдсгер') работает с любыми именами", () => greet("Эдсгер"), "Привет, Эдсгер!");`,
        solution: `function greet(name) {
  return \`Привет, \${name}!\`;
}`,
      },
      {
        id: "j1t2",
        title: "Дни жизни",
        md: `Реализуйте функцию \`ageInDays(age)\` — приближённое количество дней для возраста в годах (год = 365 дней).`,
        starter: `function ageInDays(age) {
  // ваш код
}

console.log(ageInDays(20));`,
        tests: `
await __test("ageInDays(20) → 7300", () => ageInDays(20), 7300);
await __test("ageInDays(1) → 365", () => ageInDays(1), 365);
await __test("ageInDays(0) → 0", () => ageInDays(0), 0);`,
        solution: `function ageInDays(age) {
  return age * 365;
}`,
      },
    ],
  },

  {
    id: "j2",
    title: "Типы данных",
    subtitle: "8 типов, преобразования, truthy и falsy",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `В JavaScript **8 типов данных**: 7 примитивов и объекты.

- \`number\` — целые и дробные числа, а также \`Infinity\`, \`-Infinity\` и \`NaN\`
- \`bigint\` — целые произвольной длины, записываются с суффиксом \`n\`
- \`string\` — строки в одинарных, двойных или обратных кавычках
- \`boolean\` — \`true\` / \`false\`
- \`undefined\` — «значение не присвоено»
- \`null\` — «сознательно пусто»
- \`symbol\` — уникальный идентификатор (понадобится в теме итераторов)
- \`object\` — всё остальное: массивы, функции, даты, коллекции`,
      },
      {
        kind: "code",
        title: "Примитивы вживую",
        code: `const int = 42;
const float = 3.14;
const big = 9007199254740993n;
const text = "строка";
const ok = true;

console.log(typeof big);  // bigint
console.log(0.1 + 0.2);   // 0.30000000000000004 — привет, IEEE 754
console.log((0.1 + 0.2).toFixed(2)); // "0.30" — строка!`,
      },
      {
        kind: "warn",
        title: "NaN заразен и неуловим",
        md: `\`NaN\` (Not a Number) — результат невозможной математической операции, например \`0 / 0\` или \`Number("привет")\`. Любая операция с \`NaN\` даёт \`NaN\`, и даже \`NaN === NaN\` — \`false\`! Проверяйте через \`Number.isNaN(x)\`.`,
      },
      {
        kind: "text",
        md: `## Преобразования типов

Три явных преобразования: \`String(x)\`, \`Number(x)\`, \`Boolean(x)\`. Но JavaScript постоянно приводит типы и сам — это называется **неявным преобразованием**.

Правила \`Boolean(x)\`: «ложных» значений всего шесть — \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\` и \`false\`. Всё остальное — \`true\`, включая пустой массив \`[]\`, пустой объект \`{}\` и строку \`"0"\`. Такие значения называют **falsy** и **truthy**.`,
      },
      {
        kind: "code",
        title: "Таблица истинности на практике",
        code: `console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("0"));      // true — непустая строка!
console.log(Boolean([]));       // true — пустой массив тоже truthy
console.log(Boolean(null));     // false

console.log(Number("42"));      // 42
console.log(Number("42px"));    // NaN
console.log(Number(true));      // 1
console.log(Number(undefined)); // NaN
console.log(Number(null));      // 0 — особая норма языка`,
      },
      {
        kind: "text",
        md: `## Хитрые операторы

Оператор \`+\` при строке среди операндов **конкатенирует**, остальные арифметические операторы **приводят к числу**:`,
      },
      {
        kind: "code",
        title: "Классика собеседований",
        code: `console.log("5" + 3);   // "53"  — конкатенация
console.log("5" - 3);   // 2     — приведение к числу
console.log("5" * "2"); // 10
console.log(true + 1);  // 2     — true → 1
console.log("" + 7);    // "7"   — частый способ в строку`,
      },
      {
        kind: "tip",
        title: "undefined против null",
        md: `\`undefined\` — переменная объявлена, но значения нет (или аргумент не передан, или свойства не существует). \`null\` — разработчик **сам** сказал «значения нет». В API и своём коде придерживайтесь одного соглашения.`,
      },
    ],
    quiz: [
      {
        q: "Какое из значений falsy?",
        options: ['строка "0"', "пустой массив []", "число 0", "пустой объект {}"],
        answer: 2,
        explain: "Falsy только шесть значений: 0, \"\", null, undefined, NaN и false. Строка \"0\", [] и {} — truthy.",
      },
      {
        q: "Что вернёт typeof []?",
        options: ['"array"', '"object"', '"list"', '"undefined"'],
        answer: 1,
        explain:
          "Отдельного типа array нет — массивы это объекты. Для проверки есть Array.isArray().",
      },
      {
        q: "Чему равно '10' - 4?",
        options: ['"104"', "NaN", "6", "ошибка"],
        answer: 2,
        explain: "Оператор - всегда приводит операнды к числу: Number('10') - 4 = 6.",
      },
    ],
    tasks: [
      {
        id: "j2t1",
        title: "Аккуратное число",
        md: `Реализуйте \`toNumber(value)\`: преобразует значение в число, а если результат \`NaN\` — возвращает \`0\`. \`toNumber("42")\` → \`42\`, \`toNumber("abc")\` → \`0\`, \`toNumber(true)\` → \`1\`.`,
        starter: `function toNumber(value) {
  // ваш код
}

console.log(toNumber("42"), toNumber("abc"), toNumber(true));`,
        tests: `
await __test("toNumber('42') → 42", () => toNumber("42"), 42);
await __test("toNumber('abc') → 0", () => toNumber("abc"), 0);
await __test("toNumber(true) → 1", () => toNumber(true), 1);
await __test("toNumber(null) → 0", () => toNumber(null), 0);
await __test("toNumber('  7 ') → 7", () => toNumber("  7 "), 7);`,
        solution: `function toNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}`,
      },
      {
        id: "j2t2",
        title: "Детектор типов",
        md: `Реализуйте \`describe(value)\`: возвращает строку из \`typeof\`, но для \`null\` честно отвечает \`"null"\`.`,
        starter: `function describe(value) {
  // ваш код
}

console.log(describe(null), describe(42), describe("js"));`,
        tests: `
await __test("describe(null) → 'null'", () => describe(null), "null");
await __test("describe(42) → 'number'", () => describe(42), "number");
await __test("describe('js') → 'string'", () => describe("js"), "string");
await __test("describe(undefined) → 'undefined'", () => describe(undefined), "undefined");`,
        solution: `function describe(value) {
  if (value === null) return "null";
  return typeof value;
}`,
      },
    ],
  },

  {
    id: "j3",
    title: "Операторы и выражения",
    subtitle: "Арифметика, сравнения, логика, ?? и ?.",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Арифметика

Стандартный набор: \`+ - * / %\` (остаток), \`**\` (степень), инкремент \`++\` и декремент \`--\`. Остаток \`%\` незаменим для проверки чётности: \`n % 2 === 0\`.

Все операторы сравнения возвращают \`boolean\`. Главное правило: используйте **строгое равенство** \`===\`, которое не приводит типы. Нестрогое \`==\` имеет печально известные сюрпризы: \`"" == 0\` — \`true\`, \`null == undefined\` — \`true\`, а \`[] == ""\` — тоже \`true\`.`,
      },
      {
        kind: "code",
        title: "Сравнения",
        code: `console.log(5 === "5"); // false — типы разные
console.log(5 == "5");  // true  — приведение типов (избегайте)
console.log(10 > 9);    // true
console.log("банан" < "яблоко"); // true — сравнение по кодам символов
console.log(NaN === NaN); // false!
console.log(Number.isNaN(NaN)); // true — правильный способ`,
      },
      {
        kind: "text",
        md: `## Логические операторы

- \`a && b\` — возвращает \`a\`, если оно falsy, иначе \`b\`
- \`a || b\` — возвращает \`a\`, если оно truthy, иначе \`b\`
- \`!a\` — инверсия

Операторы **ленивые**: правая часть вычисляется только при необходимости. Именно поэтому работает защита \`user && user.name\`.

Два современных оператора решают конкретные боли:

- \`a ?? b\` — возвращает \`a\`, если оно **не null и не undefined** (а \`0\`, \`""\`, \`false\` — вернёт!)
- \`obj?.prop\` — «опциональная цепочка»: возвращает \`undefined\`, если слева \`null\`/\`undefined\`, вместо ошибки`,
      },
      {
        kind: "code",
        title: "?? против ||",
        code: `const count = 0;

console.log(count || 10); // 10 — || считает 0 «пустым»
console.log(count ?? 10); // 0  — ?? уважает ноль

const user = { profile: null };
console.log(user.profile?.city);         // undefined, без падения
console.log(user.profile?.city ?? "—");  // "—"

let nickname = null;
nickname ??= "аноним"; // присвоить, только если null/undefined
console.log(nickname); // "аноним"`,
      },
      {
        kind: "tip",
        title: "Когда какой оператор",
        md: `Нужно значение по умолчанию и \`0\`/\`""\` — **допустимые** значения? Берите \`??\`. Любое falsy считается «пустым»? Тогда \`||\`. В 90% реальных случаев с настройками и параметрами нужен именно \`??\`.`,
      },
    ],
    quiz: [
      {
        q: "Чему равно 0 ?? 42?",
        options: ["42", "0", "true", "ошибка"],
        answer: 1,
        explain: "?? срабатывает только на null/undefined. 0 — полноценное значение, поэтому возвращается 0.",
      },
      {
        q: "Что вернёт '' || 'дефолт'?",
        options: ["''", "'дефолт'", "true", "undefined"],
        answer: 1,
        explain: "Пустая строка — falsy, поэтому || возвращает второй операнд.",
      },
      {
        q: "Какое сравнение вернёт true?",
        options: ["null === undefined", "0 === ''", "NaN === NaN", "'10' === '10'"],
        answer: 3,
        explain:
          "Строгое равенство одинаковых строк — true. null === undefined ложно (нестрогое == было бы true), 0 === '' ложно, NaN не равен даже себе.",
      },
    ],
    tasks: [
      {
        id: "j3t1",
        title: "Между",
        md: `Реализуйте \`between(n, min, max)\` — \`true\`, если \`n\` находится в отрезке \`[min, max]\` **включительно**, иначе \`false\`.`,
        starter: `function between(n, min, max) {
  // ваш код
}

console.log(between(5, 1, 10), between(10, 1, 10), between(0, 1, 10));`,
        tests: `
await __test("between(5, 1, 10) → true", () => between(5, 1, 10), true);
await __test("between(1, 1, 10) → true (граница)", () => between(1, 1, 10), true);
await __test("between(10, 1, 10) → true (граница)", () => between(10, 1, 10), true);
await __test("between(11, 1, 10) → false", () => between(11, 1, 10), false);`,
        solution: `function between(n, min, max) {
  return n >= min && n <= max;
}`,
      },
      {
        id: "j3t2",
        title: "Безопасное деление",
        md: `Реализуйте \`safeDiv(a, b)\`: возвращает \`a / b\`, но если \`b === 0\` — возвращает \`null\` (а не \`Infinity\`).`,
        starter: `function safeDiv(a, b) {
  // ваш код
}

console.log(safeDiv(10, 2), safeDiv(10, 0));`,
        tests: `
await __test("safeDiv(10, 2) → 5", () => safeDiv(10, 2), 5);
await __test("safeDiv(9, 2) → 4.5", () => safeDiv(9, 2), 4.5);
await __test("safeDiv(10, 0) → null", () => safeDiv(10, 0), null);`,
        solution: `function safeDiv(a, b) {
  return b === 0 ? null : a / b;
}`,
      },
    ],
  },

  {
    id: "j4",
    title: "Условия и ветвления",
    subtitle: "if/else, тернарник, switch и ранний возврат",
    minutes: 20,
    blocks: [
      {
        kind: "text",
        md: `## if и его друзья

\`if (условие)\` приводит условие к \`boolean\` по правилам truthy/falsy. Если вариантов два и они короткие — используйте **тернарный оператор** \`условие ? a : b\`. Вложенные тернарники — зло: больше одного уровня уже нечитабельно.`,
      },
      {
        kind: "code",
        title: "if / тернарник",
        code: `const hour = 21;

if (hour < 6) {
  console.log("Глубокая ночь");
} else if (hour < 12) {
  console.log("Доброе утро");
} else if (hour < 18) {
  console.log("Добрый день");
} else {
  console.log("Добрый вечер");
}

const status = hour >= 9 && hour < 18 ? "работаем" : "отдыхаем";
console.log(status); // отдыхаем`,
      },
      {
        kind: "text",
        md: `## switch

Удобен, когда одна переменная сравнивается с набором **точных значений**. Сравнение — строгое (\`===\`). Каждый \`case\` без \`break\` «проваливается» в следующий — иногда это баг, иногда осознанный приём для группировки.`,
      },
      {
        kind: "code",
        title: "switch с группировкой",
        code: `function dayType(day) {
  switch (day) {
    case "сб":
    case "вс":
      return "выходной"; // сработает для обоих — группировка
    case "пн":
      return "тяжёлый день";
    default:
      return "будний";
  }
}

console.log(dayType("вс")); // выходной
console.log(dayType("ср")); // будний
console.log(dayType("ПН")); // будний — сравнение строгое, регистр важен`,
      },
      {
        kind: "warn",
        title: "Проваливание case",
        md: `Забытый \`break\`/return — классический баг: после \`case 1\` без break выполнится и \`case 2\`. В современном коде чаще пишут switch с return из каждого case или вовсе используют объект-словарь: \`const labels = { 1: "один" }[value]\`.`,
      },
      {
        kind: "tip",
        title: "Ранний возврат вместо вложенности",
        md: `Вместо \`if (ok) { ...длинный код... }\` проверяйте **ошибочные случаи первыми** и делайте \`return\`. Код становится плоским, как равнина, а не горным серпантином:

- \`if (!user) return;\`
- \`if (user.isBanned) return;\`
- ...и только потом основная логика без отступов`,
      },
    ],
    quiz: [
      {
        q: "Что произойдёт в switch, если в case нет break и return?",
        options: [
          "Ошибка синтаксиса",
          "Выполнится только этот case",
          "Выполнение провалится в следующие case",
          "switch завершится автоматически",
        ],
        answer: 2,
        explain: "Без break/return выполнение продолжается со следующего case — так работает fallthrough.",
      },
      {
        q: "Чему равно 0 ? 'да' : 'нет'?",
        options: ["'да'", "'нет'", "0", "ошибка"],
        answer: 1,
        explain: "0 — falsy, поэтому выбирается ветка после двоеточия.",
      },
    ],
    tasks: [
      {
        id: "j4t1",
        title: "FizzBuzz-одиночка",
        md: `Реализуйте \`fizzWord(n)\`:
- делится на 15 → \`"FizzBuzz"\`
- делится на 3 → \`"Fizz"\`
- делится на 5 → \`"Buzz"\`
- иначе → строка с самим числом (\`String(n)\`)`,
        starter: `function fizzWord(n) {
  // ваш код
}

console.log(fizzWord(15), fizzWord(9), fizzWord(10), fizzWord(7));`,
        tests: `
await __test("fizzWord(15) → 'FizzBuzz'", () => fizzWord(15), "FizzBuzz");
await __test("fizzWord(9) → 'Fizz'", () => fizzWord(9), "Fizz");
await __test("fizzWord(10) → 'Buzz'", () => fizzWord(10), "Buzz");
await __test("fizzWord(7) → '7'", () => fizzWord(7), "7");`,
        solution: `function fizzWord(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}`,
      },
      {
        id: "j4t2",
        title: "Времена года",
        md: `Реализуйте \`season(month)\` (месяц 1–12): 12, 1, 2 → \`"зима"\`; 3–5 → \`"весна"\`; 6–8 → \`"лето"\`; 9–11 → \`"осень"\`. Для любого другого значения верните \`null\`.`,
        starter: `function season(month) {
  // ваш код
}

console.log(season(1), season(7), season(13));`,
        tests: `
await __test("season(1) → 'зима'", () => season(1), "зима");
await __test("season(12) → 'зима'", () => season(12), "зима");
await __test("season(4) → 'весна'", () => season(4), "весна");
await __test("season(7) → 'лето'", () => season(7), "лето");
await __test("season(10) → 'осень'", () => season(10), "осень");
await __test("season(13) → null", () => season(13), null);`,
        solution: `function season(month) {
  if (month === 12 || month <= 2) return "зима";
  if (month >= 3 && month <= 5) return "весна";
  if (month >= 6 && month <= 8) return "лето";
  if (month >= 9 && month <= 11) return "осень";
  return null;
}`,
      },
    ],
  },

  {
    id: "j5",
    title: "Циклы",
    subtitle: "for, while, for..of, break и continue",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `Цикл повторяет блок кода, пока условие истинно.

- \`for (инициализация; условие; шаг)\` — когда известно количество итераций
- \`while (условие)\` — когда количество неизвестно
- \`do..while\` — как while, но **минимум одна** итерация
- \`for..of\` — элегантный обход массивов, строк, Map, Set и любых итерабельных объектов`,
      },
      {
        kind: "code",
        title: "Все четыре вида",
        code: `for (let i = 1; i <= 3; i++) {
  console.log("for:", i);
}

let n = 8;
while (n > 1) {
  n = n / 2; // 8 → 4 → 2 → 1
}
console.log("делений:", 3);

for (const ch of "JS") {
  console.log("символ:", ch);
}`,
      },
      {
        kind: "text",
        md: `## break и continue

\`break\` **немедленно выходит** из цикла, \`continue\` пропускает остаток итерации и переходит к следующей. Классика — поиск первого подходящего элемента:`,
      },
      {
        kind: "code",
        title: "Досрочный выход",
        code: `const numbers = [4, 8, 15, 16, 23, 42];
let found = null;

for (const x of numbers) {
  if (x % 2 !== 0) continue; // пропускаем нечётные
  if (x > 20) {
    found = x;
    break; // нашли — дальше не идём
  }
}
console.log(found); // 42

// Тот же смысл без цикла — методами массивов:
console.log(numbers.find((x) => x % 2 === 0 && x > 20)); // 42`,
      },
      {
        kind: "warn",
        title: "Бесконечные циклы",
        md: `\`while (true)\` без break или забытый \`i++\` в \`for\` — и вкладка браузера зависла. В нашей песочнице такой код будет остановлен через 3 секунды с сообщением о таймауте — можете смело экспериментировать.`,
      },
      {
        kind: "tip",
        title: "Частая ошибка: забор",
        md: `\`i < 5\` даёт итерации 0–4 (пять штук), \`i <= 5\` — 0–5 (шесть). Ошибка на единицу, «off-by-one», — самый частый баг новичка. Проверяйте границы на маленьком примере в уме.`,
      },
    ],
    quiz: [
      {
        q: "Сколько итераций сделает for (let i = 0; i < 5; i++)?",
        options: ["4", "5", "6", "бесконечно"],
        answer: 1,
        explain: "i принимает значения 0, 1, 2, 3, 4 — пять итераций. При i = 5 условие уже ложно.",
      },
      {
        q: "Что делает continue?",
        options: [
          "Выходит из цикла",
          "Перезапускает цикл с нуля",
          "Пропускает остаток итерации и переходит к следующей",
          "Паузирует выполнение",
        ],
        answer: 2,
        explain: "continue завершает текущую итерацию досрочно и передаёт управление на проверку условия / шаг.",
      },
    ],
    tasks: [
      {
        id: "j5t1",
        title: "Сумма от 1 до N",
        md: `Реализуйте \`sumTo(n)\` — сумму всех целых чисел от \`1\` до \`n\` включительно, **используя цикл** (не формулу). \`sumTo(5)\` → \`15\`.`,
        starter: `function sumTo(n) {
  // ваш код с циклом
}

console.log(sumTo(5), sumTo(100));`,
        tests: `
await __test("sumTo(5) → 15", () => sumTo(5), 15);
await __test("sumTo(1) → 1", () => sumTo(1), 1);
await __test("sumTo(100) → 5050", () => sumTo(100), 5050);`,
        solution: `function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}`,
      },
      {
        id: "j5t2",
        title: "Переворот строки",
        md: `Реализуйте \`reverseString(s)\`, развернув строку **циклом**: \`reverseString("кот")\` → \`"ток"\`.`,
        starter: `function reverseString(s) {
  // ваш код
}

console.log(reverseString("javascript"));`,
        tests: `
await __test("reverseString('кот') → 'ток'", () => reverseString("кот"), "ток");
await __test("reverseString('abc') → 'cba'", () => reverseString("abc"), "cba");
await __test("reverseString('') → ''", () => reverseString(""), "");
await __test("reverseString('а') → 'а'", () => reverseString("а"), "а");`,
        solution: `function reverseString(s) {
  let result = "";
  for (const ch of s) {
    result = ch + result;
  }
  return result;
}`,
      },
    ],
  },

  {
    id: "j6",
    title: "Функции",
    subtitle: "Declaration, Expression, стрелки, параметры по умолчанию",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `Функция — блок кода, который можно вызывать многократно. Объявить её можно тремя способами:

1. **Function Declaration** — \`function sum(a, b) { ... }\`. «Всплывает»: можно вызывать до строки объявления.
2. **Function Expression** — \`const sum = function (a, b) { ... };\`. Не всплывает до выполнения строки.
3. **Стрелочная** — \`const sum = (a, b) => a + b;\`. Компактная, а главное — не имеет собственного \`this\` (об этом в уровне middle).`,
      },
      {
        kind: "code",
        title: "Три способа",
        code: `console.log(declared(2, 3)); // 5 — Declaration всплыла

function declared(a, b) {
  return a + b;
}

const expressed = function (a, b) {
  return a + b;
};

const arrow = (a, b) => a + b; // один return — фигурные скобки не нужны

console.log(expressed(2, 3), arrow(2, 3)); // 5 5`,
      },
      {
        kind: "text",
        md: `## Параметры

- **По умолчанию**: \`function greet(name = "гость")\` — сработает при \`undefined\`
- **Rest-параметр**: \`...args\` соберёт «все остальные» аргументы в массив
- Если аргумент не передан — внутри он \`undefined\`
- Функция без \`return\` возвращает \`undefined\`

Функции в JS — **значения первого класса**: их можно хранить в переменных, передавать аргументами (это называется **callback**) и возвращать из других функций.`,
      },
      {
        kind: "code",
        title: "Параметры и колбэки",
        code: `function power(base, exp = 2) {
  return base ** exp;
}
console.log(power(5));    // 25
console.log(power(2, 10)); // 1024

function sumAll(...nums) {
  let total = 0;
  for (const n of nums) total += n;
  return total;
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Функция как аргумент
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, (i) => console.log("итерация", i));`,
      },
      {
        kind: "warn",
        title: "arguments больше не нужен",
        md: `В старых примерах встречается псевдомассив \`arguments\`. В современном коде всегда используйте rest-параметр \`...args\` — это настоящий массив со всеми методами. Стрелочные функции \`arguments\` вообще не имеют.`,
      },
      {
        kind: "tip",
        title: "Чистые функции — цель",
        md: `Стремитесь к функциям, которые **зависят только от аргументов** и ничего не меняют снаружи: \`const double = x => x * 2\`. Их легко тестировать, переиспользовать и читать. Уровень senior начнётся именно с этой идеи.`,
      },
    ],
    quiz: [
      {
        q: "Что возвращает функция без return?",
        options: ["null", "0", "undefined", "пустую строку"],
        answer: 2,
        explain: "Отсутствие return (или голый return;) возвращает undefined.",
      },
      {
        q: "Какая запись стрелочной функции корректна?",
        options: [
          "const sq = x => x * x;",
          "const sq = x -> x * x;",
          "const sq = (x) >> x * x;",
          "const sq = arrow(x) x * x;",
        ],
        answer: 0,
        explain: "Стрелка — это =>. При одном параметре скобки можно опустить, при одном выражении — фигурные скобки и return.",
      },
      {
        q: "Чем Function Declaration отличается от Expression?",
        options: [
          "Ничем, это синонимы",
          "Declaration всплывает и вызываема до объявления",
          "Expression работает быстрее",
          "Declaration не может принимать аргументы",
        ],
        answer: 1,
        explain: "Declaration поднимается (hoisting) целиком, Expression существует только после выполнения строки присваивания.",
      },
    ],
    tasks: [
      {
        id: "j6t1",
        title: "Ограничитель",
        md: `Реализуйте \`clamp(value, min, max)\`: если \`value < min\` → \`min\`, если \`value > max\` → \`max\`, иначе само \`value\`.`,
        starter: `function clamp(value, min, max) {
  // ваш код
}

console.log(clamp(5, 0, 10), clamp(-5, 0, 10), clamp(15, 0, 10));`,
        tests: `
await __test("clamp(5, 0, 10) → 5", () => clamp(5, 0, 10), 5);
await __test("clamp(-5, 0, 10) → 0", () => clamp(-5, 0, 10), 0);
await __test("clamp(15, 0, 10) → 10", () => clamp(15, 0, 10), 10);
await __test("clamp(0, 0, 10) → 0", () => clamp(0, 0, 10), 0);`,
        solution: `function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}`,
      },
      {
        id: "j6t2",
        title: "Двойное применение",
        md: `Реализуйте \`applyTwice(fn, x)\` — применяет функцию \`fn\` к \`x\` дважды: \`applyTwice(x => x + 3, 10)\` → \`16\`.`,
        starter: `function applyTwice(fn, x) {
  // ваш код
}

console.log(applyTwice((x) => x + 3, 10));
console.log(applyTwice((s) => s + "!", "вау"));`,
        tests: `
await __test("applyTwice(x => x + 3, 10) → 16", () => applyTwice((x) => x + 3, 10), 16);
await __test("applyTwice(x => x * 2, 5) → 20", () => applyTwice((x) => x * 2, 5), 20);
await __test("работает со строками", () => applyTwice((s) => s + "!", "вау"), "вау!!");`,
        solution: `function applyTwice(fn, x) {
  return fn(fn(x));
}`,
      },
    ],
  },

  {
    id: "j7",
    title: "Массивы и их методы",
    subtitle: "map, filter, reduce, find, sort и мутабельность",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `Массив — упорядоченный список значений. Индексы начинаются с нуля, \`length\` — количество элементов. Методы делятся на две группы, и это **важнейшее** различие:

- **Мутирующие** — меняют исходный массив: \`push, pop, shift, unshift, splice, sort, reverse, fill\`
- **Немутирующие** — возвращают **новый** массив: \`slice, concat, map, filter, toSorted, toReversed\` (и spread \`[...arr]\`)`,
      },
      {
        kind: "code",
        title: "База: добавление и удаление",
        code: `const stack = ["a", "b"];
stack.push("c");       // в конец → ["a","b","c"]
stack.pop();           // из конца → "c"
stack.unshift("z");    // в начало → ["z","a","b"]

const copy = [...stack];        // копия через spread
const part = stack.slice(1);    // ["a","b"] — не меняет исходный

console.log(stack);
console.log(part);`,
      },
      {
        kind: "text",
        md: `## Святая троица: map, filter, reduce

- \`map(fn)\` — преобразует **каждый** элемент, длина не меняется
- \`filter(fn)\` — оставляет элементы, для которых \`fn\` вернул truthy
- \`reduce(fn, start)\` — «сворачивает» массив в одно значение, передавая аккумулятор

И ещё: \`find\` — первый подходящий, \`findIndex\` — его индекс, \`some\`/\`every\` — «есть ли хоть один» / «все ли», \`includes\` — наличие значения.`,
      },
      {
        kind: "code",
        title: "map / filter / reduce",
        code: `const prices = [120, 45, 300, 78];

const withTax = prices.map((p) => p * 1.2);
console.log(withTax); // [144, 54, 360, 93.6]

const expensive = prices.filter((p) => p > 100);
console.log(expensive); // [120, 300]

const total = prices.reduce((sum, p) => sum + p, 0);
console.log(total); // 543

// Цепочка: сумма цен дорогих товаров со скидкой 10%
const result = prices
  .filter((p) => p > 100)
  .map((p) => p * 0.9)
  .reduce((sum, p) => sum + p, 0);
console.log(result); // 378`,
      },
      {
        kind: "warn",
        title: "Ловушка sort",
        md: `\`sort()\` **по умолчанию сортирует элементы как строки**: \`[10, 9, 100].sort()\` → \`[10, 100, 9]\`! Для чисел всегда передавайте компаратор: \`[10, 9, 100].sort((a, b) => a - b)\`. И помните: sort мутирует исходный массив — копия через \`[...arr].sort(...)\`.`,
      },
      {
        kind: "tip",
        title: "Императив → декларатив",
        md: `Сравнивайте: вместо цикла с временными переменными цепочка \`filter → map → reduce\` описывает **что** нужно, а не **как**. Это читается как предложение и меньше ошибается. Старшие разработчики мыслят именно такими цепочками.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт [1, 2, 3].map(x => x * 2)?",
        options: ["[2, 4, 6]", "12", "[1, 2, 3, 1, 2, 3]", "undefined"],
        answer: 0,
        explain: "map применяет функцию к каждому элементу и возвращает новый массив той же длины.",
      },
      {
        q: "Какой метод МУТИРУЕТ исходный массив?",
        options: ["map", "slice", "push", "filter"],
        answer: 2,
        explain: "push добавляет элемент прямо в исходный массив. map, slice и filter всегда возвращают новый.",
      },
      {
        q: "Чему равно [10, 1, 2].sort() без компаратора?",
        options: ["[1, 2, 10]", "[10, 1, 2]", "[1, 10, 2]", "[2, 1, 10]"],
        answer: 2,
        explain: "Без компаратора элементы приводятся к строкам: '1' < '10' < '2' в лексикографическом порядке.",
      },
    ],
    tasks: [
      {
        id: "j7t1",
        title: "Сумма чётных",
        md: `Реализуйте \`sumEven(nums)\` — сумму **чётных** чисел массива, используя \`filter\` и \`reduce\`. \`sumEven([1,2,3,4,5,6])\` → \`12\`.`,
        starter: `function sumEven(nums) {
  // filter + reduce
}

console.log(sumEven([1, 2, 3, 4, 5, 6]));`,
        tests: `
await __test("sumEven([1,2,3,4,5,6]) → 12", () => sumEven([1, 2, 3, 4, 5, 6]), 12);
await __test("sumEven([1, 3, 5]) → 0", () => sumEven([1, 3, 5]), 0);
await __test("sumEven([]) → 0", () => sumEven([]), 0);
await __test("sumEven([2]) → 2", () => sumEven([2]), 2);`,
        solution: `function sumEven(nums) {
  return nums.filter((n) => n % 2 === 0).reduce((sum, n) => sum + n, 0);
}`,
      },
      {
        id: "j7t2",
        title: "Лучший студент",
        md: `Реализуйте \`topScore(students)\`: на вход массив объектов \`{ name, score }\`, на выход — **имя** студента с максимальным баллом. Массив не пустой.`,
        starter: `function topScore(students) {
  // ваш код
}

const group = [
  { name: "Ада", score: 92 },
  { name: "Линус", score: 97 },
  { name: "Грейс", score: 95 },
];
console.log(topScore(group));`,
        tests: `
await __test("побеждает максимальный балл", () =>
  topScore([{ name: "Ада", score: 92 }, { name: "Линус", score: 97 }, { name: "Грейс", score: 95 }]), "Линус");
await __test("один студент", () => topScore([{ name: "Ева", score: 88 }]), "Ева");
await __test("отрицательные баллы", () =>
  topScore([{ name: "А", score: -5 }, { name: "Б", score: -10 }]), "А");`,
        solution: `function topScore(students) {
  return students.reduce((best, s) => (s.score > best.score ? s : best)).name;
}`,
      },
    ],
  },

  {
    id: "j8",
    title: "Объекты и JSON",
    subtitle: "Свойства, Object.keys, spread, сериализация",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `Объект — коллекция пар «ключ: значение». Ключи — строки (или символы), значения — что угодно, включая функции (тогда это **метод**).

- Доступ: \`user.name\` или \`user["name"]\` — квадратные скобки нужны для динамических ключей и ключей с пробелами
- Проверка наличия: \`"name" in user\`
- Удаление: \`delete user.name\`
- Сокращение: \`{ name, age }\` вместо \`{ name: name, age: age }\`
- Вычисляемые ключи: \`{ [key]: value }\``,
      },
      {
        kind: "code",
        title: "Объекты в работе",
        code: `const field = "email";
const user = {
  name: "Ада",
  [field]: "ada@example.com", // вычисляемый ключ
  greet() {
    return "Привет, я " + this.name; // метод
  },
};

console.log(user.email);       // ada@example.com
console.log(user.greet());     // Привет, я Ада
console.log("name" in user);   // true

const updated = { ...user, name: "Грейс" }; // копия с изменением
console.log(updated.name, user.name); // Грейс Ада`,
      },
      {
        kind: "text",
        md: `## Обход объекта

\`Object.keys(obj)\` — массив ключей, \`Object.values(obj)\` — значений, \`Object.entries(obj)\` — пар \`[ключ, значение]\`. В связке с методами массивов это даёт полный контроль:`,
      },
      {
        kind: "code",
        title: "Object.entries + reduce",
        code: `const salaries = { ada: 3200, alan: 4100, grace: 3900 };

const total = Object.values(salaries).reduce((s, v) => s + v, 0);
console.log("ФОТ:", total); // 11200

for (const [name, salary] of Object.entries(salaries)) {
  console.log(name, "получает", salary);
}`,
      },
      {
        kind: "text",
        md: `## JSON

JSON — текстовый формат обмена данными. \`JSON.stringify(obj)\` превращает объект в строку, \`JSON.parse(str)\` — обратно. Не сериализуются: функции, \`undefined\`, \`Symbol\`, циклические ссылки.

Объекты сравниваются **по ссылке**: два одинаковых объекта не равны через \`===\`. Глубокая копия — \`structuredClone(obj)\` (современно) или \`JSON.parse(JSON.stringify(obj))\` (теряет даты, Map, undefined).`,
      },
      {
        kind: "code",
        title: "Сериализация",
        code: `const config = { theme: "dark", fontSize: 14, onSave: () => {} };

const json = JSON.stringify(config);
console.log(json); // {"theme":"dark","fontSize":14} — функция исчезла

const restored = JSON.parse(json);
console.log(restored.theme); // dark

const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false — разные ссылки
console.log(JSON.stringify(a) === JSON.stringify(b)); // true — «грязный» способ сравнения`,
      },
      {
        kind: "tip",
        title: "Spread — только поверхностный",
        md: `\`{...obj}\` копирует свойства **на один уровень**. Вложенный объект остаётся общей ссылкой: изменили копию внутри — изменилось и в оригинале. Для глубоких копий — \`structuredClone\`.`,
      },
    ],
    quiz: [
      {
        q: "Что позволяет сделать const с объектом?",
        options: [
          "Ничего менять нельзя",
          "Можно менять свойства, нельзя переприсвоить переменную",
          "Можно переприсвоить, нельзя менять свойства",
          "Объекты нельзя хранить в const",
        ],
        answer: 1,
        explain: "const защищает ссылку в переменной, а не содержимое объекта. user.name = '...' — законно.",
      },
      {
        q: "Что вернёт Object.keys({ a: 1, b: 2 })?",
        options: ["[1, 2]", "['a', 'b']", "[['a',1],['b',2]]", "{ a, b }"],
        answer: 1,
        explain: "Object.keys возвращает массив строковых ключей. Значения — Object.values, пары — Object.entries.",
      },
    ],
    tasks: [
      {
        id: "j8t1",
        title: "Счётчик символов",
        md: `Реализуйте \`countChars(str)\` — объект, где ключи — символы строки, значения — сколько раз они встречаются. Регистр учитывается. \`countChars("aab")\` → \`{ a: 2, b: 1 }\`.`,
        starter: `function countChars(str) {
  // ваш код
}

console.log(countChars("aab"));`,
        tests: `
await __test("countChars('aab')", () => countChars("aab"), { a: 2, b: 1 });
await __test("countChars('') → {}", () => countChars(""), {});
await __test("countChars('xXx')", () => countChars("xXx"), { x: 2, X: 1 });`,
        solution: `function countChars(str) {
  const counts = {};
  for (const ch of str) {
    counts[ch] = (counts[ch] ?? 0) + 1;
  }
  return counts;
}`,
      },
      {
        id: "j8t2",
        title: "Сумма корзины",
        md: `Реализуйте \`totalPrices(cart)\`: массив \`[{ price, qty }, ...]\` → сумма \`price * qty\` по всем позициям. Пустая корзина → \`0\`.`,
        starter: `function totalPrices(cart) {
  // ваш код
}

console.log(totalPrices([
  { price: 100, qty: 2 },
  { price: 50, qty: 1 },
]));`,
        tests: `
await __test("две позиции", () => totalPrices([{ price: 100, qty: 2 }, { price: 50, qty: 1 }]), 250);
await __test("пустая корзина", () => totalPrices([]), 0);
await __test("одна позиция", () => totalPrices([{ price: 99, qty: 3 }]), 297);`,
        solution: `function totalPrices(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}`,
      },
    ],
  },
];
