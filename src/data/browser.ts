import type { Lesson } from "../lib/types";

export const browserLessons: Lesson[] = [
  {
    id: "b1",
    title: "Браузерное окружение и DOM",
    subtitle: "Дерево документа, навигация, поиск, узлы, атрибуты и свойства",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `До сих пор код жил в «вакууме» движка. В браузере JavaScript получает **окружение**: глобальный объект \`window\`, DOM, события, сеть. Сам язык описывает спецификация **ECMA-262**, а браузерные возможности — **Web IDL**-интерфейсы (DOM Living Standard, HTML Living Standard). Совместимость сверяют на MDN и caniuse.com.

**DOM (Document Object Model)** — представление HTML-документа в виде дерева объектов. Каждый тег — **узел-элемент**, текст — текстовый узел, комментарий — тоже узел. Корень — \`document\`, его дети — \`documentElement\` (\`<html>\`), затем \`<head>\` и \`<body>\`.

Примеры ниже запускаются в настоящем браузере (в изолированном iframe) — кликайте и наблюдайте консоль.`,
      },
      {
        kind: "browser",
        title: "dom-tree.html",
        presets: [
          {
            name: "дерево и навигация",
            code: `<h1>Привет, DOM!</h1>
<ul id="list">
  <li>первый</li>
  <li>второй</li>
</ul>
<script>
  console.log(document.documentElement.nodeName); // HTML
  console.log("детей у body: " + document.body.children.length);

  const list = document.getElementById("list");
  console.log(list.children[0].textContent); // "первый"
  console.log(list.firstElementChild === list.children[0]); // true
  console.log(list.lastElementChild.previousElementSibling.textContent); // "первый"
</script>`,
          },
          {
            name: "поиск элементов",
            code: `<div class="card red">А</div>
<div class="card blue">Б</div>
<div class="card red">В</div>
<script>
  // querySelectorAll — снапшот по любому CSS-селектору
  const all = document.querySelectorAll(".card");
  console.log("всего карточек: " + all.length);
  console.log(document.querySelector(".card.red").textContent); // "А" — первый

  // getElementsBy* — ЖИВАЯ коллекция
  const live = document.getElementsByClassName("card");
  document.querySelector(".card.blue").remove();
  console.log("живая коллекция: " + live.length); // 2 — обновилась сама
  console.log("снапшот: " + all.length);          // 3 — не изменился
</script>`,
          },
          {
            name: "атрибуты и свойства",
            code: `<input id="name" value="Ада" />
<p><a id="link" href="/home" data-role="nav">Домой</a></p>
<script>
  const input = document.getElementById("name");
  console.log("свойство value: " + input.value);                 // Ада
  console.log("атрибут value:  " + input.getAttribute("value")); // Ада

  input.value = "Грейс"; // поменяли СВОЙСТВО
  console.log("атрибут после:  " + input.getAttribute("value")); // всё ещё "Ада"!

  const link = document.getElementById("link");
  console.log("dataset: " + link.dataset.role); // nav — из data-role
  link.setAttribute("aria-label", "на главную");
  console.log(link.getAttribute("aria-label"));
</script>`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Навигация по дереву

У каждого узла есть указатели на соседей. Современные — только по **элементам** (без текстовых узлов):

- вверх: \`parentNode\`, \`closest('селектор')\` — ближайший подходящий предок (включая себя)
- вниз: \`children\` (HTMLCollection), \`firstElementChild\`, \`lastElementChild\`
- вбок: \`nextElementSibling\`, \`previousElementSibling\`

Старые \`childNodes\`, \`firstChild\` учитывают и текст — в реальном коде почти всегда нужны именно \`Element\`-варианты.`,
      },
      {
        kind: "text",
        md: `## Свойства узлов

- \`nodeType\` — числовой тип: \`1\` элемент, \`3\` текст, \`8\` комментарий
- \`tagName\` — имя тега ЗАГЛАВНЫМИ (\`"DIV"\`); у неэлементов есть \`nodeName\`
- \`innerHTML\` — HTML внутри элемента; \`textContent\` — только текст; у \`<input>\` — \`value\`

## Атрибуты против свойств

Атрибуты живут в HTML, свойства — в DOM-объекте. Браузер синхронизирует их, но не всегда: стандартные атрибуты отражаются в свойствах, пользовательские — только через \`getAttribute\` и \`dataset\` (для \`data-*\`). Изменение свойства \`input.value\` не меняет атрибут — поэтому состояние формы читают через свойства.`,
      },
      {
        kind: "warn",
        title: "innerHTML и XSS",
        md: `Всё, что попадает в \`innerHTML\`, исполняется как разметка: \`el.innerHTML = userInput\` — классическая дыра для внедрения чужих скриптов. Пользовательский текст вставляйте через \`textContent\` (он экранирует всё) или экранируйте вручную.`,
      },
      {
        kind: "tip",
        title: "querySelector — ваш основной инструмент",
        md: `Полная мощь CSS-селекторов: \`document.querySelector('form input[name="email"]:invalid')\` — одним выражением. \`getElementsBy*\` оставьте легаси-коду, кроме случаев, когда нужна именно живая коллекция.`,
      },
    ],
    quiz: [
      {
        q: "Чему равен nodeType у элемента?",
        options: ["0", "1", "3", "8"],
        answer: 1,
        explain: "1 — элемент, 3 — текст, 8 — комментарий. Проверка: el.nodeType === Node.ELEMENT_NODE.",
      },
      {
        q: "Чем getElementsByClassName отличается от querySelectorAll?",
        options: [
          "Ничем, это алиасы",
          "Возвращает живую коллекцию, обновляющуюся при изменении DOM",
          "Работает быстрее во всех случаях",
          "Принимает только классы без точки",
        ],
        answer: 1,
        explain: "Коллекции getElementsBy* живые: удалили элемент — длина изменилась. querySelectorAll возвращает снимок.",
      },
      {
        q: "Пользователь ввёл текст в <input value='Ада'>, изменив input.value. Что вернёт getAttribute('value')?",
        options: ["Новое значение", "Старое — 'Ада'", "null", "undefined"],
        answer: 1,
        explain: "Атрибут хранит исходное значение из HTML; текущее состояние — в свойстве value.",
      },
    ],
    tasks: [
      {
        id: "b1t1",
        title: "Экранирование HTML",
        md: `Реализуйте \`escapeHtml(str)\` — защитный аналог \`textContent\`: замените \`&\`, \`<\`, \`>\`, \`"\`, \`'\` на сущности \`&amp;\`, \`&lt;\`, \`&gt;\`, \`&quot;\`, \`&#39;\` (именно в таком порядке, \`&\` — первым).`,
        starter: `function escapeHtml(str) {
  // replace-цепочка, & первым!
}

console.log(escapeHtml('<b>"Цитата" & \'апостроф\'</b>'));`,
        tests: `
await __test("теги и кавычки", () => escapeHtml('<b>"Цитата" & \'апостроф\'</b>'), "&lt;b&gt;&quot;Цитата&quot; &amp; &#39;апостроф&#39;&lt;/b&gt;");
await __test("чистый текст не меняется", () => escapeHtml("просто текст"), "просто текст");
await __test("двойное экранирование &", () => escapeHtml("&amp;"), "&amp;amp;");
await __test("пустая строка", () => escapeHtml(""), "");`,
        solution: `function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}`,
      },
      {
        id: "b1t2",
        title: "Сборщик classList",
        md: `Реализуйте \`classNames(...items)\` — мини-аналог популярной библиотеки: соберите строку классов из аргументов, **отбросив** всё falsy (\`null\`, \`undefined\`, \`""\`, \`false\`, \`0\`). \`classNames("btn", isActive && "btn-active", "x")\` — обычный паттерн в UI-коде.`,
        starter: `function classNames(...items) {
  // filter + join
}

const isActive = true;
console.log(classNames("btn", isActive && "btn-active", "x", null, "", false));`,
        tests: `
await __test("базовый сбор", () => classNames("btn", "btn-active", "x"), "btn btn-active x");
await __test("falsy отбрасываются", () => classNames("btn", null, "", undefined, false, 0, "ok"), "btn ok");
await __test("паттерн с условием", () => {
  const on = false;
  return classNames("tab", on && "tab-on");
}, "tab");
await __test("пусто", () => classNames(), "");`,
        solution: `function classNames(...items) {
  return items.filter(Boolean).join(" ");
}`,
      },
    ],
  },

  {
    id: "b2",
    title: "Изменение документа, стили, геометрия",
    subtitle: "createElement, classList, размеры, прокрутка и координаты",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Создание и вставка

- \`document.createElement('div')\` + \`textContent\`/\`append\` — безопасный путь
- \`parent.append / prepend / before / after / replaceWith\` — современные вставки
- \`el.insertAdjacentHTML(where, html)\` — вставка HTML-строки: \`'beforebegin'\`, \`'afterbegin'\`, \`'beforeend'\`, \`'afterend'\`
- \`el.remove()\` — удаление; \`el.cloneNode(true)\` — глубокая копия`,
      },
      {
        kind: "browser",
        title: "live-list.html",
        presets: [
          {
            name: "живой список",
            code: `<button id="add">+ Добавить задачу</button>
<ol id="todo"></ol>
<script>
  const todo = document.getElementById("todo");
  todo.insertAdjacentHTML("afterbegin", "<li>срочное (вставлено в начало)</li>");

  document.getElementById("add").addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = "задача " + (todo.children.length + 1);
    todo.append(li);
    console.log("элементов в списке: " + todo.children.length);
  });
</script>`,
          },
          {
            name: "classlist и стили",
            code: `<style>
  .box { width: 90px; height: 60px; border-radius: 8px; background: #23406e;
         transition: 0.25s; margin-bottom: 10px; }
  .box.hot { background: #ff7a5c; transform: rotate(6deg) scale(1.1); }
</style>
<div id="box" class="box"></div>
<button id="toggle">переключить .hot</button>
<script>
  const box = document.getElementById("box");
  document.getElementById("toggle").addEventListener("click", () => {
    box.classList.toggle("hot");           // add/remove/contains — вся семейка
    console.log("class=" + box.className + ", hot: " + box.classList.contains("hot"));
  });
  // вычисленные стили — то, что реально нарисовано
  console.log("computed bg: " + getComputedStyle(box).backgroundColor);
</script>`,
          },
          {
            name: "геометрия и прокрутка",
            code: `<style>
  .scroll { width: 230px; height: 90px; overflow: auto; border: 1px solid #35507f; }
  .inner { height: 400px; padding: 10px; }
</style>
<div class="scroll" id="sc"><div class="inner">прокрутите меня ↓</div></div>
<p><button id="where">измерить</button></p>
<script>
  const sc = document.getElementById("sc");
  sc.addEventListener("scroll", () => {
    console.log("scrollTop: " + Math.round(sc.scrollTop) + " из " + (sc.scrollHeight - sc.clientHeight));
  });
  document.getElementById("where").addEventListener("click", () => {
    const r = sc.getBoundingClientRect();
    console.log("getBoundingClientRect: " + Math.round(r.width) + "x" + Math.round(r.height));
    console.log("clientWidth (без полосы прокрутки): " + sc.clientWidth);
    console.log("окно: " + innerWidth + "x" + innerHeight + ", scrollY: " + scrollY);
  });
</script>`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Стили: два способа

- \`classList\` (\`add/remove/toggle/contains\`) — для готовых CSS-классов; **предпочтительный** путь: стили живут в CSS
- \`style.cssText\` / \`style.color\` — инлайновые стили для вычисляемых значений

\`getComputedStyle(el)\` возвращает финальные, применённые браузером значения (с учётом каскада, медиа-запросов и т.д.).

## Геометрия

- \`offsetWidth/Height\` — элемент целиком, **с** рамками и полосой прокрутки
- \`clientWidth/Height\` — содержимое **с** padding, **без** рамок и полосы прокрутки
- \`scrollWidth/Height\` — полный размер содержимого, включая невидимое
- \`scrollTop/scrollLeft\` — сколько прокручено (единственные изменяемые: \`el.scrollTop = 100\`)
- \`getBoundingClientRect()\` — координаты и размер **относительно вьюпорта**

## Координаты

События мыши дают две системы: \`clientX/Y\` — от угла вьюпорта, \`pageX/Y\` — от угла документа (с учётом прокрутки). Для позиционирования всплывашек обычно нужны client-координаты + \`position: fixed\`.`,
      },
      {
        kind: "warn",
        title: "Скрытые элементы не имеют геометрии",
        md: `У элемента с \`display: none\` все метрики равны нулю: нельзя измерить то, чего нет в раскладке. Если нужно измерить «спрятанное» — временно показывайте с \`position: absolute; visibility: hidden\`, измеряйте, прячьте обратно.`,
      },
      {
        kind: "tip",
        title: "Прокрутка без дёрганий",
        md: `\`el.scrollTo({ top: 0, behavior: "smooth" })\` — плавная прокрутка одной строкой. А для «бесконечных лент» слушайте \`scroll\` и сравнивайте \`scrollTop + clientHeight\` с \`scrollHeight\` — классическая формула «доехали до низа».`,
      },
    ],
    quiz: [
      {
        q: "Куда вставит insertAdjacentHTML('afterbegin', html)?",
        options: [
          "Перед элементом",
          "Внутрь элемента, в начало",
          "Внутрь элемента, в конец",
          "После элемента",
        ],
        answer: 1,
        explain: "afterbegin — внутрь в начало; beforebegin — перед; beforeend — внутрь в конец; afterend — после.",
      },
      {
        q: "Какая метрика НЕ включает рамки и полосу прокрутки, но включает padding?",
        options: ["offsetWidth", "clientWidth", "scrollWidth", "getBoundingClientRect().width"],
        answer: 1,
        explain: "clientWidth = содержимое + padding. offsetWidth добавляет рамки и scrollbar, rect.width = offsetWidth.",
      },
      {
        q: "Чем classList.toggle отличается от add?",
        options: [
          "Ничем",
          "Добавляет класс, если его нет, и убирает, если есть",
          "Работает только с одним классом",
          "Удаляет все классы",
        ],
        answer: 1,
        explain: "toggle переключает и возвращает boolean — есть ли класс теперь. Идеален для кнопок-переключателей.",
      },
    ],
    tasks: [
      {
        id: "b2t1",
        title: "Прогресс прокрутки",
        md: `Реализуйте \`scrollProgress(scrollTop, clientHeight, scrollHeight)\` — процент прокрутки 0–100 (целое число). Формула из реального UI: \`scrollTop / (scrollHeight - clientHeight) * 100\`. Если знаменатель \`<= 0\` (контент не прокручивается) — вернуть \`100\`. Результат ограничьте диапазоном.`,
        starter: `function scrollProgress(scrollTop, clientHeight, scrollHeight) {
  // формула + clamp
}

console.log(scrollProgress(150, 300, 600)); // 50`,
        tests: `
await __test("середина", () => scrollProgress(150, 300, 600), 50);
await __test("начало", () => scrollProgress(0, 300, 600), 0);
await __test("конец", () => scrollProgress(300, 300, 600), 100);
await __test("непрокручиваемый контент", () => scrollProgress(0, 500, 400), 100);
await __test("округление", () => scrollProgress(100, 300, 600), 33);`,
        solution: `function scrollProgress(scrollTop, clientHeight, scrollHeight) {
  const max = scrollHeight - clientHeight;
  if (max <= 0) return 100;
  const p = (scrollTop / max) * 100;
  return Math.round(Math.min(100, Math.max(0, p)));
}`,
      },
      {
        id: "b2t2",
        title: "Центр прямоугольника",
        md: `Реализуйте \`rectCenter(rect)\`: на вход объект вида \`{ x, y, width, height }\` (как \`getBoundingClientRect\`), на выход — \`{ cx, cy }\`, центр, округлённый до целого.`,
        starter: `function rectCenter(rect) {
  // ваш код
}

console.log(rectCenter({ x: 10, y: 20, width: 100, height: 50 }));`,
        tests: `
await __test("базовый", () => rectCenter({ x: 10, y: 20, width: 100, height: 50 }), { cx: 60, cy: 45 });
await __test("отрицательные координаты", () => rectCenter({ x: -20, y: -10, width: 40, height: 20 }), { cx: 0, cy: 0 });
await __test("нулевой размер", () => rectCenter({ x: 5, y: 5, width: 0, height: 0 }), { cx: 5, cy: 5 });`,
        solution: `function rectCenter(rect) {
  return {
    cx: Math.round(rect.x + rect.width / 2),
    cy: Math.round(rect.y + rect.height / 2),
  };
}`,
      },
    ],
  },

  {
    id: "b3",
    title: "События: всплытие, делегирование, UI",
    subtitle: "addEventListener, target, CustomEvent, мышь, клавиатура, drag'n'drop",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Введение в события

Событие — сигнал о том, что что-то произошло: клик, ввод, прокрутка, ответ сервера. Подписка: \`el.addEventListener('click', handler)\`, отписка — \`removeEventListener\` **с той же ссылкой** на функцию.

Обработчик получает **объект события**: \`e.type\`, \`e.target\` (элемент, где произошло), \`e.currentTarget\` (элемент, на котором висит обработчик), \`e.preventDefault()\`, \`e.stopPropagation()\`.

## Всплытие и погружение

Клик на вложенной кнопке проходит три фазы: **погружение** (window → target, по умолчанию скрыто), **target**, **всплытие** (target → window). Большинство обработчиков слушают всплытие — поэтому событие кнопки «слышат» и все предки.`,
      },
      {
        kind: "browser",
        title: "events.html",
        presets: [
          {
            name: "всплытие",
            code: `<style>
  .outer { padding: 14px; border: 1px solid #35507f; }
  .inner { padding: 14px; border: 1px dashed #5777ad; }
  button { margin-top: 8px; }
</style>
<div class="outer" id="outer">внешний
  <div class="inner" id="inner">внутренний
    <button id="btn">кнопка</button>
  </div>
</div>
<script>
  for (const id of ["outer", "inner", "btn"]) {
    document.getElementById(id).addEventListener("click", (e) => {
      console.log(id + ": target=" + e.target.tagName + ", currentTarget=" + e.currentTarget.tagName);
    });
  }
  // кликните кнопку: сработают все три обработчика — событие всплывает
</script>`,
          },
          {
            name: "делегирование",
            code: `<ul id="palette" style="display:flex;gap:6px;list-style:none;padding:0">
  <li><button data-color="mint">мята</button></li>
  <li><button data-color="coral">коралл</button></li>
  <li><button data-color="sky">небо</button></li>
</ul>
<output id="out">выбрано: —</output>
<script>
  // ОДИН обработчик на контейнере вместо трёх на кнопках
  document.getElementById("palette").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-color]");
    if (!btn) return; // клик мимо кнопки
    document.getElementById("out").textContent = "выбрано: " + btn.dataset.color;
    console.log("цвет: " + btn.dataset.color);
  });
</script>`,
          },
          {
            name: "клавиатура + CustomEvent",
            code: `<input id="field" placeholder="печатайте и жмите Enter" />
<div id="feed" style="margin-top:8px;color:#7ee787"></div>
<script>
  const field = document.getElementById("field");
  field.addEventListener("keydown", (e) => {
    console.log("keydown: code=" + e.code + ", key=" + e.key);
    if (e.key === "Enter") {
      // собственное событие с данными
      field.dispatchEvent(new CustomEvent("message:send", {
        bubbles: true,
        detail: { text: field.value },
      }));
      field.value = "";
    }
  });
  document.addEventListener("message:send", (e) => {
    console.log("поймано message:send, текст: " + e.detail.text);
    document.getElementById("feed").textContent = "лента: " + e.detail.text;
  });
</script>`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Делегирование

Вместо слушателя на каждом элементе списка — **один** на общем предке: из \`e.target\` через \`closest(селектор)\` находим, во что был клик. Преимущества: меньше обработчиков, динамические элементы работают «из коробки».

## Действия по умолчанию

Браузер умеет сам: переход по ссылке, отправка формы, выделение текста. \`e.preventDefault()\` отменяет это (внутри — не меняет событие, а блокирует реакцию браузера). Для скролла и touch есть \`passive: true\` — обещание не вызывать preventDefault, дающее браузеру право прокручивать без задержек.

## Генерация событий

\`new CustomEvent("имя", { detail, bubbles: true })\` + \`el.dispatchEvent(event)\` — свои события для архитектуры: компоненты общаются сигналами, не зная друг о друге.`,
      },
      {
        kind: "text",
        md: `## Интерфейсные события

- **Мышь**: \`click\`, \`dblclick\`, \`contextmenu\`. \`mouseover/mouseout\` **всплывают** и срабатывают при переходе на детей; \`mouseenter/mouseleave\` — не всплывают и игнорируют детей (удобны для «подсветки карточки»)
- **Клавиатура**: \`keydown\`/\`keyup\`. \`e.code\` — физическая клавиша (\`"KeyW"\`, не зависит от раскладки), \`e.key\` — символ (\`"ц"\`). Модификаторы: \`e.ctrlKey\`, \`e.shiftKey\`, \`e.altKey\`, \`e.metaKey\`
- **Указатель**: \`pointerdown/up/move\` — унифицируют мышь, палец и стилус; для touch-сценариев берите их, а не mouse*
- **Drag'n'Drop**: скелет — \`dragstart\` на перетаскиваемом (\`e.dataTransfer.setData\`), \`dragover\` на цели **с обязательным preventDefault** (иначе бросок запрещён), \`drop\` — читаем данные
- **Прокрутка**: \`scroll\` на элементе/window; отменить прокрутку нельзя, только предотвратить её причины`,
      },
      {
        kind: "code",
        title: "Скелет drag'n'drop (запуск не требуется)",
        norun: true,
        code: `// перетаскиваемый элемент
el.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", el.id);
});

// зона сброса
zone.addEventListener("dragover", (e) => {
  e.preventDefault(); // КРИТИЧНО: разрешает drop
});
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  zone.append(document.getElementById(id));
});`,
      },
      {
        kind: "warn",
        title: "target против currentTarget",
        md: `При всплытии \`e.target\` — это **изначальная** цель клика (вложенный \`<span>\` внутри кнопки!), а \`e.currentTarget\` — элемент текущего обработчика. Поэтому в делегировании ищут \`e.target.closest(...)\`, а не предполагают, что target и есть кнопка.`,
      },
    ],
    quiz: [
      {
        q: "Как движется событие по умолчанию?",
        options: [
          "Только на целевом элементе",
          "Сверху вниз (погружение) и останавливается",
          "От цели вверх по предкам (всплытие)",
          "Случайным образом",
        ],
        answer: 2,
        explain: "По умолчанию обработчики слушают фазу всплытия: событие поднимается от target к window. Погружение есть, но скрыто (нужен capture: true).",
      },
      {
        q: "Что делает e.preventDefault()?",
        options: [
          "Останавливает всплытие",
          "Отменяет встроенное действие браузера (переход, отправку формы…)",
          "Удаляет обработчик",
          "Генерирует новое событие",
        ],
        answer: 1,
        explain: "preventDefault отменяет поведение браузера. За всплытие отвечает stopPropagation — не путайте.",
      },
      {
        q: "Почему mouseenter лучше mouseover для «подсветки карточки»?",
        options: [
          "Он быстрее",
          "Не срабатывает повторно при движении по дочерним элементам",
          "Работает на touch-устройствах",
          "Всплывает до document",
        ],
        answer: 1,
        explain: "mouseover/out всплывают и стреляют на каждом переходе между детьми — подсветка мигает. mouseenter/leave видят элемент как целое.",
      },
    ],
    tasks: [
      {
        id: "b3t1",
        title: "Игнорировать ли клик?",
        md: `Реализуйте \`shouldIgnoreClick(e)\` — стандартный guard обработчика «настоящего клика»: вернуть \`true\`, если \`e.button !== 0\` (не левая кнопка) **или** зажат любой модификатор (\`ctrlKey\`, \`metaKey\`, \`shiftKey\`, \`altKey\`). Иначе \`false\`.`,
        starter: `function shouldIgnoreClick(e) {
  // ваш код
}

console.log(shouldIgnoreClick({ button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false })); // false`,
        tests: `
await __test("обычный клик не игнорируем", () =>
  shouldIgnoreClick({ button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false }), false);
await __test("правая кнопка игнорируется", () =>
  shouldIgnoreClick({ button: 2, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false }), true);
await __test("ctrl+клик игнорируется", () =>
  shouldIgnoreClick({ button: 0, ctrlKey: true, metaKey: false, shiftKey: false, altKey: false }), true);
await __test("meta (cmd) игнорируется", () =>
  shouldIgnoreClick({ button: 0, ctrlKey: false, metaKey: true, shiftKey: false, altKey: false }), true);`,
        solution: `function shouldIgnoreClick(e) {
  return e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
}`,
      },
      {
        id: "b3t2",
        title: "Человекочитаемая комбинация",
        md: `Реализуйте \`formatKey(e)\`: из объекта с полями \`ctrlKey\`, \`altKey\`, \`shiftKey\`, \`metaKey\`, \`key\` соберите строку вида \`"Ctrl+Shift+K"\`. Порядок модификаторов: Ctrl, Alt, Shift, Meta. \`key\` добавляйте как есть.`,
        starter: `function formatKey(e) {
  // фильтр модификаторов + join
}

console.log(formatKey({ ctrlKey: true, altKey: false, shiftKey: true, metaKey: false, key: "K" }));`,
        tests: `
await __test("Ctrl+Shift+K", () =>
  formatKey({ ctrlKey: true, altKey: false, shiftKey: true, metaKey: false, key: "K" }), "Ctrl+Shift+K");
await __test("голый Enter", () =>
  formatKey({ ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, key: "Enter" }), "Enter");
await __test("полный порядок", () =>
  formatKey({ ctrlKey: true, altKey: true, shiftKey: true, metaKey: true, key: "S" }), "Ctrl+Alt+Shift+Meta+S");
await __test("только Alt", () =>
  formatKey({ ctrlKey: false, altKey: true, shiftKey: false, metaKey: false, key: "F4" }), "Alt+F4");`,
        solution: `function formatKey(e) {
  const mods = [];
  if (e.ctrlKey) mods.push("Ctrl");
  if (e.altKey) mods.push("Alt");
  if (e.shiftKey) mods.push("Shift");
  if (e.metaKey) mods.push("Meta");
  return [...mods, e.key].join("+");
}`,
      },
    ],
  },

  {
    id: "b4",
    title: "Формы, фокус и буфер обмена",
    subtitle: "elements, focus/blur, input и change, submit, clipboard",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Формы: свойства и методы

- \`document.forms\` — все формы; \`document.forms.my\` или \`document.forms[0]\` — по \`name\` или индексу
- \`form.elements\` — коллекция контролов; именованные доступны напрямую: \`form.login\`
- У контрола есть обратная ссылка \`element.form\`
- \`new FormData(form)\` — итератор пар \`[имя, значение]\`; в JSON — через \`Object.fromEntries\`

## Фокусировка

\`focus()\`/\`blur()\` — программно; события \`focus\`/\`blur\` **не всплывают**, их всплывающие аналоги — \`focusin\`/\`focusout\` (удобно для делегирования). Атрибут \`tabindex\` делает фокусируемым любой элемент и задаёт порядок Tab.`,
      },
      {
        kind: "browser",
        title: "form.html",
        presets: [
          {
            name: "живая форма",
            code: `<form id="f">
  <p><input name="login" placeholder="логин" /></p>
  <p><input name="pass" type="password" placeholder="пароль" /></p>
  <p><label><input type="checkbox" name="remember" /> запомнить</label></p>
  <button>Отправить</button>
</form>
<script>
  const form = document.getElementById("f");

  form.addEventListener("focusin", (e) => console.log("фокус: " + e.target.name));
  form.addEventListener("input", (e) => {
    if (e.target.name) console.log("input: " + e.target.name + " = " + e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // без этого страница перезагрузилась бы
    const data = Object.fromEntries(new FormData(form));
    console.log("submit: " + JSON.stringify(data));
  });
</script>`,
          },
          {
            name: "буфер обмена",
            code: `<textarea id="t" rows="3" cols="32">выделите меня и нажмите Ctrl+C</textarea>
<script>
  const t = document.getElementById("t");

  t.addEventListener("copy", (e) => {
    const sel = t.value.substring(t.selectionStart, t.selectionEnd);
    console.log("copy: выделено «" + sel + "»");
    e.preventDefault(); // перехватываем и меняем содержимое буфера
    e.clipboardData.setData("text/plain", sel.toUpperCase());
    console.log("в буфер записано заглавными");
  });

  document.addEventListener("paste", (e) => {
    console.log("paste: «" + e.clipboardData.getData("text/plain") + "»");
  });
</script>`,
          },
        ],
      },
      {
        kind: "text",
        md: `## События изменения

- \`input\` — **на каждый** ввод символа (живой поиск, маски, счётчики)
- \`change\` — когда значение **зафиксировано**: у текста — при потере фокуса, у чекбоксов/селектов — сразу
- \`cut\` / \`copy\` / \`paste\` — события \`ClipboardEvent\`; через \`e.clipboardData\` можно читать и **подменять** содержимое буфера (с \`preventDefault\`)

## Отправка формы

Событие \`submit\` возникает при Enter в поле или клике по кнопке. \`form.submit()\` — программная отправка — событие **не** генерирует (считается, что скрипт и так в курсе). Валидация: встроенная через атрибуты (\`required\`, \`pattern\`, \`min/max\`) + \`form.reportValidity()\`; тонкая — \`setCustomValidity(текст)\`.`,
      },
      {
        kind: "warn",
        title: "Клиентская валидация — UX, а не защита",
        md: `Любые проверки в браузере обходятся за минуту (devtools → отключить атрибуты). Сервер обязан валидировать **всё заново**. Клиентские проверки существуют, чтобы пользователю было удобно, а не чтобы данные были безопасны.`,
      },
      {
        kind: "tip",
        title: "Автокомплит без боли",
        md: `Для «живых» полей используйте \`input\`, а не \`change\`. Дебаунс из урока про Event Loop сюда встраивается идеально: \`input → debounce(200) → запрос\` — так устроены все нормальные поисковые строки.`,
      },
    ],
    quiz: [
      {
        q: "Когда сработает change у обычного текстового input?",
        options: [
          "На каждый символ",
          "При потере фокуса, если значение изменилось",
          "При нажатии Enter",
          "Никогда",
        ],
        answer: 1,
        explain: "change у текста — «поblurный»: фиксирует итог редактирования. Посимвольно стреляет input.",
      },
      {
        q: "Что НЕ делает form.submit()?",
        options: [
          "Отправляет форму",
          "Генерирует событие 'submit'",
          "Переходит по action",
          "Работает программно",
        ],
        answer: 1,
        explain: "Метод submit() bypass'ит событие — обработчики submit не вызываются. Хотите обработчик — кликайте по кнопке или dispatch'ите событие.",
      },
      {
        q: "Какие события фокуса всплывают?",
        options: ["focus/blur", "focusin/focusout", "Обе пары", "Ни одна"],
        answer: 1,
        explain: "focus/blur не всплывают (исторически). Их современные аналоги focusin/focusout — всплывают, поэтому подходят для делегирования на форме.",
      },
    ],
    tasks: [
      {
        id: "b4t1",
        title: "Санитайзер ввода",
        md: `Реализуйте \`sanitizeInput(value, max)\`: приведите к строке, уберите пробелы по краям, сожмите внутренние серии пробелов до одного и обрежьте до \`max\` символов. \`sanitizeInput("  а   б  в  ", 5)\` → \`"а б в"\`.`,
        starter: `function sanitizeInput(value, max) {
  // trim + replace + slice
}

console.log(JSON.stringify(sanitizeInput("  а   б  в  ", 5)));`,
        tests: `
await __test("сжатие пробелов", () => sanitizeInput("  а   б  в  ", 10), "а б в");
await __test("обрезка до max", () => sanitizeInput("javascript", 4), "java");
await __test("не-строка приводится", () => sanitizeInput(12345, 3), "123");
await __test("пустое", () => sanitizeInput("   ", 5), "");`,
        solution: `function sanitizeInput(value, max) {
  return String(value).trim().replace(/\\s+/g, " ").slice(0, max);
}`,
      },
      {
        id: "b4t2",
        title: "Сериализация как FormData",
        md: `Реализуйте \`toQuery(obj)\` — строку запроса из объекта, как делает браузер для форм: пары \`ключ=значение\` через \`&\`, значения — через \`encodeURIComponent\`. \`toQuery({ q: "js курс", page: 2 })\` → \`"q=js%20%D0%BA%D1%83%D1%80%D1%81&page=2"\`. Пустой объект → \`""\`.`,
        starter: `function toQuery(obj) {
  // Object.entries + encodeURIComponent
}

console.log(toQuery({ q: "js курс", page: 2 }));`,
        tests: `
await __test("базовая сериализация", () => toQuery({ a: 1, b: "x y" }), "a=1&b=x%20y");
await __test("кириллица и спецсимволы", () => toQuery({ q: "привет&мир" }), "q=" + encodeURIComponent("привет&мир"));
await __test("пустой объект", () => toQuery({}), "");
await __test("один ключ", () => toQuery({ id: 42 }), "id=42");`,
        solution: `function toQuery(obj) {
  return Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}`,
      },
    ],
  },

  {
    id: "b5",
    title: "Загрузка страницы, скрипты, наблюдатели",
    subtitle: "DOMContentLoaded/load, async/defer, MutationObserver, Selection и Range",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Жизнь страницы

1. \`DOMContentLoaded\` — HTML разобран, **DOM готов**, скрипты (кроме async) выполнены. Можно работать с элементами. Внешние картинки и стили могут ещё грузиться
2. \`load\` (на \`window\`) — загружено **всё**, включая ресурсы
3. \`beforeunload\` — пользователь уходит: можно спросить «сохранить черновик?» (\`e.preventDefault(); e.returnValue = ""\`)
4. \`unload\` — почти мёртвая страница, только неблокирующие действия (\`navigator.sendBeacon\`)

\`document.readyState\` — текущая фаза: \`"loading"\` → \`"interactive"\` (= DOMContentLoaded) → \`"complete"\`.`,
      },
      {
        kind: "browser",
        title: "lifecycle.html",
        presets: [
          {
            name: "порядок загрузки",
            code: `<script>
  console.log("скрипт в body, readyState: " + document.readyState);

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded: DOM построен, readyState: " + document.readyState);
  });

  window.addEventListener("load", () => {
    console.log("load: всё загружено, readyState: " + document.readyState);
  });
</script>
<p>Контент ниже скрипта</p>`,
          },
          {
            name: "onload и onerror ресурсов",
            code: `<div id="holder"></div>
<script>
  function loadImage(src) {
    const img = new Image();
    img.onload = () => console.log("загрузился: " + img.width + "x" + img.height);
    img.onerror = () => console.log("НЕ загрузился: " + src);
    img.src = src;
    document.getElementById("holder").append(img);
  }
  // пиксель в base64 — грузится мгновенно
  loadImage("image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
  loadImage("https://broken.example/nope.png");
</script>`,
          },
          {
            name: "MutationObserver",
            code: `<div id="status">наблюдаю…</div>
<p><button id="change">изменить DOM</button></p>
<script>
  const status = document.getElementById("status");

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      const what = m.type === "attributes" ? "attr=" + m.attributeName : m.type;
      console.log("мутация: " + what);
    }
    console.log("текст теперь: " + status.textContent);
  });

  observer.observe(status, { childList: true, characterData: true, attributes: true });

  document.getElementById("change").addEventListener("click", () => {
    status.textContent = "изменено в " + new Date().toLocaleTimeString();
    status.setAttribute("data-v", String(Math.random()).slice(2, 5));
  });
</script>`,
          },
          {
            name: "Selection и Range",
            code: `<p id="p">Выделите мышью кусочек этого текста и отпустите кнопку — увидите объект выделения в консоли.</p>
<script>
  document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    console.log("выделено: «" + sel.toString() + "»");
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      console.log("Range: символы " + range.startOffset + "–" + range.endOffset +
                  ", свёрнут: " + range.collapsed);
    }
  });
</script>`,
          },
        ],
      },
      {
        kind: "text",
        md: `## Скрипты: async и defer

Обычный \`<script src>\` **блокирует** разбор HTML. Атрибуты меняют это:

- \`defer\` — грузится параллельно, выполняется **после разбора**, в порядке объявления, **до** \`DOMContentLoaded\`. Для библиотек и приложения
- \`async\` — грузится параллельно, выполняется **сразу как загрузился**, порядок не гарантирован. Для независимой аналитики и счётчиков
- \`type="module"\` — по умолчанию ведёт себя как \`defer\`

## Ресурсы: onload/onerror

У \`<img>\`, \`<script>\`, \`<link>\` есть события \`load\`/\`error\` — основа предзагрузки, ленивых картинок и фолбэков.

## MutationObserver

Подписка на изменения DOM: \`observe(el, { childList, attributes, characterData, subtree })\`. Колбэк получает **пачку** мутаций асинхронно (микротаска!) — это защита от «дрожания» при массовых правках. Родственники: \`IntersectionObserver\` (элемент в зоне видимости — ленивая загрузка) и \`ResizeObserver\` (изменение размеров).

## Selection и Range

\`window.getSelection()\` — текущее выделение пользователя; внутри — объекты \`Range\` с границами (узел + смещение). Range умеет и **создавать** выделение программно: \`range.selectNodeContents(el)\` + \`selection.addRange(range)\` — так работают «кнопка копирования» и подсветка найденного.

## Event loop: микро и макрозадачи

Напоминание из урока про Event Loop: \`MutationObserver\` колбэки и продолжения промисов — **микрозадачи** (выполняются до отрисовки), \`load\`, таймеры и события UI — **макрозадачи**. Рендер происходит между макрозадачами: длинный синхронный кусок или бесконечные микротаски = «зависший» интерфейс.`,
      },
      {
        kind: "warn",
        title: "beforeunload — с уважением",
        md: `Вопрос «вы уверены?» раздражает, если показывать его всегда. Показывайте только когда есть **несохранённые изменения**, и убирайте подписку, когда черновик сохранён. Современные браузеры игнорируют собственный текст сообщения — будет стандартный диалог.`,
      },
    ],
    quiz: [
      {
        q: "Что уже готово к моменту DOMContentLoaded?",
        options: [
          "Всё, включая картинки",
          "DOM построен и скрипты без async выполнены",
          "Только <head>",
          "Ничего, это синоним load",
        ],
        answer: 1,
        explain: "DOMContentLoaded = интерактивный документ: элементы на месте, defer-скрипты отработали, ресурсы могут дотягиваться.",
      },
      {
        q: "Чем defer отличается от async?",
        options: [
          "Ничем",
          "defer выполняется после разбора в порядке объявления; async — как загрузится, без порядка",
          "async выполняется до разбора HTML",
          "defer блокирует рендеринг",
        ],
        answer: 1,
        explain: "defer — «после парсинга, по порядку», async — «кто первым приехал». Для зависимых скриптов — только defer.",
      },
      {
        q: "Почему MutationObserver передаёт мутации пачкой, а не по одной?",
        options: [
          "Так экономится память",
          "Колбэк — микрозадача: все синхронные изменения DOM собираются до его выполнения",
          "Браузер не успевает дёргать колбэк",
          "Это настраивается опцией batch",
        ],
        answer: 1,
        explain: "Изменения копятся в очереди микрозадач и отдаются разом — обработчик видит согласованное состояние, а не каждый промежуточный шаг.",
      },
    ],
    tasks: [
      {
        id: "b5t1",
        title: "Генератор тега script",
        md: `Реализуйте \`scriptTag(src, opts)\`: верните строку вида \`<script src="..."></script>\`, добавив атрибут \`async\`, если \`opts.async === true\`, и \`defer\`, если \`opts.defer === true\`. \`opts\` может отсутствовать.`,
        starter: `function scriptTag(src, opts) {
  // ваш код
}

console.log(scriptTag("/app.js", { defer: true }));
console.log(scriptTag("/metric.js", { async: true }));
console.log(scriptTag("/plain.js"));`,
        tests: `
await __test("defer", () => scriptTag("/app.js", { defer: true }), '<script src="/app.js" defer></script>');
await __test("async", () => scriptTag("/metric.js", { async: true }), '<script src="/metric.js" async></script>');
await __test("без опций", () => scriptTag("/plain.js"), '<script src="/plain.js"></script>');
await __test("пустые опции", () => scriptTag("/x.js", {}), '<script src="/x.js"></script>');`,
        solution: `function scriptTag(src, opts = {}) {
  const attrs = [];
  if (opts.async) attrs.push("async");
  if (opts.defer) attrs.push("defer");
  const extra = attrs.length ? " " + attrs.join(" ") : "";
  return '<script src="' + src + '"' + extra + "></script>";
}`,
      },
      {
        id: "b5t2",
        title: "Дифф списков",
        md: `Реализуйте \`diffArrays(before, after)\` — основу наблюдателей за списками: верните объект \`{ added: [...], removed: [...] }\`, где \`added\` — элементы \`after\`, которых не было в \`before\`, а \`removed\` — наоборот.`,
        starter: `function diffArrays(before, after) {
  // filter + includes
}

console.log(diffArrays(["a", "b", "c"], ["b", "c", "d"]));`,
        tests: `
await __test("добавления и удаления", () => diffArrays(["a", "b", "c"], ["b", "c", "d"]), { added: ["d"], removed: ["a"] });
await __test("ничего не изменилось", () => diffArrays([1, 2], [2, 1]), { added: [], removed: [] });
await __test("полная замена", () => diffArrays(["x"], ["y"]), { added: ["y"], removed: ["x"] });
await __test("пустые", () => diffArrays([], []), { added: [], removed: [] });`,
        solution: `function diffArrays(before, after) {
  return {
    added: after.filter((x) => !before.includes(x)),
    removed: before.filter((x) => !after.includes(x)),
  };
}`,
      },
    ],
  },
];
