import type { Lesson } from "../lib/types";

export const seniorLessons: Lesson[] = [
  {
    id: "s1",
    title: "Event Loop",
    subtitle: "Как один поток обслуживает миллионы операций",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `JavaScript **однопоточный**: в каждый момент выполняется ровно одна операция — вершина **стека вызовов**. Вся магия — вокруг стека:

- **Web API / libuv** — среда выполняет тяжёлое (таймеры, сеть, файлы) вне потока
- **Очередь микрозадач** — продолжения промисов, \`queueMicrotask\`, \`MutationObserver\`
- **Очередь макрозадач** — \`setTimeout\`, \`setInterval\`, I/O, события UI

**Алгоритм event loop**: взять одну макрозадачу → выполнить → выполнить **все** микрозадачи (включая добавленные в процессе) → при необходимости отрисовать кадр → взять следующую макрозадачу.`,
      },
      {
        kind: "code",
        title: "Порядок вывода — запустите!",
        code: `console.log("1: синхронно");

setTimeout(() => console.log("4: макрозадача (timeout)"), 0);

Promise.resolve()
  .then(() => console.log("3: микрозадача (then)"))
  .then(() => console.log("3.5: вторая микрозадача"));

queueMicrotask(() => console.log("3.1: queueMicrotask"));

console.log("2: снова синхронно");

// Порядок: 1, 2, 3, 3.1, 3.5, 4
// таймер ждёт, пока иссякнут ВСЕ микрозадачи`,
      },
      {
        kind: "text",
        md: `## Ключевые следствия

- \`await\` — это \`then\`: продолжение после \`await\` попадает в **микрозадачи**
- Микрозадачи имеют приоритет: пока очередь не пуста, новые макрозадачи не начнутся. Рекурсивный \`Promise.resolve().then(...)\` **заморозит страницу** (microtask starvation), а рекурсивный \`setTimeout\` — нет
- Рендеринг происходит **между** макрозадачами, но не между микрозадачами — поэтому тяжёлый синхронный код и длинные цепочки микрозадач блокируют UI
- \`setTimeout(fn, 0)\` — не «немедленно», а «в следующей макрозадаче, после всех микрозадач»`,
      },
      {
        kind: "code",
        title: "await — это микрозадача",
        code: `async function a() {
  console.log("a: начало");      // синхронная часть
  await null;                    // дальше — микрозадача
  console.log("a: после await");
}

console.log("до");
a();
console.log("после");
// Вывод: до → a: начало → после → a: после await`,
      },
      {
        kind: "warn",
        title: "Голодание макрозадач",
        md: `Бесконечный цикл — очевидное зло. А бесконечная **цепочка микрозадач** — скрытое: интерфейс мёртв, таймеры не стреляют, но DevTools молчит. Генерация больших отчётов — только чанками через \`setTimeout\`/\`requestAnimationFrame\`, а лучше — в Web Worker.`,
      },
      {
        kind: "tip",
        title: "Собеседование уровня senior",
        md: `Вопрос «в каком порядке выведется» — стандарт. Алгоритм ответа: сначала весь синхронный код сверху вниз, затем микрозадачи по кругу (включая порождённые), затем одна макрозадача — и цикл повторяется. \`await\` мысленно заменяйте на \`.then\`.`,
      },
    ],
    quiz: [
      {
        q: "Что выполнится раньше: then промиса или setTimeout(fn, 0)?",
        options: [
          "setTimeout — он был запланирован первым",
          "then — микрозадачи всегда раньше макрозадач",
          "Зависит от движка",
          "Одновременно, в два потока",
        ],
        answer: 1,
        explain: "После синхронного кода event loop полностью выгребает очередь микрозадач и лишь затем берётся за макрозадачи.",
      },
      {
        q: "Куда попадает продолжение функции после await?",
        options: ["В стек вызовов немедленно", "В очередь микрозадач", "В очередь макрозадач", "В отдельный поток"],
        answer: 1,
        explain: "await — синтаксический сахар над then: остаток async-функции станет микрозадачей.",
      },
    ],
    tasks: [
      {
        id: "s1t1",
        title: "Хронометр порядка",
        md: `Реализуйте \`runOrder()\`:
1. синхронно запишите \`"sync"\` в массив
2. запланируйте \`setTimeout\` с записью \`"timeout"\`
3. в \`Promise.resolve().then\` запишите \`"micro"\`
4. верните промис, который через \`sleep(50)\` отдаст итоговый массив **в порядке фактического выполнения**.`,
        starter: `function runOrder() {
  const order = [];
  // sync / setTimeout / Promise.resolve().then
  // верните sleep(50).then(() => order)
}

console.log(await runOrder());`,
        tests: `
await __test("sync → micro → timeout", async () => await runOrder(), ["sync", "micro", "timeout"]);
await __test("стабильно при повторе", async () => await runOrder(), ["sync", "micro", "timeout"]);`,
        solution: `function runOrder() {
  const order = [];
  order.push("sync");
  setTimeout(() => order.push("timeout"), 0);
  Promise.resolve().then(() => order.push("micro"));
  return sleep(50).then(() => order);
}`,
      },
      {
        id: "s1t2",
        title: "Debounce",
        md: `Реализуйте \`debounce(fn, ms)\`: обёртку, откладывающую вызов \`fn\` на \`ms\` после **последнего** обращения. Серия быстрых вызовов → один вызов с последними аргументами. \`this\` и аргументы должны передаваться. Подсказка: \`clearTimeout\` + \`setTimeout\`.`,
        starter: `function debounce(fn, ms) {
  // ваш код
}

let calls = [];
const save = debounce((v) => calls.push(v), 30);
save(1); save(2); save(3); // сольются в один вызов
await sleep(80);
console.log(calls); // [3]`,
        tests: `
await __test("серия вызовов сливается в один", async () => {
  const calls = [];
  const f = debounce((v) => calls.push(v), 30);
  f(1); f(2); f(3);
  await sleep(100);
  return calls;
}, [3]);
await __test("вызовы с паузой не сливаются", async () => {
  const calls = [];
  const f = debounce((v) => calls.push(v), 20);
  f("a");
  await sleep(60);
  f("b");
  await sleep(60);
  return calls;
}, ["a", "b"]);
await __test("передаёт несколько аргументов", async () => {
  let got;
  const f = debounce((a, b) => { got = [a, b]; }, 20);
  f(1, 2);
  await sleep(60);
  return got;
}, [1, 2]);`,
        solution: `function debounce(fn, ms) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}`,
      },
    ],
  },

  {
    id: "s2",
    title: "Итераторы и генераторы",
    subtitle: "Протокол итерации, yield, ленивые последовательности",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `За \`for..of\` стоит **протокол итерации**. Итерабельный объект — тот, у которого есть метод \`[Symbol.iterator]()\`, возвращающий **итератор** — объект с методом \`next()\`, который возвращает \`{ value, done }\`.

Массивы, строки, Map, Set — итерабельны из коробки. Любой объект можно сделать итерабельным вручную.`,
      },
      {
        kind: "code",
        title: "Свой итерабельный объект",
        code: `const range = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      },
    };
  },
};

for (const n of range) console.log(n); // 1 2 3 4
console.log([...range]); // [1, 2, 3, 4] — работает и spread!`,
      },
      {
        kind: "text",
        md: `## Генераторы

Писать итераторы руками утомительно — есть сахар: \`function*\`. При вызове она не выполняется, а возвращает генератор. Код работает **по требованию**: каждый \`next()\` выполняется до следующего \`yield\`, который «выдаёт» значение и ставит функцию на паузу.

Генераторы могут быть **бесконечными** — значения производятся лениво. \`yield*\` делегирует итерацию другому итерабельному объекту.`,
      },
      {
        kind: "code",
        title: "Ленивые последовательности",
        code: `function* naturals() {
  let n = 1;
  while (true) yield n++; // бесконечный — и это безопасно
}

const it = naturals();
console.log(it.next().value); // 1
console.log(it.next().value); // 2

function* take(iterable, count) {
  let i = 0;
  for (const item of iterable) {
    if (i++ >= count) return;
    yield item;
  }
}

console.log([...take(naturals(), 5)]); // [1, 2, 3, 4, 5]

// делегирование
function* combined() {
  yield* [1, 2];
  yield* "ab";
}
console.log([...combined()]); // [1, 2, 'a', 'b']`,
      },
      {
        kind: "tip",
        title: "Где генераторы в бою",
        md: `Пагинация больших датасетов, бесконечные ленты, кооперативные планировщики, парсеры, redux-saga. Плюс — кастомная ленивая обработка: \`map\`/\`filter\` поверх генераторов не создают промежуточных массивов.`,
      },
      {
        kind: "warn",
        title: "Генератор одноразовый",
        md: `Пройденный итератор нельзя «перемотать»: повторный обход пуст. Нужен повтор — создавайте новую итерабельную сущность (или храните фабрику). В этом смысле массив удобнее, но дороже по памяти.`,
      },
    ],
    quiz: [
      {
        q: "Что возвращает next() итератора?",
        options: [
          "Просто значение",
          "Объект { value, done }",
          "Promise",
          "true/false",
        ],
        answer: 1,
        explain: "Контракт протокола: { value: <очередное значение>, done: <завершён ли обход> }.",
      },
      {
        q: "Что делает функция при вызове function* f()?",
        options: [
          "Выполняет тело сразу",
          "Возвращает объект-генератор, не запуская тело",
          "Бросает ошибку",
          "Возвращает первый yield",
        ],
        answer: 1,
        explain: "Тело стартует только при первом next() — генераторы ленивы по своей природе.",
      },
    ],
    tasks: [
      {
        id: "s2t1",
        title: "Генератор range",
        md: `Реализуйте генератор \`range(from, to, step = 1)\` — числа от \`from\` до \`to\` **невключительно** с шагом \`step\`. \`[...range(0, 10, 3)]\` → \`[0, 3, 6, 9]\`.`,
        starter: `function* range(from, to, step = 1) {
  // yield в цикле
}

console.log([...range(1, 6)]);
console.log([...range(0, 10, 3)]);`,
        tests: `
await __test("range(1, 6) → [1..5]", () => [...range(1, 6)], [1, 2, 3, 4, 5]);
await __test("range(0, 10, 3) → [0,3,6,9]", () => [...range(0, 10, 3)], [0, 3, 6, 9]);
await __test("пустой диапазон", () => [...range(5, 5)], []);
await __test("range(10, 0, -2) — отрицательный шаг", () => [...range(10, 0, -2)], [10, 8, 6, 4, 2]);`,
        solution: `function* range(from, to, step = 1) {
  if (step > 0) {
    for (let i = from; i < to; i += step) yield i;
  } else {
    for (let i = from; i > to; i += step) yield i;
  }
}`,
      },
      {
        id: "s2t2",
        title: "Сделать итерабельным",
        md: `Дан объект \`book = { title, chapters: [...] }\`. Добавьте ему \`[Symbol.iterator]\`, чтобы \`for..of\` обходил **названия глав**. Используйте генератор-метод (\`*[Symbol.iterator]() { yield* ... }\`).`,
        starter: `const book = {
  title: "Грокаем алгоритмы",
  chapters: ["Введение", "Рекурсия", "Сортировка"],
  // добавьте *[Symbol.iterator]()
};

for (const ch of book) console.log(ch);
console.log([...book].length);`,
        tests: `
await __test("spread по book даёт главы", () => [...book], ["Введение", "Рекурсия", "Сортировка"]);
await __test("работает for..of", () => {
  const out = [];
  for (const ch of book) out.push(ch);
  return out;
}, ["Введение", "Рекурсия", "Сортировка"]);`,
        solution: `const book = {
  title: "Грокаем алгоритмы",
  chapters: ["Введение", "Рекурсия", "Сортировка"],
  *[Symbol.iterator]() {
    yield* this.chapters;
  },
};`,
      },
    ],
  },

  {
    id: "s3",
    title: "Proxy и Reflect",
    subtitle: "Метпрограммирование: перехват операций над объектами",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `\`Proxy\` оборачивает объект и **перехватывает** фундаментальные операции: чтение (\`get\`), запись (\`set\`), \`in\`, \`delete\`, \`Object.keys\` и другие — через функции-**ловушки** (traps). Всё, что вы делаете с прокси, сначала проходит через ваши правила.

\`Reflect\` — набор тех же операций в виде функций (\`Reflect.get\`, \`Reflect.set\`, \`Reflect.has\`). Внутри ловушек правильнее вызывать \`Reflect\`, а не \`target[prop]\`: это корректно передаёт \`receiver\` и возвращает логические флаги.`,
      },
      {
        kind: "code",
        title: "Валидация через set-ловушку",
        code: `function validated(target, rules) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const rule = rules[prop];
      if (rule && typeof value !== rule) {
        throw new TypeError(prop + " должен быть " + rule);
      }
      return Reflect.set(obj, prop, value); // правильный способ записи
    },
  });
}

const user = validated({}, { age: "number", name: "string" });
user.name = "Ада";
user.age = 36;
console.log(user);

try {
  user.age = "много";
} catch (e) {
  console.log("Перехвачено:", e.message);
}`,
      },
      {
        kind: "code",
        title: "Отрицательные индексы массива, как в Python",
        code: `function withNegativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const idx = Number(prop);
      if (Number.isInteger(idx) && idx < 0) {
        return Reflect.get(target, target.length + idx, receiver);
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const nums = withNegativeIndex([10, 20, 30, 40]);
console.log(nums[-1]); // 40
console.log(nums[-4]); // 10
console.log(nums[1]);  // 20 — обычные индексы не пострадали`,
      },
      {
        kind: "text",
        md: `## Зачем это в продакшене

- Валидация и логирование доступа к данным
- Реактивность: Vue 3 целиком построен на \`Proxy\` — чтение трекается, запись запускает обновления
- Ленивые вычисления и «виртуальные» коллекции
- Песочницы и безопасность (ограничение доступа к \`globalThis\`)`,
      },
      {
        kind: "warn",
        title: "Инварианты не обмануть",
        md: `Движок не даст ловушке соврать о **неконфигурируемых** свойствах: \`get\` не может вернуть другое значение для замороженного свойства, \`has\` не может скрыть non-configurable ключ. Нарушение инварианта — \`TypeError\`. Прокси нельзя «распаковать» снаружи — храните оригинал, если нужен доступ.`,
      },
    ],
    quiz: [
      {
        q: "Какая ловушка перехватывает чтение свойства?",
        options: ["set", "get", "has", "read"],
        answer: 1,
        explain: "get(target, prop, receiver) вызывается при любом чтении: proxy.prop, proxy['prop'], деструктуризация.",
      },
      {
        q: "Зачем внутри ловушек вызывать Reflect.set, а не target[prop] = value?",
        options: [
          "Reflect быстрее",
          "Корректно передаётся receiver и возвращается флаг успеха",
          "target[prop] запрещено спецификацией",
          "Разницы нет",
        ],
        answer: 1,
        explain: "Reflect-методы — каноническая реализация операций: с правильным receiver и булевым результатом для инвариантов.",
      },
    ],
    tasks: [
      {
        id: "s3t1",
        title: "Защита от незнакомцев",
        md: `Реализуйте \`strictObject(obj)\` — прокси, которое при чтении **несуществующего** свойства бросает \`ReferenceError\` с сообщением \`"Свойство <prop> не объявлено"\` (вместо тихого \`undefined\`). Существующие свойства читаются normally.`,
        starter: `function strictObject(obj) {
  // ловушка get
}

const cfg = strictObject({ port: 3000 });
console.log(cfg.port);
try { console.log(cfg.host); } catch (e) { console.log(e.message); }`,
        tests: `
await __test("существующее читается", () => strictObject({ port: 3000 }).port, 3000);
await __test("чужое бросает ReferenceError", () => {
  try {
    strictObject({ port: 3000 }).host;
    return "не упало";
  } catch (e) {
    return e instanceof ReferenceError ? e.message : "не тот тип";
  }
}, "Свойство host не объявлено");
await __test("значение undefined — легально, если ключ есть", () => strictObject({ x: undefined }).x, undefined);`,
        solution: `function strictObject(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (!(prop in target)) {
        throw new ReferenceError("Свойство " + String(prop) + " не объявлено");
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}`,
      },
      {
        id: "s3t2",
        title: "Только числа",
        md: `Реализуйте \`numOnly(arr)\` — прокси над массивом: запись нечислового значения (кроме служебных полей вроде \`length\`) бросает \`TypeError\` с сообщением \`"Только числа"\`. Числа записываются normally.`,
        starter: `function numOnly(arr) {
  // ловушка set
}

const scores = numOnly([1, 2, 3]);
scores[0] = 10;
scores.push(4);
try { scores[1] = "десять"; } catch (e) { console.log(e.message); }
console.log(scores);`,
        tests: `
await __test("числа записываются", () => {
  const a = numOnly([1]);
  a[0] = 42;
  a.push(7);
  return [...a];
}, [42, 7]);
await __test("строка отклоняется", () => {
  const a = numOnly([1]);
  try { a[0] = "x"; return "не упало"; }
  catch (e) { return e instanceof TypeError ? e.message : "не тот тип"; }
}, "Только числа");
await __test("push числа работает", () => {
  const a = numOnly([]);
  a.push(5); a.push(6);
  return a.length;
}, 2);`,
        solution: `function numOnly(arr) {
  return new Proxy(arr, {
    set(target, prop, value) {
      if (prop !== "length" && typeof value !== "number") {
        throw new TypeError("Только числа");
      }
      return Reflect.set(target, prop, value);
    },
  });
}`,
      },
    ],
  },

  {
    id: "s4",
    title: "Функциональное программирование",
    subtitle: "Чистые функции, иммутабельность, curry и pipe",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `ФП — стиль, где программа строится из **чистых функций**: результат зависит только от аргументов, побочных эффектов нет, входные данные не меняются. Такие функции тривиально тестировать, кэшировать, переиспользовать и параллелить.

Инструментарий:
- **Иммутабельность**: вместо мутации — новая копия (\`[...]\`, \`{...}\`, \`toSorted\`, \`structuredClone\`)
- **Композиция**: \`pipe(f, g)(x) === g(f(x))\` — сборка сложных преобразований из простых
- **Каррирование**: \`f(a, b, c)\` → \`f(a)(b)(c)\` — фиксация аргументов по одному
- **Частичное применение**: закрепляем часть аргументов заранее`,
      },
      {
        kind: "code",
        title: "Pipe и чистые преобразования",
        code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const processPrice = pipe(
  (price) => price * 1.2,           // НДС
  (price) => price - 50,            // скидка
  (price) => Math.round(price * 100) / 100,
  (price) => price + " ₽"
);

console.log(processPrice(1000)); // "1150 ₽"

// иммутабельность: данные не тронуты
const items = [{ name: "книга", price: 500 }];
const withDiscount = items.map((it) => ({ ...it, price: it.price * 0.9 }));
console.log(items[0].price, withDiscount[0].price); // 500 450`,
      },
      {
        kind: "code",
        title: "Каррирование в деле",
        code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}

