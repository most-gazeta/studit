import type { Lesson } from "../lib/types";

export const pythonLessons: Lesson[] = [
  {
    id: "py10",
    language: "python",
    title: "Генераторы и итераторы",
    subtitle: "yield, ленивые последовательности, генераторные выражения",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Итераторы и генераторы: ленивые вычисления 🚀

**Итератор** — объект, который может возвращать элементы по одному. Он реализует протокол итерации: методы \`__iter__()\` и \`__next__()\`.

**Генератор** — это упрощённый способ создать итератор. Функция с \`yield\` автоматически становится генератором.

**Аналогия:** Представьте конвейер на заводе:
- **Список** — все детали уже произведены и лежат на складе (занимают память)
- **Генератор** — детали производятся по одной по мере необходимости (экономия памяти)

**Зачем нужны генераторы?**
- Экономия памяти при работе с большими данными
- Бесконечные последовательности
- Ленивые вычисления (отложенные во времени)`,
      },
      {
        kind: "text",
        md: `## Протокол итерации

Чтобы объект был итерабельным, он должен реализовать:
- \`__iter__()\` — возвращает итератор
- \`__next__()\` — возвращает следующий элемент или бросает \`StopIteration\`

**Встроенные итерабельные объекты:** списки, строки, словари, множества, файлы.`,
      },
      {
        kind: "code",
        title: "Создание итератора вручную",
        code: `class Countdown:
    """Итератор обратного отсчёта"""
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Использование
for num in Countdown(5):
    print(num, end=" ")  # 5 4 3 2 1

# Ручная итерация
counter = Countdown(3)
print(next(counter))  # 3
print(next(counter))  # 2
print(next(counter))  # 1
# print(next(counter))  # StopIteration!`,
      },
      {
        kind: "text",
        md: `## yield: упрощённое создание генераторов

Функция с \`yield\` при вызове не выполняется — она возвращает **генератор**. Каждый \`next()\` исполняет код до следующего \`yield\`, «выдаёт» значение и ставит функцию на паузу.

**Ключевые моменты:**
- Генераторы ленивы: значения производятся по запросу
- Состояние сохраняется между вызовами
- Генераторы одноразовые: после исчерпания их нельзя использовать снова
- Можно создавать бесконечные последовательности`,
      },
      {
        kind: "code",
        title: "Простой генератор",
        code: `def count_up_to(n):
    """Генератор чисел от 1 до n"""
    num = 1
    while num <= n:
        yield num
        num += 1

# Создание генератора
gen = count_up_to(5)
print(type(gen))  # <class 'generator'>

# Получение значений
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3

# Итерация в цикле
for num in count_up_to(5):
    print(num, end=" ")  # 1 2 3 4 5

# Преобразование в список
print(list(count_up_to(5)))  # [1, 2, 3, 4, 5]`,
      },
      {
        kind: "code",
        title: "Бесконечная последовательность",
        code: `def naturals():
    """Бесконечная последовательность натуральных чисел"""
    n = 1
    while True:
        yield n
        n += 1

gen = naturals()
print(next(gen))   # 1
print(next(gen))   # 2
print(next(gen))   # 3

def take(it, count):
    """Берёт первые count элементов из итератора"""
    result = []
    for item in it:
        if len(result) >= count:
            break
        result.append(item)
    return result

print(take(naturals(), 5))   # [1, 2, 3, 4, 5]
print(take(naturals(), 10))  # [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]`,
      },
      {
        kind: "text",
        md: `## Генераторные выражения

Круглые скобки вместо квадратных — \`(... for ...)\` — создают **ленивый** генератор: элементы вычисляются по одному, память O(1).

**Преимущества:**
- Экономия памяти (O(1) вместо O(n))
- Можно работать с бесконечными последовательностями
- Функции \`sum()\`, \`min()\`, \`max()\`, \`any()\`, \`all()\` работают с генераторами`,
      },
      {
        kind: "code",
        title: "Список против генератора",
        code: `# Список: все значения сразу в памяти
squares_list = [x ** 2 for x in range(10_000)]
print(f"Размер списка: {squares_list.__sizeof__()} байт")

# Генератор: значения по одному
squares_gen = (x ** 2 for x in range(10_000))
print(f"Размер генератора: {squares_gen.__sizeof__()} байт")

# Работа с генератором
print(sum(squares_gen))              # 333283335000, память O(1)
print(sum(x for x in range(5) if x % 2))  # 1 + 3 = 4

# Генератор одноразовый:
g = (x for x in [1, 2, 3])
print(list(g))   # [1, 2, 3]
print(list(g))   # [] — уже исчерпан!

# Практический пример: чтение большого файла
def read_large_file(file_path):
    with open(file_path) as f:
        for line in f:
            yield line.strip()

# Обработка файла построчно без загрузки в память
# for line in read_large_file("huge.txt"):
#     process(line)`,
      },
      {
        kind: "text",
        md: `## yield from: делегирование итерации

\`yield from another_gen\` делегирует итерацию другому генератору. Это упрощает вложенные генераторы и позволяет "плоско" возвращать значения из вложенных структур.`,
      },
      {
        kind: "code",
        title: "yield from в действии",
        code: `def flatten(nested_list):
    """Рекурсивное выравнивание вложенных списков"""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, 3], [4, [5, 6]], 7]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6, 7]

# Комбинирование генераторов
def gen1():
    yield from range(3)

def gen2():
    yield from range(10, 13)

def combined():
    yield from gen1()
    yield from gen2()

print(list(combined()))  # [0, 1, 2, 10, 11, 12]`,
      },
      {
        kind: "text",
        md: `## itertools: мощные инструменты для итераторов

Модуль \`itertools\` предоставляет функции для эффективной работы с итераторами:

- \`count(start, step)\` — бесконечный счётчик
- \`cycle(iterable)\` — бесконечный цикл по элементам
- \`repeat(value, times)\` — повторение значения
- \`chain(*iterables)\` — цепочка итераторов
- \`islice(iterable, stop)\` — срез итератора
- \`tee(iterable, n)\` — создание n независимых копий`,
      },
      {
        kind: "code",
        title: "Полезные функции itertools",
        code: `from itertools import count, cycle, repeat, chain, islice

# count — бесконечный счётчик
print(list(islice(count(10, 2), 5)))  # [10, 12, 14, 16, 18]

# cycle — бесконечный цикл
print(list(islice(cycle(['A', 'B', 'C']), 7)))
# ['A', 'B', 'C', 'A', 'B', 'C', 'A']

# repeat — повторение
print(list(repeat('X', 5)))  # ['X', 'X', 'X', 'X', 'X']

# chain — цепочка итераторов
print(list(chain([1, 2], [3, 4], [5])))  # [1, 2, 3, 4, 5]

# islice — срез итератора
gen = (x ** 2 for x in count())
print(list(islice(gen, 5)))  # [0, 1, 4, 9, 16]`,
      },
      {
        kind: "text",
        md: `## Генераторы с состоянием

Генераторы могут сохранять состояние между вызовами. Это позволяет создавать сложные последовательности с внутренней логикой.`,
      },
      {
        kind: "code",
        title: "Генератор с состоянием",
        code: `def fibonacci():
    """Генератор чисел Фибоначчи"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Генератор с параметрами
def powers(base):
    """Генератор степеней числа"""
    exp = 0
    while True:
        yield base ** exp
        exp += 1

squares = powers(2)
print([next(squares) for _ in range(8)])
# [1, 2, 4, 8, 16, 32, 64, 128]`,
      },
      {
        kind: "code",
        title: "Генератор для чтения файла",
        code: `def read_lines(filename):
    """Ленивое чтение файла построчно"""
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

# Пример использования (создадим тестовый файл)
with open('test.txt', 'w') as f:
    f.write("Строка 1\\nСтрока 2\\nСтрока 3\\n")

# Чтение без загрузки всего файла в память
for line in read_lines('test.txt'):
    print(line)

# Обработка больших файлов
def process_large_file(filename):
    for line in read_lines(filename):
        # Обработка каждой строки
        yield line.upper()

# Цепочка генераторов
result = list(process_large_file('test.txt'))
print(result)`,
      },
      {
        kind: "warn",
        title: "Генераторы одноразовые",
        md: `Генератор можно итерировать только **один раз**. После исчерпания он становится пустым.

\`\`\`python
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] — генератор исчерпан!
\`\`\`

Если нужно использовать значения несколько раз — преобразуйте в список или создайте новый генератор.`,
      },
      {
        kind: "tip",
        title: "Когда использовать генераторы?",
        md: `**Используйте генераторы, когда:**
- Работаете с большими данными (файлы, базы данных)
- Нужны бесконечные последовательности
- Хотите экономить память
- Обрабатываете данные потоком

**Используйте списки, когда:**
- Нужно обращаться по индексу
- Нужно итерировать несколько раз
- Нужно знать длину
- Данные помещаются в память`,
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
      {
        q: "Что делает yield from?",
        options: [
          "Завершает генератор",
          "Делегирует итерацию другому генератору",
          "Возвращает значение из функции",
          "Создаёт новый генератор",
        ],
        answer: 1,
        explain: "yield from делегирует итерацию другому генератору, позволяя 'плоско' возвращать значения из вложенных структур.",
      },
      {
        q: "Что произойдёт при повторной итерации генератора?",
        options: [
          "Он начнёт сначала",
          "Будет пустой (исчерпан)",
          "Вызовет ошибку",
          "Создаст копию",
        ],
        answer: 1,
        explain: "Генераторы одноразовые. После исчерпания они становятся пустыми и не могут быть использованы снова.",
      },
      {
        q: "Какая функция itertools создаёт бесконечный счётчик?",
        options: ["cycle", "repeat", "count", "chain"],
        answer: 2,
        explain: "count(start, step) создаёт бесконечную последовательность чисел, начиная с start с шагом step.",
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
      {
        id: "py10t3",
        title: "Выравнивание списков",
        md: `Реализуйте генератор \`flatten(nested)\`, который рекурсивно выравнивает вложенные списки. \`list(flatten([1, [2, 3], [4, [5, 6]]]))\` → \`[1, 2, 3, 4, 5, 6]\`. Используйте \`yield from\` для рекурсии.`,
        starter: `def flatten(nested):
    # ваш код с yield from
    pass

print(list(flatten([1, [2, 3], [4, [5, 6]]])))`,
        tests: `
__test("простой случай", lambda: list(flatten([1, [2, 3], [4, [5, 6]]])), [1, 2, 3, 4, 5, 6])
__test("плоский список", lambda: list(flatten([1, 2, 3])), [1, 2, 3])
__test("глубокая вложенность", lambda: list(flatten([[[1]], [[2]], [[3]]])), [1, 2, 3])
__test("пустой список", lambda: list(flatten([])), [])`,
        solution: `def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item`,
      },
      {
        id: "py10t4",
        title: "Генератор степеней",
        md: `Реализуйте генератор \`powers(base)\`, который выдаёт бесконечную последовательность степеней числа: \`base^0, base^1, base^2, ...\`. \`list(islice(powers(2), 8))\` → \`[1, 2, 4, 8, 16, 32, 64, 128]\`.`,
        starter: `from itertools import islice

def powers(base):
    # бесконечный генератор степеней
    pass

print(list(islice(powers(2), 8)))`,
        tests: `
__test("powers(2) первые 8", lambda: list(islice(powers(2), 8)), [1, 2, 4, 8, 16, 32, 64, 128])
__test("powers(3) первые 5", lambda: list(islice(powers(3), 5)), [1, 3, 9, 27, 81])
__test("powers(10) первые 4", lambda: list(islice(powers(10), 4)), [1, 10, 100, 1000])`,
        solution: `from itertools import islice

def powers(base):
    exp = 0
    while True:
        yield base ** exp
        exp += 1`,
      },
      {
        id: "py10t5",
        title: "Чтение больших данных",
        md: `Реализуйте генератор \`read_chunks(data, chunk_size)\`, который разбивает список на чанки заданного размера. \`list(read_chunks([1,2,3,4,5,6,7], 3))\` → \`[[1,2,3], [4,5,6], [7]]\`.`,
        starter: `def read_chunks(data, chunk_size):
    # ваш код
    pass

print(list(read_chunks([1,2,3,4,5,6,7], 3)))`,
        tests: `
__test("разбиение на чанки", lambda: list(read_chunks([1,2,3,4,5,6,7], 3)), [[1,2,3], [4,5,6], [7]])
__test("точный размер", lambda: list(read_chunks([1,2,3,4], 2)), [[1,2], [3,4]])
__test("один элемент", lambda: list(read_chunks([1], 3)), [[1]])
__test("пустой список", lambda: list(read_chunks([], 3)), [])`,
        solution: `def read_chunks(data, chunk_size):
    for i in range(0, len(data), chunk_size):
        yield data[i:i + chunk_size]`,
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
        md: `## try/except/else/finally: полная структура

\`try\` — блок кода, где может возникнуть исключение.
\`except\` — обработка конкретного типа исключения.
\`else\` — выполняется, если исключений **не было**.
\`finally\` — выполняется **всегда** (даже при return или исключении).

**Порядок выполнения:**
1. Код в \`try\`
2. Если исключение — переход в \`except\`
3. Если исключений не было — выполнение \`else\`
4. В конце — \`finally\` (всегда)`,
      },
      {
        kind: "code",
        title: "Полная структура try/except",
        code: `def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Деление на ноль!")
        return None
    except TypeError as e:
        print(f"Неверный тип: {e}")
        return None
    else:
        print("Успешно!")
        return result
    finally:
        print("Завершение функции")

print(divide(10, 2))   # Успешно! → Завершение → 5.0
print(divide(10, 0))   # Деление на ноль! → Завершение → None
print(divide("10", 2)) # Неверный тип → Завершение → None`,
      },
      {
        kind: "text",
        md: `## Множественные except

Можно обрабатывать несколько типов исключений в одном \`except\` или использовать несколько блоков \`except\`.

**Правило:** от более специфичных к более общим. Если поставить \`except Exception\` первым — он перехватит всё, и остальные блоки не выполнятся.`,
      },
      {
        kind: "code",
        title: "Множественные except",
        code: `def parse_value(text):
    try:
        value = int(text)
        result = 100 / value
    except ValueError:
        return "Не число"
    except ZeroDivisionError:
        return "Деление на ноль"
    except (TypeError, AttributeError) as e:
        return f"Ошибка типа: {e}"
    except Exception as e:
        return f"Неизвестная ошибка: {e}"

print(parse_value("10"))    # 10.0
print(parse_value("abc"))   # Не число
print(parse_value("0"))     # Деление на ноль
print(parse_value(None))    # Ошибка типа`,
      },
      {
        kind: "text",
        md: `## Поднятие исключений (raise)

Ключевое слово \`raise\` бросает исключение. Можно бросить встроенное исключение или своё собственное.

**Когда использовать raise:**
- Невалидные входные данные
- Невозможное состояние программы
- Нарушение контракта функции
- Критические ошибки бизнес-логики`,
      },
      {
        kind: "code",
        title: "raise в действии",
        code: `def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Возраст должен быть числом")
    if age < 0:
        raise ValueError("Возраст не может быть отрицательным")
    if age > 150:
        raise ValueError("Невероятный возраст")
    return age

try:
    age = validate_age(-5)
except ValueError as e:
    print(f"Ошибка валидации: {e}")

try:
    age = validate_age("двадцать")
except TypeError as e:
    print(f"Ошибка типа: {e}")`,
      },
      {
        kind: "text",
        md: `## Свои исключения

Создавайте свои классы исключений, наследуя от \`Exception\` или более специфичных классов. Свои исключения позволяют:
- Передавать дополнительную информацию
- Различать типы ошибок в коде
- Создавать иерархию ошибок для вашего домена`,
      },
      {
        kind: "code",
        title: "Свои исключения с атрибутами",
        code: `class ValidationError(Exception):
    """Базовый класс для ошибок валидации."""
    pass

class InvalidEmailError(ValidationError):
    """Ошибка неверного email."""
    def __init__(self, email):
        self.email = email
        super().__init__(f"Неверный email: {email}")

class InvalidAgeError(ValidationError):
    """Ошибка неверного возраста."""
    def __init__(self, age, reason):
        self.age = age
        self.reason = reason
        super().__init__(f"Неверный возраст {age}: {reason}")

def validate_user(email, age):
    if "@" not in email:
        raise InvalidEmailError(email)
    if age < 0 or age > 150:
        raise InvalidAgeError(age, "должен быть от 0 до 150")
    return True

try:
    validate_user("invalid-email", 25)
except InvalidEmailError as e:
    print(f"Email ошибка: {e.email}")

try:
    validate_user("test@example.com", 200)
except InvalidAgeError as e:
    print(f"Возраст ошибка: {e.age} - {e.reason}")`,
      },
      {
        kind: "text",
        md: `## Вложенные try/except

Можно вкладывать \`try/except\` друг в друга для обработки ошибок на разных уровнях.

**Когда использовать:**
- Разная логика обработки для разных уровней
- Повторные попытки (retry)
- Частичная обработка ошибок`,
      },
      {
        kind: "code",
        title: "Вложенные try/except",
        code: `def process_data(data):
    try:
        result = []
        for item in data:
            try:
                value = int(item)
                result.append(value * 2)
            except ValueError:
                print(f"Пропускаю нечисло: {item}")
                continue
        return result
    except Exception as e:
        print(f"Критическая ошибка: {e}")
        return []

data = ["1", "2", "abc", "4", "def"]
print(process_data(data))  # Пропускаю abc, def → [2, 4, 8]`,
      },
      {
        kind: "text",
        md: `## Практические паттерны обработки исключений

**1. EAFP (Easier to Ask Forgiveness than Permission)**
Сначала попробуй, потом обрабатывай ошибку. Python-стиль.

**2. LBYL (Look Before You Leap)**
Сначала проверь, потом делай. Более осторожный подход.

**3. Повторные попытки (Retry)**
Повторять операцию при временных ошибках.

**4. Цепочка исключений**
Сохранять оригинальное исключение при поднятии нового.`,
      },
      {
        kind: "code",
        title: "Паттерн EAFP vs LBYL",
        code: `# EAFP (Python-стиль)
def get_value_eafp(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return "значение по умолчанию"

# LBYL (осторожный стиль)
def get_value_lbyl(dictionary, key):
    if key in dictionary:
        return dictionary[key]
    return "значение по умолчанию"

data = {"name": "Alice"}
print(get_value_eafp(data, "name"))   # Alice
print(get_value_eafp(data, "age"))    # значение по умолчанию
print(get_value_lbyl(data, "name"))   # Alice
print(get_value_lbyl(data, "age"))    # значение по умолчанию`,
      },
      {
        kind: "code",
        title: "Паттерн повторных попыток",
        code: `import time
import random

def unreliable_operation():
    """Операция, которая может временно не работать."""
    if random.random() < 0.7:  # 70% шанс ошибки
        raise ConnectionError("Временная ошибка")
    return "Успех!"

def retry_with_backoff(func, max_attempts=3, base_delay=1):
    """Повторные попытки с увеличением задержки."""
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            delay = base_delay * (2 ** attempt)
            print(f"Попытка {attempt + 1} не удалась: {e}. Жду {delay}с...")
            time.sleep(delay)

try:
    result = retry_with_backoff(unreliable_operation, max_attempts=3)
    print(result)
except ConnectionError as e:
    print(f"Все попытки не удались: {e}")`,
      },
      {
        kind: "code",
        title: "Цепочка исключений",
        code: `class DatabaseError(Exception):
    """Ошибка базы данных."""
    pass

class ConnectionError(DatabaseError):
    """Ошибка подключения."""
    pass

def connect_to_db():
    try:
        # Имитация ошибки подключения
        raise TimeoutError("Таймаут подключения")
    except TimeoutError as e:
        # Поднимаем своё исключение, сохраняя оригинальное
        raise ConnectionError("Не удалось подключиться к БД") from e

try:
    connect_to_db()
except ConnectionError as e:
    print(f"Ошибка: {e}")
    print(f"Причина: {e.__cause__}")  # Оригинальное исключение`,
      },
      {
        kind: "text",
        md: `## contextlib: утилиты для контекстных менеджеров

Модуль \`contextlib\` предоставляет утилиты для работы с контекстными менеджерами:

- \`@contextmanager\` — декоратор для создания контекстного менеджера из генератора
- \`closing\` — контекстный менеджер для объектов с методом \`close()\`
- \`suppress\` — подавление определённых исключений
- \`redirect_stdout\` / \`redirect_stderr\` — перенаправление вывода`,
      },
      {
        kind: "code",
        title: "contextlib в действии",
        code: `from contextlib import contextmanager, suppress, closing

# @contextmanager — создание из генератора
@contextmanager
def timer(label):
    import time
    start = time.time()
    print(f"{label}: начало")
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"{label}: {elapsed:.2f}с")

with timer("Операция"):
    total = sum(range(1000000))
    print(f"Сумма: {total}")

# suppress — подавление исключений
with suppress(FileNotFoundError):
    with open("nonexistent.txt") as f:
        content = f.read()
print("Файл не найден, но программа продолжает работу")

# closing — для объектов с close()
class Resource:
    def __init__(self, name):
        self.name = name
        print(f"{self.name}: открыт")
    
    def close(self):
        print(f"{self.name}: закрыт")

with closing(Resource("Ресурс")) as r:
    print(f"Работаю с {r.name}")`,
      },
      {
        kind: "text",
        md: `## Лучшие практики обработки исключений

**1. Ловите конкретные исключения**
Не используйте голый \`except:\` — он ловит всё, включая \`KeyboardInterrupt\` и \`SystemExit\`.

**2. Не глотайте исключения молча**
Всегда логируйте или обрабатывайте исключения. Молчаливое \`except: pass\` — зло.

**3. Используйте finally для очистки ресурсов**
Файлы, соединения, блокировки — закрывайте в \`finally\` или используйте \`with\`.

**4. Поднимайте исключения на правильный уровень**
Обрабатывайте ошибки там, где знаете, что с ними делать.

**5. Документируйте исключения**
В docstring указывайте, какие исключения может бросить функция.`,
      },
      {
        kind: "code",
        title: "Плохие и хорошие практики",
        code: `# ❌ ПЛОХО: ловим всё молча
def bad_function(data):
    try:
        result = process(data)
    except:
        pass  # Ошибка проглочена!
    return result

# ✅ ХОРОШО: ловим конкретное, логируем
def good_function(data):
    try:
        result = process(data)
    except ValueError as e:
        print(f"Ошибка валидации: {e}")
        raise
    return result

# ✅ ХОРОШО: используем with для ресурсов
def read_file_bad(filename):
    f = open(filename)
    try:
        return f.read()
    finally:
        f.close()

def read_file_good(filename):
    with open(filename) as f:
        return f.read()  # Файл закроется автоматически`,
      },
      {
        kind: "text",
        md: `## Иерархия встроенных исключений

Python имеет богатую иерархию встроенных исключений. Понимание этой иерархии помогает правильно обрабатывать ошибки.

**Основные категории:**
- \`BaseException\` — базовый класс для всех исключений
- \`Exception\` — базовый класс для всех "обычных" исключений
- \`ArithmeticError\` — арифметические ошибки (ZeroDivisionError, OverflowError)
- \`LookupError\` — ошибки доступа (IndexError, KeyError)
- \`ValueError\` — неверное значение
- \`TypeError\` — неверный тип
- \`IOError/OSError\` — ошибки ввода-вывода
- \`RuntimeError\` — ошибки времени выполнения

**Совет:** Наследуйте свои исключения от \`Exception\`, а не от \`BaseException\`. \`BaseException\` включает \`KeyboardInterrupt\`, \`SystemExit\` и \`GeneratorExit\`, которые обычно не нужно ловить.`,
      },
      {
        kind: "code",
        title: "Иерархия исключений",
        code: `# Иерархия встроенных исключений
print(issubclass(ValueError, Exception))  # True
print(issubclass(ValueError, LookupError))  # False
print(issubclass(KeyError, LookupError))  # True

# Группировка исключений
def process_data(data):
    try:
        value = data['key']
        result = 100 / value
        return int(result)
    except LookupError:
        # Ловит и KeyError, и IndexError
        print("Ключ не найден")
        return None
    except ArithmeticError:
        # Ловит ZeroDivisionError, OverflowError и др.
        print("Арифметическая ошибка")
        return None

# Свои исключения с иерархией
class AppError(Exception):
    """Базовый класс для ошибок приложения."""
    pass

class ValidationError(AppError):
    """Ошибки валидации."""
    pass

class AuthenticationError(AppError):
    """Ошибки аутентификации."""
    pass

# Можно ловить все ошибки приложения
try:
    process()
except AppError as e:
    print(f"Ошибка приложения: {e}")`,
      },
      {
        kind: "text",
        md: `## Исключения и логирование

В продакшене используйте модуль \`logging\` вместо \`print\` для логирования исключений. Это даёт больше контроля над форматом, уровнем логирования и местом вывода.

**Уровни логирования:**
- \`DEBUG\` — детальная информация для отладки
- \`INFO\` — общая информация о работе
- \`WARNING\` — предупреждения
- \`ERROR\` — ошибки
- \`CRITICAL\` — критические ошибки`,
      },
      {
        kind: "code",
        title: "Логирование исключений",
        code: `import logging

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def process_data(data):
    try:
        result = 100 / data['value']
        logger.info(f"Успешно обработано: {result}")
        return result
    except KeyError as e:
        logger.error(f"Отсутствует ключ: {e}")
        raise
    except ZeroDivisionError as e:
        logger.error(f"Деление на ноль: {e}")
        raise
    except Exception as e:
        logger.exception(f"Неизвестная ошибка: {e}")  # Включает traceback
        raise

try:
    process_data({'value': 0})
except Exception:
    pass  # Ошибка уже залогирована`,
      },
      {
        kind: "text",
        md: `## Отладка исключений: traceback

Когда возникает исключение, Python создаёт **traceback** — полную информацию о том, где произошла ошибка. Это включает:
- Тип исключения
- Сообщение об ошибке
- Стек вызовов (call stack)
- Номер строки в каждом файле

**Полезные инструменты:**
- \`traceback\` модуль — работа с traceback
- \`traceback.print_exc()\` — вывод traceback
- \`traceback.format_exc()\` — получение traceback как строки
- \`sys.exc_info()\` — информация о текущем исключении`,
      },
      {
        kind: "code",
        title: "Работа с traceback",
        code: `import traceback
import sys

def function_a():
    function_b()

def function_b():
    function_c()

def function_c():
    raise ValueError("Ошибка в function_c")

try:
    function_a()
except ValueError as e:
    print("Поймано исключение:", e)
    print("\nПолный traceback:")
    traceback.print_exc()
    
    # Или получить как строку
    tb_string = traceback.format_exc()
    print("\nTraceback как строка:")
    print(tb_string)
    
    # Информация о текущем исключении
    exc_type, exc_value, exc_tb = sys.exc_info()
    print(f"Тип: {exc_type.__name__}")
    print(f"Сообщение: {exc_value}")`,
      },
      {
        kind: "text",
        md: `## Исключения в асинхронном коде

В асинхронном коде (\`async/await\`) исключения работают так же, но есть нюансы:

1. Исключения распространяются через \`await\`
2. \`asyncio.gather()\` может собирать исключения из нескольких задач
3. \`asyncio.TaskGroup\` (Python 3.11+) упрощает обработку ошибок в группе задач

**Важно:** Если задача завершилась с исключением, но никто не ждал её результат, исключение может быть "проглочено". Всегда проверяйте результаты задач.`,
      },
      {
        kind: "code",
        title: "Исключения в async/await",
        code: `import asyncio

async def fetch_data(url):
    if "error" in url:
        raise ValueError(f"Ошибка загрузки {url}")
    await asyncio.sleep(0.1)
    return f"Данные из {url}"

async def main():
    # Исключение распространяется через await
    try:
        data = await fetch_data("http://error.com")
    except ValueError as e:
        print(f"Поймано: {e}")
    
    # gather с return_exceptions=True
    results = await asyncio.gather(
        fetch_data("http://ok1.com"),
        fetch_data("http://error.com"),
        fetch_data("http://ok2.com"),
        return_exceptions=True  # Не прерывать при ошибках
    )
    
    for result in results:
        if isinstance(result, Exception):
            print(f"Ошибка: {result}")
        else:
            print(f"Успех: {result}")

asyncio.run(main())`,
      },
      {
        kind: "text",
        md: `## Best practices для создания своих исключений

**1. Наследуйте от подходящего базового класса**
\`\`\`python
class ValidationError(ValueError):  # Наследуем от ValueError
    pass
\`\`\`

**2. Добавляйте полезную информацию**
\`\`\`python
class ValidationError(Exception):
    def __init__(self, field, message, value=None):
        self.field = field
        self.message = message
        self.value = value
        super().__init__(f"{field}: {message} (получено: {value})")
\`\`\`

**3. Создавайте иерархию исключений**
\`\`\`python
class AppError(Exception):
    """Базовый класс для всех ошибок приложения."""
    pass

class ValidationError(AppError):
    """Ошибки валидации входных данных."""
    pass

class DatabaseError(AppError):
    """Ошибки базы данных."""
    pass
\`\`\`

**4. Документируйте исключения**
\`\`\`python
def process_payment(amount: float) -> None:
    """
    Обрабатывает платёж.
    
    Args:
        amount: Сумма платежа
        
    Raises:
        ValueError: Если amount <= 0
        PaymentError: Если платёж отклонён
    """
    if amount <= 0:
        raise ValueError("Сумма должна быть положительной")
    # ...
\`\`\``,
      },
      {
        kind: "text",
        md: `## Исключения и типизация

Используйте аннотации типов для документирования исключений, которые может бросить функция. Это помогает IDE и другим разработчикам понимать, какие ошибки ожидать.

**Типизация исключений:**
\`\`\`python
from typing import NoReturn

def fail_hard() -> NoReturn:
    """Эта функция всегда бросает исключение."""
    raise RuntimeError("Критическая ошибка")

def safe_divide(a: float, b: float) -> float:
    """
    Делит a на b.
    
    Raises:
        ZeroDivisionError: Если b == 0
    """
    return a / b
\`\`\`

**Исключения в типах:**
\`\`\`python
from typing import Union, Optional

def parse_int(value: str) -> Union[int, None]:
    """Возвращает int или None при ошибке."""
    try:
        return int(value)
    except ValueError:
        return None
\`\`\``,
      },
      {
        kind: "code",
        title: "Типизация и исключения",
        code: `from typing import NoReturn, Union, Optional
import logging

logger = logging.getLogger(__name__)

def critical_failure() -> NoReturn:
    """Всегда бросает исключение."""
    raise RuntimeError("Критический сбой системы")

def parse_int_safe(value: str) -> Optional[int]:
    """
    Парсит строку в int.
    
    Args:
        value: Строка для парсинга
        
    Returns:
        int если успешно, None если ошибка
    """
    try:
        return int(value)
    except ValueError as e:
        logger.warning(f"Не удалось распарсить '{value}': {e}")
        return None

# Использование
result = parse_int_safe("42")  # 42
result = parse_int_safe("abc")  # None

# Проверка типа результата
if result is not None:
    print(f"Успех: {result}")
else:
    print("Ошибка парсинга")`,
      },
      {
        kind: "text",
        md: `## Исключения и тестирование

При тестировании кода важно проверять, что исключения бросаются в правильных ситуациях. Используйте \`pytest.raises\` для проверки исключений.

**Тестирование исключений:**
\`\`\`python
import pytest

def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        result = 10 / 0

def test_specific_exception():
    with pytest.raises(ValueError) as exc_info:
        process_invalid_data()
    assert "неверные данные" in str(exc_info.value)
\`\`\`

**Тестирование своих исключений:**
\`\`\`python
def test_validation_error():
    with pytest.raises(ValidationError) as exc_info:
        validate_user("")
    assert exc_info.value.field == "username"
    assert "не может быть пустым" in str(exc_info.value)
\`\`\``,
      },
      {
        kind: "code",
        title: "Тестирование исключений",
        code: `import pytest

class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("age", "должен быть числом")
    if age < 0 or age > 150:
        raise ValidationError("age", "должен быть от 0 до 150")
    return True

# Тесты
def test_valid_age():
    assert validate_age(25) == True

def test_invalid_type():
    with pytest.raises(ValidationError) as exc_info:
        validate_age("25")
    assert exc_info.value.field == "age"
    assert "числом" in str(exc_info.value)

def test_invalid_range():
    with pytest.raises(ValidationError) as exc_info:
        validate_age(200)
    assert exc_info.value.field == "age"
    assert "150" in str(exc_info.value)

# Запуск тестов
if __name__ == "__main__":
    pytest.main([__file__, "-v"])`,
      },
      {
        kind: "text",
        md: `## Исключения и многопоточность

В многопоточном коде исключения могут вести себя неожиданно. Если поток завершается с исключением, оно не распространяется в основной поток автоматически.

**Проблемы:**
- Исключения в потоках "проглатываются"
- Основной поток не узнает об ошибке
- Ресурсы могут не освободиться

**Решения:**
- Используйте \`concurrent.futures\` для получения результатов и исключений
- Используйте \`queue\` для передачи исключений между потоками
- Всегда обрабатывайте исключения в потоках`,
      },
      {
        kind: "code",
        title: "Исключения в многопоточности",
        code: `import threading
import concurrent.futures
import time

# ❌ ПЛОХО: исключение проглатывается
def bad_thread():
    raise ValueError("Ошибка в потоке")

thread = threading.Thread(target=bad_thread)
thread.start()
thread.join()
print("Основной поток не знает об ошибке")

# ✅ ХОРОШО: используем ThreadPoolExecutor
def good_task(x):
    if x < 0:
        raise ValueError(f"Отрицательное число: {x}")
    return x * 2

with concurrent.futures.ThreadPoolExecutor() as executor:
    futures = [executor.submit(good_task, x) for x in [-1, 2, 3]]
    
    for future in concurrent.futures.as_completed(futures):
        try:
            result = future.result()
            print(f"Успех: {result}")
        except ValueError as e:
            print(f"Ошибка: {e}")`,
      },
      {
        kind: "text",
        md: `## Исключения и производительность

Исключения в Python относительно дороги. Не используйте их для управления потоком выполнения в горячих циклах.

**Когда исключения дороги:**
- Внутренние циклы с частыми исключениями
- Горячие пути в производительном коде
- Обработка ожидаемых условий через исключения

**Когда исключения уместны:**
- Исключительные ситуации (ошибки)
- Редко возникающие условия
- Внешние API и библиотеки

**Альтернативы для производительности:**
\`\`\`python
# ❌ Медленно: исключения в цикле
for item in data:
    try:
        process(item)
    except ValueError:
        continue

# ✅ Быстрее: проверка перед обработкой
for item in data:
    if is_valid(item):
        process(item)
\`\`\``,
      },
      {
        kind: "code",
        title: "Производительность исключений",
        code: `import time

# Тест производительности
def test_with_exceptions():
    data = [1, 2, "invalid", 4, "bad", 6] * 1000
    result = []
    for item in data:
        try:
            result.append(int(item) * 2)
        except ValueError:
            continue
    return result

def test_with_checks():
    data = [1, 2, "invalid", 4, "bad", 6] * 1000
    result = []
    for item in data:
        if isinstance(item, int):
            result.append(item * 2)
    return result

# Замеры
start = time.time()
test_with_exceptions()
time_with_exc = time.time() - start

start = time.time()
test_with_checks()
time_with_checks = time.time() - start

print(f"С исключениями: {time_with_exc:.4f}с")
print(f"С проверками: {time_with_checks:.4f}с")
print(f"Разница: {((time_with_exc / time_with_checks) - 1) * 100:.1f}%")`,
      },
      {
        kind: "text",
        md: `## Исключения и безопасность

Исключения могут раскрывать чувствительную информацию. Будьте осторожны с тем, что попадает в сообщения об ошибках и логи.

**Риски:**
- Пути к файлам в сообщениях
- SQL-запросы с данными
- Пароли и токены в traceback
- Внутренняя структура приложения

**Best practices:**
- Не включайте чувствительные данные в сообщения исключений
- Логируйте детали на сервере, показывайте пользователю общие сообщения
- Используйте разные уровни логирования для разных сред
- Регулярно проверяйте логи на наличие чувствительных данных`,
      },
      {
        kind: "code",
        title: "Безопасная обработка исключений",
        code: `import logging

logger = logging.getLogger(__name__)

class DatabaseError(Exception):
    """Ошибка базы данных."""
    pass

def unsafe_query(user_id):
    """❌ ОПАСНО: раскрывает информацию."""
    try:
        # SQL запрос с user_id
        result = db.execute(f"SELECT * FROM users WHERE id = {user_id}")
        return result
    except Exception as e:
        # Раскрывает SQL и внутреннюю структуру
        raise DatabaseError(f"Ошибка запроса: {e} для user_id={user_id}")

def safe_query(user_id):
    """✅ БЕЗОПАСНО: скрывает детали."""
    try:
        # Параметризованный запрос
        result = db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        return result
    except Exception as e:
        # Логируем детали на сервере
        logger.error(f"Database error for user {user_id}: {e}", exc_info=True)
        # Пользователю показываем общее сообщение
        raise DatabaseError("Не удалось получить данные пользователя")

# Обработка на верхнем уровне
def handle_request(user_id):
    try:
        data = safe_query(user_id)
        return {"status": "success", "data": data}
    except DatabaseError as e:
        # Пользователь видит только общее сообщение
        return {"status": "error", "message": str(e)}
    except Exception as e:
        # Неожиданные ошибки
        logger.exception("Unexpected error")
        return {"status": "error", "message": "Внутренняя ошибка сервера"}`,
      },
      {
        kind: "text",
        md: `## Исключения и ресурсы

Исключения тесно связаны с управлением ресурсами (файлы, соединения, блокировки). Важно гарантировать освобождение ресурсов даже при возникновении исключений.

**Паттерны управления ресурсами:**

1. **try/finally** — классический подход
2. **with statement** — современный подход (контекстные менеджеры)
4. **Декораторы** — для повторяемой логики

**Важно:** Всегда освобождайте ресурсы в \`finally\` или используйте \`with\`.`,
      },
      {
        kind: "code",
        title: "Управление ресурсами",
        code: `import threading

# ❌ ПЛОХО: ресурс может не освободиться
def bad_lock_example():
    lock = threading.Lock()
    lock.acquire()
    try:
        # критическая секция
        result = process_data()
        return result
    finally:
        lock.release()  # Освобождается даже при исключении

# ✅ ХОРОШО: используем with
def good_lock_example():
    with threading.Lock():
        # критическая секция
        return process_data()
    # Lock автоматически освобождается

# ❌ ПЛОХО: файл может не закрыться
def bad_file_example():
    f = open("data.txt")
    try:
        return f.read()
    finally:
        f.close()

# ✅ ХОРОШО: используем with
def good_file_example():
    with open("data.txt") as f:
        return f.read()
    # Файл автоматически закрывается

# Собственный контекстный менеджер
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        self.connection = connect(self.connection_string)
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection:
            self.connection.close()
        return False  # Не подавлять исключения

# Использование
with DatabaseConnection("postgresql://...") as conn:
    result = conn.execute("SELECT * FROM users")
# Соединение автоматически закрывается`,
      },
      {
        kind: "text",
        md: `## Исключения и транзакции

В базах данных исключения играют ключевую роль в управлении транзакциями. При возникновении исключения транзакция должна быть откатана.

**Паттерны транзакций:**
\`\`\`python
# Паттерн 1: try/except с откатом
def transfer_money(from_acc, to_acc, amount):
    try:
        debit(from_acc, amount)
        credit(to_acc, amount)
        commit()
    except Exception as e:
        rollback()
        raise

# Паттерн 2: контекстный менеджер
class Transaction:
    def __enter__(self):
        self.conn = get_connection()
        return self.conn
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.conn.close()
        return False

# Использование
with Transaction() as conn:
    debit(conn, from_acc, amount)
    credit(conn, to_acc, amount)
# Автоматический commit или rollback
\`\`\``,
      },
      {
        kind: "code",
        title: "Транзакции с исключениями",
        code: `class TransactionError(Exception):
    """Ошибка транзакции."""
    pass

class InsufficientFundsError(TransactionError):
    """Недостаточно средств."""
    pass

class Transaction:
    def __init__(self, db):
        self.db = db
        self.operations = []
    
    def __enter__(self):
        self.db.begin()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.db.rollback()
            print(f"Транзакция откатана: {exc_val}")
        else:
            self.db.commit()
            print("Транзакция зафиксирована")
        return False
    
    def transfer(self, from_acc, to_acc, amount):
        if get_balance(from_acc) < amount:
            raise InsufficientFundsError(
                f"Недостаточно средств: {get_balance(from_acc)} < {amount}"
            )
        debit(from_acc, amount)
        credit(to_acc, amount)

# Использование
try:
    with Transaction(db) as tx:
        tx.transfer("acc1", "acc2", 100)
        tx.transfer("acc2", "acc3", 50)
except InsufficientFundsError as e:
    print(f"Ошибка: {e}")
except TransactionError as e:
    print(f"Ошибка транзакции: {e}")`,
      },
      {
        kind: "text",
        md: `## Исключения и валидация

Исключения — мощный инструмент для валидации данных. Они позволяют централизовать логику проверки и четко сигнализировать об ошибках.

**Паттерны валидации:**

1. **Ранняя валидация** — проверяйте данные как можно раньше
2. **Специфичные исключения** — создавайте исключения для разных типов ошибок
3. **Цепочки валидации** — собирайте все ошибки, а не останавливайтесь на первой
4. **Валидация на разных уровнях** — входные данные, бизнес-логика, база данных`,
      },
      {
        kind: "code",
        title: "Валидация с исключениями",
        code: `class ValidationError(Exception):
    """Базовый класс для ошибок валидации."""
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

class MultipleValidationErrors(Exception):
    """Множественные ошибки валидации."""
    def __init__(self, errors):
        self.errors = errors
        super().__init__(f"Ошибки валидации: {len(errors)}")

def validate_email(email):
    if not email:
        raise ValidationError("email", "не может быть пустым")
    if "@" not in email:
        raise ValidationError("email", "должен содержать @")
    if "." not in email.split("@")[1]:
        raise ValidationError("email", "неверный домен")
    return email

def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("age", "должен быть числом")
    if age < 0 or age > 150:
        raise ValidationError("age", "должен быть от 0 до 150")
    return age

# Валидация с сбором всех ошибок
def validate_user(data):
    errors = []
    
    try:
        validate_email(data.get("email"))
    except ValidationError as e:
        errors.append(e)
    
    try:
        validate_age(data.get("age"))
    except ValidationError as e:
        errors.append(e)
    
    if errors:
        raise MultipleValidationErrors(errors)
    
    return True

# Использование
try:
    validate_user({"email": "invalid", "age": -5})
except MultipleValidationErrors as e:
    for error in e.errors:
        print(f"{error.field}: {error.message}")`,
      },
      {
        kind: "text",
        md: `## Исключения и API

В API исключения используются для сигнализации об ошибках клиенту. Важно правильно маппить внутренние исключения на HTTP-статусы.

**Паттерны API:**

1. **Глобальный обработчик** — перехватывает все исключения на верхнем уровне
2. **Маппинг исключений** — преобразование внутренних исключений в HTTP-ответы
3. **Стандартные ошибки** — используйте стандартные форматы ошибок (RFC 7807)

**HTTP-статусы для исключений:**
- 400 Bad Request — ошибки валидации
- 401 Unauthorized — проблемы аутентификации
- 403 Forbidden — проблемы авторизации
- 404 Not Found — ресурс не найден
- 500 Internal Server Error — внутренние ошибки`,
      },
      {
        kind: "code",
        title: "Исключения в API",
        code: `from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# Свои исключения
class NotFoundError(Exception):
    def __init__(self, resource, id):
        self.resource = resource
        self.id = id

class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message

# Глобальные обработчики
@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(
        status_code=404,
        content={
            "error": "not_found",
            "message": f"{exc.resource} с id={exc.id} не найден"
        }
    )

@app.exception_handler(ValidationError)
async def validation_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "error": "validation_error",
            "field": exc.field,
            "message": exc.message
        }
    )

@app.exception_handler(Exception)
async def general_handler(request: Request, exc: Exception):
    # Логируем детальную ошибку
    print(f"Unexpected error: {exc}")
    # Возвращаем общее сообщение
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_error",
            "message": "Внутренняя ошибка сервера"
        }
    )

# Эндпоинты
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = db.get_user(user_id)
    if not user:
        raise NotFoundError("User", user_id)
    return user

@app.post("/users")
async def create_user(data: dict):
    if "email" not in data:
        raise ValidationError("email", "обязательное поле")
    # ...`,
      },
      {
        kind: "text",
        md: `## Исключения и конфигурация

Исключения могут использоваться для управления конфигурацией приложения. Например, при отсутствии обязательных конфигурационных параметров можно бросать исключение при запуске.

**Паттерны конфигурации:**

1. **Fail-fast** — бросайте исключения при отсутствии обязательных параметров
2. **Валидация конфигурации** — проверяйте значения при загрузке
3. **Дефолтные значения** — используйте с осторожностью
4. **Переменные окружения** — используйте для чувствительных данных`,
      },
      {
        kind: "code",
        title: "Конфигурация с исключениями",
        code: `import os
from typing import Optional

class ConfigError(Exception):
    """Ошибка конфигурации."""
    pass

class Config:
    def __init__(self):
        # Обязательные параметры
        self.database_url = self._require_env("DATABASE_URL")
        self.secret_key = self._require_env("SECRET_KEY")
        
        # Опциональные параметры с валидацией
        self.debug = self._get_bool("DEBUG", default=False)
        self.port = self._get_int("PORT", default=8000, min=1, max=65535)
        
        # Валидация
        self._validate()
    
    def _require_env(self, key: str) -> str:
        """Требует обязательную переменную окружения."""
        value = os.getenv(key)
        if not value:
            raise ConfigError(f"Обязательная переменная окружения {key} не установлена")
        return value
    
    def _get_bool(self, key: str, default: bool) -> bool:
        """Получает булево значение из окружения."""
        value = os.getenv(key)
        if value is None:
            return default
        if value.lower() in ("true", "1", "yes"):
            return True
        if value.lower() in ("false", "0", "no"):
            return False
        raise ConfigError(f"Неверное булево значение для {key}: {value}")
    
    def _get_int(self, key: str, default: int, min: int, max: int) -> int:
        """Получает целое число с валидацией диапазона."""
        value = os.getenv(key)
        if value is None:
            return default
        try:
            value = int(value)
            if not (min <= value <= max):
                raise ConfigError(f"{key} должен быть между {min} и {max}")
            return value
        except ValueError:
            raise ConfigError(f"{key} должен быть целым числом")
    
    def _validate(self):
        """Дополнительная валидация конфигурации."""
        if not self.database_url.startswith(("postgresql://", "mysql://")):
            raise ConfigError("Неподдерживаемая база данных")
        if len(self.secret_key) < 32:
            raise ConfigError("SECRET_KEY должен быть не менее 32 символов")

# Использование
try:
    config = Config()
    print(f"Конфигурация загружена: debug={config.debug}, port={config.port}")
except ConfigError as e:
    print(f"Ошибка конфигурации: {e}")
    exit(1)`,
      },
      {
        kind: "text",
        md: `## Исключения и мониторинг

Исключения — важный источник информации для мониторинга приложения. Правильная обработка и логирование исключений помогает быстро выявлять и исправлять проблемы.

**Паттерны мониторинга:**

1. **Централизованное логирование** — собирайте логи со всех сервисов в одном месте
2. **Метрики исключений** — отслеживайте количество и типы исключений
3. **Алерты** — уведомляйте о критических ошибках
4. **Трейсинг** — отслеживайте путь запроса через систему

**Инструменты:**
- **Sentry** — отслеживание ошибок в реальном времени
- **Prometheus + Grafana** — метрики и графики
- **ELK Stack** — централизованное логирование
- **Jaeger** — распределённый трейсинг`,
      },
      {
        kind: "code",
        title: "Мониторинг исключений",
        code: `import logging
import time
from functools import wraps
from collections import defaultdict

# Счётчик исключений
exception_counter = defaultdict(int)

def count_exceptions(func):
    """Декоратор для подсчёта исключений."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            exception_counter[type(e).__name__] += 1
            raise
    return wrapper

# Метрики исключений
def get_exception_metrics():
    """Возвращает метрики исключений."""
    return {
        "total": sum(exception_counter.values()),
        "by_type": dict(exception_counter)
    }

# Пример использования
@count_exceptions
def risky_operation(x):
    if x < 0:
        raise ValueError("Отрицательное число")
    if x > 100:
        raise OverflowError("Слишком большое число")
    return x * 2

# Тестирование
try:
    risky_operation(-1)
except ValueError:
    pass

try:
    risky_operation(200)
except OverflowError:
    pass

risky_operation(50)

# Метрики
print("Метрики исключений:")
metrics = get_exception_metrics()
print(f"Всего: {metrics['total']}")
for exc_type, count in metrics['by_type'].items():
    print(f"  {exc_type}: {count}")

# Интеграция с Sentry (пример)
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
    environment="production"
)

@count_exceptions
def monitored_operation():
    # Операция с мониторингом
    pass`,
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
      {
        q: "Что делает ключевое слово raise?",
        options: [
          "Ловит исключение",
          "Бросает исключение",
          "Игнорирует исключение",
          "Логирует исключение",
        ],
        answer: 1,
        explain: "raise бросает исключение. Можно бросить встроенное или своё собственное исключение.",
      },
      {
        q: "Какой паттерн обработки исключений предпочтителен в Python?",
        options: [
          "LBYL (Look Before You Leap)",
          "EAFP (Easier to Ask Forgiveness than Permission)",
          "Оба одинаково хороши",
          "Ни один не хорош",
        ],
        answer: 1,
        explain: "EAFP — Python-стиль: сначала попробуй, потом обрабатывай ошибку. Более идиоматичен и читаем.",
      },
      {
        q: "Что делает @contextmanager?",
        options: [
          "Создаёт класс контекстного менеджера",
          "Создаёт контекстный менеджер из генератора",
          "Подавляет исключения",
          "Перенаправляет вывод",
        ],
        answer: 1,
        explain: "@contextmanager — декоратор из contextlib, позволяющий создать контекстный менеджер из функции с yield.",
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
      {
        id: "py11t3",
        title: "Безопасное деление с логированием",
        md: `Реализуйте функцию \`safe_divide(a, b)\`, которая делит \`a\` на \`b\`. При \`ZeroDivisionError\` возвращает \`None\` и логирует ошибку. При \`TypeError\` бросает новое исключение \`ValueError\` с сообщением "Неверные типы данных". При успешном делении возвращает результат.`,
        starter: `def safe_divide(a, b):
    # ваш код
    pass

print(safe_divide(10, 2))      # 5.0
print(safe_divide(10, 0))      # None (с логом)
try:
    safe_divide("10", 2)
except ValueError as e:
    print(e)  # Неверные типы данных`,
        tests: `
__test("успешное деление", lambda: safe_divide(10, 2), 5.0)
__test("деление на ноль → None", lambda: safe_divide(10, 0), None)
def type_error():
    try:
        safe_divide("10", 2)
        return False
    except ValueError as e:
        return "Неверные типы данных" in str(e)
__test("TypeError → ValueError", type_error, True)`,
        solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Ошибка: деление на ноль")
        return None
    except TypeError:
        raise ValueError("Неверные типы данных")`,
      },
      {
        id: "py11t4",
        title: "Своё исключение с атрибутами",
        md: `Создайте класс исключения \`ValidationError\` с атрибутами \`field\` (имя поля) и \`message\` (сообщение). Конструктор должен принимать эти параметры. Создайте функцию \`validate_age(age)\`, которая бросает \`ValidationError\` с полем "age", если возраст меньше 0 или больше 150.`,
        starter: `class ValidationError(Exception):
    # ваш код
    pass

def validate_age(age):
    # ваш код
    pass

try:
    validate_age(-5)
except ValidationError as e:
    print(f"Поле: {e.field}, Ошибка: {e.message}")`,
        tests: `
def test_exception():
    try:
        validate_age(-5)
        return False
    except ValidationError as e:
        return e.field == "age" and "не может быть отрицательным" in e.message
__test("исключение с атрибутами", test_exception, True)
def test_valid():
    try:
        validate_age(25)
        return True
    except:
        return False
__test("валидный возраст проходит", test_valid, True)
def test_too_old():
    try:
        validate_age(200)
        return False
    except ValidationError as e:
        return e.field == "age"
__test("слишком большой возраст", test_too_old, True)`,
        solution: `class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_age(age):
    if age < 0:
        raise ValidationError("age", "не может быть отрицательным")
    if age > 150:
        raise ValidationError("age", "не может быть больше 150")
    return age`,
      },
      {
        id: "py11t5",
        title: "Контекстный менеджер с таймером",
        md: `Создайте контекстный менеджер \`Timer\`, который измеряет время выполнения кода внутри блока \`with\`. В \`__enter__\` запоминает время начала, в \`__exit__\` вычисляет прошедшее время и сохраняет его в атрибут \`elapsed\`.`,
        starter: `import time

class Timer:
    # ваш код
    pass

with Timer() as t:
    total = sum(range(100000))
print(f"Время: {t.elapsed:.4f}с")`,
        tests: `
def test_timer():
    with Timer() as t:
        time.sleep(0.1)
    return t.elapsed >= 0.1
__test("измеряет время", test_timer, True)
def test_attribute():
    with Timer() as t:
        pass
    return hasattr(t, 'elapsed')
__test("имеет атрибут elapsed", test_attribute, True)`,
        solution: `import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        return False`,
      },
      {
        id: "py11t6",
        title: "Повторные попытки с логированием",
        md: `Реализуйте функцию \`retry_with_log(func, max_attempts=3)\`, которая вызывает \`func()\` до \`max_attempts\` раз. При каждой неудаче логирует номер попытки и ошибку. Если все попытки не удались, бросает последнее исключение.`,
        starter: `def retry_with_log(func, max_attempts=3):
    # ваш код
    pass

import random
def flaky_function():
    if random.random() < 0.7:
        raise ValueError("Временная ошибка")
    return "Успех!"

result = retry_with_log(flaky_function, max_attempts=5)
print(result)`,
        tests: `
def test_success():
    def always_ok():
        return "OK"
    return retry_with_log(always_ok, max_attempts=3)
__test("успех с первой попытки", test_success, "OK")
def test_retry():
    attempts = [0]
    def sometimes_fail():
        attempts[0] += 1
        if attempts[0] < 3:
            raise ValueError("Ошибка")
        return "OK"
    return retry_with_log(sometimes_fail, max_attempts=5)
__test("успех после повторных попыток", test_retry, "OK")
def test_all_fail():
    def always_fail():
        raise ValueError("Всегда ошибка")
    try:
        retry_with_log(always_fail, max_attempts=3)
        return False
    except ValueError:
        return True
__test("все попытки не удались", test_all_fail, True)`,
        solution: `def retry_with_log(func, max_attempts=3):
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            print(f"Попытка {attempt + 1}/{max_attempts} не удалась: {e}")
            if attempt == max_attempts - 1:
                raise`,
      },
      {
        id: "py11t7",
        title: "Иерархия исключений",
        md: `Создайте иерархию исключений для приложения: \`AppError\` (базовый), \`ValidationError\` (наследует от AppError), \`DatabaseError\` (наследует от AppError). \`ValidationError\` должен иметь атрибут \`field\`, \`DatabaseError\` — атрибут \`query\`. Создайте функцию \`process_data(data)\`, которая бросает \`ValidationError\` если data пустой, и \`DatabaseError\` если data содержит "error".`,
        starter: `class AppError(Exception):
    pass

class ValidationError(AppError):
    # ваш код
    pass

class DatabaseError(AppError):
    # ваш код
    pass

def process_data(data):
    # ваш код
    pass

try:
    process_data({})
except ValidationError as e:
    print(f"Валидация: {e.field}")

try:
    process_data({"query": "error"})
except DatabaseError as e:
    print(f"БД: {e.query}")`,
        tests: `
def test_validation():
    try:
        process_data({})
        return False
    except ValidationError as e:
        return hasattr(e, 'field')
__test("ValidationError имеет field", test_validation, True)
def test_database():
    try:
        process_data({"query": "error"})
        return False
    except DatabaseError as e:
        return hasattr(e, 'query')
__test("DatabaseError имеет query", test_database, True)
def test_hierarchy():
    return issubclass(ValidationError, AppError) and issubclass(DatabaseError, AppError)
__test("правильная иерархия", test_hierarchy, True)`,
        solution: `class AppError(Exception):
    pass

class ValidationError(AppError):
    def __init__(self, field, message="Ошибка валидации"):
        self.field = field
        super().__init__(f"{field}: {message}")

class DatabaseError(AppError):
    def __init__(self, query, message="Ошибка базы данных"):
        self.query = query
        super().__init__(f"{query}: {message}")

def process_data(data):
    if not data:
        raise ValidationError("data", "данные не могут быть пустыми")
    if "query" in data and data["query"] == "error":
        raise DatabaseError(data["query"], "ошибка запроса")
    return True`,
      },
      {
        id: "py11t8",
        title: "Контекстный менеджер с логированием",
        md: `Создайте контекстный менеджер \`LoggingContext\`, который логирует вход и выход из блока. В \`__enter__\` выводит "Вход в контекст", в \`__exit__\` выводит "Выход из контекста" и информацию об исключении, если оно было.`,
        starter: `class LoggingContext:
    def __enter__(self):
        # ваш код
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # ваш код
        pass

with LoggingContext():
    print("Работаю в контексте")

with LoggingContext():
    raise ValueError("Ошибка")`,
        tests: `
def test_enter_exit():
    import io
    import sys
    captured = io.StringIO()
    sys.stdout = captured
    with LoggingContext():
        pass
    sys.stdout = sys.__stdout__
    output = captured.getvalue()
    return "Вход" in output and "Выход" in output
__test("логирует вход и выход", test_enter_exit, True)
def test_exception_logging():
    import io
    import sys
    captured = io.StringIO()
    sys.stdout = captured
    try:
        with LoggingContext():
            raise ValueError("Тест")
    except ValueError:
        pass
    sys.stdout = sys.__stdout__
    output = captured.getvalue()
    return "ValueError" in output
__test("логирует исключение", test_exception_logging, True)`,
        solution: `class LoggingContext:
    def __enter__(self):
        print("Вход в контекст")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"Выход из контекста с исключением: {exc_type.__name__}: {exc_val}")
        else:
            print("Выход из контекста без ошибок")
        return False`,
      },
    ],
  },

  {
    id: "py13",
    language: "python",
    title: "Продвинутые темы исключений",
    subtitle: "Исключения в генераторах, дескрипторах, метаклассах и декораторах",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Исключения в генераторах

Генераторы могут бросать и перехватывать исключения. Когда исключение возникает внутри генератора, оно распространяется к вызывающему коду. Можно также отправить исключение в генератор через метод \`throw()\`.

**Важно:** Если генератор завершается с исключением, он не может быть использован снова.`,
      },
      {
        kind: "code",
        title: "Исключения в генераторах",
        code: `def number_generator():
    """Генератор, который может бросить исключение."""
    for i in range(1, 6):
        if i == 3:
            raise ValueError("Не люблю тройки!")
        yield i

# Исключение распространяется к вызывающему коду
try:
    for num in number_generator():
        print(num)
except ValueError as e:
    print(f"Поймано: {e}")

# Отправка исключения в генератор
def controlled_generator():
    try:
        value = yield
        print(f"Получено: {value}")
    except ValueError as e:
        print(f"Поймано в генераторе: {e}")
    yield "продолжаем"

gen = controlled_generator()
next(gen)  # Запускаем генератор
gen.throw(ValueError, "ошибка от вызывающего кода"))`,
      },
      {
        kind: "text",
        md: `## Исключения в дескрипторах

Дескрипторы — классы, реализующие протокол \`__get__\`, \`__set__\`, \`__delete__\`. Исключения в дескрипторах позволяют валидировать данные при доступе к атрибутам.

**Паттерны:**
- Валидация при установке значения
- Вычисляемые свойства с обработкой ошибок
- Логирование доступа к атрибутам`,
      },
      {
        kind: "code",
        title: "Валидирующий дескриптор",
        code: `class ValidatedAttribute:
    """Дескриптор для валидации атрибута."""
    def __init__(self, name, validator):
        self.name = name
        self.validator = validator
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name)
    
    def __set__(self, obj, value):
        try:
            self.validator(value)
            obj.__dict__[self.name] = value
        except ValueError as e:
            raise ValueError(f"Ошибка валидации {self.name}: {e}")

# Валидаторы
def validate_positive(value):
    if value <= 0:
        raise ValueError("должно быть положительным")

def validate_range(min_val, max_val):
    def validator(value):
        if not (min_val <= value <= max_val):
            raise ValueError(f"должно быть между {min_val} и {max_val}")
    return validator

class Product:
    price = ValidatedAttribute("price", validate_positive)
    rating = ValidatedAttribute("rating", validate_range(0, 5))

product = Product()
product.price = 100  # OK
product.rating = 4.5  # OK

try:
    product.price = -10  # Ошибка!
except ValueError as e:
    print(e)`,
      },
      {
        kind: "text",
        md: `## Исключения в метаклассах

Метаклассы — классы для классов. Исключения в метаклассах возникают при создании класса (не экземпляра). Это позволяет валидировать структуру класса.

**Использование:**
- Проверка наличия обязательных методов
- Валидация сигнатур методов
- Автоматическая регистрация классов`,
      },
      {
        kind: "code",
        title: "Метакласс с валидацией",
        code: `class MethodValidator(type):
    """Метакласс, проверяющий наличие обязательных методов."""
    def __new__(mcs, name, bases, namespace):
        # Проверяем наличие обязательных методов
        required_methods = ['validate', 'process']
        for method in required_methods:
            if method not in namespace:
                raise TypeError(
                    f"Класс {name} должен содержать метод {method}"
                )
        return super().__new__(mcs, name, bases, namespace)

class Processor(metaclass=MethodValidator):
    def validate(self):
        pass
    
    def process(self):
        pass

# Это вызовет ошибку при создании класса
try:
    class BadProcessor(metaclass=MethodValidator):
        def validate(self):
            pass
        # Отсутствует метод process!
except TypeError as e:
    print(e)`,
      },
      {
        kind: "text",
        md: `## Исключения в декораторах

Декораторы могут перехватывать исключения из декорируемых функций и обрабатывать их. Это полезно для логирования, повторных попыток, преобразования исключений.

**Паттерны:**
- Retry декоратор — повторные попытки при ошибках
- Transform декоратор — преобразование исключений
- Log декоратор — логирование ошибок
- Suppress декоратор — подавление определённых исключений`,
      },
      {
        kind: "code",
        title: "Декоратор повторных попыток",
        code: `import time
from functools import wraps

def retry(max_attempts=3, delay=1, exceptions=(Exception,)):
    """Декоратор для повторных попыток."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        print(f"Попытка {attempt + 1} не удалась: {e}. Повтор через {delay}с...")
                        time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5, exceptions=(ValueError, ConnectionError))
def unstable_operation():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Соединение нестабильно")
    return "Успех!"

try:
    result = unstable_operation()
    print(result)
except Exception as e:
    print(f"Все попытки не удались: {e}")`,
      },
      {
        kind: "code",
        title: "Декоратор преобразования исключений",
        code: `from functools import wraps

def transform_exception(from_exc, to_exc, message=""):
    """Преобразует один тип исключения в другой."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except from_exc as e:
                raise to_exc(f"{message}: {e}") from e
        return wrapper
    return decorator

class DatabaseError(Exception):
    pass

class UserError(Exception):
    pass

@transform_exception(DatabaseError, UserError, "Ошибка базы данных")
def get_user(user_id):
    if user_id < 0:
        raise DatabaseError("Неверный ID")
    return {"id": user_id, "name": "User"}

try:
    user = get_user(-1)
except UserError as e:
    print(e)  # Ошибка базы данных: Неверный ID`,
      },
      {
        kind: "text",
        md: `## Обработка исключений в декораторах

Декораторы могут обрабатывать исключения разными способами:

1. **Полный перехват** — перехватывает все исключения
2. **Выборочный перехват** — перехватывает только определённые типы
3. **Преобразование** — преобразует одно исключение в другое
4. **Подавление** — подавляет определённые исключения
5. **Логирование** — логирует исключения и пробрасывает дальше`,
      },
      {
        kind: "code",
        title: "Декоратор подавления исключений",
        code: `from functools import wraps

def suppress(*exceptions):
    """Подавляет указанные исключения."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except exceptions:
                return None
        return wrapper
    return decorator

@suppress(ValueError, TypeError)
def risky_operation(value):
    if value < 0:
        raise ValueError("Отрицательное значение")
    if not isinstance(value, (int, float)):
        raise TypeError("Неверный тип")
    return value * 2

print(risky_operation(5))      # 10
print(risky_operation(-1))     # None (ValueError подавлен)
print(risky_operation("abc"))  # None (TypeError подавлен)`,
      },
      {
        kind: "text",
        md: `## Комбинирование декораторов

Декораторы можно комбинировать. Порядок применения важен — декораторы применяются снизу вверх.

**Правила:**
- Декораторы применяются снизу вверх
- Каждый декоратор оборачивает результат предыдущего
- Используйте \`@wraps\` для сохранения метаданных`,
      },
      {
        kind: "code",
        title: "Комбинирование декораторов",
        code: `import time
from functools import wraps

def log_calls(func):
    """Логирует вызовы функции."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Вызов {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def measure_time(func):
    """Измеряет время выполнения."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} выполнилась за {elapsed:.4f}с")
        return result
    return wrapper

def retry_on_error(max_attempts=3):
    """Повторяет при ошибках."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Попытка {attempt + 1} не удалась")
        return wrapper
    return decorator

# Комбинирование декораторов
@log_calls
@measure_time
@retry_on_error(max_attempts=2)
def process_data(data):
    import random
    if random.random() < 0.5:
        raise ValueError("Случайная ошибка")
    return sum(data)

result = process_data([1, 2, 3, 4, 5])
print(f"Результат: {result}")`,
      },
      {
        kind: "text",
        md: `## Best practices для продвинутых исключений

1. **Используйте контекстные менеджеры** для управления ресурсами
2. **Применяйте декораторы** для повторяемой логики обработки ошибок
3. **Создавайте иерархию исключений** для вашего домена
4. **Используйте метаклассы** для валидации структуры классов
5. **Комбинируйте подходы** для сложных сценариев`,
      },
    ],
    quiz: [
      {
        q: "Что происходит, когда исключение возникает в генераторе?",
        options: [
          "Генератор продолжает работу",
          "Исключение распространяется к вызывающему коду",
          "Генератор игнорирует исключение",
          "Генератор перезапускается",
        ],
        answer: 1,
        explain: "Исключение в генераторе распространяется к вызывающему коду. Генератор не может быть использован снова после исключения.",
      },
      {
        q: "Когда возникают исключения в метаклассах?",
        options: [
          "При создании экземпляра класса",
          "При создании самого класса",
          "При вызове метода класса",
          "При импорте модуля",
        ],
        answer: 1,
        explain: "Метаклассы выполняются при создании класса, поэтому исключения возникают на этапе определения класса.",
      },
      {
        q: "В каком порядке применяются декораторы?",
        options: [
          "Сверху вниз",
          "Снизу вверх",
          "В случайном порядке",
          "Одновременно",
        ],
        answer: 1,
        explain: "Декораторы применяются снизу вверх. Каждый декоратор оборачивает результат предыдущего.",
      },
    ],
    tasks: [
      {
        id: "py13t1",
        title: "Валидирующий дескриптор",
        md: `Создайте дескриптор \`ValidatedAttribute\`, который валидирует значение при установке. Дескриптор должен принимать функцию-валидатор в конструкторе и бросать \`ValueError\`, если валидация не пройдена.`,
        starter: `class ValidatedAttribute:
    def __init__(self, name, validator):
        # ваш код
        pass
    
    def __get__(self, obj, objtype=None):
        # ваш код
        pass
    
    def __set__(self, obj, value):
        # ваш код
        pass

def validate_positive(value):
    if value <= 0:
        raise ValueError("должно быть положительным")

class Product:
    price = ValidatedAttribute("price", validate_positive)

product = Product()
product.price = 100  # OK
try:
    product.price = -10  # Ошибка!
except ValueError as e:
    print(e)`,
        tests: `
def test_valid():
    class Product:
        price = ValidatedAttribute("price", lambda v: None if v > 0 else (_ for _ in ()).throw(ValueError("error")))
    p = Product()
    p.price = 100
    return p.price == 100
__test("валидное значение", test_valid, True)
def test_invalid():
    class Product:
        price = ValidatedAttribute("price", lambda v: None if v > 0 else (_ for _ in ()).throw(ValueError("error")))
    p = Product()
    try:
        p.price = -10
        return False
    except ValueError:
        return True
__test("невалидное значение", test_invalid, True)`,
        solution: `class ValidatedAttribute:
    def __init__(self, name, validator):
        self.name = name
        self.validator = validator
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name)
    
    def __set__(self, obj, value):
        try:
            self.validator(value)
            obj.__dict__[self.name] = value
        except Exception as e:
            raise ValueError(f"Ошибка валидации {self.name}: {e}")`,
      },
      {
        id: "py13t2",
        title: "Декоратор повторных попыток",
        md: `Создайте декоратор \`retry\`, который повторяет вызов функции при возникновении исключения. Декоратор должен принимать параметры \`max_attempts\` и \`delay\`.`,
        starter: `import time

def retry(max_attempts=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            # ваш код
            pass
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.1)
def unstable_function():
    import random
    if random.random() < 0.7:
        raise ValueError("Случайная ошибка")
    return "Успех!"

result = unstable_function()
print(result)`,
        tests: `
def test_success():
    @retry(max_attempts=3, delay=0.01)
    def always_ok():
        return "OK"
    return always_ok() == "OK"
__test("успех с первой попытки", test_success, True)
def test_retry():
    attempts = [0]
    @retry(max_attempts=3, delay=0.01)
    def sometimes_fail():
        attempts[0] += 1
        if attempts[0] < 3:
            raise ValueError("Ошибка")
        return "OK"
    return sometimes_fail() == "OK"
__test("успех после повторных попыток", test_retry, True)`,
        solution: `import time

def retry(max_attempts=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator`,
      },
    ],
  },

  {
    id: "py14",
    language: "python",
    title: "Паттерны проектирования с исключениями",
    subtitle: "Паттерны обработки ошибок в реальных приложениях",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Паттерны обработки ошибок

В реальных приложениях используются различные паттерны обработки ошибок. Выбор паттерна зависит от контекста, требований и архитектуры системы.

**Основные паттерны:**
1. **Fail-Fast** — немедленное падение при ошибке
2. **Graceful Degradation** — постепенная деградация
3. **Retry** — повторные попытки
4. **Circuit Breaker** — автоматическое отключение при множественных ошибках
5. **Fallback** — использование альтернативного пути`,
      },
      {
        kind: "text",
        md: `## Fail-Fast паттерн

Fail-Fast — немедленное падение при обнаружении ошибки. Используется для критических ошибок, которые нельзя игнорировать.

**Когда использовать:**
- Нарушение инвариантов
- Некорректные входные данные
- Критические системные ошибки

**Преимущества:**
- Раннее обнаружение ошибок
- Простота отладки
- Предотвращение каскадных сбоев`,
      },
      {
        kind: "code",
        title: "Fail-Fast валидация",
        code: `class UserService:
    def __init__(self, db):
        if db is None:
            raise ValueError("Database connection required")
        self.db = db
    
    def create_user(self, data):
        # Fail-Fast валидация
        if not isinstance(data, dict):
            raise TypeError("data must be a dict")
        
        if 'email' not in data:
            raise ValueError("email is required")
        
        if not self._is_valid_email(data['email']):
            raise ValueError(f"Invalid email: {data['email']}")
        
        # Создание пользователя
        return self.db.insert('users', data)
    
    def _is_valid_email(self, email):
        return '@' in email and '.' in email.split('@')[1]

# Использование
service = UserService(db_connection)
try:
    user = service.create_user({'email': 'invalid'})
except ValueError as e:
    print(f"Validation error: {e}")`,
      },
      {
        kind: "text",
        md: `## Graceful Degradation паттерн

Graceful Degradation — система продолжает работать с ограниченной функциональностью при возникновении ошибок.

**Когда использовать:**
- Необязательные функции
- Внешние сервисы
- Кэширование
- Резервные системы`,
      },
      {
        kind: "code",
        title: "Graceful Degradation",
        code: `class RecommendationService:
    def __init__(self, ml_service, cache):
        self.ml_service = ml_service
        self.cache = cache
    
    def get_recommendations(self, user_id):
        # Пробуем ML сервис
        try:
            recommendations = self.ml_service.get_recommendations(user_id)
            self.cache.set(user_id, recommendations)
            return recommendations
        except Exception as e:
            print(f"ML service failed: {e}")
            
            # Graceful degradation: используем кэш
            try:
                cached = self.cache.get(user_id)
                if cached:
                    print("Using cached recommendations")
                    return cached
            except Exception as e:
                print(f"Cache failed: {e}")
            
            # Fallback: базовые рекомендации
            return self._get_basic_recommendations(user_id)
    
    def _get_basic_recommendations(self, user_id):
        return ["Popular item 1", "Popular item 2"]`,
      },
      {
        kind: "text",
        md: `## Circuit Breaker паттерн

Circuit Breaker — автоматическое отключение сервиса при множественных ошибках. Предотвращает каскадные сбои и даёт время на восстановление.

**Состояния:**
- **Closed** — нормальная работа
- **Open** — сервис отключён
- **Half-Open** — проверка восстановления`,
      },
      {
        kind: "code",
        title: "Circuit Breaker реализация",
        code: `import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = 0
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerOpen("Circuit breaker is open")
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
    
    def _should_attempt_reset(self):
        return time.time() - self.last_failure_time > self.recovery_timeout
    
    def _on_success(self):
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

class CircuitBreakerOpen(Exception):
    pass

# Использование
breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=10)

def unstable_service():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Service unavailable")
    return "Success"

try:
    result = breaker.call(unstable_service)
except CircuitBreakerOpen:
    print("Circuit breaker is open, using fallback")`,
      },
      {
        kind: "text",
        md: `## Fallback паттерн

Fallback — использование альтернативного пути при ошибке основного пути.

**Типы fallback:**
- **Кэшированные данные** — использование кэша
- **Упрощённая логика** — базовая функциональность
- **Резервный сервис** — альтернативный сервис
- **Значения по умолчанию** — дефолтные значения`,
      },
      {
        kind: "code",
        title: "Fallback с кэшем",
        code: `class PaymentService:
    def __init__(self, payment_gateway, cache):
        self.payment_gateway = payment_gateway
        self.cache = cache
    
    def process_payment(self, order_id, amount):
        # Основной путь: платежный шлюз
        try:
            result = self.payment_gateway.charge(order_id, amount)
            self.cache.set(f"payment:{order_id}", result)
            return result
        except PaymentGatewayError as e:
            print(f"Payment gateway failed: {e}")
            
            # Fallback 1: кэш
            try:
                cached = self.cache.get(f"payment:{order_id}")
                if cached:
                    print("Using cached payment")
                    return cached
            except Exception as e:
                print(f"Cache failed: {e}")
            
            # Fallback 2: резервный шлюз
            try:
                result = self.backup_gateway.charge(order_id, amount)
                return result
            except Exception as e:
                print(f"Backup gateway failed: {e}")
            
            # Fallback 3: очередь на обработку
            self.queue.enqueue({
                'order_id': order_id,
                'amount': amount,
                'status': 'pending'
            })
            return {'status': 'queued', 'order_id': order_id}`,
      },
      {
        kind: "text",
        md: `## Комбинирование паттернов

В реальных приложениях паттерны часто комбинируются для создания устойчивых систем.

**Пример комбинации:**
1. **Circuit Breaker** — защита от каскадных сбоев
2. **Retry** — повторные попытки при временных ошибках
3. **Fallback** — альтернативный путь при постоянных ошибках
4. **Graceful Degradation** — постепенная деградация`,
      },
      {
        kind: "code",
        title: "Комбинирование паттернов",
        code: `class ResilientService:
    def __init__(self, primary_service, backup_service, cache):
        self.primary = primary_service
        self.backup = backup_service
        self.cache = cache
        self.circuit_breaker = CircuitBreaker(failure_threshold=3)
    
    def call(self, method, *args, **kwargs):
        # Circuit Breaker + Retry + Fallback
        try:
            # Попытка через основной сервис с retry
            return self._call_with_retry(
                lambda: self.circuit_breaker.call(
                    getattr(self.primary, method),
                    *args, **kwargs
                ),
                max_attempts=3
            )
        except Exception as e:
            print(f"Primary service failed: {e}")
            
            # Fallback: кэш
            cache_key = f"{method}:{args}:{kwargs}"
            try:
                cached = self.cache.get(cache_key)
                if cached:
                    print("Using cache")
                    return cached
            except Exception:
                pass
            
            # Fallback: резервный сервис
            try:
                return getattr(self.backup, method)(*args, **kwargs)
            except Exception as e:
                print(f"Backup service failed: {e}")
                raise
    
    def _call_with_retry(self, func, max_attempts=3, delay=1):
        for attempt in range(max_attempts):
            try:
                return func()
            except Exception as e:
                if attempt == max_attempts - 1:
                    raise
                print(f"Attempt {attempt + 1} failed, retrying...")
                time.sleep(delay)`,
      },
      {
        kind: "text",
        md: `## Best practices для паттернов обработки ошибок

1. **Выбирайте правильный паттерн** для вашего контекста
2. **Комбинируйте паттерны** для сложных сценариев
3. **Логируйте все ошибки** для отладки
4. **Мониторьте частоту ошибок** для настройки порогов
5. **Тестируйте fallback пути** регулярно
6. **Документируйте поведение** при ошибках`,
      },
    ],
    quiz: [
      {
        q: "Что делает Circuit Breaker паттерн?",
        options: [
          "Повторяет запросы при ошибках",
          "Автоматически отключает сервис при множественных ошибках",
          "Использует кэш при ошибках",
          "Логирует все ошибки",
        ],
        answer: 1,
        explain: "Circuit Breaker автоматически отключает сервис при достижении порога ошибок, предотвращая каскадные сбои.",
      },
      {
        q: "Когда использовать Graceful Degradation?",
        options: [
          "Для критических ошибок",
          "Для необязательных функций",
          "Для валидации данных",
          "Для логирования",
        ],
        answer: 1,
        explain: "Graceful Degradation используется для необязательных функций, позволяя системе продолжать работать с ограниченной функциональностью.",
      },
      {
        q: "Что такое Fallback паттерн?",
        options: [
          "Повторные попытки при ошибках",
          "Использование альтернативного пути при ошибке",
          "Автоматическое отключение сервиса",
          "Логирование ошибок",
        ],
        answer: 1,
        explain: "Fallback — использование альтернативного пути (кэш, резервный сервис, значения по умолчанию) при ошибке основного пути.",
      },
    ],
    tasks: [
      {
        id: "py14t1",
        title: "Circuit Breaker",
        md: `Реализуйте класс \`CircuitBreaker\`, который отслеживает количество ошибок и открывает цепь при достижении порога. Класс должен иметь методы \`call(func)\`, \`_on_success()\`, \`_on_failure()\` и свойство \`state\`.`,
        starter: `from enum import Enum
import time

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        # ваш код
        pass
    
    def call(self, func, *args, **kwargs):
        # ваш код
        pass
    
    def _on_success(self):
        # ваш код
        pass
    
    def _on_failure(self):
        # ваш код
        pass

# Тест
breaker = CircuitBreaker(failure_threshold=3)

def failing_function():
    raise ValueError("Ошибка")

try:
    for _ in range(4):
        breaker.call(failing_function)
except Exception as e:
    print(f"После 3 ошибок: {breaker.state}")`,
        tests: `
def test_circuit_opens():
    breaker = CircuitBreaker(failure_threshold=3)
    def fail():
        raise ValueError("error")
    for _ in range(3):
        try:
            breaker.call(fail)
        except:
            pass
    return breaker.state == CircuitState.OPEN
__test("цепь открывается после 3 ошибок", test_circuit_opens, True)
def test_circuit_closes_on_success():
    breaker = CircuitBreaker(failure_threshold=3)
    def fail():
        raise ValueError("error")
    for _ in range(3):
        try:
            breaker.call(fail)
        except:
            pass
    def success():
        return "ok"
    result = breaker.call(success)
    return breaker.state == CircuitState.CLOSED and result == "ok"
__test("цепь закрывается при успехе", test_circuit_closes_on_success, True)`,
        solution: `from enum import Enum
import time

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = 0
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
            else:
                raise Exception("Circuit breaker is open")
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
    
    def _on_success(self):
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN`,
      },
      {
        id: "py14t2",
        title: "Fallback с кэшем",
        md: `Реализуйте класс \`ResilientService\`, который вызывает основной сервис, а при ошибке использует кэш. Класс должен иметь методы \`call(method, *args)\` и \`_get_from_cache(key)\`.`,
        starter: `class ResilientService:
    def __init__(self, primary_service, cache):
        # ваш код
        pass
    
    def call(self, method, *args):
        # ваш код
        pass
    
    def _get_from_cache(self, key):
        # ваш код
        pass

# Тест
class MockService:
    def get_data(self, key):
        raise ConnectionError("Service unavailable")

class MockCache:
    def __init__(self):
        self.data = {"test": "cached_value"}
    
    def get(self, key):
        return self.data.get(key)

service = ResilientService(MockService(), MockCache())
result = service.call("get_data", "test")
print(result)  # cached_value`,
        tests: `
def test_fallback_to_cache():
    class MockService:
        def get_data(self, key):
            raise ConnectionError("error")
    class MockCache:
        def get(self, key):
            return "cached"
    service = ResilientService(MockService(), MockCache())
    return service.call("get_data", "test") == "cached"
__test("fallback на кэш", test_fallback_to_cache, True)
def test_primary_service():
    class MockService:
        def get_data(self, key):
            return "primary"
    class MockCache:
        def get(self, key):
            return "cached"
    service = ResilientService(MockService(), MockCache())
    return service.call("get_data", "test") == "primary"
__test("использует основной сервис", test_primary_service, True)`,
        solution: `class ResilientService:
    def __init__(self, primary_service, cache):
        self.primary = primary_service
        self.cache = cache
    
    def call(self, method, *args):
        try:
            return getattr(self.primary, method)(*args)
        except Exception as e:
            print(f"Primary service failed: {e}")
            cache_key = f"{method}:{args}"
            cached = self._get_from_cache(cache_key)
            if cached:
                print("Using cache")
                return cached
            raise
    
    def _get_from_cache(self, key):
        return self.cache.get(key)`,
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

Подсказки типов **не проверяются** интерпретатором — они документация для людей и пища для статического анализатора \`mypy\`. Современный синтаксис: \`list[int]\`, \`dict[str, int]\`, \`str | None\`.

**Преимущества типизации:**
- Раннее обнаружение ошибок
- Улучшенная автодокументация кода
- Лучшая поддержка IDE (автодополнение, рефакторинг)
- Облегчает рефакторинг в больших проектах
- Улучшает читаемость кода`,
      },
      {
        kind: "code",
        title: "Базовые аннотации",
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
        md: `## Продвинутая типизация

Python предоставляет мощные инструменты для типизации сложных структур:

- **Generic** — параметризованные типы
- **TypeVar** — переменные типов для обобщённых функций
- **Protocol** — структурная типизация (duck typing)
- **TypedDict** — типизация словарей
- **Literal** — литеральные типы
- **Union** — объединение типов
- **TypeAlias** — алиасы типов`,
      },
      {
        kind: "code",
        title: "Generic типы",
        code: `from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    """Обобщённый стек."""
    def __init__(self):
        self._items: list[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> T:
        return self._items.pop()
    
    def peek(self) -> T:
        return self._items[-1]

# Использование с разными типами
int_stack: Stack[int] = Stack()
int_stack.push(42)
value: int = int_stack.pop()

str_stack: Stack[str] = Stack()
str_stack.push("hello")
text: str = str_stack.pop()`,
      },
      {
        kind: "code",
        title: "Protocol и duck typing",
        code: `from typing import Protocol

class Drawable(Protocol):
    """Протокол для рисуемых объектов."""
    def draw(self) -> None:
        ...

class Circle:
    def __init__(self, radius: float):
        self.radius = radius
    
    def draw(self) -> None:
        print(f"Рисуем круг радиусом {self.radius}")

class Square:
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> None:
        print(f"Рисуем квадрат со стороной {self.side}")

# Функция принимает любой объект с методом draw()
def render(shape: Drawable) -> None:
    shape.draw()

render(Circle(5.0))  # Работает!
render(Square(3.0))  # Работает!`,
      },
      {
        kind: "code",
        title: "TypedDict",
        code: `from typing import TypedDict

class User(TypedDict):
    """Типизированный словарь для пользователя."""
    id: int
    name: str
    email: str
    age: int

def create_user(id: int, name: str, email: str, age: int) -> User:
    return {
        "id": id,
        "name": name,
        "email": email,
        "age": age
    }

user: User = create_user(1, "Ада", "ada@example.com", 36)
print(user["name"])  # IDE подсказывает ключи

# Optional поля
from typing import TypedDict

class Config(TypedDict, total=False):
    """Конфигурация с необязательными полями."""
    host: str
    port: int
    debug: bool

config: Config = {"host": "localhost"}  # port и debug опциональны`,
      },
      {
        kind: "text",
        md: `## Union и Literal типы

**Union** — объединение нескольких типов:
\`\`\`python
from typing import Union

def process(value: Union[int, str]) -> None:
    if isinstance(value, int):
        print(f"Число: {value}")
    else:
        print(f"Строка: {value}")
\`\`\`

**Literal** — литеральные типы (конкретные значения):
\`\`\`python
from typing import Literal

def set_mode(mode: Literal["read", "write", "append"]) -> None:
    print(f"Режим: {mode}")

set_mode("read")   # OK
set_mode("write")  # OK
set_mode("delete") # Ошибка!
\`\`\``,
      },
      {
        kind: "code",
        title: "TypeAlias для сложных типов",
        code: `from typing import TypeAlias, Union

# Сложный тип данных
JsonType: TypeAlias = Union[dict, list, str, int, float, bool, None]
Matrix: TypeAlias = list[list[float]]
Callback: TypeAlias = Callable[[int, str], bool]

def process_json(data: JsonType) -> None:
    if isinstance(data, dict):
        print("Словарь")
    elif isinstance(data, list):
        print("Список")
    else:
        print("Примитив")

def multiply_matrix(matrix: Matrix, scalar: float) -> Matrix:
    return [[cell * scalar for cell in row] for row in matrix]

matrix: Matrix = [[1.0, 2.0], [3.0, 4.0]]
result = multiply_matrix(matrix, 2.0)`,
      },
      {
        kind: "text",
        md: `## dataclass — классы без бойлерплейта

Декоратор \`@dataclass\` генерирует \`__init__\`, \`__repr__\` и \`__eq__\` по полям. Класс на 30 строк сжимается до четырёх — и остаётся полноценным классом с методами.

**Параметры dataclass:**
- \`frozen=True\` — неизменяемый класс (как tuple)
- \`slots=True\` — экономия памяти (Python 3.10+)
- \`eq=True/False\` — генерировать \`__eq__\`
- \`order=True\` — генерировать методы сравнения (\`<\`, \`>\`, \`<=\`, \`>=\`)
- \`unsafe_hash=True\` — сделать хэшируемым`,
      },
      {
        kind: "code",
        title: "Базовый dataclass",
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
        kind: "code",
        title: "Frozen dataclass (неизменяемый)",
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutablePoint:
    x: float
    y: float

p = ImmutablePoint(1.0, 2.0)
print(p)  # ImmutablePoint(x=1.0, y=2.0)

# Попытка изменения вызовет ошибку
try:
    p.x = 3.0  # FrozenInstanceError!
except Exception as e:
    print(f"Ошибка: {e}")

# Можно использовать как ключ словаря (хэшируемый)
locations = {p: "точка А"}
print(locations[p])  # точка А`,
      },
      {
        kind: "code",
        title: "Dataclass с order и slots",
        code: `from dataclasses import dataclass

@dataclass(order=True, slots=True)
class Product:
    name: str
    price: float
    quantity: int

products = [
    Product("Яблоко", 1.5, 10),
    Product("Банан", 0.8, 20),
    Product("Апельсин", 2.0, 5)
]

# Сортировка по полям (по порядку объявления)
sorted_products = sorted(products)
for p in sorted_products:
    print(f"{p.name}: {p.price} x {p.quantity}")

# Экономия памяти с slots
import sys
print(f"Размер с slots: {sys.getsizeof(Product('test', 1.0, 1))} байт")`,
      },
      {
        kind: "text",
        md: `## Field для сложных полей

\`field()\` позволяет настроить отдельные поля:
- \`default\` — значение по умолчанию
- \`default_factory\` — функция для создания значения
- \`repr=True/False\` — включать в \`__repr__\`
- \`compare=True/False\` — включать в сравнение
- \`init=True/False\` — включать в \`__init__\``,
      },
      {
        kind: "code",
        title: "Field с default_factory",
        code: `from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class User:
    name: str
    email: str
    created_at: datetime = field(default_factory=datetime.now)
    tags: list[str] = field(default_factory=list)
    metadata: dict = field(default_factory=dict, repr=False)

user1 = User("Ада", "ada@example.com")
user2 = User("Боб", "bob@example.com")

print(user1.created_at)  # Автоматическая дата создания
print(user1.tags)        # Пустой список
print(user1)             # metadata не показывается

# Каждый экземпляр имеет свой список
user1.tags.append("python")
print(user2.tags)  # Пустой список (не общий!)`,
      },
      {
        kind: "text",
        md: `## Post-init обработка

\`__post_init__\` вызывается после \`__init__\` для дополнительной инициализации или валидации.`,
      },
      {
        kind: "code",
        title: "Post-init валидация",
        code: `from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float
    
    def __post_init__(self):
        if self.width <= 0 or self.height <= 0:
            raise ValueError("Размеры должны быть положительными")
    
    @property
    def area(self) -> float:
        return self.width * self.height
    
    @property
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

rect = Rectangle(5.0, 3.0)
print(f"Площадь: {rect.area}")      # 15.0
print(f"Периметр: {rect.perimeter}") # 16.0

try:
    bad_rect = Rectangle(-1.0, 3.0)  # ValueError!
except ValueError as e:
    print(f"Ошибка: {e}")`,
      },
      {
        kind: "text",
        md: `## Наследование dataclass

Dataclass поддерживает наследование. Дочерний класс наследует все поля родителя и может добавлять свои.`,
      },
      {
        kind: "code",
        title: "Наследование dataclass",
        code: `from dataclasses import dataclass

@dataclass
class Animal:
    name: str
    age: int

@dataclass
class Dog(Animal):
    breed: str
    tricks: list[str]

dog = Dog("Рекс", 5, "Сидеть", ["Сидеть", "Лежать", "Голос"])
print(dog)
# Dog(name='Рекс', age=5, breed='Немецкая овчарка', tricks=['Сидеть', 'Лежать', 'Голос'])

# Переопределение полей
@dataclass
class Cat(Animal):
    age: int = 0  # Переопределяем с значением по умолчанию
    indoor: bool = True

cat = Cat("Мурка")
print(cat)  # Cat(name='Мурка', age=0, indoor=True)`,
      },
      {
        kind: "text",
        md: `## Экосистема Python

Python имеет богатую экосистему инструментов для разработки:

### Линтеры и форматтеры
- **ruff** — быстрый линтер и форматтер (замена flake8 + isort + black)
- **black** — автоматический форматтер кода
- **isort** — сортировка импортов
- **mypy** — статическая проверка типов
- **pylint** — комплексный линтер

### Управление зависимостями
- **pip** — стандартный менеджер пакетов
- **venv** — виртуальные окружения
- **poetry** — современный менеджер зависимостей
- **pipenv** — альтернатива poetry
- **uv** — сверхбыстрый менеджер (Rust-based)

### Тестирование
- **pytest** — стандарт де-факто для тестирования
- **unittest** — встроенный фреймворк
- **hypothesis** — property-based тестирование
- **coverage** — измерение покрытия кода тестами

### IDE и редакторы
- **PyCharm** — специализированная IDE для Python
- **VS Code** — универсальный редактор с отличной поддержкой Python
- **Jupyter** — интерактивные ноутбуки для анализа данных`,
      },
      {
        kind: "text",
        md: `## PEP 8 — руководство по стилю

PEP 8 — официальное руководство по стилю кода в Python.

**Основные правила:**

### Отступы
- Используйте 4 пробела на уровень отступа
- Никогда не смешивайте табы и пробелы

### Длина строки
- Максимум 79 символов для кода
- Максимум 72 символа для комментариев и docstrings

### Импорты
- Импорты в начале файла
- Группируйте импорты: стандартная библиотека, сторонние пакеты, локальные
- Один импорт на строку
- Используйте абсолютные импорты

### Именование
- **Модули**: snake_case (\`my_module.py\`)
- **Классы**: PascalCase (\`MyClass\`)
- **Функции и переменные**: snake_case (\`my_function\`)
- **Константы**: UPPER_SNAKE_CASE (\`MAX_SIZE\`)
- **Приватные**: начинаются с \`_\` (\`_private_var\`)`,
      },
      {
        kind: "code",
        title: "Пример правильного стиля",
        code: `# Правильные импорты
import os
import sys
from typing import Optional, List

import requests
from flask import Flask

from myapp.models import User
from myapp.utils import helper

# Константы
MAX_RETRIES = 3
DEFAULT_TIMEOUT = 30

# Классы
class UserService:
    """Сервис для работы с пользователями."""
    
    def __init__(self, db_connection):
        self.db = db_connection
    
    def get_user(self, user_id: int) -> Optional[User]:
        """Получить пользователя по ID."""
        return self.db.query(User).get(user_id)
    
    def create_user(self, name: str, email: str) -> User:
        """Создать нового пользователя."""
        user = User(name=name, email=email)
        self.db.add(user)
        return user

# Функции
def process_data(data: List[dict]) -> None:
    """Обработать данные."""
    for item in 
        process_item(item)

def _private_helper():
    """Приватная вспомогательная функция."""
    pass`,
      },
      {
        kind: "text",
        md: `## Mypy — статическая проверка типов

Mypy проверяет типы в коде без его запуска. Это помогает найти ошибки до запуска программы.

**Установка и использование:**
\`\`\`bash
pip install mypy
mypy my_script.py
\`\`\`

**Конфигурация:**
Создайте файл \`mypy.ini\` или \`pyproject.toml\` для настройки mypy.`,
      },
      {
        kind: "code",
        title: "Пример проверки mypy",
        code: `# example.py
def greet(name: str) -> str:
    return f"Привет, {name}!"

# Правильное использование
message: str = greet("Ада")
print(message)

# Ошибки, которые найдёт mypy
wrong: int = greet("Боб")  # Ошибка: incompatible types
greet(123)  # Ошибка: argument has incompatible type "int"

# Проверка:
# mypy example.py
# Success: no issues found`,
      },
      {
        kind: "text",
        md: `## Виртуальные окружения

Виртуальные окружения изолируют зависимости проекта. Каждый проект имеет свой набор пакетов.

**Создание и использование:**
\`\`\`bash
# Создание виртуального окружения
python -m venv venv

# Активация (Linux/macOS)
source venv/bin/activate

# Активация (Windows)
venv\\Scripts\\activate

# Установка пакетов
pip install requests flask

# Деактивация
deactivate
\`\`\`

**requirements.txt:**
\`\`\`bash
# Сохранение зависимостей
pip freeze > requirements.txt

# Установка зависимостей
pip install -r requirements.txt
\`\`\``,
      },
      {
        kind: "text",
        md: `## Poetry — современный менеджер зависимостей

Poetry объединяет управление зависимостями, виртуальные окружения и упаковку пакетов.

**Основные команды:**
\`\`\`bash
# Инициализация проекта
poetry init

# Добавление зависимости
poetry add requests

# Добавление dev-зависимости
poetry add --dev pytest

# Установка всех зависимостей
poetry install

# Запуск в виртуальном окружении
poetry run python script.py
\`\`\`

**pyproject.toml:**
\`\`\`toml
[tool.poetry]
name = "my-project"
version = "0.1.0"
description = "My awesome project"

[tool.poetry.dependencies]
python = "^3.8"
requests = "^2.28.0"

[tool.poetry.dev-dependencies]
pytest = "^7.0.0"
\`\`\``,
      },
      {
        kind: "text",
        md: `## Pytest — тестирование

Pytest — стандарт де-факто для тестирования в Python.

**Основные возможности:**
- Простой синтаксис тестов
- Автоматическое обнаружение тестов
- Фикстуры для подготовки данных
- Параметризация тестов
- Плагины для расширения функциональности`,
      },
      {
        kind: "code",
        title: "Примеры тестов с pytest",
        code: `# test_calculator.py
import pytest
from calculator import add, divide

def test_add():
    """Тест сложения."""
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_divide():
    """Тест деления."""
    assert divide(10, 2) == 5.0
    assert divide(7, 2) == 3.5

def test_divide_by_zero():
    """Тест деления на ноль."""
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Параметризация тестов
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected

# Фикстуры
@pytest.fixture
def sample_data():
    """Фикстура с тестовыми данными."""
    return [1, 2, 3, 4, 5]

def test_with_fixture(sample_data):
    assert len(sample_data) == 5
    assert sum(sample_data) == 15

# Запуск тестов:
# pytest test_calculator.py
# pytest -v (подробный вывод)
# pytest --cov=calculator (с покрытием)`,
      },
      {
        kind: "text",
        md: `## Инструменты разработки

### IDE и редакторы
- **PyCharm** — мощная IDE с полной поддержкой Python
- **VS Code** — лёгкий редактор с отличными расширениями
- **Jupyter Notebook** — интерактивная среда для анализа данных
- **JupyterLab** — улучшенная версия Jupyter

### Отладка
- **pdb** — встроенный отладчик Python
- **ipdb** — улучшенный pdb с подсветкой синтаксиса
- **IDE отладчики** — визуальные отладчики в IDE

### Профилирование
- **cProfile** — встроенный профилировщик
- **line_profiler** — профилирование по строкам
- **memory_profiler** — профилирование памяти`,
      },
      {
        kind: "code",
        title: "Использование pdb",
        code: `# Отладка с pdb
import pdb

def buggy_function(x, y):
    # Устанавливаем точку останова
    pdb.set_trace()
    
    result = x + y
    return result

# Запуск с отладкой:
# python script.py
# (pdb) n  # следующая строка
# (pdb) p x  # напечатать переменную x
# (pdb) c  # продолжить

# Или запуск сразу с отладчиком:
# python -m pdb script.py`,
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
      {
        q: "Что делает параметр frozen=True в dataclass?",
        options: [
          "Делает класс хэшируемым",
          "Делает класс неизменяемым",
          "Добавляет методы сравнения",
          "Добавляет слоты",
        ],
        answer: 1,
        explain: "frozen=True делает класс неизменяемым — после создания нельзя изменять атрибуты.",
      },
      {
        q: "Что такое Protocol в типизации?",
        options: [
          "Интерфейс для наследования",
          "Структурная типизация (duck typing)",
          "Протокол передачи данных",
          "Абстрактный класс",
        ],
        answer: 1,
        explain: "Protocol позволяет проверять наличие методов без явного наследования — duck typing с проверкой типов.",
      },
      {
        q: "Для чего нужен field(default_factory=...)?",
        options: [
          "Для создания фабрики классов",
          "Для создания изменяемых значений по умолчанию",
          "Для валидации полей",
          "Для скрытия полей",
        ],
        answer: 1,
        explain: "default_factory вызывает функцию для каждого экземпляра, создавая новые списки/словари вместо общих.",
      },
      {
        q: "Что делает pytest.fixture?",
        options: [
          "Создаёт тест",
          "Подготавливает данные для тестов",
          "Запускает тесты",
          "Проверяет результаты",
        ],
        answer: 1,
        explain: "Фикстуры подготавливают данные или состояние перед тестами и могут использоваться повторно.",
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
      {
        id: "py12t3",
        title: "Frozen dataclass",
        md: `Создайте \`@dataclass(frozen=True) Color\` с полями \`r\`, \`g\`, \`b\` (все int от 0 до 255). Добавьте метод \`to_hex()\`, возвращающий строку вида \`"#RRGGBB"\`. Класс должен быть неизменяемым и хэшируемым.`,
        starter: `from dataclasses import dataclass

@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int
    
    def to_hex(self) -> str:
        # ваш код
        pass

red = Color(255, 0, 0)
print(red.to_hex())  # #FF0000
print(hash(red))     # Хэшируемый!`,
        tests: `
def test_to_hex():
    red = Color(255, 0, 0)
    return red.to_hex() == "#FF0000"
__test("to_hex для красного", test_to_hex, True)
def test_frozen():
    red = Color(255, 0, 0)
    try:
        red.r = 0
        return False
    except:
        return True
__test("класс неизменяемый", test_frozen, True)
def test_hashable():
    red = Color(255, 0, 0)
    colors = {red: "красный"}
    return colors[red] == "красный"
__test("класс хэшируемый", test_hashable, True)`,
        solution: `from dataclasses import dataclass

@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int
    
    def to_hex(self) -> str:
        return f"#{self.r:02X}{self.g:02X}{self.b:02X}"`,
      },
      {
        id: "py12t4",
        title: "Protocol для drawable",
        md: `Создайте \`Protocol Drawable\` с методом \`draw() -> None\`. Создайте классы \`Circle\` и \`Square\`, реализующие этот протокол. Создайте функцию \`render(shape: Drawable)\`, которая принимает любой объект с методом \`draw()\`.`,
        starter: `from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None:
        ...

class Circle:
    def __init__(self, radius: float):
        self.radius = radius
    
    def draw(self) -> None:
        print(f"Рисуем круг радиусом {self.radius}")

class Square:
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> None:
        print(f"Рисуем квадрат со стороной {self.side}")

def render(shape: Drawable) -> None:
    # ваш код
    pass

render(Circle(5.0))
render(Square(3.0))`,
        tests: `
def test_circle():
    class TestCircle:
        def __init__(self, radius):
            self.radius = radius
        def draw(self):
            pass
    circle = TestCircle(5.0)
    render(circle)
    return True
__test("Circle реализует Drawable", test_circle, True)
def test_square():
    class TestSquare:
        def __init__(self, side):
            self.side = side
        def draw(self):
            pass
    square = TestSquare(3.0)
    render(square)
    return True
__test("Square реализует Drawable", test_square, True)`,
        solution: `from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None:
        ...

class Circle:
    def __init__(self, radius: float):
        self.radius = radius
    
    def draw(self) -> None:
        print(f"Рисуем круг радиусом {self.radius}")

class Square:
    def __init__(self, side: float):
        self.side = side
    
    def draw(self) -> None:
        print(f"Рисуем квадрат со стороной {self.side}")

def render(shape: Drawable) -> None:
    shape.draw()`,
      },
      {
        id: "py12t5",
        title: "Dataclass с post_init",
        md: `Создайте \`@dataclass Rectangle\` с полями \`width\` и \`height\`. В \`__post_init__\` проверяйте, что оба значения положительные (иначе \`ValueError\`). Добавьте свойства \`area\` и \`perimeter\`.`,
        starter: `from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float
    
    def __post_init__(self):
        # ваш код
        pass
    
    @property
    def area(self) -> float:
        # ваш код
        pass
    
    @property
    def perimeter(self) -> float:
        # ваш код
        pass

rect = Rectangle(5.0, 3.0)
print(f"Площадь: {rect.area}")
print(f"Периметр: {rect.perimeter}")`,
        tests: `
def test_valid():
    rect = Rectangle(5.0, 3.0)
    return rect.area == 15.0 and rect.perimeter == 16.0
__test("валидный прямоугольник", test_valid, True)
def test_invalid():
    try:
        Rectangle(-1.0, 3.0)
        return False
    except ValueError:
        return True
__test("невалидные размеры", test_invalid, True)`,
        solution: `from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float
    
    def __post_init__(self):
        if self.width <= 0 or self.height <= 0:
            raise ValueError("Размеры должны быть положительными")
    
    @property
    def area(self) -> float:
        return self.width * self.height
    
    @property
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)`,
      },
    ],
  },

  {
    id: "py13",
    language: "python",
    title: "Модули, ввод/вывод и сериализация",
    subtitle: "import, input(), файлы, JSON, CSV, collections, itertools, functools — работа с данными и пакетами",
    minutes: 90,
    blocks: [
      {
        kind: "text",
        md: `## Модули и пакеты

**Модуль** — это Python-файл с кодом. **Пакет** — директория с модулями и файлом \`__init__.py\`.

**Способы импорта:**

\`\`\`python
# 1. Импорт всего модуля
import math
print(math.pi)

# 2. Импорт конкретных имён
from os import path, getcwd
print(path.exists("/tmp"))

# 3. Импорт с псевдонимом
import numpy as np
arr = np.array([1, 2, 3])

# 4. Импорт из пакета
from collections import Counter, defaultdict

# 5. Относительный импорт (в пакетах)
from . import utils
from .. import config
\`\`\`

**Стандартная библиотека** содержит сотни модулей:
- \`os\`, \`sys\` — работа с ОС
- \`pathlib\` — работа с путями (современная альтернатива os.path)
- \`json\`, \`csv\` — сериализация данных
- \`datetime\`, \`time\` — работа с датой и временем
- \`random\` — генерация случайных чисел
- \`math\`, \`cmath\` — математические функции
- \`re\` — регулярные выражения
- \`collections\` — расширенные контейнеры
- \`itertools\` — итераторы и комбинации
- \`functools\` — функциональные утилиты`,
      },
      {
        kind: "code",
        title: "Примеры импорта",
        code: `import math
print(f"π = {math.pi:.4f}")
print(f"√16 = {math.sqrt(16)}")
print(f"sin(90°) = {math.sin(math.radians(90))}")

from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f"Сегодня: {now.strftime('%Y-%m-%d')}")
print(f"Завтра: {tomorrow.strftime('%Y-%m-%d')}")

from collections import Counter, defaultdict
words = ["кот", "пёс", "кот", "кот", "пёс", "кот"]
counter = Counter(words)
print(f"Счётчик: {counter}")
print(f"Топ-2: {counter.most_common(2)}")

# defaultdict с фабрикой
dd = defaultdict(list)
dd["фрукты"].append("яблоко")
dd["фрукты"].append("банан")
print(dd["фрукты"])  # ['яблоко', 'банан']`,
      },
      {
        kind: "text",
        md: `## Создание собственных модулей

Создайте файл \`mymodule.py\`:

\`\`\`python
# mymodule.py
def greet(name):
    return f"Привет, {name}!"

PI = 3.14159

class Calculator:
    def add(self, a, b):
        return a + b
\`\`\`

Используйте в другом файле:

\`\`\`python
# main.py
from mymodule import greet, PI, Calculator

print(greet("Ада"))
print(f"π ≈ {PI}")

calc = Calculator()
print(calc.add(2, 3))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Ввод и вывод (I/O)

**Ввод с клавиатуры:**

\`\`\`python
name = input("Введите ваше имя: ")
age = int(input("Введите возраст: "))
print(f"Привет, {name}! Вам {age} лет.")
\`\`\`

**Вывод:**

\`\`\`python
print("Обычный вывод")
print("С переносом", end="\\n")
print("Без переноса", end=" ")
print("Продолжение")

# Вывод в файл
with open("output.txt", "w") as f:
    print("Текст в файл", file=f)

# Форматированный вывод
name = "Ада"
age = 36
print(f"Имя: {name}, возраст: {age}")
print("Имя: {}, возраст: {}".format(name, age))
print("Имя: %s, возраст: %d" % (name, age))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Работа с файлами

**Режимы открытия файлов:**
- \`"r"\` — чтение (по умолчанию)
- \`"w"\` — запись (перезаписывает файл)
- \`"a"\` — добавление в конец
- \`"x"\` — создание (ошибка, если файл существует)
- \`"b"\` — бинарный режим
- \`"t"\` — текстовый режим (по умолчанию)
- \`"+"\` — чтение и запись

**Методы файловых объектов:**
- \`read()\` — прочитать весь файл
- \`readline()\` — прочитать одну строку
- \`readlines()\` — прочитать все строки в список
- \`write(text)\` — записать текст
- \`writelines(lines)\` — записать список строк
- \`close()\` — закрыть файл (автоматически с \`with\`)`,
      },
      {
        kind: "code",
        title: "Примеры работы с файлами",
        code: `# Запись в файл
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Первая строка\\n")
    f.write("Вторая строка\\n")
    f.writelines(["Третья строка\\n", "Четвёртая строка\\n"])

# Чтение всего файла
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# Построчное чтение
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())

# Чтение в список
with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"Строк: {len(lines)}")

# Добавление в конец
with open("example.txt", "a", encoding="utf-8") as f:
    f.write("Пятая строка\\n")`,
      },
      {
        kind: "text",
        md: `## Бинарные файлы

Для работы с бинарными файлами используйте режим \`"b"\`:

\`\`\`python
# Запись бинарных данных
with open("data.bin", "wb") as f:
    f.write(b"\\x00\\x01\\x02\\x03")

# Чтение бинарных данных
with open("data.bin", "rb") as f:
    data = f.read()
    print(data)  # b'\\x00\\x01\\x02\\x03'
\`\`\`

**Полезные модули для бинарных данных:**
- \`struct\` — упаковка/распаковка бинарных данных
- \`io.BytesIO\` — работа с байтами как с файлом
- \`pickle\` — сериализация Python-объектов (небезопасно!)`,
      },
      {
        kind: "text",
        md: `## JSON (JavaScript Object Notation)

JSON — стандартный формат обмена данными. Поддерживает:
- Объекты (словари)
- Массивы (списки)
- Строки, числа, булевы значения, null

**Функции модуля json:**
- \`json.dumps(obj)\` — объект → строка
- \`json.loads(str)\` — строка → объект
- \`json.dump(obj, file)\` — запись в файл
- \`json.load(file)\` — чтение из файла

**Параметры dumps/dump:**
- \`indent\` — отступы для читаемости
- \`ensure_ascii\` — экранировать не-ASCII (по умолчанию True)
- \`sort_keys\` — сортировать ключи
- \`default\` — функция для нестандартных типов`,
      },
      {
        kind: "code",
        title: "JSON с параметрами",
        code: `import json

data = {
    "name": "Ада",
    "age": 36,
    "languages": ["Python", "JavaScript"],
    "active": True
}

# Красивый вывод
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# Сортировка ключей
sorted_json = json.dumps(data, sort_keys=True, indent=2)
print(sorted_json)

# Обработка нестандартных типов
from datetime import datetime

def custom_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

data_with_date = {"name": "Ада", "created": datetime.now()}
json_str = json.dumps(
    data_with_date,
    ensure_ascii=False,
    default=custom_serializer,
    indent=2
)
print(json_str)

# Чтение JSON
parsed = json.loads(json_str)
print(parsed["name"], parsed["languages"])`,
      },
      {
        kind: "text",
        md: `## CSV (Comma-Separated Values)

CSV — простой формат для табличных данных. Каждая строка — запись, поля разделены запятыми (или другим разделителем).

**Классы модуля csv:**
- \`csv.reader\` — чтение CSV в списки
- \`csv.writer\` — запись списков в CSV
- \`csv.DictReader\` — чтение в словари (первая строка — заголовки)
- \`csv.DictWriter\` — запись словарей

**Параметры:**
- \`delimiter\` — разделитель (по умолчанию ',')
- \`quotechar\` — символ кавычек (по умолчанию '"')
- \`quoting\` — режим кавычек`,
      },
      {
        kind: "code",
        title: "CSV с DictReader и DictWriter",
        code: `import csv
from io import StringIO

# Чтение CSV в словари
csv_data = """name,age,city
Ада,36,Москва
Гвидо,67,Амстердам
Линус,54,Хельсинки"""

reader = csv.DictReader(StringIO(csv_data))
for row in reader:
    print(f"{row['name']}: {row['age']} лет, {row['city']}")

# Запись словарей в CSV
data = [
    {"name": "Ада", "age": 36, "city": "Москва"},
    {"name": "Гвидо", "age": 67, "city": "Амстердам"},
]

output = StringIO()
writer = csv.DictWriter(output, fieldnames=["name", "age", "city"])
writer.writeheader()
writer.writerows(data)
print(output.getvalue())`,
      },
      {
        kind: "text",
        md: `## Дополнительные полезные модули

**pathlib** — современная работа с путями:

\`\`\`python
from pathlib import Path

path = Path("data/file.txt")
print(path.exists())
print(path.suffix)  # .txt
print(path.stem)    # file
print(path.parent)  # data

# Обход директории
for file in Path(".").glob("*.py"):
    print(file.name)
\`\`\`

**os и sys** — системные функции:

\`\`\`python
import os
import sys

print(os.getcwd())  # текущая директория
print(os.listdir("."))  # список файлов
print(sys.argv)  # аргументы командной строки
print(sys.version)  # версия Python
\`\`\``,
      },
      {
        kind: "code",
        title: "pathlib в действии",
        code: `from pathlib import Path

# Создание пути
path = Path("data/subdir/file.txt")
print(f"Путь: {path}")
print(f"Родитель: {path.parent}")
print(f"Имя файла: {path.name}")
print(f"Расширение: {path.suffix}")

# Проверка существования
print(f"Существует: {path.exists()}")

# Обход директории
print("\\nPython файлы:")
for file in Path(".").glob("*.py"):
    print(f"  {file.name}")

# Создание директорий
Path("temp/subdir").mkdir(parents=True, exist_ok=True)

# Чтение/запись
Path("temp/test.txt").write_text("Привет!", encoding="utf-8")
content = Path("temp/test.txt").read_text(encoding="utf-8")
print(f"\\nСодержимое: {content}")`,
      },
      {
        kind: "text",
        md: `## Сериализация: pickle и alternatives

**pickle** — сериализация Python-объектов:

\`\`\`python
import pickle

data = {"name": "Ада", "numbers": [1, 2, 3]}

# Сериализация
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

# Десериализация
with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)
\`\`\`

**⚠️ Внимание:** pickle небезопасен для ненадёжных данных! Используйте JSON для обмена данными.

**Альтернативы:**
- **JSON** — текстовый, безопасный, универсальный
- **YAML** — читаемый, для конфигов
- **TOML** — современный формат для конфигов
- **MessagePack** — бинарный, компактный`,
      },
      {
        kind: "tip",
        title: "Когда что использовать",
        md: `- **JSON** — обмен данными, API, конфиги (универсальный выбор)
- **CSV** — табличные данные, экспорт в Excel
- **Pickle** — только для внутренних Python-данных (небезопасно!)
- **YAML/TOML** — конфигурационные файлы
- **SQLite** — лёгкая база данных (встроена в Python)`,
      },
      {
        kind: "text",
        md: `## Модуль collections: расширенные контейнеры

\`collections\` предоставляет специализированные контейнеры:

**Counter** — подсчёт элементов:
\`\`\`python
from collections import Counter

words = ["apple", "banana", "apple", "orange", "banana", "apple"]
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]
print(counter['apple'])  # 3
\`\`\`

**defaultdict** — словарь с значением по умолчанию:
\`\`\`python
from collections import defaultdict

# Группировка данных
groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)

# Подсчёт
counts = defaultdict(int)
for word in words:
    counts[word] += 1
\`\`\`

**deque** — двусторонняя очередь (быстрее list для операций с начала/конца):
\`\`\`python
from collections import deque

queue = deque([1, 2, 3])
queue.append(4)        # в конец
queue.appendleft(0)    # в начало
queue.pop()            # с конца
queue.popleft()        # с начала
\`\`\`

**namedtuple** — именованный кортеж:
\`\`\`python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # 10 20
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль itertools: итераторы и комбинации

\`itertools\` предоставляет эффективные итераторы:

**Бесконечные итераторы:**
\`\`\`python
import itertools

# Счётчик
for i in itertools.count(10, 2):  # 10, 12, 14, ...
    if i > 20:
        break
    print(i)

# Повторение
for item in itertools.repeat("hello", 3):
    print(item)  # hello, hello, hello
\`\`\`

**Комбинаторные итераторы:**
\`\`\`python
# Декартово произведение
for pair in itertools.product([1, 2], ['a', 'b']):
    print(pair)  # (1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')

# Перестановки
for perm in itertools.permutations([1, 2, 3]):
    print(perm)  # (1,2,3), (1,3,2), (2,1,3), ...

# Комбинации
for combo in itertools.combinations([1, 2, 3, 4], 2):
    print(combo)  # (1,2), (1,3), (1,4), (2,3), (2,4), (3,4)
\`\`\`

**Итераторы для обработки:**
\`\`\`python
# Цепочка итераторов
for item in itertools.chain([1, 2], [3, 4], [5]):
    print(item)  # 1, 2, 3, 4, 5

# Группировка
data = [('a', 1), ('b', 2), ('a', 3)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))  # a [(a,1), (a,3)], b [(b,2)]
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль functools: функциональные утилиты

\`functools\` предоставляет инструменты для функционального программирования:

**reduce** — свёртка последовательности:
\`\`\`python
from functools import reduce

# Сумма
total = reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])
print(total)  # 15

# Произведение
product = reduce(lambda x, y: x * y, [1, 2, 3, 4, 5])
print(product)  # 120
\`\`\`

**partial** — частичное применение функции:
\`\`\`python
from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)

print(square(5))  # 25
print(cube(2))    # 8
\`\`\`

**lru_cache** — мемоизация (кэширование результатов):
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=100)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Первый вызов вычисляет, последующие — из кэша
print(fibonacci(100))  # Мгновенно после первого вызова
\`\`\`

**wraps** — сохранение метаданных декоратора:
\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Сохраняет имя и docstring
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль datetime: работа с датой и временем

**Основные классы:**
- \`date\` — дата (год, месяц, день)
- \`time\` — время (часы, минуты, секунды)
- \`datetime\` — дата и время
- \`timedelta\` — разница между датами

**Создание объектов:**
\`\`\`python
from datetime import datetime, date, time, timedelta

# Текущая дата и время
now = datetime.now()
today = date.today()

# Создание конкретной даты
birthday = datetime(1990, 5, 15, 14, 30)
date_only = date(2024, 1, 1)
time_only = time(14, 30, 0)

# Разница между датами
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
diff = datetime(2024, 12, 31) - today
print(f"Дней до конца года: {diff.days}")
\`\`\`

**Форматирование:**
\`\`\`python
now = datetime.now()

# datetime → строка
print(now.strftime("%Y-%m-%d %H:%M:%S"))  # 2024-01-15 14:30:00
print(now.strftime("%d.%m.%Y"))           # 15.01.2024

# строка → datetime
date_str = "2024-01-15 14:30:00"
dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
\`\`\`

**Часовые зоны:**
\`\`\`python
from datetime import datetime, timezone, timedelta

# UTC
utc_now = datetime.now(timezone.utc)

# Часовая зона Москва (UTC+3)
moscow_tz = timezone(timedelta(hours=3))
moscow_now = datetime.now(moscow_tz)

# Конвертация
utc_dt = datetime.now(timezone.utc)
moscow_dt = utc_dt.astimezone(moscow_tz)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль random: генерация случайных чисел

**Основные функции:**
\`\`\`python
import random

# Случайное целое число
random.randint(1, 10)      # от 1 до 10 включительно
random.randrange(0, 10, 2) # чётные числа от 0 до 8

# Случайное число с плавающей точкой
random.random()            # от 0.0 до 1.0
random.uniform(1.5, 5.5)   # от 1.5 до 5.5

# Случайный элемент из последовательности
random.choice([1, 2, 3, 4, 5])
random.choice("hello")

# Перемешивание списка
items = [1, 2, 3, 4, 5]
random.shuffle(items)      # перемешивает на месте

# Выборка без повторений
random.sample([1, 2, 3, 4, 5], 3)  # 3 случайных элемента
\`\`\`

**Генерация с фиксированным seed (для воспроизводимости):**
\`\`\`python
random.seed(42)  # Фиксируем seed
print(random.randint(1, 100))  # Всегда одно и то же число
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль math: математические функции

**Основные функции:**
\`\`\`python
import math

# Округление
math.ceil(3.2)    # 4 (вверх)
math.floor(3.8)   # 3 (вниз)
math.trunc(3.8)   # 3 (отбросить дробную часть)
round(3.5)        # 4 (банковское округление)

# Степени и корни
math.sqrt(16)     # 4.0 (квадратный корень)
math.pow(2, 3)    # 8.0 (2 в степени 3)
math.exp(1)       # e^1 ≈ 2.718

# Тригонометрия
math.sin(math.pi / 2)    # 1.0
math.cos(0)              # 1.0
math.degrees(math.pi)    # 180.0 (радианы → градусы)
math.radians(180)        # 3.14159... (градусы → радианы)

# Логарифмы
math.log(10)             # натуральный логарифм
math.log10(100)          # 2.0 (десятичный)
math.log2(8)             # 3.0 (двоичный)

# Константы
math.pi                  # 3.14159...
math.e                   # 2.71828...
math.inf                 # бесконечность
math.nan                 # Not a Number
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль re: регулярные выражения

**Основные функции:**
\`\`\`python
import re

text = "Цена: 100 руб, скидка 20%"

# Поиск первого совпадения
match = re.search(r'\\d+', text)
print(match.group())  # "100"

# Поиск всех совпадений
matches = re.findall(r'\\d+', text)
print(matches)  # ['100', '20']

# Замена
result = re.sub(r'\\d+', 'NUM', text)
print(result)  # "Цена: NUM руб, скидка NUM%"

# Проверка соответствия
pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
if re.match(pattern, "user@example.com"):
    print("Валидный email")
\`\`\`

**Метасимволы:**
- \`\\d\` — цифра, \`\\D\` — не цифра
- \`\\w\` — буква/цифра/\`, \`\\W\` — не \\w
- \`\\s\` — пробел, \`\\S\` — не пробел
- \`.\` — любой символ (кроме \\n)
- \`^\` — начало строки, \`$\` — конец строки

**Квантификаторы:**
- \`*\` — 0 или более
- \`+\` — 1 или более
- \`?\` — 0 или 1
- \`{n}\` — ровно n раз
- \`{n,m}\` — от n до m раз

**Группы:**
\`\`\`python
# Извлечение групп
match = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', "Дата: 2024-01-15")
year, month, day = match.groups()
print(year, month, day)  # 2024 01 15

# Именованные группы
match = re.search(r'(?P<year>\\d{4})-(?P<month>\\d{2})', "2024-01")
print(match.group('year'))   # 2024
print(match.group('month'))  # 01
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль logging: логирование

**Уровни логирования:**
- \`DEBUG\` — отладочная информация
- \`INFO\` — общая информация
- \`WARNING\` — предупреждения
- \`ERROR\` — ошибки
- \`CRITICAL\` — критические ошибки

**Базовое использование:**
\`\`\`python
import logging

# Базовая настройка
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

logging.debug("Отладочное сообщение")
logging.info("Информационное сообщение")
logging.warning("Предупреждение")
logging.error("Ошибка")
logging.critical("Критическая ошибка")
\`\`\`

**Продвинутая настройка:**
\`\`\`python
import logging

# Создание логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Обработчик для файла
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
))

# Обработчик для консоли
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

logger.debug("Это попадёт только в файл")
logger.info("Это попадёт и в файл, и в консоль")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль argparse: аргументы командной строки

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="Моя программа")
parser.add_argument("filename", help="Имя файла")
parser.add_argument("-v", "--verbose", action="store_true", help="Подробный вывод")
parser.add_argument("-n", "--count", type=int, default=1, help="Количество")

args = parser.parse_args()

print(f"Файл: {args.filename}")
print(f"Подробный режим: {args.verbose}")
print(f"Количество: {args.count}")
\`\`\`

**Запуск:**
\`\`\`bash
python script.py myfile.txt -v -n 5
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль subprocess: запуск внешних процессов

\`\`\`python
import subprocess

# Запуск команды
result = subprocess.run(['ls', '-l'], capture_output=True, text=True)
print(result.stdout)

# С проверкой кода возврата
result = subprocess.run(['python', 'script.py'], check=True)

# С перенаправлением ввода/вывода
result = subprocess.run(
    ['grep', 'pattern'],
    input='some text\\nmore text',
    capture_output=True,
    text=True
)
\`\`\`

**Рабочая директория и окружение:**
\`\`\`python
result = subprocess.run(
    ['python', 'script.py'],
    cwd='/path/to/dir',
    env={'MY_VAR': 'value'},
    capture_output=True,
    text=True
)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль sqlite3: базы данных

\`\`\`python
import sqlite3

# Подключение к базе данных
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Создание таблицы
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
    )
''')

# Вставка данных
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", 
               ("Ада", "ada@example.com"))

# Выборка данных
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()
for user in users:
    print(user)

# Сохранение изменений
conn.commit()

# Закрытие соединения
conn.close()
\`\`\`

**Контекстный менеджер:**
\`\`\`python
with sqlite3.connect('database.db') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
# Автоматический commit или rollback
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль hashlib: хеширование

\`\`\`python
import hashlib

# MD5 (небезопасен для паролей!)
md5_hash = hashlib.md5(b"password").hexdigest()
print(md5_hash)

# SHA-256 (рекомендуется)
sha256_hash = hashlib.sha256(b"password").hexdigest()
print(sha256_hash)

# Хеширование с солью
salt = b"random_salt"
password = b"password"
hashed = hashlib.sha256(salt + password).hexdigest()

# Хеширование файла
with open("file.txt", "rb") as f:
    file_hash = hashlib.sha256(f.read()).hexdigest()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль zipfile: работа с архивами

\`\`\`python
import zipfile

# Создание архива
with zipfile.ZipFile('archive.zip', 'w') as zipf:
    zipf.write('file1.txt')
    zipf.write('file2.txt')

# Извлечение архива
with zipfile.ZipFile('archive.zip', 'r') as zipf:
    zipf.extractall('extracted_folder')
    
    # Извлечение одного файла
    zipf.extract('file1.txt', 'output_dir')

# Чтение содержимого архива
with zipfile.ZipFile('archive.zip', 'r') as zipf:
    print(zipf.namelist())  # Список файлов
    with zipf.open('file1.txt') as f:
        content = f.read()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль tempfile: временные файлы

\`\`\`python
import tempfile

# Временный файл
with tempfile.NamedTemporaryFile(mode='w+', delete=False) as f:
    f.write("Временные данные")
    temp_filename = f.name

print(f"Временный файл: {temp_filename}")

# Временная директория
with tempfile.TemporaryDirectory() as temp_dir:
    print(f"Временная директория: {temp_dir}")
    # Файлы в этой директории будут удалены автоматически

# Временный файл в памяти
with tempfile.SpooledTemporaryFile(max_size=1000) as f:
    f.write(b"Данные")
    f.seek(0)
    print(f.read())
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модуль os.path: работа с путями (старый стиль)

\`\`\`python
import os

# Базовые операции
path = "/path/to/file.txt"
os.path.basename(path)      # "file.txt"
os.path.dirname(path)       # "/path/to"
os.path.splitext(path)      # ("/path/to/file", ".txt")
os.path.exists(path)        # True/False
os.path.isfile(path)        # True если файл
os.path.isdir(path)         # True если директория

# Объединение путей
full_path = os.path.join("/path", "to", "file.txt")

# Абсолютный путь
abs_path = os.path.abspath("relative/path")

# Размер файла
size = os.path.getsize("file.txt")
\`\`\`

**Современная альтернатива — pathlib:**
\`\`\`python
from pathlib import Path

path = Path("/path/to/file.txt")
path.name                 # "file.txt"
path.parent               # Path("/path/to")
path.suffix               # ".txt"
path.exists()             # True/False
path.is_file()            # True если файл
path.is_dir()             # True если директория
\`\`\``,
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
      {
        q: "Что делает параметр indent в json.dumps()?",
        options: [
          "Сортирует ключи",
          "Добавляет отступы для читаемости",
          "Экранирует символы",
          "Устанавливает кодировку",
        ],
        answer: 1,
        explain: "indent добавляет отступы в JSON для удобочитаемости. indent=2 означает 2 пробела на уровень вложенности.",
      },
      {
        q: "Какой класс csv модуля читает CSV в словари?",
        options: ["csv.reader", "csv.writer", "csv.DictReader", "csv.DictWriter"],
        answer: 2,
        explain: "csv.DictReader читает CSV и создаёт словари, где ключи — заголовки из первой строки.",
      },
      {
        q: "Что делает pathlib.Path.glob('*.py')?",
        options: [
          "Создаёт файлы .py",
          "Возвращает все Python файлы в директории",
          "Удаляет файлы .py",
          "Переименовывает файлы",
        ],
        answer: 1,
        explain: "glob() возвращает итератор всех файлов, соответствующих паттерну. '*.py' означает все файлы с расширением .py.",
      },
      {
        q: "Что делает Counter в модуле collections?",
        options: [
          "Создаёт счётчик для циклов",
          "Подсчитывает количество элементов в последовательности",
          "Считает сумму чисел",
          "Подсчитывает количество символов в строке",
        ],
        answer: 1,
        explain: "Counter подсчитывает количество вхождений каждого элемента в последовательности и возвращает словарь с подсчётами.",
      },
      {
        q: "Что делает itertools.product()?",
        options: [
          "Умножает числа",
          "Создаёт декартово произведение последовательностей",
          "Перемешивает элементы",
          "Сортирует элементы",
        ],
        answer: 1,
        explain: "product() создаёт все возможные комбинации элементов из нескольких последовательностей (декартово произведение).",
      },
      {
        q: "Что делает @lru_cache в functools?",
        options: [
          "Ограничивает размер функции",
          "Кэширует результаты вызовов функции",
          "Ограничивает количество аргументов",
          "Создаёт локальную переменную",
        ],
        answer: 1,
        explain: "@lru_cache кэширует результаты вызовов функции, чтобы при повторных вызовах с теми же аргументами возвращать кэшированный результат.",
      },
      {
        q: "Что делает datetime.timedelta?",
        options: [
          "Создаёт дату",
          "Представляет разницу между двумя датами",
          "Форматирует дату",
          "Парсит строку в дату",
        ],
        answer: 1,
        explain: "timedelta представляет разницу между двумя датами или временными метками и позволяет выполнять арифметические операции с датами.",
      },
      {
        q: "Что делает re.match()?",
        options: [
          "Ищет все совпадения в строке",
          "Проверяет соответствие шаблону в начале строки",
          "Заменяет все совпадения",
          "Разделяет строку по шаблону",
        ],
        answer: 1,
        explain: "match() проверяет, соответствует ли начало строки заданному шаблону. Для поиска всех совпадений используйте findall().",
      },
      {
        q: "Что делает hashlib.sha256()?",
        options: [
          "Шифрует данные",
          "Создаёт хеш SHA-256 из данных",
          "Дешифрует данные",
          "Создаёт случайные числа",
        ],
        answer: 1,
        explain: "sha256() создаёт хеш SHA-256 из данных. Хеш — это односторонняя функция, которую нельзя обратить для получения исходных данных.",
      },
      {
        q: "Что делает logging.basicConfig()?",
        options: [
          "Создаёт новый логгер",
          "Настраивает базовую конфигурацию логирования",
          "Удаляет все логи",
          "Экспортирует логи в файл",
        ],
        answer: 1,
        explain: "basicConfig() настраивает базовую конфигурацию системы логирования, включая уровень логирования, формат и обработчики.",
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
      {
        id: "py13t3",
        title: "Объединение JSON файлов",
        md: `Реализуйте \`merge_json(json1, json2)\` — объединяет два JSON-объекта. При конфликте ключей значения из \`json2\` имеют приоритет. Вложенные словари объединяются рекурсивно.`,
        starter: `import json

def merge_json(json1, json2):
    # ваш код
    pass

json1 = '{"a": 1, "b": {"x": 1}}'
json2 = '{"b": {"y": 2}, "c": 3}'
print(merge_json(json1, json2))`,
        tests: `
import json
__test("простое объединение", lambda: json.loads(merge_json('{"a": 1}', '{"b": 2}')), {"a": 1, "b": 2})
__test("приоритет json2", lambda: json.loads(merge_json('{"a": 1}', '{"a": 2}')), {"a": 2})
__test("рекурсивное объединение", lambda: json.loads(merge_json('{"a": {"x": 1}}', '{"a": {"y": 2}}')), {"a": {"x": 1, "y": 2}})`,
        solution: `import json

def merge_json(json1, json2):
    def merge(d1, d2):
        result = d1.copy()
        for key, value in d2.items():
            if key in result and isinstance(result[key], dict) and isinstance(value, dict):
                result[key] = merge(result[key], value)
            else:
                result[key] = value
        return result
    
    d1 = json.loads(json1)
    d2 = json.loads(json2)
    merged = merge(d1, d2)
    return json.dumps(merged, ensure_ascii=False)`,
      },
      {
        id: "py13t4",
        title: "Статистика CSV",
        md: `Реализуйте \`csv_stats(csv_text, column)\` — принимает CSV-строку и имя числовой колонки, возвращает словарь со статистикой: \`{"min": ..., "max": ..., "avg": ..., "sum": ...}\`.`,
        starter: `import csv
from io import StringIO

def csv_stats(csv_text, column):
    # ваш код
    pass

csv_data = """name,age,score
Alice,25,85
Bob,30,90
Charlie,35,95"""
print(csv_stats(csv_data, "age"))`,
        tests: `
import csv
from io import StringIO

csv_data = """name,age,score
Alice,25,85
Bob,30,90
Charlie,35,95"""

stats = csv_stats(csv_data, "age")
__test("min", lambda: stats["min"], 25)
__test("max", lambda: stats["max"], 35)
__test("avg", lambda: stats["avg"], 30.0)
__test("sum", lambda: stats["sum"], 90)`,
        solution: `import csv
from io import StringIO

def csv_stats(csv_text, column):
    reader = csv.DictReader(StringIO(csv_text))
    values = [float(row[column]) for row in reader]
    return {
        "min": min(values),
        "max": max(values),
        "avg": sum(values) / len(values),
        "sum": sum(values)
    }`,
      },
      {
        id: "py13t5",
        title: "Группировка с defaultdict",
        md: `Реализуйте \`group_by_category(items)\` — принимает список словарей с ключом \`category\`, возвращает словарь, где ключи — категории, значения — списки элементов этой категории. Используйте \`defaultdict\`.`,
        starter: `from collections import defaultdict

def group_by_category(items):
    # ваш код
    pass

items = [
    {"name": "Яблоко", "category": "Фрукты"},
    {"name": "Морковь", "category": "Овощи"},
    {"name": "Банан", "category": "Фрукты"},
]
print(group_by_category(items))`,
        tests: `
from collections import defaultdict

items = [
    {"name": "Яблоко", "category": "Фрукты"},
    {"name": "Морковь", "category": "Овощи"},
    {"name": "Банан", "category": "Фрукты"},
]

result = group_by_category(items)
__test("группировка по Фрукты", lambda: len(result["Фрукты"]), 2)
__test("группировка по Овощи", lambda: len(result["Овощи"]), 1)
__test("правильные элементы", lambda: [item["name"] for item in result["Фрукты"]], ["Яблоко", "Банан"])`,
        solution: `from collections import defaultdict

def group_by_category(items):
    groups = defaultdict(list)
    for item in items:
        groups[item["category"]].append(item)
    return dict(groups)`,
      },
      {
        id: "py13t6",
        title: "Фибоначчи с мемоизацией",
        md: `Реализуйте \`fibonacci(n)\` с использованием \`@lru_cache\` для мемоизации. Функция должна быстро вычислять числа Фибоначчи даже для больших n.`,
        starter: `from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    # ваш код
    pass

print(fibonacci(10))
print(fibonacci(50))`,
        tests: `
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

__test("fibonacci(0)", lambda: fibonacci(0), 0)
__test("fibonacci(1)", lambda: fibonacci(1), 1)
__test("fibonacci(10)", lambda: fibonacci(10), 55)
__test("fibonacci(20)", lambda: fibonacci(20), 6765)`,
        solution: `from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
      },
      {
        id: "py13t7",
        title: "Валидация email с regex",
        md: `Реализуйте \`validate_email(email)\` — проверяет, является ли строка валидным email адресом, используя регулярные выражения. Возвращает \`True\` или \`False\`.`,
        starter: `import re

def validate_email(email):
    # ваш код
    pass

print(validate_email("user@example.com"))
print(validate_email("invalid-email"))`,
        tests: `
import re

def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))

__test("валидный email", lambda: validate_email("user@example.com"), True)
__test("валидный с поддоменом", lambda: validate_email("user@sub.example.com"), True)
__test("невалидный без @", lambda: validate_email("invalid-email"), False)
__test("невалидный без домена", lambda: validate_email("user@"), False)`,
        solution: `import re

def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))`,
      },
      {
        id: "py13t8",
        title: "Комбинации с itertools",
        md: `Реализуйте \`all_pairs(items)\` — возвращает все возможные пары элементов из списка, используя \`itertools.combinations\`.`,
        starter: `import itertools

def all_pairs(items):
    # ваш код
    pass

print(list(all_pairs([1, 2, 3, 4])))`,
        tests: `
import itertools

def all_pairs(items):
    return list(itertools.combinations(items, 2))

result = list(all_pairs([1, 2, 3]))
__test("количество пар", lambda: len(result), 3)
__test("содержит (1, 2)", lambda: (1, 2) in result, True)
__test("содержит (1, 3)", lambda: (1, 3) in result, True)
__test("содержит (2, 3)", lambda: (2, 3) in result, True)`,
        solution: `import itertools

def all_pairs(items):
    return list(itertools.combinations(items, 2))`,
      },
      {
        id: "py13t9",
        title: "Разница между датами",
        md: `Реализуйте \`days_between(date1, date2)\` — принимает две даты в формате "YYYY-MM-DD", возвращает количество дней между ними. Используйте модуль \`datetime\`.`,
        starter: `from datetime import datetime

def days_between(date1, date2):
    # ваш код
    pass

print(days_between("2024-01-01", "2024-01-31"))`,
        tests: `
from datetime import datetime

def days_between(date1, date2):
    d1 = datetime.strptime(date1, "%Y-%m-%d")
    d2 = datetime.strptime(date2, "%Y-%m-%d")
    return abs((d2 - d1).days)

__test("30 дней", lambda: days_between("2024-01-01", "2024-01-31"), 30)
__test("365 дней", lambda: days_between("2024-01-01", "2025-01-01"), 366)
__test("обратный порядок", lambda: days_between("2024-12-31", "2024-01-01"), 365)`,
        solution: `from datetime import datetime

def days_between(date1, date2):
    d1 = datetime.strptime(date1, "%Y-%m-%d")
    d2 = datetime.strptime(date2, "%Y-%m-%d")
    return abs((d2 - d1).days)`,
      },
      {
        id: "py13t10",
        title: "Хеширование пароля",
        md: `Реализуйте \`hash_password(password, salt)\` — хеширует пароль с солью, используя SHA-256. Возвращает хеш в виде hex-строки.`,
        starter: `import hashlib

def hash_password(password, salt):
    # ваш код
    pass

print(hash_password("password", "salt123"))`,
        tests: `
import hashlib

def hash_password(password, salt):
    return hashlib.sha256((salt + password).encode()).hexdigest()

result = hash_password("password", "salt123")
__test("возвращает строку", lambda: isinstance(result, str), True)
__test("длина 64 символа", lambda: len(result), 64)
__test("детерминированный", lambda: hash_password("password", "salt123") == hash_password("password", "salt123"), True)`,
        solution: `import hashlib

def hash_password(password, salt):
    return hashlib.sha256((salt + password).encode()).hexdigest()`,
      },
    ],
  },


  {
    id: "py15",
    language: "python",
    title: "Регулярные выражения",
    subtitle: "re-модуль, паттерны, группы, поиск и замена — полное руководство",
    minutes: 60,
    blocks: [
      {
        kind: "text",
        md: `## Что такое регулярные выражения?

Регулярные выражения (regex) — это мощный инструмент для поиска и обработки текста с помощью шаблонов. Они используются для:
- Валидации данных (email, телефон, пароль)
- Поиска и извлечения информации из текста
- Замены текста по шаблону
- Парсинга логов и данных

**Модуль re** предоставляет функции для работы с регулярными выражениями в Python.`,
      },
      {
        kind: "text",
        md: `## Основные функции модуля re

**re.search(pattern, string)** — ищет первое совпадение:
\`\`\`python
import re

text = "Цена: 100 руб"
match = re.search(r'\\d+', text)
if match:
    print(match.group())  # "100"
\`\`\`

**re.match(pattern, string)** — проверяет соответствие в начале строки:
\`\`\`python
if re.match(r'^\\d+', "123abc"):
    print("Начинается с числа")
\`\`\`

**re.findall(pattern, string)** — находит все совпадения:
\`\`\`python
numbers = re.findall(r'\\d+', "Цена: 100, скидка: 20")
print(numbers)  # ['100', '20']
\`\`\`

**re.sub(pattern, replacement, string)** — заменяет все совпадения:
\`\`\`python
result = re.sub(r'\\d+', 'NUM', "Цена: 100, скидка: 20")
print(result)  # "Цена: NUM, скидка: NUM"
\`\`\`

**re.split(pattern, string)** — разделяет строку по шаблону:
\`\`\`python
parts = re.split(r'[,;\\s]+', "apple, banana; orange grape")
print(parts)  # ['apple', 'banana', 'orange', 'grape']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Символьные классы

**Специальные классы:**
- \`\\d\` — цифра [0-9]
- \`\\D\` — не цифра [^0-9]
- \`\\w\` — слово [a-zA-Z0-9_]
- \`\\W\` — не слово
- \`\\s\` — пробел [ \\t\\n\\r\\f\\v]
- \`\\S\` — не пробел
- \`.\` — любой символ (кроме \\n)

**Пользовательские классы:**
- \`[abc]\` — a, b или c
- \`[a-z]\` — диапазон a-z
- \`[^abc]\` — всё кроме a, b, c
- \`[a-zA-Z]\` — буквы`,
      },
      {
        kind: "code",
        title: "Примеры символьных классов",
        code: `import re

text = "Цена: 100 руб, скидка 20%"

# Цифры
print(re.findall(r'\\d+', text))  # ['100', '20']

# Не цифры
print(re.findall(r'\\D+', text))  # ['Цена: ', ' руб, скидка ', '%']

# Слова
print(re.findall(r'\\w+', text))  # ['Цена', '100', 'руб', 'скидка', '20']

# Любой символ
print(re.findall(r'.+', text))  # Вся строка

# Пользовательский класс
print(re.findall(r'[а-я]+', "Цена: 100 руб"))  # ['цена', 'руб']

# Диапазон
print(re.findall(r'[0-5]+', "123456789"))  # ['12345']`,
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
        md: `## Квантификаторы

Квантификаторы определяют, сколько раз должен встречаться предыдущий элемент:

- \`*\` — 0 или более раз
- \`+\` — 1 или более раз
- \`?\` — 0 или 1 раз
- \`{n}\` — ровно n раз
- \`{n,}\` — n или более раз
- \`{n,m}\` — от n до m раз

**Жадные и ленивые квантификаторы:**
- Жадные: \`*\`, \`+\`, \`?\`, \`{n,m}\` — захватывают максимум
- Ленивые: \`*?\`, \`+?\`, \`??\`, \`{n,m}?\` — захватывают минимум`,
      },
      {
        kind: "code",
        title: "Примеры квантификаторов",
        code: `import re

text = "aaabbbccc"

# Жадный квантификатор
print(re.search(r'a.+c', text).group())  # "aaabbbccc"

# Ленивый квантификатор
print(re.search(r'a.+?c', text).group())  # "aaabbbccc"

# Точное количество
print(re.findall(r'a{3}', "aaabbb"))  # ['aaa']

# Диапазон
print(re.findall(r'a{2,4}', "aaaaaa"))  # ['aaaa', 'aa']

# Один или более
print(re.findall(r'a+', "baaab"))  # ['aaa']

# Ноль или один
print(re.findall(r'colou?r', "color colour"))  # ['color', 'colour']`,
      },
      {
        kind: "text",
        md: `## Группы

Круглые скобки \`(...)\` создают группы для:
1. Группировки элементов
2. Извлечения подстрок
3. Обратных ссылок

**Типы групп:**
- \`(...)\` — захватывающая группа
- \`(?:...)\` — незахватывающая группа (только группировка)
- \`(?P<name>...)\` — именованная группа
- \`(?P=name)\` — ссылка на именованную группу`,
      },
      {
        kind: "code",
        title: "Работа с группами",
        code: `import re

text = "2026-02-14"

# Захватывающие группы
match = re.match(r'(\\d{4})-(\\d{2})-(\\d{2})', text)
print(match.groups())  # ('2026', '02', '14')
print(match.group(1))  # '2026'
print(match.group(2))  # '02'

# Именованные группы
match = re.match(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', text)
print(match.group('year'))   # '2026'
print(match.group('month'))  # '02'
print(match.group('day'))    # '14'

# Незахватывающая группа
print(re.findall(r'(?:\\d{4})-(\\d{2})', "2026-02 2025-03"))  # ['02', '03']

# Обратная ссылка
text = "test test"
print(re.search(r'(\\w+) \\1', text).group())  # "test test"`,
      },
      {
        kind: "text",
        md: `## Якоря (anchors)

Якоря не захватывают символы, а указывают позицию:

- \`^\` — начало строки
- \`$\` — конец строки
- \`\\b\` — граница слова
- \`\\B\` — не граница слова
- \`\\A\` — начало текста
- \`\\Z\` — конец текста`,
      },
      {
        kind: "code",
        title: "Примеры якорей",
        code: `import re

# Начало и конец строки
print(re.search(r'^\\d+', "123abc"))  # Match: "123"
print(re.search(r'\\d+$', "abc123"))  # Match: "123"

# Граница слова
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']
print(re.findall(r'\\Bcat', "cat cats catfish"))    # ['cat', 'cat']

# Начало и конец текста
text = "first line\\nsecond line"
print(re.search(r'^first', text, re.MULTILINE))  # Match
print(re.search(r'line$', text, re.MULTILINE))   # Match`,
      },
      {
        kind: "text",
        md: `## Lookahead и Lookbehind

**Lookahead (опережающая проверка):**
- \`(?=...)\` — позитивный lookahead (должно следовать)
- \`(?!=...)\` — негативный lookahead (не должно следовать)

**Lookbehind (ретроспективная проверка):**
- \`(?<=...)\` — позитивный lookbehind (должно предшествовать)
- \`(?<!...)\` — негативный lookbehind (не должно предшествовать)`,
      },
      {
        kind: "code",
        title: "Lookahead и Lookbehind",
        code: `import re

text = "100 руб, 200 руб, 300 eur"

# Позитивный lookahead: число перед "руб"
print(re.findall(r'\\d+(?= руб)', text))  # ['100', '200']

# Негативный lookahead: число не перед "eur"
print(re.findall(r'\\d+(?! eur)', text))  # ['100', '200']

# Позитивный lookbehind: число после "цена: "
text2 = "цена: 100, скидка: 20"
print(re.findall(r'(?<=цена: )\\d+', text2))  # ['100']

# Негативный lookbehind: число не после "скидка: "
print(re.findall(r'(?<!скидка: )\\d+', text2))  # ['100']`,
      },
      {
        kind: "text",
        md: `## Флаги (flags)

Флаги изменяют поведение регулярного выражения:

- \`re.IGNORECASE\` или \`re.I\` — игнорировать регистр
- \`re.MULTILINE\` или \`re.M\` — многострочный режим
- \`re.DOTALL\` или \`re.S\` — точка включает \\n
- \`re.VERBOSE\` или \`re.X\` — разрешает комментарии и пробелы
- \`re.UNICODE\` или \`re.U\` — Unicode-совместимость`,
      },
      {
        kind: "code",
        title: "Примеры флагов",
        code: `import re

text = "Hello\\nWorld"

# Игнорировать регистр
print(re.search(r'hello', text, re.IGNORECASE))  # Match

# Многострочный режим
print(re.search(r'^World', text, re.MULTILINE))  # Match

# Точка включает \\n
print(re.search(r'Hello.World', text, re.DOTALL))  # Match

# Verbose режим с комментариями
pattern = r"""
    \\d{4}  # год
    -       # дефис
    \\d{2}  # месяц
    -       # дефис
    \\d{2}  # день
"""
print(re.search(pattern, "2026-02-14", re.VERBOSE))  # Match`,
      },
      {
        kind: "text",
        md: `## Экранирование специальных символов

Если вам нужно найти literal символы, которые имеют специальное значение в regex, их нужно экранировать обратным слэшем:

**Специальные символы:** \`.\`, \`^\`, \`$\`, \`*\`, \`+\`, \`?\`, \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, \`|\`, \`\\\`

\`\`\`python
import re

# Поиск точки
print(re.search(r'\\.', 'a.b'))  # Match: '.'

# Поиск скобок
print(re.search(r'\\(test\\)', '(test)'))  # Match: '(test)'

# Поиск обратного слэша
print(re.search(r'\\\\', 'path\\\\to\\\\file'))  # Match: '\\'
\`\`\`

**Функция re.escape()** автоматически экранирует все специальные символы:
\`\`\`python
pattern = re.escape('file.txt')  # 'file\\.txt'
print(re.search(pattern, 'file.txt'))  # Match
\`\`\``,
      },
      {
        kind: "text",
        md: `## Альтернатива (OR)

Оператор \`|\` позволяет выбрать одну из нескольких альтернатив:

\`\`\`python
import re

# Поиск одного из слов
print(re.findall(r'cat|dog', "I have a cat and a dog"))  # ['cat', 'dog']

# Альтернатива в группе
print(re.findall(r'colou?r|colour', "color and colour"))  # ['color', 'colour']

# Альтернатива с группами
print(re.findall(r'(?:Mon|Tue|Wed)', "Mon Tue Thu"))  # ['Mon', 'Tue']
\`\`\`

**Приоритет:** Альтернатива имеет низкий приоритет, поэтому используйте скобки для группировки:
\`\`\`python
# Неправильно: ищет 'gray' или 'grey'
print(re.findall(r'gray|gray', "gray grey"))  # ['gray', 'grey']

# Правильно с группами
print(re.findall(r'gr(a|e)y', "gray grey"))  # ['gray', 'grey']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Unicode и Unicode свойства

С флагом \`re.UNICODE\` (или \`re.U\`) классы \`\\w\`, \`\\W\`, \`\\d\`, \`\\D\`, \`\\s\`, \`\\S\` работают с Unicode символами:

\`\`\`python
import re

# Без UNICODE (только ASCII)
print(re.findall(r'\\w+', 'Привет мир'))  # []

# С UNICODE (Unicode)
print(re.findall(r'\\w+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
\`\`\`

**Unicode свойства** (с флагом \`re.UNICODE\`):
- \`\\p{L}\` — любая буква
- \`\\p{N}\` — любая цифра
- \`\\p{P}\` — знак пунктуации
- \`\\p{S}\` — символ
- \`\\p{Z}\` — пробел

\`\`\`python
# Любая буква (включая Unicode)
print(re.findall(r'\\p{L}+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']

# Любая цифра (включая Unicode)
print(re.findall(r'\\p{N}+', 'Цена: １２３', re.UNICODE))  # ['１２３']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Комментарии в регулярных выражениях

С флагом \`re.VERBOSE\` (или \`re.X\`) можно добавлять комментарии и форматировать регулярные выражения:

\`\`\`python
import re

pattern = r"""
    ^                   # Начало строки
    (?P<year>\\d{4})    # Год (4 цифры)
    -                   # Разделитель
    (?P<month>\\d{2})   # Месяц (2 цифры)
    -                   # Разделитель
    (?P<day>\\d{2})     # День (2 цифры)
    $                   # Конец строки
"""

match = re.match(pattern, "2026-02-14", re.VERBOSE)
print(match.group('year'))  # '2026'
\`\`\`

**Важно:** В режиме VERBOSE пробелы игнорируются, поэтому для пробела используйте \`\\s\` или \`[ ]\`.`,
      },
      {
        kind: "text",
        md: `## Условные выражения

Условные выражения позволяют применять разные паттерны в зависимости от условия:

**Синтаксис:** \`(?(\d)yes_pattern|no_pattern)\`

\`\`\`python
import re

# Если есть цифра, ищем 4 цифры, иначе 2 цифры
pattern = r'(?(\\d)\\d{4}|\\d{2})'
print(re.findall(pattern, "1234"))  # ['1234']
print(re.findall(pattern, "12"))    # ['12']
\`\`\`

**Условие по группе:** \`(?(\(group\))yes_pattern|no_pattern)\`

\`\`\`python
# Если есть открывающая скобка, ищем закрывающую
pattern = r'(\\()?\\d+(?(1)\\))'
print(re.findall(pattern, "(123)"))  # ['(123)']
print(re.findall(pattern, "123"))    # ['123']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Рекурсивные регулярные выражения

Python поддерживает рекурсивные регулярные выражения с помощью \`(?R)\` или \`(?P>name)\`:

\`\`\`python
import re

# Поиск сбалансированных скобок
pattern = r'\\((?:[^()]*|(?R))*\\)'
text = "text (nested (brackets) here) end"
print(re.findall(pattern, text))  # ['(nested (brackets) here)']
\`\`\`

**Важно:** Рекурсивные регулярные выражения могут быть медленными и сложными для понимания. Используйте их осторожно.`,
      },
      {
        kind: "text",
        md: `## Границы слов и не-слов

**\\b** — граница слова (между \\w и \\W или началом/концом строки):
\`\`\`python
import re

# Поиск слова "cat" как целое слово
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']

# Поиск слов, начинающихся с "cat"
print(re.findall(r'\\bcat', "cat cats catfish"))  # ['cat', 'cat', 'cat']
\`\`\`

**\\B** — не граница слова:
\`\`\`python
# Поиск "cat" не как целое слово
print(re.findall(r'\\Bcat', "cat cats catfish"))  # ['cat', 'cat']
\`\`\`

**Важно:** \\b и \\B зависят от определения "слова" (\\w), которое включает буквы, цифры и подчёркивание.`,
      },
      {
        kind: "text",
        md: `## Начало и конец строки vs текста

**^ и $** — начало и конец строки (с флагом MULTILINE) или текста (без флага):

\`\`\`python
import re

text = "first line\\nsecond line\\nthird line"

# Без MULTILINE: ^ и $ для всего текста
print(re.findall(r'^\\w+', text))  # ['first']
print(re.findall(r'\\w+$', text))  # ['line']

# С MULTILINE: ^ и $ для каждой строки
print(re.findall(r'^\\w+', text, re.MULTILINE))  # ['first', 'second', 'third']
print(re.findall(r'\\w+$', text, re.MULTILINE))  # ['line', 'line', 'line']
\`\`\`

**\\A и \\Z** — всегда начало и конец текста (игнорируют MULTILINE):
\`\`\`python
print(re.findall(r'\\A\\w+', text, re.MULTILINE))  # ['first']
print(re.findall(r'\\w+\\Z', text, re.MULTILINE))  # ['line']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модификаторы режима

Модификаторы изменяют поведение регулярного выражения:

**inline модификаторы** (внутри паттерна):
- \`(?i)\` — игнорировать регистр
- \`(?m)\` — многострочный режим
- \`(?s)\` — точка включает \\n
- \`(?x)\` — разрешает комментарии

\`\`\`python
import re

# Inline модификаторы
print(re.findall(r'(?i)hello', "HELLO hello"))  # ['HELLO', 'hello']
print(re.findall(r'(?m)^\\w+', "line1\\nline2"))  # ['line1', 'line2']
\`\`\`

**Локальные модификаторы** (для части паттерна):
\`\`\`python
# Только первая часть без учёта регистра
print(re.findall(r'(?i:hello) world', "HELLO world"))  # ['HELLO world']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности

Регулярные выражения могут быть медленными. Советы по оптимизации:

1. **Используйте специфичные классы** вместо \`.\`:
   - \`\\d\` вместо \`.\` для цифр
   - \`\\w\` вместо \`.\` для слов

2. **Избегайте вложенных квантификаторов**:
   - Плохо: \`(a+)+\`
   - Хорошо: \`a+\`

3. **Используйте якоря** для ограничения поиска:
   - \`^pattern\` — поиск только в начале
   - \`pattern$\` — поиск только в конце

4. **Компилируйте паттерны** для повторного использования:
\`\`\`python
pattern = re.compile(r'\\d+')
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\`

5. **Используйте незахватывающие группы** \`(?:...)\` когда не нужно извлекать группу.`,
      },
      {
        kind: "text",
        md: `## Отладка регулярных выражений

**Инструменты для отладки:**

1. **re.DEBUG** — показывает внутреннее представление:
\`\`\`python
import re
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов

3. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

1. **Забытое экранирование:**
   - Плохо: \`file.txt\` (точка — любой символ)
   - Хорошо: \`file\\.txt\`

2. **Жадные квантификаторы:**
   - Плохо: \`<.+>\` (захватит всё до последнего >)
   - Хорошо: \`<.+?>\` (ленивый квантификатор)

3. **Вложенные квантификаторы:**
   - Плохо: \`(a+)+\` (катастрофический возврат)
   - Хорошо: \`a+\`

4. **Неправильное использование ^ и $:**
   - Забудьте про MULTILINE, если нужно искать в каждой строке

5. **Захватывающие группы вместо незахватывающих:**
   - Используйте \`(?:...)\` когда не нужно извлекать группу`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в других языках

Синтаксис регулярных выражений похож в разных языках, но есть различия:

**JavaScript:**
\`\`\`javascript
const pattern = /\\d+/g;
const result = "text".match(pattern);
\`\`\`

**Perl:**
\`\`\`perl
if ($text =~ /\\d+/) {
    print "Found number";
}
\`\`\`

**Java:**
\`\`\`java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher(text);
\`\`\`

**Go:**
\`\`\`go
re := regexp.MustCompile("\\d+")
matches := re.FindAllString(text, -1)
\`\`\`

**Основные различия:**
- Поддержка Unicode
- Lookbehind (не во всех языках)
- Рекурсивные регулярные выражения
- Модификаторы режима`,
      },
      {
        kind: "text",
        md: `## Символьные классы POSIX

POSIX символьные классы (с флагом \`re.UNICODE\`):

- \`[:alpha:]\` — буквы
- \`[:digit:]\` — цифры
- \`[:alnum:]\` — буквы и цифры
- \`[:space:]\` — пробельные символы
- \`[:punct:]\` — пунктуация
- \`[:upper:]\` — заглавные буквы
- \`[:lower:]\` — строчные буквы

\`\`\`python
import re

# Использование POSIX классов
print(re.findall(r'[[:alpha:]]+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
print(re.findall(r'[[:digit:]]+', 'Цена: 123'))  # ['123']
\`\`\`

**Важно:** POSIX классы работают только внутри квадратных скобок \`[[:alpha:]]\`.`,
      },
      {
        kind: "text",
        md: `## Расширенные возможности групп

**Именованные группы с повторениями:**
\`\`\`python
import re

# Повторяющаяся именованная группа
pattern = r'(?P<word>\\w+)\\s+(?P=word)'
text = "test test"
match = re.search(pattern, text)
print(match.group('word'))  # 'test'
\`\`\`

**Атомарные группы** (не возвращаются назад):
\`\`\`python
# Атомарная группа (не поддерживается в Python напрямую)
# Используйте атомарные группы для оптимизации
\`\`\`

**Обратные ссылки в замене:**
\`\`\`python
# Использование \\1, \\2 в замене
text = "2026-02-14"
result = re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3.\\2.\\1', text)
print(result)  # '14.02.2026'

# Именованные группы в замене
result = re.sub(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', 
                r'\\g<day>.\\g<month>.\\g<year>', text)
print(result)  # '14.02.2026'
\`\`\``,
      },
      {
        kind: "text",
        md: `## Продвинутые lookaround

**Вложенные lookaround:**
\`\`\`python
import re

# Lookahead внутри lookahead
pattern = r'(?=(\\d+)(?=\\D|$))'
text = "123 456 789"
print(re.findall(pattern, text))  # ['123', '456', '789']
\`\`\`

**Lookbehind с переменной длиной** (Python 3.7+):
\`\`\`python
# Lookbehind с переменной длиной
pattern = r'(?<=\\b\\w{3,5}\\b)\\s+\\w+'
text = "cat dog bird"
print(re.findall(pattern, text))  # [' dog', ' bird']
\`\`\`

**Комбинация lookahead и lookbehind:**
\`\`\`python
# Слово между цифрами
pattern = r'(?<=\\d)\\s+\\w+\\s+(?=\\d)'
text = "123 cat 456"
print(re.findall(pattern, text))  # [' cat ']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности (детально)

**1. Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b

# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

**2. Используйте атомарные группы** (через possessive квантификаторы):
\`\`\`python
# Python не поддерживает атомарные группы напрямую
# Используйте possessive квантификаторы (Python 3.11+):
# a++ вместо a+ (не возвращается назад)
\`\`\`

**3. Оптимизация якорями:**
\`\`\`python
# Плохо: поиск во всём тексте
pattern = r'\\d+'

# Хорошо: ограничение поиска
pattern = r'^\\d+$'  # только если вся строка - число
\`\`\`

**4. Компиляция паттернов:**
\`\`\`python
import re

# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность

**Важные моменты безопасности:**

1. **ReDoS (Regular Expression Denial of Service):**
   - Злоумышленники могут использовать сложные регулярные выражения для DoS-атак
   - Всегда тестируйте регулярные выражения на длинных строках
   - Избегайте вложенных квантификаторов

2. **Валидация пользовательского ввода:**
   - Всегда используйте якоря \`^\` и \`$\` для валидации
   - Проверяйте всю строку, а не часть

3. **Экранирование пользовательских данных:**
\`\`\`python
import re

# Экранирование пользовательского ввода
user_input = "file.txt"
safe_pattern = re.escape(user_input)  # 'file\\.txt'
\`\`\`

4. **Ограничение длины ввода:**
\`\`\`python
# Ограничение длины входных данных
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в реальных проектах

**Типичные задачи:**

1. **Валидация форм:**
\`\`\`python
def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))

def validate_phone(phone):
    pattern = r'^\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
    return bool(re.match(pattern, phone))
\`\`\`

2. **Парсинг логов:**
\`\`\`python
log_pattern = r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)'
for match in re.finditer(log_pattern, log_text):
    timestamp, level, message = match.groups()
\`\`\`

3. **Извлечение данных:**
\`\`\`python
# Извлечение всех URL из текста
url_pattern = r'https?://[^\\s<>\"]+|www\\.[^\\s<>\"]+'
urls = re.findall(url_pattern, text)
\`\`\`

4. **Очистка данных:**
\`\`\`python
# Удаление лишних пробелов
clean_text = re.sub(r'\\s+', ' ', text).strip()

# Удаление HTML тегов
clean_html = re.sub(r'<[^>]+>', '', html_text)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование

**Тестирование регулярных выражений:**

1. **Unit тесты:**
\`\`\`python
import re
import unittest

class TestRegex(unittest.TestCase):
    def test_email_validation(self):
        pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
        self.assertTrue(re.match(pattern, "test@example.com"))
        self.assertFalse(re.match(pattern, "invalid-email"))
    
    def test_phone_validation(self):
        pattern = r'^\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
        self.assertTrue(re.match(pattern, "+79991234567"))
        self.assertFalse(re.match(pattern, "invalid"))

if __name__ == '__main__':
    unittest.main()
\`\`\`

2. **Тестовые данные:**
\`\`\`python
# Тестовые данные для email
valid_emails = [
    "test@example.com",
    "user.name@domain.co.uk",
    "user+tag@example.org"
]

invalid_emails = [
    "invalid-email",
    "@example.com",
    "user@",
    "user@.com"
]
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация

**Документирование регулярных выражений:**

1. **Комментарии в коде:**
\`\`\`python
# Паттерн для валидации email
# ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
# ^ - начало строки
# [\\w\\.-]+ - один или более символов (буквы, цифры, точка, дефис)
# @ - символ @
# [\\w\\.-]+ - доменное имя
# \\. - точка
# \\w+ - доменная зона
# $ - конец строки
\`\`\`

2. **Docstring:**
\`\`\`python
def validate_email(email: str) -> bool:
    """
    Валидирует email адрес.
    
    Args:
        email: Email адрес для проверки
    
    Returns:
        bool: True если email валидный, иначе False
    
    Pattern:
        ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
        - ^ - начало строки
        - [\\w\\.-]+ - локальная часть
        - @ - символ @
        - [\\w\\.-]+ - доменное имя
        - \\. - точка
        - \\w+ - доменная зона
        - $ - конец строки
    """
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (детально)

**Профилирование регулярных выражений:**

\`\`\`python
import re
import time

# Профилирование паттерна
def profile_pattern(pattern, text, iterations=1000):
    compiled = re.compile(pattern)
    
    start = time.time()
    for _ in range(iterations):
        compiled.findall(text)
    end = time.time()
    
    print(f"Pattern: {pattern}")
    print(f"Time: {end - start:.4f} сек")
    print(f"Iterations: {iterations}")
    print(f"Average: {(end - start) / iterations * 1000:.4f} мс")
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b

# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+

# Плохо: .+ для слов
# Хорошо: \\w+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (детально)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
    print(f"Start: {match.start()}")
    print(f"End: {match.end()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (детально)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a+)+ 
# Хорошо: a+

# Плохо: (a|a)+
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Якоря (anchors)

Якоря не захватывают символы, а указывают позицию:

- \`^\` — начало строки
- \`$\` — конец строки
- \`\\b\` — граница слова
- \`\\B\` — не граница слова
- \`\\A\` — начало текста
- \`\\Z\` — конец текста`,
      },
      {
        kind: "code",
        title: "Примеры якорей",
        code: `import re

# Начало и конец строки
print(re.search(r'^\\d+', "123abc"))  # Match: "123"
print(re.search(r'\\d+$', "abc123"))  # Match: "123"

# Граница слова
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']
print(re.findall(r'\\Bcat', "cat cats catfish"))    # ['cat', 'cat']

# Начало и конец текста
text = "first line\\nsecond line"
print(re.search(r'^first', text, re.MULTILINE))  # Match
print(re.search(r'line$', text, re.MULTILINE))   # Match`,
      },
      {
        kind: "text",
        md: `## Lookahead и Lookbehind

**Lookahead (опережающая проверка):**
- \`(?=...)\` — позитивный lookahead (должно следовать)
- \`(?!=...)\` — негативный lookahead (не должно следовать)

**Lookbehind (ретроспективная проверка):**
- \`(?<=...)\` — позитивный lookbehind (должно предшествовать)
- \`(?<!...)\` — негативный lookbehind (не должно предшествовать)`,
      },
      {
        kind: "code",
        title: "Lookahead и Lookbehind",
        code: `import re

text = "100 руб, 200 руб, 300 eur"

# Позитивный lookahead: число перед "руб"
print(re.findall(r'\\d+(?= руб)', text))  # ['100', '200']

# Негативный lookahead: число не перед "eur"
print(re.findall(r'\\d+(?! eur)', text))  # ['100', '200']

# Позитивный lookbehind: число после "цена: "
text2 = "цена: 100, скидка: 20"
print(re.findall(r'(?<=цена: )\\d+', text2))  # ['100']

# Негативный lookbehind: число не после "скидка: "
print(re.findall(r'(?<!скидка: )\\d+', text2))  # ['100']`,
      },
      {
        kind: "text",
        md: `## Флаги (flags)

Флаги изменяют поведение регулярного выражения:

- \`re.IGNORECASE\` или \`re.I\` — игнорировать регистр
- \`re.MULTILINE\` или \`re.M\` — многострочный режим
- \`re.DOTALL\` или \`re.S\` — точка включает \\n
- \`re.VERBOSE\` или \`re.X\` — разрешает комментарии и пробелы
- \`re.UNICODE\` или \`re.U\` — Unicode-совместимость`,
      },
      {
        kind: "code",
        title: "Примеры флагов",
        code: `import re

text = "Hello\\nWorld"

# Игнорировать регистр
print(re.search(r'hello', text, re.IGNORECASE))  # Match

# Многострочный режим
print(re.search(r'^World', text, re.MULTILINE))  # Match

# Точка включает \\n
print(re.search(r'Hello.World', text, re.DOTALL))  # Match

# Verbose режим с комментариями
pattern = r"""
    \\d{4}  # год
    -       # дефис
    \\d{2}  # месяц
    -       # дефис
    \\d{2}  # день
"""
print(re.search(pattern, "2026-02-14", re.VERBOSE))  # Match`,
      },
      {
        kind: "text",
        md: `## Экранирование специальных символов

Если вам нужно найти literal символы, которые имеют специальное значение в regex, их нужно экранировать обратным слэшем:

**Специальные символы:** \`.\`, \`^\`, \`$\`, \`*\`, \`+\`, \`?\`, \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, \`|\`, \`\\\`

\`\`\`python
import re

# Поиск точки
print(re.search(r'\\.', 'a.b'))  # Match: '.'

# Поиск скобок
print(re.search(r'\\(test\\)', '(test)'))  # Match: '(test)'

# Поиск обратного слэша
print(re.search(r'\\\\', 'path\\\\to\\\\file'))  # Match: '\\'
\`\`\`

**Функция re.escape()** автоматически экранирует все специальные символы:
\`\`\`python
pattern = re.escape('file.txt')  # 'file\\.txt'
print(re.search(pattern, 'file.txt'))  # Match
\`\`\``,
      },
      {
        kind: "text",
        md: `## Альтернатива (OR)

Оператор \`|\` позволяет выбрать одну из нескольких альтернатив:

\`\`\`python
import re

# Поиск одного из слов
print(re.findall(r'cat|dog', "I have a cat and a dog"))  # ['cat', 'dog']

# Альтернатива в группе
print(re.findall(r'colou?r|colour', "color and colour"))  # ['color', 'colour']

# Альтернатива с группами
print(re.findall(r'(?:Mon|Tue|Wed)', "Mon Tue Thu"))  # ['Mon', 'Tue']
\`\`\`

**Приоритет:** Альтернатива имеет низкий приоритет, поэтому используйте скобки для группировки:
\`\`\`python
# Неправильно: ищет 'gray' или 'grey'
print(re.findall(r'gray|gray', "gray grey"))  # ['gray', 'grey']

# Правильно с группами
print(re.findall(r'gr(a|e)y', "gray grey"))  # ['gray', 'grey']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Unicode и Unicode свойства

С флагом \`re.UNICODE\` (или \`re.U\`) классы \`\\w\`, \`\\W\`, \`\\d\`, \`\\D\`, \`\\s\`, \`\\S\` работают с Unicode символами:

\`\`\`python
import re

# Без UNICODE (только ASCII)
print(re.findall(r'\\w+', 'Привет мир'))  # []

# С UNICODE (Unicode)
print(re.findall(r'\\w+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
\`\`\`

**Unicode свойства** (с флагом \`re.UNICODE\`):
- \`\\p{L}\` — любая буква
- \`\\p{N}\` — любая цифра
- \`\\p{P}\` — знак пунктуации
- \`\\p{S}\` — символ
- \`\\p{Z}\` — пробел

\`\`\`python
# Любая буква (включая Unicode)
print(re.findall(r'\\p{L}+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']

# Любая цифра (включая Unicode)
print(re.findall(r'\\p{N}+', 'Цена: １２３', re.UNICODE))  # ['１２３']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Комментарии в регулярных выражениях

С флагом \`re.VERBOSE\` (или \`re.X\`) можно добавлять комментарии и форматировать регулярные выражения:

\`\`\`python
import re

pattern = r"""
    ^                   # Начало строки
    (?P<year>\\d{4})    # Год (4 цифры)
    -                   # Разделитель
    (?P<month>\\d{2})   # Месяц (2 цифры)
    -                   # Разделитель
    (?P<day>\\d{2})     # День (2 цифры)
    $                   # Конец строки
"""

match = re.match(pattern, "2026-02-14", re.VERBOSE)
print(match.group('year'))  # '2026'
\`\`\`

**Важно:** В режиме VERBOSE пробелы игнорируются, поэтому для пробела используйте \`\\s\` или \`[ ]\`.`,
      },
      {
        kind: "text",
        md: `## Условные выражения

Условные выражения позволяют применять разные паттерны в зависимости от условия:

**Синтаксис:** \`(?(\d)yes_pattern|no_pattern)\`

\`\`\`python
import re

# Если есть цифра, ищем 4 цифры, иначе 2 цифры
pattern = r'(?(\\d)\\d{4}|\\d{2})'
print(re.findall(pattern, "1234"))  # ['1234']
print(re.findall(pattern, "12"))    # ['12']
\`\`\`

**Условие по группе:** \`(?(\(group\))yes_pattern|no_pattern)\`

\`\`\`python
# Если есть открывающая скобка, ищем закрывающую
pattern = r'(\\()?\\d+(?(1)\\))'
print(re.findall(pattern, "(123)"))  # ['(123)']
print(re.findall(pattern, "123"))    # ['123']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Рекурсивные регулярные выражения

Python поддерживает рекурсивные регулярные выражения с помощью \`(?R)\` или \`(?P>name)\`:

\`\`\`python
import re

# Поиск сбалансированных скобок
pattern = r'\\((?:[^()]*|(?R))*\\)'
text = "text (nested (brackets) here) end"
print(re.findall(pattern, text))  # ['(nested (brackets) here)']
\`\`\`

**Важно:** Рекурсивные регулярные выражения могут быть медленными и сложными для понимания. Используйте их осторожно.`,
      },
      {
        kind: "text",
        md: `## Границы слов и не-слов

**\\b** — граница слова (между \\w и \\W или началом/концом строки):
\`\`\`python
import re

# Поиск слова "cat" как целое слово
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']

# Поиск слов, начинающихся с "cat"
print(re.findall(r'\\bcat', "cat cats catfish"))  # ['cat', 'cat', 'cat']
\`\`\`

**\\B** — не граница слова:
\`\`\`python
# Поиск "cat" не как целое слово
print(re.findall(r'\\Bcat', "cat cats catfish"))  # ['cat', 'cat']
\`\`\`

**Важно:** \\b и \\B зависят от определения "слова" (\\w), которое включает буквы, цифры и подчёркивание.`,
      },
      {
        kind: "text",
        md: `## Начало и конец строки vs текста

**^ и $** — начало и конец строки (с флагом MULTILINE) или текста (без флага):

\`\`\`python
import re

text = "first line\\nsecond line\\nthird line"

# Без MULTILINE: ^ и $ для всего текста
print(re.findall(r'^\\w+', text))  # ['first']
print(re.findall(r'\\w+$', text))  # ['line']

# С MULTILINE: ^ и $ для каждой строки
print(re.findall(r'^\\w+', text, re.MULTILINE))  # ['first', 'second', 'third']
print(re.findall(r'\\w+$', text, re.MULTILINE))  # ['line', 'line', 'line']
\`\`\`

**\\A и \\Z** — всегда начало и конец текста (игнорируют MULTILINE):
\`\`\`python
print(re.findall(r'\\A\\w+', text, re.MULTILINE))  # ['first']
print(re.findall(r'\\w+\\Z', text, re.MULTILINE))  # ['line']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модификаторы режима

Модификаторы изменяют поведение регулярного выражения:

**inline модификаторы** (внутри паттерна):
- \`(?i)\` — игнорировать регистр
- \`(?m)\` — многострочный режим
- \`(?s)\` — точка включает \\n
- \`(?x)\` — разрешает комментарии

\`\`\`python
import re

# Inline модификаторы
print(re.findall(r'(?i)hello', "HELLO hello"))  # ['HELLO', 'hello']
print(re.findall(r'(?m)^\\w+', "line1\\nline2"))  # ['line1', 'line2']
\`\`\`

**Локальные модификаторы** (для части паттерна):
\`\`\`python
# Только первая часть без учёта регистра
print(re.findall(r'(?i:hello) world', "HELLO world"))  # ['HELLO world']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности

Регулярные выражения могут быть медленными. Советы по оптимизации:

1. **Используйте специфичные классы** вместо \`.\`:
   - \`\\d\` вместо \`.\` для цифр
   - \`\\w\` вместо \`.\` для слов

2. **Избегайте вложенных квантификаторов**:
   - Плохо: \`(a+)+\`
   - Хорошо: \`a+\`

3. **Используйте якоря** для ограничения поиска:
   - \`^pattern\` — поиск только в начале
   - \`pattern$\` — поиск только в конце

4. **Компилируйте паттерны** для повторного использования:
\`\`\`python
pattern = re.compile(r'\\d+')
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\`

5. **Используйте незахватывающие группы** \`(?:...)\` когда не нужно извлекать группу.`,
      },
      {
        kind: "text",
        md: `## Отладка регулярных выражений

**Инструменты для отладки:**

1. **re.DEBUG** — показывает внутреннее представление:
\`\`\`python
import re
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов

3. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

1. **Забытое экранирование:**
   - Плохо: \`file.txt\` (точка — любой символ)
   - Хорошо: \`file\\.txt\`

2. **Жадные квантификаторы:**
   - Плохо: \`<.+>\` (захватит всё до последнего >)
   - Хорошо: \`<.+?>\` (ленивый квантификатор)

3. **Вложенные квантификаторы:**
   - Плохо: \`(a+)+\` (катастрофический возврат)
   - Хорошо: \`a+\`

4. **Неправильное использование ^ и $:**
   - Забудьте про MULTILINE, если нужно искать в каждой строке

5. **Захватывающие группы вместо незахватывающих:**
   - Используйте \`(?:...)\` когда не нужно извлекать группу`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в других языках

Синтаксис регулярных выражений похож в разных языках, но есть различия:

**JavaScript:**
\`\`\`javascript
const pattern = /\\d+/g;
const result = "text".match(pattern);
\`\`\`

**Perl:**
\`\`\`perl
if ($text =~ /\\d+/) {
    print "Found number";
}
\`\`\`

**Java:**
\`\`\`java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher(text);
\`\`\`

**Go:**
\`\`\`go
re := regexp.MustCompile("\\d+")
matches := re.FindAllString(text, -1)
\`\`\`

**Основные различия:**
- Поддержка Unicode
- Lookbehind (не во всех языках)
- Рекурсивные регулярные выражения
- Модификаторы режима`,
      },
      {
        kind: "text",
        md: `## Символьные классы POSIX

POSIX символьные классы (с флагом \`re.UNICODE\`):

- \`[:alpha:]\` — буквы
- \`[:digit:]\` — цифры
- \`[:alnum:]\` — буквы и цифры
- \`[:space:]\` — пробельные символы
- \`[:punct:]\` — пунктуация
- \`[:upper:]\` — заглавные буквы
- \`[:lower:]\` — строчные буквы

\`\`\`python
import re

# Использование POSIX классов
print(re.findall(r'[[:alpha:]]+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
print(re.findall(r'[[:digit:]]+', 'Цена: 123'))  # ['123']
\`\`\`

**Важно:** POSIX классы работают только внутри квадратных скобок \`[[:alpha:]]\`.`,
      },
      {
        kind: "text",
        md: `## Расширенные возможности групп

**Именованные группы с повторениями:**
\`\`\`python
import re

# Повторяющаяся именованная группа
pattern = r'(?P<word>\\w+)\\s+(?P=word)'
text = "test test"
match = re.search(pattern, text)
print(match.group('word'))  # 'test'
\`\`\`

**Атомарные группы** (не возвращаются назад):
\`\`\`python
# Атомарная группа (не поддерживается в Python напрямую)
# Используйте атомарные группы для оптимизации
\`\`\`

**Обратные ссылки в замене:**
\`\`\`python
# Использование \\1, \\2 в замене
text = "2026-02-14"
result = re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3.\\2.\\1', text)
print(result)  # '14.02.2026'

# Именованные группы в замене
result = re.sub(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', 
                r'\\g<day>.\\g<month>.\\g<year>', text)
print(result)  # '14.02.2026'
\`\`\``,
      },
      {
        kind: "text",
        md: `## Продвинутые lookaround

**Вложенные lookaround:**
\`\`\`python
import re

# Lookahead внутри lookahead
pattern = r'(?=(\\d+)(?=\\D|$))'
text = "123 456 789"
print(re.findall(pattern, text))  # ['123', '456', '789']
\`\`\`

**Lookbehind с переменной длиной** (Python 3.7+):
\`\`\`python
# Lookbehind с переменной длиной
pattern = r'(?<=\\b\\w{3,5}\\b)\\s+\\w+'
text = "cat dog bird"
print(re.findall(pattern, text))  # [' dog', ' bird']
\`\`\`

**Комбинация lookahead и lookbehind:**
\`\`\`python
# Слово между цифрами
pattern = r'(?<=\\d)\\s+\\w+\\s+(?=\\d)'
text = "123 cat 456"
print(re.findall(pattern, text))  # [' cat ']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности (детально)

**1. Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b

# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

**2. Используйте атомарные группы** (через possessive квантификаторы):
\`\`\`python
# Python не поддерживает атомарные группы напрямую
# Используйте possessive квантификаторы (Python 3.11+):
# a++ вместо a+ (не возвращается назад)
\`\`\`

**3. Оптимизация якорями:**
\`\`\`python
# Плохо: поиск во всём тексте
pattern = r'\\d+'

# Хорошо: ограничение поиска
pattern = r'^\\d+$'  # только если вся строка - число
\`\`\`

**4. Компиляция паттернов:**
\`\`\`python
import re

# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность

**Важные моменты безопасности:**

1. **ReDoS (Regular Expression Denial of Service):**
   - Злоумышленники могут использовать сложные регулярные выражения для DoS-атак
   - Всегда тестируйте регулярные выражения на длинных строках
   - Избегайте вложенных квантификаторов

2. **Валидация пользовательского ввода:**
   - Всегда используйте якоря \`^\` и \`$\` для валидации
   - Проверяйте всю строку, а не часть

3. **Экранирование пользовательских данных:**
\`\`\`python
import re

# Экранирование пользовательского ввода
user_input = "file.txt"
safe_pattern = re.escape(user_input)  # 'file\\.txt'
\`\`\`

4. **Ограничение длины ввода:**
\`\`\`python
# Ограничение длины входных данных
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в реальных проектах

**Типичные задачи:**

1. **Валидация форм:**
\`\`\`python
def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))

def validate_phone(phone):
    pattern = r'^\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
    return bool(re.match(pattern, phone))
\`\`\`

2. **Парсинг логов:**
\`\`\`python
log_pattern = r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)'
for match in re.finditer(log_pattern, log_text):
    timestamp, level, message = match.groups()
\`\`\`

3. **Извлечение данных:**
\`\`\`python
# Извлечение всех URL из текста
url_pattern = r'https?://[^\\s<>\"]+|www\\.[^\\s<>\"]+'
urls = re.findall(url_pattern, text)
\`\`\`

4. **Очистка данных:**
\`\`\`python
# Удаление лишних пробелов
clean_text = re.sub(r'\\s+', ' ', text).strip()

# Удаление HTML тегов
clean_html = re.sub(r'<[^>]+>', '', html_text)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование

**Тестирование регулярных выражений:**

1. **Unit тесты:**
\`\`\`python
import re
import unittest

class TestRegex(unittest.TestCase):
    def test_email_validation(self):
        pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
        self.assertTrue(re.match(pattern, "test@example.com"))
        self.assertFalse(re.match(pattern, "invalid-email"))
    
    def test_phone_validation(self):
        pattern = r'^\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
        self.assertTrue(re.match(pattern, "+79991234567"))
        self.assertFalse(re.match(pattern, "invalid"))

if __name__ == '__main__':
    unittest.main()
\`\`\`

2. **Тестовые данные:**
\`\`\`python
# Тестовые данные для email
valid_emails = [
    "test@example.com",
    "user.name@domain.co.uk",
    "user+tag@example.org"
]

invalid_emails = [
    "invalid-email",
    "@example.com",
    "user@",
    "user@.com"
]
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация

**Документирование регулярных выражений:**

1. **Комментарии в коде:**
\`\`\`python
# Паттерн для валидации email
# ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
# ^ - начало строки
# [\\w\\.-]+ - один или более символов (буквы, цифры, точка, дефис)
# @ - символ @
# [\\w\\.-]+ - доменное имя
# \\. - точка
# \\w+ - доменная зона
# $ - конец строки
\`\`\`

2. **Docstring:**
\`\`\`python
def validate_email(email: str) -> bool:
    """
    Валидирует email адрес.
    
    Args:
        email: Email адрес для проверки
    
    Returns:
        bool: True если email валидный, иначе False
    
    Pattern:
        ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
        - ^ - начало строки
        - [\\w\\.-]+ - локальная часть
        - @ - символ @
        - [\\w\\.-]+ - доменное имя
        - \\. - точка
        - \\w+ - доменная зона
        - $ - конец строки
    """
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (детально)

**Профилирование регулярных выражений:**

\`\`\`python
import re
import time

# Профилирование паттерна
def profile_pattern(pattern, text, iterations=1000):
    compiled = re.compile(pattern)
    
    start = time.time()
    for _ in range(iterations):
        compiled.findall(text)
    end = time.time()
    
    print(f"Pattern: {pattern}")
    print(f"Time: {end - start:.4f} сек")
    print(f"Iterations: {iterations}")
    print(f"Average: {(end - start) / iterations * 1000:.4f} мс")
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b

# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+

# Плохо: .+ для слов
# Хорошо: \\w+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (детально)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
    print(f"Start: {match.start()}")
    print(f"End: {match.end()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (детально)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a+)+ 
# Хорошо: a+

# Плохо: (a|a)+
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Якоря (anchors)

Якоря не захватывают символы, а указывают позицию:

- \`^\` — начало строки
- \`$\` — конец строки
- \`\\b\` — граница слова
- \`\\B\` — не граница слова
- \`\\A\` — начало текста
- \`\\Z\` — конец текста`,
      },
      {
        kind: "code",
        title: "Примеры якорей",
        code: `import re

# Начало и конец строки
print(re.search(r'^\\d+', "123abc"))  # Match: "123"
print(re.search(r'\\d+$', "abc123"))  # Match: "123"

# Граница слова
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']
print(re.findall(r'\\Bcat', "cat cats catfish"))    # ['cat', 'cat']

# Начало и конец текста
text = "first line\\nsecond line"
print(re.search(r'^first', text, re.MULTILINE))  # Match
print(re.search(r'line$', text, re.MULTILINE))   # Match`,
      },
      {
        kind: "text",
        md: `## Lookahead и Lookbehind

**Lookahead (опережающая проверка):**
- \`(?=...)\` — позитивный lookahead (должно следовать)
- \`(?!=...)\` — негативный lookahead (не должно следовать)

**Lookbehind (ретроспективная проверка):**
- \`(?<=...)\` — позитивный lookbehind (должно предшествовать)
- \`(?<!...)\` — негативный lookbehind (не должно предшествовать)`,
      },
      {
        kind: "code",
        title: "Lookahead и Lookbehind",
        code: `import re

text = "100 руб, 200 руб, 300 eur"

# Позитивный lookahead: число перед "руб"
print(re.findall(r'\\d+(?= руб)', text))  # ['100', '200']

# Негативный lookahead: число не перед "eur"
print(re.findall(r'\\d+(?! eur)', text))  # ['100', '200']

# Позитивный lookbehind: число после "цена: "
text2 = "цена: 100, скидка: 20"
print(re.findall(r'(?<=цена: )\\d+', text2))  # ['100']

# Негативный lookbehind: число не после "скидка: "
print(re.findall(r'(?<!скидка: )\\d+', text2))  # ['100']`,
      },
      {
        kind: "text",
        md: `## Флаги (flags)

Флаги изменяют поведение регулярного выражения:

- \`re.IGNORECASE\` или \`re.I\` — игнорировать регистр
- \`re.MULTILINE\` или \`re.M\` — многострочный режим
- \`re.DOTALL\` или \`re.S\` — точка включает \\n
- \`re.VERBOSE\` или \`re.X\` — разрешает комментарии и пробелы
- \`re.UNICODE\` или \`re.U\` — Unicode-совместимость`,
      },
      {
        kind: "code",
        title: "Примеры флагов",
        code: `import re

text = "Hello\\nWorld"

# Игнорировать регистр
print(re.search(r'hello', text, re.IGNORECASE))  # Match

# Многострочный режим
print(re.search(r'^World', text, re.MULTILINE))  # Match

# Точка включает \\n
print(re.search(r'Hello.World', text, re.DOTALL))  # Match

# Verbose режим с комментариями
pattern = r"""
    \\d{4}  # год
    -       # дефис
    \\d{2}  # месяц
    -       # дефис
    \\d{2}  # день
"""
print(re.search(pattern, "2026-02-14", re.VERBOSE))  # Match`,
      },
      {
        kind: "text",
        md: `## Экранирование специальных символов

Если вам нужно найти literal символы, которые имеют специальное значение в regex, их нужно экранировать обратным слэшем:

**Специальные символы:** \`.\`, \`^\`, \`$\`, \`*\`, \`+\`, \`?\`, \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, \`|\`, \`\\\`

\`\`\`python
import re

# Поиск точки
print(re.search(r'\\.', 'a.b'))  # Match: '.'

# Поиск скобок
print(re.search(r'\\(test\\)', '(test)'))  # Match: '(test)'

# Поиск обратного слэша
print(re.search(r'\\\\', 'path\\\\to\\\\file'))  # Match: '\\'
\`\`\`

**Функция re.escape()** автоматически экранирует все специальные символы:
\`\`\`python
pattern = re.escape('file.txt')  # 'file\\.txt'
print(re.search(pattern, 'file.txt'))  # Match
\`\`\``,
      },
      {
        kind: "text",
        md: `## Альтернатива (OR)

Оператор \`|\` позволяет выбрать одну из нескольких альтернатив:

\`\`\`python
import re

# Поиск одного из слов
print(re.findall(r'cat|dog', "I have a cat and a dog"))  # ['cat', 'dog']

# Альтернатива в группе
print(re.findall(r'colou?r|colour', "color and colour"))  # ['color', 'colour']

# Альтернатива с группами
print(re.findall(r'(?:Mon|Tue|Wed)', "Mon Tue Thu"))  # ['Mon', 'Tue']
\`\`\`

**Приоритет:** Альтернатива имеет низкий приоритет, поэтому используйте скобки для группировки:
\`\`\`python
# Неправильно: ищет 'gray' или 'grey'
print(re.findall(r'gray|gray', "gray grey"))  # ['gray', 'grey']

# Правильно с группами
print(re.findall(r'gr(a|e)y', "gray grey"))  # ['gray', 'grey']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Unicode и Unicode свойства

С флагом \`re.UNICODE\` (или \`re.U\`) классы \`\\w\`, \`\\W\`, \`\\d\`, \`\\D\`, \`\\s\`, \`\\S\` работают с Unicode символами:

\`\`\`python
import re

# Без UNICODE (только ASCII)
print(re.findall(r'\\w+', 'Привет мир'))  # []

# С UNICODE (Unicode)
print(re.findall(r'\\w+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
\`\`\`

**Unicode свойства** (с флагом \`re.UNICODE\`):
- \`\\p{L}\` — любая буква
- \`\\p{N}\` — любая цифра
- \`\\p{P}\` — знак пунктуации
- \`\\p{S}\` — символ
- \`\\p{Z}\` — пробел

\`\`\`python
# Любая буква (включая Unicode)
print(re.findall(r'\\p{L}+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']

# Любая цифра (включая Unicode)
print(re.findall(r'\\p{N}+', 'Цена: １２３', re.UNICODE))  # ['１２３']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Комментарии в регулярных выражениях

С флагом \`re.VERBOSE\` (или \`re.X\`) можно добавлять комментарии и форматировать регулярные выражения:

\`\`\`python
import re

pattern = r"""
    ^                   # Начало строки
    (?P<year>\\d{4})    # Год (4 цифры)
    -                   # Разделитель
    (?P<month>\\d{2})   # Месяц (2 цифры)
    -                   # Разделитель
    (?P<day>\\d{2})     # День (2 цифры)
    $                   # Конец строки
"""

match = re.match(pattern, "2026-02-14", re.VERBOSE)
print(match.group('year'))  # '2026'
\`\`\`

**Важно:** В режиме VERBOSE пробелы игнорируются, поэтому для пробела используйте \`\\s\` или \`[ ]\`.`,
      },
      {
        kind: "text",
        md: `## Условные выражения

Условные выражения позволяют применять разные паттерны в зависимости от условия:

**Синтаксис:** \`(?(\d)yes_pattern|no_pattern)\`

\`\`\`python
import re

# Если есть цифра, ищем 4 цифры, иначе 2 цифры
pattern = r'(?(\\d)\\d{4}|\\d{2})'
print(re.findall(pattern, "1234"))  # ['1234']
print(re.findall(pattern, "12"))    # ['12']
\`\`\`

**Условие по группе:** \`(?(\(group\))yes_pattern|no_pattern)\`

\`\`\`python
# Если есть открывающая скобка, ищем закрывающую
pattern = r'(\\()?\\d+(?(1)\\))'
print(re.findall(pattern, "(123)"))  # ['(123)']
print(re.findall(pattern, "123"))    # ['123']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Рекурсивные регулярные выражения

Python поддерживает рекурсивные регулярные выражения с помощью \`(?R)\` или \`(?P>name)\`:

\`\`\`python
import re

# Поиск сбалансированных скобок
pattern = r'\\((?:[^()]*|(?R))*\\)'
text = "text (nested (brackets) here) end"
print(re.findall(pattern, text))  # ['(nested (brackets) here)']
\`\`\`

**Важно:** Рекурсивные регулярные выражения могут быть медленными и сложными для понимания. Используйте их осторожно.`,
      },
      {
        kind: "text",
        md: `## Границы слов и не-слов

**\\b** — граница слова (между \\w и \\W или началом/концом строки):
\`\`\`python
import re

# Поиск слова "cat" как целое слово
print(re.findall(r'\\bcat\\b', "cat cats catfish"))  # ['cat']

# Поиск слов, начинающихся с "cat"
print(re.findall(r'\\bcat', "cat cats catfish"))  # ['cat', 'cat', 'cat']
\`\`\`

**\\B** — не граница слова:
\`\`\`python
# Поиск "cat" не как целое слово
print(re.findall(r'\\Bcat', "cat cats catfish"))  # ['cat', 'cat']
\`\`\`

**Важно:** \\b и \\B зависят от определения "слова" (\\w), которое включает буквы, цифры и подчёркивание.`,
      },
      {
        kind: "text",
        md: `## Начало и конец строки vs текста

**^ и $** — начало и конец строки (с флагом MULTILINE) или текста (без флага):

\`\`\`python
import re

text = "first line\\nsecond line\\nthird line"

# Без MULTILINE: ^ и $ для всего текста
print(re.findall(r'^\\w+', text))  # ['first']
print(re.findall(r'\\w+$', text))  # ['line']

# С MULTILINE: ^ и $ для каждой строки
print(re.findall(r'^\\w+', text, re.MULTILINE))  # ['first', 'second', 'third']
print(re.findall(r'\\w+$', text, re.MULTILINE))  # ['line', 'line', 'line']
\`\`\`

**\\A и \\Z** — всегда начало и конец текста (игнорируют MULTILINE):
\`\`\`python
print(re.findall(r'\\A\\w+', text, re.MULTILINE))  # ['first']
print(re.findall(r'\\w+\\Z', text, re.MULTILINE))  # ['line']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Модификаторы режима

Модификаторы изменяют поведение регулярного выражения:

**inline модификаторы** (внутри паттерна):
- \`(?i)\` — игнорировать регистр
- \`(?m)\` — многострочный режим
- \`(?s)\` — точка включает \\n
- \`(?x)\` — разрешает комментарии

\`\`\`python
import re

# Inline модификаторы
print(re.findall(r'(?i)hello', "HELLO hello"))  # ['HELLO', 'hello']
print(re.findall(r'(?m)^\\w+', "line1\\nline2"))  # ['line1', 'line2']
\`\`\`

**Локальные модификаторы** (для части паттерна):
\`\`\`python
# Только первая часть без учёта регистра
print(re.findall(r'(?i:hello) world', "HELLO world"))  # ['HELLO world']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности

Регулярные выражения могут быть медленными. Советы по оптимизации:

1. **Используйте специфичные классы** вместо \`.\`:
   - \`\\d\` вместо \`.\` для цифр
   - \`\\w\` вместо \`.\` для слов

2. **Избегайте вложенных квантификаторов**:
   - Плохо: \`(a+)+\`
   - Хорошо: \`a+\`

3. **Используйте якоря** для ограничения поиска:
   - \`^pattern\` — поиск только в начале
   - \`pattern$\` — поиск только в конце

4. **Компилируйте паттерны** для повторного использования:
\`\`\`python
pattern = re.compile(r'\\d+')
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\`

5. **Используйте незахватывающие группы** \`(?:...)\` когда не нужно извлекать группу.`,
      },
      {
        kind: "text",
        md: `## Отладка регулярных выражений

**Инструменты для отладки:**

1. **re.DEBUG** — показывает внутреннее представление:
\`\`\`python
import re
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов

3. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

1. **Забытое экранирование:**
   - Плохо: \`file.txt\` (точка — любой символ)
   - Хорошо: \`file\\.txt\`

2. **Жадные квантификаторы:**
   - Плохо: \`<.+>\` (захватит всё до последнего >)
   - Хорошо: \`<.+?>\` (ленивый квантификатор)

3. **Вложенные квантификаторы:**
   - Плохо: \`(a+)+\` (катастрофический возврат)
   - Хорошо: \`a+\`

4. **Неправильное использование ^ и $:**
   - Забудьте про MULTILINE, если нужно искать в каждой строке

5. **Захватывающие группы вместо незахватывающих:**
   - Используйте \`(?:...)\` когда не нужно извлекать группу`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в других языках

Синтаксис регулярных выражений похож в разных языках, но есть различия:

**JavaScript:**
\`\`\`javascript
const pattern = /\\d+/g;
const result = "text".match(pattern);
\`\`\`

**Perl:**
\`\`\`perl
if ($text =~ /\\d+/) {
    print "Found number";
}
\`\`\`

**Java:**
\`\`\`java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher(text);
\`\`\`

**Go:**
\`\`\`go
re := regexp.MustCompile("\\d+")
matches := re.FindAllString(text, -1)
\`\`\`

**Основные различия:**
- Поддержка Unicode
- Lookbehind (не во всех языках)
- Рекурсивные регулярные выражения
- Модификаторы режима`,
      },
      {
        kind: "text",
        md: `## Символьные классы POSIX

POSIX символьные классы (с флагом \`re.UNICODE\`):

- \`[:alpha:]\` — буквы
- \`[:digit:]\` — цифры
- \`[:alnum:]\` — буквы и цифры
- \`[:space:]\` — пробельные символы
- \`[:punct:]\` — пунктуация
- \`[:upper:]\` — заглавные буквы
- \`[:lower:]\` — строчные буквы

\`\`\`python
import re

# Использование POSIX классов
print(re.findall(r'[[:alpha:]]+', 'Привет мир', re.UNICODE))  # ['Привет', 'мир']
print(re.findall(r'[[:digit:]]+', 'Цена: 123'))  # ['123']
\`\`\`

**Важно:** POSIX классы работают только внутри квадратных скобок \`[[:alpha:]]\`.`,
      },
      {
        kind: "text",
        md: `## Расширенные возможности групп

**Именованные группы с повторениями:**
\`\`\`python
import re

# Повторяющаяся именованная группа
pattern = r'(?P<word>\\w+)\\s+(?P=word)'
text = "test test"
match = re.search(pattern, text)
print(match.group('word'))  # 'test'
\`\`\`

**Атомарные группы** (не возвращаются назад):
\`\`\`python
# Атомарная группа (не поддерживается в Python напрямую)
# Используйте атомарные группы для оптимизации
\`\`\`

**Обратные ссылки в замене:**
\`\`\`python
# Использование \\1, \\2 в замене
text = "2026-02-14"
result = re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3.\\2.\\1', text)
print(result)  # '14.02.2026'

# Именованные группы в замене
result = re.sub(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})', 
                r'\\g<day>.\\g<month>.\\g<year>', text)
print(result)  # '14.02.2026'
\`\`\``,
      },
      {
        kind: "text",
        md: `## Продвинутые lookaround

**Вложенные lookaround:**
\`\`\`python
import re

# Lookahead внутри lookahead
pattern = r'(?=(\\d+)(?=\\D|$))'
text = "123 456 789"
print(re.findall(pattern, text))  # ['123', '456', '789']
\`\`\`

**Lookbehind с переменной длиной** (Python 3.7+):
\`\`\`python
# Lookbehind с переменной длиной
pattern = r'(?<=\\b\\w{3,5}\\b)\\s+\\w+'
text = "cat dog bird"
print(re.findall(pattern, text))  # [' dog', ' bird']
\`\`\`

**Комбинация lookahead и lookbehind:**
\`\`\`python
# Слово между цифрами
pattern = r'(?<=\\d)\\s+\\w+\\s+(?=\\d)'
text = "123 cat 456"
print(re.findall(pattern, text))  # [' cat ']
\`\`\``,
      },
      {
        kind: "text",
        md: `## Оптимизация производительности (детально)

**1. Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b

# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

**2. Используйте атомарные группы** (через possessive квантификаторы):
\`\`\`python
# Python не поддерживает атомарные группы напрямую
# Используйте possessive квантификаторы (Python 3.11+):
# a++ вместо a+ (не возвращается назад)
\`\`\`

**3. Оптимизация якорями:**
\`\`\`python
# Плохо: поиск во всём тексте
pattern = r'\\d+'

# Хорошо: ограничение поиска
pattern = r'^\\d+$'  # только если вся строка - число
\`\`\`

**4. Компиляция паттернов:**
\`\`\`python
import re

# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность

**Важные моменты безопасности:**

1. **ReDoS (Regular Expression Denial of Service):**
   - Злоумышленники могут использовать сложные регулярные выражения для DoS-атак
   - Всегда тестируйте регулярные выражения на длинных строках
   - Избегайте вложенных квантификаторов

2. **Валидация пользовательского ввода:**
   - Всегда используйте якоря \`^\` и \`$\` для валидации
   - Проверяйте всю строку, а не часть

3. **Экранирование пользовательских данных:**
\`\`\`python
import re

# Экранирование пользовательского ввода
user_input = "file.txt"
safe_pattern = re.escape(user_input)  # 'file\\.txt'
\`\`\`

4. **Ограничение длины ввода:**
\`\`\`python
# Ограничение длины входных данных
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения в реальных проектах

**Типичные задачи:**
1. **Валидация форм:**
\`\`\`python
def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))
\`\`\`

2. **Парсинг логов:**
\`\`\`python
log_pattern = r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)'
for match in re.finditer(log_pattern, log_text):
    timestamp, level, message = match.groups()
\`\`\`

3. **Извлечение данных:**
\`\`\`python
# Извлечение всех URL из текста
url_pattern = r'https?://[^\\s<>\"]+|www\\.[^\\s<>\"]+'
urls = re.findall(url_pattern, text)
\`\`\`

4. **Очистка данных:**
\`\`\`python
# Удаление лишних пробелов
clean_text = re.sub(r'\\s+', ' ', text).strip()

# Удаление HTML тегов
clean_html = re.sub(r'<[^>]+>', '', html_text)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование

**Тестирование регулярных выражений:**

1. **Unit тесты:**
\`\`\`python
import re
import unittest

class TestRegex(unittest.TestCase):
    def test_email_validation(self):
        pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
        self.assertTrue(re.match(pattern, "test@example.com"))
        self.assertFalse(re.match(pattern, "invalid-email"))
    
    def test_phone_validation(self):
        pattern = r'^\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$'
        self.assertTrue(re.match(pattern, "+79991234567"))
        self.assertFalse(re.match(pattern, "invalid"))

if __name__ == '__main__':
    unittest.main()
\`\`\`

2. **Тестовые данные:**
\`\`\`python
# Тестовые данные для email
valid_emails = [
    "test@example.com",
    "user.name@domain.co.uk",
    "user+tag@example.org"
]

invalid_emails = [
    "invalid-email",
    "@example.com",
    "user@",
    "user@.com"
]
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация

**Документирование регулярных выражений:**

1. **Комментарии в коде:**
\`\`\`python
# Паттерн для валидации email
# ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
# ^ - начало строки
# [\\w\\.-]+ - один или более символов (буквы, цифры, точка, дефис)
# @ - символ @
# [\\w\\.-]+ - доменное имя
# \\. - точка
# \\w+ - доменная зона
# $ - конец строки
\`\`\`

2. **Docstring:**
\`\`\`python
def validate_email(email: str) -> bool:
    """
    Валидирует email адрес.
    
    Args:
        email: Email адрес для проверки
    
    Returns:
        bool: True если email валидный, иначе False
    
    Pattern:
        ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$
        - ^ - начало строки
        - [\\w\\.-]+ - локальная часть
        - @ - символ @
        - [\\w\\.-]+ - доменное имя
        - \\. - точка
        - \\w+ - доменная зона
        - $ - конец строки
    """
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и тестирование (продолжение)

**Тестовые сценарии:**

\`\`\`python
import re
import unittest

class TestEmailValidation(unittest.TestCase):
    def setUp(self):
        self.pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    
    def test_valid_emails(self):
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "user+tag@example.org"
        ]
        for email in valid_emails:
            self.assertTrue(re.match(self.pattern, email))
    
    def test_invalid_emails(self):
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user@.com"
        ]
        for email in invalid_emails:
            self.assertFalse(re.match(self.pattern, email))

if __name__ == '__main__':
    unittest.main()
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и документация (продолжение)

**Документирование сложных паттернов:**

\`\`\`python
def validate_complex_pattern(text: str) -> bool:
    """
    Валидирует сложный паттерн.
    
    Args:
        text: Текст для проверки
    
    Returns:
        bool: True если текст соответствует паттерну
    
    Pattern breakdown:
        ^                    # Начало строки
        (?=.*[A-Za-z])       # Хотя бы одна буква
        (?=.*\\d)            # Хотя бы одна цифра
        (?=.*[@$!%*#?&])     # Хотя бы один спецсимвол
        [A-Za-z\\d@$!%*#?&]{8,}  # Минимум 8 символов
        $                    # Конец строки
    """
    pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
    return bool(re.match(pattern, text))
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и производительность (продолжение)

**Профилирование и оптимизация:**

\`\`\`python
import re
import time
import cProfile

def profile_regex(pattern, text, iterations=1000):
    """Профилирует регулярное выражение"""
    compiled = re.compile(pattern)
    
    # Профилирование
    profiler = cProfile.Profile()
    profiler.enable()
    
    for _ in range(iterations):
        compiled.findall(text)
    
    profiler.disable()
    profiler.print_stats()
\`\`\`

**Оптимизация:**

1. **Избегайте катастрофического возврата:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Хорошо: a+b или a*b
\`\`\`

2. **Используйте специфичные классы:**
\`\`\`python
# Плохо: .+ для цифр
# Хорошо: \\d+
\`\`\`

3. **Компилируйте паттерны:**
\`\`\`python
# Компилируйте для повторного использования
pattern = re.compile(r'\\d+', re.IGNORECASE)
result1 = pattern.findall(text1)
result2 = pattern.findall(text2)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и отладка (продолжение)

**Инструменты отладки:**

1. **re.DEBUG:**
\`\`\`python
import re

# Показывает внутреннее представление
re.compile(r'\\d+', re.DEBUG)
\`\`\`

2. **Пошаговая отладка:**
\`\`\`python
import re

pattern = r'(\\d+)-(\\d+)'
text = "2026-02-14"

for match in re.finditer(pattern, text):
    print(f"Match: {match.group()}")
    print(f"Group 1: {match.group(1)}")
    print(f"Group 2: {match.group(2)}")
    print(f"Span: {match.span()}")
\`\`\`

3. **Онлайн-инструменты:**
   - regex101.com — тестирование и объяснение
   - regexr.com — интерактивный редактор
   - regex101.com — библиотека паттернов`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения и безопасность (продолжение)

**ReDoS (Regular Expression Denial of Service):**

1. **Катастрофический возврат:**
\`\`\`python
# Плохо: (a+)+b на строке "aaa...a" без 'b'
# Время выполнения растёт экспоненциально

# Хорошо: a+b или a*b
\`\`\`

2. **Вложенные квантификаторы:**
\`\`\`python
# Плохо: (a|a)+ 
# Хорошо: a+
\`\`\`

3. **Тестирование на ReDoS:**
\`\`\`python
import re
import time

def test_redos(pattern, test_string, timeout=1.0):
    """Тестирует паттерн на ReDoS"""
    try:
        start = time.time()
        re.findall(pattern, test_string)
        elapsed = time.time() - start
        return elapsed < timeout
    except Exception:
        return False
\`\`\`

**Защита от ReDoS:**

1. **Ограничение длины ввода:**
\`\`\`python
if len(user_input) > 1000:
    raise ValueError("Input too long")
\`\`\`

2. **Использование атомарных групп** (через possessive квантификаторы):
\`\`\`python
# Python 3.11+ поддерживает possessive квантификаторы
# a++ вместо a+ (не возвращается назад)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Практические примеры

**Валидация email:**
\`\`\`python
pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
\`\`\`

**Извлечение телефонных номеров:**
\`\`\`python
pattern = r'\\+?\\d{1,3}[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}'
\`\`\`

**Валидация пароля (минимум 8 символов, буква, цифра, спецсимвол):**
\`\`\`python
pattern = r'^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
\`\`\``,
      },
      {
        kind: "code",
        title: "Парсинг логов",
        code: `import re

log = """
2026-02-14 10:30:45 INFO User logged in: user123
2026-02-14 10:31:12 ERROR Failed to connect: timeout
2026-02-14 10:32:00 INFO Request processed: 200 OK
"""

# Извлечение всех записей
pattern = r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)'
matches = re.findall(pattern, log)

for timestamp, level, message in matches:
    print(f"[{level}] {timestamp}: {message}")

# Извлечение только ошибок
errors = re.findall(r'ERROR (.+)', log)
print(f"Ошибки: {errors}")`,
      },
      {
        kind: "warn",
        title: "Производительность регулярных выражений",
        md: `Регулярные выражения могут быть медленными, особенно:
- Сложные паттерны с множеством квантификаторов
- Вложенные группы
- Жадные квантификаторы на длинных строках

**Советы:**
- Используйте сырые строки \`r"pattern"\`
- Компилируйте паттерны: \`pattern = re.compile(r'...')\`
- Избегайте вложенных квантификаторов
- Используйте специфичные классы вместо \`.\``,
      },
      {
        kind: "tip",
        title: "Инструменты для работы с regex",
        md: `**Онлайн-инструменты:**
- regex101.com — тестирование и объяснение паттернов
- regexr.com — интерактивный редактор
- regex101.com — библиотека паттернов

**В Python:**
- \`re.compile()\` — компиляция паттерна для повторного использования
- \`pattern.match()\`, \`pattern.search()\`, \`pattern.findall()\` — методы скомпилированного паттерна`,
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
      {
        q: "Что означает квантификатор '+'?",
        options: [
          "Ноль или более раз",
          "Один или более раз",
          "Ровно один раз",
          "Ноль или один раз",
        ],
        answer: 1,
        explain: "Квантификатор '+' означает 'один или более раз'. Для 'ноль или более' используется '*', для 'ноль или один' — '?'.",
      },
      {
        q: "Что делает флаг re.IGNORECASE?",
        options: [
          "Игнорирует пробелы",
          "Игнорирует регистр букв",
          "Делает точку многострочной",
          "Разрешает комментарии",
        ],
        answer: 1,
        explain: "Флаг re.IGNORECASE (или re.I) делает регулярное выражение нечувствительным к регистру букв.",
      },
      {
        q: "Что такое lookahead (?=...)?",
        options: [
          "Проверяет, что должно предшествовать",
          "Проверяет, что должно следовать после",
          "Захватывает группу",
          "Создаёт альтернативу",
        ],
        answer: 1,
        explain: "Lookahead (?=...) проверяет, что после текущей позиции следует указанный шаблон, но не захватывает его.",
      },
      {
        q: "Что означает \\b в регулярном выражении?",
        options: [
          "Любая цифра",
          "Граница слова",
          "Пробел",
          "Начало строки",
        ],
        answer: 1,
        explain: "\\b означает границу слова — позицию между символом слова и не-символом слова.",
      },
      {
        q: "Что возвращает re.match()?",
        options: [
          "Все совпадения в строке",
          "Первое совпадение в начале строки",
          "Первое совпадение в любом месте",
          "Список всех групп",
        ],
        answer: 1,
        explain: "re.match() проверяет соответствие паттерну только в начале строки. Для поиска в любом месте используйте re.search().",
      },
      {
        q: "Что делает флаг re.DOTALL?",
        options: [
          "Игнорирует регистр",
          "Делает точку многострочной (включает \\n)",
          "Разрешает комментарии",
          "Делает квантификаторы ленивыми",
        ],
        answer: 1,
        explain: "Флаг re.DOTALL (или re.S) заставляет точку (.) соответствовать любому символу, включая символ новой строки \\n.",
      },
    ],
    tasks: [
      {
        id: "py15t1",
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
        id: "py15t2",
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
      {
        id: "py15t3",
        title: "Валидация email",
        md: `Реализуйте \`validate_email(email)\` — возвращает \`True\`, если email валидный, иначе \`False\`. Email должен содержать \`@\` и домен с точкой.`,
        starter: `import re

def validate_email(email):
    # ваш код
    pass

print(validate_email("user@example.com"))
print(validate_email("invalid-email"))`,
        tests: `
__test("валидный email", lambda: validate_email("user@example.com"), True)
__test("валидный с поддоменом", lambda: validate_email("user@sub.example.com"), True)
__test("без @", lambda: validate_email("invalid-email"), False)
__test("без домена", lambda: validate_email("user@"), False)
__test("без имени", lambda: validate_email("@example.com"), False)`,
        solution: `import re

def validate_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))`,
      },
      {
        id: "py15t4",
        title: "Извлечение хэштегов",
        md: `Реализуйте \`extract_hashtags(text)\` — список всех хэштегов из текста. Хэштег начинается с \`#\` и содержит буквы/цифры/подчёркивания.`,
        starter: `import re

def extract_hashtags(text):
    # ваш код
    pass

print(extract_hashtags("Привет #python #world!"))`,
        tests: `
__test("простой случай", lambda: extract_hashtags("#python #world"), ["python", "world"])
__test("в тексте", lambda: extract_hashtags("Привет #python #world!"), ["python", "world"])
__test("с цифрами", lambda: extract_hashtags("#python3 #2024"), ["python3", "2024"])
__test("без хэштегов", lambda: extract_hashtags("нет хэштегов"), [])`,
        solution: `import re

def extract_hashtags(text):
    return re.findall(r'#(\\w+)', text)`,
      },
      {
        id: "py15t5",
        title: "Подсчёт слов",
        md: `Реализуйте \`count_words(text)\` — словарь с количеством вхождений каждого слова (без учёта регистра).`,
        starter: `import re

def count_words(text):
    # ваш код
    pass

print(count_words("Привет мир привет"))`,
        tests: `
__test("простой случай", lambda: count_words("привет мир привет"), {"привет": 2, "мир": 1})
__test("с разными регистрами", lambda: count_words("Привет ПРИВЕТ привет"), {"привет": 3})
__test("с пунктуацией", lambda: count_words("привет, мир! привет."), {"привет": 2, "мир": 1})`,
        solution: `import re

def count_words(text):
    words = re.findall(r'\\w+', text.lower())
    return dict((word, words.count(word)) for word in set(words))`,
      },
      {
        id: "py15t6",
        title: "Валидация телефона",
        md: `Реализуйте \`validate_phone(phone)\` — возвращает \`True\`, если телефон в формате \`+7(XXX)XXX-XX-XX\` или \`+7XXXXXXXXXX\`.`,
        starter: `import re

def validate_phone(phone):
    # ваш код
    pass

print(validate_phone("+7(999)123-45-67"))
print(validate_phone("+79991234567"))`,
        tests: `
__test("с скобками и дефисами", lambda: validate_phone("+7(999)123-45-67"), True)
__test("без форматирования", lambda: validate_phone("+79991234567"), True)
__test("неверный формат", lambda: validate_phone("89991234567"), False)
__test("слишком короткий", lambda: validate_phone("+7999123456"), False)`,
        solution: `import re

def validate_phone(phone):
    pattern = r'^\\+7(\\(\\d{3}\\)|\\d{3})\\d{3}-?\\d{2}-?\\d{2}$'
    return bool(re.match(pattern, phone.replace("-", "").replace("(", "").replace(")", "")))`,
      },
    ],
  },
    id: "py16",
    language: "python",
    title: "Функциональный стиль и анализ кода",
    subtitle: "map/filter/reduce, functools.partial, mypy, ruff",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## map, filter, reduce

\`map(fn, iterable)\` — применяет функцию к каждому элементу. \`filter(fn, iterable)\` — оставляет только те, для которых \`fn\` вернула \`True\`. \`reduce(fn, iterable)\` — сворачивает в одно значение (из \`functools\`).

Эти функции пришли из функционального программирования и позволяют писать код в декларативном стиле: описываем **что** нужно сделать, а не **как**.`,
      },
      {
        kind: "code",
        title: "map: преобразование элементов",
        code: `nums = [1, 2, 3, 4, 5]

# map применяет функцию к каждому элементу
squares = list(map(lambda x: x ** 2, nums))
print(squares)  # [1, 4, 9, 16, 25]

# map с несколькими последовательностями
list1 = [1, 2, 3]
list2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, list1, list2))
print(sums)  # [11, 22, 33]

# map с обычной функцией
def to_upper(s):
    return s.upper()

words = ["привет", "мир"]
upper_words = list(map(to_upper, words))
print(upper_words)  # ['ПРИВЕТ', 'МИР']

# map возвращает итератор, не список
result = map(lambda x: x * 2, [1, 2, 3])
print(type(result))  # <class 'map'>
print(list(result))  # [2, 4, 6]`,
      },
      {
        kind: "code",
        title: "filter: фильтрация элементов",
        code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# filter оставляет только те элементы, для которых функция вернула True
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6, 8, 10]

# filter с обычной функцией
def is_positive(x):
    return x > 0

numbers = [-5, -2, 0, 3, 7, -1]
positives = list(filter(is_positive, numbers))
print(positives)  # [3, 7]

# filter с None (удаляет falsy значения)
values = [0, 1, False, 2, "", 3, None, 4]
filtered = list(filter(None, values))
print(filtered)  # [1, 2, 3, 4]

# filter возвращает итератор
result = filter(lambda x: x > 5, [1, 2, 3, 6, 7, 8])
print(list(result))  # [6, 7, 8]`,
      },
      {
        kind: "code",
        title: "reduce: свёртка в одно значение",
        code: `from functools import reduce

nums = [1, 2, 3, 4, 5]

# reduce сворачивает список в одно значение
# lambda принимает два аргумента: аккумулятор и текущий элемент
total = reduce(lambda acc, x: acc + x, nums)
print(total)  # 15 (1+2+3+4+5)

# reduce с начальным значением
total_with_start = reduce(lambda acc, x: acc + x, nums, 100)
print(total_with_start)  # 115 (100+1+2+3+4+5)

# Произведение всех элементов
product = reduce(lambda acc, x: acc * x, nums)
print(product)  # 120 (1*2*3*4*5)

# Максимальный элемент
max_val = reduce(lambda acc, x: acc if acc > x else x, nums)
print(max_val)  # 5

# Объединение строк
words = ["Привет", "мир", "!"]
sentence = reduce(lambda acc, word: acc + " " + word, words)
print(sentence)  # " Привет мир !"`,
      },
      {
        kind: "text",
        md: `## Комбинация map, filter, reduce

Эти функции можно комбинировать для сложных преобразований:`,
      },
      {
        kind: "code",
        title: "Комбинация функциональных функций",
        code: `from functools import reduce

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Сумма квадратов чётных чисел
result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, nums))
)
print(result)  # 4+16+36+64+100 = 220

# Произведение квадратов нечётных чисел
result = reduce(
    lambda acc, x: acc * x,
    map(lambda x: x ** 2, filter(lambda x: x % 2 != 0, nums)),
    1
)
print(result)  # 1*9*25*49*81 = 85725`,
      },
      {
        kind: "text",
        md: `## functools.partial: частичное применение

\`functools.partial(fn, *args, **kwargs)\` — фиксирует часть аргументов, возвращает новую функцию. Удобно для создания специализаций и повторного использования.`,
      },
      {
        kind: "code",
        title: "partial с именованными аргументами",
        code: `from functools import partial

def power(base, exp):
    return base ** exp

# Создаём специализации с фиксированным exp
square = partial(power, exp=2)
cube = partial(power, exp=3)

print(square(5))   # 25 (5^2)
print(cube(5))     # 125 (5^3)

# partial с позиционными аргументами
def greet(greeting, name):
    return f"{greeting}, {name}!"

hello = partial(greet, "Привет")
print(hello("Ада"))  # Привет, Ада!

# partial с несколькими аргументами
def multiply(a, b, c):
    return a * b * c

double_triple = partial(multiply, 2, 3)
print(double_triple(5))  # 30 (2*3*5)`,
      },
      {
        kind: "code",
        title: "partial в реальных задачах",
        code: `from functools import partial

# Создание специализированных функций
def log(level, message):
    print(f"[{level}] {message}")

info = partial(log, "INFO")
error = partial(log, "ERROR")

info("Приложение запущено")   # [INFO] Приложение запущено
error("Ошибка подключения")  # [ERROR] Ошибка подключения

# partial с map
def multiply(x, factor):
    return x * factor

double = partial(multiply, factor=2)
triple = partial(multiply, factor=3)

nums = [1, 2, 3, 4, 5]
doubled = list(map(double, nums))
tripled = list(map(triple, nums))

print(doubled)  # [2, 4, 6, 8, 10]
print(tripled)  # [3, 6, 9, 12, 15]`,
      },
      {
        kind: "text",
        md: `## mypy: статическая проверка типов

**mypy** — инструмент для статической проверки типов в Python. Проверяет аннотации типов и находит несоответствия до запуска кода.

**Установка:** \`pip install mypy\`
**Запуск:** \`mypy script.py\` или \`mypy .\` для всего проекта

**Преимущества mypy:**
- Находит ошибки типов до запуска кода
- Улучшает автодополнение в IDE
- Улучшает документацию кода
- Помогает находить ошибки рефакторинга`,
      },
      {
        kind: "code",
        title: "Примеры аннотаций типов",
        code: `# Простые типы
def greet(name: str, times: int = 1) -> str:
    return ("Привет, " + name + "! ") * times

# mypy проверит типы аргументов и возвращаемого значения
# greet(123)  # Ошибка: int, не str
# result: int = greet("Ада")  # Ошибка: str, не int

# Сложные типы из typing
from typing import List, Dict, Optional, Union, Tuple

def process_items(items: List[str]) -> Dict[str, int]:
    """Возвращает словарь {элемент: длина}"""
    return {item: len(item) for item in items}

def get_user(user_id: int) -> Optional[dict]:
    """Может вернуть dict или None"""
    return {"id": user_id} if user_id > 0 else None

def process_value(value: Union[str, int]) -> str:
    """Принимает str или int, возвращает str"""
    return str(value)

# Кортежи с типами
def get_coordinates() -> Tuple[float, float]:
    return (10.5, 20.5)

# List comprehension с типами
def get_lengths(items: List[str]) -> List[int]:
    return [len(item) for item in items]

print("mypy проверяет типы статически")
print("Запуск: mypy script.py")`,
      },
      {
        kind: "code",
        title: "Продвинутые аннотации типов",
        code: `from typing import List, Dict, Optional, Union, Tuple, Callable, Any

# Callable: тип функции
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

# Any: любой тип (использовать осторожно)
def process_any(value: Any) -> str:
    return str(value)

# Optional: может быть None или указанный тип
def get_user(user_id: int) -> Optional[dict]:
    if user_id > 0:
        return {"id": user_id, "name": "User"}
    return None

# Union: один из нескольких типов
def process(value: Union[str, int, float]) -> str:
    return str(value)

# Generic типы
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: List[T] = []
    
    def push(self, item: T) -> None:
        self.items.append(item)
    
    def pop(self) -> T:
        return self.items.pop()

# Использование
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
value: int = int_stack.pop()

print("Продвинутые аннотации типов")`,
      },
      {
        kind: "text",
        md: `## Конфигурация mypy

Создайте файл \`mypy.ini\` или \`pyproject.toml\` для настройки mypy:`,
      },
      {
        kind: "code",
        title: "Конфигурация mypy.ini",
        code: `# mypy.ini
[mypy]
python_version = 3.11
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
disallow_incomplete_defs = True
check_untyped_defs = True
disallow_untyped_decorators = True
no_implicit_optional = True
warn_redundant_casts = True
warn_unused_ignores = True

# Игнорировать определённые модули
[mypy.plugins.*]
ignore_errors = True

# Игнорировать определённые библиотеки
[mypy.numpy.*]
ignore_missing_imports = True

[mypy.pandas.*]
ignore_missing_imports = True`,
      },
      {
        kind: "text",
        md: `## ruff: быстрый линтер и форматтер

**ruff** — очень быстрый линтер и форматтер для Python (написан на Rust). Заменяет flake8, isort, black и другие инструменты.

**Установка:** \`pip install ruff\`

**Основные команды:**
- \`ruff check .\` — проверить код на ошибки стиля
- \`ruff check --fix .\` — автоматически исправить ошибки
- \`ruff format .\` — отформатировать код
- \`ruff check --select E501 .\` — проверить только определённые правила

**Преимущества ruff:**
- Очень быстрый (в 10-100 раз быстрее flake8)
- Заменяет несколько инструментов (flake8, isort, black)
- Автоматическое исправление многих ошибок
- Совместим с black и isort`,
      },
      {
        kind: "code",
        title: "Примеры использования ruff",
        code: `# Код с проблемами стиля:
def bad_function( x,y ):
    z=x+y
    return z

# ruff check найдёт проблемы:
# - E251: unexpected spaces around keyword parameter
# - E225: missing whitespace around operator
# - E231: missing whitespace after ','

# ruff check --fix автоматически исправит:
def good_function(x, y):
    z = x + y
    return z

# ruff format отформатирует код:
# - Правильные отступы (4 пробела)
# - Правильные пробелы вокруг операторов
# - Правильные пробелы после запятых
# - Максимальная длина строки 88 символов

# Команды:
# ruff check .              # проверить весь проект
# ruff check --fix .        # исправить автоматически
# ruff format .             # форматировать код
# ruff check --select E501  # проверить только длину строк

print("ruff — быстрый линтер и форматтер")`,
      },
      {
        kind: "text",
        md: `## Конфигурация ruff

Создайте файл \`ruff.toml\` или \`pyproject.toml\` для настройки ruff:`,
      },
      {
        kind: "code",
        title: "Конфигурация ruff.toml",
        code: `# ruff.toml
# Линтер
line-length = 88
target-version = "py311"

# Включить определённые правила
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort
    "UP",  # pyupgrade
    "B",   # flake8-bugbear
    "C4",  # flake8-comprehensions
]

# Игнорировать определённые правила
ignore = [
    "E501",  # игнорировать длину строки
    "E505",  # игнорировать длинные строки
]

# Форматтер
[format]
quote-style = "double"
indent-style = "space"
line-ending = "auto"

# isort конфигурация
[isort]
known-first-party = ["myproject"]`,
      },
      {
        kind: "text",
        md: `## black: альтернативный форматтер

**black** — ещё один популярный форматтер для Python. В отличие от ruff, black только форматирует код, но не проверяет стиль.

**Установка:** \`pip install black\`
**Запуск:** \`black script.py\` или \`black .\`

**Особенности black:**
- Применяет единый стиль кода
- Не настраивается (единообразие)
- Автоматически форматирует весь код
- Совместим с большинством проектов

**Преимущества black:**
- Единый стиль для всех проектов
- Не требует настройки
- Автоматическое форматирование
- Интеграция с IDE`,
      },
      {
        kind: "code",
        title: "Примеры использования black",
        code: `# До форматирования:
def bad_function( x,y ):
    z=x+y
    return z

# После black:
def bad_function(x, y):
    z = x + y
    return z

# black применяет единый стиль:
# - 4 пробела для отступов
# - Пробелы вокруг операторов
# - Пробелы после запятых
# - Максимальная длина строки 88 символов

# Команды:
# black script.py           # форматировать файл
# black .          # форматировать всю папку
# black --check .           # проверить без форматирования
# black --diff .            # показать различия

# Конфигурация pyproject.toml:
# [tool.black]
# line-length = 88
# target-version = ['py311']

print("black — единый стиль для всех")`,
      },
      {
        kind: "text",
        md: `## Сравнение ruff и black

| Функция | ruff | black |
|---------|------|-------|
  Линтер | ✅ Да | Да |
  Форматтер | ✅ Да | ✅ Да |
  Скорость | ✅ Очень быстрая | Средняя |
  Настройка | ✅ Да | Да |
  Автофикс | ✅ Да | ✅ Да |

**ruff** — универсальный инструмент (линтер + форматтер)
**ruff** — только форматтер (но очень быстрый)

**Рекомендация:** Используйте ruff для всего (линтер + форматтер)`,
      },
      {
        kind: "text",
        md: `## itertools: инструменты для итераторов

Модуль \`itertools\` предоставляет эффективные инструменты для работы с итераторами:`,
      },
      {
        kind: "code",
        title: "Полезные функции itertools",
        code: `import itertools

# chain: объединение итераторов
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list(itertools.chain(list1, list2))
print(combined)  # [1, 2, 3, 4, 5, 6]

# product: декартово произведение
colors = ["красный", "синий"]
sizes = ["S", "M", "L"]
combinations = list(itertools.product(colors, sizes))
print(combinations)  # [('красный', 'S'), ('красный', 'M'), ...]

# permutations: все перестановки
perms = list(itertools.permutations([1, 2, 3]))
print(perms)  # [(1,2,3), (1,3,2), (2,1,3), ...]

# combinations: все комбинации
combs = list(itertools.combinations([1, 2, 3, 4], 2))
print(combs)  # [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)]

# count: бесконечный счётчик
counter = itertools.count(10, 2)  # 10, 12, 14, 16, ...
print([next(counter) for _ in range(5)])  # [10, 12, 14, 16, 18]

# cycle: бесконечный цикл
cycle = itertools.cycle(["A", "B", "C"])
print([next(cycle) for _ in range(7)])  # ['A', 'B', 'C', 'A', 'B', 'C', 'A']`,
      },
      {
        kind: "text",
        md: `## operator: функциональные операторы

Модуль \`operator\` предоставляет функциональные версии операторов:`,
      },
      {
        kind: "code",
        title: "Функциональные операторы",
        code: `import operator

# Арифметические операторы
print(operator.add(2, 3))      # 5
print(operator.mul(2, 3))      # 6
print(operator.pow(2, 3))      # 8

# Операторы сравнения
print(operator.eq(2, 2))       # True
print(operator.gt(5, 3))       # True
print(operator.lt(3, 5))       # True

# Использование с map/filter
nums = [1, 2, 3, 4, 5]
doubled = list(map(operator.mul, nums, [2, 2, 2, 2, 2]))
print(doubled)  # [2, 4, 6, 8, 10]

# itemgetter: получение элементов
from operator import itemgetter
data = [(1, 2), (3, 1), (2, 3)]
sorted_data = sorted(data, key=itemgetter(1))
print(sorted_data)  # [(3, 1), (1, 2), (2, 3)]`,
      },
      {
        kind: "tip",
        title: "Когда что использовать",
        md: `map/filter — когда логика простая и однострочная. Comprehensions — когда сложнее или с условиями. reduce — для свёрток (сумма, произведение, конкатенация). partial — когда нужно зафиксировать часть аргументов для переиспользования.`,
      },
      {
        kind: "text",
        md: `## List comprehensions: подробный разбор

**List comprehensions** — это компактный способ создания списков. Синтаксис:
\`\`\`python
[выражение for элемент in итератор if условие]
\`\`\`

**Преимущества:**
- Более читаемый код
- Быстрее, чем эквивалентный цикл for
- Более компактный

**Примеры:**
\`\`\`python
# Простой пример
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# С условием
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Вложенные comprehensions
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Сложные условия
result = [x for x in range(100) if x % 2 == 0 if x % 3 == 0]
print(result)  # [0, 6, 12, 18, 24, ...]
\`\`\``,
      },
      {
        kind: "code",
        title: "Dict и Set comprehensions",
        code: `# Dict comprehension
squares_dict = {x: x ** 2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique_lengths = {len(word) for word in ["apple", "banana", "pear"]}
print(unique_lengths)  # {4, 5, 6}

# С условием
even_squares = {x: x ** 2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Вложенные dict comprehensions
matrix_dict = {
    i: {j: i * j for j in range(1, 4)}
    for i in range(1, 4)
}
print(matrix_dict)
# {1: {1: 1, 2: 2, 3: 3}, 2: {1: 2, 2: 4, 3: 6}, 3: {1: 3, 2: 6, 3: 9}}`,
      },
      {
        kind: "text",
        md: `## Generator expressions

**Генераторные выражения** похожи на list comprehensions, но используют круглые скобки и создают **генератор** вместо списка. Это экономит память, так как значения генерируются по одному.

\`\`\`python
# List comprehension (создаёт список в памяти)
squares_list = [x ** 2 for x in range(1000000)]

# Генераторное выражение (генерирует по одному)
squares_gen = (x ** 2 for x in range(1000000))

# Использование
print(sum(squares_gen))  # Работает, не создавая список в памяти
\`\`\`

**Когда использовать генераторы:**
- Когда работаете с большими объёмами данных
- Когда нужно экономить память
- Когда значения нужны только один раз`,
      },
      {
        kind: "code",
        title: "Генераторные выражения",
        code: `# Генераторное выражение
squares = (x ** 2 for x in range(10))
print(type(squares))  # <class 'generator'>

# Использование
print(list(squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Генератор можно использовать только один раз
squares = (x ** 2 for x in range(5))
print(sum(squares))  # 30
print(sum(squares))  # 0 — генератор уже исчерпан

# Бесконечный генератор
def infinite_squares():
    n = 0
    while True:
        yield n * n
        n += 1

# Использование с itertools.islice
from itertools import islice
gen = infinite_squares()
print(list(islice(gen, 5)))  # [0, 1, 4, 9, 16]`,
      },
      {
        kind: "text",
        md: `## functools: дополнительные инструменты

Модуль \`functools\` предоставляет дополнительные функциональные инструменты:

**lru_cache** — кэширование результатов функций:
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=100)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Первый вызов вычисляет, последующие берут из кэша
print(fibonacci(100))  # Мгновенно после первого вызова
\`\`\`

**wraps** — сохранение метаданных декоратора:
\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("До вызова")
        result = func(*args, **kwargs)
        print("После вызова")
        return result
    return wrapper

@my_decorator
def greet(name):
    \"\"\"Приветствует пользователя\"\"\"
    print(f"Привет, {name}!")

print(greet.__name__)  # greet (не wrapper)
print(greet.__doc__)   # Приветствует пользователя
\`\`\``,
      },
      {
        kind: "code",
        title: "lru_cache и wraps",
        code: `from functools import lru_cache, wraps

# lru_cache: кэширование результатов
@lru_cache(maxsize=100)
def expensive_function(n):
    \"\"\"Дорогая функция\"\"\"
    import time
    time.sleep(1)  # Имитация дорогой операции
    return n * 2

# Первый вызов — медленно
result1 = expensive_function(10)  # 1 секунда

# Второй вызов — мгновенно (из кэша)
result2 = expensive_function(10)  # Мгновенно

# wraps: сохранение метаданных
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        \"\"\"Декоратор\"\"\"
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    \"\"\"Приветствует пользователя\"\"\"
    return f"Привет, {name}!"

print(greet.__name__)  # greet (не wrapper)
print(greet.__doc__)   # Приветствует пользователя`,
      },
      {
        kind: "text",
        md: `## functools: дополнительные декораторы

**total_ordering** — автоматическая генерация методов сравнения:
\`\`\`python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __eq__(self, other):
        return self.grade == other.grade
    
    def __lt__(self, other):
        return self.grade < other.grade

# Автоматически генерируются: __le__, __gt__, __ge__
students = [Student("А", 90), Student("Б", 85), Student("В", 95)]
students.sort()
\`\`\`

**singledispatch** — перегрузка функций по типу:
\`\`\`python
from functools import singledispatch

@singledispatch
def process(arg):
    print(f"Обработка: {arg}")

@process.register(int)
def _(int):
    print(f"Обработка числа: {int}")

@process.register(str)
def _(str):
    print(f"Обработка строки: {str}")

process(10)      # Обработка числа: 10
process("hello") # Обработка строки: hello
\`\``,
      },
      {
        kind: "code",
        title: "Декораторы с параметрами",
        code: `from functools import wraps

# Декоратор с параметрами
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Привет, {name}!")

greet("Ада")  # Привет, Ада! (3 раза)

# Декоратор с несколькими параметрами
def retry(max_attempts, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    import time
                    time.sleep(delay)
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def unstable_function():
    import random
    if random.random() < 0.5:
        raise Exception("Ошибка")
    return "Успех"`,
      },
      {
        kind: "text",
        md: `## Lambda функции: подробный разбор

**Lambda функции** — это анонимные функции, которые создаются с помощью ключевого слова \`lambda\`.

**Синтаксис:**
\`\`\`python
lambda аргументы: выражение
\`\`\`

**Ограничения:**
- Только одно выражение
- Нет операторов (if, for, while и т.д.)
- Нет аннотаций типов

**Когда использовать:**
- Когда функция очень простая
- Когда функция нужна только один раз
- Когда функция передаётся как аргумент`,
      },
      {
        kind: "code",
        title: "Lambda функции",
        code: `# Простая lambda
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda с несколькими аргументами
add = lambda x, y: x + y
print(add(2, 3))  # 5

# Lambda с условием (через тернарный оператор)
abs_value = lambda x: x if x >= 0 else -x
print(abs_value(-5))  # 5

# Lambda в map/filter
nums = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))

print(squares)  # [1, 4, 9, 16, 25]
print(evens)    # [2, 4]

# Lambda в sorted
words = ["apple", "banana", "pear"]
sorted_by_length = sorted(words, key=lambda x: len(x))
print(sorted_by_length)  # ['pear', 'apple', 'banana']`,
      },
      {
        kind: "text",
        md: `## Сравнение lambda и def

| Характеристика | lambda | def |
|----------------|--------|-----|
| Анонимная | ✅ Да | ❌ Нет |
| Одно выражение | ✅ Да | ❌ Нет |
| Аннотации типов | ❌ Нет | ✅ Да |
| Docstring | ❌ Нет | ✅ Да |
| Сложная логика | ❌ Нет | ✅ Да |

**Когда использовать lambda:**
- Когда функция очень простая (одно выражение)
- Когда функция нужна только один раз
- Когда функция передаётся как аргумент (map, filter, sorted)

**Когда использовать def:**
- Когда функция сложная (несколько выражений)
- Когда нужна документация
- Когда нужны аннотации типов
- Когда функция используется многократно`,
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
      {
        q: "Что делает map()?",
        options: [
          "Фильтрует элементы",
          "Применяет функцию к каждому элементу",
          "Сворачивает список в одно значение",
          "Сортирует элементы",
        ],
        answer: 1,
        explain: "map применяет функцию к каждому элементу итератора и возвращает новый итератор с результата.",
      },
      {
        q: "Что делает filter()?",
        options: [
          "Применяет функцию к каждому элементу",
          "Оставляет только те элементы, для которых функция вернула True",
          "Сворачивает список в одно значение",
          "Сортирует элементы",
        ],
        answer: 1,
        explain: "filter оставляет только те элементы, для которых функция вернула True.",
      },
      {
        q: "Что делает itertools.chain()?",
        options: [
          "Создаёт цепочку функций",
          "Объединяет несколько итераторов в один",
          "Создаёт бесконечный счётчик",
          "Создаёт все перестановки",
        ],
        answer: 1,
        explain: "itertools.chain объединяет несколько итераторов в один последовательный итератор.",
      },
      {
        q: "Что делает mypy?",
        options: [
          "Форматирует код",
          "Проверяет типы статически",
          "Линтит код",
          "Форматирует и линтит",
        ],
        answer: 1,
        explain: "mypy — инструмент для статической проверки типов в Python.",
      },
      {
        q: "Что делает ruff?",
        options: [
          "Только форматирует код",
          "Только линтит код",
          "И линтит, и форматирует код",
          "Проверяет типы",
        ],
        answer: 2,
        explain: "ruff — это и линтер, и форматтер для Python.",
      },
      {
        q: "Что делает black?",
        options: [
          "И линтит, и форматирует код",
          "Только форматирует код",
          "Только линтит код",
          "Проверяет типы",
        ],
        answer: 1,
        explain: "black — это только форматтер для Python.",
      },
      {
        q: "Что делает itertools.product()?",
        options: [
          "Умножает числа",
          "Создаёт декартово произведение итераторов",
          "Создаёт все перестановки",
          "Создаёт все комбинации",
        ],
        answer: 1,
        explain: "itertools.product создаёт декартово произведение нескольких итераторов.",
      },
      {
        q: "Что делает itertools.combinations()?",
        options: [
          "Создаёт декартово произведение",
          "Создаёт все перестановки",
          "Создаёт все комбинации заданной длины",
          "Объединяет итераторы",
        ],
        answer: 2,
        explain: "itertools.combinations создаёт все возможные комбинации заданной длины из итератора.",
      },
    ],
    tasks: [
      {
        id: "py16t1",
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
        id: "py16t2",
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
      {
        id: "py16t3",
        title: "Сумма квадратов чётных",
        md: `Реализуйте \\`sum_even_squares(nums)\\` — сумму квадратов чётных чисел, используя \\`map\\`, \\`filter\\` и \\`reduce\\`. \\`sum_even_squares([1, 2, 3, 4])\\` → \\`20\\` (4+16).`,
        starter: `from functools import reduce

def sum_even_squares(nums):
    # map + filter + reduce
    pass

print(sum_even_squares([1, 2, 3, 4]))`,
        tests: `
__test("[1,2,3,4] → 20", () => sum_even_squares([1, 2, 3, 4]), 20)
__test("[1,3,5] → 0", () => sum_even_squares([1, 3, 5]), 0)
__test("[2,4,6] → 56", () => sum_even_squares([2, 4, 6]), 56)
__test("[] → 0", () => sum_even_squares([]), 0)`,
        solution: `from functools import reduce

def sum_even_squares(nums):
    squares = map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, nums))
    return reduce(lambda acc, x: acc + x, squares, 0)`,
      },
      {
        id: "py16t4",
        title: "Декартово произведение",
        md: `Реализуйте \\`cartesian_product(list1, list2)\\` — декартово произведение двух списков, используя \\`itertools.product\\`. \\`cartesian_product([1,2], ['a','b'])\\` → \\`[(1,'a'), (1,'b'), (2,'a'), (2,'b')]\\`.`,
        starter: `import itertools

def cartesian_product(list1, list2):
    # itertools.product
    pass

print(cartesian_product([1, 2], ['a', 'b']))`,
        tests: `
__test("простой случай", lambda: cartesian_product([1, 2], ['a', 'b']), [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')])
__test("один элемент", lambda: cartesian_product([1], ['a']), [(1, 'a')])
__test("пустой список", lambda: cartesian_product([], ['a']), [])`,
        solution: `import itertools

def cartesian_product(list1, list2):
    return list(itertools.product(list1, list2))`,
      },
      {
        id: "py16t6",
        title: "Бесконечный счётчик",
        md: `Реализуйте \\`infinite_counter(start, step)\\` — возвращает итератор бесконечного счётчика, используя \\`itertools.count\\`. \\`list(islice(infinite_counter(10, 2), 5))\\` → \\`[10, 12, 14, 16, 18]\\`.`,
        starter: `import itertools
from itertools import islice

def infinite_counter(start, step):
    # itertools.count
    pass

print(list(islice(infinite_counter(10, 2), 5)))`,
        tests: `
from itertools import islice
__test("счётчик с шагом 2", lambda: list(islice(infinite_counter(10, 2), 5)), [10, 12, 14, 16, 18])
__test("счётчик с шагом 1", lambda: list(islice(infinite_counter(0, 1), 5)), [0, 1, 2, 3, 4])
__test("счётчик с шагом 5", lambda: list(islice(infinite_counter(0, 5), 5)), [0, 5, 10, 15, 20])`,
        solution: `import itertools

def infinite_counter(start, step):
    return itertools.count(start, step)`,
      },
    ],
  },

  {
    id: "py17",
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
        id: "py17t1",
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
        id: "py17t2",
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
    id: "py18",
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
        id: "py18t1",
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
        id: "py18t2",
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
    id: "py19",
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
        id: "py19t1",
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
        id: "py19t2",
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
];
