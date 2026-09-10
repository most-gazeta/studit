import type { Lesson } from "../lib/types";

export const pythonLessons: Lesson[] = [
  {
    id: "py1",
    language: "python",
    title: "Первый код: print и переменные",
    subtitle: "Синтаксис без скобок и точек с запятой, динамическая типизация, f-строки",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Python — язык данных и автоматизации 🐍

Python — второй язык платформы. Если JavaScript — язык браузера, то Python — язык данных, автоматизации, бэкенда и машинного обучения.

**Аналогия:** Представьте два языка:
- **JavaScript** — как разговорный язык: быстрый, гибкий, но иногда непонятный
- **Python** — как письменный язык: чёткий, структурированный, читается как английский текст

**Главное отличие:** В Python **нет фигурных скобок** — блоки кода выделяются отступами. **Нет let/const** — переменная создаётся в момент присваивания.

**Где используется Python?**
- 📊 Анализ данных и машинное обучение (pandas, numpy, scikit-learn)
- 🌐 Веб-бэкенд (Django, FastAPI, Flask)
- 🤖 Автоматизация и скрипты
- 🎮 Разработка игр (Pygame)
- 🔬 Научные вычисления
- 🕷️ Веб-скрейпинг (BeautifulSoup, Scrapy)`,
      },
      {
        kind: "text",
        md: `## Ваша первая программа

Функция \`print()\` — аналог \`console.log\` в JavaScript. Она выводит текст на экран.

**Пример:**
\`\`\`python
print("Привет, мир!")
\`\`\`

Это самая простая программа на Python. Она выводит текст "Привет, мир!" на экран.

**Важные отличия от JavaScript:**
- Нет точки с запятой \`;\` в конце строки
- Нет фигурных скобок \`{}\` для блоков кода
- Вместо \`console.log()\` используется \`print()\`
- Комментарии начинаются с \`#\`, а не \`//\``,
      },
      {
        kind: "code",
        title: "hello.py — первая программа",
        code: `print("Привет, Python!")

year = 1991
print("Год рождения языка:", year)
print("Возраст:", 2026 - year)

name = "Гвидо"
print(f"Создатель языка — {name}")  # f-строка — как шаблонные строки JS

# Множественный вывод
print("Имя:", name, "Год:", year)
print("Имя: " + name + ", Год: " + str(year))  # конкатенация`,
      },
      {
        kind: "text",
        md: `## Переменные: как коробки для данных 📦

Переменная в Python — это как коробка с наклейкой. Вы кладёте что-то в коробку и даёте ей имя.

**Пример:**
\`\`\`python
age = 25  # коробка с наклейкой "age", внутри число 25
name = "Алиса"  # коробка с наклейкой "name", внутри строка "Алиса"
\`\`\`

**Отличие от JavaScript:**
- В JS: \`let age = 25;\` (нужно объявить переменную)
- В Python: \`age = 25\` (переменная создаётся автоматически)

**Правила именования переменных:**
- Могут содержать буквы, цифры и символ подчёркивания \`_\`
- Не могут начинаться с цифры
- Регистр важен: \`name\` и \`Name\` — разные переменные
- Нельзя использовать зарезервированные слова (\`if\`, \`for\`, \`class\` и т.д.)`,
      },
      {
        kind: "code",
        title: "Работа с переменными",
        code: `# Создание переменных
age = 25
name = "Алиса"
height = 1.75
is_student = True

# Вывод значений
print(age)
print(name)
print(height)
print(is_student)

# Изменение значения
age = 26
print("Новый возраст:", age)

# Множественное присваивание
x, y, z = 1, 2, 3
print(x, y, z)

# Обмен значениями
x, y = y, x
print("После обмена:", x, y)

# Константы (по соглашению — заглавными буквами)
PI = 3.14159
MAX_SIZE = 100
print(PI, MAX_SIZE)`,
      },
      {
        kind: "text",
        md: `## Типы данных

Python — язык с **динамической типизацией**. Это значит, что тип определяется автоматически, и переменная может хранить значения разных типов.

**Основные типы:**
- \`int\` — целые числа (42, -10, 0)
- \`float\` — дробные числа (3.14, -2.5, 0.0)
- \`str\` — строки ("привет", 'мир')
- \`bool\` — логические значения (True, False)
- \`None\` — отсутствие значения (аналог null в JS)

**Важно:** В Python нет \`undefined\` и \`null\` — только \`None\`.

**Особенность Python:** Целые числа (\`int\`) могут быть **любой длины** — нет переполнения!`,
      },
      {
        kind: "code",
        title: "Типы данных в Python",
        code: `# Целые числа (int)
age = 25
year = 2026
negative = -10
print(type(age))  # <class 'int'>

# Дробные числа (float)
pi = 3.14159
temperature = -5.5
print(type(pi))  # <class 'float'>

# Строки (str)
name = "Алиса"
greeting = 'Привет'
print(type(name))  # <class 'str'>

# Логические значения (bool)
is_active = True
is_deleted = False
print(type(is_active))  # <class 'bool'>

# Отсутствие значения (None)
result = None
print(type(result))  # <class 'NoneType'>

# Динамическая типизация
x = 10
print(type(x))  # <class 'int'>
x = "десять"
print(type(x))  # <class 'str'> — тип изменился!

# Большие числа не переполняются
print(2 ** 100)  # огромное число работает нормально`,
      },
      {
        kind: "text",
        md: `## Арифметические операции

Python поддерживает все стандартные математические операции:

- \`+\` — сложение
- \`-\` — вычитание
- \`*\` — умножение
- \`/\` — деление (всегда возвращает float)
- \`//\` — целочисленное деление (отбрасывает дробную часть)
- \`%\` — остаток от деления
- \`**\` — возведение в степень

**Важно:** В Python 3 деление \`/\` всегда возвращает float, даже если числа целые!`,
      },
      {
        kind: "code",
        title: "Арифметические операции",
        code: `# Базовые операции
print(10 + 3)   # 13 — сложение
print(10 - 3)   # 7 — вычитание
print(10 * 3)   # 30 — умножение
print(10 / 3)   # 3.333... — деление (float!)
print(10 // 3)  # 3 — целочисленное деление
print(10 % 3)   # 1 — остаток от деления
print(10 ** 3)  # 1000 — возведение в степень

# Деление всегда возвращает float
print(10 / 2)   # 5.0 (не 5!)
print(10 // 2)  # 5 (целое число)

# Приоритет операций (как в математике)
print(2 + 3 * 4)     # 14 (сначала умножение)
print((2 + 3) * 4)   # 20 (скобки меняют порядок)

# Практические примеры
total = 100
tax_rate = 0.2
tax = total * tax_rate
print(f"Налог: {tax}")  # Налог: 20.0

# Проверка чётности
number = 7
is_even = number % 2 == 0
print(f"{number} чётное? {is_even}")  # 7 чётное? False`,
      },
      {
        kind: "text",
        md: `## f-строки: шаблонизация текста

f-строки (formatted strings) — это способ вставлять переменные прямо в строку.

**Синтаксис:**
\`\`\`python
name = "Алиса"
age = 25
print(f"Меня зовут {name}, мне {age} лет")
\`\`\`

**Аналогия в JavaScript:**
\`\`\`javascript
const name = "Алиса";
const age = 25;
console.log(\`Меня зовут \${name}, мне \${age} лет\`);
\`\`\`

f-строки начинаются с буквы \`f\` перед кавычками. Внутри фигурных скобок \`{}\` можно писать любые выражения.`,
      },
      {
        kind: "code",
        title: "f-строки в действии",
        code: `name = "Алиса"
age = 25
city = "Москва"

# Простая f-строка
print(f"Меня зовут {name}")

# Несколько переменных
print(f"Меня зовут {name}, мне {age} лет, я из {city}")

# Вычисления внутри f-строки
print(f"Через 5 лет мне будет {age + 5} лет")

# Форматирование чисел
price = 1234.5678
print(f"Цена: {price:.2f} руб.")  # 2 знака после запятой

# Выравнивание
name = "Алиса"
print(f"|{name:<10}|")  # выравнивание влево
print(f"|{name:>10}|")  # выравнивание вправо
print(f"|{name:^10}|")  # выравнивание по центру

# Процентное форматирование
score = 85.5
print(f"Результат: {score:.1f}%")  # Результат: 85.5%

# Разделители тысяч
population = 1234567
print(f"Население: {population:,}")  # Население: 1,234,567`,
      },
      {
        kind: "text",
        md: `## Комментарии в Python

Комментарии — это пояснения в коде, которые игнорируются интерпретатором.

**Однострочный комментарий:**
\`\`\`python
# Это комментарий
print("Привет")  # Это тоже комментарий
\`\`\`

**Многострочный комментарий (docstring):**
\`\`\`python
"""
Это многострочный комментарий.
Можно использовать для описания функций.
"""
\`\`\`

**Зачем нужны комментарии?**
- Объяснить сложную логику
- Временно отключить код
- Оставить заметки для себя
- Документировать функции и классы`,
      },
      {
        kind: "code",
        title: "Комментарии и документация",
        code: `# Это однострочный комментарий
print("Привет")  # Комментарий в конце строки

"""
Это многострочный комментарий.
Можно использовать для описания функций и модулей.
"""

def calculate_area(radius):
    """
    Вычисляет площадь круга по радиусу.
    
    Args:
        radius (float): Радиус круга
        
    Returns:
        float: Площадь круга
    """
    return 3.14159 * radius ** 2

# Использование функции
area = calculate_area(5)
print(f"Площадь круга: {area:.2f}")

# Временное отключение кода
# print("Эта строка не выполнится")
print("Эта выполнится")`,
      },
      {
        kind: "text",
        md: `## Ввод данных от пользователя

Функция \`input()\` позволяет получить данные от пользователя.

**Синтаксис:**
\`\`\`python
name = input("Введите ваше имя: ")
print(f"Привет, {name}!")
\`\`\`

**Важно:** \`input()\` всегда возвращает **строку**. Если нужно число, используйте \`int()\` или \`float()\`:
\`\`\`python
age = int(input("Введите ваш возраст: "))
\`\`\``,
      },
      {
        kind: "code",
        title: "Ввод данных от пользователя",
        code: `# Простой ввод
name = input("Введите ваше имя: ")
print(f"Привет, {name}!")

# Ввод числа
age = int(input("Введите ваш возраст: "))
print(f"Через 5 лет вам будет {age + 5} лет")

# Ввод дробного числа
height = float(input("Введите ваш рост (в метрах): "))
print(f"Ваш рост: {height} м")

# Множественный ввод
x, y = input("Введите два числа через пробел: ").split()
x, y = int(x), int(y)
print(f"Сумма: {x + y}")`,
      },
      {
        kind: "warn",
        title: "Отступы — это синтаксис",
        md: `4 пробела в начале строки определяют блок кода. Сбившийся отступ — не «стиль», а ошибка \`IndentationError\`. Табы и пробелы не смешивать: редактор должен сам ставить 4 пробела по нажатию Tab.

**Правильно:**
\`\`\`python
if True:
    print("Это внутри блока")
    print("Тоже внутри блока")
\`\`\`

**Неправильно:**
\`\`\`python
if True:
print("Ошибка: нет отступа")
\`\`\``,
      },
      {
        kind: "tip",
        title: "PEP 8 — стиль языка",
        md: `PEP 8 — это руководство по стилю кода в Python. Все Python-разработчики следуют ему.

**Основные правила:**
- Переменные и функции: \`snake_case\` (\`user_name\`, \`calculate_total\`)
- Классы: \`PascalCase\` (\`UserProfile\`, \`ShoppingCart\`)
- Константы: \`UPPER_SNAKE_CASE\` (\`MAX_SIZE\`, \`PI\`)
- Максимальная длина строки: 79 символов
- Пробелы вокруг операторов: \`x = 1 + 2\` (не \`x=1+2\`)

**Инструменты для автоматической проверки:**
- \`black\` — автоматическое форматирование
- \`flake8\` — проверка стиля
- \`pylint\` — анализ кода`,
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
      {
        q: "Что вернёт 10 / 3 в Python?",
        options: ["3", "3.333...", "3.0", "Ошибка"],
        answer: 1,
        explain: "В Python 3 деление / всегда возвращает float, даже если числа целые. Для целочисленного деления используйте //.",
      },
      {
        q: "Как создать f-строку?",
        options: ["f'Привет {name}'", "format('Привет {name}')", "'Привет' + name", "template('Привет {name}')"],
        answer: 0,
        explain: "f-строка начинается с буквы f перед кавычками. Внутри {} можно вставлять переменные и выражения.",
      },
      {
        q: "Что делает функция input()?",
        options: [
          "Выводит текст на экран",
          "Получает данные от пользователя",
          "Преобразует строку в число",
          "Проверяет тип данных",
        ],
        answer: 1,
        explain: "input() получает данные от пользователя и всегда возвращает строку. Для преобразования в число используйте int() или float().",
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
      {
        id: "py1t3",
        title: "Площадь круга",
        md: `Реализуйте функцию \`circle_area(radius)\`, которая вычисляет площадь круга по формуле \`π * r²\`. Используйте \`math.pi\` для значения π.`,
        starter: `import math

def circle_area(radius):
    # ваш код
    pass

print(circle_area(5))`,
        tests: `
import math
__test("circle_area(5) → 78.54", lambda: round(circle_area(5), 2), 78.54)
__test("circle_area(1) → π", lambda: round(circle_area(1), 2), 3.14)
__test("circle_area(0) → 0", lambda: circle_area(0), 0)`,
        solution: `import math

def circle_area(radius):
    return math.pi * radius ** 2`,
      },
      {
        id: "py1t4",
        title: "Форматирование числа",
        md: `Реализуйте функцию \`format_price(price)\`, которая форматирует цену с двумя знаками после запятой и разделителем тысяч. Пример: \`format_price(1234567.89)\` → \`"1,234,567.89"\`.`,
        starter: `def format_price(price):
    # ваш код с f-строкой
    pass

print(format_price(1234567.89))`,
        tests: `
__test("format_price(1234567.89)", lambda: format_price(1234567.89), "1,234,567.89")
__test("format_price(100)", lambda: format_price(100), "100.00")
__test("format_price(0.5)", lambda: format_price(0.5), "0.50")`,
        solution: `def format_price(price):
    return f"{price:,.2f}"`,
      },
    ],
  },

  {
    id: "py2",
    language: "python",
    title: "Условия и логика",
    subtitle: "if/elif/else, цепочки сравнений, and/or/not, тернарник",
    minutes: 25,
    blocks: [
      {
        kind: "text",
        md: `## Условные конструкции: принимаем решения 🤔

Условные конструкции позволяют программе принимать решения на основе условий. Это как развилка на дороге: если условие истинно — идём налево, если ложно — направо.

**Аналогия:** Представьте, что вы выбираете одежду по погоде:
- **Если** на улице холодно → надеваете куртку
- **Иначе если** прохладно → надеваете свитер
- **Иначе** → надеваете футболку

В Python это выглядит так:
\`\`\`python
if temperature < 0:
    print("Надеваю куртку")
elif temperature < 15:
    print("Надеваю свитер")
else:
    print("Надеваю футболку")
\`\`\``,
      },
      {
        kind: "text",
        md: `## if, elif, else: синтаксис

**Главное отличие от JavaScript:**
- **Нет скобок** вокруг условия: \`if x > 5:\` (не \`if (x > 5)\`)
- **Нет фигурных скобок** — блоки определяются отступами
- **Вместо \`else if\`** используется \`elif\`
- После условия всегда ставится **двоеточие** \`:\`

**Синтаксис:**
\`\`\`python
if условие1:
    # код, если условие1 истинно
elif условие2:
    # код, если условие2 истинно
elif условие3:
    # код, если условие3 истинно
else:
    # код, если все условия ложны
\`\`\`

**Важно:** Python проверяет условия сверху вниз и выполняет **только первый** истинный блок. Остальные игнорируются.`,
      },
      {
        kind: "code",
        title: "Простой пример: определение времени суток",
        code: `hour = 21

if hour < 6:
    print("Глубокая ночь 🌙")
elif hour < 12:
    print("Доброе утро ☀️")
elif hour < 18:
    print("Добрый день 🌤️")
else:
    print("Добрый вечер 🌆")

# Что происходит:
# 1. Проверяется hour < 6 → False (21 не меньше 6)
# 2. Проверяется hour < 12 → False (21 не меньше 12)
# 3. Проверяется hour < 18 → False (21 не меньше 18)
# 4. Выполняется else → "Добрый вечер 🌆"`,
      },
      {
        kind: "text",
        md: `## Цепочки сравнений: как в математике 📐

Уникальная фишка Python — **цепочки сравнений**. Вы можете писать условия так, как пишете в математике:

\`\`\`python
# Вместо этого (как в JavaScript):
if x > 0 and x < 10:
    print("x между 0 и 10")

# В Python можно написать так:
if 0 < x < 10:
    print("x между 0 и 10")
\`\`\`

Это читается естественнее и короче. Можно chaining любое количество сравнений:
\`\`\`python
if a <= b <= c <= d:
    print("Числа идут по возрастанию")
\`\`\``,
      },
      {
        kind: "code",
        title: "Цепочки сравнений в действии",
        code: `x = 7

# Простая цепочка
print(0 < x < 10)  # True — x больше 0 И x меньше 10

# Длинная цепочка
print(1 <= x <= 7 <= 9)  # True — все условия истинны

# Пример с переменными
a, b, c = 1, 5, 10
print(a < b < c)  # True — числа идут по возрастанию

# Практический пример: проверка диапазона
age = 25
if 18 <= age <= 65:
    print("Трудоспособный возраст")

# Можно комбинировать с другими операторами
score = 85
if 0 <= score <= 100:
    print("Валидный результат теста")`,
      },
      {
        kind: "text",
        md: `## Логические операторы: and, or, not

Логические операторы позволяют комбинировать условия:

- **\`and\`** — И (оба условия должны быть истинны)
- **\`or\`** — ИЛИ (хотя бы одно условие должно быть истинно)
- **\`not\`** — НЕ (инвертирует условие)

**Таблица истинности:**
\`\`\`
A     B     A and B    A or B    not A
True  True  True       True      False
True  False False      True      False
False True  False      True      True
False False False      False     True
\`\`\``,
      },
      {
        kind: "code",
        title: "Логические операторы",
        code: `# and — оба условия должны быть истинны
age = 25
has_license = True
if age >= 18 and has_license:
    print("Можно водить машину")

# or — хотя бы одно условие должно быть истинно
is_weekend = False
is_holiday = True
if is_weekend or is_holiday:
    print("Сегодня выходной")

# not — инвертирует условие
is_raining = False
if not is_raining:
    print("Можно идти гулять")

# Комбинирование операторов
temperature = 22
is_sunny = True
if temperature > 20 and is_sunny:
    print("Отличная погода для прогулки!")

# Приоритет операторов: not > and > or
# Используйте скобки для ясности
if (age >= 18 and has_license) or (age >= 16 and has_permit):
    print("Можно управлять транспортным средством")`,
      },
      {
        kind: "text",
        md: `## Truthy и Falsy значения

В Python каждое значение можно интерпретировать как \`True\` или \`False\` в булевом контексте.

**Falsy значения** (считаются \`False\`):
- \`False\` — логическое ложь
- \`None\` — отсутствие значения
- \`0\` — ноль (целое)
- \`0.0\` — ноль (дробное)
- \`""\` — пустая строка
- \`[]\` — пустой список
- \`{}\` — пустой словарь
- \`set()\` — пустое множество

**Truthy значения** (считаются \`True\`):
- Всё остальное, включая:
  - \`"0"\` — строка с нулём (не пустая!)
  - \`[0]\` — список с одним элементом 0
  - \`" "\` — строка с пробелом
  - \`-1\` — отрицательное число`,
      },
      {
        kind: "code",
        title: "Проверка на истинность",
        code: `# Falsy значения
print(bool(False))      # False
print(bool(None))       # False
print(bool(0))          # False
print(bool(0.0))        # False
print(bool(""))         # False
print(bool([]))         # False
print(bool({}))         # False

# Truthy значения
print(bool(True))       # True
print(bool(1))          # True
print(bool(-1))         # True
print(bool("0"))        # True — строка не пустая!
print(bool([0]))        # True — список не пустой!
print(bool(" "))        # True — строка с пробелом

# Практическое использование
name = ""
if not name:
    print("Имя не указано")

items = [1, 2, 3]
if items:
    print("Список не пустой")

# Избегайте явных сравнений
# Плохо:
if len(items) > 0:
    print("Есть элементы")

# Хорошо:
if items:
    print("Есть элементы")`,
      },
      {
        kind: "text",
        md: `## Операторы and/or возвращают значения

В Python операторы \`and\` и \`or\` возвращают **не \`True\`/\`False\`**, а **сами операнды**:

- **\`or\`** возвращает **первый истинный** операнд или последний, если все ложны
- **\`and\`** возвращает **первый ложный** операнд или последний, если все истинны

Это позволяет использовать их для присваивания значений по умолчанию.`,
      },
      {
        kind: "code",
        title: "and/or возвращают значения",
        code: `# or возвращает первый истинный операнд
print(0 or "дефолт")        # "дефолт" — 0 ложный, возвращается второй
print("" or "пусто")        # "пусто" — "" ложный
print(None or "нет")        # "нет" — None ложный
print("первый" or "второй") # "первый" — первый истинный

# and возвращает первый ложный операнд
print(1 and 2)              # 2 — оба истинны, возвращается последний
print(0 and "не дойдёт")    # 0 — первый ложный
print([] and "тоже нет")    # [] — первый ложный
print("первый" and "второй") # "второй" — оба истинны

# Практическое использование: значения по умолчанию
username = ""
display_name = username or "Гость"
print(f"Привет, {display_name}!")  # Привет, Гость!

# Цепочки операторов
result = None or 0 or "" or "найдено"
print(result)  # "найдено" — первое истинное значение`,
      },
      {
        kind: "text",
        md: `## Тернарный оператор: условие в одну строку

Тернарный оператор позволяет написать условие \`if-else\` в одну строку.

**Синтаксис:**
\`\`\`python
результат if условие else альтернатива
\`\`\`

**Аналогия в JavaScript:**
\`\`\`javascript
const result = условие ? значение1 : значение2;
\`\`\`

**В Python:**
\`\`\`python
result = значение1 if условие else значение2
\`\`\`

Это читается как английская фраза: "значение1, если условие, иначе значение2".`,
      },
      {
        kind: "code",
        title: "Тернарный оператор",
        code: `# Простой пример
age = 20
status = "взрослый" if age >= 18 else "несовершеннолетний"
print(status)  # взрослый

# Определение чётности
number = 7
parity = "чётное" if number % 2 == 0 else "нечётное"
print(f"{number} — {parity}")  # 7 — нечётное

# Максимум из двух чисел
a, b = 10, 20
maximum = a if a > b else b
print(f"Максимум: {maximum}")  # Максимум: 20

# Вложенный тернарный (не рекомендуется — сложно читать)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"
print(f"Оценка: {grade}")  # Оценка: B

# Практическое использование: обработка None
user_name = None
display_name = user_name if user_name else "Аноним"
print(f"Привет, {display_name}!")  # Привет, Аноним!`,
      },
      {
        kind: "text",
        md: `## Оператор in: проверка вхождения

Оператор \`in\` проверяет, содержится ли элемент в коллекции (строке, списке, словаре, множестве).

**Синтаксис:**
\`\`\`python
элемент in коллекция  # True, если элемент есть
элемент not in коллекция  # True, если элемента нет
\`\`\`

Это заменяет \`indexOf !== -1\` и \`includes\` из JavaScript и читается как обычная фраза: "элемент в коллекции".`,
      },
      {
        kind: "code",
        title: "Оператор in",
        code: `# Проверка в строке
print("Python" in "Я изучаю Python")  # True
print("Java" in "Я изучаю Python")    # False

# Проверка в списке
fruits = ["apple", "banana", "orange"]
print("banana" in fruits)  # True
print("grape" in fruits)   # False

# Проверка в словаре (проверяет ключи)
user = {"name": "Алиса", "age": 25}
print("name" in user)  # True
print("email" in user) # False

# Проверка в множестве
numbers = {1, 2, 3, 4, 5}
print(3 in numbers)    # True
print(10 in numbers)   # False

# not in — обратная проверка
print("Java" not in fruits)  # True

# Практическое использование
allowed_users = ["admin", "moderator", "user"]
current_user = "admin"

if current_user in allowed_users:
    print("Доступ разрешён")
else:
    print("Доступ запрещён")

# Проверка подстроки
text = "Привет, мир!"
if "мир" in text:
    print("Текст содержит слово 'мир'")`,
      },
      {
        kind: "warn",
        title: "Не путайте == и is!",
        md: `В Python есть два оператора сравнения:

- **\`==\`** — сравнивает **значения** (равны ли объекты по содержанию)
- **\`is\`** — сравнивает **идентичность** (это один и тот же объект в памяти?)

**Пример:**
\`\`\`python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)  # True — значения равны
print(a is b)  # False — это разные объекты в памяти

c = a
print(a is c)  # True — это один и тот же объект
\`\`\`

**Когда использовать \`is\`:**
- Сравнение с \`None\`: \`if x is None:\`
- Сравнение с \`True\`/\`False\`: \`if flag is True:\`

**Когда использовать \`==\`:**
- Сравнение значений: \`if x == 5:\``,
      },
      {
        kind: "code",
        title: "Примеры использования == и is",
        code: `# Сравнение значений
x = 10
print(x == 10)  # True

# Сравнение с None
result = None
if result is None:
    print("Результат не получен")

# Сравнение списков
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 == list2)  # True — значения равны
print(list1 is list2)  # False — разные объекты
print(list1 is list3)  # True — один объект

# Сравнение строк (оптимизация Python)
s1 = "hello"
s2 = "hello"
print(s1 == s2)  # True
print(s1 is s2)  # True — Python кэширует короткие строки

# Но не полагайтесь на это!
s3 = "hello" + " world"
s4 = "hello world"
print(s3 == s4)  # True
print(s3 is s4)  # Может быть False!`,
      },
      {
        kind: "tip",
        title: "Лучшие практики для условий",
        md: `**1. Избегайте вложенных условий:**
\`\`\`python
# Плохо:
if x > 0:
    if y > 0:
        print("Оба положительные")

# Хорошо:
if x > 0 and y > 0:
    print("Оба положительные")
\`\`\`

**2. Используйте ранний возврат (early return):**
\`\`\`python
# Плохо:
def process(data):
    if data:
        if data.is_valid():
            # много кода
            pass

# Хорошо:
def process(data):
    if not data:
        return
    if not data.is_valid():
        return
    # основной код
\`\`\`

**3. Используйте оператор in для множественных проверок:**
\`\`\`python
# Плохо:
if x == 1 or x == 2 or x == 3:
    print("Найдено")

# Хорошо:
if x in (1, 2, 3):
    print("Найдено")
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что вернёт выражение 'молоко' if False else 'кефир'?",
        options: ["'молоко'", "'кефир'", "False", "ошибку"],
        answer: 1,
        explain: "Тернарный оператор: значение перед if берётся при истинном условии, иначе — после else. Читается как 'молоко, если False, иначе кефир'.",
      },
      {
        q: "Какое значение ложное (falsy)?",
        options: ["'0'", "[0]", "None", "' ' (пробел)"],
        answer: 2,
        explain: "None — ложное. Непустая строка (даже из пробела) и непустой список — истинные. Строка '0' содержит символ, поэтому истинна.",
      },
      {
        q: "Что выведет: print(0 or 'дефолт')?",
        options: ["0", "'дефолт'", "False", "None"],
        answer: 1,
        explain: "Оператор or возвращает первый истинный операнд. 0 — ложный, поэтому возвращается 'дефолт'.",
      },
      {
        q: "Как проверить, что x находится между 0 и 10 (включительно)?",
        options: ["if x > 0 and x < 10:", "if 0 <= x <= 10:", "if x in range(10):", "if 0 < x < 10:"],
        answer: 1,
        explain: "В Python можно использовать цепочки сравнений: 0 <= x <= 10. Это читается естественно и работает как в математике.",
      },
      {
        q: "Что вернёт 'hello' is 'hello'?",
        options: ["True", "False", "Ошибку", "Зависит от версии Python"],
        answer: 0,
        explain: "Оператор is проверяет идентичность объектов. Python кэширует короткие строки, поэтому 'hello' is 'hello' вернёт True. Но не полагайтесь на это для длинных строк!",
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
      {
        id: "py2t3",
        title: "Определение сезона",
        md: `Реализуйте функцию \`get_season(month)\`, которая возвращает название сезона по номеру месяца (1-12):
- 12, 1, 2 → "зима"
- 3, 4, 5 → "весна"
- 6, 7, 8 → "лето"
- 9, 10, 11 → "осень"

Используйте цепочки сравнений или оператор \`in\`.`,
        starter: `def get_season(month):
    # ваш код
    pass

print(get_season(1), get_season(5), get_season(8), get_season(11))`,
        tests: `
__test("get_season(1) → 'зима'", lambda: get_season(1), "зима")
__test("get_season(12) → 'зима'", lambda: get_season(12), "зима")
__test("get_season(3) → 'весна'", lambda: get_season(3), "весна")
__test("get_season(7) → 'лето'", lambda: get_season(7), "лето")
__test("get_season(10) → 'осень'", lambda: get_season(10), "осень")`,
        solution: `def get_season(month):
    if month in (12, 1, 2):
        return "зима"
    if month in (3, 4, 5):
        return "весна"
    if month in (6, 7, 8):
        return "лето"
    if month in (9, 10, 11):
        return "осень"
    return "неизвестный месяц"`,
      },
      {
        id: "py2t4",
        title: "Проверка пароля",
        md: `Реализуйте функцию \`check_password(password)\`, которая проверяет надёжность пароля:
- Менее 8 символов → "слабый"
- 8-11 символов → "средний"
- 12 и более символов → "сильный"

Используйте тернарный оператор или if-elif-else.`,
        starter: `def check_password(password):
    # ваш код
    pass

print(check_password("123"), check_password("password"), check_password("VeryStrongPassword123"))`,
        tests: `
__test("короткий пароль", lambda: check_password("123"), "слабый")
__test("средний пароль", lambda: check_password("password"), "средний")
__test("длинный пароль", lambda: check_password("VeryStrongPassword123"), "сильный")
__test("ровно 8 символов", lambda: check_password("12345678"), "средний")
__test("ровно 12 символов", lambda: check_password("123456789012"), "сильный")`,
        solution: `def check_password(password):
    if len(password) < 8:
        return "слабый"
    if len(password) < 12:
        return "средний"
    return "сильный"`,
      },
    ],
  },

  {
    id: "py3",
    language: "python",
    title: "Циклы while и for",
    subtitle: "for..in, range, enumerate, break/continue и блок else",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Циклы: повторяем действия 🔁

Циклы позволяют выполнять код многократно. В Python два типа циклов:

- **\`for\`** — обходит элементы последовательности (список, строку, диапазон)
- **\`while\`** — выполняется, пока условие истинно

**Аналогия:** Представьте, что вы моете посуду:
- **for** — вы моете каждую тарелку из стопки (знаете, сколько тарелок)
- **while** — вы моете тарелки, пока не закончится грязная посуда (не знаете, сколько)`,
      },
      {
        kind: "text",
        md: `## Цикл for: обход элементов

В Python \`for\` обходит **сами элементы** последовательности, а не индексы. Это удобнее и читаемее, чем в JavaScript.

**Синтаксис:**
\`\`\`python
for элемент in последовательность:
    # код для каждого элемента
\`\`\`

**Что можно обходить:**
- Строки: \`for char in "привет":\`
- Списки: \`for item in [1, 2, 3]:\`
- Словари: \`for key in dict:\` (по ключам)
- Множества: \`for item in set:\`
- Диапазоны: \`for i in range(5):\``,
      },
      {
        kind: "code",
        title: "Простые примеры for",
        code: `# Обход строки
for char in "Python":
    print(char, end=" ")  # P y t h o n
print()

# Обход списка
fruits = ["яблоко", "банан", "апельсин"]
for fruit in fruits:
    print(f"Я люблю {fruit}")

# Обход словаря (по ключам)
user = {"name": "Алиса", "age": 25}
for key in user:
    print(f"{key}: {user[key]}")

# Обход словаря (ключи и значения)
for key, value in user.items():
    print(f"{key} = {value}")`,
      },
      {
        kind: "text",
        md: `## Функция range(): генерация чисел

\`range(start, stop, step)\` генерирует последовательность чисел.

**Параметры:**
- \`start\` — начало (по умолчанию 0)
- \`stop\` — конец (**не включается**!)
- \`step\` — шаг (по умолчанию 1)

**Важно:** \`stop\` не включается в результат! \`range(1, 5)\` даёт 1, 2, 3, 4 (не 5).

**Аналогия:** Представьте лифт с кнопками этажей 1-5. Вы нажимаете кнопки от 1 до 5, но лифт останавливается на 4, потому что 5 — это "stop" (не включается).`,
      },
      {
        kind: "code",
        title: "range() в действии",
        code: `# Простой диапазон
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4
print()

# С началом и концом
for i in range(1, 6):
    print(i, end=" ")  # 1 2 3 4 5
print()

# С шагом
for i in range(0, 10, 2):
    print(i, end=" ")  # 0 2 4 6 8
print()

# Обратный порядок
for i in range(10, 0, -2):
    print(i, end=" ")  # 10 8 6 4 2
print()

# Преобразование в список
numbers = list(range(1, 6))
print(numbers)  # [1, 2, 3, 4, 5]

# Практический пример: таблица умножения
number = 5
for i in range(1, 11):
    print(f"{number} × {i} = {number * i}")`,
      },
      {
        kind: "text",
        md: `## Функция enumerate(): индексы + элементы

Иногда нужны и индексы, и элементы. Вместо ручного счётчика используйте \`enumerate()\`.

**Синтаксис:**
\`\`\`python
for индекс, элемент in enumerate(последовательность):
    # код
\`\`\`

**Аналогия:** Представьте, что вы ведёте список покупок с номерами:
1. Молоко
2. Хлеб
3. Яйца

\`enumerate()\` автоматически добавляет номера к элементам.`,
      },
      {
        kind: "code",
        title: "enumerate() в примерах",
        code: `# Без enumerate (плохо)
fruits = ["яблоко", "банан", "апельсин"]
i = 0
for fruit in fruits:
    print(f"{i}: {fruit}")
    i += 1

# С enumerate (хорошо)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Со стартовым индексом
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# Практический пример: нумерация строк
text = """Первая строка
Вторая строка
Третья строка"""

for i, line in enumerate(text.split("\\n"), 1):
    print(f"{i}: {line}")`,
      },
      {
        kind: "text",
        md: `## Цикл while: условие выполнения

\`while\` выполняется, пока условие истинно. Используйте, когда не знаете заранее, сколько раз нужно повторить.

**Синтаксис:**
\`\`\`python
while условие:
    # код
\`\`\`

**Важно:** Убедитесь, что условие когда-нибудь станет ложным, иначе получите бесконечный цикл!`,
      },
      {
        kind: "code",
        title: "Примеры while",
        code: `# Простой счётчик
count = 0
while count < 5:
    print(count, end=" ")
    count += 1
print()

# Ввод данных от пользователя
password = ""
while password != "secret":
    password = input("Введите пароль: ")
print("Доступ разрешён!")

# Обратный отсчёт
n = 5
while n > 0:
    print(n, end=" ")
    n -= 1
print("Пуск!")

# Бесконечный цикл (с break)
while True:
    command = input("Команда (exit для выхода): ")
    if command == "exit":
        break
    print(f"Вы ввели: {command}")`,
      },
      {
        kind: "text",
        md: `## break и continue: управление циклом

**\`break\`** — немедленно выходит из цикла.

**\`continue\`** — переходит к следующей итерации, пропуская оставшийся код.

**Аналогия:**
- **break** — вы нашли нужную книгу в библиотеке и уходите
- **continue** — вы пропускаете книгу на полке и идёте к следующей`,
      },
      {
        kind: "code",
        title: "break и continue",
        code: `# break: выход при нахождении
numbers = [1, 3, 5, 8, 9, 11]
for num in numbers:
    if num % 2 == 0:
        print(f"Нашёл чётное: {num}")
        break
    print(f"Проверяю: {num}")

# continue: пропуск нечётных
for i in range(10):
    if i % 2 != 0:
        continue  # пропускаем нечётные
    print(i, end=" ")  # 0 2 4 6 8
print()

# Практический пример: фильтрация
words = ["Python", "is", "awesome", "and", "powerful"]
for word in words:
    if len(word) <= 3:
        continue  # пропускаем короткие слова
    print(word.upper())`,
      },
      {
        kind: "text",
        md: `## else у цикла: уникальная фишка Python 🎯

У циклов \`for\` и \`while\` может быть блок \`else\`. Он выполняется, когда цикл **завершился нормально** (без \`break\`).

**Синтаксис:**
\`\`\`python
for item in items:
    if condition:
        break
else:
    # выполняется, если break не сработал
\`\`\`

**Аналогия:** Представьте, что вы ищете ключи в комнате:
- Если нашли ключи → \`break\` → \`else\` не выполняется
- Если обошли всю комнату и не нашли → \`else\` выполняется`,
      },
      {
        kind: "code",
        title: "else у цикла",
        code: `# Поиск элемента с else
numbers = [1, 3, 5, 7, 9]
target = 6

for num in numbers:
    if num == target:
        print(f"Нашёл {target}!")
        break
else:
    print(f"{target} не найден")  # выполнится

# Проверка на простые числа
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            print(f"{n} делится на {i}")
            return False
    else:
        print(f"{n} — простое число")
        return True

is_prime(7)   # 7 — простое число
is_prime(12)  # 12 делится на 2

# while с else
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Цикл завершён нормально")`,
      },
      {
        kind: "text",
        md: `## Вложенные циклы

Циклы можно вкладывать друг в друга. Внутренний цикл выполняется полностью для каждой итерации внешнего.

**Важно:** Вложенные циклы могут быть медленными! Если внешний цикл выполняется N раз, а внутренний M раз, общее количество итераций — N × M.`,
      },
      {
        kind: "code",
        title: "Вложенные циклы",
        code: `# Таблица умножения
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="\\t")
    print()

# Перебор двумерного списка
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for item in row:
        print(item, end=" ")
    print()

# Практический пример: все комбинации
colors = ["красный", "синий"]
sizes = ["S", "M", "L"]

for color in colors:
    for size in sizes:
        print(f"{color} {size}")`,
      },
      {
        kind: "warn",
        title: "Stop не включается",
        md: `\`range(1, 5)\` — это 1, 2, 3, 4. Правило «полуинтервала» соблюдается везде: срезы, \`range\`, \`islice\`. Длина всегда \`stop - start\` — удобно, но непривычно первые пару недель.

**Почему так?** Это позволяет легко вычислять длину:
\`\`\`python
len(range(1, 5))  # 5 - 1 = 4
\`\`\``,
      },
      {
        kind: "tip",
        title: "Когда какой цикл использовать?",
        md: `**Используйте \`for\`, когда:**
- Знаете количество итераций
- Обходите коллекцию (список, строку, словарь)
- Нужны индексы (с \`enumerate\`)

**Используйте \`while\`, когда:**
- Не знаете количество итераций
- Условие зависит от внешних факторов
- Нужен бесконечный цикл с \`break\`

**Совет:** В 90% случаев \`for\` предпочтительнее — он безопаснее и читаемее.`,
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
      {
        q: "Что делает enumerate()?",
        options: [
          "Сортирует элементы",
          "Возвращает пары (индекс, элемент)",
          "Подсчитывает количество элементов",
          "Фильтрует элементы",
        ],
        answer: 1,
        explain: "enumerate() возвращает пары (индекс, элемент), что удобно, когда нужны и индексы, и значения.",
      },
      {
        q: "Что делает break?",
        options: [
          "Пропускает текущую итерацию",
          "Немедленно выходит из цикла",
          "Останавливает программу",
          "Перезапускает цикл",
        ],
        answer: 1,
        explain: "break немедленно выходит из цикла, игнорируя оставшиеся итерации и блок else.",
      },
      {
        q: "Сколько раз выполнится внутренний цикл: for i in range(3): for j in range(4):?",
        options: ["3 раза", "4 раза", "7 раз", "12 раз"],
        answer: 3,
        explain: "Вложенные циклы: внешний выполняется 3 раза, внутренний — 4 раза для каждой итерации внешнего. Итого: 3 × 4 = 12 раз.",
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
      {
        id: "py3t3",
        title: "Факториал",
        md: `Реализуйте функцию \`factorial(n)\`, которая вычисляет факториал числа n (произведение всех чисел от 1 до n) с помощью цикла. \`factorial(5)\` → \`120\` (1×2×3×4×5).`,
        starter: `def factorial(n):
    # ваш код с циклом
    pass

print(factorial(5), factorial(10))`,
        tests: `
__test("factorial(0) → 1", lambda: factorial(0), 1)
__test("factorial(1) → 1", lambda: factorial(1), 1)
__test("factorial(5) → 120", lambda: factorial(5), 120)
__test("factorial(10) → 3628800", lambda: factorial(10), 3628800)`,
        solution: `def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result`,
      },
      {
        id: "py3t4",
        title: "Поиск простого числа",
        md: `Реализуйте функцию \`find_first_prime(start)\`, которая находит первое простое число, большее или равное \`start\`. Используйте цикл с \`else\`. Простое число делится только на 1 и на себя.`,
        starter: `def find_first_prime(start):
    # ваш код с циклом и else
    pass

print(find_first_prime(10), find_first_prime(20))`,
        tests: `
__test("find_first_prime(10) → 11", lambda: find_first_prime(10), 11)
__test("find_first_prime(20) → 23", lambda: find_first_prime(20), 23)
__test("find_first_prime(1) → 2", lambda: find_first_prime(1), 2)
__test("find_first_prime(100) → 101", lambda: find_first_prime(100), 101)`,
        solution: `def find_first_prime(start):
    n = max(2, start)
    while True:
        for i in range(2, n):
            if n % i == 0:
                break
        else:
            return n
        n += 1`,
      },
    ],
  },

  {
    id: "py4",
    language: "python",
    title: "Функции",
    subtitle: "def, *args и **kwargs, lambda, функции как значения",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Функции: переиспользуемый код 🛠️

Функции — это блоки кода, которые можно вызывать многократно. Они помогают:
- Избежать дублирования кода
- Сделать код более читаемым
- Разбить сложную задачу на простые части

**Аналогия:** Представьте, что вы готовите блюдо. Вместо того чтобы каждый раз описывать весь процесс, вы создаёте рецепт (функцию) и используете его, когда нужно.

**Синтаксис:**
\`\`\`python
def имя_функции(параметры):
    # код функции
    return результат
\`\`\``,
      },
      {
        kind: "text",
        md: `## Создание функций с def

Ключевое слово \`def\` (define) объявляет функцию. После него идёт имя функции, параметры в скобках и двоеточие.

**Правила именования:**
- Используйте \`snake_case\`: \`calculate_total\`, \`get_user_name\`
- Имя должно описывать, что делает функция
- Избегайте однобуквенных имён (кроме очень коротких функций)`,
      },
      {
        kind: "code",
        title: "Простые функции",
        code: `# Функция без параметров
def greet():
    print("Привет, мир!")

greet()

# Функция с параметрами
def greet_user(name):
    print(f"Привет, {name}!")

greet_user("Алиса")
greet_user("Боб")

# Функция с возвратом значения
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# Функция с несколькими return
def check_number(n):
    if n > 0:
        return "положительное"
    elif n < 0:
        return "отрицательное"
    else:
        return "ноль"

print(check_number(5))    # положительное
print(check_number(-3))   # отрицательное
print(check_number(0))    # ноль`,
      },
      {
        kind: "text",
        md: `## Параметры по умолчанию

Вы можете задать значения по умолчанию для параметров. Если аргумент не передан, используется значение по умолчанию.

**Важно:** Параметры со значениями по умолчанию должны идти **после** обязательных параметров!`,
      },
      {
        kind: "code",
        title: "Параметры по умолчанию",
        code: `# Параметры по умолчанию
def greet(name, greeting="Привет"):
    print(f"{greeting}, {name}!")

greet("Алиса")              # Привет, Алиса!
greet("Боб", "Здравствуйте") # Здравствуйте, Боб!

# Математическая функция
def power(base, exp=2):
    """Возводит base в степень exp."""
    return base ** exp

print(power(5))       # 25 (5²)
print(power(2, 10))   # 1024 (2¹⁰)
print(power(3, 3))    # 27 (3³)

# Функция с несколькими параметрами по умолчанию
def create_user(name, age=18, city="Москва"):
    return {"name": name, "age": age, "city": city}

print(create_user("Алиса"))
print(create_user("Боб", 25))
print(create_user("Виктор", 30, "Санкт-Петербург"))`,
      },
      {
        kind: "text",
        md: `## Именованные аргументы

При вызове функции можно передавать аргументы по имени. Это делает код более читаемым и позволяет менять порядок аргументов.

**Преимущества:**
- Код становится самодокументируемым
- Можно пропускать параметры по умолчанию
- Порядок аргументов не важен`,
      },
      {
        kind: "code",
        title: "Именованные аргументы",
        code: `def create_profile(name, age, city):
    return f"{name}, {age} лет, город: {city}"

# Позиционные аргументы
print(create_profile("Алиса", 25, "Москва"))

# Именованные аргументы (порядок не важен)
print(create_profile(city="СПб", name="Боб", age=30))

# Смешанный вызов (позиционные + именованные)
print(create_profile("Виктор", age=35, city="Казань"))

# Практический пример
def send_email(to, subject, body, cc=None, bcc=None):
    print(f"Кому: {to}")
    print(f"Тема: {subject}")
    print(f"Текст: {body}")
    if cc:
        print(f"Копия: {cc}")
    if bcc:
        print(f"Скрытая копия: {bcc}")

# Пропускаем cc, указываем bcc
send_email(
    to="user@example.com",
    subject="Привет",
    body="Как дела?",
    bcc="admin@example.com"
)`,
      },
      {
        kind: "text",
        md: `## *args: произвольное количество аргументов

\`*args\` позволяет функции принимать произвольное количество позиционных аргументов. Все аргументы собираются в кортеж (tuple).

**Когда использовать:**
- Когда не знаете заранее, сколько аргументов будет передано
- Для функций, работающих с коллекциями чисел`,
      },
      {
        kind: "code",
        title: "*args в действии",
        code: `# Функция с произвольным количеством аргументов
def sum_all(*nums):
    """Суммирует все переданные числа."""
    return sum(nums)

print(sum_all(1, 2, 3))        # 6
print(sum_all(1, 2, 3, 4, 5))  # 15
print(sum_all())                # 0

# args — это кортеж
def print_args(*args):
    print(f"Тип: {type(args)}")
    print(f"Значения: {args}")
    for i, arg in enumerate(args):
        print(f"  {i}: {arg}")

print_args("a", "b", "c")

# Комбинирование обычных и *args
def multiply(first, *others):
    result = first
    for num in others:
        result *= num
    return result

print(multiply(2, 3, 4))  # 24 (2 * 3 * 4)
print(multiply(5, 10))    # 50 (5 * 10)`,
      },
      {
        kind: "text",
        md: `## **kwargs: произвольное количество именованных аргументов

\`**kwargs\` позволяет функции принимать произвольное количество именованных аргументов. Все аргументы собираются в словарь (dict).

**Когда использовать:**
- Для конфигурационных функций
- Когда нужно передать произвольные параметры
- Для декораторов и обёрток`,
      },
      {
        kind: "code",
        title: "**kwargs в действии",
        code: `# Функция с произвольными именованными аргументами
def print_info(**kwargs):
    """Выводит всю переданную информацию."""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Алиса", age=25, city="Москва")
print_info(product="Книга", price=500, pages=300)

# kwargs — это словарь
def settings(**kwargs):
    print(f"Тип: {type(kwargs)}")
    return kwargs

config = settings(theme="dark", language="ru", notifications=True)
print(config)

# Комбинирование *args и **kwargs
def flexible_function(*args, **kwargs):
    print("Позиционные:", args)
    print("Именованные:", kwargs)

flexible_function(1, 2, 3, name="Алиса", age=25)

# Практический пример: создание HTML-тега
def create_tag(tag_name, **attributes):
    attrs = " ".join(f'{k}="{v}"' for k, v in attributes.items())
    if attrs:
        return f"<{tag_name} {attrs}></{tag_name}>"
    return f"<{tag_name}></{tag_name}>"

print(create_tag("div", id="main", class="container"))
print(create_tag("img", src="image.jpg", alt="Фото"))`,
      },
      {
        kind: "text",
        md: `## Docstring: документация функций

Docstring — это строка документации, которая описывает, что делает функция. Она должна быть первой строкой после \`def\`.

**Зачем нужна:**
- Помогает другим разработчикам понять функцию
- Отображается в IDE при наведении
- Доступна через \`function.__doc__\``,
      },
      {
        kind: "code",
        title: "Правильная документация",
        code: `def calculate_bmi(weight, height):
    """
    Вычисляет индекс массы тела (ИМТ).
    
    Args:
        weight (float): Вес в килограммах
        height (float): Рост в метрах
        
    Returns:
        float: Индекс массы тела
        
    Example:
        >>> calculate_bmi(70, 1.75)
        22.86
    """
    return weight / (height ** 2)

# Доступ к документации
print(calculate_bmi.__doc__)

# Использование
bmi = calculate_bmi(70, 1.75)
print(f"Ваш ИМТ: {bmi:.2f}")

# Ещё пример
def find_max(numbers):
    """
    Находит максимальное число в списке.
    
    Args:
        numbers (list): Список чисел
        
    Returns:
        int/float: Максимальное число
        
    Raises:
        ValueError: Если список пустой
    """
    if not 
        raise ValueError("Список не может быть пустым")
    return max(numbers)`,
      },
      {
        kind: "text",
        md: `## Lambda-функции: анонимные функции

\`lambda\` — это способ создать маленькую анонимную функцию в одну строку.

**Синтаксис:**
\`\`\`python
lambda параметры: выражение
\`\`\`

**Когда использовать:**
- Для простых однострочных операций
- Как аргументы для функций высшего порядка (\`sorted\`, \`map\`, \`filter\`)
- Когда функция нужна только один раз`,
      },
      {
        kind: "code",
        title: "Lambda в примерах",
        code: `# Простая lambda
double = lambda x: x * 2
print(double(5))  # 10

# Эквивалент с def
def double_def(x):
    return x * 2

# Lambda с несколькими параметрами
add = lambda a, b: a + b
print(add(3, 4))  # 7

# Использование с sorted
words = ["python", "java", "c", "javascript"]
print(sorted(words))                      # по алфавиту
print(sorted(words, key=len))             # по длине
print(sorted(words, key=lambda w: w[-1])) # по последней букве

# Использование с map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Использование с filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# Lambda с условием
check = lambda x: "чётное" if x % 2 == 0 else "нечётное"
print(check(5))  # нечётное
print(check(8))  # чётное`,
      },
      {
        kind: "text",
        md: `## Функции как объекты первого класса

В Python функции — это объекты. Их можно:
- Присваивать переменным
- Передавать как аргументы
- Возвращать из других функций
- Сохранять в коллекциях

Это делает Python **функциональным** языком (частично).`,
      },
      {
        kind: "code",
        title: "Функции как объекты",
        code: `# Присваивание переменной
def greet(name):
    return f"Привет, {name}!"

say_hello = greet
print(say_hello("Алиса"))  # Привет, Алиса!

# Передача как аргумент
def apply_function(func, value):
    return func(value)

result = apply_function(double, 5)
print(result)  # 10

# Возврат функции
def make_multiplier(factor):
    def multiplier(x):
        return x * factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))   # 10
print(triple(5))   # 15

# Функции в коллекциях
operations = {
    "add": lambda a, b: a + b,
    "subtract": lambda a, b: a - b,
    "multiply": lambda a, b: a * b,
}

print(operations["add"](5, 3))      # 8
print(operations["multiply"](4, 6)) # 24`,
      },
      {
        kind: "tip",
        title: "Когда lambda, когда def",
        md: `**Используйте lambda, когда:**
- Функция очень простая (одно выражение)
- Нужна только один раз
- Передаётся как аргумент (\`sorted\`, \`map\`, \`filter\`)

**Используйте def, когда:**
- Функция сложная (несколько строк)
- Нужна документация (docstring)
- Будете использовать многократно
- Нужны условия и циклы

**Правило:** Если lambda становится слишком сложной — превратите её в \`def\`.`,
      },
      {
        kind: "warn",
        title: "Избегайте изменяемых параметров по умолчанию",
        md: `**Плохо:**
\`\`\`python
def add_item(item, lst=[]):  # ОПАСНО!
    lst.append(item)
    return lst
\`\`\`

Список создаётся **один раз** при определении функции, а не при каждом вызове!

**Хорошо:**
\`\`\`python
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
\`\`\`

Используйте \`None\` как значение по умолчанию и создавайте объект внутри функции.`,
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
      {
        q: "Что такое *args?",
        options: [
          "Обязательный аргумент",
          "Произвольное количество позиционных аргументов в кортеже",
          "Именованный аргумент",
          "Аргумент по умолчанию",
        ],
        answer: 1,
        explain: "*args позволяет функции принимать произвольное количество позиционных аргументов, которые собираются в кортеж.",
      },
      {
        q: "Как правильно написать lambda-функцию для удвоения числа?",
        options: [
          "lambda x: x * 2",
          "lambda: x * 2",
          "def lambda(x): x * 2",
          "lambda x => x * 2",
        ],
        answer: 0,
        explain: "Синтаксис lambda: lambda параметры: выражение. Lambda не использует def и =>.",
      },
      {
        q: "Что вернёт list(map(lambda x: x ** 2, [1, 2, 3]))?",
        options: ["[1, 2, 3]", "[1, 4, 9]", "[2, 4, 6]", "[1, 8, 27]"],
        answer: 1,
        explain: "map применяет функцию к каждому элементу: 1²=1, 2²=4, 3²=9.",
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
      {
        id: "py4t3",
        title: "Фабрика функций",
        md: `Реализуйте \`make_adder(n)\`, которая возвращает функцию, добавляющую \`n\` к своему аргументу. \`add5 = make_adder(5); add5(10)\` → \`15\`.`,
        starter: `def make_adder(n):
    # верните функцию
    pass

add5 = make_adder(5)
print(add5(10), add5(20))`,
        tests: `
__test("make_adder(5)(10) → 15", lambda: make_adder(5)(10), 15)
__test("make_adder(10)(5) → 15", lambda: make_adder(10)(5), 15)
__test("make_adder(0)(100) → 100", lambda: make_adder(0)(100), 100)
__test("make_adder(-3)(10) → 7", lambda: make_adder(-3)(10), 7)`,
        solution: `def make_adder(n):
    def adder(x):
        return x + n
    return adder`,
      },
      {
        id: "py4t4",
        title: "Сумма с *args",
        md: `Реализуйте \`sum_of_squares(*nums)\`, которая принимает произвольное количество чисел и возвращает сумму их квадратов. \`sum_of_squares(1, 2, 3)\` → \`14\` (1² + 2² + 3²).`,
        starter: `def sum_of_squares(*nums):
    # ваш код с *args
    pass

print(sum_of_squares(1, 2, 3))
print(sum_of_squares(2, 4))`,
        tests: `
__test("sum_of_squares(1, 2, 3) → 14", lambda: sum_of_squares(1, 2, 3), 14)
__test("sum_of_squares(2, 4) → 20", lambda: sum_of_squares(2, 4), 20)
__test("sum_of_squares() → 0", lambda: sum_of_squares(), 0)
__test("sum_of_squares(5) → 25", lambda: sum_of_squares(5), 25)`,
        solution: `def sum_of_squares(*nums):
    return sum(x ** 2 for x in nums)`,
      },
    ],
  },

  {
    id: "py5",
    language: "python",
    title: "Списки и срезы",
    subtitle: "Индексы, slice, list comprehensions — визитная карточка языка",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Списки: упорядоченные коллекции 📋

Список — это **упорядоченная изменяемая** коллекция элементов. Это самая популярная структура данных в Python.

**Аналогия:** Представьте список покупок:
- Вы можете добавлять товары
- Можете удалять товары
- Можете менять порядок
- Каждый товар имеет свой номер (индекс)

**Основные особенности:**
- **Упорядоченность** — элементы хранятся в порядке добавления
- **Изменяемость** — можно добавлять, удалять, изменять элементы
- **Индексируемость** — доступ по индексу (начинается с 0)
- **Допускает дубликаты** — одни и те же значения могут повторяться`,
      },
      {
        kind: "text",
        md: `## Создание списков

Список создаётся квадратными скобками \`[]\` или функцией \`list()\`.

**Синтаксис:**
\`\`\`python
my_list = [элемент1, элемент2, элемент3]
\`\`\``,
      },
      {
        kind: "code",
        title: "Создание списков",
        code: `# Пустой список
empty = []
print(empty)  # []

# Список с элементами
numbers = [1, 2, 3, 4, 5]
print(numbers)

# Смешанные типы (не рекомендуется, но возможно)
mixed = [1, "два", 3.0, True]
print(mixed)

# Из строки
chars = list("Python")
print(chars)  # ['P', 'y', 't', 'h', 'o', 'n']

# Из range
nums = list(range(5))
print(nums)  # [0, 1, 2, 3, 4]

# Вложенные списки (матрица)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix)`,
      },
      {
        kind: "text",
        md: `## Доступ к элементам: индексы

Элементы списка нумеруются с **0**. Также поддерживаются **отрицательные индексы** — отсчёт с конца.

**Индексы:**
- \`0\` — первый элемент
- \`1\` — второй элемент
- \`-1\` — последний элемент
- \`-2\` — предпоследний элемент`,
      },
      {
        kind: "code",
        title: "Индексы в действии",
        code: `fruits = ["яблоко", "банан", "апельсин", "груша"]

# Положительные индексы (с начала)
print(fruits[0])  # яблоко
print(fruits[1])  # банан
print(fruits[2])  # апельсин

# Отрицательные индексы (с конца)
print(fruits[-1])  # груша (последний)
print(fruits[-2])  # апельсин (предпоследний)
print(fruits[-3])  # банан

# Изменение элемента
fruits[1] = "манго"
print(fruits)  # ['яблоко', 'манго', 'апельсин', 'груша']

# Длина списка
print(len(fruits))  # 4`,
      },
      {
        kind: "text",
        md: `## Методы списков: добавление элементов

Списки имеют множество методов для работы с элементами.

**Основные методы добавления:**
- \`append(x)\` — добавить элемент в конец
- \`extend(iterable)\` — добавить все элементы из другой коллекции
- \`insert(i, x)\` — вставить элемент по индексу`,
      },
      {
        kind: "code",
        title: "Добавление элементов",
        code: `# append — добавление в конец
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # [1, 2, 3, 4]

# extend — добавление нескольких элементов
numbers.extend([5, 6, 7])
print(numbers)  # [1, 2, 3, 4, 5, 6, 7]

# insert — вставка по индексу
numbers.insert(0, 0)  # вставить 0 на позицию 0
print(numbers)  # [0, 1, 2, 3, 4, 5, 6, 7]

numbers.insert(3, 99)  # вставить 99 на позицию 3
print(numbers)  # [0, 1, 2, 99, 3, 4, 5, 6, 7]

# Разница между append и extend
a = [1, 2]
a.append([3, 4])
print(a)  # [1, 2, [3, 4]] — список как один элемент

b = [1, 2]
b.extend([3, 4])
print(b)  # [1, 2, 3, 4] — элементы добавлены по отдельности`,
      },
      {
        kind: "text",
        md: `## Методы списков: удаление элементов

**Основные методы удаления:**
- \`remove(x)\` — удалить первое вхождение значения x
- \`pop(i)\` — удалить и вернуть элемент по индексу i
- \`pop()\` — удалить и вернуть последний элемент
- \`clear()\` — очистить весь список`,
      },
      {
        kind: "code",
        title: "Удаление элементов",
        code: `# remove — удаление по значению
fruits = ["яблоко", "банан", "апельсин", "банан"]
fruits.remove("банан")  # удаляет первое вхождение
print(fruits)  # ['яблоко', 'апельсин', 'банан']

# pop — удаление по индексу
numbers = [1, 2, 3, 4, 5]
removed = numbers.pop(2)  # удаляет элемент с индексом 2
print(removed)  # 3
print(numbers)  # [1, 2, 4, 5]

# pop без аргумента — удаляет последний
last = numbers.pop()
print(last)  # 5
print(numbers)  # [1, 2, 4]

# clear — очистка списка
numbers.clear()
print(numbers)  # []

# del — удаление по индексу или срезу
numbers = [1, 2, 3, 4, 5, 6, 7]
del numbers[0]  # удалить первый элемент
print(numbers)  # [2, 3, 4, 5, 6, 7]

del numbers[1:3]  # удалить срез
print(numbers)  # [2, 5, 6, 7]`,
      },
      {
        kind: "text",
        md: `## Другие полезные методы списков

**Поиск и подсчёт:**
- \`index(x)\` — индекс первого вхождения x
- \`count(x)\` — количество вхождений x

**Сортировка:**
- \`sort()\` — сортировка списка на месте
- \`reverse()\` — разворот списка на месте
- \`sorted(list)\` — возвращает новый отсортированный список
- \`reversed(list)\` — возвращает итератор в обратном порядке`,
      },
      {
        kind: "code",
        title: "Поиск, подсчёт, сортировка",
        code: `# index и count
numbers = [1, 2, 3, 2, 4, 2, 5]
print(numbers.index(2))  # 1 (первое вхождение)
print(numbers.count(2))  # 3 (количество двоек)

# sort — сортировка на месте
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Сортировка в обратном порядке
numbers.sort(reverse=True)
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted — возвращает новый список
original = [3, 1, 4, 1, 5]
sorted_copy = sorted(original)
print(original)  # [3, 1, 4, 1, 5] — не изменился
print(sorted_copy)  # [1, 1, 3, 4, 5]

# reverse — разворот
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]

# reversed — возвращает итератор
numbers = [1, 2, 3]
for num in reversed(numbers):
    print(num, end=" ")  # 3 2 1`,
      },
      {
        kind: "text",
        md: `## Срезы: мощный инструмент 🎯

Срез (slice) — это способ получить часть списка. Синтаксис:

\`\`\`python
list[start:stop:step]
\`\`\`

- \`start\` — начальный индекс (включается)
- \`stop\` — конечный индекс (**не включается**!)
- \`step\` — шаг (по умолчанию 1)

**Важно:** \`stop\` не включается в результат!`,
      },
      {
        kind: "code",
        title: "Основы срезов",
        code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Простой срез [start:stop]
print(numbers[2:5])  # [2, 3, 4] — индексы 2, 3, 4

# Без start — с начала
print(numbers[:4])  # [0, 1, 2, 3]

# Без stop — до конца
print(numbers[6:])  # [6, 7, 8, 9]

# С шагом [start:stop:step]
print(numbers[1:8:2])  # [1, 3, 5, 7] — каждый второй

# Отрицательный шаг — разворот
print(numbers[::-1])  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Каждый третий в обратном порядке
print(numbers[::-3])  # [9, 6, 3, 0]

# Копирование списка
copy = numbers[:]
print(copy == numbers)  # True
print(copy is numbers)  # False — разные объекты`,
      },
      {
        kind: "code",
        title: "Практические примеры срезов",
        code: `# Первые N элементов
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[:5])  # [0, 1, 2, 3, 4]

# Последние N элементов
print(numbers[-3:])  # [7, 8, 9]

# Всё кроме первых N
print(numbers[3:])  # [3, 4, 5, 6, 7, 8, 9]

# Всё кроме последних N
print(numbers[:-3])  # [0, 1, 2, 3, 4, 5, 6]

# Чётные индексы
print(numbers[::2])  # [0, 2, 4, 6, 8]

# Нечётные индексы
print(numbers[1::2])  # [1, 3, 5, 7, 9]

# Палиндром?
word = "радар"
print(word == word[::-1])  # True

# Разворот строки
text = "Python"
print(text[::-1])  # nohtyP`,
      },
      {
        kind: "text",
        md: `## Операции со списками

**Конкатенация (+):** объединение двух списков
**Повторение (*):** повторение списка N раз
**Проверка вхождения (in):** есть ли элемент в списке`,
      },
      {
        kind: "code",
        title: "Операции со списками",
        code: `# Конкатенация (+)
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Повторение (*)
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]

pattern = [1, 2] * 3
print(pattern)  # [1, 2, 1, 2, 1, 2]

# Проверка вхождения (in)
fruits = ["яблоко", "банан", "апельсин"]
print("банан" in fruits)  # True
print("груша" in fruits)  # False
print("груша" not in fruits)  # True

# min, max, sum
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(min(numbers))  # 1
print(max(numbers))  # 9
print(sum(numbers))  # 31

# Сравнение списков
a = [1, 2, 3]
b = [1, 2, 3]
c = [1, 2, 4]
print(a == b)  # True
print(a == c)  # False`,
      },
      {
        kind: "text",
        md: `## List comprehensions: генераторы списков 🚀

List comprehension — это компактный способ создания списков. Синтаксис:

\`\`\`python
[выражение for элемент in коллекция if условие]
\`\`\`

Это **идиома номер один** в Python — вы будете видеть её постоянно.`,
      },
      {
        kind: "code",
        title: "List comprehensions",
        code: `# Квадраты чисел
squares = [x ** 2 for x in range(6)]
print(squares)  # [0, 1, 4, 9, 16, 25]

# Эквивалент с циклом
squares = []
for x in range(6):
    squares.append(x ** 2)

# С условием (фильтрация)
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Длина строк
words = ["код", "ещё код", "питон"]
lengths = [len(w) for w in words]
print(lengths)  # [3, 7, 5]

# Преобразование типов
strings = ["1", "2", "3", "4"]
numbers = [int(s) for s in strings]
print(numbers)  # [1, 2, 3, 4]

# Фильтрация и преобразование
prices = [120, 45, 300, 78]
discounted = [p * 0.9 for p in prices if p > 100]
print(discounted)  # [108.0, 270.0]

# Двумерный список (матрица)
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
      },
      {
        kind: "text",
        md: `## Вложенные списки (матрицы)

Списки могут содержать другие списки. Это называется вложенными списками или матрицами.

**Доступ к элементам:**
\`\`\`python
matrix[i][j]  # элемент в строке i, столбце j
\`\`\``,
      },
      {
        kind: "code",
        title: "Работа с матрицами",
        code: `# Создание матрицы 3x3
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Доступ к элементам
print(matrix[0])  # [1, 2, 3] — первая строка
print(matrix[0][0])  # 1 — первый элемент первой строки
print(matrix[1][2])  # 6 — третий элемент второй строки
print(matrix[-1][-1])  # 9 — последний элемент

# Изменение элемента
matrix[1][1] = 99
print(matrix)

# Обход матрицы
for row in matrix:
    for item in row:
        print(item, end=" ")
    print()

# Транспонирование матрицы
transposed = [[matrix[j][i] for j in range(len(matrix))] 
              for i in range(len(matrix[0]))]
print(transposed)`,
      },
      {
        kind: "warn",
        title: "Присваивание не копирует!",
        md: `\`b = a\` — это второе имя **того же** списка. Изменение \`b\` изменит и \`a\`!

**Плохо:**
\`\`\`python
a = [1, 2, 3]
b = a
b.append(4)
print(a)  # [1, 2, 3, 4] — a тоже изменился!
\`\`\`

**Хорошо — создавайте копию:**
\`\`\`python
a = [1, 2, 3]
b = a[:]  # или list(a), или a.copy()
b.append(4)
print(a)  # [1, 2, 3] — a не изменился
\`\`\`

**Вложенные списки:** для глубокой копии используйте \`copy.deepcopy()\`.`,
      },
      {
        kind: "code",
        title: "Копирование списков",
        code: `# Поверхностная копия
original = [1, 2, 3]
copy1 = original[:]
copy2 = list(original)
copy3 = original.copy()

copy1.append(4)
print(original)  # [1, 2, 3] — не изменился
print(copy1)  # [1, 2, 3, 4]

# Проблема с вложенными списками
matrix = [[1, 2], [3, 4]]
shallow_copy = matrix[:]
shallow_copy[0][0] = 99
print(matrix[0][0])  # 99 — изменился и оригинал!

# Глубокая копия
import copy
matrix = [[1, 2], [3, 4]]
deep_copy = copy.deepcopy(matrix)
deep_copy[0][0] = 99
print(matrix[0][0])  # 1 — оригинал не изменился`,
      },
      {
        kind: "tip",
        title: "Когда использовать списки?",
        md: `**Используйте списки, когда:**
- Нужна упорядоченная коллекция
- Нужно добавлять/удалять элементы
- Допускаются дубликаты
- Нужен доступ по индексу

**Альтернативы:**
- \`tuple\` — если коллекция неизменяемая
- \`set\` — если нужны уникальные элементы
- \`dict\` — если нужен доступ по ключу`,
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
      {
        q: "Что делает метод append()?",
        options: [
          "Удаляет последний элемент",
          "Добавляет элемент в начало",
          "Добавляет элемент в конец",
          "Вставляет элемент по индексу",
        ],
        answer: 2,
        explain: "append() добавляет элемент в конец списка. Для вставки по индексу используйте insert().",
      },
      {
        q: "Что вернёт [1, 2, 3, 4, 5][-2:]?",
        options: ["[1, 2]", "[4, 5]", "[3, 4, 5]", "[2, 3, 4]"],
        answer: 1,
        explain: "Отрицательный индекс -2 означает второй элемент с конца. Срез [-2:] берёт все элементы с этой позиции до конца: [4, 5].",
      },
      {
        q: "Как создать копию списка?",
        options: [
          "b = a",
          "b = a[:]",
          "b = list(a)",
          "b = a.copy()",
          "Все варианты, кроме 'b = a'",
        ],
        answer: 4,
        explain: "b = a создаёт ссылку на тот же список. Для копии используйте a[:], list(a), a.copy() или copy.deepcopy() для вложенных списков.",
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
      {
        id: "py5t3",
        title: "Переворот списка",
        md: `Реализуйте \`reverse_list(lst)\`, которая возвращает **новый** список с элементами в обратном порядке. Не используйте метод \`reverse()\` или срез \`[::-1]\` — сделайте это циклом.`,
        starter: `def reverse_list(lst):
    # ваш код с циклом
    pass

print(reverse_list([1, 2, 3, 4, 5]))`,
        tests: `
__test("reverse_list([1,2,3,4,5]) → [5,4,3,2,1]", lambda: reverse_list([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1])
__test("reverse_list([1]) → [1]", lambda: reverse_list([1]), [1])
__test("reverse_list([]) → []", lambda: reverse_list([]), [])
__test("не изменяет оригинал", lambda: (lambda lst: (reverse_list(lst), lst))(list([1, 2, 3]))[1], [1, 2, 3])`,
        solution: `def reverse_list(lst):
    result = []
    for i in range(len(lst) - 1, -1, -1):
        result.append(lst[i])
    return result`,
      },
      {
        id: "py5t4",
        title: "Матрица: сумма диагонали",
        md: `Реализуйте \`diagonal_sum(matrix)\`, которая вычисляет сумму элементов главной диагонали квадратной матрицы. Главная диагональ — элементы с индексами \`[0][0], [1][1], [2][2]\` и т.д.`,
        starter: `def diagonal_sum(matrix):
    # ваш код
    pass

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(diagonal_sum(matrix))  # 1 + 5 + 9 = 15`,
        tests: `
__test("3x3 матрица", lambda: diagonal_sum([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 15)
__test("2x2 матрица", lambda: diagonal_sum([[1, 2], [3, 4]]), 5)
__test("4x4 матрица", lambda: diagonal_sum([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]), 10)`,
        solution: `def diagonal_sum(matrix):
    total = 0
    for i in range(len(matrix)):
        total += matrix[i][i]
    return total`,
      },
      {
        id: "py5t5",
        title: "Срез: чётные индексы",
        md: `Реализуйте \`even_indices(lst)\`, которая возвращает элементы списка с **чётными индексами** (0, 2, 4, ...) используя срез.`,
        starter: `def even_indices(lst):
    # ваш код со срезом
    pass

print(even_indices([0, 1, 2, 3, 4, 5, 6, 7]))`,
        tests: `
__test("even_indices([0,1,2,3,4,5,6,7]) → [0,2,4,6]", lambda: even_indices([0, 1, 2, 3, 4, 5, 6, 7]), [0, 2, 4, 6])
__test("even_indices([10, 20, 30]) → [10, 30]", lambda: even_indices([10, 20, 30]), [10, 30])
__test("even_indices([1]) → [1]", lambda: even_indices([1]), [1])
__test("even_indices([]) → []", lambda: even_indices([]), [])`,
        solution: `def even_indices(lst):
    return lst[::2]`,
      },
    ],
  },

  {
    id: "py6",
    language: "python",
    title: "Словари, множества, кортежи",
    subtitle: "dict, set-операции, распаковка кортежей, dict comprehensions",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Три коллекции под три задачи 🎯

Python предлагает три мощные коллекции для разных задач:

- **\`dict\` (словарь)** — пары ключ:значение. Как телефонная книга: по имени находите номер
- **\`set\` (множество)** — уникальные элементы. Как список гостей: каждый человек только один раз
- **\`tuple\` (кортеж)** — неизменяемый список. Как координаты точки: (x, y) не меняются

**Аналогия:**
- \`dict\` — словарь: слово → определение
- \`set\` — коллекция марок: каждая марка уникальна
- \`tuple\` — GPS-координаты: (широта, долгота)`,
      },
      {
        kind: "text",
        md: `## Словари (dict): пары ключ-значение 📖

Словарь хранит данные в виде пар \`ключ: значение\`. Ключи должны быть уникальными и неизменяемыми (строки, числа, кортежи).

**Особенности:**
- Быстрый поиск по ключу (O(1))
- Порядок вставки сохраняется (Python 3.7+)
- Ключи должны быть неизменяемыми`,
      },
      {
        kind: "code",
        title: "Создание и работа со словарями",
        code: `# Создание словаря
user = {"name": "Алиса", "age": 25, "city": "Москва"}
print(user)

# Доступ по ключу
print(user["name"])  # Алиса
# print(user["email"])  # KeyError!

# Безопасный доступ с .get()
print(user.get("email", "не указан"))  # не указан
print(user.get("age"))  # 25

# Добавление и изменение
user["email"] = "alice@example.com"
user["age"] = 26
print(user)

# Удаление
del user["city"]
print(user)

# Проверка наличия ключа
print("name" in user)  # True
print("phone" in user)  # False`,
      },
      {
        kind: "code",
        title: "Методы словарей",
        code: `user = {"name": "Боб", "age": 30, "city": "СПб"}

# keys(), values(), items()
print(list(user.keys()))    # ['name', 'age', 'city']
print(list(user.values()))  # ['Боб', 30, 'СПб']
print(list(user.items()))   # [('name', 'Боб'), ('age', 30), ('city', 'СПб')]

# Обход словаря
for key, value in user.items():
    print(f"{key}: {value}")

# setdefault — установить значение, если ключа нет
user.setdefault("email", "не указан")
print(user)

# update — обновить несколько ключей
user.update({"age": 31, "country": "Россия"})
print(user)

# pop — удалить и вернуть значение
age = user.pop("age")
print(age)  # 31
print(user)`,
      },
      {
        kind: "text",
        md: `## Множества (set): уникальные элементы 🔑

Множество хранит только уникальные элементы. Порядок не гарантирован.

**Особенности:**
- Автоматически удаляет дубликаты
- Быстрая проверка вхождения (O(1))
- Поддерживает математические операции (объединение, пересечение)`,
      },
      {
        kind: "code",
        title: "Создание и операции с множествами",
        code: `# Создание множества
numbers = {1, 2, 3, 4, 5}
print(numbers)

# Из списка (удаление дубликатов)
duplicates = [1, 2, 2, 3, 3, 3, 4]
unique = set(duplicates)
print(unique)  # {1, 2, 3, 4}

# Добавление и удаление
numbers.add(6)
numbers.remove(3)  # KeyError, если элемента нет
numbers.discard(10)  # не вызывает ошибку
print(numbers)

# Проверка вхождения
print(5 in numbers)  # True
print(10 in numbers)  # False`,
      },
      {
        kind: "code",
        title: "Операции с множествами",
        code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Пересечение (общие элементы)
print(a & b)  # {3, 4}
print(a.intersection(b))

# Объединение (все уникальные элементы)
print(a | b)  # {1, 2, 3, 4, 5, 6}
print(a.union(b))

# Разность (элементы из a, которых нет в b)
print(a - b)  # {1, 2}
print(a.difference(b))

# Симметрическая разность (элементы, которые есть только в одном множестве)
print(a ^ b)  # {1, 2, 5, 6}
print(a.symmetric_difference(b))

# Подмножество и надмножество
c = {1, 2}
print(c.issubset(a))  # True — c подмножество a
print(a.issuperset(c))  # True — a надмножество c`,
      },
      {
        kind: "text",
        md: `## Кортежи (tuple): неизменяемые списки 🔒

Кортеж — это неизменяемый список. После создания нельзя добавить, удалить или изменить элементы.

**Зачем нужны кортежи?**
- Защита данных от изменений
- Можно использовать как ключи словаря
- Быстрее и легче списков
- Возврат нескольких значений из функции`,
      },
      {
        kind: "code",
        title: "Работа с кортежами",
        code: `# Создание кортежа
point = (10, 20)
print(point)

# Можно без скобок
coords = 30, 40
print(coords)  # (30, 40)

# Доступ по индексу
print(point[0])  # 10
print(point[1])  # 20

# point[0] = 15  # TypeError! Кортежи неизменяемы

# Распаковка
x, y = point
print(x, y)  # 10 20

# Обмен значений без временной переменной
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1

# Кортеж из функции
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([3, 1, 4, 1, 5, 9])
print(f"Мин: {minimum}, Макс: {maximum}")

# Кортеж как ключ словаря
locations = {
    (55.75, 37.62): "Москва",
    (59.93, 30.32): "Санкт-Петербург"
}
print(locations[(55.75, 37.62)])  # Москва`,
      },
      {
        kind: "text",
        md: `## Dict comprehensions: генераторы словарей 🚀

Dict comprehension — компактный способ создания словарей. Синтаксис:

\`\`\`python
{ключ: значение for элемент in коллекция}
\`\`\``,
      },
      {
        kind: "code",
        title: "Dict comprehensions в примерах",
        code: `# Квадраты чисел
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Обратный словарь
original = {"a": 1, "b": 2, "c": 3}
reversed_dict = {v: k for k, v in original.items()}
print(reversed_dict)  # {1: 'a', 2: 'b', 3: 'c'}

# Фильтрация
prices = {"кофе": 120, "чай": 90, "какао": 110, "сок": 150}
expensive = {k: v for k, v in prices.items() if v > 100}
print(expensive)  # {'кофе': 120, 'какао': 110, 'сок': 150}

# Преобразование значений
discounted = {k: int(v * 0.9) for k, v in prices.items()}
print(discounted)  # {'кофе': 108, 'чай': 81, 'какао': 99, 'сок': 135}

# Подсчёт символов
text = "абракадабра"
counts = {ch: text.count(ch) for ch in set(text)}
print(counts)`,
      },
      {
        kind: "code",
        title: "Подсчёт элементов",
        code: `# Классический способ подсчёта
text = "абракадабра"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)

# Более pythonic способ с defaultdict
from collections import defaultdict

counts = defaultdict(int)
for ch in text:
    counts[ch] += 1
print(dict(counts))

# Подсчёт с Counter
from collections import Counter

counts = Counter(text)
print(counts)  # Counter({'а': 5, 'б': 1, 'р': 2, 'к': 1, 'д': 1})
print(counts['а'])  # 5
print(counts.most_common(3))  # [('а', 5), ('р', 2), ...]`,
      },
      {
        kind: "warn",
        title: "Изменяемые объекты как ключи",
        md: `Ключи словаря должны быть **неизменяемыми**:
- ✅ Строки, числа, кортежи (если содержат только неизменяемые элементы)
- ❌ Списки, словари, множества

\`\`\`python
# Правильно
d = {(1, 2): "точка"}
d["ключ"] = "значение"

# Неправильно
d = {[1, 2]: "список"}  # TypeError: unhashable type: 'list'
\`\`\``,
      },
      {
        kind: "tip",
        title: "Что выбрать?",
        md: `**Используйте \`dict\`, когда:**
- Нужен быстрый поиск по ключу
- Данные связаны парами ключ-значение
- Нужен порядок вставки

**Используйте \`set\`, когда:**
- Нужны только уникальные элементы
- Нужно проверить вхождение элемента
- Нужны математические операции (объединение, пересечение)

**Используйте \`tuple\`, когда:**
- Данные не должны изменяться
- Нужно вернуть несколько значений из функции
- Нужен ключ для словаря
- Важна производительность (кортежи быстрее списков)`,
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
      {
        q: "Что нельзя использовать как ключ словаря?",
        options: ["строку", "число", "кортеж", "список"],
        answer: 3,
        explain: "Списки изменяемы, поэтому их нельзя использовать как ключи словаря. Ключи должны быть неизменяемыми.",
      },
      {
        q: "Что вернёт set([1, 2, 2, 3, 3, 3])?",
        options: ["[1, 2, 3]", "{1, 2, 3}", "{1, 2, 2, 3, 3, 3}", "ошибку"],
        answer: 1,
        explain: "set удаляет дубликаты и возвращает множество уникальных элементов: {1, 2, 3}.",
      },
      {
        q: "Можно ли изменить элемент кортежа?",
        options: [
          "Да, tuple[0] = 10",
          "Нет — кортежи неизменяемы",
          "Только через метод update",
          "Только если кортеж содержит списки",
        ],
        answer: 1,
        explain: "Кортежи неизменяемы. Попытка изменить элемент вызовет TypeError.",
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
      {
        id: "py6t3",
        title: "Общие друзья",
        md: `Реализуйте \`common_friends(friends1, friends2)\` — возвращает множество общих друзей (пересечение двух множеств).`,
        starter: `def common_friends(friends1, friends2):
    # ваш код с множествами
    pass

print(common_friends({"Алиса", "Боб", "Виктор"}, {"Боб", "Гай", "Виктор"}))`,
        tests: `
__test("есть общие", lambda: common_friends({"Алиса", "Боб", "Виктор"}, {"Боб", "Гай", "Виктор"}), {"Боб", "Виктор"})
__test("нет общих", lambda: common_friends({"Алиса"}, {"Боб"}), set())
__test("все общие", lambda: common_friends({"Алиса", "Боб"}, {"Алиса", "Боб"}), {"Алиса", "Боб"})
__test("пустые множества", lambda: common_friends(set(), set()), set())`,
        solution: `def common_friends(friends1, friends2):
    return friends1 & friends2`,
      },
      {
        id: "py6t4",
        title: "Обратный словарь",
        md: `Реализуйте \`invert_dict(d)\` — меняет ключи и значения местами. Если значения повторяются, последнее значение перезаписывает предыдущее.`,
        starter: `def invert_dict(d):
    # ваш код
    pass

print(invert_dict({"a": 1, "b": 2, "c": 3}))`,
        tests: `
__test("простой случай", lambda: invert_dict({"a": 1, "b": 2}), {1: "a", 2: "b"})
__test("пустой словарь", lambda: invert_dict({}), {})
__test("повторяющиеся значения", lambda: invert_dict({"a": 1, "b": 1}), {1: "b"})`,
        solution: `def invert_dict(d):
    return {v: k for k, v in d.items()}`,
      },
      {
        id: "py6t5",
        title: "Координаты",
        md: `Реализуйте \`distance(p1, p2)\` — вычисляет расстояние между двумя точками (кортежами координат) по формуле: √((x2-x1)² + (y2-y1)²).`,
        starter: `import math

def distance(p1, p2):
    # p1 и p2 — кортежи (x, y)
    # ваш код
    pass

print(distance((0, 0), (3, 4)))  # 5.0`,
        tests: `
__test("расстояние (0,0)-(3,4)", lambda: distance((0, 0), (3, 4)), 5.0)
__test("расстояние (1,1)-(4,5)", lambda: distance((1, 1), (4, 5)), 5.0)
__test("расстояние до себя", lambda: distance((5, 5), (5, 5)), 0.0)
__test("отрицательные координаты", lambda: distance((-1, -1), (2, 3)), 5.0)`,
        solution: `import math

def distance(p1, p2):
    x1, y1 = p1
    x2, y2 = p2
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)`,
      },
    ],
  },

  {
    id: "py7",
    language: "python",
    title: "Строки и форматирование",
    subtitle: "Методы строк, f-строки с форматами, неизменяемость",
    minutes: 30,
    blocks: [
      {
        kind: "text",
        md: `## Строки: текст в Python 📝

Строки — это **неизменяемые** последовательности символов. Любая операция со строкой создаёт **новую** строку, оригинал не меняется.

**Аналогия:** Представьте книгу. Вы не можете изменить напечатанное слово, но можете:
- Сделать копию страницы и изменить её
- Вырезать часть текста
- Склеить несколько страниц

**Важно:** Строки неизменяемы — \`s[0] = "П"\` вызовет \`TypeError\`.`,
      },
      {
        kind: "text",
        md: `## Основные методы строк

Python предоставляет множество встроенных методов для работы со строками. Они делятся на несколько категорий:

**Регистр:**
- \`upper()\` — в верхний регистр
- \`lower()\` — в нижний регистр
- \`title()\` — каждое слово с заглавной буквы
- \`capitalize()\` — первое слово с заглавной
- \`swapcase()\` — поменять регистр

**Удаление пробелов:**
- \`strip()\` — пробелы с обоих концов
- \`lstrip()\` — слева
- \`rstrip()\` — справа`,
      },
      {
        kind: "code",
        title: "Методы регистра и удаления пробелов",
        code: `text = "  Привет, мир!  "

# Регистр
print(text.upper())           # "  ПРИВЕТ, МИР!  "
print(text.lower())           # "  привет, мир!  "
print(text.title())           # "  Привет, Мир!  "
print(text.capitalize())      # "  привет, мир!  "

# Удаление пробелов
print(text.strip())           # "Привет, мир!"
print(text.lstrip())          # "Привет, мир!  "
print(text.rstrip())          # "  Привет, мир!"

# Комбинирование
print(text.strip().upper())   # "ПРИВЕТ, МИР!"`,
      },
      {
        kind: "text",
        md: `## Поиск и замена

**Поиск:**
- \`find(sub)\` — индекс первого вхождения (-1 если не найдено)
- \`rfind(sub)\` — индекс последнего вхождения
- \`index(sub)\` — как find, но вызывает ValueError если не найдено
- \`count(sub)\` — количество вхождений

**Замена:**
- \`replace(old, new)\` — заменить все вхождения
- \`replace(old, new, count)\` — заменить первые count вхождений`,
      },
      {
        kind: "code",
        title: "Поиск и замена",
        code: `text = "Привет, мир! Привет, Python!"

# Поиск
print(text.find("Привет"))        # 0 (первое вхождение)
print(text.rfind("Привет"))       # 15 (последнее вхождение)
print(text.find("Java"))          # -1 (не найдено)
# print(text.index("Java"))       # ValueError!

print(text.count("Привет"))       # 2

# Замена
print(text.replace("мир", "Вселенная"))
# "Привет, Вселенная! Привет, Python!"

print(text.replace("Привет", "Здравствуй", 1))
# "Здравствуй, мир! Привет, Python!" (только первое)`,
      },
      {
        kind: "text",
        md: `## Разделение и соединение

**Разделение:**
- \`split(sep)\` — разделить по разделителю в список
- \`rsplit(sep)\` — разделить справа
- \`splitlines()\` — разделить по строкам

**Соединение:**
- \`join(iterable)\` — соединить список строк с разделителем

**Важно:** \`join\` — метод строки, а не списка! \`"-".join(list)\``,
      },
      {
        kind: "code",
        title: "Разделение и соединение",
        code: `# split — разделение
csv_line = "Иван,25,Москва"
parts = csv_line.split(",")
print(parts)  # ['Иван', '25', 'Москва']

text = "один два  три   четыре"
words = text.split()  # по пробелам (игнорирует множественные)
print(words)  # ['один', 'два', 'три', 'четыре']

# splitlines
multiline = """первая строка
вторая строка
третья строка"""
lines = multiline.splitlines()
print(lines)

# join — соединение
words = ["2026", "02", "14"]
date = "-".join(words)
print(date)  # "2026-02-14"

path = "/".join(["home", "user", "documents"])
print(path)  # "home/user/documents"

# join с пустой строкой
letters = ["P", "y", "t", "h", "o", "n"]
word = "".join(letters)
print(word)  # "Python"`,
      },
      {
        kind: "text",
        md: `## Проверки строк

Python предоставляет множество методов для проверки содержимого строки:

**Тип содержимого:**
- \`isdigit()\` — только цифры
- \`isalpha()\` — только буквы
- \`isalnum()\` — буквы или цифры
- \`isspace()\` — только пробелы

**Регистр:**
- \`isupper()\` — все буквы в верхнем регистре
- \`islower()\` — все буквы в нижнем регистре
- \`istitle()\` — каждое слово с заглавной буквы

**Начало/конец:**
- \`startswith(prefix)\` — начинается с
- \`endswith(suffix)\` — заканчивается на`,
      },
      {
        kind: "code",
        title: "Проверки строк",
        code: `# Тип содержимого
print("123".isdigit())      # True
print("abc".isalpha())      # True
print("abc123".isalnum())   # True
print("   ".isspace())      # True

print("123abc".isdigit())   # False
print("abc 123".isalpha())  # False

# Регистр
print("ПРИВЕТ".isupper())   # True
print("привет".islower())   # True
print("Привет Мир".istitle())  # True

# Начало/конец
filename = "document.pdf"
print(filename.endswith(".pdf"))  # True
print(filename.startswith("doc"))  # True

# Практическое применение
files = ["image.png", "doc.pdf", "video.mp4", "readme.txt"]
pdf_files = [f for f in files if f.endswith(".pdf")]
print(pdf_files)  # ['doc.pdf']`,
      },
      {
        kind: "text",
        md: `## f-строки: форматирование 🎨

f-строки позволяют не только подставлять значения, но и **форматировать** их.

**Синтаксис:**
\`\`\`python
f"{выражение:формат}"
\`\`\`

**Форматы для чисел:**
- \`:d\` — целое число
- \`:f\` — дробное число
- \`:.<n>f\` — n знаков после запятой
- \`:,\` — разделитель тысяч
- \`:x\` — шестнадцатеричное
- \`:o\` — восьмеричное
- \`:b\` — двоичное`,
      },
      {
        kind: "code",
        title: "Форматирование чисел",
        code: `pi = 3.141592653589793
price = 1234567.89

# Дробные числа
print(f"π ≈ {pi:.2f}")        # π ≈ 3.14
print(f"π ≈ {pi:.4f}")        # π ≈ 3.1416

# Разделитель тысяч
print(f"Цена: {price:,}")     # Цена: 1,234,567.89
print(f"Цена: {price:,.2f}")  # Цена: 1,234,567.89

# Проценты
rate = 0.1234
print(f"Ставка: {rate:.1%}")  # Ставка: 12.3%

# Системы счисления
num = 255
print(f"Двоичное: {num:b}")   # 11111111
print(f"Восьмеричное: {num:o}")  # 377
print(f"Шестнадцатеричное: {num:x}")  # ff

# Знак числа
print(f"{5:+d}")   # +5
print(f"{-5:+d}")  # -5`,
      },
      {
        kind: "text",
        md: `## Выравнивание в f-строках

**Синтаксис:**
\`\`\`python
f"{значение:<ширина}"  # выравнивание влево
f"{значение:>ширина}"  # выравнивание вправо
f"{значение:^ширина}"  # по центру
\`\`\`

**Заполнитель:**
\`\`\`python
f"{значение:*^10}"  # заполнить звёздочками
\`\`\``,
      },
      {
        kind: "code",
        title: "Выравнивание текста",
        code: `name = "Python"
version = 3.11

# Выравнивание
print(f"|{name:<10}|")  # |Python    |
print(f"|{name:>10}|")  # |    Python|
print(f"|{name:^10}|")  # |  Python  |

# Заполнитель
print(f"{name:*^10}")   # ***Python***
print(f"{name:-<10}")   # Python----
print(f"{name:->10}")   # ----Python

# Практический пример: таблица
print(f"{'Имя':<10} {'Возраст':>7}")
print("-" * 18)
print(f"{'Алиса':<10} {25:>7}")
print(f"{'Боб':<10} {30:>7}")
print(f"{'Виктор':<10} {28:>7}")`,
      },
      {
        kind: "text",
        md: `## Многострочные строки

Для длинных строк или строк с переносами используйте тройные кавычки:

\`\`\`python
text = """Первая строка
Вторая строка
Третья строка"""
\`\`\`

**Важно:** переносы строк сохраняются как есть!`,
      },
      {
        kind: "code",
        title: "Многострочные строки",
        code: `# Обычная многострочная строка
poem = """Розы красные,
Фиалки синие,
Python прекрасный,
И ты тоже."""
print(poem)

# SQL-запрос
query = """
SELECT name, age
FROM users
WHERE age > 18
ORDER BY name
"""
print(query)

# Экранирование не нужно
text = """Он сказал: "Привет!"
Она ответила: 'Здравствуй!'"""
print(text)`,
      },
      {
        kind: "text",
        md: `## Сырые строки (raw strings)

Обычные строки обрабатывают escape-последовательности:
- \`\\n\` — перенос строки
- \`\\t\` — табуляция
- \`\\\\\` — обратный слэш

**Сырые строки** (r"...") не обрабатывают escape-последовательности. Полезно для регулярных выражений и путей Windows.`,
      },
      {
        kind: "code",
        title: "Сырые строки",
        code: `# Обычная строка
print("Первая строка\\nВторая строка")
# Первая строка
# Вторая строка

# Сырая строка
print(r"Первая строка\\nВторая строка")
# Первая строка\\nВторая строка

# Пути Windows
path = r"C:\\Users\\User\\Documents"
print(path)  # C:\\Users\\User\\Documents

# Регулярные выражения
pattern = r"\\d+\\.\\d+"  # проще, чем "\\d+\\.\\d+"
print(pattern)  # \\d+\\.\\d+`,
      },
      {
        kind: "text",
        md: `## Неизменяемость на практике

Строки неизменяемы: \`s[0] = "П"\` вызовет \`TypeError\`.

**Как «изменить» строку?**
1. Конкатенация: \`"П" + s[1:]\`
2. \`replace()\`: \`s.replace("п", "П")\`
3. Срезы: \`s[:1] + "П" + s[2:]\`
4. f-строки: \`f"П{s[1:]}"\``,
      },
      {
        kind: "code",
        title: "Работа с неизменяемыми строками",
        code: `word = "питон"

# word[0] = "П"  # TypeError!

# Способ 1: конкатенация
new_word = "П" + word[1:]
print(new_word)  # Питон

# Способ 2: replace
new_word = word.replace("п", "П")
print(new_word)  # Питон

# Способ 3: срезы
new_word = word[:1].upper() + word[1:]
print(new_word)  # Питон

# Способ 4: f-строка
new_word = f"{word[0].upper()}{word[1:]}"
print(new_word)  # Питон

# Разворот строки
print(word[::-1])  # нотип

# Проверка подстроки
print("тон" in word)  # True`,
      },
      {
        kind: "warn",
        title: "Конкатенация в цикле — O(n²)",
        md: `Каждое \`result += piece\` создаёт новую строку и копирует всё накопленное. Для сотен частей собирайте список и делайте \`"".join(parts)\` — линейно.

**Плохо:**
\`\`\`python
result = ""
for word in words:
    result += word + " "  # O(n²)
\`\`\`

**Хорошо:**
\`\`\`python
result = " ".join(words)  # O(n)
\`\`\``,
      },
      {
        kind: "code",
        title: "Эффективное склеивание строк",
        code: `# Плохо: O(n²)
words = ["Python", "is", "awesome"] * 1000
result = ""
for word in words:
    result += word + " "

# Хорошо: O(n)
words = ["Python", "is", "awesome"] * 1000
result = " ".join(words)

# Ещё лучше: генератор
result = " ".join(word for word in words if len(word) > 2)

# join с любыми итерируемыми объектами
numbers = [1, 2, 3, 4, 5]
result = ", ".join(str(n) for n in numbers)
print(result)  # "1, 2, 3, 4, 5"`,
      },
      {
        kind: "tip",
        title: "Полезные приёмы",
        md: `**1. Удаление символов из строки:**
\`\`\`python
text = "Hello, World!"
cleaned = text.replace(",", "").replace("!", "")
# или
import re
cleaned = re.sub(r'[,!]', '', text)
\`\`\`

**2. Подсчёт слов:**
\`\`\`python
text = "Python is awesome and powerful"
words = text.split()
print(len(words))  # 5
\`\`\`

**3. Проверка палиндрома:**
\`\`\`python
def is_palindrome(s):
    cleaned = s.replace(" ", "").lower()
    return cleaned == cleaned[::-1]
\`\`\``,
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
      {
        q: "Что вернёт 'hello world'.split()?",
        options: [
          "['hello', 'world']",
          "['hello world']",
          "['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']",
          "ошибку",
        ],
        answer: 0,
        explain: "split() без аргументов разделяет строку по пробелам, игнорируя множественные пробелы.",
      },
      {
        q: "Что делает метод strip()?",
        options: [
          "Удаляет все пробелы из строки",
          "Удаляет пробелы с начала и конца строки",
          "Заменяет пробелы на другие символы",
          "Подсчитывает количество пробелов",
        ],
        answer: 1,
        explain: "strip() удаляет пробелы (и другие символы) только с начала и конца строки, не затрагивая середину.",
      },
      {
        q: "Что вернёт f'{3.14159:.2f}'?",
        options: ["'3.14'", "'3.14159'", "'3.1'", "'3.15'"],
        answer: 0,
        explain: "Формат :.2f округляет число до 2 знаков после запятой: 3.14159 → 3.14.",
      },
      {
        q: "Как проверить, что строка заканчивается на '.pdf'?",
        options: [
          "s.endswith('.pdf')",
          "s.endswith('.pdf') == True",
          "s[-4:] == '.pdf'",
          "Все варианты верны",
        ],
        answer: 3,
        explain: "Все три способа работают. endswith() — самый читаемый, срез — самый гибкий.",
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
      {
        id: "py7t3",
        title: "Подсчёт слов",
        md: `Реализуйте \`count_words(text)\`, которая возвращает количество слов в тексте. Слова разделены пробелами. Игнорируйте множественные пробелы.`,
        starter: `def count_words(text):
    # ваш код
    pass

print(count_words("Python is awesome"))
print(count_words("  hello   world  "))`,
        tests: `
__test("count_words('Python is awesome') → 3", lambda: count_words("Python is awesome"), 3)
__test("count_words('  hello   world  ') → 2", lambda: count_words("  hello   world  "), 2)
__test("count_words('') → 0", lambda: count_words(""), 0)
__test("count_words('one') → 1", lambda: count_words("one"), 1)`,
        solution: `def count_words(text):
    return len(text.split())`,
      },
      {
        id: "py7t4",
        title: "Форматирование таблицы",
        md: `Реализуйте \`format_table(headers, rows)\`, которая возвращает строку с отформатированной таблицей. Столбцы выравниваются по ширине заголовка.`,
        starter: `def format_table(headers, rows):
    # ваш код
    pass

headers = ["Имя", "Возраст"]
rows = [["Алиса", 25], ["Боб", 30]]
print(format_table(headers, rows))`,
        tests: `
__test("простая таблица", lambda: "Алиса" in format_table(["Имя", "Возраст"], [["Алиса", 25]]), True)
__test("заголовки в таблице", lambda: "Имя" in format_table(["Имя", "Возраст"], [["Алиса", 25]]), True)`,
        solution: `def format_table(headers, rows):
    widths = [len(str(h)) for h in headers]
    for row in rows:
        for i, cell in enumerate(row):
            widths[i] = max(widths[i], len(str(cell)))
    
    result = " | ".join(h.ljust(widths[i]) for i, h in enumerate(headers))
    result += "\\n" + "-+-".join("-" * w for w in widths)
    for row in rows:
        result += "\\n" + " | ".join(str(cell).ljust(widths[i]) for i, cell in enumerate(row))
    return result`,
      },
      {
        id: "py7t5",
        title: "Удаление гласных",
        md: `Реализуйте \`remove_vowels(text)\`, которая удаляет все гласные буквы (а, е, ё, и, о, у, ы, э, ю, я) из текста. Регистр не важен.`,
        starter: `def remove_vowels(text):
    # ваш код
    pass

print(remove_vowels("Привет, мир!"))
print(remove_vowels("Python is awesome"))`,
        tests: `
__test("remove_vowels('Привет') → 'Првт'", lambda: remove_vowels("Привет"), "Првт")
__test("remove_vowels('Python') → 'Pythn'", lambda: remove_vowels("Python"), "Pythn")
__test("remove_vowels('AEIOU') → ''", lambda: remove_vowels("AEIOU"), "")
__test("remove_vowels('bcdfg') → 'bcdfg'", lambda: remove_vowels("bcdfg"), "bcdfg")`,
        solution: `def remove_vowels(text):
    vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
    return "".join(ch for ch in text if ch not in vowels)`,
      },
    ],
  },

  {
    id: "py8",
    language: "python",
    title: "Замыкания и декораторы",
    subtitle: "nonlocal, функции-обёртки и синтаксис @",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Замыкания: функции с памятью 🧠

**Замыкание** — это функция, которая "помнит" переменные из окружающей области видимости, даже когда эта область уже завершилась.

**Аналогия:** Представьте, что вы создали функцию-счётчик. Она должна помнить своё текущее значение между вызовами. Замыкание позволяет функции "закрыть" в себе переменную и работать с ней.

**Зачем нужны замыкания?**
- Создание фабрик функций
- Инкапсуляция состояния
- Декораторы
- Callback-функции с контекстом`,
      },
      {
        kind: "text",
        md: `## Как работает замыкание?

Когда внутренняя функция ссылается на переменную внешней функции, Python создаёт **замыкание** — специальную структуру, которая хранит эти переменные.

**Важно:** В Python для **изменения** переменной из внешней области нужно использовать ключевое слово \`nonlocal\`. Без него Python создаст новую локальную переменную.`,
      },
      {
        kind: "code",
        title: "Простое замыкание",
        code: `def make_greeter(name):
    """Создаёт функцию-приветствие для конкретного имени"""
    def greeter():
        print(f"Привет, {name}!")
    return greeter

# Создаём функции для разных людей
greet_alice = make_greeter("Алиса")
greet_bob = make_greeter("Боб")

greet_alice()  # Привет, Алиса!
greet_bob()    # Привет, Боб!

# Каждая функция "помнит" своё имя
# Даже после завершения make_greeter`,
      },
      {
        kind: "code",
        title: "Счётчик на замыканиях",
        code: `def make_counter(start=0):
    """Создаёт счётчик с начальным значением"""
    count = start

    def inc():
        nonlocal count     # без nonlocal была бы ошибка
        count += 1
        return count

    def dec():
        nonlocal count
        count -= 1
        return count

    def value():
        return count

    return inc, dec, value      # возвращаем кортеж функций

# Используем счётчик
inc, dec, value = make_counter(10)
print(inc())      # 11
print(inc())      # 12
print(dec())      # 11
print(value())    # 11

# Создаём независимый счётчик
inc2, dec2, value2 = make_counter(100)
print(value2())   # 100 — независим от первого`,
      },
      {
        kind: "text",
        md: `## nonlocal vs global

**\`nonlocal\`** — ссылается на переменную из **внешней** (но не глобальной) области видимости.

**\`global\`** — ссылается на переменную из **глобальной** области видимости.

**Правило:** Если вы только **читаете** переменную из внешней области, \`nonlocal\` не нужен. Если **изменяете** — нужен.`,
      },
      {
        kind: "code",
        title: "nonlocal в действии",
        code: `# Чтение без nonlocal — работает
def outer():
    x = 10
    def inner():
        print(x)  # просто читаем
    inner()

outer()  # 10

# Изменение с nonlocal — работает
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
    inner()
    print(x)

outer()  # 15

# Изменение без nonlocal — ошибка!
def outer():
    x = 10
    def inner():
        x += 5  # UnboundLocalError!
    inner()

outer()`,
      },
      {
        kind: "text",
        md: `## Декораторы: функции-обёртки 🎁

**Декоратор** — это функция, которая принимает другую функцию и расширяет её поведение, не изменяя исходный код.

**Аналогия:** Представьте, что у вас есть функция (подарок). Декоратор — это красивая обёртка вокруг подарка. Подарок остаётся тем же, но теперь у него есть дополнительная функциональность (обёртка).

**Синтаксис:**
\`\`\`python
@decorator
def function():
    pass

# Эквивалентно:
function = decorator(function)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Зачем нужны декораторы?

**Популярные применения:**
- Логирование вызовов функций
- Измерение времени выполнения
- Кэширование результатов
- Проверка прав доступа
- Повторные попытки при ошибках
- Регистрация функций (как в веб-фреймворках)

**Встроенные декораторы Python:**
- \`@property\` — превращает метод в свойство
- \`@staticmethod\` — статический метод
- \`@classmethod\` — метод класса
- \`@functools.lru_cache\` — кэширование`,
      },
      {
        kind: "code",
        title: "Простой декоратор",
        code: `def simple_decorator(func):
    """Простейший декоратор без изменения поведения"""
    def wrapper():
        print("Перед вызовом")
        func()
        print("После вызова")
    return wrapper

@simple_decorator
def say_hello():
    print("Привет!")

say_hello()
# Вывод:
# Перед вызовом
# Привет!
# После вызова`,
      },
      {
        kind: "code",
        title: "Декоратор с аргументами",
        code: `def log_calls(fn):
    """Декоратор для логирования вызовов"""
    def wrapper(*args, **kwargs):
        print(f"-> вызов {fn.__name__}({args}, {kwargs})")
        result = fn(*args, **kwargs)
        print(f"<- результат: {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

@log_calls
def greet(name):
    return f"Привет, {name}!"

add(2, 3)
# -> вызов add((2, 3), {})
# <- результат: 5

greet("Алиса")
# -> вызов greet(('Алиса',), {})
# <- результат: Привет, Алиса!`,
      },
      {
        kind: "code",
        title: "Декоратор для измерения времени",
        code: `import time

def timer(func):
    """Измеряет время выполнения функции"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} выполнилась за {end - start:.4f} сек")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Готово!"

slow_function()
# slow_function выполнилась за 1.0012 сек`,
      },
      {
        kind: "text",
        md: `## functools.wraps: сохраняем метаданные

Когда мы создаём декоратор, оригинальная функция теряет свои метаданные (\`__name__\`, \`__doc__\` и т.д.). Чтобы сохранить их, используйте \`@functools.wraps\`.

**Зачем это нужно?**
- Отладка показывает правильное имя функции
- \`help()\` показывает правильную документацию
- Некоторые инструменты полагаются на эти метаданные`,
      },
      {
        kind: "code",
        title: "functools.wraps в действии",
        code: `from functools import wraps

def my_decorator(func):
    @wraps(func)  # сохраняем метаданные
    def wrapper(*args, **kwargs):
        """Обёртка"""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Приветствует пользователя"""
    print(f"Привет, {name}!")

print(greet.__name__)  # greet (не wrapper!)
print(greet.__doc__)   # Приветствует пользователя`,
      },
      {
        kind: "text",
        md: `## Декораторы с параметрами

Иногда нужно передать параметры в сам декоратор. Для этого создаём **фабрику декораторов** — функцию, которая возвращает декоратор.

**Синтаксис:**
\`\`\`python
@decorator_with_args(arg1, arg2)
def function():
    pass
\`\`\``,
      },
      {
        kind: "code",
        title: "Декоратор с параметрами",
        code: `def repeat(times):
    """Декоратор для повторения вызова"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Привет!")

say_hello()
# Привет!
# Привет!
# Привет!

@repeat(2)
def greet(name):
    print(f"Привет, {name}!")

greet("Алиса")
# Привет, Алиса!
# Привет, Алиса!`,
      },
      {
        kind: "code",
        title: "Декоратор для кэширования",
        code: `def cache(func):
    """Простой декоратор для кэширования результатов"""
    memo = {}
    
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    
    return wrapper

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Без кэша: очень медленно
# С кэшем: мгновенно
print(fibonacci(50))  # 12586269025`,
      },
      {
        kind: "tip",
        title: "Встроенные декораторы",
        md: `Python предоставляет несколько полезных встроенных декораторов:

**\`@property\`** — превращает метод в свойство (геттер):
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def area(self):
        return 3.14 * self._radius ** 2

c = Circle(5)
print(c.area)  # 78.5 — вызываем как свойство
\`\`\`

**\`@staticmethod\`** — метод без доступа к self:
\`\`\`python
class Math:
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(2, 3))  # 5
\`\`\`

**\`@classmethod\`** — метод с доступом к cls (класс):
\`\`\`python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

d = Date.from_string('2024-01-15')
\`\`\``,
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
      {
        q: "Что делает functools.wraps?",
        options: [
          "Ускоряет работу декоратора",
          "Сохраняет метаданные оригинальной функции",
          "Автоматически кэширует результаты",
          "Добавляет обработку ошибок",
        ],
        answer: 1,
        explain: "functools.wraps сохраняет __name__, __doc__ и другие метаданные оригинальной функции, что важно для отладки и документации.",
      },
      {
        q: "Какое ключевое слово нужно для изменения переменной из внешней области?",
        options: ["global", "nonlocal", "outer", "parent"],
        answer: 1,
        explain: "nonlocal используется для ссылки на переменную из внешней (но не глобальной) области видимости. global — для глобальной.",
      },
      {
        q: "Что возвращает декоратор?",
        options: [
          "Оригинальную функцию без изменений",
          "Новую функцию-обёртку",
          "Ничего",
          "Список аргументов",
        ],
        answer: 1,
        explain: "Декоратор принимает функцию и возвращает новую функцию-обёртку, которая расширяет поведение оригинала.",
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
      {
        id: "py8t3",
        title: "Декоратор для валидации",
        md: `Реализуйте декоратор \`validate_positive(fn)\`, который проверяет, что все числовые аргументы функции положительны. Если найдено отрицательное число — вызывает \`ValueError\`.`,
        starter: `def validate_positive(fn):
    # ваш декоратор
    pass

@validate_positive
def calculate_area(width, height):
    return width * height

print(calculate_area(5, 10))  # 50
# calculate_area(-5, 10)  # ValueError!`,
        tests: `
def test_valid():
    @validate_positive
    def add(a, b):
        return a + b
    return add(5, 10)

def test_invalid():
    @validate_positive
    def add(a, b):
        return a + b
    try:
        add(-5, 10)
        return False
    except ValueError:
        return True

__test("валидные аргументы", test_valid(), 15)
__test("отрицательные вызывают ошибку", test_invalid(), True)`,
        solution: `def validate_positive(fn):
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"Аргумент {arg} должен быть положительным")
        return fn(*args, **kwargs)
    return wrapper`,
      },
      {
        id: "py8t4",
        title: "Кэширующий декоратор",
        md: `Реализуйте декоратор \`memoize(fn)\`, который кэширует результаты функции. При повторном вызове с теми же аргументами возвращает результат из кэша.`,
        starter: `def memoize(fn):
    # ваш декоратор с кэшем
    pass

@memoize
def expensive_calculation(x):
    print(f"Вычисляю для {x}...")
    return x * x

print(expensive_calculation(5))  # Вычисляю для 5... → 25
print(expensive_calculation(5))  # 25 (без вычисления!)
print(expensive_calculation(10)) # Вычисляю для 10... → 100`,
        tests: `
def test_caching():
    call_count = 0
    
    @memoize
    def square(x):
        nonlocal call_count
        call_count += 1
        return x * x
    
    square(5)
    square(5)
    square(5)
    return call_count

__test("кэширование работает", test_caching(), 1)`,
        solution: `def memoize(fn):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    return wrapper`,
      },
      {
        id: "py8t5",
        title: "Фабрика функций",
        md: `Реализуйте \`make_power(exponent)\`, которая возвращает функцию, возводящую число в степень \`exponent\`. \`square = make_power(2); square(5)\` → \`25\`.`,
        starter: `def make_power(exponent):
    # верните функцию-замыкание
    pass

square = make_power(2)
cube = make_power(3)
print(square(5))  # 25
print(cube(2))    # 8`,
        tests: `
__test("square(5) → 25", lambda: make_power(2)(5), 25)
__test("cube(2) → 8", lambda: make_power(3)(2), 8)
__test("power(4, 0.5) → 2.0", lambda: make_power(0.5)(4), 2.0)
__test("независимые фабрики", lambda: (make_power(2)(3), make_power(3)(3)), (9, 27))`,
        solution: `def make_power(exponent):
    def power(base):
        return base ** exponent
    return power`,
      },
    ],
  },

  {
    id: "py9",
    language: "python",
    title: "Классы и ООП",
    subtitle: "__init__ и self, @property, наследование, dunder-методы",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Объектно-ориентированное программирование (ООП) 🏗️

ООП — парадигма программирования, основанная на концепции **объектов**, которые содержат данные (атрибуты) и код (методы).

**Четыре принципа ООП:**
1. **Инкапсуляция** — скрытие внутренней реализации
2. **Наследование** — создание новых классов на основе существующих
3. **Полиморфизм** — объекты разных классов могут отвечать на одни и те же методы
4. **Абстракция** — выделение существенных характеристик объекта

**Аналогия:** Представьте автомобиль:
- **Инкапсуляция:** вы не знаете, как работает двигатель, но знаете, как управлять (педали, руль)
- **Наследование:** грузовик наследует от автомобиля, но добавляет кузов
- **Полиморфизм:** и автомобиль, и грузовик имеют метод \`drive()\`, но работают по-разному
- **Абстракция:** автомобиль — это абстракция реального автомобиля с существенными характеристиками`,
      },
      {
        kind: "text",
        md: `## Создание класса

Класс создаётся ключевым словом \`class\`. Конструктор — метод \`__init__\`, который вызывается при создании объекта. Первый параметр любого метода — \`self\` (ссылка на текущий экземпляр).

**Атрибуты** — данные объекта (переменные).
**Методы** — функции объекта (поведение).`,
      },
      {
        kind: "code",
        title: "Простой класс",
        code: `class Person:
    """Класс для представления человека"""
    
    def __init__(self, name, age):
        """Конструктор — вызывается при создании объекта"""
        self.name = name  # атрибут
        self.age = age    # атрибут
    
    def greet(self):
        """Метод — действие, которое может выполнять объект"""
        print(f"Привет, меня зовут {self.name}!")
    
    def birthday(self):
        """Метод изменяет состояние объекта"""
        self.age += 1
        print(f"Мне теперь {self.age} лет!")

# Создание объектов (экземпляров класса)
alice = Person("Алиса", 25)
bob = Person("Боб", 30)

alice.greet()      # Привет, меня зовут Алиса!
alice.birthday()   # Мне теперь 26 лет!
print(bob.age)     # 30`,
      },
      {
        kind: "text",
        md: `## Инкапсуляция: уровни доступа

Python не имеет строгой инкапсуляции как Java или C++, но использует **соглашения**:

- **Публичные** (\`name\`) — доступны отовсюду
- **Защищённые** (\`_name\`) — "не трогайте извне" (соглашение)
- **Приватные** (\`__name\`) — name mangling (искажение имён)

**Важно:** В Python нет настоящей приватности — всё можно обойти. Это философия: "мы все взрослые люди".`,
      },
      {
        kind: "code",
        title: "Уровни доступа",
        code: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner          # публичный
        self._bank = "Сбербанк"     # защищённый (соглашение)
        self.__balance = balance    # приватный (name mangling)
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def get_balance(self):
        return self.__balance

acc = BankAccount("Алиса", 1000)
print(acc.owner)         # Алиса — публичный
print(acc._bank)         # Сбербанк — защищённый (можно, но не рекомендуется)
# print(acc.__balance)   # AttributeError!
print(acc.get_balance()) # 1000 — через метод

# Name mangling: доступ всё равно возможен
print(acc._BankAccount__balance)  # 1000 — но это плохая практика!`,
      },
      {
        kind: "text",
        md: `## @property: геттеры и сеттеры

Декоратор \`@property\` превращает метод в **атрибут только для чтения**. Для создания сеттера используйте \`@<property_name>.setter\`.

**Зачем нужно?**
- Контроль доступа к атрибутам
- Валидация данных
- Вычисляемые свойства`,
      },
      {
        kind: "code",
        title: "Property в действии",
        code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Геттер"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Сеттер с валидацией"""
        if value < -273.15:
            raise ValueError("Температура не может быть ниже абсолютного нуля!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Вычисляемое свойство"""
        return self._celsius * 9/5 + 32

temp = Temperature(20)
print(temp.celsius)       # 20 — вызываем как атрибут
print(temp.fahrenheit)    # 68.0 — вычисляемое свойство

temp.celsius = 30         # вызываем сеттер
print(temp.celsius)       # 30

# temp.celsius = -300     # ValueError!`,
      },
      {
        kind: "text",
        md: `## Наследование

Наследование позволяет создать новый класс на основе существующего. Дочерний класс наследует все атрибуты и методы родительского класса и может добавлять свои или переопределять существующие.

**Синтаксис:** \`class Child(Parent):\`

**super()** — вызов методов родительского класса.`,
      },
      {
        kind: "code",
        title: "Наследование",
        code: `class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def speak(self):
        return f"{self.name} издаёт звук"
    
    def info(self):
        return f"{self.name} — {self.species}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Собака")  # вызов конструктора родителя
        self.breed = breed
    
    def speak(self):
        return f"{self.name} говорит: Гав!"
    
    def fetch(self):
        return f"{self.name} принёс палку"

class Cat(Animal):
    def speak(self):
        return f"{self.name} говорит: Мяу!"

dog = Dog("Рекс", "Немецкая овчарка")
cat = Cat("Мурка")

print(dog.speak())     # Рекс говорит: Гав!
print(cat.speak())     # Мурка говорит: Мяу!
print(dog.info())      # Рекс — Собака
print(dog.fetch())     # Рекс принёс палку`,
      },
      {
        kind: "text",
        md: `## Полиморфизм

Полиморфизм — способность объектов разных классов отвечать на одни и те же методы. Это позволяет писать общий код, работающий с разными типами объектов.

**Аналогия:** И собака, и кошка имеют метод \`speak()\`, но говорят по-разному. Вам не нужно знать тип животного, чтобы вызвать \`speak()\`.`,
      },
      {
        kind: "code",
        title: "Полиморфизм в действии",
        code: `class Shape:
    def area(self):
        raise NotImplementedError("Подклассы должны реализовать этот метод")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

# Полиморфизм: работаем с разными типами одинаково
shapes = [Circle(5), Rectangle(4, 6), Circle(3)]

for shape in shapes:
    print(f"Площадь: {shape.area():.2f}")

# Функция работает с любым объектом, имеющим метод area()
def print_area(shape):
    print(f"Площадь: {shape.area():.2f}")

print_area(Circle(10))
print_area(Rectangle(3, 4))`,
      },
      {
        kind: "text",
        md: `## Магические методы (dunder methods)

Магические методы (или dunder — double underscore) — специальные методы, начинающиеся и заканчивающиеся двойным подчёркиванием. Они определяют, как объекты ведут себя со встроенными операциями.

**Популярные магические методы:**
- \`__str__\` — строковое представление (для \`print\`)
- \`__repr__\` — представление для разработчика
- \`__len__\` — длина объекта (для \`len()\`)
- \`__add__\` — сложение (для \`+\`)
- \`__eq__\`, \`__lt__\`, \`__gt__\` — сравнение
- \`__getitem__\` — индексация (для \`obj[key]\`)`,
      },
      {
        kind: "code",
        title: "Магические методы",
        code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x ** 2 + self.y ** 2) ** 0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)              # Vector(3, 4) — __str__
print(v1 + v2)         # Vector(4, 6) — __add__
print(v1 * 2)          # Vector(6, 8) — __mul__
print(v1 == Vector(3, 4))  # True — __eq__
print(len(v1))         # 5 — __len__ (длина вектора)`,
      },
      {
        kind: "text",
        md: `## Статические методы и методы класса

**Метод экземпляра** (\`def method(self):\`) — имеет доступ к \`self\`, работает с данными объекта.

**Метод класса** (\`@classmethod\`) — имеет доступ к \`cls\` (класс), а не к экземпляру. Используется для альтернативных конструкторов.

**Статический метод** (\`@staticmethod\`) — не имеет доступа ни к \`self\`, ни к \`cls\`. Это просто функция внутри класса.`,
      },
      {
        kind: "code",
        title: "Типы методов",
        code: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    # Метод экземпляра
    def display(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"
    
    # Метод класса — альтернативный конструктор
    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)
    
    # Статический метод — вспомогательная функция
    @staticmethod
    def is_valid_date(year, month, day):
        return 1 <= month <= 12 and 1 <= day <= 31

# Метод экземпляра
date1 = Date(2024, 1, 15)
print(date1.display())  # 2024-01-15

# Метод класса
date2 = Date.from_string("2024-02-20")
print(date2.display())  # 2024-02-20

# Статический метод
print(Date.is_valid_date(2024, 13, 1))  # False`,
      },
      {
        kind: "text",
        md: `## Абстрактные классы

Абстрактный класс — класс, который нельзя инстанциировать. Он определяет интерфейс (набор методов), который должны реализовать дочерние классы.

**Зачем нужно?**
- Определение контракта для дочерних классов
- Гарантия реализации определённых методов
- Архитектурное проектирование

Используйте модуль \`abc\` (Abstract Base Classes).`,
      },
      {
        kind: "code",
        title: "Абстрактные классы",
        code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14 * self.radius

# shape = Shape()  # TypeError! Нельзя создать экземпляр абстрактного класса
circle = Circle(5)
print(circle.area())       # 78.5
print(circle.perimeter())  # 31.4`,
      },
      {
        kind: "tip",
        title: "Композиция vs Наследование",
        md: `**Наследование** — "is-a" relationship (является):
- Собака **является** Животным
- Используйте, когда есть чёткая иерархия

**Композиция** — "has-a" relationship (имеет):
- Автомобиль **имеет** Двигатель
- Используйте, когда объект состоит из других объектов

**Правило:** Предпочитайте композицию наследованию, если нет чёткой иерархии. Это делает код более гибким.`,
      },
      {
        kind: "code",
        title: "Композиция",
        code: `class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower
    
    def start(self):
        print(f"Двигатель {self.horsepower} л.с. запущен")

class Car:
    def __init__(self, model, engine):
        self.model = model
        self.engine = engine  # композиция: Car имеет Engine
    
    def start(self):
        print(f"{self.model} заводится...")
        self.engine.start()

engine = Engine(200)
car = Car("Toyota Camry", engine)
car.start()
# Toyota Camry заводится...
# Двигатель 200 л.с. запущен`,
      },
      {
        kind: "warn",
        title: "Забытый self",
        md: `Определите метод без \`self\` в сигнатуре — и при вызове получите загадочный \`TypeError: takes 0 positional arguments but 1 was given\`: Python честно передаёт экземпляр первым аргументом, а принимать его некому.

**Правильно:**
\`\`\`python
class MyClass:
    def method(self):  # self обязателен!
        pass
\`\`\`

**Неправильно:**
\`\`\`python
class MyClass:
    def method():  # TypeError при вызове!
        pass
\`\`\``,
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
      {
        q: "Что делает super()?",
        options: [
          "Создаёт новый экземпляр класса",
          "Вызывает методы родительского класса",
          "Делает метод статическим",
          "Удаляет атрибуты",
        ],
        answer: 1,
        explain: "super() используется для вызова методов родительского класса, особенно в конструкторе для инициализации унаследованных атрибутов.",
      },
      {
        q: "Какой метод вызывается при print(obj)?",
        options: ["__repr__", "__str__", "__print__", "__display__"],
        answer: 1,
        explain: "__str__ определяет строковое представление объекта для пользователя. __repr__ — для разработчика (используется в отладчике).",
      },
      {
        q: "Что такое полиморфизм?",
        options: [
          "Создание новых классов",
          "Способность объектов разных классов отвечать на одни и те же методы",
          "Скрытие данных",
          "Наследование атрибутов",
        ],
        answer: 1,
        explain: "Полиморфизм позволяет писать общий код, работающий с разными типами объектов, если они реализуют одинаковый интерфейс.",
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
      {
        id: "py9t3",
        title: "Очередь",
        md: `Создайте \`class Queue\` с методами:
- \`enqueue(item)\` — добавить в конец, вернуть размер
- \`dequeue()\` — снять первый (пустая очередь → \`None\`)
- \`front()\` — посмотреть первый, не снимая
- \`size\` — property с количеством элементов`,
        starter: `class Queue:
    # ваш код
    pass

q = Queue()
q.enqueue(1)
q.enqueue(2)
print(q.dequeue(), q.front(), q.size)`,
        tests: `
__test("enqueue возвращает размер", lambda: (lambda q: (q.enqueue("a"), q.enqueue("b")))(Queue()), (1, 2))
def fifo():
    q = Queue()
    q.enqueue(1); q.enqueue(2); q.enqueue(3)
    return [q.dequeue(), q.dequeue(), q.dequeue()]
__test("FIFO", fifo, [1, 2, 3])
__test("dequeue пустой → None", lambda: Queue().dequeue(), None)
__test("front не снимает", lambda: (lambda q: (q.enqueue(42), q.front(), q.front(), q.size)[-1])(Queue()), 1)`,
        solution: `class Queue:
    def __init__(self):
        self._items = []

    def enqueue(self, item):
        self._items.append(item)
        return len(self._items)

    def dequeue(self):
        if not self._items:
            return None
        return self._items.pop(0)

    def front(self):
        return self._items[0] if self._items else None

    @property
    def size(self):
        return len(self._items)`,
      },
      {
        id: "py9t4",
        title: "Класс Point с магическими методами",
        md: `Создайте \`class Point\` с полями \`x\`, \`y\` и магическими методами:
- \`__add__(other)\` — сложение точек
- \`__sub__(other)\` — вычитание точек
- \`__eq__(other)\` — сравнение на равенство
- \`__str__\` — строковое представление \`(x, y)\``,
        starter: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    # добавьте магические методы

p1 = Point(1, 2)
p2 = Point(3, 4)
print(p1 + p2)  # (4, 6)
print(p1 == Point(1, 2))  # True`,
        tests: `
__test("сложение", lambda: str(Point(1, 2) + Point(3, 4)), "(4, 6)")
__test("вычитание", lambda: str(Point(5, 7) - Point(2, 3)), "(3, 4)")
__test("равенство", lambda: Point(1, 2) == Point(1, 2), True)
__test("неравенство", lambda: Point(1, 2) == Point(3, 4), False)
__test("строковое представление", lambda: str(Point(10, 20)), "(10, 20)")`,
        solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Point(self.x - other.x, self.y - other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __str__(self):
        return f"({self.x}, {self.y})"`,
      },
      {
        id: "py9t5",
        title: "Наследование: Фигуры",
        md: `Создайте иерархию классов:
- \`Shape\` (абстрактный базовый класс) с абстрактным методом \`area()\`
- \`Circle\` (наследует от Shape) с конструктором \`__init__(radius)\` и реализацией \`area()\`
- \`Rectangle\` (наследует от Shape) с конструктором \`__init__(width, height)\` и реализацией \`area()\`

Площадь круга: \`π * r²\`, площадь прямоугольника: \`width * height\`.`,
        starter: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    # ваш код
    pass

class Rectangle(Shape):
    # ваш код
    pass

c = Circle(5)
r = Rectangle(4, 6)
print(c.area())  # 78.54
print(r.area())  # 24`,
        tests: `
__test("Circle area", lambda: round(Circle(5).area(), 2), 78.54)
__test("Rectangle area", lambda: Rectangle(4, 6).area(), 24)
__test("Circle area (r=1)", lambda: round(Circle(1).area(), 2), 3.14)
__test("Rectangle area (2x3)", lambda: Rectangle(2, 3).area(), 6)`,
        solution: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height`,
      },
    ],
  },

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