const sum3 = curry((a, b, c) => a + b + c);
console.log(sum3(1)(2)(3));   // 6
console.log(sum3(1, 2)(3));   // 6 — частичное применение
console.log(sum3(1)(2, 3));   // 6

// фиксация аргумента = бесплатная фабрика специализаций
const multiply = curry((factor, x) => x * factor);
const double = multiply(2);
const triple = multiply(3);
console.log([1, 2, 3].map(double)); // [2, 4, 6]
console.log([1, 2, 3].map(triple)); // [3, 6, 9]`,
      },
      {
        kind: "tip",
        title: "ФП в обычном коде",
        md: `Не обязательно писать на Haskell, чтобы применять ФП: \`map/filter/reduce\` вместо мутаций, \`toSorted\` вместо \`sort\`, компоненты-функции в React, селекторы-мемоизаторы — всё это функциональные идеи в повседневном JavaScript.`,
      },
      {
        kind: "warn",
        title: "Цена иммутабельности",
        md: `Копирование огромных структур на каждый чих — дорого. Решения: копировать только затронутые ветки (structural sharing, как в Immer), использовать неизменяемые коллекции, либо осознанно мутировать **локальную** копию и возвращать её.`,
      },
    ],
    quiz: [
      {
        q: "Какая функция — чистая?",
        options: [
          "x => { count++; return x + count; }",
          "(a, b) => a + b",
          "() => Date.now()",
          "x => { log(x); return x; }",
        ],
        answer: 1,
        explain: "(a, b) => a + b детерминирована и не трогает внешний мир. Остальные зависят от внешнего состояния или производят эффекты.",
      },
      {
        q: "Что такое каррирование?",
        options: [
          "Преобразование f(a, b) в f(a)(b)",
          "Кэширование результатов функции",
          "Удаление побочных эффектов",
          "Рекурсивный вызов",
        ],
        answer: 0,
        explain: "Каррирование меняет арность вызова: аргументы принимаются по одному, возвращая промежуточные функции.",
      },
    ],
    tasks: [
      {
        id: "s4t1",
        title: "Универсальный curry",
        md: `Реализуйте \`curry(fn)\` для функции с фиксированным числом параметров (\`fn.length\`): вызовы допустимы в любом сочетании — \`f(1)(2)(3)\`, \`f(1, 2)(3)\`, \`f(1)(2, 3)\`. Когда аргументов достаточно — вернуть результат.`,
        starter: `function curry(fn) {
  // рекурсивная обёртка
}

const sum3 = curry((a, b, c) => a + b + c);
console.log(sum3(1)(2)(3));
console.log(sum3(1, 2)(3));`,
        tests: `
await __test("по одному", () => curry((a, b, c) => a + b + c)(1)(2)(3), 6);
await __test("два + один", () => curry((a, b, c) => a + b + c)(1, 2)(3), 6);
await __test("все сразу", () => curry((a, b, c) => a + b + c)(1, 2, 3), 6);
await __test("один + два", () => curry((a, b, c) => a + b + c)(1)(2, 3), 6);
await __test("функция из 2 аргументов", () => curry((a, b) => a * b)(3)(4), 12);`,
        solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}`,
      },
      {
        id: "s4t2",
        title: "Pipe",
        md: `Реализуйте \`pipe(...fns)\` — возвращает функцию, применяющую \`fns\` **слева направо**. \`pipe(x => x + 1, x => x * 2)(3)\` → \`8\`. Пустой pipe — функция тождества.`,
        starter: `function pipe(...fns) {
  // reduce по fns
}

const f = pipe((x) => x + 1, (x) => x * 2);
console.log(f(3)); // 8`,
        tests: `
await __test("pipe(x+1, x*2)(3) → 8", () => pipe((x) => x + 1, (x) => x * 2)(3), 8);
await __test("одна функция", () => pipe((x) => x * 10)(5), 50);
await __test("порядок слева направо", () =>
  pipe((s) => s + "b", (s) => s + "c")("a"), "abc");
await __test("пустой pipe — тождество", () => pipe()("x"), "x");`,
        solution: `function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}`,
      },
    ],
  },

  {
    id: "s5",
    title: "Память, GC и производительность",
    subtitle: "Как движок убирает мусор и где текут мегабайты",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `Примитивы живут в стеке и копируются по значению; объекты — в **куче**, переменные хранят лишь ссылки. Сборщик мусора (в V8 — поколенческий mark-and-sweep) периодически находит объекты, **недостижимые из корней** (глобальные переменные, стек вызовов, активные замыкания), и освобождает память.

Ключевое слово — **достижимость**, а не «переменную удалили». Замыкание, таймер или обработчик, ссылающиеся на объект, держат его живым.`,
      },
      {
        kind: "text",
        md: `## Типичные утечки

- **Забытые таймеры**: \`setInterval\` с колбэком, ссылающимся на большие данные (и на сам себя через замыкание)
- **Слушатели событий** на переиспользуемых объектах без \`removeEventListener\`
- **Кэши без ограничения**: \`Map\`, растущий бесконечно
- **Отсоединённый DOM**: ссылка на удалённый элемент хранится в JS
- **Глобальные переменные** и отладочные \`window.bigData = ...\`

Инструменты: вкладка Memory в DevTools (heap snapshot + comparison), \`performance.memory\` (Chromium), профилировщик Node.`,
      },
      {
        kind: "code",
        title: "WeakMap — кэш, который не течёт",
        code: `const cache = new WeakMap();

function heavyCompute(obj) {
  if (cache.has(obj)) {
    console.log("из кэша");
    return cache.get(obj);
  }
  const result = Object.keys(obj).length * 1000; // «тяжёлая работа»
  cache.set(obj, result);
  return result;
}

let request = { id: 1, data: "..." };
console.log(heavyCompute(request)); // 2000
console.log(heavyCompute(request)); // из кэша

request = null; // объект стал мусором — и запись в WeakMap исчезнет сама`,
      },
      {
        kind: "text",
        md: `## Производительность

1. **Сначала измерьте**: \`console.time\`/\`performance.now()\`, профилировщик. Оптимизация на глаз — главная ошибка
2. **Алгоритмы важнее микросекунд**: вложенный цикл по 10 000 элементов — 100 млн операций; \`Set\`/объект-словарь превращает O(n²) в O(n)
3. Не создавайте промежуточные массивы в горячих местах; \`for\` по индексу быстрее \`forEach\` в микро-, но не в макромире
4. V8 любит **стабильные формы объектов** (одинаковый порядок свойств) и **стабильные типы** аргументов — полиморфные вызовы ломают inline-кэши
5. \`WeakRef\` + \`FinalizationRegistry\` — тонкий контроль: держать объект, пока его держит кто-то другой`,
      },
      {
        kind: "code",
        title: "O(n²) → O(n)",
        code: `const ids = [3, 7, 1, 9];
const users = [
  { id: 1, name: "Ада" }, { id: 2, name: "Боб" },
  { id: 7, name: "Ева" }, { id: 9, name: "Дэн" },
];

// плохо: users.find внутри цикла с ids → O(n*m)
// хорошо: словарь → O(n+m)
const byId = new Map(users.map((u) => [u.id, u]));
const found = ids.map((id) => byId.get(id)?.name ?? null);
console.log(found); // [null, "Ева", "Ада", "Дэн"] — id 3 в базе не было`,
      },
      {
        kind: "warn",
        title: "Ранняя оптимизация",
        md: `«Преждевременная оптимизация — корень всех зол» (Д. Кнут). Сначала корректный и читаемый код, потом профилирование, потом точечные правки в подтверждённо горячих местах. В 90% приложений узкое место — сеть и рендеринг, а не цикл.`,
      },
    ],
    quiz: [
      {
        q: "Когда объект станет мусором для сборщика?",
        options: [
          "Когда переменную переименовали",
          "Когда он стал недостижим из корней",
          "Через фиксированное время жизни",
          "Когда вызвали delete",
        ],
        answer: 1,
        explain: "GC считает достижимость: нет пути от корней (стек, глобалы) — объект освобождается, сколько бы ссылок друг на друга ни висело внутри «острова».",
      },
      {
        q: "Чем WeakMap отличается от Map?",
        options: [
          "Медленнее работает",
          "Ключи — только объекты, и они не удерживаются от сборки",
          "Не может хранить значения",
          "Очищается по таймеру",
        ],
        answer: 1,
        explain: "Запись WeakMap исчезает, когда ключ стал мусором — идеальный кэш для живых объектов.",
      },
    ],
    tasks: [
      {
        id: "s5t1",
        title: "Мемоизация",
        md: `Реализуйте \`memoize(fn)\` — обёртку, кэширующую результат по **первому аргументу** (Map). Повторный вызов с тем же первым аргументом не вызывает \`fn\`. Остальные аргументы игнорируются при кэшировании.`,
        starter: `function memoize(fn) {
  // Map-кэш
}

let calls = 0;
const slowSquare = memoize((x) => {
  calls++;
  return x * x;
});
console.log(slowSquare(4), slowSquare(4), calls); // 16 16 1`,
        tests: `
await __test("кэш по первому аргументу", () => {
  let calls = 0;
  const f = memoize((x) => { calls++; return x * 2; });
  f(5); f(5); f(6);
  return calls;
}, 2);
await __test("результаты корректны", () => {
  const f = memoize((x) => x + 100);
  return [f(1), f(2), f(1)];
}, [101, 102, 101]);
await __test("разные ключи — разные записи", () => {
  const f = memoize((x, y) => x * y);
  return [f(2, 3), f(2, 99)];
}, [6, 6]);
await __test("строковые ключи тоже работают", () => {
  let calls = 0;
  const f = memoize((s) => { calls++; return s.length; });
  f("abc"); f("abc");
  return calls;
}, 1);`,
        solution: `function memoize(fn) {
  const cache = new Map();
  return function (first, ...rest) {
    if (cache.has(first)) return cache.get(first);
    const result = fn(first, ...rest);
    cache.set(first, result);
    return result;
  };
}`,
      },
      {
        id: "s5t2",
        title: "Уникальные по критерию",
        md: `Реализуйте \`uniqueBy(arr, keyFn)\` — элементы, уникальные по значению \`keyFn(item)\`, **в порядке первого появления**. Внутри — \`Set\` (никаких вложенных циклов).`,
        starter: `function uniqueBy(arr, keyFn) {
  // Set + filter или reduce
}

console.log(
  uniqueBy(
    [{ n: "Ада", d: "eng" }, { n: "Боб", d: "eng" }, { n: "Ева", d: "ops" }],
    (u) => u.d
  )
);`,
        tests: `
await __test("первый побеждает", () =>
  uniqueBy([{ n: "Ада", d: "eng" }, { n: "Боб", d: "eng" }, { n: "Ева", d: "ops" }], (u) => u.d).map((u) => u.n),
  ["Ада", "Ева"]);
await __test("все уникальны — без потерь", () => uniqueBy([1, 2, 3], (x) => x), [1, 2, 3]);
await __test("все одинаковы — один", () => uniqueBy(["a", "b", "c"], () => "same"), ["a"]);
await __test("пустой массив", () => uniqueBy([], (x) => x), []);`,
        solution: `function uniqueBy(arr, keyFn) {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}`,
      },
    ],
  },

  {
    id: "s6",
    title: "Паттерны и архитектура",
    subtitle: "Observer, Singleton, Factory и когда они вредны",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `Паттерны — проверенные схемы решения повторяющихся задач. В JavaScript многие «классические» паттерны уже встроены в язык (модуль, замыкание как стратегия), но понимать их полезно: это **общий словарь** команды.

Три кита, которых обязан знать каждый senior:

1. **Observer (наблюдатель)** — источник событий рассылает уведомления подписчикам. \`addEventListener\`, RxJS, шина событий, React-сторы — всё это observer
2. **Singleton (одиночка)** — гарантированно один экземпляр. В JS чаще всего — модуль (ESM кэшируется!) или ленивая фабрика
3. **Factory (фабрика)** — функция/метод создаёт объект, скрывая детали конструирования`,
      },
      {
        kind: "code",
        title: "EventEmitter за 20 строк",
        code: `function createEmitter() {
  const listeners = new Map();
  return {
    on(event, fn) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(fn);
      return () => listeners.get(event)?.delete(fn); // отписка
    },
    emit(event, ...args) {
      listeners.get(event)?.forEach((fn) => fn(...args));
    },
  };
}

const bus = createEmitter();
const off = bus.on("user:login", (name) => console.log("Вошёл:", name));
bus.on("user:login", (name) => console.log("Лог в аналитику:", name));

bus.emit("user:login", "Ада");
off(); // первый слушатель отписался
bus.emit("user:login", "Боб");`,
      },
      {
        kind: "text",
        md: `## Архитектурный кругозор

- **Разделение слоёв**: UI → сервисы → данные. Слой знает только о соседнем
- **Инкапсуляция состояния**: состояние владеет логикой, UI лишь отрисовывает (привет, Redux/Zustand)
- **SOLID в JS**: единственная ответственность модуля, открытость расширению через композицию, подмена реализаций через интерфейсы-объекты
- **Состояния как машина**: явные \`idle/loading/success/error\` вместо флага-спагетти \`isLoading && !error && data\``,
      },
      {
        kind: "code",
        title: "Фабрика вместо иерархии классов",
        code: `function createUser(kind, name) {
  const base = {
    name,
    describe() { return this.name + " (" + this.role + ")"; },
  };
  switch (kind) {
    case "admin":
      return { ...base, role: "админ", canDelete: true };
    case "guest":
      return { ...base, role: "гость", canDelete: false };
    default:
      return { ...base, role: "пользователь", canDelete: false };
  }
}

console.log(createUser("admin", "Ада").describe());
console.log(createUser("guest", "Боб").describe());`,
      },
      {
        kind: "warn",
        title: "Паттерны — не догма",
        md: `Singleton глобальному состоянию — антипаттерн в тестах. Factory на 3 строки — избыточность. «Применил паттерн» — не аргумент на ревью; аргумент — решённая проблема. Senior отличается умением **не** писать код, который не нужен.`,
      },
      {
        kind: "tip",
        title: "Куда расти дальше",
        md: `TypeScript (типизация контрактов), тестирование (Vitest, Playwright), сборка и монорепозитории, Web Workers и WASM, внутренности V8 и спецификация ECMA-262. Язык вы освоили — дальше инженерия вокруг него.`,
      },
    ],
    quiz: [
      {
        q: "Какой паттерн реализует addEventListener?",
        options: ["Singleton", "Observer", "Factory", "Decorator"],
        answer: 1,
        explain: "Источник (DOM-узел) хранит подписчиков и уведомляет их о событии — классический observer.",
      },
      {
        q: "Почему ESM-модуль — «бесплатный» singleton?",
        options: [
          "Из-за freeze",
          "Модуль выполняется один раз и кэшируется — все импорты делят экземпляр",
          "Из-за строгого режима",
          "Это не так",
        ],
        answer: 1,
        explain: "Движок выполняет модуль единожды и кэширует результат: каждый импорт получает тот же объект.",
      },
    ],
    tasks: [
      {
        id: "s6t1",
        title: "Своя шина событий",
        md: `Реализуйте \`createEmitter()\`:
- \`on(event, fn)\` — подписать, **вернуть функцию отписки**
- \`emit(event, ...args)\` — вызвать всех подписчиков с аргументами
- отписка убирает слушателя навсегда; повторная отписка безопасна`,
        starter: `function createEmitter() {
  // Map<event, Set<fn>>
}

const bus = createEmitter();
let got = [];
const off = bus.on("ping", (v) => got.push(v));
bus.emit("ping", 1);
off();
bus.emit("ping", 2);
console.log(got); // [1]`,
        tests: `
await __test("подписка получает события", () => {
  const bus = createEmitter();
  const got = [];
  bus.on("e", (v) => got.push(v));
  bus.emit("e", "a");
  bus.emit("e", "b");
  return got;
}, ["a", "b"]);
await __test("отписка работает", () => {
  const bus = createEmitter();
  const got = [];
  const off = bus.on("e", (v) => got.push(v));
  bus.emit("e", 1);
  off();
  bus.emit("e", 2);
  return got;
}, [1]);
await __test("события изолированы", () => {
  const bus = createEmitter();
  const got = [];
  bus.on("x", () => got.push("x"));
  bus.emit("y");
  return got;
}, []);
await __test("аргументы доходят", () => {
  const bus = createEmitter();
  let got;
  bus.on("sum", (a, b) => { got = a + b; });
  bus.emit("sum", 20, 22);
  return got;
}, 42);
await __test("несколько слушателей", () => {
  const bus = createEmitter();
  let n = 0;
  bus.on("e", () => n++);
  bus.on("e", () => n++);
  bus.emit("e");
  return n;
}, 2);`,
        solution: `function createEmitter() {
  const listeners = new Map();
  return {
    on(event, fn) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(fn);
      return () => {
        listeners.get(event)?.delete(fn);
      };
    },
    emit(event, ...args) {
      listeners.get(event)?.forEach((fn) => fn(...args));
    },
  };
}`,
      },
      {
        id: "s6t2",
        title: "Ленивый singleton",
        md: `Реализуйте \`singleton(factory)\`: возвращает функцию \`get()\`, которая при **первом** вызове создаёт экземпир через \`factory()\`, а дальше всегда возвращает тот же объект. Фабрика вызывается ровно один раз.`,
        starter: `function singleton(factory) {
  // ленивый экземпляр в замыкании
}

let built = 0;
const getConfig = singleton(() => {
  built++;
  return { createdAt: built };
});

const a = getConfig();
const b = getConfig();
console.log(a === b, built); // true 1`,
        tests: `
await __test("один экземпляр", () => {
  const get = singleton(() => ({ rnd: Math.random() }));
  return get() === get();
}, true);
await __test("фабрика вызывается один раз", () => {
  let n = 0;
  const get = singleton(() => ++n);
  get(); get(); get();
  return n;
}, 1);
await __test("значения одинаковы", () => {
  const get = singleton(() => [1, 2, 3]);
  const first = get();
  first.push(4);
  return get();
}, [1, 2, 3, 4]);
await __test("независимые синглтоны", () => {
  const a = singleton(() => "A");
  const b = singleton(() => "B");
  return [a(), b()];
}, ["A", "B"]);`,
        solution: `function singleton(factory) {
  let instance;
  let created = false;
  return function get() {
    if (!created) {
      instance = factory();
      created = true;
    }
    return instance;
  };
}`,
      },
    ],
  },
];
