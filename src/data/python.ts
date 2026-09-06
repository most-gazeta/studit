import type { Lesson } from "../lib/types";

export const pythonLessons: Lesson[] = [
  {
    id: "py1",
    language: "python",
    title: "Первый код: print и переменные",
    subtitle: "Синтаксис без скобок и точек с запятой, динамическая типизация, f-строки",
    minutes: 20,
    blocks: [
      {
        kind: "text",
        md: `Python — второй язык платформы. Если JavaScript — язык браузера, то Python — язык данных, автоматизации, бэкенда и ML. Синтаксис читается почти как псевдокод: **нет фигурных скобок** — блоки выделяются отступами, **нет let/const** — имя становится переменной в момент присваивания.

Функция \`print()\` — аналог \`console.log\`. Нажмите «Запустить» — код выполнится в настоящем интерпретаторе Python прямо в браузере (первый запуск загружает интерпретатор несколько секунд).`,
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
];
