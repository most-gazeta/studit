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


