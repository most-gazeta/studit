import type { Lesson } from "../lib/types";

export const middleLessons: Lesson[] = [
  {
    id: "m1",
    title: "Деструктуризация, spread и rest",
    subtitle: "Распаковка данных — главный синтаксис современного JS",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `Деструктуризация — синтаксис, который «распаковывает» массивы и объекты в отдельные переменные. Она везде: в параметрах функций, в React-хуках, в конфигурациях.

**Массивы** распаковываются по **позиции**, **объекты** — по **имени ключа**.`,
      },
      {
        kind: "code",
        title: "Распаковка массивов и объектов",
        code: `const point = [10, 20];
const [x, y] = point;
console.log(x, y); // 10 20

// пропуск элемента и значение по умолчанию
const [first, , third = 0] = [1, 2];
console.log(first, third); // 1 0

const user = { name: "Ада", age: 36, lang: "английский" };
const { name, lang: language } = user; // lang переименован в language
console.log(name, language); // Ада английский

// вложенность
const company = { ceo: { name: "Грейс" } };
const { ceo: { name: ceoName } } = company;
console.log(ceoName); // Грейс`,
      },
      {
        kind: "text",
        md: `## Spread и rest: три точки, две роли

- **Spread** (\`...arr\`, \`...obj\`) — «раскладывает» коллекцию наружу: \`[...a, ...b]\`, \`{...defaults, ...options}\`
- **Rest** (\`...args\`) — «собирает» оставшееся внутрь: в деструктуризации и в параметрах функций

Один из самых частых приёмов — **иммутабельное обновление**: копия с изменениями вместо мутации.`,
      },
      {
        kind: "code",
        title: "Иммутабельные обновления",
        code: `const defaults = { theme: "light", lang: "ru", sound: true };
const prefs = { theme: "dark" };
const config = { ...defaults, ...prefs };
console.log(config); // { theme: 'dark', lang: 'ru', sound: true }

const queue = ["Б", "В"];
const next = ["А", ...queue];  // в начало без unshift-мутации
console.log(next);

// rest в деструктуризации
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 1 [2, 3, 4]

// обмен значений без временной переменной
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1`,
      },
      {
        kind: "warn",
        title: "Spread копирует на один уровень",
        md: `\`{...state, profile: {...state.profile, name: 'X'}}\` — чтобы обновить вложенность, копируйте **каждый уровень** на пути к ней. Иначе вложенный объект останется общим с оригиналом. Это источник половины багов в Redux-подобном коде.`,
      },
      {
        kind: "tip",
        title: "Деструктуризация параметров",
        md: `Вместо \`function f(options)\` с проверками внутри пишите \`function f({ width = 100, height = 100 } = {})\`. Сразу видно, какие настройки принимает функция и какие у них значения по умолчанию. Именно так устроены API почти всех современных библиотек.`,
      },
    ],
    quiz: [
      {
        q: "Чему равно b после const [a, , b] = [1, 2, 3]?",
        options: ["2", "3", "undefined", "ошибка"],
        answer: 1,
        explain: "Пропуск (пустое место между запятыми) пропускает элемент массива: a = 1, b = 3.",
      },
      {
        q: "Что вернёт { ...{ a: 1 }, ...{ a: 2, b: 3 } }?",
        options: ["{ a: 1, b: 3 }", "{ a: 2, b: 3 }", "{ a: [1,2], b: 3 }", "ошибку"],
        answer: 1,
        explain: "При конфликте ключей побеждает значение из более позднего объекта: a: 2.",
      },
    ],
    tasks: [
      {
        id: "m1t1",
        title: "Полное имя",
        md: `Реализуйте \`getFullName(user)\`, используя **деструктуризацию с defaults**: из \`{ firstName, lastName }\` соберите \`"Имя Фамилия"\`. Отсутствующая часть заменяется на \`"Неизвестно"\`.`,
        starter: `function getFullName(user) {
  // деструктуризация с значениями по умолчанию
}

console.log(getFullName({ firstName: "Ада", lastName: "Лавлейс" }));
console.log(getFullName({ firstName: "Алан" }));`,
        tests: `
await __test("полные данные", () => getFullName({ firstName: "Ада", lastName: "Лавлейс" }), "Ада Лавлейс");
await __test("нет фамилии", () => getFullName({ firstName: "Алан" }), "Алан Неизвестно");
await __test("пустой объект", () => getFullName({}), "Неизвестно Неизвестно");`,
        solution: `function getFullName(user) {
  const { firstName = "Неизвестно", lastName = "Неизвестно" } = user;
  return firstName + " " + lastName;
}`,
      },
      {
        id: "m1t2",
        title: "Обмен краёв",
        md: `Реализуйте \`swapEnds(arr)\` — **новый** массив, в котором первый и последний элементы поменялись местами. Исходный массив менять нельзя. Массивы короче 2 элементов возвращайте как есть (копией).`,
        starter: `function swapEnds(arr) {
  // ваш код
}

console.log(swapEnds([1, 2, 3, 4]));`,
        tests: `
await __test("swapEnds([1,2,3,4]) → [4,2,3,1]", () => swapEnds([1, 2, 3, 4]), [4, 2, 3, 1]);
await __test("swapEnds(['a','b']) → ['b','a']", () => swapEnds(["a", "b"]), ["b", "a"]);
await __test("swapEnds([7]) → [7]", () => swapEnds([7]), [7]);
await __test("исходный не мутирует", () => {
  const src = [1, 2, 3];
  swapEnds(src);
  return src;
}, [1, 2, 3]);`,
        solution: `function swapEnds(arr) {
  if (arr.length < 2) return [...arr];
  const [first, ...rest] = arr;
  const last = rest.pop();
  return [last, ...rest, first];
}`,
      },
    ],
  },

  {
    id: "m2",
    title: "Замыкания",
    subtitle: "Лексическое окружение, приватные данные, let против var",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `**Замыкание** — это функция вместе с «рюкзаком» переменных из места, где она была создана. Когда функция вызывается где угодно, она всё равно видит переменные своей родительской области видимости — даже если родитель уже отработал.

Причина — **лексическое окружение**: у каждого вызова функции есть внутренний объект с её переменными, и вложенные функции хранят на него ссылку.`,
      },
      {
        kind: "code",
        title: "Классический счётчик",
        code: `function createCounter() {
  let count = 0; // приватная переменная
  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter.count); // undefined — снаружи не добраться!

const other = createCounter(); // независимый экземпляр
console.log(other()); // 1`,
      },
      {
        kind: "text",
        md: `## Знаменитая ловушка var в цикле

\`var\` имеет **функциональную** область видимости — переменная одна на всю функцию. \`let\` — **блочную**: на каждую итерацию цикла создаётся своя копия. Разница видна в асинхронных колбэках:`,
      },
      {
        kind: "code",
        title: "var против let (setTimeout 0)",
        code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i));
}
// напечатает: var: 3, var: 3, var: 3
// к моменту срабатывания i уже равна 3 — переменная одна

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j));
}
// напечатает: let: 0, let: 1, let: 2
// у каждой итерации — своя j`,
      },
      {
        kind: "tip",
        title: "Где замыкания вокруг вас",
        md: `Колбэки, обработчики событий, debounce/throttle, мемоизация, модульный паттерн, React-хуки — всё это замыкания. Понимание «какие переменные видны в момент вызова» отличает junior от middle.`,
      },
      {
        kind: "warn",
        title: "Замыкания держат память",
        md: `Пока функция жива, живы и переменные из её окружения — даже огромные массивы, которые вы «уже не используете». Обнуляйте ссылки, если замыкание долгоживущее: \`bigData = null\`.`,
      },
    ],
    quiz: [
      {
        q: "Что напечатает код: let c = createCounter(); c(); c(); — если createCounter из примера выше?",
        options: ["1, 1", "1, 2", "2, 2", "undefined, undefined"],
        answer: 1,
        explain: "Каждый вызов counter() увеличивает одну и ту же count из замкнутого окружения: 1, затем 2.",
      },
      {
        q: "Почему цикл с var печатает три тройки?",
        options: [
          "setTimeout сломан",
          "var создаёт одну переменную на функцию, и к моменту колбэков i уже 3",
          "let работает быстрее var",
          "цикл выполняется трижды параллельно",
        ],
        answer: 1,
        explain: "var — функциональная область видимости: переменная i одна, колбэки видят её финальное значение.",
      },
    ],
    tasks: [
      {
        id: "m2t1",
        title: "Счётчик с управлением",
        md: `Реализуйте \`createCounter(start)\` — возвращает объект с тремя методами-замыканиями над общей приватной переменной:
- \`inc()\` — увеличить на 1 и вернуть новое значение
- \`dec()\` — уменьшить на 1 и вернуть новое значение
- \`value()\` — вернуть текущее значение`,
        starter: `function createCounter(start) {
  // приватная переменная + методы
}

const c = createCounter(10);
c.inc(); c.inc();
c.dec();
console.log(c.value()); // 11`,
        tests: `
await __test("inc/dec/value", () => {
  const c = createCounter(10);
  c.inc(); c.inc(); c.dec();
  return c.value();
}, 11);
await __test("старт с нуля", () => {
  const c = createCounter(0);
  return [c.inc(), c.inc(), c.value()];
}, [1, 2, 2]);
await __test("экземпляры независимы", () => {
  const a = createCounter(0);
  const b = createCounter(100);
  a.inc();
  return [a.value(), b.value()];
}, [1, 100]);`,
        solution: `function createCounter(start) {
  let count = start;
  return {
    inc() { return ++count; },
    dec() { return --count; },
    value() { return count; },
  };
}`,
      },
      {
        id: "m2t2",
        title: "Вызвать один раз",
        md: `Реализуйте \`once(fn)\` — обёртку, которая вызывает \`fn\` **только при первом обращении** и навсегда запоминает результат. Повторные вызовы возвращают тот же результат, не вызывая \`fn\`.`,
        starter: `function once(fn) {
  // ваш код
}

let calls = 0;
const expensive = once(() => ++calls * 100);
console.log(expensive(), expensive(), calls); // 100 100 1`,
        tests: `
await __test("первый вызов вычисляет", () => once(() => 42)(), 42);
await __test("повторный вызов не пересчитывает", () => {
  let n = 0;
  const f = once(() => ++n);
  f(); f(); f();
  return n;
}, 1);
await __test("запоминает результат", () => {
  let n = 0;
  const f = once(() => ++n * 7);
  f();
  return f();
}, 7);
await __test("передаёт аргументы первому вызову", () => once((a, b) => a + b)(2, 3), 5);`,
        solution: `function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}`,
      },
    ],
  },

  {
    id: "m3",
    title: "this: call, apply, bind",
    subtitle: "Контекст вызова и как его не потерять",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `\`this\` — это **контекст вызова**, и он определяется не местом, где функция написана, а тем, **как её вызвали**. Четыре правила:

1. **Метод**: \`user.greet()\` → \`this === user\` (объект перед точкой)
2. **Обычный вызов**: \`greet()\` → \`this === undefined\` (в строгом режиме)
3. **new F()** → \`this\` — создаваемый объект
4. **Стрелочная функция** → собственного \`this\` нет, берётся из окружения, где она создана`,
      },
      {
        kind: "code",
        title: "Правила в действии",
        code: `const user = {
  name: "Ада",
  greet() {
    console.log("Привет, я", this.name);
  },
};

user.greet(); // Привет, я Ада — this = user

const fn = user.greet; // оторвали метод от объекта
// fn(); // TypeError: Cannot read properties of undefined

// стрелка берёт this из места создания
const timer = {
  seconds: 0,
  start() {
    // setTimeout(function () { this.seconds++ }) — this здесь undefined!
    setTimeout(() => this.seconds++, 10); // стрелка: this = timer
  },
};
timer.start();`,
      },
      {
        kind: "text",
        md: `## Явная привязка

Три метода позволяют указать \`this\` вручную:

- \`fn.call(ctx, arg1, arg2)\` — вызвать сразу, аргументы **списком**
- \`fn.apply(ctx, [args])\` — вызвать сразу, аргументы **массивом**
- \`fn.bind(ctx)\` — **не вызывает**, а возвращает новую функцию с навсегда привязанным \`this\``,
      },
      {
        kind: "code",
        title: "call / apply / bind",
        code: `function introduce(role) {
  console.log(this.name + ", " + role);
}

const dev = { name: "Линус" };

introduce.call(dev, "мэйнтэйнер ядра");
introduce.apply(dev, ["мэйнтэйнер ядра"]);

const bound = introduce.bind(dev);
bound("мэйнтэйнер ядра"); // можно вызывать сколько угодно раз

// классический спасательный круг для методов-колбэков
const account = {
  balance: 100,
  deposit(sum) {
    this.balance += sum;
    return this.balance;
  },
};

[10, 20, 30].forEach(account.deposit.bind(account));
console.log(account.balance); // 160`,
      },
      {
        kind: "warn",
        title: "Потерянный this",
        md: `Передали метод как колбэк (\`forEach(acc.deposit)\`) — объект-владелец остался за дверью. Рецепты: \`bind\` один раз заранее, стрелочная обёртка \`x => acc.deposit(x)\` или объявление метода стрелкой прямо в объекте.`,
      },
      {
        kind: "tip",
        title: "Мнемоника",
        md: `**call** — **C**omma (запятые между аргументами), **a**pply — **a**rray (массив). А \`bind\` — это «при**bind**ить и носить с собой».`,
      },
    ],
    quiz: [
      {
        q: "Откуда стрелочная функция берёт this?",
        options: [
          "Из объекта перед точкой при вызове",
          "Из лексического окружения, где она создана",
          "Всегда undefined",
          "Из первого аргумента",
        ],
        answer: 1,
        explain: "У стрелок нет собственного this — используется this enclosing-функции/модуля на момент создания.",
      },
      {
        q: "Чем apply отличается от call?",
        options: [
          "apply не вызывает функцию",
          "аргументы передаются массивом, а не списком",
          "apply работает только с объектами",
          "ничем",
        ],
        answer: 1,
        explain: "fn.apply(ctx, [a, b]) против fn.call(ctx, a, b). Оба вызывают немедленно.",
      },
      {
        q: "Что возвращает fn.bind(ctx)?",
        options: [
          "Результат вызова fn",
          "undefined",
          "Новую функцию с привязанным this",
          "Объект ctx",
        ],
        answer: 2,
        explain: "bind не вызывает функцию — он создаёт новую, обёрнутую, с зафиксированным контекстом.",
      },
    ],
    tasks: [
      {
        id: "m3t1",
        title: "Apply для максимума",
        md: `Реализуйте \`maxOf(nums)\` — максимум массива чисел, используя \`Math.max\` и \`apply\` (или spread). Пустой массив → \`null\`.`,
        starter: `function maxOf(nums) {
  // Math.max + apply
}

console.log(maxOf([3, 14, 1, 5]));`,
        tests: `
await __test("maxOf([3,14,1,5]) → 14", () => maxOf([3, 14, 1, 5]), 14);
await __test("maxOf([-5,-1]) → -1", () => maxOf([-5, -1]), -1);
await __test("maxOf([]) → null", () => maxOf([]), null);`,
        solution: `function maxOf(nums) {
  if (nums.length === 0) return null;
  return Math.max.apply(null, nums);
}`,
      },
      {
        id: "m3t2",
        title: "Позаимствовать метод",
        md: `Дан объект \`person\` с методом \`describe()\`, использующим \`this.name\` и \`this.role\`. Реализуйте \`describeAs(name, role)\`: одолжите \`person.describe\` через \`call\` для **другого** объекта \`{ name, role }\` и верните строку вида \`"Ада — инженер"\`.`,
        starter: `const person = {
  name: "Линус",
  role: "мэйнтэйнер",
  describe() {
    return this.name + " — " + this.role;
  },
};

function describeAs(name, role) {
  // person.describe + call
}

console.log(describeAs("Ада", "инженер"));`,
        tests: `
await __test("describeAs('Ада','инженер')", () => describeAs("Ада", "инженер"), "Ада — инженер");
await __test("describeAs('Грейс','адмирал')", () => describeAs("Грейс", "адмирал"), "Грейс — адмирал");`,
        solution: `const person = {
  name: "Линус",
  role: "мэйнтэйнер",
  describe() {
    return this.name + " — " + this.role;
  },
};

function describeAs(name, role) {
  return person.describe.call({ name, role });
}`,
      },
    ],
  },

  {
    id: "m4",
    title: "Прототипы и классы",
    subtitle: "Цепочка прототипов, class, extends, приватные поля",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `JavaScript — язык **прототипного** наследования. У каждого объекта есть скрытая ссылка \`[[Prototype]]\` на другой объект. Когда вы читаете свойство, которого нет в объекте, движок идёт по **цепочке прототипов** вверх, пока не найдёт его или не упрётся в \`null\`.

\`Object.create(proto)\` создаёт объект с заданным прототипом. Свойство \`__proto__\` — устаревший getter/setter для \`[[Prototype]]\` (в современном коде — \`Object.getPrototypeOf\`).`,
      },
      {
        kind: "code",
        title: "Цепочка прототипов",
        code: `const animal = {
  alive: true,
  breathe() { return "дышу"; },
};

const dog = Object.create(animal);
dog.bark = () => "гав";

console.log(dog.bark());   // своё свойство
console.log(dog.breathe()); // найдено в прототипе
console.log(dog.alive);    // тоже из прототипа
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(dog.hasOwnProperty("breathe")); // false — свойство не своё`,
      },
      {
        kind: "text",
        md: `## Классы

\`class\` — «синтаксический сахар» над прототипами: под капотом всё те же цепочки, но синтаксис знаком каждому, кто видел Java или C#.

- \`constructor\` — вызывается при \`new\`
- методы попадают в прототип (одна копия на всех), поля — в экземпляр
- \`static\` — метод самого класса, не экземпляра
- \`#field\` — по-настоящему приватное поле (ошибка при обращении снаружи)
- \`get\`/\`set\` — вычисляемые свойства
- \`extends\` + \`super()\` — наследование`,
      },
      {
        kind: "code",
        title: "Классы и наследование",
        code: `class Account {
  #balance = 0; // приватное поле

  constructor(owner) {
    this.owner = owner;
  }

  deposit(sum) {
    if (sum <= 0) throw new Error("Сумма должна быть положительной");
    this.#balance += sum;
    return this;
  }

  get balance() {
    return this.#balance;
  }

  static compare(a, b) {
    return a.balance - b.balance;
  }
}

class SavingsAccount extends Account {
  constructor(owner, rate) {
    super(owner); // обязан первым вызовом в конструкторе наследника
    this.rate = rate;
  }

  addInterest() {
    return this.deposit(Math.round(this.balance * this.rate));
  }
}

const acc = new SavingsAccount("Ада", 0.1);
acc.deposit(1000).addInterest(); // цепочка: deposit вернул this
console.log(acc.balance);       // 1100
console.log(acc.owner);         // Ада
// console.log(acc.#balance);   // SyntaxError — приватное
console.log(Account.compare(acc, new Account("Б"))); // 1100`,
      },
      {
        kind: "warn",
        title: "class — это не Java",
        md: `Наследование классов в JS не создаёт «копию» родителя: \`extends\` связывает прототипы. Изменение метода в родителе после создания наследника повлияет на него. И помните: \`class\` не всплывает до выполнения строки (в отличие от Function Declaration).`,
      },
      {
        kind: "tip",
        title: "Композиция > наследование",
        md: `Глубокие иерархии классов быстро становятся хрупкими. Прежде чем тянуться к \`extends\`, подумайте: может, объект может просто **содержать** другой объект или принимать его в конструктор (композиция)? В senior-уровне вернёмся к этому в паттернах.`,
      },
    ],
    quiz: [
      {
        q: "Где движок ищет отсутствующее свойство объекта?",
        options: [
          "В глобальной области видимости",
          "Вверх по цепочке прототипов",
          "В словаре движка",
          "Свойство создаётся автоматически",
        ],
        answer: 1,
        explain: "Движок идёт по [[Prototype]] до первого совпадения или до null в конце цепочки.",
      },
      {
        q: "Зачем super() в конструкторе наследника?",
        options: [
          "Для красоты",
          "Вызывает конструктор родителя и инициализирует this",
          "Создаёт статические методы",
          "Делает поля приватными",
        ],
        answer: 1,
        explain: "Без super() this в наследнике не будет создан — двигатель бросит ReferenceError при обращении к this.",
      },
    ],
    tasks: [
      {
        id: "m4t1",
        title: "Вектор",
        md: `Создайте \`class Vector\` с полями \`x\`, \`y\` и методами:
- \`add(v)\` — возвращает **новый** Vector с суммой координат
- \`length()\` — длина вектора (используйте \`Math.hypot\`), округлённая до 2 знаков (\`toFixed(2)\` возвращает строку — приведите к числу)
- \`toString()\` — строка \`"(x, y)"\``,
        starter: `class Vector {
  // constructor, add, length, toString
}

const v = new Vector(3, 4);
console.log(v.toString(), v.length());`,
        tests: `
await __test("toString", () => new Vector(3, 4).toString(), "(3, 4)");
await __test("length (3,4) → 5", () => new Vector(3, 4).length(), 5);
await __test("add возвращает новый вектор", () => {
  const a = new Vector(1, 2);
  const b = new Vector(10, 20);
  const c = a.add(b);
  return [c.toString(), a.toString()];
}, ["(11, 22)", "(1, 2)"]);
await __test("length (1,1) → 1.41", () => new Vector(1, 1).length(), 1.41);`,
        solution: `class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  length() {
    return Number(Math.hypot(this.x, this.y).toFixed(2));
  }
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}`,
      },
      {
        id: "m4t2",
        title: "Стек",
        md: `Создайте \`class Stack\` с методами:
- \`push(item)\` — добавить сверху, вернуть новый размер
- \`pop()\` — снять верхний элемент (пустой стек → \`undefined\`)
- \`peek()\` — посмотреть верхний, не снимая
- \`size\` — геттер с количеством элементов`,
        starter: `class Stack {
  // ваш код
}

const s = new Stack();
s.push(1); s.push(2);
console.log(s.pop(), s.peek(), s.size);`,
        tests: `
await __test("push возвращает размер", () => {
  const s = new Stack();
  return [s.push("a"), s.push("b")];
}, [1, 2]);
await __test("LIFO порядок", () => {
  const s = new Stack();
  s.push(1); s.push(2); s.push(3);
  return [s.pop(), s.pop(), s.pop()];
}, [3, 2, 1]);
await __test("pop пустого → undefined", () => new Stack().pop(), undefined);
await __test("peek не снимает", () => {
  const s = new Stack();
  s.push(42);
  s.peek();
  return [s.peek(), s.size];
}, [42, 1]);`,
        solution: `class Stack {
  #items = [];
  push(item) {
    this.#items.push(item);
    return this.#items.length;
  }
  pop() {
    return this.#items.pop();
  }
  peek() {
    return this.#items[this.#items.length - 1];
  }
  get size() {
    return this.#items.length;
  }
}`,
      },
    ],
  },

  {
    id: "m5",
    title: "Промисы",
    subtitle: "Состояния, цепочки, Promise.all и друзья",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `Асинхронность — сердце JavaScript: сеть, таймеры, файлы. До промисов асинхронный код писался **колбэками**, и вложенные колбэки превращались в «ад» (callback hell). Промис — это объект-обещание будущего результата.

У промиса три состояния, и переход необратим:
- \`pending\` — ожидание
- \`fulfilled\` — успех, есть \`value\`
- \`rejected\` — ошибка, есть \`reason\``,
      },
      {
        kind: "code",
        title: "Создание и потребление",
        code: `const order = new Promise((resolve, reject) => {
  // «асинхронная работа»
  setTimeout(() => {
    const ok = true;
    if (ok) resolve("кофе готов");
    else reject(new Error("кофемашина сломалась"));
  }, 50);
});

order
  .then((result) => {
    console.log("Успех:", result);
    return "чашка в руках";
  })
  .then((next) => console.log("Потом:", next))
  .catch((err) => console.error("Ошибка:", err.message))
  .finally(() => console.log("В любом случае: бар закрывается"));`,
      },
      {
        kind: "text",
        md: `## Цепочки

\`then\` **всегда** возвращает новый промис, поэтому вызовы складываются в цепочку. Если из \`then\` вернуть значение — следующий \`then\` получит его; если вернуть промис — цепочка подождёт его.

Статические комбинаторы:
- \`Promise.all([...])\` — ждёт **все**; падает при **первой** ошибке
- \`Promise.allSettled([...])\` — ждёт все, никогда не падает, возвращает статусы
- \`Promise.race([...])\` — результат **первого** завершившегося
- \`Promise.any([...])\` — первый **успешный**`,
      },
      {
        kind: "code",
        title: "Promise.all в песочнице",
        code: `const fakeApi = (name, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(name), ms));

const results = await Promise.all([
  fakeApi("пользователи", 60),
  fakeApi("заказы", 30),
  fakeApi("товары", 45),
]);
console.log(results); // порядок как в массиве, не по времени!

const first = await Promise.race([
  fakeApi("медленный", 100),
  fakeApi("быстрый", 10),
]);
console.log("Гонку выиграл:", first);`,
      },
      {
        kind: "warn",
        title: "Три классические ошибки",
        md: `- Забытый \`return\` внутри \`then\` — цепочка теряет значение
- \`catch\` только на первом промисе — ошибки следующих \`then\` не пойманы
- Непойманный \`rejected\` — unhandledrejection, в Node процесс падает

Правило: каждая цепочка заканчивается \`catch\` (или обработкой на верхнем уровне).`,
      },
      {
        kind: "tip",
        title: "Правило создания",
        md: `Внутри конструктора \`new Promise\` асинхронную работу начинают немедленно, а \`resolve\`/\`reject\` вызывают **один раз** — повторные вызовы игнорируются. В 95% реального кода промисы не создают руками, а получают из API (\`fetch\`, таймеры, БД).`,
      },
    ],
    quiz: [
      {
        q: "Что делает Promise.all при ошибке одного из промисов?",
        options: [
          "Ждёт остальные и возвращает частичный результат",
          "Сразу становится rejected с первой ошибкой",
          "Повторяет упавший промис",
          "Возвращает null",
        ],
        answer: 1,
        explain: "Promise.all падает быстро — при первом reject. Нужны все результаты с ошибками — Promise.allSettled.",
      },
      {
        q: "Состояние fulfilled означает…",
        options: [
          "промис ещё выполняется",
          "промис завершился успешно, навсегда",
          "промис можно перезапустить",
          "промис вернул undefined",
        ],
        answer: 1,
        explain: "Settled-состояния (fulfilled/rejected) окончательны: значение зафиксировано и не изменится.",
      },
    ],
    tasks: [
      {
        id: "m5t1",
        title: "Своя задержка",
        md: `Реализуйте \`delay(ms, value)\` — промис, который через \`ms\` миллисекунд **разрешается** значением \`value\`. Подсказка: в песочнице уже есть \`sleep(ms)\`, но для тренировки напишите через \`new Promise\` + \`setTimeout\`.`,
        starter: `function delay(ms, value) {
  // new Promise + setTimeout
}

console.log(await delay(30, "готово"));`,
        tests: `
await __test("delay(20, 'ok') → 'ok'", async () => await delay(20, "ok"), "ok");
await __test("delay передаёт объект", async () => await delay(10, { a: 1 }), { a: 1 });
await __test("действительно ждёт", async () => {
  const t0 = Date.now();
  await delay(60, null);
  return Date.now() - t0 >= 50;
}, true);`,
        solution: `function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}`,
      },
      {
        id: "m5t2",
        title: "Повторитель",
        md: `Реализуйте \`retry(fn, times)\`: вызывает асинхронную \`fn()\`; если она **отклоняется** — пробует снова, всего до \`times\` попыток. Вернула значение — отдаёт его. Исчерпал попытки — отклоняется с последней ошибкой.`,
        starter: `async function retry(fn, times) {
  // цикл попыток с try/catch
}

let attempt = 0;
const flaky = async () => {
  attempt++;
  if (attempt < 3) throw new Error("сбой #" + attempt);
  return "заработало с " + attempt + "-й попытки";
};
console.log(await retry(flaky, 5));`,
        tests: `
await __test("успех с первого раза", async () => {
  let n = 0;
  return await retry(async () => ++n, 3);
}, 1);
await __test("успех после сбоев", async () => {
  let n = 0;
  return await retry(async () => {
    n++;
    if (n < 3) throw new Error("fail");
    return "ok";
  }, 5);
}, "ok");
await __test("исчерпание попыток → reject", async () => {
  try {
    await retry(async () => { throw new Error("всегда падает"); }, 3);
    return "не упало";
  } catch (e) {
    return e.message;
  }
}, "всегда падает");
await __test("ровно times попыток", async () => {
  let calls = 0;
  try { await retry(async () => { calls++; throw new Error("x"); }, 4); } catch {}
  return calls;
}, 4);`,
        solution: `async function retry(fn, times) {
  let lastError;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}`,
      },
    ],
  },

  {
    id: "m6",
    title: "async/await и обработка ошибок",
    subtitle: "Синхронный стиль для асинхронного кода",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `\`async/await\` — синтаксический сахар над промисами, который делает асинхронный код похожим на синхронный:

- \`async function\` **всегда** возвращает промис
- \`await expr\` приостанавливает функцию, пока промис не завершится, и «распаковывает» значение
- \`await\` работает внутри \`async\`-функций и на верхнем уровне модулей

Ошибки обрабатываются привычным \`try/catch\` — и синхронные, и отклонённые промисы.`,
      },
      {
        kind: "code",
        title: "async/await с try/catch",
        code: `async function loadUser(id) {
  await sleep(20); // имитация сети
  if (id <= 0) throw new Error("Некорректный id: " + id);
  return { id, name: "Пользователь " + id };
}

async function main() {
  try {
    const user = await loadUser(7);
    console.log("Загружен:", user.name);
    await loadUser(-1); // здесь будет выброшена ошибка
  } catch (err) {
    console.error("Поймали:", err.message);
  } finally {
    console.log("Спиннер выключен");
  }
}

await main();`,
      },
      {
        kind: "text",
        md: `## Последовательно или параллельно?

\`await\` внутри цикла выполняет запросы **по одному** — медленно. Если порядок не важен, запускайте параллельно через \`Promise.all\`:`,
      },
      {
        kind: "code",
        title: "Параллельность",
        code: `const fetchMs = (name) => sleep(40).then(() => name);

console.time("последовательно");
let seq = [];
for (const n of ["a", "b", "c"]) {
  seq.push(await fetchMs(n)); // ~120 мс суммарно
}
console.timeEnd("последовательно");

console.time("параллельно");
const par = await Promise.all(["a", "b", "c"].map(fetchMs)); // ~40 мс
console.timeEnd("параллельно");

console.log(seq, par);`,
      },
      {
        kind: "text",
        md: `## Свои ошибки

Для разных классов проблем создавайте подклассы \`Error\` — их можно различать через \`instanceof\`, у них бесплатные \`message\` и \`stack\`. Никогда не делайте \`throw "строка"\` или \`throw { code: 1 }\` — теряется стек и ломаются catch-фильтры.`,
      },
      {
        kind: "code",
        title: "Классы ошибок",
        code: `class ValidationError extends Error {
  constructor(field) {
    super("Поле " + field + " заполнено неверно");
    this.name = "ValidationError";
    this.field = field;
  }
}

try {
  throw new ValidationError("email");
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Валидация:", err.message, "— поле", err.field);
  } else {
    throw err; // не наша ошибка — пробрасываем выше
  }
}`,
      },
      {
        kind: "warn",
        title: "await забывается",
        md: `Вызвали \`async\`-функцию без \`await\` — получили «висящий» промис: ошибка уйдёт в unhandledrejection, а код пойдёт дальше, не дождавшись результата. Линтеры ловят это правилом \`no-floating-promises\`.`,
      },
    ],
    quiz: [
      {
        q: "Что всегда возвращает async-функция?",
        options: ["undefined", "Promise", "callback", "Generator"],
        answer: 1,
        explain: "Даже return 42 внутри async-функции оборачивается в Promise, разрешающийся значением 42.",
      },
      {
        q: "Что делает await?",
        options: [
          "Блокирует весь поток до результата",
          "Приостанавливает только async-функцию до settling промиса",
          "Конвертирует значение в промис",
          "Повторяет запрос при ошибке",
        ],
        answer: 1,
        explain: "await не блокирует поток — остальной код (event loop) продолжает работать, продолжение функции попадёт в очередь микрозадач.",
      },
    ],
    tasks: [
      {
        id: "m6t1",
        title: "Параллельная загрузка",
        md: `В песочнице доступна \`load(id)\` — «база данных»: асинхронно возвращает \`{ id, name: 'Юзер <id>' }\` с задержкой. Реализуйте \`getAll(ids)\`, которая загружает всех **параллельно** (Promise.all + map) и возвращает массив объектов **в порядке ids**.`,
        starter: `// доступна: async load(id) → { id, name }
async function getAll(ids) {
  // Promise.all + map
}

const users = await getAll([3, 1, 2]);
console.log(users.map((u) => u.name));`,
        tests: `
await __test("возвращает в порядке ids", async () => {
  const users = await getAll([3, 1, 2]);
  return users.map((u) => u.id);
}, [3, 1, 2]);
await __test("содержимое корректно", async () => {
  const users = await getAll([5]);
  return users;
}, [{ id: 5, name: "Юзер 5" }]);
await __test("пустой массив", async () => await getAll([]), []);`,
        solution: `async function getAll(ids) {
  return Promise.all(ids.map((id) => load(id)));
}`,
      },
      {
        id: "m6t2",
        title: "Таймаут для промиса",
        md: `Реализуйте \`withTimeout(promise, ms)\`: если \`promise\` успевает за \`ms\` — возвращает его значение; иначе **отклоняется** с \`new Error("timeout")\`. Подсказка: \`Promise.race\`.`,
        starter: `function withTimeout(promise, ms) {
  // Promise.race
}

try {
  const fast = await withTimeout(sleep(10).then(() => "успел"), 100);
  console.log(fast);
} catch (e) { console.log(e.message); }

try {
  await withTimeout(sleep(200).then(() => "не успею"), 30);
} catch (e) {
  console.log("поймали:", e.message);
}`,
        tests: `
await __test("быстрый промис проходит", async () => await withTimeout(sleep(10).then(() => "ok"), 100), "ok");
await __test("медленный отклоняется с 'timeout'", async () => {
  try {
    await withTimeout(sleep(200), 30);
    return "не упало";
  } catch (e) {
    return e.message;
  }
}, "timeout");
await __test("значение ошибки — Error", async () => {
  try {
    await withTimeout(sleep(200), 20);
    return false;
  } catch (e) {
    return e instanceof Error;
  }
}, true);`,
        solution: `function withTimeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), ms)
  );
  return Promise.race([promise, timer]);
}`,
      },
    ],
  },

  {
    id: "m7",
    title: "Модули и организация кода",
    subtitle: "import/export, ESM, структура проекта",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `Когда кода становится много, его делят на **модули** — файлы со своей областью видимости. Современный стандарт — **ES Modules (ESM)**:

- \`export\` — «вывесить наружу»: именованный (\`export const\`, \`export function\`) или \`export default\` (один на модуль)
- \`import { name } from './file.js'\` — взять именованный экспорт
- \`import Default from './file.js'\` — взять default (имя любое)
- \`export * from\` / \`import * as ns\` — реэкспорт и пространства имён

Импорты **статические**: движок читает их до выполнения кода, поднимает (hoisting) и может удалить неиспользуемые (tree-shaking).`,
      },
      {
        kind: "code",
        title: "Так выглядит ESM (запуск не требуется)",
        norun: true,
        code: `// utils.js
export const VERSION = "1.0.0";

export function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

export default class Logger {
  log(msg) { console.log("[" + VERSION + "]", msg); }
}

// app.js
import Logger, { clamp, VERSION } from "./utils.js";
import * as utils from "./utils.js"; // всё под одним именем`,
      },
      {
        kind: "text",
        md: `## Экосистема

- \`package.json\` — манифест проекта: зависимости, скрипты, \`"type": "module"\` включает ESM в Node
- \`npm install\` кладёт пакеты в \`node_modules\`, импорт — просто по имени пакета
- **Сборщики** (Vite, esbuild) склеивают модули для браузера, минифицируют и режут код на чанки — ленивую загрузку по требованию
- Динамический импорт \`const m = await import('./heavy.js')\` — загрузка модуля **в рантайме**, основа code splitting`,
      },
      {
        kind: "tip",
        title: "Структура без фанатизма",
        md: `Хороший модуль — **один файл = одна ответственность**, понятное имя, маленький публичный API. Внутренние хелперы не экспортируйте: меньше поверхность — меньше связанных багов.`,
      },
      {
        kind: "warn",
        title: "Циклические импорты",
        md: `Если \`a.js\` импортирует \`b.js\`, а \`b.js\` импортирует \`a.js\` — получите частично инициализированные модули и загадочные \`undefined\`. Лечение: вынести общее в третий модуль или пересмотреть границы ответственности.`,
      },
    ],
    quiz: [
      {
        q: "Сколько default-экспортов может быть в модуле?",
        options: ["Сколько угодно", "Ровно один", "Ни одного — они устарели", "Только в Node.js"],
        answer: 1,
        explain: "export default — один на модуль. Именованных экспортов — сколько угодно.",
      },
      {
        q: "Когда выполняются import-объявления?",
        options: [
          "В момент, когда поток кода дошёл до строки",
          "До выполнения кода модуля — статически",
          "При первом использовании",
          "Только после await",
        ],
        answer: 1,
        explain: "Импорты поднимаются и резолвятся до выполнения тела модуля — поэтому import в середине файла всё равно «сверху».",
      },
    ],
    tasks: [
      {
        id: "m7t1",
        title: "Модульный паттерн",
        md: `До ESM приватность достигали замыканиями. Реализуйте \`createModule()\` — возвращает объект-«модуль»:
- поле \`version\` со значением \`"1.0.0"\` (только чтение — менять снаружи нельзя: используйте \`Object.freeze\`)
- метод \`greet(name)\` → \`"Модуль v1.0.0 приветствует, <name>!"\`
- внутренняя переменная \`secret\`, до которой **нельзя** добраться снаружи (в объекте её нет)`,
        starter: `function createModule() {
  // замыкание + freeze
}

const mod = createModule();
console.log(mod.greet("Ада"));
mod.version = "9.9.9";
console.log(mod.version); // 1.0.0 — заморожен`,
        tests: `
await __test("version доступен", () => createModule().version, "1.0.0");
await __test("greet работает", () => createModule().greet("Ада"), "Модуль v1.0.0 приветствует, Ада!");
await __test("version заморожен", () => {
  const m = createModule();
  m.version = "взлом";
  return m.version;
}, "1.0.0");
await __test("secret не торчит наружу", () => "secret" in createModule(), false);`,
        solution: `function createModule() {
  const secret = "s3cr3t"; // живёт только в замыкании
  return Object.freeze({
    version: "1.0.0",
    greet(name) {
      return "Модуль v1.0.0 приветствует, " + name + "!";
    },
  });
}`,
      },
      {
        id: "m7t2",
        title: "Глубокое слияние конфигов",
        md: `Реализуйте \`deepMerge(target, source)\` — рекурсивно сливает два объекта: скаляры из \`source\` перезаписывают, вложенные **plain**-объекты сливаются, массивы и null — перезаписываются целиком. Возвращает **новый** объект.`,
        starter: `function deepMerge(target, source) {
  // рекурсия
}

console.log(
  deepMerge(
    { ui: { theme: "light", size: 14 }, debug: false },
    { ui: { theme: "dark" }, version: 2 }
  )
);`,
        tests: `
await __test("вложенное слияние", () =>
  deepMerge({ ui: { theme: "light", size: 14 }, debug: false }, { ui: { theme: "dark" }, version: 2 }),
  { ui: { theme: "dark", size: 14 }, debug: false, version: 2 });
await __test("массивы перезаписываются", () =>
  deepMerge({ list: [1, 2] }, { list: [3] }), { list: [3] });
await __test("исходники не мутируют", () => {
  const t = { a: { b: 1 } };
  const s = { a: { c: 2 } };
  deepMerge(t, s);
  return [t, s];
}, [{ a: { b: 1 } }, { a: { c: 2 } }]);
await __test("null перезаписывает объект", () =>
  deepMerge({ x: { deep: true } }, { x: null }), { x: null });`,
        solution: `function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const tv = target[key];
    const sv = source[key];
    const bothPlain =
      tv && sv &&
      typeof tv === "object" && typeof sv === "object" &&
      !Array.isArray(tv) && !Array.isArray(sv);
    result[key] = bothPlain ? deepMerge(tv, sv) : sv;
  }
  return result;
}`,
      },
    ],
  },
];
