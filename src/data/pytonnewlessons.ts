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

  {
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
        },
    ]`,
      },
    ],
  },
];
