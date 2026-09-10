import type { Lesson } from "../lib/types";

export const pythonLessons: Lesson[] = [
  {
    id: "py1",
    language: "python",
    title: "Первый код: print и переменные",
    subtitle: "Синтаксис без скобок и точек с запятой, динамическая типизация, f-строки",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Python — язык данных и автоматизации 🐍

Python — второй язык платформы. Если JavaScript — язык браузера, то Python — язык данных, автоматизации, бэкенда и машинного обучения.

**Аналогия:** Представьте два языка:
- **JavaScript** — как разговорный язык: быстрый, гибкий, но иногда непонятный
- **Python** — как письменный язык: чёткий, структурированный, читается как английский текст

**Главное отличие:** В Python **нет фигурных скобок** — блоки кода выделяются отступами. **Нет let/const** — переменная создаётся в момент присваивания.`,
      },
      {
        kind: "text",
        md: `## Ваша первая программа

Функция \`print()\` — аналог \`console.log\` в JavaScript. Она выводит текст на экран.

**Пример:**
\`\`\`python
print("Привет, мир!")
\`\`\`

Это самая простая программа на Python. Она выводит текст "Привет, мир!" на экран.`,
      },
      {
        kind: "code",
        title: "hello.py — первая программа",
        code: `print("Привет, Python!")

year = 1991
print("Год рождения языка:", year)
print("Возраст:", 2026 - year)

name = "Гвидо"
print(f"Создатель языка — {name}")  # f-строка — как шаблонные строки JS`,
      },
      {
        kind: "text",
        md: `## Типы данных

Базовые типы: \`int\` (целые **любой** длины, без отдельного bigint), \`float\`, \`str\`, \`bool\` и \`None\` — «значения нет». В отличие от JS, нет ни \`undefined\`, ни \`null\` — только \`None\`.

Функция \`type()\` показывает класс значения. Типизация динамическая: тип живёт у значения, имя можно переприсвоить значением другого типа.`,
      },
      {
        kind: "code",
        title: "type() в действии",
        code: `print(type(42))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type("питон"))  # <class 'str'>
print(type(True))     # <class 'bool'>
print(type(None))     # <class 'NoneType'>

x = 10
x = "десять"   # так можно: тип у значения, а не у имени
print(x, type(x))

print(2 ** 100)  # целые не переполняются никогда`,
      },
      {
        kind: "warn",
        title: "Отступы — это синтаксис",
        md: `4 пробела в начале строки определяют блок кода. Сбившийся отступ — не «стиль», а ошибка \`IndentationError\`. Табы и пробелы не смешивать: редактор должен сам ставить 4 пробела по нажатию Tab.`,
      },
      {
        kind: "tip",
        title: "PEP 8 — стиль языка",
        md: `Имена переменных и функций — \`snake_case\` (\`user_name\`, а не \`userName\`), константы — \`UPPER_SNAKE\`. Это не вкусовщина, а стандарт PEP 8, который соблюдают все Python-проекты.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт type(None)?",
        options: ["<class 'null'>", "<class 'NoneType'>", "'undefined'", "<class 'void'>"],
        answer: 1,
        explain: "В Python единственный «пустой» тип — NoneType. Ни null, ни undefined в языке нет.",
      },
      {
        q: "Какое имя переменной соответствует PEP 8?",
        options: ["userName", "user_name", "UserName", "user-name"],
        answer: 1,
        explain: "Стандарт языка — snake_case для переменных и функций. CamelCase оставлен классам.",
      },
    ],
    tasks: [
      {
        id: "py1t1",
        title: "Приветствие",
        md: `Реализуйте функцию \`greet(name)\`, возвращающую строку вида \`Привет, Ада!\`. Используйте f-строку.`,
        starter: `def greet(name):
    # ваш код
    pass

print(greet("Ада"))`,
        tests: `
__test("greet('Ада') → 'Привет, Ада!'", lambda: greet("Ада"), "Привет, Ада!")
__test("greet('Гвидо')", lambda: greet("Гвидо"), "Привет, Гвидо!")
__test("greet('')", lambda: greet(""), "Привет, !")`,
        solution: `def greet(name):
    return f"Привет, {name}!"`,
      },
      {
        id: "py1t2",
        title: "Градусы",
        md: `Реализуйте \`celsius_to_fahrenheit(c)\` по формуле \`c * 9/5 + 32\`. \`celsius_to_fahrenheit(0)\` → \`32.0\`.`,
        starter: `def celsius_to_fahrenheit(c):
    # ваш код
    pass

print(celsius_to_fahrenheit(0), celsius_to_fahrenheit(100))`,
        tests: `
__test("0°C → 32.0", lambda: celsius_to_fahrenheit(0), 32.0)
__test("100°C → 212.0", lambda: celsius_to_fahrenheit(100), 212.0)
__test("-40°C → -40.0 (точка пересечения)", lambda: celsius_to_fahrenheit(-40), -40.0)`,
        solution: `def celsius_to_fahrenheit(c):
    return c * 9 / 5 + 32`,
      },
    ],
  },

  {
    id: "py2",
    language: "python",
    title: "Условия и логика",
    subtitle: "if/elif/else, цепочки сравнений, and/or/not, тернарник",
    minutes: 20,
    blocks: [
      {
        kind: "text",
        md: `## if, elif, else

Без скобок вокруг условия и без фигурных скобок — только двоеточие и отступ. Вместо \`else if\` — \`elif\`. Уникальная фишка языка — **цепочки сравнений**: \`0 < x < 10\` работает как в математике.`,
      },
      {
        kind: "code",
        title: "Ветвления",
        code: `hour = 21

if hour < 6:
    print("Глубокая ночь")
elif hour < 12:
    print("Доброе утро")
elif hour < 18:
    print("Добрый день")
else:
    print("Добрый вечер")

x = 7
print(0 < x < 10)      # True — цепочка сравнений
print(1 <= x <= 7 <= 9)  # True — сколько угодно звеньев`,
      },
      {
        kind: "text",
        md: `## Логика и «ложные» значения

\`and\`, \`or\`, \`not\` возвращают **сами операнды**, а не обязательно \`True/False\`: \`or\` — первый истинный, \`and\` — первый ложный или последний.

Ложные (falsy): \`False\`, \`None\`, \`0\`, \`0.0\`, \`""\`, \`[]\`, \`{}\`, \`set()\`. Всё остальное — истинно, включая строку \`"0"\` и список \`[0]\`.

Тернарный оператор читается по-английски: \`значение if условие else иначе\`.`,
      },
      {
        kind: "code",
        title: "Truthy/falsy по-питоновски",
        code: `print(0 or "дефолт")        # дефолт
print("первый" and "второй") # второй — оба истинны
print([] and "не дойдёт")    # [] — первый ложный

age = 20
status = "взрослый" if age >= 18 else "несовершеннолетний"
print(status)

print(bool(""), bool("0"), bool([0]), bool(None))
# False True True False`,
      },
      {
        kind: "tip",
        title: "Идиома in",
        md: `Проверка вхождения — \`if letter in word\`, \`if key in config\`. Это заменяет \`indexOf !== -1\` и \`includes\` из JS и читается как обычная фраза.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт выражение 'молоко' if False else 'кефир'?",
        options: ["'молоко'", "'кефир'", "False", "ошибку"],
        answer: 1,
        explain: "Тернарный оператор: значение перед if берётся при истинном условии, иначе — после else.",
      },
      {
        q: "Какое значение ложное (falsy)?",
        options: ["'0'", "[0]", "None", "' ' (пробел)"],
        answer: 2,
        explain: "None — ложное. Непустая строка (даже из пробела) и непустой список — истинные.",
      },
    ],
    tasks: [
      {
        id: "py2t1",
        title: "FizzBuzz-одиночка",
        md: `Реализуйте \`fizz_word(n)\`: делится на 15 → \`"FizzBuzz"\`, на 3 → \`"Fizz"\`, на 5 → \`"Buzz"\`, иначе — строка с числом (\`str(n)\`).`,
        starter: `def fizz_word(n):
    # ваш код
    pass

print(fizz_word(15), fizz_word(9), fizz_word(10), fizz_word(7))`,
        tests: `
__test("fizz_word(15) → 'FizzBuzz'", lambda: fizz_word(15), "FizzBuzz")
__test("fizz_word(9) → 'Fizz'", lambda: fizz_word(9), "Fizz")
__test("fizz_word(10) → 'Buzz'", lambda: fizz_word(10), "Buzz")
__test("fizz_word(7) → '7'", lambda: fizz_word(7), "7")`,
        solution: `def fizz_word(n):
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)`,
      },
      {
        id: "py2t2",
        title: "Цена билета",
        md: `Реализуйте \`ticket_price(age)\`: младше 7 → \`0\`; 7–17 → \`200\`; 18–64 → \`400\`; 65 и старше → \`250\`. Границы включаются в старшую категорию: ровно 7 → 200, ровно 65 → 250.`,
        starter: `def ticket_price(age):
    # ваш код
    pass

print(ticket_price(5), ticket_price(10), ticket_price(30), ticket_price(70))`,
        tests: `
__test("ticket_price(5) → 0", lambda: ticket_price(5), 0)
__test("ticket_price(7) → 200 (граница)", lambda: ticket_price(7), 200)
__test("ticket_price(30) → 400", lambda: ticket_price(30), 400)
__test("ticket_price(65) → 250 (граница)", lambda: ticket_price(65), 250)
__test("ticket_price(0) → 0", lambda: ticket_price(0), 0)`,
        solution: `def ticket_price(age):
    if age < 7:
        return 0
    if age < 18:
        return 200
    if age < 65:
        return 400
    return 250`,
      },
    ],
  },

  {
    id: "py3",
    language: "python",
    title: "Циклы while и for",
    subtitle: "for..in, range, enumerate, break/continue и блок else",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## for — обход, а не счётчик

\`for\` в Python обходит **сами элементы** последовательности, индексы не нужны. \`range(start, stop, step)\` генерирует числа: **stop не включается**. \`enumerate\` даёт пару (индекс, элемент) — замена forEach с idx.`,
      },
      {
        kind: "code",
        title: "for и range",
        code: `for ch in "PY":
    print("символ:", ch)

for i in range(3):
    print("i =", i)            # 0 1 2

for i in range(10, 0, -3):
    print("обратный:", i)      # 10 7 4 1

for idx, ch in enumerate("abc"):
    print(idx, "->", ch)`,
      },
      {
        kind: "text",
        md: `## break, continue и сюрприз: else у цикла

Блок \`else\` у цикла выполняется, когда цикл **завершился без break**. Это идиоматичный способ написать «нашли / не нашли» без флага-переменной.`,
      },
      {
        kind: "code",
        title: "Поиск с else",
        code: `numbers = [4, 8, 15, 16, 23, 42]

for n in numbers:
    if n % 2 != 0:
        continue        # пропускаем нечётные
    if n > 20:
        print("нашли:", n)   # 42
        break
else:
    print("ничего не нашли")  # не выполнится — был break

# while
n = 8
steps = 0
while n > 1:
    n = n // 2     # целочисленное деление
    steps += 1
print("делений:", steps)     # 3`,
      },
      {
        kind: "warn",
        title: "Stop не включается",
        md: `\`range(1, 5)\` — это 1, 2, 3, 4. Правило «полуинтервала» соблюдается везде: срезы, \`range\`, \`islice\`. Длина всегда \`stop - start\` — удобно, но непривычно первые пару недель.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт list(range(2, 10, 3))?",
        options: ["[2, 5, 8]", "[2, 5, 8, 10]", "[3, 6, 9]", "[2, 4, 6, 8]"],
        answer: 0,
        explain: "Старт 2, шаг 3, стоп 10 не включается: 2, 5, 8.",
      },
      {
        q: "Когда выполняется else у цикла for?",
        options: [
          "Всегда после цикла",
          "Когда цикл завершился без break",
          "Когда сработал break",
          "У циклов не бывает else",
        ],
        answer: 1,
        explain: "else — «цикл отработал полностью». Прервались через break — else пропускается.",
      },
    ],
    tasks: [
      {
        id: "py3t1",
        title: "Сумма от 1 до N",
        md: `Реализуйте \`sum_to(n)\` — сумму чисел от 1 до n включительно, **циклом** (не формулой). \`sum_to(100)\` → \`5050\`.`,
        starter: `def sum_to(n):
    # ваш код с циклом
    pass

print(sum_to(5), sum_to(100))`,
        tests: `
__test("sum_to(5) → 15", lambda: sum_to(5), 15)
__test("sum_to(1) → 1", lambda: sum_to(1), 1)
__test("sum_to(100) → 5050", lambda: sum_to(100), 5050)`,
        solution: `def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total`,
      },
      {
        id: "py3t2",
        title: "Гласные",
        md: `Реализуйте \`count_vowels(s)\` — количество русских гласных (\`аеёиоуыэюя\`) в строке, регистр не важен. \`count_vowels("Привет")\` → \`2\`.`,
        starter: `def count_vowels(s):
    # ваш код
    pass

print(count_vowels("Привет"))`,
        tests: `
__test("count_vowels('Привет') → 2", lambda: count_vowels("Привет"), 2)
__test("count_vowels('АБВГД') → 1", lambda: count_vowels("АБВГД"), 1)
__test("count_vowels('') → 0", lambda: count_vowels(""), 0)
__test("count_vowels('ау') → 2", lambda: count_vowels("ау"), 2)
__test("регистр не важен", lambda: count_vowels("АаАа"), 4)`,
        solution: `def count_vowels(s):
    vowels = "аеёиоуыэюя"
    count = 0
    for ch in s.lower():
        if ch in vowels:
            count += 1
    return count`,
      },
    ],
  },

  {
    id: "py4",
    language: "python",
    title: "Функции",
    subtitle: "def, *args и **kwargs, lambda, функции как значения",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## def и аргументы

Параметры по умолчанию, **именованные аргументы** при вызове, \`*args\` — «все позиционные в кортеж», \`**kwargs\` — «все именованные в словарь». Документация функции — docstring, первая строка-литерал.`,
      },
      {
        kind: "code",
        title: "Гибкие сигнатуры",
        code: `def power(base, exp=2):
    """Возводит base в степень exp."""
    return base ** exp

print(power(5))               # 25
print(power(2, 10))           # 1024
print(power(exp=3, base=2))   # 8 — именованные аргументы

def sum_all(*nums):
    return sum(nums)

print(sum_all(1, 2, 3, 4))    # 10

def settings(**opts):
    return opts

print(settings(theme="dark", size=14))
print(power.__doc__)`,
      },
      {
        kind: "text",
        md: `## lambda и функции-аргументы

\`lambda x: x * 2\` — анонимная функция-выражение. Главное применение — короткие колбэки для \`sorted(key=...)\`, \`map\`, \`filter\`. Функции здесь — объекты первого класса, как и в JS.`,
      },
      {
        kind: "code",
        title: "Функции высшего порядка",
        code: `double = lambda x: x * 2
print(double(21))                 # 42

words = ["питон", "гуру", "код"]
print(sorted(words, key=len))     # по длине
print(sorted(words, key=lambda w: w[-1]))  # по последней букве

print(list(map(lambda x: x * 3, [1, 2])))          # [3, 6]
print(list(filter(lambda x: x > 2, [1, 2, 3, 4]))) # [3, 4]`,
      },
      {
        kind: "tip",
        title: "Когда lambda, когда def",
        md: `lambda — только для однострочных колбэков. Как только логика требует имени, нескольких выражений или тестов — пишите обычный \`def\`: его видно в трейсбеках и у него есть docstring.`,
      },
    ],
    quiz: [
      {
        q: "Что собирает **kwargs?",
        options: [
          "Позиционные аргументы в список",
          "Именованные аргументы в словарь",
          "Все аргументы в кортеж",
          "Аргументы по умолчанию",
        ],
        answer: 1,
        explain: "**kwargs принимает пары key=value и складывает их в dict. Позиционные — это *args (tuple).",
      },
      {
        q: "Чему равно power(exp=3, base=2)?",
        options: ["6", "8", "9", "ошибка"],
        answer: 1,
        explain: "Именованные аргументы позволяют менять порядок: 2 ** 3 = 8.",
      },
    ],
    tasks: [
      {
        id: "py4t1",
        title: "Ограничитель",
        md: `Реализуйте \`clamp(v, lo, hi)\`: меньше \`lo\` → \`lo\`, больше \`hi\` → \`hi\`, иначе само значение.`,
        starter: `def clamp(v, lo, hi):
    # ваш код
    pass

print(clamp(5, 0, 10), clamp(-5, 0, 10), clamp(15, 0, 10))`,
        tests: `
__test("clamp(5, 0, 10) → 5", lambda: clamp(5, 0, 10), 5)
__test("clamp(-5, 0, 10) → 0", lambda: clamp(-5, 0, 10), 0)
__test("clamp(15, 0, 10) → 10", lambda: clamp(15, 0, 10), 10)
__test("граница lo", lambda: clamp(0, 0, 10), 0)`,
        solution: `def clamp(v, lo, hi):
    if v < lo:
        return lo
    if v > hi:
        return hi
    return v`,
      },
      {
        id: "py4t2",
        title: "Двойное применение",
        md: `Реализуйте \`apply_twice(fn, x)\` — применяет функцию к значению дважды: \`apply_twice(lambda v: v + 3, 10)\` → \`16\`.`,
        starter: `def apply_twice(fn, x):
    # ваш код
    pass

print(apply_twice(lambda v: v + 3, 10))
print(apply_twice(lambda s: s + "!", "вау"))`,
        tests: `
__test("+3 дважды к 10 → 16", lambda: apply_twice(lambda v: v + 3, 10), 16)
__test("*2 дважды к 5 → 20", lambda: apply_twice(lambda v: v * 2, 5), 20)
__test("со строками", lambda: apply_twice(lambda s: s + "!", "вау"), "вау!!")`,
        solution: `def apply_twice(fn, x):
    return fn(fn(x))`,
      },
    ],
  },

  {
    id: "py5",
    language: "python",
    title: "Списки и срезы",
    subtitle: "Индексы, slice, list comprehensions — визитная карточка языка",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Списки и срезы

Список — изменяемая упорядоченная коллекция. Отрицательные индексы идут с конца: \`[-1]\` — последний элемент. **Срез** \`[start:stop:step]\` — главный инструмент: копирование, разворот, каждый второй — одной записью.`,
      },
      {
        kind: "code",
        title: "Срезы в деле",
        code: `stack = ["a", "b"]
stack.append("c")
print(stack)          # ['a', 'b', 'c']
print(stack[-1])      # c — последний
print(stack.pop())    # c

nums = [0, 1, 2, 3, 4, 5, 6, 7]
print(nums[2:5])      # [2, 3, 4] — stop не включается
print(nums[::2])      # [0, 2, 4, 6] — каждый второй
print(nums[::-1])     # разворот

copy = nums[:]        # копия, а не ссылка
copy[0] = 99
print(nums[0], copy[0])  # 0 99`,
      },
      {
        kind: "text",
        md: `## List comprehensions

Генератор списка \`[выражение for элемент in коллекция if условие]\` заменяет цепочки map/filter одной читаемой строкой. Это **идиома номер один** — в чужом коде вы будете видеть её постоянно.`,
      },
      {
        kind: "code",
        title: "Comprehensions против циклов",
        code: `squares = [x ** 2 for x in range(6)]
print(squares)                      # [0, 1, 4, 9, 16, 25]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)                        # [0, 2, 4, 6, 8]

words = ["код", "ещё код"]
print([len(w) for w in words])      # [3, 7]

prices = [120, 45, 300, 78]
total = sum(p * 0.9 for p in prices if p > 100)
print(total)                        # 378.0 — как filter+map+reduce в JS`,
      },
      {
        kind: "warn",
        title: "Присваивание не копирует",
        md: `\`b = a\` — это второе имя **того же** списка: \`b.append(1)\` изменит и \`a\`. Копия — \`a[:]\`, \`list(a)\` или \`a.copy()\`. Вложенные списки копируются только через \`copy.deepcopy\`.`,
      },
    ],
    quiz: [
      {
        q: "Чему равно [1, 2, 3, 4, 5][1:4]?",
        options: ["[2, 3, 4]", "[1, 2, 3, 4]", "[2, 3, 4, 5]", "[1, 2, 3]"],
        answer: 0,
        explain: "Срез включает start и исключает stop: индексы 1, 2, 3 → [2, 3, 4].",
      },
      {
        q: "Что вернёт [x * 2 for x in range(3)]?",
        options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
        answer: 0,
        explain: "range(3) — это 0, 1, 2; каждое умножается на 2.",
      },
    ],
    tasks: [
      {
        id: "py5t1",
        title: "Сумма чётных",
        md: `Реализуйте \`sum_even(nums)\` — сумму чётных чисел списка **одним comprehension**. \`sum_even([1,2,3,4,5,6])\` → \`12\`.`,
        starter: `def sum_even(nums):
    # sum + comprehension
    pass

print(sum_even([1, 2, 3, 4, 5, 6]))`,
        tests: `
__test("sum_even([1..6]) → 12", lambda: sum_even([1, 2, 3, 4, 5, 6]), 12)
__test("нет чётных → 0", lambda: sum_even([1, 3, 5]), 0)
__test("пустой список → 0", lambda: sum_even([]), 0)
__test("sum_even([2]) → 2", lambda: sum_even([2]), 2)`,
        solution: `def sum_even(nums):
    return sum(x for x in nums if x % 2 == 0)`,
      },
      {
        id: "py5t2",
        title: "Уникальные по порядку",
        md: `Реализуйте \`unique_in_order(items)\` — элементы без повторов **в порядке первого появления**: \`unique_in_order([3,1,3,2,1])\` → \`[3,1,2]\`.`,
        starter: `def unique_in_order(items):
    # ваш код
    pass

print(unique_in_order([3, 1, 3, 2, 1]))`,
        tests: `
__test("[3,1,3,2,1] → [3,1,2]", lambda: unique_in_order([3, 1, 3, 2, 1]), [3, 1, 2])
__test("строки", lambda: unique_in_order(["a", "b", "a"]), ["a", "b"])
__test("пусто", lambda: unique_in_order([]), [])
__test("все одинаковые", lambda: unique_in_order([7, 7, 7]), [7])`,
        solution: `def unique_in_order(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`,
      },
    ],
  },

  {
    id: "py6",
    language: "python",
    title: "Словари, множества, кортежи",
    subtitle: "dict, set-операции, распаковка кортежей, dict comprehensions",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `Три коллекции под три задачи:

- \`dict\` — пары ключ:значение (порядок вставки сохраняется). \`.get(key, default)\` — безопасное чтение без KeyError
- \`set\` — уникальные элементы с молниеносной проверкой \`in\` и операциями \`& | - ^\`
- \`tuple\` — неизменяемый список; основа распаковки и множественных присваиваний`,
      },
      {
        kind: "code",
        title: "Три коллекции",
        code: `user = {"name": "Ада", "age": 36}
user["lang"] = "python"
print(user.get("email", "нет"))   # нет — дефолт вместо KeyError

for key, value in user.items():
    print(key, "=", value)

a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)    # {2, 3} — пересечение
print(a | b)    # {1, 2, 3, 4} — объединение
print(a - b)    # {1} — разность

point = (10, 20)
x, y = point     # распаковка
x, y = y, x      # обмен без временной переменной
print(x, y)      # 20 10`,
      },
      {
        kind: "text",
        md: `## Dict comprehensions и подсчёт

Словари собираются тем же синтаксисом, что и списки, только с \`ключ: значение\` перед \`for\`. Классический приём — счётчик через \`.get(ch, 0) + 1\`.`,
      },
      {
        kind: "code",
        title: "Подсчёт и трансформации",
        code: `prices = {"кофе": 120, "чай": 90, "какао": 110}
discounted = {k: int(v * 0.9) for k, v in prices.items()}
print(discounted)   # {'кофе': 108, 'чай': 81, 'какао': 99}

text = "абракадабра"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)`,
      },
      {
        kind: "tip",
        title: "Что выбрать",
        md: `Нужен порядок и поиск по ключу — \`dict\`. Уникальность или пересечения — \`set\`. Фиксированная структура (координата, запись) — \`tuple\`. Разнородная изменяемая коллекция — \`list\`.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт {}.get('x', 0)?",
        options: ["None", "0", "KeyError", "''"],
        answer: 1,
        explain: "get возвращает второй аргумент-дефолт, если ключа нет. Сам словарь при этом не меняется.",
      },
      {
        q: "Чему равно {1, 2} & {2, 3}?",
        options: ["{2}", "{1, 2, 3}", "{1, 3}", "2"],
        answer: 0,
        explain: "Амперсанд для множеств — пересечение: общие элементы, то есть {2}.",
      },
    ],
    tasks: [
      {
        id: "py6t1",
        title: "Счётчик символов",
        md: `Реализуйте \`count_chars(s)\` — словарь «символ → количество». Регистр учитывается: \`count_chars("aab")\` → \`{'a': 2, 'b': 1}\`.`,
        starter: `def count_chars(s):
    # ваш код
    pass

print(count_chars("aab"))`,
        tests: `
__test("count_chars('aab')", lambda: count_chars("aab"), {"a": 2, "b": 1})
__test("count_chars('') → {}", lambda: count_chars(""), {})
__test("регистр учитывается", lambda: count_chars("xXx"), {"x": 2, "X": 1})`,
        solution: `def count_chars(s):
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    return counts`,
      },
      {
        id: "py6t2",
        title: "Слияние счёта",
        md: `Реализуйте \`merge_scores(a, b)\` — объединяет два словаря; для общих ключей значения **складываются**. Исходные словари не меняются.`,
        starter: `def merge_scores(a, b):
    # ваш код
    pass

print(merge_scores({"a": 1, "b": 2}, {"b": 3, "c": 4}))`,
        tests: `
__test("общие ключи складываются", lambda: merge_scores({"a": 1, "b": 2}, {"b": 3, "c": 4}), {"a": 1, "b": 5, "c": 4})
__test("пустые словари", lambda: merge_scores({}, {}), {})
__test("не пересекаются", lambda: merge_scores({"x": 1}, {"y": 2}), {"x": 1, "y": 2})
__test("исходники не мутируют", lambda: (lambda a, b: (merge_scores(a, b), a)[1])({"a": 1}, {"a": 2}), {"a": 1})`,
        solution: `def merge_scores(a, b):
    merged = dict(a)
    for key, value in b.items():
        merged[key] = merged.get(key, 0) + value
    return merged`,
      },
    ],
  },

  {
    id: "py7",
    language: "python",
    title: "Строки и форматирование",
    subtitle: "Методы строк, f-строки с форматами, неизменяемость",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `Строки **неизменяемы**: любой метод возвращает новую строку. Набор методов покрывает почти всё: \`strip\`, \`split\`, \`join\`, \`replace\`, \`upper/lower\`, \`startswith\`. f-строки умеют не только подставлять, но и **форматировать**: \`:>.2f\`, запятые в числах, выравнивание.`,
      },
      {
        kind: "code",
        title: "Методы и f-форматы",
        code: `s = "  Привет, мир  "
print(s.strip())                   # "Привет, мир"
print("a,b,c".split(","))          # ['a', 'b', 'c']
print("-".join(["2026", "02"]))    # 2026-02
print("код".upper(), "КОД".lower())

pi = 3.14159
print(f"пи ≈ {pi:.2f}")            # пи ≈ 3.14
print(f"{1234567:,}")              # 1,234,567
print(f"{'текст':>10}|")           # выравнивание вправо`,
      },
      {
        kind: "text",
        md: `## Неизменяемость на практике

\`s[0] = "П"\` — ошибка \`TypeError\`. Хочется «изменить» — собираем новую строку: конкатенацией, \`replace\` или срезом.`,
      },
      {
        kind: "code",
        title: "Собираем новую строку",
        code: `word = "питон"
print(word[::-1])       # нотип — разворот срезом
print("тон" in word)    # True — подстрока

# word[0] = "П"         # TypeError!
print("П" + word[1:])   # Питон

# эффективно склеить много частей:
parts = ["2026", "02", "14"]
print(".".join(parts))  # 2026.02.14`,
      },
      {
        kind: "warn",
        title: "Конкатенация в цикле — O(n²)",
        md: `Каждое \`result += piece\` создаёт новую строку и копирует всё накопленное. Для сотен частей собирайте список и делайте \`"".join(parts)\` — линейно.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт '-'.join(['a', 'b'])?",
        options: ["'a-b'", "'ab-'", "['a-b']", "ошибку"],
        answer: 0,
        explain: "join склеивает элементы списка, вставляя строку-разделитель между ними.",
      },
      {
        q: "Можно ли изменить символ строки по индексу?",
        options: [
          "Да, s[0] = 'X'",
          "Нет — строки неизменяемы",
          "Только через replace",
          "Только в байтах",
        ],
        answer: 1,
        explain: "s[0] = 'X' даст TypeError. Любое «изменение» — это создание новой строки.",
      },
    ],
    tasks: [
      {
        id: "py7t1",
        title: "Палиндром",
        md: `Реализуйте \`is_palindrome(s)\` — \`True\`, если строка читается одинаково в обе стороны **без учёта регистра и пробелов**. \`is_palindrome("шалаш")\` → \`True\`.`,
        starter: `def is_palindrome(s):
    # ваш код
    pass

print(is_palindrome("шалаш"))
print(is_palindrome("а роза упала на лапу азора"))`,
        tests: `
__test("'шалаш' → True", lambda: is_palindrome("шалаш"), True)
__test("'Питон' → False", lambda: is_palindrome("Питон"), False)
__test("фраза с пробелами", lambda: is_palindrome("а роза упала на лапу азора"), True)
__test("регистр не важен", lambda: is_palindrome("ШаЛаШ"), True)
__test("'' → True", lambda: is_palindrome(""), True)`,
        solution: `def is_palindrome(s):
    cleaned = s.replace(" ", "").lower()
    return cleaned == cleaned[::-1]`,
      },
      {
        id: "py7t2",
        title: "Из змеи в верблюда",
        md: `Реализуйте \`snake_to_camel(s)\`: \`"hello_world_foo"\` → \`"helloWorldFoo"\`. Первое слово остаётся в нижнем регистре.`,
        starter: `def snake_to_camel(s):
    # ваш код
    pass

print(snake_to_camel("hello_world_foo"))`,
        tests: `
__test("user_name → userName", lambda: snake_to_camel("user_name"), "userName")
__test("одно слово", lambda: snake_to_camel("already"), "already")
__test("a_b_c → aBC", lambda: snake_to_camel("a_b_c"), "aBC")`,
        solution: `def snake_to_camel(s):
    parts = s.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])`,
      },
    ],
  },

  {
    id: "py8",
    language: "python",
    title: "Замыкания и декораторы",
    subtitle: "nonlocal, функции-обёртки и синтаксис @",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Замыкания

Как и в JS, внутренняя функция запоминает переменные внешней. Но присваивание внутри без объявления \`nonlocal\` создаёт **локальную** переменную — для изменения «чужой» переменной её нужно объявить явно.`,
      },
      {
        kind: "code",
        title: "Счётчик на замыканиях",
        code: `def make_counter(start=0):
    count = start

    def inc():
        nonlocal count     # без nonlocal была бы ошибка
        count += 1
        return count

    def value():
        return count

    return inc, value      # возвращаем кортеж функций

inc, value = make_counter(10)
inc()
inc()
print(value())   # 12`,
      },
      {
        kind: "text",
        md: `## Декораторы

Декоратор — функция, которая берёт функцию и возвращает **обёртку** вокруг неё. Запись \`@log_calls\` над \`def\` — сахар для \`add = log_calls(add)\`. Так в Python устроены логирование, кэширование (\`@lru_cache\`), маршруты веб-фреймворков, \`@property\`.`,
      },
      {
        kind: "code",
        title: "Декоратор логирования",
        code: `def log_calls(fn):
    def wrapper(*args, **kwargs):
        print("-> вызов", fn.__name__, args)
        result = fn(*args, **kwargs)
        print("<- результат:", result)
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(2, 3)
# -> вызов add (2, 3)
# <- результат: 5`,
      },
      {
        kind: "tip",
        title: "functools.wraps",
        md: `Хороший декоратор оборачивает wrapper в \`@functools.wraps(fn)\` — тогда у обёртки сохраняются \`__name__\` и docstring оригинала. Без этого отладка и help() сходят с ума.`,
      },
    ],
    quiz: [
      {
        q: "Что будет без nonlocal при count += 1 внутри inc()?",
        options: [
          "Всё сработает",
          "UnboundLocalError — Python считает count локальной",
          "count станет глобальной",
          "Синтаксическая ошибка",
        ],
        answer: 1,
        explain: "Присваивание делает имя локальным, а чтение до присваивания в этой области — ошибка. nonlocal явно указывает на переменную внешней функции.",
      },
      {
        q: "Чем эквивалентна запись @decorator над def f()?",
        options: [
          "f(decorator)",
          "f = decorator(f)",
          "decorator = f",
          "def decorator(f)",
        ],
        answer: 1,
        explain: "Синтаксис @ — просто присваивание результата декоратора тому же имени сразу после определения функции.",
      },
    ],
    tasks: [
      {
        id: "py8t1",
        title: "Фабрика умножителей",
        md: `Реализуйте \`make_multiplier(factor)\` — возвращает функцию, умножающую аргумент на \`factor\`: \`m = make_multiplier(3); m(7)\` → \`21\`.`,
        starter: `def make_multiplier(factor):
    # верните функцию-замыкание
    pass

m = make_multiplier(3)
print(m(7))`,
        tests: `
__test("factor 3, x 7 → 21", lambda: (lambda m: m(7))(make_multiplier(3)), 21)
__test("factor 0 → 0", lambda: (lambda m: m(5))(make_multiplier(0)), 0)
__test("factor 2.5, x 4 → 10.0", lambda: (lambda m: m(4))(make_multiplier(2.5)), 10.0)
__test("фабрики независимы", lambda: (lambda a, b: (a(2), b(2)))(make_multiplier(10), make_multiplier(100)), (20, 200))`,
        solution: `def make_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply`,
      },
      {
        id: "py8t2",
        title: "Счётчик вызовов",
        md: `Реализуйте декоратор \`count_calls(fn)\`: обёртка ведёт себя как \`fn\` (те же аргументы и результат), но каждый вызов увеличивает атрибут \`wrapper.calls\`. Перед первым вызовом \`calls == 0\`.`,
        starter: `def count_calls(fn):
    # обёртка с атрибутом calls
    pass

@count_calls
def echo(x):
    return x

echo("а")
echo("б")
print(echo.calls)   # 2
print(echo("в"))    # в`,
        tests: `
def make_counted():
    @count_calls
    def echo(x):
        return x
    return echo

def three_calls():
    echo = make_counted()
    echo(1); echo(2); echo(3)
    return echo.calls

def keeps_result():
    echo = make_counted()
    return echo(42)

def starts_at_zero():
    echo = make_counted()
    return echo.calls

__test("3 вызова → calls == 3", three_calls, 3)
__test("результат функции сохраняется", keeps_result, 42)
__test("до вызовов calls == 0", starts_at_zero, 0)`,
        solution: `def count_calls(fn):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return fn(*args, **kwargs)
    wrapper.calls = 0
    return wrapper`,
      },
    ],
  },

  {
    id: "py9",
    language: "python",
    title: "Классы и ООП",
    subtitle: "__init__ и self, @property, наследование, dunder-методы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Классы

Конструктор — метод \`__init__\`, первый аргумент любого метода — \`self\` (ссылка на экземпляр, указывается явно). «Приватных» полей нет — есть соглашение: один \`_\` в начале имени означает «внутреннее, не трогать». \`@property\` превращает метод в атрибут-геттер.`,
      },
      {
        kind: "code",
        title: "Класс с property и цепочками",
        code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance     # «защищённое» по соглашению

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Сумма должна быть положительной")
        self._balance += amount
        return self                 # цепочки вызовов

acc = Account("Ада")
acc.deposit(100).deposit(50)
print(acc.balance)   # 150 — property, без скобок
print(acc.owner)     # Ада`,
      },
      {
        kind: "text",
        md: `## Наследование и полиморфизм

\`class Dog(Animal)\` — наследование; \`super().__init__(...)\` — вызов конструктора родителя. Переопределённые методы дают полиморфизм: один цикл работает с разными классами. \`isinstance\` проверяет принадлежность с учётом наследования.`,
      },
      {
        kind: "code",
        title: "Наследование",
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return self.name + ": гав!"

class Cat(Animal):
    def speak(self):
        return self.name + ": мяу!"

zoo = [Dog("Рекс"), Cat("Мурка")]
for animal in zoo:
    print(animal.speak())          # полиморфизм

print(isinstance(zoo[0], Animal))  # True — Dog это и Animal`,
      },
      {
        kind: "warn",
        title: "Забытый self",
        md: `Определите метод без \`self\` в сигнатуре — и при вызове получите загадочный \`TypeError: takes 0 positional arguments but 1 was given\`: Python честно передаёт экземпляр первым аргументом, а принимать его некому.`,
      },
    ],
    quiz: [
      {
        q: "Что такое self в методах класса?",
        options: [
          "Ключевое слово языка",
          "Ссылка на экземпляр — первый аргумент метода",
          "Класс объекта",
          "Глобальный контекст",
        ],
        answer: 1,
        explain: "self — обычное имя (по соглашению) для экземпляра, который Python передаёт первым аргументом при вызове метода.",
      },
      {
        q: "Зачем нужен @property?",
        options: [
          "Делает поле приватным",
          "Позволяет читать метод как атрибут, без скобок",
          "Ускоряет доступ",
          "Создаёт статическое поле",
        ],
        answer: 1,
        explain: "property — геттер, вызываемый синтаксисом атрибута: acc.balance вместо acc.balance().",
      },
    ],
    tasks: [
      {
        id: "py9t1",
        title: "Вектор",
        md: `Создайте \`class Vector\` с полями \`x\`, \`y\` и методами:
- \`add(v)\` — **новый** Vector с суммой координат
- \`length()\` — длина, округлённая до 2 знаков
- \`__str__\` — строка вида \`"(3, 4)"\` (работает для \`str(v)\` и \`print\`)`,
        starter: `class Vector:
    # __init__, add, length, __str__
    pass

v = Vector(3, 4)
print(v, v.length())`,
        tests: `
__test("str(Vector(3, 4)) → '(3, 4)'", lambda: str(Vector(3, 4)), "(3, 4)")
__test("length (3,4) → 5.0", lambda: Vector(3, 4).length(), 5.0)
__test("add не мутирует исходный", lambda: (lambda a: (a.add(Vector(10, 20)), str(a))[1])(Vector(1, 2)), "(1, 2)")
__test("add складывает", lambda: Vector(1, 2).add(Vector(10, 20)).length(), 36.06)`,
        solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def add(self, v):
        return Vector(self.x + v.x, self.y + v.y)

    def length(self):
        return round((self.x ** 2 + self.y ** 2) ** 0.5, 2)

    def __str__(self):
        return f"({self.x}, {self.y})"`,
      },
      {
        id: "py9t2",
        title: "Стек",
        md: `Создайте \`class Stack\` с методами:
- \`push(item)\` — добавить, вернуть новый размер
- \`pop()\` — снять верхний (пустой стек → \`None\`)
- \`peek()\` — посмотреть, не снимая
- \`size\` — property с количеством элементов`,
        starter: `class Stack:
    # ваш код
    pass

s = Stack()
s.push(1)
s.push(2)
print(s.pop(), s.peek(), s.size)`,
        tests: `
__test("push возвращает размер", lambda: (lambda s: (s.push("a"), s.push("b")))(Stack()), (1, 2))
def lifo():
    s = Stack()
    s.push(1); s.push(2); s.push(3)
    return [s.pop(), s.pop(), s.pop()]
__test("LIFO", lifo, [3, 2, 1])
__test("pop пустого → None", lambda: Stack().pop(), None)
__test("peek не снимает", lambda: (lambda s: (s.push(42), s.peek(), s.peek(), s.size)[-1])(Stack()), 1)`,
        solution: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)
        return len(self._items)

    def pop(self):
        if not self._items:
            return None
        return self._items.pop()

    def peek(self):
        return self._items[-1] if self._items else None

    @property
    def size(self):
        return len(self._items)`,
      },
    ],
  },

  {
    id: "py10",
    language: "python",
    title: "Генераторы и итераторы",
    subtitle: "yield, ленивые последовательности, генераторные выражения",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## yield

Функция с \`yield\` при вызове не выполняется — она возвращает **генератор**. Каждый \`next()\` исполняет код до следующего \`yield\`, «выдаёт» значение и ставит функцию на паузу. Генераторы могут быть **бесконечными** — значения производятся по запросу.`,
      },
      {
        kind: "code",
        title: "Бесконечная последовательность",
        code: `def naturals():
    n = 1
    while True:
        yield n
        n += 1

gen = naturals()
print(next(gen))   # 1
print(next(gen))   # 2

def take(it, count):
    result = []
    for item in it:
        if len(result) >= count:
            break
        result.append(item)
    return result

print(take(naturals(), 5))   # [1, 2, 3, 4, 5]`,
      },
      {
        kind: "text",
        md: `## Генераторные выражения

Круглые скобки вместо квадратных — \`(... for ...)\` — создают **ленивый** генератор: элементы вычисляются по одному, память O(1). \`sum(...)\`, \`min(...)\`, \`any(...)\` happily работают прямо с генератором.`,
      },
      {
        kind: "code",
        title: "Список против генератора",
        code: `squares_list = [x ** 2 for x in range(10_000)]  # весь в памяти
squares_gen  = (x ** 2 for x in range(10_000))  # ленивый

print(sum(squares_gen))              # 333283335000, память O(1)
print(sum(x for x in range(5) if x % 2))  # 1 + 3 = 4

# генератор одноразовый:
g = (x for x in [1, 2, 3])
print(list(g))   # [1, 2, 3]
print(list(g))   # [] — уже исчерпан`,
      },
      {
        kind: "tip",
        title: "yield from",
        md: `\`yield from another_gen\` делегирует итерацию другому генератору — аналог \`yield*\` из JavaScript. Удобен для сборки пайплайнов обработки данных.`,
      },
    ],
    quiz: [
      {
        q: "Что возвращает вызов генератор-функции?",
        options: [
          "Первое значение",
          "Объект-генератор, тело ещё не выполнялось",
          "Список всех значений",
          "None",
        ],
        answer: 1,
        explain: "Тело стартует только при первом next() — генераторы ленивы по природе.",
      },
      {
        q: "Чем (x for x in ...) отличается от [x for x in ...]?",
        options: [
          "Ничем",
          "Скобки — ленивый генератор, brackets — немедленный список",
          "Скобки работают быстрее, но без if",
          "Список нельзя итерировать дважды",
        ],
        answer: 1,
        explain: "Круглые скобки создают генератор (O(1) памяти, одноразовый), квадратные — готовый список.",
      },
    ],
    tasks: [
      {
        id: "py10t1",
        title: "Свой range",
        md: `Реализуйте генератор \`range_gen(start, stop, step=1)\` — числа от start до stop **невключительно**; поддержите отрицательный step. \`list(range_gen(0, 10, 3))\` → \`[0, 3, 6, 9]\`.`,
        starter: `def range_gen(start, stop, step=1):
    # yield в цикле
    pass

print(list(range_gen(1, 6)))
print(list(range_gen(0, 10, 3)))`,
        tests: `
__test("range_gen(1, 6) → [1..5]", lambda: list(range_gen(1, 6)), [1, 2, 3, 4, 5])
__test("range_gen(0, 10, 3)", lambda: list(range_gen(0, 10, 3)), [0, 3, 6, 9])
__test("пустой диапазон", lambda: list(range_gen(5, 5)), [])
__test("отрицательный шаг", lambda: list(range_gen(10, 0, -2)), [10, 8, 6, 4, 2])`,
        solution: `def range_gen(start, stop, step=1):
    current = start
    if step > 0:
        while current < stop:
            yield current
            current += step
    else:
        while current > stop:
            yield current
            current += step`,
      },
      {
        id: "py10t2",
        title: "Фибоначчи навсегда",
        md: `Реализуйте **бесконечный** генератор \`fib()\`, выдающий числа Фибоначчи: 0, 1, 1, 2, 3, 5, 8… Для проверки уже импортирован \`islice\` из itertools.`,
        starter: `from itertools import islice

def fib():
    # бесконечный генератор
    pass

print(list(islice(fib(), 10)))`,
        tests: `
def head7():
    return list(islice(fib(), 7))
def head1():
    return list(islice(fib(), 1))
__test("первые 7 чисел", head7, [0, 1, 1, 2, 3, 5, 8])
__test("первое число — 0", head1, [0])
def tenth():
    return list(islice(fib(), 9, 10))
__test("10-е число — 34", tenth, [34])`,
        solution: `from itertools import islice

def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b`,
      },
    ],
  },

  {
    id: "py11",
    language: "python",
    title: "Исключения и контекстные менеджеры",
    subtitle: "try/except/else/finally, свои исключения, протокол with",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## try/except

Ловим **конкретные** типы исключений. \`else\` выполняется, когда исключений не было, \`finally\` — всегда (освобождение ресурсов). Свои ошибки — классы, наследующие \`Exception\`: у них бесплатные \`args\`, строковое представление и место в иерархии.`,
      },
      {
        kind: "code",
        title: "Свои исключения",
        code: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

print(safe_int("42"), safe_int("abc"))   # 42 None

class NegativeError(Exception):
    """Бросается при отрицательном значении."""

def sqrt_or_raise(x):
    if x < 0:
        raise NegativeError(f"отрицательное: {x}")
    return x ** 0.5

try:
    sqrt_or_raise(-4)
except NegativeError as e:
    print("поймали:", e)`,
      },
      {
        kind: "text",
        md: `## with и контекстные менеджеры

\`with obj:\` гарантирует вызов «уборки» даже при исключении. Внутри — протокол \`__enter__\` / \`__exit__\`. Классика — файлы: \`with open(path) as f\`. Если \`__exit__\` вернёт \`True\` — исключение будет **подавлено**.`,
      },
      {
        kind: "code",
        title: "Свой контекстный менеджер",
        code: `class Guard:
    def __enter__(self):
        print("открываю ресурс")
        return self

    def __exit__(self, exc_type, exc, tb):
        name = exc_type.__name__ if exc_type else None
        print("закрываю ресурс, исключение:", name)
        return False    # не гасим исключения

with Guard():
    print("работаю")

try:
    with Guard():
        raise KeyError("упс")
except KeyError:
    print("исключение дошло наружу")`,
      },
      {
        kind: "warn",
        title: "Голый except — зло",
        md: `\`except:\` без типа ловит вообще всё, включая \`KeyboardInterrupt\` и \`SystemExit\` — процесс перестаёт убиваться по Ctrl+C. Всегда указывайте тип, а лучше — кортеж типов.`,
      },
    ],
    quiz: [
      {
        q: "Когда выполняется блок else у try?",
        options: [
          "Всегда",
          "Когда исключение поймано",
          "Когда исключений не было",
          "После finally",
        ],
        answer: 2,
        explain: "else — «успешная ветка»: тело try отработало без единого исключения.",
      },
      {
        q: "Что произойдёт, если __exit__ вернёт True?",
        options: [
          "Исключение будет подавлено, выполнение продолжится",
          "Исключение перебросится выше",
          "Программа завершится",
          "Вернётся значение True из with",
        ],
        answer: 0,
        explain: "True от __exit__ означает «я разобрался» — исключение гасится, и код после with выполняется как ни в чём не бывало.",
      },
    ],
    tasks: [
      {
        id: "py11t1",
        title: "Корень с проверкой",
        md: `Определите исключение \`NegativeValueError\` (наследник \`Exception\`) и функцию \`sqrt_safe(x)\`: при \`x < 0\` бросает \`NegativeValueError\` с сообщением \`"нельзя извлекать корень из отрицательного"\`, иначе возвращает \`x ** 0.5\`.`,
        starter: `class NegativeValueError(Exception):
    pass

def sqrt_safe(x):
    # ваш код
    pass

print(sqrt_safe(16))
try:
    sqrt_safe(-1)
except NegativeValueError as e:
    print("ошибка:", e)`,
        tests: `
__test("sqrt_safe(16) → 4.0", lambda: sqrt_safe(16), 4.0)
__test("sqrt_safe(0) → 0.0", lambda: sqrt_safe(0), 0.0)
def catches():
    try:
        sqrt_safe(-9)
        return "не бросило"
    except NegativeValueError as e:
        return str(e)
__test("бросает NegativeValueError с сообщением", catches, "нельзя извлекать корень из отрицательного")
def is_exception():
    return issubclass(NegativeValueError, Exception)
__test("NegativeValueError — наследник Exception", is_exception, True)`,
        solution: `class NegativeValueError(Exception):
    pass

def sqrt_safe(x):
    if x < 0:
        raise NegativeValueError("нельзя извлекать корень из отрицательного")
    return x ** 0.5`,
      },
      {
        id: "py11t2",
        title: "Контекстный коллектор",
        md: `Создайте \`class Collector\` — контекстный менеджер: \`__enter__\` возвращает себя, у него есть список \`items\` и метод \`add(x)\`. \`__exit__\` должен возвращать \`False\` — исключения **не гасятся** и доходят до вызывающего кода.`,
        starter: `class Collector:
    # __init__, add, __enter__, __exit__
    pass

with Collector() as c:
    c.add(1)
    c.add(2)
print(c.items)   # [1, 2]`,
        tests: `
def collects():
    with Collector() as c:
        c.add(1)
        c.add(2)
    return c.items
def propagates():
    try:
        with Collector() as c:
            c.add("x")
            raise ValueError("boom")
    except ValueError:
        return "дошло"
    return "поглощено"
__test("собирает элементы", collects, [1, 2])
__test("исключения не гасятся", propagates, "дошло")`,
        solution: `class Collector:
    def __init__(self):
        self.items = []

    def add(self, x):
        self.items.append(x)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False`,
      },
    ],
  },

  {
    id: "py12",
    language: "python",
    title: "Типизация и стиль",
    subtitle: "Аннотации типов, dataclass, PEP 8 и экосистема",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Аннотации типов

Подсказки типов **не проверяются** интерпретатором — они документация для людей и пища для статического анализатора \`mypy\`. Современный синтаксис: \`list[int]\`, \`dict[str, int]\`, \`str | None\`.`,
      },
      {
        kind: "code",
        title: "Аннотации",
        code: `def greet(name: str, times: int = 1) -> str:
    return ("Привет, " + name + "! ") * times

print(greet("Ада", 2).strip())

from typing import Optional

def find_first(items: list[int], predicate) -> Optional[int]:
    for item in items:
        if predicate(item):
            return item
    return None

print(find_first([1, 3, 8, 9], lambda x: x % 2 == 0))  # 8
print(find_first([1, 3], lambda x: x > 10))            # None`,
      },
      {
        kind: "text",
        md: `## dataclass — классы без бойлерплейта

Декоратор \`@dataclass\` генерирует \`__init__\`, \`__repr__\` и \`__eq__\` по полям. Класс на 30 строк сжимается до четырёх — и остаётся полноценным классом с методами.`,
      },
      {
        kind: "code",
        title: "dataclass в деле",
        code: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p = Point(1.5, 2.5)
print(p)                       # Point(x=1.5, y=2.5)
print(p == Point(1.5, 2.5))    # True — __eq__ из коробки
print(p.x + p.y)               # 4.0 — методы работают как обычно`,
      },
      {
        kind: "text",
        md: `## Экосистема

- **PEP 8**: snake_case, 4 пробела, осмысленные имена
- **ruff** / **black** — линтер и форматтер: код всегда в одном стиле
- **venv + pip** — изолированные окружения и пакеты
- **pytest** — стандарт тестирования; наш песочный \`__test\` — его крошечный родственник`,
      },
      {
        kind: "tip",
        title: "Куда расти",
        md: `Дальше — \`async/await\` (модель та же, что в JS), веб-фреймворки FastAPI/Django, работа с данными: pandas, polars. Но главный совет прежний: пишите код каждый день и читайте чужой — Python учится чтением.`,
      },
    ],
    quiz: [
      {
        q: "Что делают аннотации типов во время выполнения?",
        options: [
          "Бросают TypeError при несоответствии",
          "Ничего — это подсказки для mypy и людей",
          "Ускоряют код",
          "Конвертируют значения",
        ],
        answer: 1,
        explain: "Интерпретатор игнорирует аннотации при исполнении. Проверка — задача статических инструментов.",
      },
      {
        q: "Что @dataclass генерирует автоматически?",
        options: [
          "Только __init__",
          "__init__, __repr__, __eq__ и другие",
          "Приватные поля",
          "Статические методы",
        ],
        answer: 1,
        explain: "dataclass создаёт конструктор, читаемый repr и сравнение по значениям полей — главный бойлерплейт.",
      },
    ],
    tasks: [
      {
        id: "py12t1",
        title: "Точка на плоскости",
        md: `Создайте \`@dataclass Point\` с полями \`x: float\`, \`y: float\` и методом \`distance_to(other)\` — расстояние до другой точки, округлённое до 2 знаков. Сравнение \`==\` должно работать из коробки.`,
        starter: `from dataclasses import dataclass

@dataclass
class Point:
    # поля и метод distance_to
    pass

print(Point(0, 0).distance_to(Point(3, 4)))`,
        tests: `
__test("расстояние (0,0)-(3,4) → 5.0", lambda: Point(0, 0).distance_to(Point(3, 4)), 5.0)
__test("равенство из коробки", lambda: Point(1, 2) == Point(1, 2), True)
__test("distance до себя → 0.0", lambda: Point(5, 5).distance_to(Point(5, 5)), 0.0)
__test("repr читаемый", lambda: "Point" in repr(Point(1, 2)), True)`,
        solution: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance_to(self, other) -> float:
        return round(((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5, 2)`,
      },
      {
        id: "py12t2",
        title: "Топ результатов",
        md: `Реализуйте \`top_scores(scores: dict[str, int], limit: int) -> list[tuple[str, int]]\` — пары (имя, балл), отсортированные по баллу **по убыванию**, не более \`limit\` штук.`,
        starter: `def top_scores(scores: dict[str, int], limit: int):
    # sorted + срезы
    pass

print(top_scores({"ада": 92, "алан": 97, "грейс": 95}, 2))`,
        tests: `
__test("сортировка и лимит", lambda: top_scores({"a": 1, "b": 5, "c": 3}, 2), [("b", 5), ("c", 3)])
__test("пустой словарь", lambda: top_scores({}, 5), [])
__test("лимит больше размера", lambda: top_scores({"x": 7}, 10), [("x", 7)])
__test("лимит 0", lambda: top_scores({"x": 7}, 0), [])`,
        solution: `def top_scores(scores: dict[str, int], limit: int):
    ordered = sorted(scores.items(), key=lambda pair: pair[1], reverse=True)
    return ordered[:limit]`,
      },
    ],
  },

  {
    id: "py13",
    language: "python",
    title: "Модули, ввод/вывод и сериализация",
    subtitle: "import, input(), файлы, JSON, CSV — работа с данными и пакетами",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Модули и пакеты

\`import math\` — подключаем модуль целиком. \`from os import path\` — только конкретное имя. \`import numpy as np\` — псевдоним. Пакет — директория с \`__init__.py\` и модулями внутри.

Стандартная библиотека огромна: \`os\`, \`sys\`, \`json\`, \`csv\`, \`datetime\`, \`random\`, \`math\`, \`re\`, \`collections\` — и это только начало.`,
      },
      {
        kind: "code",
        title: "Импорт в действии",
        code: `import math
print(math.pi, math.sqrt(16))

from datetime import datetime
print(datetime.now().strftime("%Y-%m-%d"))

from collections import Counter
words = ["кот", "пёс", "кот", "кот", "пёс"]
print(Counter(words))  # Counter({'кот': 3, 'пёс': 2})`,
      },
      {
        kind: "text",
        md: `## Ввод и вывод

\`input()\` читает строку с клавиатуры (в песочнице недоступно — там только print). Файлы — через \`open()\` с \`with\`: \`with open(path, "r") as f: content = f.read()\`. Режимы: \`"r"\` (чтение), \`"w"\` (перезапись), \`"a"\` (дописывание).`,
      },
      {
        kind: "code",
        title: "Файлы (демонстрация)",
        code: `# В песочнице файлы недоступны, но синтаксис такой:
# with open("data.txt", "w") as f:
#     f.write("привет\\n")
#     f.write("мир\\n")

# with open("data.txt", "r") as f:
#     lines = f.readlines()
#     print(lines)

print("Файлы: open() + with + read/write")
print("Режимы: r, w, a, rb, wb")`,
      },
      {
        kind: "text",
        md: `## JSON и CSV

\`json.dumps(obj)\` — сериализация в строку, \`json.loads(str)\` — обратно. \`json.dump(obj, file)\` — запись в файл, \`json.load(file)\` — чтение.

\`csv.reader\` / \`csv.writer\` — работа с CSV. \`csv.DictReader\` — строки как словари.`,
      },
      {
        kind: "code",
        title: "JSON и CSV",
        code: `import json
import csv
from io import StringIO  # для демонстрации без файлов

data = {"name": "Ада", "age": 36, "langs": ["python", "js"]}
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

parsed = json.loads(json_str)
print(parsed["name"], parsed["langs"])

# CSV (демонстрация через StringIO)
csv_data = "name,age\\nАда,36\\nГвидо,67"
reader = csv.DictReader(StringIO(csv_data))
for row in reader:
    print(row)`,
      },
      {
        kind: "tip",
        title: "Когда что использовать",
        md: `Конфигурация — JSON или YAML. Табличные данные — CSV или pandas. Бинарные — pickle (но осторожно: небезопасно для чужих данных). Для баз — SQLite (\`sqlite3\` в стандартной библиотеке).`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт json.loads('{\"a\": 1}')?",
        options: ["{'a': 1}", "{\"a\": 1}", "{'a': 1} как dict", "ошибку"],
        answer: 2,
        explain: "loads парсит JSON-строку в Python-объект: словарь {'a': 1}.",
      },
      {
        q: "Какой режим open() перезаписывает файл?",
        options: ["r", "w", "a", "x"],
        answer: 1,
        explain: "w — write, перезаписывает. a — append, дописывает. r — read (по умолчанию). x — эксклюзивное создание.",
      },
    ],
    tasks: [
      {
        id: "py13t1",
        title: "JSON-сериализация",
        md: `Реализуйте \`to_json(obj)\` — превращает словарь в JSON-строку с \`indent=2\` и \`ensure_ascii=False\`. \`to_json({"a": 1})\` → \`'{\\n  "a": 1\\n}'\`.`,
        starter: `import json

def to_json(obj):
    # ваш код
    pass

print(to_json({"name": "Ада", "age": 36}))`,
        tests: `
__test("простой словарь", lambda: json.loads(to_json({"a": 1})), {"a": 1})
__test("кириллица сохраняется", lambda: "Ада" in to_json({"name": "Ада"}), True)
__test("отступы 2 пробела", lambda: "\\n  " in to_json({"a": 1}), True)`,
        solution: `import json

def to_json(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)`,
      },
      {
        id: "py13t2",
        title: "Парсер CSV",
        md: `Реализуйте \`parse_csv(text)\` — принимает CSV-строку с заголовком, возвращает список словарей. \`parse_csv("a,b\\n1,2")\` → \`[{'a': '1', 'b': '2'}]\`.`,
        starter: `import csv
from io import StringIO

def parse_csv(text):
    # ваш код
    pass

print(parse_csv("name,age\\nАда,36\\nГвидо,67"))`,
        tests: `
__test("одна строка", lambda: parse_csv("x,y\\n1,2"), [{"x": "1", "y": "2"}])
__test("две строки", lambda: parse_csv("a,b\\n1,2\\n3,4"), [{"a": "1", "b": "2"}, {"a": "3", "b": "4"}])
__test("кириллица", lambda: parse_csv("имя\\nАда"), [{"имя": "Ада"}])`,
        solution: `import csv
from io import StringIO

def parse_csv(text):
    reader = csv.DictReader(StringIO(text))
    return list(reader)`,
      },
    ],
  },

  {
    id: "py14",
    language: "python",
    title: "Регулярные выражения",
    subtitle: "re-модуль, паттерны, группы, поиск и замена",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## re-модуль

\`re.search(pattern, text)\` — первый матч, \`re.findall\` — все, \`re.sub\` — замена. Паттерны: \`\\d\` (цифра), \`\\w\` (слово), \`\\s\` (пробел), \`+\` (один или более), \`*\` (ноль или более), \`?\` (ноль или один).`,
      },
      {
        kind: "code",
        title: "Базовые паттерны",
        code: `import re

text = "Заказ №123, сумма 456.78 руб."

# Найти число
print(re.search(r"\\d+", text).group())  # 123

# Все числа
print(re.findall(r"\\d+", text))  # ['123', '456', '78']

# Дробное число
print(re.findall(r"\\d+\\.\\d+", text))  # ['456.78']

# Слово
print(re.findall(r"\\w+", text))  # ['Заказ', '123', 'сумма', '456', '78', 'руб']`,
      },
      {
        kind: "text",
        md: `## Группы и замена

Круглые скобки \`(...)\` — группы. \`\\1\` — ссылка на первую группу в шаблоне замены. \`re.sub\` заменяет все вхождения.`,
      },
      {
        kind: "code",
        title: "Группы и sub",
        code: `import re

# Извлечь домен из email
email = "user@example.com"
match = re.search(r"@(\\w+\\.\\w+)", email)
print(match.group(1))  # example.com

# Заменить все пробелы на дефис
text = "hello world python"
print(re.sub(r"\\s+", "-", text))  # hello-world-python

# Ссылка на группу в замене
text = "2026-02-14"
print(re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3.\\2.\\1", text))  # 14.02.2026`,
      },
      {
        kind: "warn",
        title: "Raw-строки для паттернов",
        md: `Всегда используйте \`r"..." \` (raw-строки) для регулярных выражений: \`r"\\d+"\` вместо \`"\\\\d+"\`. Иначе придётся экранировать обратные слеши дважды.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт re.findall(r'\\d+', 'abc123def456')?",
        options: ["['123', '456']", "['abc', 'def']", "['123456']", "ошибку"],
        answer: 0,
        explain: "findall находит все непересекающиеся вхождения: два числа 123 и 456.",
      },
      {
        q: "Зачем нужны круглые скобки в паттерне?",
        options: [
          "Для группировки и извлечения подвыражений",
          "Для повторения",
          "Для альтернативы",
          "Для комментария",
        ],
        answer: 0,
        explain: "Скобки создают группу: её можно извлечь через group(1), group(2) и использовать в замене.",
      },
    ],
    tasks: [
      {
        id: "py14t1",
        title: "Извлечь числа",
        md: `Реализуйте \`extract_numbers(text)\` — список всех целых чисел из строки. \`extract_numbers("a1b23c456")\` → \`['1', '23', '456']\`.`,
        starter: `import re

def extract_numbers(text):
    # ваш код
    pass

print(extract_numbers("заказ 123, сумма 456"))`,
        tests: `
__test("простой случай", lambda: extract_numbers("a1b23c456"), ["1", "23", "456"])
__test("нет чисел", lambda: extract_numbers("abc"), [])
__test("только числа", lambda: extract_numbers("123"), ["123"])`,
        solution: `import re

def extract_numbers(text):
    return re.findall(r"\\d+", text)`,
      },
      {
        id: "py14t2",
        title: "Формат даты",
        md: `Реализуйте \`reformat_date(text)\` — заменяет \`YYYY-MM-DD\` на \`DD.MM.YYYY\`. \`reformat_date("2026-02-14")\` → \`"14.02.2026"\`.`,
        starter: `import re

def reformat_date(text):
    # ваш код
    pass

print(reformat_date("дата: 2026-02-14"))`,
        tests: `
__test("простая дата", lambda: reformat_date("2026-02-14"), "14.02.2026")
__test("в тексте", lambda: reformat_date("событие 2026-12-31"), "событие 31.12.2026")
__test("несколько дат", lambda: reformat_date("2026-01-01 и 2026-12-31"), "01.01.2026 и 31.12.2026")`,
        solution: `import re

def reformat_date(text):
    return re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3.\\2.\\1", text)`,
      },
    ],
  },

  {
    id: "py15",
    language: "python",
    title: "Функциональный стиль и анализ кода",
    subtitle: "map/filter/reduce, functools.partial, mypy, ruff",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## map, filter, reduce

\`map(fn, iterable)\` — применяет функцию к каждому элементу. \`filter(fn, iterable)\` — оставляет только те, для которых \`fn\` вернула \`True\`. \`reduce(fn, iterable)\` — сворачивает в одно значение (из \`functools\`).`,
      },
      {
        kind: "code",
        title: "Функциональная троица",
        code: `from functools import reduce

nums = [1, 2, 3, 4, 5]

# map: удвоить каждое
print(list(map(lambda x: x * 2, nums)))  # [2, 4, 6, 8, 10]

# filter: только чётные
print(list(filter(lambda x: x % 2 == 0, nums)))  # [2, 4]

# reduce: сумма
print(reduce(lambda a, b: a + b, nums))  # 15

# reduce с начальным значением
print(reduce(lambda a, b: a + b, nums, 100))  # 115`,
      },
      {
        kind: "text",
        md: `## Частичные функции

\`functools.partial(fn, *args)\` — фиксирует часть аргументов, возвращает новую функцию. Удобно для создания специализаций.`,
      },
      {
        kind: "code",
        title: "partial в деле",
        code: `from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)

print(square(5))   # 25
print(cube(5))     # 125

# partial с позиционными аргументами
def greet(greeting, name):
    return f"{greeting}, {name}!"

hello = partial(greet, "Привет")
print(hello("Ада"))  # Привет, Ада!`,
      },
      {
        kind: "text",
        md: `## Анализ кода

**mypy** — статическая проверка типов. Запуск: \`mypy script.py\`. Проверяет аннотации типов, находит несоответствия.

**ruff** / **black** — линтер и форматтер. \`ruff check .\` — найти проблемы стиля, \`ruff format .\` — отформатировать. \`black\` — альтернатива форматтеру.`,
      },
      {
        kind: "code",
        title: "Пример для mypy (демонстрация)",
        code: `# Код с аннотациями типов:
def greet(name: str, times: int = 1) -> str:
    return ("Привет, " + name + "! ") * times

# mypy проверит:
# - name должен быть str
# - times должен быть int
# - возвращаемое значение — str

# Ошибка, которую поймает mypy:
# result: int = greet("Ада")  # TypeError: str, не int

print("mypy проверяет типы статически")
print("ruff/black форматируют код")`,
      },
      {
        kind: "tip",
        title: "Когда что использовать",
        md: `map/filter — когда логика простая и однострочная. Comprehensions — когда сложнее или с условиями. reduce — для свёрток (сумма, произведение, конкатенация). partial — когда нужно зафиксировать часть аргументов для переиспользования.`,
      },
    ],
    quiz: [
      {
        q: "Что вернёт reduce(lambda a, b: a * b, [1, 2, 3, 4])?",
        options: ["10", "24", "[1, 2, 3, 4]", "ошибку"],
        answer: 1,
        explain: "reduce сворачивает: ((((1*2)*3)*4) = 24.",
      },
      {
        q: "Что делает functools.partial?",
        options: [
          "Фиксирует часть аргументов функции",
          "Делает функцию частичной (неполной)",
          "Удаляет аргументы",
          "Создаёт генератор",
        ],
        answer: 0,
        explain: "partial возвращает новую функцию с зафиксированными аргументами — специализацию оригинала.",
      },
    ],
    tasks: [
      {
        id: "py15t1",
        title: "Сумма квадратов",
        md: `Реализуйте \`sum_of_squares(nums)\` — сумму квадратов чисел, используя \`map\` и \`reduce\`. \`sum_of_squares([1, 2, 3])\` → \`14\` (1+4+9).`,
        starter: `from functools import reduce

def sum_of_squares(nums):
    # map + reduce
    pass

print(sum_of_squares([1, 2, 3]))`,
        tests: `
__test("[1,2,3] → 14", lambda: sum_of_squares([1, 2, 3]), 14)
__test("[2,3] → 13", lambda: sum_of_squares([2, 3]), 13)
__test("пустой список → 0", lambda: sum_of_squares([]), 0)`,
        solution: `from functools import reduce

def sum_of_squares(nums):
    squares = map(lambda x: x ** 2, nums)
    return reduce(lambda a, b: a + b, squares, 0)`,
      },
      {
        id: "py15t2",
        title: "Частичное умножение",
        md: `Реализуйте \`make_multiplier(factor)\` через \`partial\` — возвращает функцию, умножающую аргумент на \`factor\`. \`m = make_multiplier(3); m(7)\` → \`21\`.`,
        starter: `from functools import partial

def multiply(a, b):
    return a * b

def make_multiplier(factor):
    # partial
    pass

m = make_multiplier(3)
print(m(7))`,
        tests: `
__test("factor 3, x 7 → 21", lambda: make_multiplier(3)(7), 21)
__test("factor 0 → 0", lambda: make_multiplier(0)(5), 0)
__test("factor 2.5, x 4 → 10.0", lambda: make_multiplier(2.5)(4), 10.0)`,
        solution: `from functools import partial

def multiply(a, b):
    return a * b

def make_multiplier(factor):
    return partial(multiply, b=factor)`,
      },
    ],
  },

  {
    id: "py16",
    language: "python",
    title: "Основы командной строки",
    subtitle: "Терминал, навигация, работа с файлами и папками — базовый инструмент DevOps",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Почему CLI важен

Командная строка (CLI) — основной инструмент разработчика и DevOps-инженера. Графический интерфейс удобен, но терминал даёт скорость, автоматизацию и контроль. Большинство серверов работают без GUI — только CLI.

Основные оболочки: **bash** (Linux/macOS), **PowerShell** (Windows), **zsh** (macOS по умолчанию).`,
      },
      {
        kind: "text",
        md: `## Навигация по файловой системе

- \`pwd\` — текущая директория (print working directory)
- \`ls\` (или \`dir\` в Windows) — список файлов
- \`cd <path>\` — сменить директорию
- \`cd ..\` — на уровень выше
- \`cd ~\` — в домашнюю директорию
- \`cd -\` — вернуться в предыдущую`,
      },
      {
        kind: "code",
        title: "Пример навигации",
        code: `# В терминале (не Python):
# $ pwd
# /home/user/projects
# $ ls
# app.py  data/  requirements.txt
# $ cd data
# $ pwd
# /home/user/projects/data
# $ ls
# users.csv  config.json
# $ cd ..
# $ pwd
# /home/user/projects

print("Команды терминала выполняются в оболочке, не в Python")
print("Python запускается командой: python или python3")`,
      },
      {
        kind: "text",
        md: `## Работа с файлами и папками

- \`mkdir <name>\` — создать директорию
- \`touch <file>\` — создать пустой файл
- \`cp <src> <dst>\` — копировать
- \`mv <src> <dst>\` — переместить или переименовать
- \`rm <file>\` — удалить файл
- \`rm -r <dir>\` — удалить директорию рекурсивно
- \`cat <file>\` — вывести содержимое
- \`head -n 10 <file>\` — первые 10 строк
- \`tail -n 10 <file>\` — последние 10 строк`,
      },
      {
        kind: "text",
        md: `## Запуск Python-скриптов

- \`python script.py\` — запустить скрипт
- \`python3 script.py\` — явно Python 3 (Linux/macOS)
- \`python -m pip install <package>\` — установить пакет
- \`python -c "print('hello')"\` — выполнить код одной строкой

Флаги: \`-v\` (verbose), \`-h\` (help), \`--version\`.`,
      },
      {
        kind: "code",
        title: "Примеры команд",
        code: `# Создание проекта:
# $ mkdir my_project
# $ cd my_project
# $ touch main.py
# $ python main.py

# Поиск файлов:
# $ find . -name "*.py"
# $ grep -r "def " .

# Переменные окружения:
# $ export PATH=$PATH:/custom/path
# $ echo $PATH

print("CLI — это навык, который экономит часы работы")
print("Автоматизация через shell-скрипты — сила терминала")`,
      },
      {
        kind: "tip",
        title: "Полезные сочетания клавиш",
        md: `- \`Tab\` — автодополнение (имён файлов, команд)
- \`Ctrl+R\` — поиск по истории команд
- \`Ctrl+C\` — прервать выполнение
- \`Ctrl+D\` — выйти из оболочки
- \`↑/↓\` — навигация по истории`,
      },
    ],
    quiz: [
      {
        q: "Какая команда показывает текущую директорию?",
        options: ["ls", "cd", "pwd", "dir"],
        answer: 2,
        explain: "pwd (print working directory) выводит полный путь к текущей папке.",
      },
      {
        q: "Как создать пустой файл в терминале?",
        options: ["mkdir file.txt", "touch file.txt", "create file.txt", "new file.txt"],
        answer: 1,
        explain: "touch создаёт пустой файл или обновляет время модификации существующего.",
      },
    ],
    tasks: [
      {
        id: "py16t1",
        title: "Последовательность команд",
        md: `Реализуйте функцию \`build_commands()\`, возвращающую список команд для создания структуры проекта: папка \`app\`, файл \`app/main.py\`, папка \`tests\`, файл \`tests/test_main.py\`. Порядок важен.`,
        starter: `def build_commands():
    # верните список строк-команд
    pass

for cmd in build_commands():
    print(cmd)`,
        tests: `
__test("создаёт папку app", lambda: "mkdir app" in build_commands(), True)
__test("создаёт файл main.py", lambda: any("main.py" in cmd for cmd in build_commands()), True)
__test("создаёт папку tests", lambda: "mkdir tests" in build_commands(), True)
__test("создаёт файл test_main.py", lambda: any("test_main.py" in cmd for cmd in build_commands()), True)
__test("порядок: сначала mkdir, потом touch", lambda: build_commands().index("mkdir app") < build_commands().index([c for c in build_commands() if "main.py" in c][0]), True)`,
        solution: `def build_commands():
    return [
        "mkdir app",
        "touch app/main.py",
        "mkdir tests",
        "touch tests/test_main.py",
    ]`,
      },
      {
        id: "py16t2",
        title: "Фильтр файлов",
        md: `Реализуйте \`filter_py_files(files)\` — принимает список имён файлов, возвращает только те, что заканчиваются на \`.py\`.`,
        starter: `def filter_py_files(files):
    # ваш код
    pass

print(filter_py_files(["main.py", "data.csv", "utils.py", "README.md"]))`,
        tests: `
__test("фильтрует .py", lambda: filter_py_files(["a.py", "b.txt", "c.py"]), ["a.py", "c.py"])
__test("пустой список", lambda: filter_py_files([]), [])
__test("нет .py файлов", lambda: filter_py_files(["a.txt", "b.csv"]), [])
__test("все .py", lambda: filter_py_files(["x.py", "y.py"]), ["x.py", "y.py"])`,
        solution: `def filter_py_files(files):
    return [f for f in files if f.endswith(".py")]`,
      },
    ],
  },

  {
    id: "py17",
    language: "python",
    title: "Введение в Git",
    subtitle: "Система контроля версий: коммиты, ветки, история, workflow",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Git

Git — распределённая система контроля версий. Она хранит историю изменений, позволяет работать параллельно над разными функциями (ветки), откатываться к предыдущим состояниям и сотрудничать в команде.

Без Git: «final_v2_REALLY_FINAL.py». С Git: каждый коммит — снимок проекта с комментарием.`,
      },
      {
        kind: "text",
        md: `## Базовые команды

- \`git init\` — инициализировать репозиторий в текущей папке
- \`git status\` — показать состояние файлов (изменённые, новые, удалённые)
- \`git add <file>\` — добавить файл в staging area (подготовить к коммиту)
- \`git add .\` — добавить все изменения
- \`git commit -m "сообщение"\` — сохранить снимок с комментарием
- \`git log\` — история коммитов
- \`git log --oneline\` — компактная история`,
      },
      {
        kind: "code",
        title: "Пример workflow",
        code: `# Инициализация и первый коммит:
# $ git init
# $ echo "print('hello')" > main.py
# $ git add main.py
# $ git commit -m "Initial commit"

# Изменение файла:
# $ echo "print('world')" >> main.py
# $ git status
# On branch main
# Changes not staged for commit:
#   modified: main.py
# $ git add main.py
# $ git commit -m "Add world output"

# История:
# $ git log --oneline
# a1b2c3d Add world output
# e4f5g6h Initial commit

print("Git хранит снимки, а не различия")
print("Каждый коммит — уникальный хеш (a1b2c3d...)")`,
      },
      {
        kind: "text",
        md: `## Ветки (branches)

Ветка — параллельная линия разработки. По умолчанию — \`main\` (или \`master\`).

- \`git branch\` — список веток
- \`git branch <name>\` — создать ветку
- \`git checkout <branch>\` — переключиться на ветку
- \`git checkout -b <name>\` — создать и переключиться
- \`git merge <branch>\` — слить ветку в текущую`,
      },
      {
        kind: "code",
        title: "Работа с ветками",
        code: `# Создание feature-ветки:
# $ git checkout -b feature/login
# Switched to a new branch 'feature/login'

# Работа в ветке:
# $ echo "def login()..." > auth.py
# $ git add auth.py
# $ git commit -m "Add login function"

# Возврат в main и слияние:
# $ git checkout main
# $ git merge feature/login
# Updating e4f5g6h..i7j8k9l
# Fast-forward
#  auth.py | 1 +
#  1 file changed, 1 insertion(+)

print("Ветки позволяют работать над фичами изолированно")
print("Merge объединяет изменения в основную ветку")`,
      },
      {
        kind: "text",
        md: `## Удалённые репозитории

GitHub, GitLab, Bitbucket — хостинги для Git-репозиториев.

- \`git remote add origin <url>\` — добавить удалённый репозиторий
- \`git push origin <branch>\` — отправить ветку на сервер
- \`git pull origin <branch>\` — получить изменения с сервера
- \`git clone <url>\` — клонировать репозиторий`,
      },
      {
        kind: "warn",
        title: "Не коммитьте секреты",
        md: `Никогда не добавляйте в Git пароли, API-ключи, приватные данные. Используйте \`.gitignore\` для исключения файлов: \`*.env\`, \`secrets.json\`, \`__pycache__/\`.`,
      },
      {
        kind: "tip",
        title: "Хорошие сообщения коммитов",
        md: `Пишите кратко и по делу: \`"Add user authentication"\`, \`"Fix bug in login form"\`, \`"Update README with installation steps"\`. Избегайте: \`"fix"\`, \`"update"\`, \`"wip"\`.`,
      },
    ],
    quiz: [
      {
        q: "Какая команда создаёт новый коммит?",
        options: ["git save", "git commit", "git push", "git add"],
        answer: 1,
        explain: "git commit сохраняет снимок staging area с комментарием. git add только подготавливает файлы.",
      },
      {
        q: "Что делает git checkout -b feature?",
        options: [
          "Удаляет ветку feature",
          "Создаёт ветку feature и переключается на неё",
          "Сливает ветку feature в текущую",
          "Показывает изменения в ветке feature",
        ],
        answer: 1,
        explain: "checkout -b создаёт новую ветку и сразу переключается на неё — комбинация git branch + git checkout.",
      },
    ],
    tasks: [
      {
        id: "py17t1",
        title: "Последовательность Git-команд",
        md: `Реализуйте \`git_workflow()\` — возвращает список команд для: инициализации репозитория, добавления файла \`main.py\`, коммита с сообщением \`"Initial commit"\`.`,
        starter: `def git_workflow():
    # верните список команд
    pass

for cmd in git_workflow():
    print(cmd)`,
        tests: `
__test("инициализация", lambda: "git init" in git_workflow(), True)
__test("добавление файла", lambda: "git add main.py" in git_workflow(), True)
__test("коммит", lambda: any("git commit" in cmd and "Initial commit" in cmd for cmd in git_workflow()), True)
__test("порядок: init → add → commit", lambda: (
    git_workflow().index("git init") < 
    git_workflow().index("git add main.py") < 
    [i for i, c in enumerate(git_workflow()) if "git commit" in c][0]
), True)`,
        solution: `def git_workflow():
    return [
        "git init",
        "git add main.py",
        'git commit -m "Initial commit"',
    ]`,
      },
      {
        id: "py17t2",
        title: "Фильтр коммитов",
        md: `Реализуйте \`filter_commits(commits, keyword)\` — принимает список коммитов (строки) и ключевое слово, возвращает только те коммиты, где встречается слово (регистр не важен).`,
        starter: `def filter_commits(commits, keyword):
    # ваш код
    pass

print(filter_commits(
    ["Add login", "Fix bug", "Add logout", "Update docs"],
    "add"
))`,
        tests: `
__test("фильтр по ключевому слову", lambda: filter_commits(["Add login", "Fix bug", "Add logout"], "add"), ["Add login", "Add logout"])
__test("регистр не важен", lambda: filter_commits(["ADD feature", "add fix"], "Add"), ["ADD feature", "add fix"])
__test("пустой результат", lambda: filter_commits(["a", "b"], "z"), [])
__test("пустой список", lambda: filter_commits([], "test"), [])`,
        solution: `def filter_commits(commits, keyword):
    return [c for c in commits if keyword.lower() in c.lower()]`,
      },
    ],
  },

  {
    id: "py18",
    language: "python",
    title: "Настройка окружения",
    subtitle: "Виртуальные окружения, pip, requirements.txt, pyproject.toml",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Зачем виртуальные окружения

Разные проекты могут требовать разные версии библиотек. Виртуальное окружение (venv) — изолированная копия Python с собственными пакетами. Это предотвращает конфликты зависимостей.

Без venv: проект A требует \`requests==2.25\`, проект B — \`requests==2.28\`. Конфликт.
С venv: у каждого проекта своё окружение — всё работает.`,
      },
      {
        kind: "text",
        md: `## Создание и активация venv

\`\`\`bash
# Создать окружение в папке venv:
python -m venv venv

# Активировать (Linux/macOS):
source venv/bin/activate

# Активировать (Windows):
venv\\Scripts\\activate

# После активации в терминале появится (venv) перед промптом.
# Деактивация: deactivate
\`\`\``,
      },
      {
        kind: "code",
        title: "Пример использования venv",
        code: `# В терминале:
# $ python -m venv venv
# $ source venv/bin/activate  # Linux/macOS
# (venv) $ pip install requests
# (venv) $ python main.py
# (venv) $ deactivate

print("Виртуальные окружения изолируют зависимости")
print("Каждый проект — своё окружение")
print("pip устанавливает пакеты в активное окружение")`,
      },
      {
        kind: "text",
        md: `## pip — менеджер пакетов

- \`pip install <package>\` — установить пакет
- \`pip install <package>==<version>\` — конкретная версия
- \`pip install -r requirements.txt\` — установить из файла
- \`pip freeze\` — список установленных пакетов с версиями
- \`pip freeze > requirements.txt\` — сохранить список
- \`pip uninstall <package>\` — удалить пакет`,
      },
      {
        kind: "code",
        title: "requirements.txt",
        code: `# Формат requirements.txt:
# requests==2.31.0
# flask>=2.0,<3.0
# numpy~=1.24  # совместимые версии
# pandas

# Установка:
# $ pip install -r requirements.txt

# Создание:
# $ pip freeze > requirements.txt

print("requirements.txt фиксирует версии зависимостей")
print("~= означает совместимые версии (например, ~=1.24 → >=1.24, <1.25)")`,
      },
      {
        kind: "text",
        md: `## pyproject.toml — современный стандарт

\`pyproject.toml\` — единый файл конфигурации проекта (замена \`setup.py\`, \`setup.cfg\`). Содержит метаданные, зависимости, настройки инструментов.

\`\`\`toml
[project]
name = "my_project"
version = "0.1.0"
dependencies = [
    "requests>=2.28",
    "flask>=2.0",
]

[project.optional-dependencies]
dev = ["pytest", "black", "ruff"]
\`\`\``,
      },
      {
        kind: "code",
        title: "Структура проекта",
        code: `# Типичная структура Python-проекта:
# my_project/
# ├── venv/                  # виртуальное окружение
# ├── src/                   # исходный код
# │   └── my_package/
# │       ├── __init__.py
# │       └── main.py
# ├── tests/                 # тесты
# │   └── test_main.py
# ├── requirements.txt       # зависимости (старый стиль)
# ├── pyproject.toml         # конфигурация (новый стиль)
# ├── .gitignore             # исключения для Git
# └── README.md              # документация

print("Стандартная структура упрощает навигацию")
print("venv/ не коммитится в Git (добавьте в .gitignore)")`,
      },
      {
        kind: "tip",
        title: ".gitignore для Python",
        md: `Обязательно добавьте в \`.gitignore\`:
\`\`\`
venv/
__pycache__/
*.pyc
.env
*.egg-info/
dist/
build/
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Какая команда создаёт виртуальное окружение?",
        options: ["python -m venv venv", "python create venv", "virtualenv create", "venv init"],
        answer: 0,
        explain: "python -m venv venv создаёт папку venv с изолированным окружением Python.",
      },
      {
        q: "Что делает pip freeze?",
        options: [
          "Удаляет все пакеты",
          "Показывает список установленных пакетов с версиями",
          "Обновляет все пакеты",
          "Создаёт виртуальное окружение",
        ],
        answer: 1,
        explain: "pip freeze выводит все установленные пакеты в формате package==version — удобно для requirements.txt.",
      },
    ],
    tasks: [
      {
        id: "py18t1",
        title: "Парсер requirements.txt",
        md: `Реализуйте \`parse_requirements(text)\` — принимает содержимое requirements.txt (строка), возвращает список словарей \`{"package": "имя", "version": "версия"}\`. Если версии нет — \`"any"\`. Игнорируйте пустые строки и комментарии (\`#\`).`,
        starter: `def parse_requirements(text):
    # ваш код
    pass

print(parse_requirements("""
requests==2.31.0
# комментарий
flask>=2.0

numpy
"""))`,
        tests: `
__test("пакет с версией", lambda: parse_requirements("requests==2.31.0"), [{"package": "requests", "version": "2.31.0"}])
__test("пакет без версии", lambda: parse_requirements("numpy"), [{"package": "numpy", "version": "any"}])
__test("игнорирует комментарии", lambda: parse_requirements("# comment\\nrequests==1.0"), [{"package": "requests", "version": "1.0"}])
__test("игнорирует пустые строки", lambda: parse_requirements("\\n\\nrequests\\n\\n"), [{"package": "requests", "version": "any"}])
__test("несколько пакетов", lambda: parse_requirements("a==1\\nb==2"), [{"package": "a", "version": "1"}, {"package": "b", "version": "2"}])`,
        solution: `def parse_requirements(text):
    result = []
    for line in text.strip().split("\\n"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "==" in line:
            pkg, ver = line.split("==", 1)
            result.append({"package": pkg.strip(), "version": ver.strip()})
        else:
            result.append({"package": line.strip(), "version": "any"})
    return result`,
      },
      {
        id: "py18t2",
        title: "Генератор структуры проекта",
        md: `Реализуйте \`generate_project_files(name)\` — возвращает список файлов для создания проекта: \`README.md\`, \`requirements.txt\`, \`pyproject.toml\`, \`.gitignore\`. Каждый файл — словарь \`{"path": "путь", "content": "содержимое"}\`.`,
        starter: `def generate_project_files(name):
    # ваш код
    pass

for f in generate_project_files("my_app"):
    print(f["path"])`,
        tests: `
__test("создаёт README.md", lambda: any(f["path"] == "README.md" for f in generate_project_files("test")), True)
__test("создаёт requirements.txt", lambda: any(f["path"] == "requirements.txt" for f in generate_project_files("test")), True)
__test("создаёт pyproject.toml", lambda: any(f["path"] == "pyproject.toml" for f in generate_project_files("test")), True)
__test("создаёт .gitignore", lambda: any(f["path"] == ".gitignore" for f in generate_project_files("test")), True)
__test("README содержит имя проекта", lambda: next(f["content"] for f in generate_project_files("my_app") if f["path"] == "README.md").find("my_app") >= 0, True)`,
        solution: `def generate_project_files(name):
    return [
        {
            "path": "README.md",
            "content": f"# {name}\\n\\nОписание проекта.",
        },
        {
            "path": "requirements.txt",
            "content": "# Зависимости проекта\\n",
        },
        {
            "path": "pyproject.toml",
            "content": f'[project]\\nname = "{name}"\\nversion = "0.1.0"\\n',
        },
        {
            "path": ".gitignore",
            "content": "venv/\\n__pycache__/\\n*.pyc\\n.env\\n",
        },
    ]`,
      },
    ],
  },
];
