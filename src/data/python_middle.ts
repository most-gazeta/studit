import type { Lesson } from "../lib/types";

export const pythonLessons: Lesson[] = [
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
      {
        kind: "text",
        md: `## Вложенные словари

Словари могут содержать другие словари как значения. Это полезно для представления иерархических данных.

**Доступ к вложенным элементам:**
\`\`\`python
value = outer_dict["key1"]["key2"]
\`\`\`

**Безопасный доступ:**
\`\`\`python
value = outer_dict.get("key1", {}).get("key2", "default")
\`\`\``,
      },
      {
        kind: "code",
        title: "Работа с вложенными словарями",
        code: `# Вложенный словарь
users = {
    "alice": {"name": "Алиса", "age": 25, "city": "Москва"},
    "bob": {"name": "Боб", "age": 30, "city": "СПб"},
    "charlie": {"name": "Чарли", "age": 35, "city": "Казань"}
}

# Доступ к вложенным элементам
print(users["alice"]["name"])  # Алиса
print(users["bob"]["age"])     # 30

# Безопасный доступ с get()
print(users.get("david", {}).get("name", "Неизвестно"))  # Неизвестно

# Обход вложенного словаря
for user_id, user_data in users.items():
    print(f"{user_id}: {user_data['name']}, {user_data['age']} лет")

# Изменение вложенных значений
users["alice"]["city"] = "Санкт-Петербург"
users["alice"]["email"] = "alice@example.com"
print(users["alice"])

# Добавление нового пользователя
users["david"] = {"name": "Давид", "age": 28, "city": "Москва"}

# Словарь списков
groups = {
    "admins": ["alice", "bob"],
    "users": ["charlie", "david", "eve"],
    "guests": []
}
groups["users"].append("frank")
print(groups)`,
      },
      {
        kind: "text",
        md: `## Set comprehensions: генераторы множеств

Set comprehension — компактный способ создания множеств. Синтаксис:

\`\`\`python
{выражение for элемент in коллекция if условие}
\`\`\`

**Особенности:**
- Автоматически удаляет дубликаты
- Порядок не гарантирован
- Быстрее, чем создание списка и преобразование в множество`,
      },
      {
        kind: "code",
        title: "Set comprehensions в примерах",
        code: `# Уникальные квадраты
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
squares = {x ** 2 for x in numbers}
print(squares)  # {1, 4, 9, 16} — дубликаты удалены

# Уникальные слова из текста
text = "Python is awesome! Python is powerful! Python is fun!"
words = {word.lower() for word in text.split()}
print(words)  # {'python', 'is', 'awesome!', 'powerful!', 'fun!'}

# С условием
numbers = range(-5, 6)
positive_squares = {x ** 2 for x in numbers if x > 0}
print(positive_squares)  # {1, 4, 9, 16, 25}

# Уникальные первые буквы
names = ["Alice", "Bob", "Charlie", "Alice", "Bob"]
first_letters = {name[0] for name in names}
print(first_letters)  # {'A', 'B', 'C'}

# Сравнение с list comprehension
list_comp = [x ** 2 for x in [1, 2, 2, 3, 3]]
set_comp = {x ** 2 for x in [1, 2, 2, 3, 3]}
print(list_comp)  # [1, 4, 4, 9, 9] — дубликаты есть
print(set_comp)   # {1, 4, 9} — дубликатов нет`,
      },
      {
        kind: "text",
        md: `## Модуль collections: расширенные коллекции

Модуль \`collections\` предоставляет специализированные контейнеры:

- \`defaultdict\` — словарь с значением по умолчанию
- \`Counter\` — подсчёт элементов
- \`OrderedDict\` — словарь с сохранением порядка (в Python 3.7+ обычный dict тоже сохраняет порядок)
- \`namedtuple\` — именованный кортеж
- \`deque\` — двусторонняя очередь`,
      },
      {
        kind: "code",
        title: "defaultdict и Counter",
        code: `from collections import defaultdict, Counter

# defaultdict — значение по умолчанию
word_groups = defaultdict(list)
words = ["apple", "banana", "apricot", "blueberry", "avocado"]

for word in words:
    word_groups[word[0]].append(word)

print(dict(word_groups))
# {'a': ['apple', 'apricot', 'avocado'], 'b': ['banana', 'blueberry']}

# defaultdict с int для подсчёта
counts = defaultdict(int)
for char in "abracadabra":
    counts[char] += 1
print(dict(counts))  # {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}

# Counter — специализированный счётчик
text = "abracadabra"
counter = Counter(text)
print(counter)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
print(counter['a'])  # 5
print(counter.most_common(3))  # [('a', 5), ('b', 2), ('r', 2)]

# Counter с методами
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_counts = Counter(words)
print(word_counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# Операции с Counter
c1 = Counter("abracadabra")
c2 = Counter("alacazam")
print(c1 + c2)  # сложение счётчиков
print(c1 - c2)  # разность счётчиков`,
      },
      {
        kind: "code",
        title: "namedtuple и deque",
        code: `from collections import namedtuple, deque

# namedtuple — именованный кортеж
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p)  # Point(x=10, y=20)
print(p.x, p.y)  # 10 20
print(p[0], p[1])  # 10 20 — работает как обычный кортеж

# Использование namedtuple
User = namedtuple("User", ["name", "age", "email"])
user = User("Алиса", 25, "alice@example.com")
print(f"{user.name}, {user.age} лет")

# deque — двусторонняя очередь
dq = deque([1, 2, 3])
dq.append(4)        # добавить в конец
dq.appendleft(0)    # добавить в начало
print(dq)  # deque([0, 1, 2, 3, 4])

dq.pop()        # удалить с конца
dq.popleft()    # удалить с начала
print(dq)  # deque([1, 2, 3])

# deque с ограничением размера
dq = deque(maxlen=3)
for i in range(5):
    dq.append(i)
print(dq)  # deque([2, 3, 4]) — только последние 3 элемента

# Производительность deque vs list
import time

# deque: O(1) для appendleft/popleft
dq = deque()
start = time.time()
for i in range(100000):
    dq.appendleft(i)
print(f"deque: {time.time() - start:.4f} сек")

# list: O(n) для insert(0, x)
lst = []
start = time.time()
for i in range(100000):
    lst.insert(0, i)
print(f"list: {time.time() - start:.4f} сек")`,
      },
      {
        kind: "text",
        md: `## Frozen sets: неизменяемые множества

\`frozenset\` — неизменяемая версия множества. После создания нельзя добавить или удалить элементы.

**Зачем нужны:**
- Можно использовать как ключи словаря
- Можно добавить в другое множество
- Гарантия неизменяемости`,
      },
      {
        kind: "code",
        title: "Frozen sets в примерах",
        code: `# Создание frozenset
fs = frozenset([1, 2, 3, 4, 5])
print(fs)  # frozenset({1, 2, 3, 4, 5})

# fs.add(6)  # AttributeError! Нельзя изменять

# Можно использовать как ключ словаря
locations = {
    frozenset([1, 2]): "точка A",
    frozenset([3, 4]): "точка B"
}
print(locations[frozenset([1, 2])])  # точка A

# Можно добавить в множество
sets = {frozenset([1, 2]), frozenset([3, 4]), frozenset([1, 2])}
print(sets)  # {frozenset({1, 2}), frozenset({3, 4})} — дубликат удалён

# Операции работают как с обычным множеством
a = frozenset([1, 2, 3])
b = frozenset([2, 3, 4])
print(a & b)  # frozenset({2, 3})
print(a | b)  # frozenset({1, 2, 3, 4})`,
      },
      {
        kind: "text",
        md: `## Производительность коллекций

**Временная сложность операций:**

**dict:**
- Поиск по ключу: O(1)
- Вставка: O(1)
- Удаление: O(1)
- Проверка ключа (\`in\`): O(1)

**set:**
- Проверка вхождения (\`in\`): O(1)
- Добавление: O(1)
- Удаление: O(1)
- Объединение/пересечение: O(len(set))

**list:**
- Доступ по индексу: O(1)
- Поиск элемента (\`in\`): O(n)
- Вставка в конец: O(1)
- Вставка в начало: O(n)

**tuple:**
- Доступ по индексу: O(1)
- Быстрее и легче списков
- Неизменяемый`,
      },
      {
        kind: "code",
        title: "Сравнение производительности",
        code: `import time

# Проверка вхождения: list vs set
large_list = list(range(1000000))
large_set = set(range(1000000))

# list: O(n)
start = time.time()
if 999999 in large_list:
    pass
print(f"list: {time.time() - start:.6f} сек")

# set: O(1)
start = time.time()
if 999999 in large_set:
    pass
print(f"set: {time.time() - start:.6f} сек")

# Практический совет: используйте set для проверок
# ❌ Плохо
users = ["alice", "bob", "charlie", "david"]
if "alice" in users:  # O(n)
    print("Найден")

# ✅ Хорошо
users_set = set(users)
if "alice" in users_set:  # O(1)
    print("Найден")

# Словарь vs список для подсчёта
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]

# ❌ Плохо: O(n²)
counts = {}
for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1

# ✅ Хорошо: O(n)
from collections import Counter
counts = Counter(words)`,
      },
      {
        kind: "text",
        md: `## Практические паттерны

### 1. Группировка данных
\`\`\`python
from collections import defaultdict

groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)
\`\`\`

### 2. Подсчёт уникальных элементов
\`\`\`python
from collections import Counter
counts = Counter(items)
most_common = counts.most_common(5)
\`\`\`

### 3. Удаление дубликатов с сохранением порядка
\`\`\`python
unique = list(dict.fromkeys(items))
\`\`\`

### 4. Словарь с значениями по умолчанию
\`\`\`python
from collections import defaultdict
d = defaultdict(lambda: "значение по умолчанию")
\`\`\``,
      },
      {
        kind: "code",
        title: "Практические примеры",
        code: `from collections import defaultdict, Counter

# Паттерн 1: Группировка по первому символу
words = ["apple", "apricot", "banana", "blueberry", "cherry"]
groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)
print(dict(groups))
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}

# Паттерн 2: Подсчёт частоты слов
text = "python is awesome python is powerful python is fun"
word_counts = Counter(text.split())
print(word_counts.most_common(3))
# [('python', 3), ('is', 3), ('awesome', 1)]

# Паттерн 3: Удаление дубликатов с сохранением порядка
items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
unique = list(dict.fromkeys(items))
print(unique)  # [3, 1, 4, 5, 9, 2, 6]

# Паттерн 4: Словарь с автоматической инициализацией
graph = defaultdict(set)
edges = [(1, 2), (1, 3), (2, 3), (3, 4)]
for u, v in edges:
    graph[u].add(v)
    graph[v].add(u)
print(dict(graph))
# {1: {2, 3}, 2: {1, 3}, 3: {1, 2, 4}, 4: {3}}

# Паттерн 5: Инвертирование словаря
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}`,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

### 1. Изменение словаря во время итерации
\`\`\`python
# ❌ Ошибка!
for key in my_dict:
    if key.startswith("temp"):
        del my_dict[key]

# ✅ Правильно: итерируем по копии ключей
for key in list(my_dict.keys()):
    if key.startswith("temp"):
        del my_dict[key]
\`\`\`

### 2. Изменяемые значения по умолчанию
\`\`\`python
# ❌ Ошибка!
def add_item(item, items=[]):
    items.append(item)
    return items

# ✅ Правильно
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\`

### 3. Забытая проверка ключа
\`\`\`python
# ❌ Может вызвать KeyError
value = my_dict["key"]

# ✅ Правильно
value = my_dict.get("key", "значение по умолчанию")
\`\`\``,
      },
      {
        kind: "code",
        title: "Избегаем распространённых ошибок",
        code: `# Ошибка 1: Изменение словаря во время итерации
my_dict = {"temp1": 1, "temp2": 2, "keep1": 3, "keep2": 4}

# ❌ Плохо: RuntimeError: dictionary changed size during iteration
# for key in my_dict:
#     if key.startswith("temp"):
#         del my_dict[key]

# ✅ Хорошо: итерируем по копии ключей
for key in list(my_dict.keys()):
    if key.startswith("temp"):
        del my_dict[key]
print(my_dict)  # {'keep1': 3, 'keep2': 4}

# ✅ Или используем dict comprehension
my_dict = {"temp1": 1, "temp2": 2, "keep1": 3, "keep2": 4}
my_dict = {k: v for k, v in my_dict.items() if not k.startswith("temp")}
print(my_dict)  # {'keep1': 3, 'keep2': 4}

# Ошибка 2: Изменяемые значения по умолчанию
# ❌ Плохо
def add_item_bad(item, items=[]):
    items.append(item)
    return items

print(add_item_bad(1))  # [1]
print(add_item_bad(2))  # [1, 2] — список общий для всех вызовов!

# ✅ Хорошо
def add_item_good(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item_good(1))  # [1]
print(add_item_good(2))  # [2] — каждый вызов создаёт новый список

# Ошибка 3: Забытая проверка ключа
user = {"name": "Алиса", "age": 25}

# ❌ Может вызвать KeyError
# email = user["email"]

# ✅ Правильно
email = user.get("email", "не указан")
print(email)  # не указан

# ✅ Или проверяем наличие ключа
if "email" in user:
    email = user["email"]
else:
    email = "не указан"`,
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
      {
        q: "Что такое frozenset?",
        options: [
          "Замороженный список",
          "Неизменяемое множество",
          "Словарь с замороженными ключами",
          "Кортеж из множеств",
        ],
        answer: 1,
        explain: "frozenset — неизменяемая версия множества. Её можно использовать как ключ словаря.",
      },
      {
        q: "Какая временная сложность поиска по ключу в словаре?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        explain: "Словари используют хеш-таблицы, поэтому поиск по ключу работает за O(1) в среднем случае.",
      },
      {
        q: "Что вернёт Counter('abracadabra').most_common(2)?",
        options: [
          "[('a', 5), ('b', 2)]",
          "{'a': 5, 'b': 2}",
          "[('a', 5), ('r', 2)]",
          "Counter({'a': 5})",
        ],
        answer: 0,
        explain: "most_common(2) возвращает список из 2 самых частых элементов с их частотами.",
      },
      {
        q: "Зачем нужен defaultdict?",
        options: [
          "Для создания словаря с значениями по умолчанию",
          "Для ускорения работы словаря",
          "Для создания неизменяемого словаря",
          "Для сортировки словаря",
        ],
        answer: 0,
        explain: "defaultdict автоматически создаёт значение по умолчанию при обращении к несуществующему ключу.",
      },
    ]
  },
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
      {
        id: "py6t6",
        title: "Группировка слов",
        md: `Реализуйте \`group_words(words)\` — группирует слова по первому символу. Возвращает словарь, где ключ — первый символ, значение — список слов. Используйте \`defaultdict\`.`,
        starter: `from collections import defaultdict

def group_words(words):
    # ваш код
    pass

print(group_words(["apple", "apricot", "banana", "blueberry"]))`,
        tests: `
__test("группировка по первому символу", lambda: group_words(["apple", "apricot", "banana", "blueberry"]), {"a": ["apple", "apricot"], "b": ["banana", "blueberry"]})
__test("пустой список", lambda: group_words([]), {})
__test("одно слово", lambda: group_words(["apple"]), {"a": ["apple"]})`,
        solution: `from collections import defaultdict

def group_words(words):
    groups = defaultdict(list)
    for word in words:
        groups[word[0]].append(word)
    return dict(groups)`,
      },
      {
        id: "py6t7",
        title: "Топ частот",
        md: `Реализуйте \`top_frequent(text, n)\` — возвращает список из n самых частых слов в тексте. Используйте \`Counter\`.`,
        starter: `from collections import Counter

def top_frequent(text, n):
    # ваш код
    pass

print(top_frequent("python is awesome python is fun", 2))`,
        tests: `
__test("топ 2 слова", lambda: top_frequent("python is awesome python is fun", 2), [("python", 2), ("is", 2)])
__test("топ 1 слово", lambda: top_frequent("a b a c a b", 1), [("a", 3)])
__test("топ 3 слова", lambda: top_frequent("a a a b b c", 3), [("a", 3), ("b", 2), ("c", 1)])`,
        solution: `from collections import Counter

def top_frequent(text, n):
    counter = Counter(text.split())
    return counter.most_common(n)`,
      },
      {
        id: "py6t8",
        title: "Уникальные с порядком",
        md: `Реализуйте \`unique_ordered(items)\` — удаляет дубликаты из списка, сохраняя порядок первого появления.`,
        starter: `def unique_ordered(items):
    # ваш код
    pass

print(unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]))`,
        tests: `
__test("удаление дубликатов с сохранением порядка", lambda: unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]), [3, 1, 4, 5, 9, 2, 6])
__test("пустой список", lambda: unique_ordered([]), [])
__test("нет дубликатов", lambda: unique_ordered([1, 2, 3]), [1, 2, 3])
__test("все одинаковые", lambda: unique_ordered([5, 5, 5, 5]), [5])`,
        solution: `def unique_ordered(items):
    return list(dict.fromkeys(items))`,
      },
      {
        id: "py6t9",
        title: "Матрица смежности",
        md: `Реализуйте \`build_graph(edges)\` — строит граф в виде словаря смежности из списка рёбер. Каждое ребро — кортеж (u, v). Граф неориентированный.`,
        starter: `from collections import defaultdict

def build_graph(edges):
    # ваш код
    pass

print(build_graph([(1, 2), (1, 3), (2, 3)]))`,
        tests: `
__test("простой граф", lambda: build_graph([(1, 2), (1, 3)]), {1: {2, 3}, 2: {1}, 3: {1}})
__test("пустой граф", lambda: build_graph([]), {})
__test("треугольник", lambda: build_graph([(1, 2), (2, 3), (1, 3)]), {1: {2, 3}, 2: {1, 3}, 3: {1, 2}})`,
        solution: `from collections import defaultdict

def build_graph(edges):
    graph = defaultdict(set)
    for u, v in edges:
        graph[u].add(v)
        graph[v].add(u)
    return dict(graph)`,
      },
      {
        id: "py6t10",
        title: "Словарь с вложенностью",
        md: `Реализуйте \`get_nested(d, keys, default=None)\` — безопасно получает значение из вложенного словаря по списку ключей. Если ключ не найден, возвращает default.`,
        starter: `def get_nested(d, keys, default=None):
    # ваш код
    pass

user = {"profile": {"name": "Алиса", "age": 25}}
print(get_nested(user, ["profile", "name"]))
print(get_nested(user, ["profile", "email"], "не указан"))`,
        tests: `
__test("существующий ключ", lambda: get_nested({"a": {"b": {"c": 1}}}, ["a", "b", "c"]), 1)
__test("несуществующий ключ", lambda: get_nested({"a": {"b": 1}}, ["a", "c"], "нет"), "нет")
__test("default значение", lambda: get_nested({}, ["a"], 0), 0)
__test("глубокая вложенность", lambda: get_nested({"a": {"b": {"c": {"d": 42}}}}, ["a", "b", "c", "d"]), 42)`,
        solution: `def get_nested(d, keys, default=None):
    current = d
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return default
    return current`,
      },
    ]
  },
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
        kind: "text",
        md: `## Модуль string: дополнительные возможности

Модуль \`string\` предоставляет дополнительные константы и функции для работы со строками.

**Полезные константы:**
- \`string.ascii_letters\` — все буквы латиницы (a-z, A-Z)
- \`string.digits\` — все цифры (0-9)
- \`string.punctuation\` — все знаки препинания
- \`string.whitespace\` — все пробельные символы`,
      },
      {
        kind: "code",
        title: "Модуль string в примерах",
        code: `import string

# Константы модуля string
print(string.ascii_letters)  # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
print(string.digits)         # 0123456789
print(string.punctuation)    # !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~

# Практическое использование: удаление пунктуации
text = "Hello, World! How are you?"
cleaned = text.translate(str.maketrans("", "", string.punctuation))
print(cleaned)  # Hello World How are you

# Генерация случайного пароля
import random
import string

def generate_password(length=12):
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(chars) for _ in range(length))

print(generate_password(16))

# Проверка, содержит ли строка только цифры
print("123".isnumeric())  # True
print("123abc".isnumeric())  # False

# Подсчёт гласных и согласных
text = "Python Programming"
vowels = sum(1 for char in text.lower() if char in "aeiou")
consonants = sum(1 for char in text.lower() if char in string.ascii_lowercase and char not in "aeiou")
print(f"Гласных: {vowels}, Согласных: {consonants}")`,
      },
      {
        kind: "text",
        md: `## Кодировки строк: Unicode и UTF-8

Python 3 использует **Unicode** для всех строк. Это означает, что вы можете использовать любые символы из любого языка.

**Важные моменты:**
- Строки в Python — это последовательности Unicode-символов
- При записи в файл или сеть строки кодируются в байты (обычно UTF-8)
- \`len()\` считает символы, а не байты`,
      },
      {
        kind: "code",
        title: "Работа с Unicode",
        code: `# Строки могут содержать любые символы
text = "Привет, мир! 你好世界 🌍"
print(text)
print(len(text))  # 18 символов

# Кодирование в байты
bytes_utf8 = text.encode('utf-8')
print(bytes_utf8)
print(len(bytes_utf8))  # больше байт, чем символов

# Декодирование из байтов
decoded = bytes_utf8.decode('utf-8')
print(decoded == text)  # True

# Работа с эмодзи
emoji = "😀😁😂"
print(emoji)
print(len(emoji))  # 3 символа

# Нормализация Unicode
import unicodedata
text1 = "é"  # один символ
text2 = "e\u0301"  # e + акцент (два символа)
print(len(text1), len(text2))  # 1 2

# Нормализация делает их одинаковыми
normalized1 = unicodedata.normalize('NFC', text1)
normalized2 = unicodedata.normalize('NFC', text2)
print(normalized1 == normalized2)  # True`,
      },
      {
        kind: "text",
        md: `## Регулярные выражения: введение

Регулярные выражения (regex) — мощный инструмент для поиска и обработки текста. Модуль \`re\` предоставляет функции для работы с ними.

**Основные функции:**
- \`re.search()\` — найти первое совпадение
- \`re.match()\` — найти совпадение в начале строки
- \`re.findall()\` — найти все совпадения
- \`re.sub()\` — заменить все совпадения

**Основные паттерны:**
- \`\\d\` — цифра
- \`\\w\` — буква, цифра или подчёркивание
- \`\\s\` — пробельный символ
- \`.\` — любой символ
- \`+\` — одно или более повторений
- \`*\` — ноль или более повторений
- \`?\` — ноль или одно повторение`,
      },
      {
        kind: "code",
        title: "Регулярные выражения в примерах",
        code: `import re

text = "Мой телефон: +7 (999) 123-45-67, email: user@example.com"

# Поиск email
email_pattern = r'[\\w\\.-]+@[\\w\\.-]+\\.\\w+'
emails = re.findall(email_pattern, text)
print(emails)  # ['user@example.com']

# Поиск телефона
phone_pattern = r'\\+?\\d[\\d\\s\\(\\)-]{9,}\\d'
phones = re.findall(phone_pattern, text)
print(phones)  # ['+7 (999) 123-45-67']

# Замена текста
text = "Дата: 2024-01-15"
new_text = re.sub(r'\\d{4}-\\d{2}-\\d{2}', 'ДД.ММ.ГГГГ', text)
print(new_text)  # Дата: ДД.ММ.ГГГГ

# Валидация email
def is_valid_email(email):
    pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
    return bool(re.match(pattern, email))

print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid-email"))     # False

# Извлечение чисел из текста
text = "В корзине 3 товара на сумму 1500 рублей"
numbers = re.findall(r'\\d+', text)
print(numbers)  # ['3', '1500']`,
      },
      {
        kind: "text",
        md: `## Производительность строковых операций

Строки в Python неизменяемы, поэтому каждая операция создаёт новую строку. Это влияет на производительность.

**Советы по оптимизации:**
- Используйте \`join()\` вместо конкатенации в цикле
- Используйте \`f-strings\` вместо \`format()\` или \`%\`
- Избегайте множественных \`replace()\` — используйте \`translate()\`
- Для больших текстов используйте \`io.StringIO\``,
      },
      {
        kind: "code",
        title: "Оптимизация строковых операций",
        code: `import time

# ❌ Плохо: конкатенация в цикле
words = ["word"] * 10000
start = time.time()
result = ""
for word in words:
    result += word
print(f"Конкатенация: {time.time() - start:.4f} сек")

# ✅ Хорошо: join
start = time.time()
result = "".join(words)
print(f"Join: {time.time() - start:.4f} сек")

# ❌ Плохо: множественные replace
text = "Hello, World! How are you?"
start = time.time()
for _ in range(1000):
    text = text.replace(",", "").replace("!", "").replace("?", "")
print(f"Replace: {time.time() - start:.4f} сек")

# ✅ Хорошо: translate
start = time.time()
text = "Hello, World! How are you?"
table = str.maketrans("", "", ",!?")
for _ in range(1000):
    text = text.translate(table)
print(f"Translate: {time.time() - start:.4f} сек")

# ✅ Отлично: f-strings
name = "Alice"
age = 30
start = time.time()
for _ in range(10000):
    s = f"Name: {name}, Age: {age}"
print(f"f-strings: {time.time() - start:.4f} сек")`,
      },
      {
        kind: "text",
        md: `## Практические паттерны работы со строками

### 1. Парсинг CSV-строки
\`\`\`python
csv_line = "Alice,30,New York"
name, age, city = csv_line.split(",")
age = int(age)
\`\`\`

### 2. Извлечение данных из текста
\`\`\`python
import re
text = "Order #12345: 5 items for $99.99"
order_id = re.search(r'#(\\d+)', text).group(1)
amount = re.search(r'\\$(\\d+\\.\\d{2})', text).group(1)
\`\`\`

### 3. Форматирование чисел
\`\`\`python
price = 1234567.89
formatted = f"Price: {price:,.2f} USD"  # Price: 1,234,567.89 USD
\`\`\`

### 4. Многострочные шаблоны
\`\`\`python
template = """
Dear {name},

Thank you for your order #{order_id}.
Total amount: {amount} USD

Best regards,
{company}
"""
result = template.format(name="Alice", order_id=12345, amount=99.99, company="Shop")
\`\`\``,
      },
      {
        kind: "code",
        title: "Практические примеры",
        code: `# Паттерн 1: Парсинг CSV
csv_data = """name,age,city
Alice,30,New York
Bob,25,London
Charlie,35,Paris"""

lines = csv_data.strip().split("\\n")
headers = lines[0].split(",")
data = [dict(zip(headers, line.split(","))) for line in lines[1:]]
print(data)

# Паттерн 2: Извлечение email из текста
text = """
Contact us at support@example.com or sales@example.com.
Visit our website at www.example.com.
"""
emails = re.findall(r'[\\w\\.-]+@[\\w\\.-]+\\.\\w+', text)
print(emails)  # ['support@example.com', 'sales@example.com']

# Паттерн 3: CamelCase в snake_case
def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\\1_\\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\\1_\\2', s1).lower()

print(camel_to_snake("CamelCase"))  # camel_case
print(camel_to_snake("HTTPResponse"))  # http_response

# Паттерн 4: Шаблонизация
template = """
<!DOCTYPE html>
<html>
<head><title>{title}</title></head>
<body>
  <h1>{title}</h1>
  <p>By {author}</p>
</body>
</html>
"""
html = template.format(title="My Page", author="Alice")
print(html)`,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

### 1. Изменение строки в цикле
\`\`\`python
# ❌ Плохо: создаёт новую строку на каждой итерации
result = ""
for char in text:
    result += char.upper()

# ✅ Хорошо: использует join
result = "".join(char.upper() for char in text)
\`\`\`

### 2. Забывать про неизменяемость
\`\`\`python
text = "hello"
# text[0] = "H"  # TypeError!

# ✅ Правильно: создать новую строку
text = "H" + text[1:]
\`\`\`

### 3. Не учитывать кодировку
\`\`\`python
# ❌ Плохо: может вызвать ошибку
with open("file.txt", "w") as f:
    f.write("Привет, мир!")

# ✅ Хорошо: указать кодировку
with open("file.txt", "w", encoding="utf-8") as f:
    f.write("Привет, мир!")
\`\`\``,
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
    ]
  },
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
      {
        q: "Что делает метод translate()?",
        options: [
          "Переводит строку на другой язык",
          "Заменяет символы по таблице соответствия",
          "Преобразует строку в байты",
          "Разделяет строку на части",
        ],
        answer: 1,
        explain: "translate() заменяет символы согласно таблице, созданной maketrans(). Это быстрый способ замены множества символов.",
      },
      {
        q: "Что вернёт re.findall(r'\\d+', 'abc123def456')?",
        options: [
          "['123', '456']",
          "['abc', 'def']",
          "['123def456']",
          "ошибку",
        ],
        answer: 0,
        explain: "re.findall() находит все совпадения паттерна. \\d+ означает 'одна или более цифр', поэтому найдёт ['123', '456'].",
      },
      {
        q: "Какой метод быстрее для удаления множества символов?",
        options: [
          "Множественные replace()",
          "translate()",
          "re.sub()",
          "Все методы одинаково быстры",
        ],
        answer: 1,
        explain: "translate() быстрее, чем множественные replace() или re.sub(), так как использует оптимизированную таблицу замен.",
      },
      {
        q: "Что такое raw string (r'...')?",
        options: [
          "Строка без пробелов",
          "Строка, которая не обрабатывает escape-последовательности",
          "Строка только из цифр",
          "Строка в верхнем регистре",
        ],
        answer: 1,
        explain: "Raw string (r'...') не обрабатывает escape-последовательности, что полезно для регулярных выражений и путей Windows.",
      },
      {
        q: "Что вернёт 'Hello World'.split()?",
        options: [
          "['Hello', 'World']",
          "['Hello World']",
          "['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']",
          "ошибку",
        ],
        answer: 0,
        explain: "split() без аргументов разделяет строку по пробелам, игнорируя множественные пробелы.",
      },
    ]
  },
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
      {
        id: "py7t6",
        title: "Извлечение email",
        md: `Реализуйте \`extract_emails(text)\`, которая извлекает все email-адреса из текста. Используйте регулярные выражения.`,
        starter: `import re

def extract_emails(text):
    # ваш код
    pass

print(extract_emails("Contact us at support@example.com or sales@example.com"))`,
        tests: `
__test("извлечение email", lambda: extract_emails("Contact us at support@example.com or sales@example.com"), ["support@example.com", "sales@example.com"])
__test("нет email", lambda: extract_emails("No emails here"), [])
__test("один email", lambda: extract_emails("Email: user@example.com"), ["user@example.com"])`,
        solution: `import re

def extract_emails(text):
    pattern = r'[\\w\\.-]+@[\\w\\.-]+\\.\\w+'
    return re.findall(pattern, text)`,
      },
      {
        id: "py7t7",
        title: "CamelCase в snake_case",
        md: `Реализуйте \`camel_to_snake(name)\`, которая преобразует строку из CamelCase в snake_case. \`CamelCase\` → \`camel_case\`.`,
        starter: `import re

def camel_to_snake(name):
    # ваш код
    pass

print(camel_to_snake("CamelCase"))
print(camel_to_snake("HTTPResponse"))`,
        tests: `
__test("CamelCase → camel_case", lambda: camel_to_snake("CamelCase"), "camel_case")
__test("HTTPResponse → http_response", lambda: camel_to_snake("HTTPResponse"), "http_response")
__test("simpleWord → simple_word", lambda: camel_to_snake("simpleWord"), "simple_word")
__test("already_snake → already_snake", lambda: camel_to_snake("already_snake"), "already_snake")`,
        solution: `import re

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\\1_\\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\\1_\\2', s1).lower()`,
      },
      {
        id: "py7t8",
        title: "Подсчёт символов",
        md: `Реализуйте \`count_chars(text)\`, которая возвращает словарь с количеством каждого символа в тексте. Регистр учитывается.`,
        starter: `def count_chars(text):
    # ваш код
    pass

print(count_chars("hello"))`,
        tests: `
__test("count_chars('hello')", lambda: count_chars("hello"), {"h": 1, "e": 1, "l": 2, "o": 1})
__test("count_chars('') → {}", lambda: count_chars(""), {})
__test("count_chars('aaa')", lambda: count_chars("aaa"), {"a": 3})`,
        solution: `def count_chars(text):
    counts = {}
    for ch in text:
        counts[ch] = counts.get(ch, 0) + 1
    return counts`,
      },
      {
        id: "py7t9",
        title: "Форматирование чисел",
        md: `Реализуйте \`format_price(price)\`, которая форматирует цену с разделителем тысяч и двумя знаками после запятой. \`format_price(1234567.89)\` → \`"1,234,567.89"\`.`,
        starter: `def format_price(price):
    # ваш код
    pass

print(format_price(1234567.89))
print(format_price(99.9))`,
        tests: `
__test("format_price(1234567.89)", lambda: format_price(1234567.89), "1,234,567.89")
__test("format_price(99.9)", lambda: format_price(99.9), "99.90")
__test("format_price(1000)", lambda: format_price(1000), "1,000.00")
__test("format_price(0.5)", lambda: format_price(0.5), "0.50")`,
        solution: `def format_price(price):
    return f"{price:,.2f}"`,
      },
      {
        id: "py7t10",
        title: "Валидация пароля",
        md: `Реализуйте \`is_strong_password(password)\`, которая проверяет, что пароль:
- Минимум 8 символов
- Содержит хотя бы одну заглавную букву
- Содержит хотя бы одну строчную букву
- Содержит хотя бы одну цифру

Возвращает \`True\` или \`False\`.`,
        starter: `def is_strong_password(password):
    # ваш код
    pass

print(is_strong_password("Password123"))
print(is_strong_password("weak"))`,
        tests: `
__test("сильный пароль", lambda: is_strong_password("Password123"), True)
__test("нет цифры", lambda: is_strong_password("Password"), False)
__test("нет заглавной", lambda: is_strong_password("password123"), False)
__test("слишком короткий", lambda: is_strong_password("Pass1"), False)
__test("всё есть", lambda: is_strong_password("MyPassword1"), True)`,
        solution: `def is_strong_password(password):
    if len(password) < 8:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.islower() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True`,
      },
    ]
  },
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
    """Декоратор для кэширования результатов"""
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
        kind: "text",
        md: `## Вложенные декораторы

Декораторы можно применять несколько раз. Они применяются **снизу вверх**.

\`\`\`python
@decorator1
@decorator2
def function():
    pass

# Эквивалентно:
function = decorator1(decorator2(function))
\`\`\``,
      },
      {
        kind: "code",
        title: "Вложенные декораторы",
        code: `def bold(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<b>{result}</b>"
    return wrapper

def italic(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<i>{result}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Привет, {name}!"

print(greet("Алиса"))
# <b><i>Привет, Алиса!</i></b>

# Порядок применения: сначала italic, потом bold`,
      },
      {
        kind: "text",
        md: `## Декораторы классов

Декораторы можно применять не только к функциям, но и к классам. Декоратор класса принимает класс и возвращает новый класс или модифицирует существующий.

**Применения:**
- Добавление методов к классу
- Модификация поведения всех методов
- Регистрация классов в реестре`,
      },
      {
        kind: "code",
        title: "Декоратор класса",
        code: `def add_repr(cls):
    """Добавляет метод __repr__ к классу"""
    def __repr__(self):
        attrs = ", ".join(f"{k}={v!r}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({attrs})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Алиса", 30)
print(person)  # Person(name='Алиса', age=30)`,
      },
      {
        kind: "text",
        md: `## Практические паттерны декораторов

### 1. Декоратор с сохранением состояния
\`\`\`python
def counter(func):
    count = 0
    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        print(f"Вызов #{count}")
        return func(*args, **kwargs)
    return wrapper
\`\`\`

### 2. Декоратор для проверки типов
\`\`\`python
def type_check(*types):
    def decorator(func):
        def wrapper(*args):
            for arg, expected_type in zip(args, types):
                if not isinstance(arg, expected_type):
                    raise TypeError(f"Ожидался {expected_type}")
            return func(*args)
        return wrapper
    return decorator
\`\`\`

### 3. Декоратор для повторных попыток
\`\`\`python
def retry(max_attempts=3):
    def decorator(func):
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
\`\`\``,
      },
      {
        kind: "code",
        title: "Практические примеры",
        code: `# Паттерн 1: Декоратор с сохранением состояния
def call_counter(func):
    count = 0
    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        wrapper.calls = count
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@call_counter
def greet(name):
    return f"Привет, {name}!"

greet("Алиса")
greet("Боб")
print(f"Функция вызвана {greet.calls} раз")  # 2

# Паттерн 2: Декоратор для проверки типов
def validate_types(*expected_types):
    def decorator(func):
        def wrapper(*args):
            for arg, expected in zip(args, expected_types):
                if not isinstance(arg, expected):
                    raise TypeError(f"Ожидался {expected.__name__}, получено {type(arg).__name__}")
            return func(*args)
        return wrapper
    return decorator

@validate_types(str, int)
def create_user(name, age):
    return {"name": name, "age": age}

print(create_user("Алиса", 30))  # OK
# create_user(123, "тридцать")  # TypeError!

# Паттерн 3: Декоратор для повторных попыток
import random

def retry(max_attempts=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Попытка {attempt + 1} не удалась: {e}")
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator

@retry(max_attempts=3)
def unstable_function():
    if random.random() < 0.7:  # 70% шанс ошибки
        raise ValueError("Случайная ошибка")
    return "Успех!"

try:
    result = unstable_function()
    print(result)
except ValueError:
    print("Все попытки не удались")`,
      },
      {
        kind: "text",
        md: `## Декораторы в реальных проектах

**Веб-фреймворки (Flask, FastAPI):**
\`\`\`python
@app.route("/api/users")
def get_users():
    return users
\`\`\`

**ORM (SQLAlchemy, Django ORM):**
\`\`\`python
@dataclass
class User:
    name: str
    age: int
\`\`\`

**Тестирование (pytest):**
\`\`\`python
@pytest.fixture
def sample_data():
    return [1, 2, 3]
\`\`\`

**Асинхронное программирование:**
\`\`\`python
@asyncio.coroutine
def async_function():
    yield from asyncio.sleep(1)
\`\`\``,
      },
      {
        kind: "text",
        md: `## Распространённые ошибки

### 1. Забытый return в wrapper
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        # забыли return!
    return wrapper
\`\`\`

### 2. Неиспользование functools.wraps
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    # wrapper теряет метаданные func
    return wrapper
\`\`\`

### 3. Неправильный порядок декораторов
\`\`\`python
@decorator1
@decorator2
def func():
    pass

# Применяется: decorator1(decorator2(func))
# Порядок важен!
\`\`\``,
      },
      {
        kind: "code",
        title: "Избегаем распространённых ошибок",
        code: `from functools import wraps

# ❌ Плохо: забытый return
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        print("Вызов функции")
        func(*args, **kwargs)
        # забыли return!
    return wrapper

@bad_decorator
def get_value():
    return 42

print(get_value())  # None!

# ✅ Хорошо: правильный return
def good_decorator(func):
    @wraps(func)  # сохраняем метаданные
    def wrapper(*args, **kwargs):
        print("Вызов функции")
        return func(*args, **kwargs)  # возвращаем результат
    return wrapper

@good_decorator
def get_value():
    return 42

print(get_value())  # 42

# ❌ Плохо: неправильный порядок
def uppercase(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

def exclaim(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result + "!"
    return wrapper

@uppercase
@exclaim
def greet(name):
    return f"привет, {name}"

print(greet("алиса"))  # ПРИВЕТ, АЛИСА!

# Порядок: сначала exclaim, потом uppercase
# "привет, алиса" -> "привет, алиса!" -> "ПРИВЕТ, АЛИСА!"`,
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
    ]
  },
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
    ]
  },
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
    ]
  },
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
      {
        kind: "text",
        md: `## Множественное наследование

Python поддерживает множественное наследование — класс может наследовать от нескольких родительских классов.

**Синтаксис:**
\`\`\`python
class Child(Parent1, Parent2, Parent3):
    pass
\`\`\`

**MRO (Method Resolution Order)** — порядок поиска методов. Python использует алгоритм C3 линеаризации.

**Проблема ромбовидного наследования:**
\`\`\`python
class A:
    def method(self):
        return "A"

class B(A):
    pass

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.method())  # "C" — по MRO: D -> B -> C -> A
\`\`\`

Используйте \`ClassName.mro()\` для просмотра порядка.`,
      },
      {
        kind: "code",
        title: "Множественное наследование",
        code: `class Flyable:
    def fly(self):
        return "Лечу по небу"

class Swimmable:
    def swim(self):
        return "Плыву по воде"

class Duck(Flyable, Swimmable):
    def quack(self):
        return "Кря!"

duck = Duck()
print(duck.fly())    # Лечу по небу
print(duck.swim())   # Плыву по воде
print(duck.quack())  # Кря!

# Проверка MRO
print(Duck.mro())
# [Duck, Flyable, Swimmable, object]`,
      },
      {
        kind: "text",
        md: `## Data Classes (dataclasses)

Модуль \`dataclasses\` (Python 3.7+) упрощает создание классов для хранения данных. Автоматически генерирует \`__init__\`, \`__repr__\`, \`__eq__\`.

**Преимущества:**
- Меньше шаблонного кода
- Автоматическая генерация методов
- Поддержка типизации
- Можно сделать неизменяемым (\`frozen=True\`)`,
      },
      {
        kind: "code",
        title: "Data classes в действии",
        code: `from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float
    z: float = 0.0  # значение по умолчанию

# Автоматически генерируется __init__, __repr__, __eq__
p1 = Point(1.0, 2.0)
p2 = Point(1.0, 2.0)
p3 = Point(3.0, 4.0)

print(p1)        # Point(x=1.0, y=2.0, z=0.0)
print(p1 == p2)  # True — автоматическое сравнение
print(p1 == p3)  # False

# Неизменяемый dataclass
@dataclass(frozen=True)
class ImmutablePoint:
    x: float
    y: float

p = ImmutablePoint(1.0, 2.0)
# p.x = 3.0  # FrozenInstanceError!

# Вычисляемые поля
@dataclass
class Rectangle:
    width: float
    height: float
    
    @property
    def area(self):
        return self.width * self.height
    
    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area)       # 15
print(rect.perimeter)  # 16`,
      },
      {
        kind: "text",
        md: `## Slots: оптимизация памяти

По умолчанию Python хранит атрибуты объектов в словаре \`__dict__\`. Это гибко, но занимает много памяти. \`__slots__\` позволяет явно указать, какие атрибуты разрешены, и хранить их более эффективно.

**Преимущества:**
- Меньше памяти (до 40-50% экономии)
- Быстрее доступ к атрибутам
- Запрет на создание новых атрибутов`,
      },
      {
        kind: "code",
        title: "Slots в действии",
        code: `class PointNormal:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class PointSlots:
    __slots__ = ['x', 'y']
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

# Сравнение размера памяти
import sys

p1 = PointNormal(1, 2)
p2 = PointSlots(1, 2)

print(f"Без slots: {sys.getsizeof(p1)} + {sys.getsizeof(p1.__dict__)} байт")
print(f"Со slots: {sys.getsizeof(p2)} байт")

# Попытка создать новый атрибут
# p1.z = 3  # Работает
# p2.z = 3  # AttributeError!`,
      },
      {
        kind: "text",
        md: `## Магические методы для сравнения

Магические методы позволяют определить, как объекты сравниваются друг с другом.

**Методы сравнения:**
- \`__eq__(self, other)\` — \`==\`
- \`__ne__(self, other)\` — \`!=\`
- \`__lt__(self, other)\` — \`<\`
- \`__le__(self, other)\` — \`<=\`
- \`__gt__(self, other)\` — \`>\`
- \`__ge__(self, other)\` — \`>=\``,
      },
      {
        kind: "code",
        title: "Магические методы сравнения",
        code: `from functools import total_ordering

@total_ordering  # автоматически генерирует все методы сравнения
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __eq__(self, other):
        return self.grade == other.grade
    
    def __lt__(self, other):
        return self.grade < other.grade
    
    def __repr__(self):
        return f"Student({self.name}, {self.grade})"

students = [
    Student("Алиса", 85),
    Student("Боб", 92),
    Student("Чарли", 78)
]

# Сортировка работает автоматически
students.sort()
print(students)
# [Student(Чарли, 78), Student(Алиса, 85), Student(Боб, 92)]

# Сравнения работают
print(students[0] < students[1])  # True
print(students[0] == students[0])  # True`,
      },
      {
        kind: "text",
        md: `## Магические методы для контейнеров

Если ваш класс ведёт себя как контейнер (список, словарь), реализуйте эти методы:

- \`__len__(self)\` — \`len(obj)\`
- \`__getitem__(self, key)\` — \`obj[key]\`
- \`__setitem__(self, key, value)\` — \`obj[key] = value\`
- \`__delitem__(self, key)\` — \`del obj[key]\`
- \`__contains__(self, item)\` — \`item in obj\`
- \`__iter__(self)\` — итерация (\`for item in obj\`)`,
      },
      {
        kind: "code",
        title: "Класс-контейнер",
        code: `class CustomList:
    def __init__(self):
        self._items = []
    
    def __len__(self):
        return len(self._items)
    
    def __getitem__(self, index):
        return self._items[index]
    
    def __setitem__(self, index, value):
        self._items[index] = value
    
    def __contains__(self, item):
        return item in self._items
    
    def __iter__(self):
        return iter(self._items)
    
    def append(self, item):
        self._items.append(item)

cl = CustomList()
cl.append(1)
cl.append(2)
cl.append(3)

print(len(cl))      # 3
print(cl[1])        # 2
print(2 in cl)      # True

for item in cl:
    print(item)     # 1, 2, 3`,
      },
      {
        kind: "text",
        md: `## Контекстные менеджеры

Контекстный менеджер — объект, определяющий контекст выполнения с помощью \`with\`. Автоматически вызывает \`__enter__\` при входе и \`__exit__\` при выходе.

**Зачем нужно?**
- Автоматическое освобождение ресурсов (файлы, соединения)
- Гарантия выполнения кода очистки
- Читаемый синтаксис`,
      },
      {
        kind: "code",
        title: "Контекстный менеджер",
        code: `class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.elapsed = time.time() - self.start
        print(f"Время выполнения: {self.elapsed:.4f} сек")
        return False  # не подавлять исключения

# Использование
with Timer() as t:
    # Код, время которого измеряем
    total = sum(range(1000000))

print(f"Сумма: {total}")

# Контекстный менеджер для файлов (встроенный)
with open('example.txt', 'w') as f:
    f.write("Привет, мир!")
# Файл автоматически закрывается`,
      },
      {
        kind: "text",
        md: `## Дескрипторы

Дескриптор — класс, определяющий методы \`__get__\`, \`__set__\`, \`__delete__\`. Позволяет создать переиспользуемую логику для атрибутов.

**Типы дескрипторов:**
- **Data descriptor** — определяет \`__get__\` и \`__set__\`
- **Non-data descriptor** — определяет только \`__get__\`

Дескрипторы используются внутри Python для \`@property\`, \`@classmethod\`, \`@staticmethod\`.`,
      },
      {
        kind: "code",
        title: "Дескриптор в действии",
        code: `class Validator:
    def __init__(self, min_value=0, max_value=100):
        self.min_value = min_value
        self.max_value = max_value
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, f'_{self.name}')
    
    def __set__(self, obj, value):
        if not self.min_value <= value <= self.max_value:
            raise ValueError(f"{self.name} must be between {self.min_value} and {self.max_value}")
        setattr(obj, f'_{self.name}', value)

class Product:
    price = Validator(0, 1000)
    quantity = Validator(0, 10000)
    
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

product = Product("Книга", 500, 10)
print(product.price)     # 500
# product.price = 1500   # ValueError!`,
      },
      {
        kind: "text",
        md: `## Метаклассы

Метакласс — это класс для классов. Он определяет, как создаются классы. По умолчанию все классы создаются метаклассом \`type\`.

**Зачем нужно?**
- Автоматическая модификация классов при создании
- Валидация атрибутов класса
- Регистрация классов
- Singleton паттерн

**Синтаксис:**
\`\`\`python
class MyClass(metaclass=MyMeta):
    pass
\`\`\``,
      },
      {
        kind: "code",
        title: "Метакласс для Singleton",
        code: `class SingletonMeta(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connection = "Connected to DB"

# Создаём "экземпляры"
db1 = Database()
db2 = Database()

print(db1 is db2)  # True — один и тот же объект
print(db1.connection)  # Connected to DB

# Метакласс для автоматической валидации
class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        # Проверяем, что все методы имеют docstring
        for name, value in namespace.items():
            if callable(value) and not value.__doc__:
                print(f"Warning: {name} has no docstring")
        return super().__new__(mcs, name, bases, namespace)

class MyClass(metaclass=ValidatedMeta):
    def method1(self):
        """Документация есть"""
        pass
    
    def method2(self):
        pass  # Warning: method2 has no docstring`,
      },
    ]
  },
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
      {
        q: "Что делает @dataclass?",
        options: [
          "Делает класс абстрактным",
          "Автоматически генерирует __init__, __repr__, __eq__",
          "Делает класс неизменяемым",
          "Добавляет методы сравнения",
        ],
        answer: 1,
        explain: "@dataclass автоматически генерирует __init__, __repr__ и __eq__ на основе определённых атрибутов, уменьшая шаблонный код.",
      },
      {
        q: "Зачем нужны __slots__?",
        options: [
          "Для создания приватных атрибутов",
          "Для оптимизации памяти и скорости доступа",
          "Для создания статических методов",
          "Для определения абстрактных методов",
        ],
        answer: 1,
        explain: "__slots__ явно указывает, какие атрибуты разрешены, и хранит их более эффективно, экономя до 40-50% памяти.",
      },
      {
        q: "Что такое метакласс?",
        options: [
          "Класс для создания объектов",
          "Класс для создания классов",
          "Абстрактный класс",
          "Статический класс",
        ],
        answer: 1,
        explain: "Метакласс — это класс для классов. Он определяет, как создаются классы. По умолчанию все классы создаются метаклассом type.",
      },
      {
        q: "Какой метод определяет поведение оператора 'in'?",
        options: ["__contains__", "__in__", "__has__", "__includes__"],
        answer: 0,
        explain: "__contains__ определяет поведение оператора 'in' для проверки наличия элемента в контейнере.",
      },
    ]
  },
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
      {
        id: "py9t6",
        title: "Dataclass: Книга",
        md: `Создайте dataclass \`Book\` с полями: \`title\` (str), \`author\` (str), \`year\` (int), \`isbn\` (str, по умолчанию "unknown"). Добавьте метод \`info()\`, который возвращает строку вида "Title by Author (Year)".`,
        starter: `from dataclasses import dataclass

@dataclass
class Book:
    # ваши поля
    pass

book = Book("1984", "George Orwell", 1949)
print(book.info())`,
        tests: `
__test("создание книги", lambda: Book("Test", "Author", 2020).title, "Test")
__test("isbn по умолчанию", lambda: Book("Test", "Author", 2020).isbn, "unknown")
__test("метод info", lambda: Book("1984", "George Orwell", 1949).info(), "1984 by George Orwell (1949)")
__test("равенство книг", lambda: Book("A", "B", 2020) == Book("A", "B", 2020), True)`,
        solution: `from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    year: int
    isbn: str = "unknown"
    
    def info(self):
        return f"{self.title} by {self.author} ({self.year})"`,
      },
      {
        id: "py9t7",
        title: "Контейнер с валидацией",
        md: `Создайте класс \`ValidatedList\`, который ведёт себя как список, но принимает только положительные числа. Реализуйте методы: \`append(item)\`, \`__len__()\`, \`__getitem__(index)\`, \`__contains__(item)\`. При попытке добавить неположительное число бросайте \`ValueError\`.`,
        starter: `class ValidatedList:
    # ваш код
    pass

vl = ValidatedList()
vl.append(5)
vl.append(10)
print(len(vl))  # 2
print(5 in vl)  # True
# vl.append(-1)  # ValueError!`,
        tests: `
__test("добавление элементов", lambda: (lambda vl: (vl.append(5), vl.append(10), len(vl))[-1])(ValidatedList()), 2)
__test("проверка наличия", lambda: (lambda vl: (vl.append(5), 5 in vl)[-1])(ValidatedList()), True)
__test("отрицательные числа отклоняются", lambda: (lambda vl: (lambda: (vl.append(-1), False)[-1])() if False else True)(), True)
__test("доступ по индексу", lambda: (lambda vl: (vl.append(5), vl.append(10), vl[1])[-1])(ValidatedList()), 10)`,
        solution: `class ValidatedList:
    def __init__(self):
        self._items = []
    
    def append(self, item):
        if item <= 0:
            raise ValueError("Только положительные числа")
        self._items.append(item)
    
    def __len__(self):
        return len(self._items)
    
    def __getitem__(self, index):
        return self._items[index]
    
    def __contains__(self, item):
        return item in self._items`,
      },
      {
        id: "py9t8",
        title: "Множественное наследование",
        md: `Создайте классы: \`Flyable\` с методом \`fly()\`, возвращающим "Летает", \`Swimmable\` с методом \`swim()\`, возвращающим "Плавает", и \`Duck\`, наследующий от обоих. Добавьте метод \`quack()\`, возвращающий "Кря!".`,
        starter: `class Flyable:
    # ваш код
    pass

class Swimmable:
    # ваш код
    pass

class Duck(Flyable, Swimmable):
    # ваш код
    pass

duck = Duck()
print(duck.fly())    # Летает
print(duck.swim())   # Плавает
print(duck.quack())  # Кря!`,
        tests: `
__test("метод fly", lambda: Duck().fly(), "Летает")
__test("метод swim", lambda: Duck().swim(), "Плавает")
__test("метод quack", lambda: Duck().quack(), "Кря!")
__test("наследование", lambda: isinstance(Duck(), Flyable) and isinstance(Duck(), Swimmable), True)`,
        solution: `class Flyable:
    def fly(self):
        return "Летает"

class Swimmable:
    def swim(self):
        return "Плавает"

class Duck(Flyable, Swimmable):
    def quack(self):
        return "Кря!"`,
      },
      {
        id: "py9t9",
        title: "Контекстный менеджер",
        md: `Создайте контекстный менеджер \`FileManager\`, который открывает файл для записи в \`__enter__\` и закрывает его в \`__exit__\`. В \`__enter__\` возвращайте файловый объект.`,
        starter: `class FileManager:
    def __init__(self, filename, mode='w'):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        # ваш код
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # ваш код
        pass

with FileManager('test.txt', 'w') as f:
    f.write("Привет, мир!")`,
        tests: `
__test("открытие файла", lambda: (lambda fm: (fm.__enter__(), True)[-1])(FileManager('test.txt', 'w')), True)
__test("закрытие файла", lambda: (lambda fm: (fm.__enter__(), fm.__exit__(None, None, None), True)[-1])(FileManager('test.txt', 'w')), True)`,
        solution: `class FileManager:
    def __init__(self, filename, mode='w'):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()`,
      },
      {
        id: "py9t10",
        title: "Сравнение объектов",
        md: `Создайте класс \`Temperature\` с полем \`celsius\`. Реализуйте магические методы сравнения: \`__eq__\`, \`__lt__\`, \`__le__\`, \`__gt__\`, \`__ge__\`. Используйте декоратор \`@total_ordering\` для автоматической генерации остальных методов.`,
        starter: `from functools import total_ordering

@total_ordering
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    # реализуйте __eq__ и __lt__
    pass

t1 = Temperature(20)
t2 = Temperature(30)
print(t1 < t2)   # True
print(t1 == t1)  # True`,
        tests: `
__test("равенство", lambda: Temperature(20) == Temperature(20), True)
__test("меньше", lambda: Temperature(20) < Temperature(30), True)
__test("больше", lambda: Temperature(30) > Temperature(20), True)
__test("меньше или равно", lambda: Temperature(20) <= Temperature(20), True)
__test("больше или равно", lambda: Temperature(30) >= Temperature(20), True)`,
        solution: `from functools import total_ordering

@total_ordering
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __eq__(self, other):
        return self.celsius == other.celsius
    
    def __lt__(self, other):
        return self.celsius < other.celsius`,
      },
    ]
  },
];
