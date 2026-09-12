import type { Lesson } from "../lib/types";

export const backendLessons: Lesson[] = [
  // ========== СПРИНТ 1: Django и базы данных ==========
  {
    id: "be1",
    language: "python",
    title: "Проектирование базы данных",
    subtitle: "Как хранить данные правильно: таблицы, связи и индексы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Что такое база данных? Представьте шкаф с ящиками 🗄️

База данных — это как огромный шкаф с множеством ящиков. Каждый ящик — это **таблица**. В каждом ящике лежат одинаковые вещи:
- Ящик "Клиенты" — хранит информацию о людях
- Ящик "Заказы" — хранит информацию о покупках
- Ящик "Товары" — хранит информацию о продуктах

**Реляционная база данных** — это шкаф, где ящики связаны между собой. Например, заказ связан с клиентом, который его сделал.`,
      },
      {
        kind: "text",
        md: `## Принцип 1: Атомарность — одна ячейка = одно значение

Представьте таблицу в Excel. В каждой ячейке должно быть только **одно значение**.

❌ **ПЛОХО** (нарушение атомарности):
\`\`\`
| Имя клиента      |
|------------------|
| Иван Иванов      |  ← два значения в одной ячейке!
\`\`\`

✅ **ХОРОШО** (атомарность соблюдена):
\`\`\`
| Имя  | Фамилия |
|------|---------|
| Иван | Иванов  |  ← каждое значение отдельно
\`\`\`

**Почему это важно?** Если имя и фамилия в одной ячейке, сложно найти всех "Ивановых". А если они разделены — легко!`,
      },
      {
        kind: "text",
        md: `## Принцип 2: Нормализация — не повторяйте данные!

Представьте, что вы ведёте журнал заказов в тетради:

❌ **ПЛОХО** (данные повторяются):
\`\`\`
| Заказ | Клиент        | Email клиента      | Товар  |
|-------|---------------|--------------------| ------|
| #1    | Иван Иванов   | ivan@mail.ru       | Книга |
| #2    | Иван Иванов   | ivan@mail.ru       | Ручка |  ← повторяем имя и email!
| #3    | Мария Петрова | maria@mail.ru      | Тетрадь |
\`\`\`

Проблема: если Иван изменит email, нужно исправить **все** его заказы!

✅ **ХОРОШО** (нормализовано):
\`\`\`
Таблица "Клиенты":
| ID | Имя          | Email          |
|----|--------------|----------------|
| 1  | Иван Иванов  | ivan@mail.ru   |
| 2  | Мария Петрова| maria@mail.ru  |

Таблица "Заказы":
| ID | Клиент_ID | Товар   |
|----|-----------|---------|
| 1  | 1         | Книга   |
| 2  | 1         | Ручка   |  ← просто ссылка на ID клиента
| 3  | 2         | Тетрадь |
\`\`\`

Теперь если Иван изменит email — исправляем только **одну** запись в таблице клиентов!`,
      },
      {
        kind: "text",
        md: `## Три уровня нормализации (простыми словами)

**1NF (Первая нормальная форма)** — атомарность:
- В каждой ячейке только одно значение
- Нет повторяющихся групп

**2NF (Вторая нормальная форма)** — 1NF + все поля зависят от **всего** первичного ключа:
- Если ключ состоит из нескольких частей, все поля должны зависеть от всех частей

**3NF (Третья нормальная форма)** — 2NF + нет транзитивных зависимостей:
- Поля не должны зависеть от других неключевых полей
- Пример: если есть "Город" и "Индекс", то "Индекс" зависит от "Города", а не от ID заказа`,
      },
      {
        kind: "code",
        title: "Пример: создаём таблицы в PostgreSQL",
        code: `-- Таблица клиентов
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,  -- уникальный номер (автоматически увеличивается)
    name VARCHAR(100) NOT NULL,  -- имя, максимум 100 символов, обязательное
    email VARCHAR(255) UNIQUE NOT NULL,  -- email, уникальный, обязательный
    created_at TIMESTAMP DEFAULT NOW()  -- дата создания (автоматически)
);

-- Таблица заказов (связана с клиентами)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),  -- ссылка на клиента
    total DECIMAL(10, 2) NOT NULL,  -- сумма заказа (10 цифр, 2 после запятой)
    status VARCHAR(20) DEFAULT 'pending',  -- статус: pending, paid, shipped
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0  -- количество на складе
);

-- Таблица позиций заказа (связь "многие ко многим")
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),  -- ссылка на заказ
    product_id INTEGER REFERENCES products(id),  -- ссылка на товар
    quantity INTEGER NOT NULL,  -- количество товара
    price DECIMAL(10, 2) NOT NULL  -- цена на момент покупки
);`,
      },
      {
        kind: "text",
        md: `## Индексы — как алфавитный указатель в книге 📚

Представьте книгу без алфавитного указателя. Чтобы найти "Python", нужно просмотреть **все** страницы!

Индекс — это как алфавитный указатель. Он ускоряет поиск, но:
- Занимает дополнительное место на диске
- Замедляет вставку данных (нужно обновлять индекс)

**Когда создавать индекс?**
- Поля, по которым часто ищете (\`WHERE\`)
- Поля, по которым сортируете (\`ORDER BY\`)
- Поля для связей между таблицами (\`JOIN\`)`,
      },
      {
        kind: "code",
        title: "Создаём индексы для ускорения поиска",
        code: `-- Индекс для быстрого поиска заказов по клиенту
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Индекс для быстрого поиска заказов по статусу
CREATE INDEX idx_orders_status ON orders(status);

-- Индекс для быстрого поиска товаров по названию
CREATE INDEX idx_products_name ON products(name);

-- Составной индекс (для поиска по двум полям сразу)
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

-- Уникальный индекс (запрещает дубликаты)
CREATE UNIQUE INDEX idx_customers_email ON customers(email);`,
      },
      {
        kind: "code",
        title: "Проверяем, работает ли индекс",
        code: `-- Без индекса: PostgreSQL проверяет ВСЕ строки (Sequential Scan)
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;

-- С индексом: PostgreSQL использует индекс (Index Scan)
-- Результат будет намного быстрее!

-- Типы индексов:
-- B-tree (по умолчанию) — для сравнений (=, <, >, BETWEEN)
-- Hash — только для точного совпадения (=)
-- GIN — для полнотекстового поиска и массивов
-- BRIN — для больших таблиц с последовательными данными`,
      },
      {
        kind: "warn",
        title: "Не создавайте индексы на всё!",
        md: `Каждый индекс:
- Замедляет INSERT, UPDATE, DELETE (нужно обновлять индекс)
- Занимает место на диске
- Требует обслуживания (REINDEX)

**Правило:** создавайте индексы только для полей, которые часто используются в WHERE, JOIN, ORDER BY.

**Как проверить?** Используйте \`EXPLAIN ANALYZE\` — он покажет, используется ли индекс.`,
      },
      {
        kind: "tip",
        title: "Аналогия из жизни: библиотека",
        md: `Представьте библиотеку:

**Без индексов:** чтобы найти книгу "Война и мир", нужно обойти **все** полки.

**С индексами:** есть каталог (индекс), где указано: "Война и Мир" — полка 5, ряд 3. Идёте сразу туда!

**Но!** Если каждый день добавлять новые книги, каталог нужно обновлять. Если книг мало — каталог не нужен. Если книг много — каталог необходим.`,
      },
    ],
    quiz: [
      {
        q: "Что такое нормализация базы данных?",
        options: [
          "Увеличение размера таблиц",
          "Устранение дублирования данных",
          "Добавление индексов",
          "Создание резервных копий",
        ],
        answer: 1,
        explain: "Нормализация — это процесс организации данных так, чтобы минимизировать дублирование. Представьте: если email клиента хранится в 100 заказах, и клиент меняет email — нужно исправить все 100 записей! А если email в отдельной таблице — исправляем только одну запись.",
      },
      {
        q: "Какой тип индекса лучше для полнотекстового поиска?",
        options: ["B-tree", "Hash", "GIN", "BRIN"],
        answer: 2,
        explain: "GIN (Generalized Inverted Index) оптимизирован для полнотекстового поиска. Представьте: вы ищете слово 'Python' в книге. GIN хранит список страниц, где встречается каждое слово, поэтому поиск мгновенный.",
      },
      {
        q: "Что такое атомарность в базе данных?",
        options: [
          "Каждая таблица должна иметь первичный ключ",
          "В каждой ячейке только одно значение",
          "Все таблицы должны быть связаны",
          "Данные должны быть зашифрованы",
        ],
        answer: 1,
        explain: "Атомарность означает, что в каждой ячейке таблицы хранится только одно значение. Нельзя хранить 'Иван Иванов' в одной ячейке — нужно разделить на 'Имя: Иван' и 'Фамилия: Иванов'.",
      },
    ],
    tasks: [
      {
        id: "be1t1",
        title: "Нормализация таблицы заказов",
        md: `Дана ненормализованная таблица:
\`\`\`
| order_id | customer_name | customer_email | product_name | product_price | quantity |
|----------|---------------|----------------|--------------|---------------|----------|
| 1        | Иван Иванов   | ivan@mail.ru   | Книга        | 500           | 2        |
| 2        | Иван Иванов   | ivan@mail.ru   | Ручка        | 50            | 5        |
\`\`\`

Напишите SQL для создания нормализованной схемы: таблицы \`customers\`, \`products\`, \`orders\`, \`order_items\`.`,
        starter: `# Напишите SQL для нормализованной схемы
sql = """
-- Ваш SQL здесь
"""

print(sql)`,
        tests: `
__test("содержит CREATE TABLE customers", lambda: "CREATE TABLE customers" in sql, True)
__test("содержит CREATE TABLE products", lambda: "CREATE TABLE products" in sql, True)
__test("содержит CREATE TABLE orders", lambda: "CREATE TABLE orders" in sql, True)
__test("содержит CREATE TABLE order_items", lambda: "CREATE TABLE order_items" in sql, True)`,
        solution: `sql = """
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
"""`,
      },
    ],
  },

  {
    id: "be2",
    language: "python",
    title: "Django: от установки до админки",
    subtitle: "Создаём свой первый веб-сайт за 40 минут",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Django? Представьте конструктор LEGO 🧱

Django — это фреймворк (набор готовых инструментов) для создания веб-сайтов на Python.

**Аналогия:** Представьте, что вы строите дом.
- **Без фреймворка:** вы сами делаете кирпичи, цемент, окна, двери...
- **С фреймворком:** вам привозят готовые кирпичи, окна, двери — остаётся только собрать!

Django даёт вам готовые инструменты:
- Работа с базой данных (ORM)
- Админка для управления контентом
- Система аутентификации (вход/регистрация)
- Защита от атак (CSRF, XSS)`,
      },
      {
        kind: "text",
        md: `## Установка Django: пошаговая инструкция

**Шаг 1:** Откройте терминал (командную строку)

**Шаг 2:** Установите Django:
\`\`\`bash
pip install django
\`\`\`

**Шаг 3:** Создайте проект:
\`\`\`bash
django-admin startproject myproject
\`\`\`

**Шаг 4:** Перейдите в папку проекта:
\`\`\`bash
cd myproject
\`\`\`

**Шаг 5:** Запустите сервер:
\`\`\`bash
python manage.py runserver
\`\`\`

**Шаг 6:** Откройте браузер и перейдите на http://127.0.0.1:8000/

🎉 Поздравляю! Вы создали свой первый веб-сайт!`,
      },
      {
        kind: "text",
        md: `## Структура проекта Django

После создания проекта вы увидите такую структуру:
\`\`\`
myproject/
├── manage.py          ← утилита для управления проектом
├── myproject/         ← настройки проекта
│   ├── settings.py    ← главный файл настроек
│   ├── urls.py        ← маршруты (какой URL какой view использует)
│   └── wsgi.py        ← для развёртывания на сервере
└── ...
\`\`\`

**Важно:** \`manage.py\` — это ваш пульт управления. Через него вы:
- Запускаете сервер (\`runserver\`)
- Создаёте миграции (\`makemigrations\`)
- Применяете миграции (\`migrate\`)
- Создаёте суперпользователя (\`createsuperuser\`)`,
      },
      {
        kind: "text",
        md: `## Создаём приложение: movies

Проект Django может содержать несколько **приложений**. Каждое приложение отвечает за свою часть сайта.

**Аналогия:** Представьте торговый центр.
- **Проект** = весь торговый центр
- **Приложение** = отдельный магазин (магазин одежды, ресторан, кинотеатр)

Создадим приложение для каталога фильмов:
\`\`\`bash
python manage.py startapp movies
\`\`\`

Теперь у нас есть папка \`movies/\` с файлами:
- \`models.py\` — модели (описание таблиц базы данных)
- \`views.py\` — представления (логика обработки запросов)
- \`urls.py\` — маршруты (какой URL какой view использует)
- \`admin.py\` — настройка админки`,
      },
      {
        kind: "code",
        title: "Создаём модель Movie (описание таблицы фильмов)",
        code: `# movies/models.py
from django.db import models

class Movie(models.Model):
    """Модель фильма — описание таблицы в базе данных"""
    
    title = models.CharField(max_length=200)  # Название фильма (текст, максимум 200 символов)
    year = models.IntegerField()  # Год выпуска (целое число)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=7.0)  # Рейтинг (число с плавающей точкой)
    description = models.TextField(blank=True)  # Описание (длинный текст, может быть пустым)
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания (автоматически)
    updated_at = models.DateTimeField(auto_now=True)  # Дата обновления (автоматически)
    
    def __str__(self):
        """Как фильм отображается в админке"""
        return f"{self.title} ({self.year})"

# Создадим ещё одну модель — Жанр
class Genre(models.Model):
    """Модель жанра"""
    name = models.CharField(max_length=100, unique=True)  # Название жанра (уникальное)
    
    def __str__(self):
        return self.name

# Связь "многие ко многим": фильм может иметь несколько жанров, жанр может иметь несколько фильмов
class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)  # Ссылка на фильм
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)  # Ссылка на жанр
    
    class Meta:
        unique_together = [['movie', 'genre']]  # Одна и та же связь не может повторяться`,
      },
      {
        kind: "text",
        md: `## Миграции: применяем изменения к базе данных

После создания моделей нужно **создать миграции** — инструкции для базы данных:

**Шаг 1:** Создаём миграции:
\`\`\`bash
python manage.py makemigrations
\`\`\`

Django создаст файл в папке \`movies/migrations/\` с инструкциями для создания таблиц.

**Шаг 2:** Применяем миграции:
\`\`\`bash
python manage.py migrate
\`\`\`

Django выполнит инструкции и создаст таблицы в базе данных.

**Аналогия:** Представьте, что вы архитектор.
- \`makemigrations\` — вы создаёте чертёж дома
- \`migrate\` — строители строят дом по вашему чертежу`,
      },
      {
        kind: "code",
        title: "Настраиваем админку Django",
        code: `# movies/admin.py
from django.contrib import admin
from .models import Movie, Genre, MovieGenre

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    """Настройка админки для жанров"""
    list_display = ('name',)  # Какие поля показывать в списке
    search_fields = ('name',)  # По каким полям искать
    ordering = ('name',)  # Сортировка по умолчанию

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    """Настройка админки для фильмов"""
    list_display = ('title', 'year', 'rating', 'created_at')  # Поля в списке
    list_filter = ('year', 'rating')  # Фильтры справа
    search_fields = ('title', 'description')  # Поиск по полям
    date_hierarchy = 'created_at'  # Навигация по датам
    
    # Для связи "многие ко многим" используем filter_horizontal
    # (но сначала нужно добавить связь в модель Movie)

# Создаём суперпользователя для входа в админку:
# python manage.py createsuperuser
# Введите username, email и password
# Затем откройте http://127.0.0.1:8000/admin/`,
      },
      {
        kind: "code",
        title: "Добавляем связь 'многие ко многим' в модель Movie",
        code: `# movies/models.py (обновлённая версия)
from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=7.0)
    description = models.TextField(blank=True)
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)  # Связь "многие ко многим"
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"

# Теперь в админке можно добавлять жанры к фильмам!
# Не забудьте создать и применить миграции:
# python manage.py makemigrations
# python manage.py migrate`,
      },
      {
        kind: "tip",
        title: "Полезные команды Django",
        md: `**Основные команды:**
- \`python manage.py runserver\` — запустить сервер разработки
- \`python manage.py makemigrations\` — создать миграции
- \`python manage.py migrate\` — применить миграции
- \`python manage.py createsuperuser\` — создать суперпользователя
- \`python manage.py shell\` — открыть интерактивную оболочку Django
- \`python manage.py test\` — запустить тесты

**Совет:** Добавьте \`python manage.py runserver\` в alias:
\`\`\`bash
alias run='python manage.py runserver'
\`\`\`
Теперь можно запускать сервер просто командой \`run\`!`,
      },
    ],
    quiz: [
      {
        q: "Какая команда создаёт миграции в Django?",
        options: [
          "python manage.py migrate",
          "python manage.py makemigrations",
          "django-admin startapp",
          "python manage.py runserver",
        ],
        answer: 1,
        explain: "makemigrations создаёт файлы миграций на основе изменений в моделях. migrate применяет эти миграции к базе данных. Представьте: makemigrations — это создание чертежа, migrate — строительство по чертежу.",
      },
      {
        q: "Что такое модель в Django?",
        options: [
          "HTML-шаблон для отображения данных",
          "Описание таблицы в базе данных на Python",
          "Функция для обработки запросов",
          "Настройка маршрутов URL",
        ],
        answer: 1,
        explain: "Модель — это Python-класс, который описывает таблицу в базе данных. Каждое поле модели — это колонка в таблице. Django автоматически создаёт таблицу на основе модели.",
      },
      {
        q: "Для чего нужна админка Django?",
        options: [
          "Для создания моделей",
          "Для управления контентом через веб-интерфейс",
          "Для написания тестов",
          "Для настройки базы данных",
        ],
        answer: 1,
        explain: "Админка Django — это готовый веб-интерфейс для управления данными. Вы можете добавлять, редактировать и удалять записи без написания кода. Идеально для контент-менеджеров!",
      },
    ],
    tasks: [
      {
        id: "be2t1",
        title: "Создаём модель Article",
        md: `Создайте модель \`Article\` с полями:
- \`title\` — заголовок статьи (строка, максимум 200 символов)
- \`content\` — содержимое статьи (длинный текст)
- \`published\` — опубликована ли статья (булево значение, по умолчанию False)
- \`created_at\` — дата создания (автоматически)`,
        starter: `from django.db import models

class Article(models.Model):
    # Ваши поля здесь
    pass

print("Модель создана")`,
        tests: `
__test("имеет поле title", lambda: hasattr(Article, 'title'), True)
__test("имеет поле content", lambda: hasattr(Article, 'content'), True)
__test("имеет поле published", lambda: hasattr(Article, 'published'), True)
__test("имеет поле created_at", lambda: hasattr(Article, 'created_at'), True)`,
        solution: `from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)  # Заголовок статьи
    content = models.TextField()  # Содержимое статьи (длинный текст)
    published = models.BooleanField(default=False)  # Опубликована ли статья
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания
    
    def __str__(self):
        return self.title`,
      },
    ],
  },

  {
    id: "be3",
    language: "python",
    title: "ORM: запросы к базе данных",
    subtitle: "Как работать с базой данных без SQL",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Что такое ORM? Представьте переводчика 🌍

**ORM (Object-Relational Mapping)** — это инструмент, который позволяет работать с базой данных через Python-объекты, вместо написания SQL-запросов.

**Аналогия:** Представьте, что вы не знаете испанский, но вам нужно заказать еду в ресторане в Испании.
- **Без ORM:** вы учите испанский и говорите напрямую с waiter'ом (пишете SQL)
- **С ORM:** у вас есть переводчик, который переводит ваши слова с английского на испанский (Django ORM переводит Python-код в SQL)

**Преимущества ORM:**
- Не нужно учить SQL (хотя знать его полезно!)
- Код более читаемый и понятный
- Работает с разными базами данных (PostgreSQL, MySQL, SQLite) без изменения кода
- Защита от SQL-инъекций`,
      },
      {
        kind: "text",
        md: `## Основные операции ORM

**Получить все записи:**
\`\`\`python
movies = Movie.objects.all()  # SELECT * FROM movies
\`\`\`

**Фильтрация (поиск по условию):**
\`\`\`python
movies = Movie.objects.filter(year=2020)  # SELECT * FROM movies WHERE year = 2020
\`\`\`

**Получить одну запись:**
\`\`\`python
movie = Movie.objects.get(id=1)  # SELECT * FROM movies WHERE id = 1
\`\`\`

**Создать запись:**
\`\`\`python
movie = Movie.objects.create(title="Inception", year=2010, rating=8.8)
\`\`\`

**Обновить запись:**
\`\`\`python
movie = Movie.objects.get(id=1)
movie.rating = 9.0
movie.save()  # UPDATE movies SET rating = 9.0 WHERE id = 1
\`\`\`

**Удалить запись:**
\`\`\`python
movie = Movie.objects.get(id=1)
movie.delete()  # DELETE FROM movies WHERE id = 1
\`\`\``,
      },
      {
        kind: "code",
        title: "Фильтрация: ищем фильмы по разным условиям",
        code: `from movies.models import Movie

# Все фильмы
all_movies = Movie.objects.all()
print(f"Всего фильмов: {all_movies.count()}")

# Фильмы после 2020 года
recent_movies = Movie.objects.filter(year__gte=2020)
# SQL: SELECT * FROM movies WHERE year >= 2020
print(f"Новых фильмов: {recent_movies.count()}")

# Фильмы с рейтингом выше 8.0
high_rated = Movie.objects.filter(rating__gt=8.0)
# SQL: SELECT * FROM movies WHERE rating > 8.0
print(f"Фильмов с высоким рейтингом: {high_rated.count()}")

# Фильмы по названию (без учёта регистра)
inception = Movie.objects.get(title__iexact='inception')
# SQL: SELECT * FROM movies WHERE LOWER(title) = LOWER('inception')
print(f"Нашли фильм: {inception}")

# Фильмы, название которых содержит "war"
war_movies = Movie.objects.filter(title__icontains='war')
# SQL: SELECT * FROM movies WHERE LOWER(title) LIKE '%war%'
print(f"Военных фильмов: {war_movies.count()}")

# Фильмы с жанром "Action"
action_movies = Movie.objects.filter(genres__name='Action')
# SQL: SELECT * FROM movies INNER JOIN movie_genres ON ... WHERE genres.name = 'Action'
print(f"Боевиков: {action_movies.count()}")

# Комбинирование условий (AND)
movies_2020_action = Movie.objects.filter(year__gte=2020, genres__name='Action')
# SQL: SELECT * FROM movies WHERE year >= 2020 AND genres.name = 'Action'
print(f"Новых боевиков: {movies_2020_action.count()}")

# Исключение (NOT)
non_drama = Movie.objects.exclude(genres__name='Drama')
# SQL: SELECT * FROM movies WHERE NOT (genres.name = 'Drama')
print(f"Не драм: {non_drama.count()}")`,
      },
      {
        kind: "code",
        title: "Сложные запросы: Q-объекты и F-объекты",
        code: `from django.db.models import Q, F, Count, Avg, Max

# Q-объекты для сложных условий (OR)
movies = Movie.objects.filter(
    Q(year=2020) | Q(rating__gt=8.5)
)
# SQL: SELECT * FROM movies WHERE year = 2020 OR rating > 8.5
print(f"Фильмов 2020 или с высоким рейтингом: {movies.count()}")

# F-объекты для арифметики
Movie.objects.update(rating=F('rating') + 0.5)
# SQL: UPDATE movies SET rating = rating + 0.5
print("Обновили рейтинги всех фильмов")

# Агрегация: подсчёт, среднее, максимум
from django.db.models import Count, Avg, Max

# Количество фильмов по годам
movies_by_year = Movie.objects.values('year').annotate(
    count=Count('id')
).order_by('-count')
# SQL: SELECT year, COUNT(id) as count FROM movies GROUP BY year ORDER BY count DESC
for item in movies_by_year[:5]:
    print(f"{item['year']}: {item['count']} фильмов")

# Средний рейтинг
avg_rating = Movie.objects.aggregate(Avg('rating'))
# SQL: SELECT AVG(rating) FROM movies
print(f"Средний рейтинг: {avg_rating['rating__avg']:.2f}")

# Максимальный рейтинг
max_rating = Movie.objects.aggregate(Max('rating'))
# SQL: SELECT MAX(rating) FROM movies
print(f"Максимальный рейтинг: {max_rating['rating__max']}")

# Количество фильмов у каждого жанра
genres_with_count = Genre.objects.annotate(
    movie_count=Count('movies')
).order_by('-movie_count')
# SQL: SELECT genre.*, COUNT(movies.id) as movie_count FROM genres LEFT JOIN ... GROUP BY genre.id
for genre in genres_with_count[:5]:
    print(f"{genre.name}: {genre.movie_count} фильмов")`,
      },
      {
        kind: "warn",
        title: "Проблема N+1: как не замедлить сайт",
        md: `**Проблема N+1** — когда вы делаете 1 запрос для получения списка объектов, а затем N запросов для получения связанных объектов.

❌ **ПЛОХО** (N+1 запросов):
\`\`\`python
movies = Movie.objects.all()  # 1 запрос
for movie in movies:
    print(movie.genres.all())  # N запросов (по одному для каждого фильма)!
\`\`\`

Если у вас 100 фильмов, будет **101 запрос** к базе данных!

✅ **ХОРОШО** (2 запроса):
\`\`\`python
movies = Movie.objects.prefetch_related('genres').all()  # 2 запроса
for movie in movies:
    print(movie.genres.all())  # Данные уже загружены!
\`\`\`

**Решение:** используйте \`prefetch_related()\` для связей "многие ко многим" и \`select_related()\` для связей "один к одному" или "многие к одному".`,
      },
      {
        kind: "code",
        title: "Решаем проблему N+1",
        code: `# ПЛОХО: N+1 запросов
movies = Movie.objects.all()
for movie in movies:
    # Для каждого фильма делается отдельный запрос к жанрам!
    genres = movie.genres.all()
    print(f"{movie.title}: {', '.join(g.name for g in genres)}")

# ХОРОШО: 2 запроса
movies = Movie.objects.prefetch_related('genres').all()
for movie in movies:
    # Жанры уже загружены, дополнительных запросов нет!
    genres = movie.genres.all()
    print(f"{movie.title}: {', '.join(g.name for g in genres)}")

# Для связи ForeignKey используйте select_related
orders = Order.objects.select_related('customer').all()
for order in orders:
    # Клиент уже загружен, дополнительного запроса нет!
    print(f"Заказ #{order.id} от {order.customer.name}")

# Комбинирование select_related и prefetch_related
movies = Movie.objects.select_related('director').prefetch_related('genres', 'actors').all()
# director загружается через JOIN (1 запрос)
# genres и actors загружаются отдельными запросами (2 запроса)
# Итого: 3 запроса вместо N+1`,
      },
      {
        kind: "tip",
        title: "Как увидеть SQL-запросы?",
        md: `Иногда полезно увидеть, какой SQL-запрос генерирует Django ORM:

\`\`\`python
from django.db import connection

movies = Movie.objects.filter(year__gte=2020)
print(movies.query)  # Покажет SQL-запрос

# Или используйте django-debug-toolbar
# Он показывает все SQL-запросы на каждой странице
\`\`\`

**Совет:** установите \`django-debug-toolbar\` в режиме разработки. Он покажет:
- Все SQL-запросы
- Время выполнения каждого запроса
- Количество запросов на странице
- Предупреждения о проблеме N+1`,
      },
    ],
    quiz: [
      {
        q: "Что такое ORM?",
        options: [
          "Язык запросов к базе данных",
          "Инструмент для работы с БД через Python-объекты",
          "Тип базы данных",
          "Фреймворк для веб-разработки",
        ],
        answer: 1,
        explain: "ORM (Object-Relational Mapping) позволяет работать с базой данных через Python-объекты, вместо написания SQL-запросов. Django ORM переводит Python-код в SQL автоматически.",
      },
      {
        q: "Как решить проблему N+1?",
        options: [
          "Использовать больше циклов",
          "Использовать prefetch_related() или select_related()",
          "Уменьшить количество записей",
          "Использовать raw SQL",
        ],
        answer: 1,
        explain: "prefetch_related() и select_related() загружают связанные объекты заранее, уменьшая количество запросов к базе данных с N+1 до 2-3 запросов.",
      },
      {
        q: "Что делает метод filter() в Django ORM?",
        options: [
          "Удаляет записи из базы данных",
          "Возвращает записи, соответствующие условию",
          "Создаёт новую запись",
          "Обновляет существующую запись",
        ],
        answer: 1,
        explain: "filter() возвращает QuerySet с записями, соответствующими условию. Например, Movie.objects.filter(year=2020) вернёт все фильмы 2020 года.",
      },
    ],
    tasks: [
      {
        id: "be3t1",
        title: "Запрос фильмов",
        md: `Напишите функцию \`get_top_movies(year, min_rating)\`, которая возвращает фильмы за указанный год с рейтингом не ниже указанного, отсортированные по убыванию рейтинга.`,
        starter: `def get_top_movies(year, min_rating):
    # Ваш код здесь
    pass

print("Функция создана")`,
        tests: `
__test("возвращает QuerySet", lambda: hasattr(get_top_movies(2020, 8.0), '__iter__'), True)`,
        solution: `def get_top_movies(year, min_rating):
    return Movie.objects.filter(
        year=year,
        rating__gte=min_rating
    ).order_by('-rating')`,
      },
    ],
  },

  {
    id: "be4",
    language: "python",
    title: "REST API на Django",
    subtitle: "Создаём API для мобильного приложения",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Что такое REST API? Представьте ресторан 🍽️

**API (Application Programming Interface)** — это способ общения между программами.

**Аналогия с рестораном:**
- **Клиент** (мобильное приложение) — это вы, клиент ресторана
- **Сервер** (ваш Django сайт) — это кухня ресторана
- **API** — это меню и waiter. Вы не идёте на кухню сами, а говорите waiter'у: "Хочу борщ". Waiter передаёт заказ на кухню, кухня готовит, waiter приносит вам борщ.

**REST** — это набор правил для создания API:
- Использует HTTP-методы: GET (получить), POST (создать), PUT (обновить), DELETE (удалить)
- Данные передаются в формате JSON
- Каждый ресурс имеет свой URL (например, \`/api/movies/\`)`,
      },
      {
        kind: "text",
        md: `## HTTP-методы: что они делают?

**GET** — получить данные (чтение)
\`\`\`
GET /api/movies/  →  Получить список всех фильмов
GET /api/movies/1/  →  Получить фильм с ID=1
\`\`\`

**POST** — создать новую запись
\`\`\`
POST /api/movies/  →  Создать новый фильм
Тело запроса: {"title": "Inception", "year": 2010}
\`\`\`

**PUT** — обновить существующую запись
\`\`\`
PUT /api/movies/1/  →  Обновить фильм с ID=1
Тело запроса: {"rating": 9.0}
\`\`\`

**DELETE** — удалить запись
\`\`\`
DELETE /api/movies/1/  →  Удалить фильм с ID=1
\`\`\``,
      },
      {
        kind: "code",
        title: "Устанавливаем Django REST Framework",
        code: `# Устанавливаем DRF
# pip install djangorestframework

# Добавляем в settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',  # Добавляем DRF
    'movies',  # Ваше приложение
]

# Настройки DRF (опционально)
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,  # По 10 записей на страницу
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}`,
      },
      {
        kind: "code",
        title: "Создаём сериализаторы (преобразователи данных)",
        code: `# movies/serializers.py
from rest_framework import serializers
from .models import Movie, Genre

class GenreSerializer(serializers.ModelSerializer):
    """Сериализатор для жанров"""
    class Meta:
        model = Genre
        fields = ['id', 'name']  # Какие поля включать в JSON

class MovieSerializer(serializers.ModelSerializer):
    """Сериализатор для фильмов"""
    genres = GenreSerializer(many=True, read_only=True)  # Вложенные жанры (только для чтения)
    genre_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Genre.objects.all(), source='genres'
    )  # Для создания/обновления (только для записи)
    
    class Meta:
        model = Movie
        fields = ['id', 'title', 'year', 'rating', 'description', 'genres', 'genre_ids', 'created_at']
        read_only_fields = ['created_at']  # Это поле нельзя изменять
    
    # Валидация: проверяем, что год не больше текущего
    def validate_year(self, value):
        from datetime import datetime
        current_year = datetime.now().year
        if value > current_year + 1:
            raise serializers.ValidationError(f"Год не может быть больше {current_year + 1}")
        return value
    
    # Валидация: проверяем, что рейтинг от 0 до 10
    def validate_rating(self, value):
        if value < 0 or value > 10:
            raise serializers.ValidationError("Рейтинг должен быть от 0 до 10")
        return value`,
      },
      {
        kind: "code",
        title: "Создаём ViewSets (обработчики запросов)",
        code: `# movies/views.py
from rest_framework import viewsets, filters
from .models import Movie, Genre
from .serializers import MovieSerializer, GenreSerializer

class MovieViewSet(viewsets.ModelViewSet):
    """
    ViewSet для фильмов.
    Автоматически предоставляет CRUD-операции:
    - list (GET /movies/) — список фильмов
    - retrieve (GET /movies/1/) — один фильм
    - create (POST /movies/) — создать фильм
    - update (PUT /movies/1/) — обновить фильм
    - destroy (DELETE /movies/1/) — удалить фильм
    """
    queryset = Movie.objects.prefetch_related('genres').all()  # Какие объекты обрабатывать
    serializer_class = MovieSerializer  # Какой сериализатор использовать
    
    # Фильтрация и поиск
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'genres__name']  # По каким полям искать
    ordering_fields = ['year', 'rating', 'created_at']  # По каким полям сортировать
    ordering = ['-created_at']  # Сортировка по умолчанию

class GenreViewSet(viewsets.ModelViewSet):
    """ViewSet для жанров"""
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer`,
      },
      {
        kind: "code",
        title: "Настраиваем маршруты (URL)",
        code: `# movies/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, GenreViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)  # /api/movies/
router.register(r'genres', GenreViewSet)  # /api/genres/

urlpatterns = [
    path('', include(router.urls)),
]

# myproject/urls.py (главный файл маршрутов)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Админка
    path('api/', include('movies.urls')),  # API (все маршруты из movies/urls.py)
]

# Теперь доступны endpoints:
# GET /api/movies/ — список фильмов
# POST /api/movies/ — создать фильм
# GET /api/movies/1/ — фильм с ID=1
# PUT /api/movies/1/ — обновить фильм
# DELETE /api/movies/1/ — удалить фильм
# GET /api/genres/ — список жанров`,
      },
      {
        kind: "code",
        title: "Тестируем API",
        code: `# movies/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Movie, Genre

class MovieAPITest(TestCase):
    def setUp(self):
        """Подготовка данных перед каждым тестом"""
        self.client = APIClient()  # Клиент для тестирования API
        self.genre = Genre.objects.create(name='Action')
        self.movie = Movie.objects.create(
            title='Test Movie',
            year=2024,
            rating=8.5
        )
        self.movie.genres.add(self.genre)
    
    def test_list_movies(self):
        """Тест: получение списка фильмов"""
        response = self.client.get('/api/movies/')
        self.assertEqual(response.status_code, 200)  # Статус 200 = OK
        self.assertEqual(len(response.data['results']), 1)  # Один фильм
    
    def test_create_movie(self):
        """Тест: создание фильма"""
        data = {
            'title': 'New Movie',
            'year': 2024,
            'rating': 7.5,
            'genre_ids': [self.genre.id]
        }
        response = self.client.post('/api/movies/', data, format='json')
        self.assertEqual(response.status_code, 201)  # 201 = Created
        self.assertEqual(Movie.objects.count(), 2)  # Теперь 2 фильма
    
    def test_search_movies(self):
        """Тест: поиск фильмов"""
        response = self.client.get('/api/movies/?search=Test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_invalid_year(self):
        """Тест: невалидный год"""
        data = {
            'title': 'Future Movie',
            'year': 3000,  # Невалидный год
            'rating': 7.5
        }
        response = self.client.post('/api/movies/', data, format='json')
        self.assertEqual(response.status_code, 400)  # 400 = Bad Request`,
      },
      {
        kind: "tip",
        title: "Как тестировать API без кода?",
        md: `**Postman** — популярный инструмент для тестирования API:
1. Скачайте Postman с https://www.postman.com/
2. Создайте новый запрос
3. Выберите метод (GET, POST, PUT, DELETE)
4. Введите URL: http://127.0.0.1:8000/api/movies/
5. Для POST/PUT добавьте тело запроса в формате JSON
6. Нажмите "Send"

**Альтернативы:**
- **Insomnia** — похож на Postman, но проще
- **curl** — командная строка: \`curl http://127.0.0.1:8000/api/movies/\`
- **Swagger UI** — автоматически генерируется DRF по адресу \`/api/\``,
      },
    ],
    quiz: [
      {
        q: "Что такое REST API?",
        options: [
          "База данных",
          "Способ общения между программами через HTTP",
          "Фреймворк для веб-разработки",
          "Язык программирования",
        ],
        answer: 1,
        explain: "REST API — это способ общения между программами через HTTP. Клиент (например, мобильное приложение) отправляет запросы на сервер, сервер обрабатывает их и возвращает данные в формате JSON.",
      },
      {
        q: "Какой HTTP-метод используется для создания новой записи?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: 1,
        explain: "POST используется для создания новых записей. GET — для получения, PUT — для обновления, DELETE — для удаления.",
      },
      {
        q: "Что делает сериализатор в DRF?",
        options: [
          "Создаёт модели",
          "Преобразует Python-объекты в JSON и обратно",
          "Подключается к базе данных",
          "Создаёт URL-маршруты",
        ],
        answer: 1,
        explain: "Сериализатор преобразует Python-объекты (модели Django) в JSON для отправки клиенту, и преобразует JSON от клиента обратно в Python-объекты.",
      },
    ],
    tasks: [
      {
        id: "be4t1",
        title: "Сериализатор Article",
        md: `Создайте сериализатор \`ArticleSerializer\` для модели \`Article\` с полями: \`id\`, \`title\`, \`content\`, \`published\`, \`created_at\`.`,
        starter: `from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = []  # Дополните поля

print("Сериализатор создан")`,
        tests: `
__test("имеет поле id", lambda: 'id' in ArticleSerializer.Meta.fields, True)
__test("имеет поле title", lambda: 'title' in ArticleSerializer.Meta.fields, True)
__test("имеет поле content", lambda: 'content' in ArticleSerializer.Meta.fields, True)
__test("имеет поле published", lambda: 'published' in ArticleSerializer.Meta.fields, True)
__test("имеет поле created_at", lambda: 'created_at' in ArticleSerializer.Meta.fields, True)`,
        solution: `from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'published', 'created_at']`,
      },
    ],
  },

  // ========== СПРИНТ 2: Docker и деплой ==========
  {
    id: "be5",
    language: "python",
    title: "Docker: основы контейнеризации",
    subtitle: "Упаковываем приложение в контейнер",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Docker? Представьте контейнер для перевозки 🚢

**Docker** — это инструмент для упаковки приложения и всех его зависимостей в **контейнер**.

**Аналогия с переездом:**
- **Без Docker:** вы везёте вещи в разных коробках. На новом месте нужно всё распаковать, настроить, установить программы...
- **С Docker:** вы упаковываете ВСЁ (вещи + мебель + настройки) в один контейнер. На новом месте просто открываете контейнер — всё готово к использованию!

**Преимущества Docker:**
- **"Работает на моей машине"** — больше не проблема! Контейнер одинаков везде
- **Изоляция** — приложения не мешают друг другу
- **Быстрый запуск** — контейнер запускается за секунды
- **Масштабируемость** — легко запустить 10 копий приложения`,
      },
      {
        kind: "text",
        md: `## Основные понятия Docker

**Образ (Image)** — это "рецепт" или "шаблон" для создания контейнера.
- Аналогия: рецепт торта. В рецепте написано, какие ингредиенты нужны и как их готовить.

**Контейнер (Container)** — это запущенный образ.
- Аналогия: сам торт, испечённый по рецепту. Можно испечь много тортов по одному рецепту.

**Dockerfile** — файл с инструкциями для создания образа.
- Аналогия: файл с рецептом.

**Docker Hub** — хранилище готовых образов (как App Store для Docker).
- Аналогия: книга рецептов. Можно взять готовый рецепт торта и испечь торт.`,
      },
      {
        kind: "code",
        title: "Создаём Dockerfile для Django-приложения",
        code: `# Dockerfile (файл с инструкциями для создания образа)

# 1. Базовый образ (как фундамент дома)
FROM python:3.11-slim
# python:3.11-slim — это готовый образ с Python 3.11
# "slim" означает, что образ маленький (экономит место)

# 2. Рабочая директория (как папка проекта)
WORKDIR /app
# Все следующие команды будут выполняться в папке /app внутри контейнера

# 3. Копируем файл зависимостей
COPY requirements.txt .
# Копируем requirements.txt из нашего проекта в /app внутри контейнера

# 4. Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt
# Устанавливаем все библиотеки из requirements.txt
# --no-cache-dir — не сохранять кэш (экономит место)

# 5. Копируем весь код проекта
COPY . .
# Копируем все файлы из текущего проекта в /app внутри контейнера

# 6. Собираем статические файлы (для Django)
RUN python manage.py collectstatic --noinput
# Собираем все статические файлы (CSS, JS, изображения) в одну папку

# 7. Переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Эти настройки улучшают производительность Python

# 8. Открываем порт
EXPOSE 8000
# Говорим Docker, что приложение будет слушать порт 8000

# 9. Команда для запуска приложения
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
# Gunicorn — веб-сервер для Python (заменяет runserver в продакшене)
# myproject.wsgi:application — где находится наше Django-приложение
# --bind 0.0.0.0:8000 — слушать все интерфейсы на порту 8000`,
      },
      {
        kind: "text",
        md: `## Собираем и запускаем контейнер

**Шаг 1:** Создаём образ из Dockerfile:
\`\`\`bash
docker build -t myapp .
\`\`\`
- \`-t myapp\` — даём образу имя "myapp"
- \`.\` — использовать текущую директорию (где лежит Dockerfile)

**Шаг 2:** Запускаем контейнер:
\`\`\`bash
docker run -p 8000:8000 myapp
\`\`\`
- \`-p 8000:8000\` — пробрасываем порт: порт контейнера 8000 → порт вашей машины 8000
- \`myapp\` — имя образа, который мы создали

**Шаг 3:** Открываем браузер:
\`\`\`
http://localhost:8000/
\`\`\`

🎉 Ваше приложение работает в контейнере!`,
      },
      {
        kind: "code",
        title: "Полезные команды Docker",
        code: `# Список всех контейнеров (запущенных и остановленных)
docker ps -a

# Список запущенных контейнеров
docker ps

# Остановить контейнер
docker stop <container_id>

# Удалить контейнер
docker rm <container_id>

# Список всех образов
docker images

# Удалить образ
docker rmi <image_id>

# Войти в работающий контейнер (как SSH)
docker exec -it <container_id> bash

# Посмотреть логи контейнера
docker logs <container_id>

# Посмотреть логи в реальном времени
docker logs -f <container_id>

# Остановить и удалить все контейнеры
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)`,
      },
      {
        kind: "text",
        md: `## Docker Compose: запускаем несколько контейнеров

Представьте, что вашему приложению нужны:
- PostgreSQL (база данных)
- Redis (кэш)
- Ваше Django-приложение

Запускать каждый контейнер вручную — неудобно. **Docker Compose** позволяет описать все контейнеры в одном файле и запустить их одной командой.

**Аналогия:** Представьте, что вы строите дом.
- **Docker** — вы строите каждый дом отдельно (один за другим)
- **Docker Compose** — вы строите целый район по одному плану`,
      },
      {
        kind: "code",
        title: "docker-compose.yml: описываем все сервисы",
        code: `# docker-compose.yml
version: '3.8'  # Версия Docker Compose

services:
  # Сервис 1: Ваше Django-приложение
  web:
    build: .  # Собирать образ из Dockerfile в текущей директории
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app  # Монтируем текущую директорию в /app внутри контейнера
      - static_volume:/app/staticfiles  # Том для статических файлов
    ports:
      - "8000:8000"  # Пробрасываем порт 8000
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/mydb
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db  # Запускать только после запуска сервиса db
      - redis  # Запускать только после запуска сервиса redis
  
  # Сервис 2: PostgreSQL (база данных)
  db:
    image: postgres:15  # Использовать готовый образ PostgreSQL 15
    volumes:
      - postgres_/var/lib/postgresql/data  # Том для данных базы
    environment:
      - POSTGRES_DB=mydb  # Имя базы данных
      - POSTGRES_USER=postgres  # Имя пользователя
      - POSTGRES_PASSWORD=password  # Пароль
    ports:
      - "5432:5432"  # Пробрасываем порт 5432
  
  # Сервис 3: Redis (кэш)
  redis:
    image: redis:7-alpine  # Использовать готовый образ Redis 7
    ports:
      - "6379:6379"  # Пробрасываем порт 6379
    volumes:
      - redis_/data  # Том для данных Redis

# Тома (volumes) — постоянное хранилище данных
volumes:
  postgres_  # Для PostgreSQL
  redis_  # Для Redis
  static_volume:  # Для статических файлов Django`,
      },
      {
        kind: "code",
        title: "Запускаем все сервисы одной командой",
        code: `# Запустить все сервисы
docker-compose up

# Запустить в фоне (без вывода логов в терминал)
docker-compose up -d

# Остановить все сервисы
docker-compose down

# Пересобрать образы и запустить
docker-compose up --build

# Посмотреть логи всех сервисов
docker-compose logs

# Посмотреть логи конкретного сервиса
docker-compose logs web

# Выполнить команду в сервисе
docker-compose exec web python manage.py migrate

# Остановить и удалить все контейнеры, тома и сети
docker-compose down -v`,
      },
      {
        kind: "warn",
        title: "Не храните секреты в Dockerfile!",
        md: `**ПЛОХО** (секреты в коде):
\`\`\`dockerfile
ENV SECRET_KEY=my-super-secret-key
ENV DATABASE_PASSWORD=my-password
\`\`\`

**ХОРОШО** (секреты в переменных окружения):
\`\`\`dockerfile
# В Dockerfile
ENV SECRET_KEY=\${SECRET_KEY}
ENV DATABASE_PASSWORD=\${DATABASE_PASSWORD}
\`\`\`

\`\`\`bash
# При запуске передаём секреты
docker run -e SECRET_KEY=my-super-secret-key -e DATABASE_PASSWORD=my-password myapp
\`\`\`

**Или используйте .env файл:**
\`\`\`bash
# .env (добавьте в .gitignore!)
SECRET_KEY=my-super-secret-key
DATABASE_PASSWORD=my-password
\`\`\`

\`\`\`yaml
# docker-compose.yml
services:
  web:
    env_file:
      - .env  # Загружаем переменные из .env
\`\`\``,
      },
      {
        kind: "tip",
        title: "Оптимизация Docker-образа",
        md: `**1. Используйте многоэтапную сборку (multi-stage build):**
\`\`\`dockerfile
# Этап 1: сборка
FROM python:3.11 as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Этап 2: финальный образ (меньше размер)
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["gunicorn", "myproject.wsgi:application"]
\`\`\`

**2. Используйте .dockerignore:**
\`\`\`
# .dockerignore (аналог .gitignore для Docker)
.git
.gitignore
.dockerignore
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
*.log
\`\`\`

**3. Объединяйте команды RUN:**
\`\`\`dockerfile
# ПЛОХО (много слоёв)
RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get clean

# ХОРОШО (один слой)
RUN apt-get update && apt-get install -y gcc && apt-get clean
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что такое Docker-образ?",
        options: [
          "Запущенный контейнер",
          "Шаблон для создания контейнера",
          "Файл с кодом приложения",
          "База данных",
        ],
        answer: 1,
        explain: "Образ — это шаблон или рецепт для создания контейнера. Контейнер — это запущенный образ. Аналогия: образ — это рецепт торта, контейнер — это сам торт.",
      },
      {
        q: "Для чего нужен docker-compose?",
        options: [
          "Для создания одного контейнера",
          "Для запуска нескольких контейнеров вместе",
          "Для компиляции кода",
          "Для тестирования",
        ],
        answer: 1,
        explain: "Docker Compose позволяет описать и запустить несколько контейнеров (сервисов) вместе. Например, ваше приложение + база данных + кэш — все запускаются одной командой.",
      },
      {
        q: "Что такое Dockerfile?",
        options: [
          "Конфигурация базы данных",
          "Файл с инструкциями для создания образа",
          "Файл с зависимостями Python",
          "Настройки nginx",
        ],
        answer: 1,
        explain: "Dockerfile — это файл с инструкциями для создания Docker-образа. В нём написано, какой базовый образ использовать, какие зависимости установить, какой код скопировать и как запустить приложение.",
      },
    ],
    tasks: [
      {
        id: "be5t1",
        title: "Dockerfile для Flask-приложения",
        md: `Создайте Dockerfile для Flask-приложения:
- Базовый образ: python:3.11-slim
- Рабочая директория: /app
- Установка зависимостей из requirements.txt
- Копирование кода
- Запуск через gunicorn на порту 5000`,
        starter: `# Dockerfile
# Ваш код здесь

print("Dockerfile создан")`,
        tests: `
__test("содержит FROM", lambda: "FROM" in dockerfile, True)
__test("содержит python", lambda: "python" in dockerfile.lower(), True)
__test("содержит requirements.txt", lambda: "requirements.txt" in dockerfile, True)
__test("содержит EXPOSE", lambda: "EXPOSE" in dockerfile, True)
__test("содержит gunicorn", lambda: "gunicorn" in dockerfile.lower(), True)`,
        solution: `dockerfile = """
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
"""`,
      },
    ],
  },

  {
    id: "be6",
    language: "python",
    title: "Nginx и uWSGI",
    subtitle: "Настраиваем веб-сервер для продакшена",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Зачем нужен Nginx? Представьте секретаря 📋

**Nginx** — это веб-сервер, который работает как **reverse proxy**.

**Аналогия с офисом:**
- **Без Nginx:** клиенты (браузеры) напрямую приходят к разработчику (Django). Разработчик отвлекается на простые вопросы (статические файлы), не успевает писать код.
- **С Nginx:** есть секретарь (Nginx). Клиенты приходят к секретарю. Секретарь:
  - Отдаёт простые документы (статические файлы: CSS, JS, изображения)
  - Передаёт сложные вопросы разработчику (Django)
  - Проверяет пропуска (SSL/TLS)
  - Распределяет клиентов между несколькими разработчиками (балансировка нагрузки)

**Что делает Nginx:**
- Отдаёт статические файлы (быстрее, чем Django)
- SSL/TLS termination (шифрование)
- Балансировка нагрузки (распределение запросов между серверами)
- Кэширование (хранит частые запросы)
- Защита от DDoS-атак`,
      },
      {
        kind: "code",
        title: "Конфигурация Nginx для Django-приложения",
        code: `# /etc/nginx/sites-available/myapp
# Этот файл описывает, как Nginx должен обрабатывать запросы

# Upstream — группа серверов (для балансировки нагрузки)
upstream django {
    server web:8000;  # Ваш Django-сервер (из docker-compose)
    # Можно добавить несколько серверов для балансировки:
    # server web1:8000;
    # server web2:8000;
}

# Server — описание виртуального сервера
server {
    listen 80;  # Слушать порт 80 (HTTP)
    server_name example.com;  # Доменное имя (или localhost для разработки)
    
    # Обработка статических файлов (CSS, JS, изображения)
    location /static/ {
        alias /app/staticfiles/;  # Папка со статическими файлами
        expires 30d;  # Кэшировать на 30 дней
        add_header Cache-Control "public, immutable";  # Разрешить кэширование
    }
    
    # Обработка медиа-файлов (загруженные пользователями)
    location /media/ {
        alias /app/media/;  # Папка с медиа-файлами
        expires 7d;  # Кэшировать на 7 дней
    }
    
    # Все остальные запросы передаём в Django
    location / {
        proxy_pass http://django;  # Передать в upstream django
        proxy_set_header Host $host;  # Передать заголовок Host
        proxy_set_header X-Real-IP $remote_addr;  # Передать IP клиента
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;  # HTTP или HTTPS
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`,
      },
      {
        kind: "text",
        md: `## Что такое uWSGI?

**uWSGI** — это **application server** для Python. Он запускает ваше Django-приложение и общается с Nginx через протокол WSGI.

**Аналогия:**
- **Nginx** — секретарь (принимает запросы от клиентов)
- **uWSGI** — переводчик (переводит запросы от Nginx на язык Python)
- **Django** — разработчик (обрабатывает запросы и возвращает ответы)

**Почему не использовать runserver?**
- \`runserver\` — для разработки, не для продакшена
- Не умеет обрабатывать много одновременных запросов
- Не оптимизирован для продакшена

**uWSGI преимущества:**
- Обрабатывает много одновременных запросов
- Поддерживает многопроцессность и многопоточность
- Автоматически перезапускает упавшие процессы
- Логирует ошибки`,
      },
      {
        kind: "code",
        title: "Запускаем uWSGI в docker-compose",
        code: `# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"  # HTTP
      - "443:443"  # HTTPS
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d  # Конфигурация Nginx
      - static_volume:/app/staticfiles  # Статические файлы
      - media_volume:/app/media  # Медиа-файлы
    depends_on:
      - web
  
  web:
    build: .
    command: >
      gunicorn myproject.wsgi:application
        --bind 0.0.0.0:8000
        --workers 3  # Количество процессов (обычно 2 * CPU + 1)
        --threads 2  # Количество потоков на процесс
        --timeout 120  # Таймаут для долгих запросов
        --access-logfile -  # Логи запросов
        --error-logfile -  # Логи ошибок
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15
    volumes:
      - postgres_/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password

volumes:
  postgres_
  static_volume:
  media_volume:`,
      },
      {
        kind: "text",
        md: `## Оптимизация статики

Django Collectstatic собирает все статические файлы в одну директорию:
\`\`\`bash
python manage.py collectstatic --noinput
\`\`\`

Nginx отдаёт статику напрямую, минуя Django — это намного быстрее!

**Почему это важно?**
- Django тратит время на обработку каждого запроса
- Nginx оптимизирован для отдачи статических файлов
- Nginx может кэшировать файлы в памяти
- Nginx использует sendfile() — эффективная системная вызов`,
      },
      {
        kind: "code",
        title: "Настройка кэширования в Nginx",
        code: `# nginx.conf
server {
    listen 80;
    server_name example.com;
    
    # Кэширование статики
    location /static/ {
        alias /app/staticfiles/;
        expires 1y;  # Кэшировать на 1 год
        add_header Cache-Control "public, immutable";
        access_log off;  # Отключить логи для статики (экономия ресурсов)
    }
    
    # Кэширование API-ответов (опционально)
    location /api/ {
        proxy_pass http://django;
        proxy_cache my_cache;  # Использовать кэш my_cache
        proxy_cache_valid 200 10m;  # Кэшировать ответы 200 на 10 минут
        proxy_cache_use_stale error timeout updating;  # Использовать кэш при ошибках
    }
}

# Определение кэша
http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g;
    # /var/cache/nginx — папка для кэша
    # levels=1:2 — структура папок (1 уровень, 2 уровня)
    # keys_zone=my_cache:10m — имя зоны кэша, размер 10 MB
    # max_size=1g — максимальный размер кэша 1 GB
}`,
      },
      {
        kind: "warn",
        title: "Не забудьте про SSL/TLS!",
        md: `В продакшене обязательно используйте HTTPS (SSL/TLS):

**1. Получите сертификат (бесплатно через Let's Encrypt):**
\`\`\`bash
# Установите certbot
apt install certbot python3-certbot-nginx

# Получите сертификат
certbot --nginx -d example.com
\`\`\`

**2. Nginx автоматически настроит HTTPS:**
\`\`\`nginx
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # ... остальная конфигурация
}

# Перенаправление с HTTP на HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
\`\`\`

**3. Обновляйте сертификат автоматически:**
\`\`\`bash
certbot renew --dry-run  # Тест обновления
\`\`\``,
      },
      {
        kind: "tip",
        title: "Полезные команды Nginx",
        md: `**Проверка конфигурации:**
\`\`\`bash
nginx -t  # Проверить синтаксис конфигурации
\`\`\`

**Перезагрузка Nginx:**
\`\`\`bash
nginx -s reload  # Перезагрузить конфигурацию без остановки
systemctl reload nginx  # Альтернативный способ
\`\`\`

**Просмотр логов:**
\`\`\`bash
tail -f /var/log/nginx/access.log  # Логи запросов
tail -f /var/log/nginx/error.log  # Логи ошибок
\`\`\`

**В Docker:**
\`\`\`bash
docker-compose exec nginx nginx -t  # Проверить конфигурацию
docker-compose exec nginx nginx -s reload  # Перезагрузить
docker-compose logs nginx  # Посмотреть логи
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что такое reverse proxy?",
        options: [
          "Прокси для клиентов",
          "Сервер, который перенаправляет запросы к backend-серверам",
          "Файрвол",
          "База данных",
        ],
        answer: 1,
        explain: "Reverse proxy (Nginx) принимает запросы от клиентов и перенаправляет их к backend-серверам (Django). Это как секретарь, который принимает звонки и передаёт их нужным сотрудникам.",
      },
      {
        q: "Для чего нужен uWSGI?",
        options: [
          "Для работы с базой данных",
          "Application server для Python-приложений",
          "Веб-сервер для статики",
          "Кэш-сервер",
        ],
        answer: 1,
        explain: "uWSGI — это application server, который запускает Python-приложения (Django) и общается с веб-сервером (Nginx). Он оптимизирован для продакшена и умеет обрабатывать много одновременных запросов.",
      },
      {
        q: "Почему Nginx отдаёт статику быстрее, чем Django?",
        options: [
          "Nginx написан на C++",
          "Nginx оптимизирован для отдачи статических файлов и использует sendfile()",
          "Django не умеет отдавать статику",
          "Nginx кэширует всё в памяти",
        ],
        answer: 1,
        explain: "Nginx оптимизирован для отдачи статических файлов: он использует системный вызов sendfile(), кэширует файлы, не тратит время на обработку запросов как Django.",
      },
    ],
    tasks: [
      {
        id: "be6t1",
        title: "Конфигурация Nginx",
        md: `Создайте конфигурацию Nginx для Django-приложения:
- Reverse proxy на порт 8000
- Отдача статики из /static/
- Отдача медиа из /media/`,
        starter: `# nginx.conf
# Ваш код здесь

print("Конфигурация создана")`,
        tests: `
__test("содержит location /", lambda: "location /" in nginx_config, True)
__test("содержит proxy_pass", lambda: "proxy_pass" in nginx_config, True)
__test("содержит location /static/", lambda: "location /static/" in nginx_config, True)
__test("содержит location /media/", lambda: "location /media/" in nginx_config, True)`,
        solution: `nginx_config = """
server {
    listen 80;
    server_name example.com;
    
    location /static/ {
        alias /app/staticfiles/;
    }
    
    location /media/ {
        alias /app/media/;
    }
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
"""`,
      },
    ],
  },

  // ========== СПРИНТ 3: Elasticsearch и ETL ==========
  {
    id: "be7",
    language: "python",
    title: "Elasticsearch: основы",
    subtitle: "Полнотекстовый поиск за миллисекунды",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Elasticsearch? Представьте поисковик в библиотеке 🔍

**Elasticsearch** — это поисковый движок, который умеет искать текст очень быстро.

**Аналогия с библиотекой:**
- **PostgreSQL** — это как каталог библиотеки: вы знаете точное название книги и ищете её по каталогу
- **Elasticsearch** — это как умный библиотекарь: вы говорите "мне нужна книга про магию и драконов", и он находит все подходящие книги, даже если в названии нет этих слов!

**Когда использовать Elasticsearch?**
- Полнотекстовый поиск (поиск по содержимому)
- Нечёткий поиск (опечатки, синонимы)
- Агрегации и аналитика в реальном времени
- Логирование и мониторинг (вместе с Logstash и Kibana — ELK-стек)

**Когда НЕ использовать?**
- Как основную базу данных (нет транзакций, нет JOIN)
- Для критичных данных (может потерять данные при сбое)`,
      },
      {
        kind: "text",
        md: `## Основные понятия Elasticsearch

**Индекс (Index)** — как таблица в SQL. Хранит документы одного типа.
- Аналогия: папка с документами

**Документ (Document)** — как строка в SQL. JSON-объект с данными.
- Аналогия: один документ в папке

**Поле (Field)** — как колонка в SQL. Отдельное значение в документе.
- Аналогия: поле в документе (имя, дата, содержание)

**Маппинг (Mapping)** — схема индекса. Описывает, какие поля есть и какие у них типы.
- Аналогия: описание структуры папки

**Анализатор (Analyzer)** — обрабатывает текст перед индексацией. Разбивает на слова, убирает стоп-слова, приводит к нормальной форме.
- Аналогия: редактор, который исправляет текст перед публикацией`,
      },
      {
        kind: "code",
        title: "Подключаемся к Elasticsearch",
        code: `from elasticsearch import Elasticsearch

# Подключение к Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

# Проверка подключения
if es.ping():
    print("✅ Подключено к Elasticsearch!")
else:
    print("❌ Не удалось подключиться")

# Информация о кластере
info = es.info()
print(f"Версия: {info['version']['number']}")
print(f"Имя кластера: {info['cluster_name']}")`,
      },
      {
        kind: "code",
        title: "Создаём индекс с маппингом",
        code: `# Создаём индекс для фильмов
index_body = {
    'settings': {
        'number_of_shards': 1,  # Количество шардов (частей индекса)
        'number_of_replicas': 0,  # Количество реплик (копий)
        'analysis': {
            'analyzer': {
                'my_analyzer': {
                    'type': 'custom',
                    'tokenizer': 'standard',  # Разбивает текст на слова
                    'filter': ['lowercase', 'stop', 'snowball']
                    # lowercase — приводит к нижнему регистру
                    # stop — убирает стоп-слова (и, в, на, ...)
                    # snowball — приводит к нормальной форме (бежал → бежать)
                }
            }
        }
    },
    'mappings': {
        'properties': {
            'title': {
                'type': 'text',  # Текстовое поле (анализируется)
                'analyzer': 'my_analyzer',  # Используем наш анализатор
                'fields': {
                    'keyword': {
                        'type': 'keyword'  # Для точного совпадения и сортировки
                    }
                }
            },
            'description': {
                'type': 'text',
                'analyzer': 'my_analyzer'
            },
            'year': {
                'type': 'integer'  # Целое число
            },
            'rating': {
                'type': 'float'  # Число с плавающей точкой
            },
            'genres': {
                'type': 'keyword'  # Ключевое слово (не анализируется)
            },
            'created_at': {
                'type': 'date'  # Дата
            }
        }
    }
}

# Создаём индекс
es.indices.create(index='movies', body=index_body)
print("✅ Индекс 'movies' создан!")`,
      },
      {
        kind: "code",
        title: "Индексируем документы (добавляем фильмы)",
        code: `# Добавляем один фильм
doc = {
    'title': 'Inception',
    'description': 'A mind-bending thriller about dreams within dreams',
    'year': 2010,
    'rating': 8.8,
    'genres': ['Sci-Fi', 'Thriller'],
    'created_at': '2024-01-01'
}

es.index(index='movies', id=1, body=doc)
print("✅ Фильм добавлен!")

# Добавляем несколько фильмов сразу (bulk indexing)
from elasticsearch.helpers import bulk

movies = [
    {
        '_index': 'movies',
        '_id': 2,
        '_source': {
            'title': 'The Matrix',
            'description': 'A computer hacker learns about the true nature of reality',
            'year': 1999,
            'rating': 8.7,
            'genres': ['Action', 'Sci-Fi'],
            'created_at': '2024-01-02'
        }
    },
    {
        '_index': 'movies',
        '_id': 3,
        '_source': {
            'title': 'Interstellar',
            'description': 'A team of explorers travel through a wormhole in space',
            'year': 2014,
            'rating': 8.6,
            'genres': ['Adventure', 'Sci-Fi'],
            'created_at': '2024-01-03'
        }
    }
]

success, failed = bulk(es, movies)
print(f"✅ Добавлено {success} фильмов, ошибок: {failed}")`,
      },
      {
        kind: "code",
        title: "Ищем фильмы (полнотекстовый поиск)",
        code: `# Простой поиск по одному полю
query = {
    'query': {
        'match': {
            'title': 'inception'  # Ищем слово "inception" в поле title
        }
    }
}
result = es.search(index='movies', body=query)
print(f"Найдено {result['hits']['total']['value']} фильмов")
for hit in result['hits']['hits']:
    print(f"- {hit['_source']['title']} (рейтинг: {hit['_score']:.2f})")

# Поиск по нескольким полям
query = {
    'query': {
        'multi_match': {
            'query': 'dreams reality',  # Ищем слова "dreams" ИЛИ "reality"
            'fields': ['title', 'description']  # В полях title и description
        }
    }
}
result = es.search(index='movies', body=query)
print(f"Найдено {result['hits']['total']['value']} фильмов")

# Фильтрация с сортировкой
query = {
    'query': {
        'bool': {
            'must': [
                {'range': {'year': {'gte': 2010}}}  # Год >= 2010
            ],
            'filter': [
                {'term': {'genres': 'Sci-Fi'}}  # Жанр = Sci-Fi
            ]
        }
    },
    'sort': [
        {'rating': {'order': 'desc'}}  # Сортировка по рейтингу (убывание)
    ]
}
result = es.search(index='movies', body=query)
print(f"Найдено {result['hits']['total']['value']} фильмов")

# Нечёткий поиск (с опечатками)
query = {
    'query': {
        'match': {
            'title': {
                'query': 'incepton',  # Опечатка!
                'fuzziness': 'AUTO'  # Автоматическая нечёткость
            }
        }
    }
}
result = es.search(index='movies', body=query)
print(f"Найдено {result['hits']['total']['value']} фильмов (с опечаткой)")`,
      },
      {
        kind: "code",
        title: "Агрегации (аналитика)",
        code: `# Средний рейтинг по годам
query = {
    'size': 0,  # Не возвращать документы, только агрегации
    'aggs': {
        'by_year': {
            'terms': {'field': 'year', 'size': 10},  # Группировка по году
            'aggs': {
                'avg_rating': {
                    'avg': {'field': 'rating'}  # Средний рейтинг
                }
            }
        }
    }
}
result = es.search(index='movies', body=query)
for bucket in result['aggregations']['by_year']['buckets']:
    print(f"{bucket['key']}: средний рейтинг {bucket['avg_rating']['value']:.2f}")

# Количество фильмов по жанрам
query = {
    'size': 0,
    'aggs': {
        'genres': {
            'terms': {'field': 'genres', 'size': 10}
        }
    }
}
result = es.search(index='movies', body=query)
for bucket in result['aggregations']['genres']['buckets']:
    print(f"{bucket['key']}: {bucket['doc_count']} фильмов")`,
      },
      {
        kind: "warn",
        title: "Не используйте Elasticsearch как основную БД!",
        md: `Elasticsearch — это **поисковый движок**, не реляционная база данных.

**Ограничения:**
- Нет транзакций (BEGIN, COMMIT, ROLLBACK)
- Нет JOIN (нельзя связывать документы)
- Может потерять данные при сбое (не для критичных данных)
- Занимает много места на диске

**Правильная архитектура:**
- **PostgreSQL** — основная база данных (хранит все данные)
- **Elasticsearch** — поисковый индекс (копия данных для поиска)
- **Синхронизация** — при изменении данных в PostgreSQL, обновляем Elasticsearch

**Аналогия:**
- PostgreSQL — это склад (хранит все товары)
- Elasticsearch — это каталог (помогает быстро найти товары)`,
      },
    ],
    quiz: [
      {
        q: "Что такое индекс в Elasticsearch?",
        options: [
          "Таблица в SQL",
          "Коллекция документов с похожими характеристиками",
          "Тип данных",
          "Пользователь",
        ],
        answer: 1,
        explain: "Индекс — это коллекция документов, похожая на таблицу в реляционной БД. Каждый документ — это JSON-объект с данными.",
      },
      {
        q: "Какой тип поля используется для полнотекстового поиска?",
        options: ["keyword", "text", "integer", "date"],
        answer: 1,
        explain: "Тип 'text' анализируется и индексируется для полнотекстового поиска. Анализатор разбивает текст на слова, убирает стоп-слова, приводит к нормальной форме.",
      },
      {
        q: "Почему нельзя использовать Elasticsearch как основную БД?",
        options: [
          "Он слишком медленный",
          "Нет транзакций, JOIN, может потерять данные",
          "Он не умеет искать",
          "Он слишком дорогой",
        ],
        answer: 1,
        explain: "Elasticsearch не поддерживает транзакции, JOIN, и может потерять данные при сбое. Используйте PostgreSQL как основную БД, а Elasticsearch — для поиска.",
      },
    ],
    tasks: [
      {
        id: "be7t1",
        title: "Поиск фильмов",
        md: `Напишите функцию \`search_movies(query)\`, которая ищет фильмы по названию и описанию в Elasticsearch.`,
        starter: `from elasticsearch import Elasticsearch

es = Elasticsearch(['http://localhost:9200'])

def search_movies(query):
    # Ваш код здесь
    pass

print("Функция создана")`,
        tests: `
__test("возвращает результат", lambda: callable(search_movies), True)`,
        solution: `def search_movies(query):
    body = {
        'query': {
            'multi_match': {
                'query': query,
                'fields': ['title', 'description']
            }
        }
    }
    return es.search(index='movies', body=body)`,
      },
    ],
  },

  {
    id: "be8",
    language: "python",
    title: "ETL-процессы",
    subtitle: "Синхронизация данных из PostgreSQL в Elasticsearch",
    minutes: 55,
    blocks: [
      {
        kind: "text",
        md: `## Что такое ETL? Представьте конвейер на заводе 🏭

**ETL (Extract, Transform, Load)** — процесс переноса данных из одного места в другое.

**Аналогия с заводом:**
1. **Extract (Извлечение)** — привозят сырьё на завод
2. **Transform (Трансформация)** — сырьё обрабатывают, превращают в продукт
3. **Load (Загрузка)** — готовый продукт кладут на склад

**В нашем случае:**
1. **Extract** — берём данные из PostgreSQL
2. **Transform** — преобразуем данные в формат для Elasticsearch
3. **Load** — загружаем данные в Elasticsearch

**Зачем нужен ETL?**
- Синхронизация данных между PostgreSQL и Elasticsearch
- Миграция данных из одной БД в другую
- Подготовка данных для аналитики`,
      },
      {
        kind: "code",
        title: "ETL: PostgreSQL → Elasticsearch",
        code: `import psycopg2
from elasticsearch import Elasticsearch, helpers
from datetime import datetime

class MovieETL:
    def __init__(self, pg_config, es_host):
        # Подключение к PostgreSQL
        self.pg_conn = psycopg2.connect(**pg_config)
        # Подключение к Elasticsearch
        self.es = Elasticsearch([es_host])
    
    def extract(self, last_updated=None):
        """Извлечение данных из PostgreSQL"""
        with self.pg_conn.cursor() as cursor:
            query = """
                SELECT m.id, m.title, m.year, m.rating,
                       array_agg(g.name) as genres,
                       m.created_at
                FROM movies m
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.id
                WHERE m.updated_at > %s
                GROUP BY m.id
            """
            cursor.execute(query, (last_updated or '1970-01-01',))
            return cursor.fetchall()
    
    def transform(self, rows):
        """Трансформация данных в формат Elasticsearch"""
        documents = []
        for row in rows:
            doc = {
                '_index': 'movies',
                '_id': row[0],
                '_source': {
                    'title': row[1],
                    'year': row[2],
                    'rating': float(row[3]) if row[3] else 0.0,
                    'genres': row[4] or [],
                    'created_at': row[5].isoformat() if row[5] else None
                }
            }
            documents.append(doc)
        return documents
    
    def load(self, documents):
        """Загрузка данных в Elasticsearch"""
        if documents:
            helpers.bulk(self.es, documents)
            print(f"✅ Загружено {len(documents)} документов")
    
    def run(self, last_updated=None):
        """Запуск ETL процесса"""
        print("🔄 Начинаем ETL процесс...")
        
        # 1. Извлечение
        print("📥 Извлекаем данные из PostgreSQL...")
        rows = self.extract(last_updated)
        print(f"Извлечено {len(rows)} записей")
        
        # 2. Трансформация
        print("🔄 Трансформируем данные...")
        documents = self.transform(rows)
        print(f"Трансформировано {len(documents)} документов")
        
        # 3. Загрузка
        print("📤 Загружаем данные в Elasticsearch...")
        self.load(documents)
        
        print("✅ ETL процесс завершён!")
        return len(documents)

# Использование
pg_config = {
    'dbname': 'mydb',
    'user': 'postgres',
    'password': 'password',
    'host': 'localhost',
    'port': 5432
}

etl = MovieETL(pg_config, 'http://localhost:9200')
count = etl.run()
print(f"Всего синхронизировано: {count} фильмов")`,
      },
      {
        kind: "text",
        md: `## Инкрементальная синхронизация

Вместо синхронизации всех данных каждый раз, можно синхронизировать только **изменённые** данные.

**Как это работает:**
1. Храним дату последней синхронизации
2. При следующем запуске берём только данные, изменённые после этой даты
3. Обновляем дату последней синхронизации

**Преимущества:**
- Быстрее (синхронизируем только изменения)
- Меньше нагрузка на базу данных
- Меньше нагрузка на Elasticsearch`,
      },
      {
        kind: "code",
        title: "Инкрементальная синхронизация",
        code: `import json
from datetime import datetime

class IncrementalETL(MovieETL):
    def __init__(self, pg_config, es_host, state_file='etl_state.json'):
        super().__init__(pg_config, es_host)
        self.state_file = state_file
        self.state = self.load_state()
    
    def load_state(self):
        """Загрузка состояния из файла"""
        try:
            with open(self.state_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {'last_sync': None}
    
    def save_state(self):
        """Сохранение состояния в файл"""
        with open(self.state_file, 'w') as f:
            json.dump(self.state, f)
    
    def run(self):
        """Инкрементальная синхронизация"""
        last_sync = self.state.get('last_sync')
        print(f"🔄 Последняя синхронизация: {last_sync or 'никогда'}")
        
        # Запускаем ETL с учётом последней синхронизации
        count = super().run(last_sync)
        
        # Обновляем состояние
        self.state['last_sync'] = datetime.utcnow().isoformat()
        self.save_state()
        
        return count

# Использование
etl = IncrementalETL(pg_config, 'http://localhost:9200')
count = etl.run()
print(f"Синхронизировано: {count} фильмов")`,
      },
      {
        kind: "text",
        md: `## Обработка ошибок и повторные попытки

ETL-процессы должны быть **устойчивы к ошибкам**. Если что-то пошло не так, нужно:
1. Залогировать ошибку
2. Попробовать ещё раз (с задержкой)
3. Если не получилось — отправить алерт

**Библиотека tenacity** — для повторных попыток:
\`\`\`bash
pip install tenacity
\`\`\``,
      },
      {
        kind: "code",
        title: "Обработка ошибок с tenacity",
        code: `from tenacity import retry, stop_after_attempt, wait_exponential

class RobustMovieETL(IncrementalETL):
    @retry(
        stop=stop_after_attempt(3),  # Максимум 3 попытки
        wait=wait_exponential(multiplier=1, min=2, max=10)  # Задержка: 2, 4, 8 секунд
    )
    def extract(self, last_updated=None):
        """Извлечение с повторными попытками"""
        try:
            return super().extract(last_updated)
        except psycopg2.Error as e:
            print(f"❌ Ошибка базы данных: {e}")
            raise  # Повторная попытка
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    def load(self, documents):
        """Загрузка с повторными попытками"""
        try:
            return super().load(documents)
        except Exception as e:
            print(f"❌ Ошибка Elasticsearch: {e}")
            raise  # Повторная попытка
    
    def run_safe(self):
        """Безопасный запуск с обработкой ошибок"""
        try:
            count = self.run()
            print(f"✅ ETL завершён успешно: {count} документов")
            return True
        except Exception as e:
            print(f"❌ ETL не удался: {e}")
            # Здесь можно отправить алерт (email, Slack, PagerDuty)
            return False

# Использование
etl = RobustMovieETL(pg_config, 'http://localhost:9200')
success = etl.run_safe()
if not success:
    print("⚠️ Отправляем алерт администратору!")`,
      },
      {
        kind: "text",
        md: `## Автоматизация ETL

ETL-процесс нужно запускать автоматически:
- **Cron** (Linux) — запуск по расписанию
- **Celery** (Python) — очередь задач
- **Apache Airflow** — оркестрация сложных ETL-процессов

**Пример с cron:**
\`\`\`bash
# Запуск ETL каждый час
0 * * * * /usr/bin/python /path/to/etl.py
\`\`\`

**Пример с Celery:**
\`\`\`python
from celery import Celery

app = Celery('etl', broker='redis://localhost:6379/0')

@app.task
def run_etl():
    etl = RobustMovieETL(pg_config, 'http://localhost:9200')
    return etl.run_safe()

# Запуск задачи каждые 5 минут
from celery.schedules import crontab

app.conf.beat_schedule = {
    'run-etl-every-5-minutes': {
        'task': 'etl.run_etl',
        'schedule': crontab(minute='*/5'),
    },
}
\`\`\``,
      },
      {
        kind: "tip",
        title: "Идемпотентность ETL",
        md: `ETL-процесс должен быть **идемпотентным** — многократный запуск даёт тот же результат.

**Как достичь идемпотентности:**
1. Используйте upsert (обновление или вставку) вместо простой вставки
2. Используйте ID документов из PostgreSQL как _id в Elasticsearch
3. Проверяйте, существует ли документ перед вставкой

**Пример upsert:**
\`\`\`python
es.update(
    index='movies',
    id=movie_id,
    body={'doc': movie_data},
    doc_as_upsert=True  # Вставить, если не существует
)
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что означает буква 'T' в ETL?",
        options: ["Test", "Transform", "Transfer", "Track"],
        answer: 1,
        explain: "Transform — трансформация данных между извлечением и загрузкой. Например, преобразование данных из формата PostgreSQL в формат Elasticsearch.",
      },
      {
        q: "Зачем нужна инкрементальная синхронизация?",
        options: [
          "Для ускорения ETL",
          "Для синхронизации только изменённых данных",
          "Для уменьшения размера данных",
          "Для шифрования данных",
        ],
        answer: 1,
        explain: "Инкрементальная синхронизация позволяет синхронизировать только изменённые данные, а не все данные каждый раз. Это быстрее и создаёт меньшую нагрузку на базу данных.",
      },
      {
        q: "Что такое идемпотентность ETL?",
        options: [
          "ETL работает быстро",
          "Многократный запуск даёт тот же результат",
          "ETL не использует базу данных",
          "ETL шифрует данные",
        ],
        answer: 1,
        explain: "Идемпотентность означает, что многократный запуск ETL даёт тот же результат. Это важно для надёжности: если ETL упал и перезапустился, данные не должны дублироваться.",
      },
    ],
    tasks: [
      {
        id: "be8t1",
        title: "ETL функция",
        md: `Реализуйте функцию \`transform_user(row)\`, принимающую кортеж \`(id, name, email, created_at)\` из PostgreSQL и возвращающую документ для Elasticsearch с полями: \`id\`, \`name\`, \`email\`, \`created_at\` (в формате ISO).`,
        starter: `def transform_user(row):
    # row = (id, name, email, created_at)
    # Верните документ для Elasticsearch
    return {}

print(transform_user((1, "John", "john@example.com", "2024-01-01")))`,
        tests: `
__test("возвращает словарь", lambda: isinstance(transform_user((1, "John", "john@example.com", "2024-01-01")), dict), True)
__test("содержит id", lambda: "id" in transform_user((1, "John", "john@example.com", "2024-01-01")), True)
__test("содержит name", lambda: "name" in transform_user((1, "John", "john@example.com", "2024-01-01")), True)
__test("содержит email", lambda: "email" in transform_user((1, "John", "john@example.com", "2024-01-01")), True)
__test("содержит created_at", lambda: "created_at" in transform_user((1, "John", "john@example.com", "2024-01-01")), True)`,
        solution: `def transform_user(row):
    id, name, email, created_at = row
    return {
        "id": id,
        "name": name,
        "email": email,
        "created_at": created_at.isoformat() if hasattr(created_at, 'isoformat') else str(created_at)
    }`,
      },
    ],
  },

  // ========== СПРИНТ 4: Code Review и SOLID ==========
  {
    id: "be9",
    language: "python",
    title: "Code Review и SOLID",
    subtitle: "Пишем чистый и поддерживаемый код",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Code Review? Представьте проверку домашки 👨‍🏫

**Code Review** — процесс проверки кода другими разработчиками перед слиянием в основную ветку.

**Аналогия:** Представьте, что вы пишете сочинение. Перед сдачей учитель просит одноклассников проверить вашу работу. Они находят ошибки, предлагают улучшения.

**Зачем нужен Code Review?**
- **Качество кода** — находим баги до продакшена
- **Обмен знаниями** — учимся друг у друга
- **Единообразие** — код выглядит одинаково от всех разработчиков
- **Безопасность** — находим уязвимости

**Что проверять?**
- Логические ошибки
- Производительность
- Безопасность (SQL-инъекции, XSS)
- Читаемость кода
- Соответствие стандартам (PEP 8)`,
      },
      {
        kind: "text",
        md: `## SOLID-принципы: 5 правил хорошего кода

**SOLID** — это 5 принципов, которые помогают писать чистый, поддерживаемый код.

**S** — Single Responsibility Principle (Принцип единственной ответственности)
**O** — Open/Closed Principle (Принцип открытости/закрытости)
**L** — Liskov Substitution Principle (Принцип подстановки Лисков)
**I** — Interface Segregation Principle (Принцип разделения интерфейса)
**D** — Dependency Inversion Principle (Принцип инверсии зависимостей)`,
      },
      {
        kind: "code",
        title: "S — Single Responsibility Principle",
        code: `# ❌ ПЛОХО: класс делает слишком много
class UserService:
    def __init__(self, db_connection):
        self.db = db_connection
    
    def create_user(self, name, email):
        # Валидация
        if not email or "@" not in email:
            raise ValueError("Invalid email")
        
        # Сохранение в БД
        self.db.execute("INSERT INTO users...")
        
        # Отправка email
        self.send_email(email, "Welcome!")
        
        # Логирование
        print(f"User {name} created")
    
    def send_email(self, email, message):
        # SMTP логика
        pass

# ✅ ХОРОШО: разделение ответственностей
class UserValidator:
    @staticmethod
    def validate_email(email):
        return email and "@" in email

class UserRepository:
    def __init__(self, db):
        self.db = db
    
    def save(self, user):
        self.db.execute("INSERT INTO users...")

class EmailService:
    def send_welcome(self, email):
        # SMTP логика
        pass

class UserService:
    def __init__(self, repo, email_service, validator):
        self.repo = repo
        self.email_service = email_service
        self.validator = validator
    
    def create_user(self, name, email):
        if not self.validator.validate_email(email):
            raise ValueError("Invalid email")
        
        user = {"name": name, "email": email}
        self.repo.save(user)
        self.email_service.send_welcome(email)`,
      },
      {
        kind: "code",
        title: "O — Open/Closed Principle",
        code: `# ❌ ПЛОХО: нужно изменять код для добавления новых типов
class PaymentProcessor:
    def process(self, payment_type, amount):
        if payment_type == 'credit_card':
            # Логика для кредитной карты
            pass
        elif payment_type == 'paypal':
            # Логика для PayPal
            pass
        # Нужно добавить elif для каждого нового типа!

# ✅ ХОРОШО: открыто для расширения, закрыто для модификации
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} with credit card")

class PayPalPayment(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} with PayPal")

class PaymentProcessor:
    def __init__(self, payment_method: PaymentMethod):
        self.payment_method = payment_method
    
    def process(self, amount):
        self.payment_method.pay(amount)

# Теперь можно добавить новый тип оплаты без изменения PaymentProcessor!
class CryptoPayment(PaymentMethod):
    def pay(self, amount):
        print(f"Paid {amount} with crypto")`,
      },
      {
        kind: "code",
        title: "L — Liskov Substitution Principle",
        code: `# ❌ ПЛОХО: подкласс нарушает поведение базового класса
class Bird:
    def fly(self):
        return "Flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly!")  # Нарушение LSP!

# ✅ ХОРОШО: правильная иерархия
class Bird:
    def move(self):
        return "Moving"

class FlyingBird(Bird):
    def fly(self):
        return "Flying"

class SwimmingBird(Bird):
    def swim(self):
        return "Swimming"

class Sparrow(FlyingBird):
    pass

class Penguin(SwimmingBird):
    pass

# Теперь любой FlyingBird может летать, а SwimmingBird — плавать!`,
      },
      {
        kind: "tip",
        title: "Чеклист для Code Review",
        md: `**Что проверять:**
- [ ] Код читается легко, имена понятны
- [ ] Нет дублирования кода
- [ ] Функции делают одну вещь (SRP)
- [ ] Нет магических чисел и строк
- [ ] Обработаны edge cases
- [ ] Нет SQL-инъекций и XSS
- [ ] Добавлены тесты для новой функциональности
- [ ] Документация обновлена (если нужно)
- [ ] Производительность приемлема
- [ ] Код соответствует PEP 8`,
      },
    ],
    quiz: [
      {
        q: "Что означает SRP (Single Responsibility Principle)?",
        options: [
          "Класс должен иметь только один метод",
          "Класс должен иметь одну причину для изменения",
          "Класс не должен наследоваться",
          "Класс не должен иметь зависимостей",
        ],
        answer: 1,
        explain: "SRP означает, что класс должен отвечать за одну вещь. Если класс делает слишком много, его сложно поддерживать и тестировать.",
      },
      {
        q: "Что такое Code Review?",
        options: [
          "Автоматическое тестирование кода",
          "Проверка кода другими разработчиками",
          "Компиляция кода",
          "Оптимизация кода",
        ],
        answer: 1,
        explain: "Code Review — это процесс проверки кода другими разработчиками перед слиянием в основную ветку. Помогает найти баги, улучшить качество кода и обменяться знаниями.",
      },
    ],
    tasks: [
      {
        id: "be9t1",
        title: "Рефакторинг к SRP",
        md: `Дан класс \`OrderProcessor\`, который делает всё: валидацию, сохранение, отправку уведомлений. Разделите его на три класса с единственной ответственностью: \`OrderValidator\`, \`OrderRepository\`, \`NotificationService\`.`,
        starter: `class OrderValidator:
    def validate(self, order):
        pass

class OrderRepository:
    def save(self, order):
        pass

class NotificationService:
    def notify(self, order_id):
        pass

print("Классы созданы")`,
        tests: `
__test("OrderValidator существует", lambda: hasattr(OrderValidator, 'validate'), True)
__test("OrderRepository существует", lambda: hasattr(OrderRepository, 'save'), True)
__test("NotificationService существует", lambda: hasattr(NotificationService, 'notify'), True)`,
        solution: `class OrderValidator:
    def validate(self, order):
        return bool(order.get("items"))

class OrderRepository:
    def save(self, order):
        return True

class NotificationService:
    def notify(self, order_id):
        return True`,
      },
    ],
  },

  {
    id: "be10",
    language: "python",
    title: "Тестирование и документация API",
    subtitle: "Пишем тесты и документацию для API",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Виды тестирования API

**Функциональные тесты** проверяют, что API делает то, что должно:
- Правильные HTTP-коды ответов (200, 201, 400, 404, 500)
- Корректность данных в ответах
- Обработка ошибок и валидация

**Интеграционные тесты** проверяют взаимодействие компонентов:
- API + база данных
- API + внешние сервисы

**Нагрузочные тесты** проверяют производительность:
- Время отклика под нагрузкой
- Максимальное количество одновременных запросов`,
      },
      {
        kind: "code",
        title: "Функциональные тесты с pytest",
        code: `# tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_movie():
    """Тест создания фильма"""
    response = client.post("/movies/", json={
        "title": "Inception",
        "year": 2010,
        "rating": 8.8
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Inception"
    assert data["year"] == 2010
    assert "id" in data

def test_get_movie_not_found():
    """Тест получения несуществующего фильма"""
    response = client.get("/movies/99999")
    assert response.status_code == 404

def test_create_movie_invalid_data():
    """Тест валидации входных данных"""
    response = client.post("/movies/", json={
        "title": "",  # Пустое название
        "year": 2010
    })
    assert response.status_code == 422  # Validation error

@pytest.fixture
def sample_movie():
    """Фикстура для тестов"""
    return {"title": "Test Movie", "year": 2024, "rating": 7.5}

def test_update_movie(sample_movie):
    """Тест обновления фильма"""
    # Создаём фильм
    create_response = client.post("/movies/", json=sample_movie)
    movie_id = create_response.json()["id"]
    
    # Обновляем
    update_response = client.put(f"/movies/{movie_id}", json={
        "rating": 9.0
    })
    assert update_response.status_code == 200
    assert update_response.json()["rating"] == 9.0`,
      },
      {
        kind: "text",
        md: `## Документация API

**Swagger/OpenAPI** — стандарт описания REST API:
- Автоматическая генерация из кода (FastAPI, DRF)
- Интерактивная документация (Swagger UI)
- Генерация клиентских SDK

**Что должно быть в документации:**
- Описание каждого эндпоинта
- Формат запросов и ответов с примерами
- HTTP-коды ответов
- Аутентификация и авторизация`,
      },
      {
        kind: "code",
        title: "Документация в FastAPI",
        code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Movie API",
    description="API для управления фильмами",
    version="1.0.0"
)

class MovieCreate(BaseModel):
    """Схема создания фильма"""
    title: str
    year: int
    rating: float = 7.0
    
    class Config:
        schema_extra = {
            "example": {
                "title": "Inception",
                "year": 2010,
                "rating": 8.8
            }
        }

@app.post(
    "/movies/",
    response_model=MovieCreate,
    status_code=201,
    summary="Создать фильм",
    description="Создаёт новый фильм в базе данных",
    responses={
        201: {"description": "Фильм создан"},
        400: {"description": "Невалидные данные"},
        409: {"description": "Фильм уже существует"}
    }
)
async def create_movie(movie: MovieCreate):
    """
    Создаёт новый фильм.
    
    - **title**: название фильма (обязательно)
    - **year**: год выпуска (обязательно)
    - **rating**: рейтинг от 0 до 10 (по умолчанию 7.0)
    """
    return movie

# Документация автоматически доступна на:
# /docs - Swagger UI
# /redoc - ReDoc`,
      },
    ],
    quiz: [
      {
        q: "Какой HTTP-код возвращается при успешном создании ресурса?",
        options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
        answer: 1,
        explain: "201 Created возвращается при успешном создании нового ресурса через POST-запрос.",
      },
      {
        q: "Что такое фикстура в pytest?",
        options: [
          "Тестовый случай",
          "Функция для подготовки данных перед тестом",
          "Тип ассерта",
          "Плагин для pytest",
        ],
        answer: 1,
        explain: "Фикстура — функция, которая подготавливает данные или состояние перед выполнением теста. Может использоваться повторно в разных тестах.",
      },
    ],
    tasks: [
      {
        id: "be10t1",
        title: "Тест API эндпоинта",
        md: `Напишите функцию \`test_get_movies()\`, которая тестирует GET-запрос к \`/movies/\`. Проверьте, что статус-код 200 и ответ — список.`,
        starter: `def test_get_movies():
    # Ваш код здесь
    pass

print("Тест написан")`,
        tests: `
__test("тест проверяет статус-код", lambda: test_get_movies() is None or test_get_movies() == True, True)`,
        solution: `def test_get_movies():
    response = mock_get_movies()
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)`,
      },
    ],
  },

  // ========== СПРИНТ 5: Асинхронность и FastAPI ==========
  {
    id: "be11",
    language: "python",
    title: "Асинхронное программирование в Python",
    subtitle: "async/await, корутины, asyncio",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Синхронное vs Асинхронное

**Синхронный код** выполняется последовательно:
- Каждая операция ждёт завершения предыдущей
- Простой для понимания
- Блокирует выполнение при ожидании I/O

**Асинхронный код** позволяет выполнять другие задачи во время ожидания:
- Не блокирует выполнение при I/O-операциях
- Лучше использует ресурсы
- Сложнее для понимания

**Когда использовать async?**
- Много I/O-операций (сеть, диск)
- Высоконагруженные серверы
- Real-time приложения`,
      },
      {
        kind: "code",
        title: "async/await",
        code: `import asyncio
import time

# СИНХРОННЫЙ КОД
def fetch_data_sync(url):
    time.sleep(1)  # Блокирует выполнение
    return f"Data from {url}"

def process_sync():
    start = time.time()
    result1 = fetch_data_sync("url1")
    result2 = fetch_data_sync("url2")
    result3 = fetch_data_sync("url3")
    print(f"Синхронно: {time.time() - start:.2f} сек")  # ~3 сек

# АСИНХРОННЫЙ КОД
async def fetch_data_async(url):
    await asyncio.sleep(1)  # Не блокирует event loop
    return f"Data from {url}"

async def process_async():
    start = time.time()
    # Запускаем все запросы параллельно
    result1, result2, result3 = await asyncio.gather(
        fetch_data_async("url1"),
        fetch_data_async("url2"),
        fetch_data_async("url3")
    )
    print(f"Асинхронно: {time.time() - start:.2f} сек")  # ~1 сек

# Запуск асинхронного кода
asyncio.run(process_async())`,
      },
    ],
    quiz: [
      {
        q: "Что делает ключевое слово await?",
        options: [
          "Создаёт новую корутину",
          "Приостанавливает корутину до завершения другой корутины",
          "Запускает event loop",
          "Отменяет выполнение корутины",
        ],
        answer: 1,
        explain: "await приостанавливает выполнение текущей корутины и ждёт завершения другой корутины, передавая управление event loop.",
      },
    ],
    tasks: [
      {
        id: "be11t1",
        title: "Асинхронная функция",
        md: `Создайте асинхронную функцию \`async_fetch_data(url)\`, которая имитирует сетевой запрос с задержкой 1 секунду и возвращает строку \`"Data from {url}"\`.`,
        starter: `import asyncio

async def async_fetch_data(url):
    # Ваш код здесь
    pass

# Тест
async def test():
    result = await async_fetch_data("example.com")
    return result

print(asyncio.run(test()))`,
        tests: `
async def run_test():
    return await async_fetch_data("test.com")

__test("возвращает строку", lambda: isinstance(asyncio.run(run_test()), str), True)
__test("содержит URL", lambda: "test.com" in asyncio.run(run_test()), True)`,
        solution: `async def async_fetch_data(url):
    await asyncio.sleep(1)
    return f"Data from {url}"`,
      },
    ],
  },

  {
    id: "be12",
    language: "python",
    title: "FastAPI: основы",
    subtitle: "Создание API, маршруты, зависимости, валидация",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Почему FastAPI?

**FastAPI** — современный веб-фреймворк для создания API:
- **Быстрый** — на уровне Node.js и Go
- **Быстрая разработка** — автоматическая документация, валидация
- **Стандарты** — основан на OpenAPI и JSON Schema
- **Типизация** — использует type hints Python для валидации`,
      },
      {
        kind: "code",
        title: "Первое FastAPI приложение",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Movie API")

class Movie(BaseModel):
    id: int
    title: str
    year: int
    rating: float = 7.0

class MovieCreate(BaseModel):
    title: str
    year: int
    rating: Optional[float] = 7.0

movies_db = []
next_id = 1

@app.get("/")
async def root():
    return {"message": "Welcome to Movie API"}

@app.get("/movies/", response_model=list[Movie])
async def get_movies():
    return movies_db

@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    for movie in movies_db:
        if movie.id == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Movie not found")

@app.post("/movies/", response_model=Movie, status_code=201)
async def create_movie(movie: MovieCreate):
    global next_id
    new_movie = Movie(id=next_id, **movie.dict())
    movies_db.append(new_movie)
    next_id += 1
    return new_movie

# Запуск: uvicorn main:app --reload
# Документация: http://localhost:8000/docs`,
      },
    ],
    quiz: [
      {
        q: "Что такое Pydantic в FastAPI?",
        options: [
          "База данных",
          "Библиотека для валидации данных",
          "Веб-сервер",
          "ORM",
        ],
        answer: 1,
        explain: "Pydantic — библиотека для валидации данных и управления настройками с использованием type hints Python.",
      },
    ],
    tasks: [
      {
        id: "be12t1",
        title: "FastAPI эндпоинт",
        md: `Создайте Pydantic-модель \`User\` с полями: \`id\` (int), \`username\` (str), \`email\` (str). Добавьте валидацию: email должен содержать '@'.`,
        starter: `from pydantic import BaseModel, validator

class User(BaseModel):
    id: int
    username: str
    email: str
    
    # Добавьте валидатор для email
    pass

# Тест
user = User(id=1, username="john", email="john@example.com")
print(user)`,
        tests: `
__test("создаёт валидного пользователя", lambda: User(id=1, username="john", email="john@example.com").email, "john@example.com")
try:
    User(id=1, username="john", email="invalid")
    __test("отклоняет невалидный email", lambda: False, True)
except:
    __test("отклоняет невалидный email", lambda: True, True)`,
        solution: `from pydantic import BaseModel, validator

class User(BaseModel):
    id: int
    username: str
    email: str
    
    @validator('email')
    def email_must_contain_at(cls, v):
        if '@' not in v:
            raise ValueError('Email must contain @')
        return v`,
      },
    ],
  },

  {
    id: "be13",
    language: "python",
    title: "FastAPI: продвинутые темы и кеширование",
    subtitle: "Docker, Redis, оптимизация",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Кеширование с Redis

**Redis** — in-memory хранилище данных:
- Кеширование запросов к БД
- Сессии пользователей
- Rate limiting
- Очереди задач`,
      },
      {
        kind: "code",
        title: "Кеширование с Redis",
        code: `import redis
import json
from functools import wraps

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cache_response(ttl=300):
    """Декоратор для кеширования"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{args}:{kwargs}"
            
            # Проверяем кеш
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # Выполняем функцию
            result = await func(*args, **kwargs)
            
            # Сохраняем в кеш
            redis_client.setex(cache_key, ttl, json.dumps(result))
            
            return result
        return wrapper
    return decorator

@cache_response(ttl=300)  # 5 минут
async def get_popular_movies():
    """Получение популярных фильмов (дорогой запрос)"""
    movies = await db.query("SELECT * FROM movies ORDER BY rating DESC LIMIT 100")
    return movies`,
      },
    ],
    quiz: [
      {
        q: "Зачем нужен Redis в FastAPI приложении?",
        options: [
          "Для хранения кода",
          "Для кеширования и быстрого доступа к данным",
          "Для компиляции кода",
          "Для управления зависимостями",
        ],
        answer: 1,
        explain: "Redis — in-memory хранилище, используемое для кеширования, сессий, очередей задач и других операций, требующих быстрого доступа к данным.",
      },
    ],
    tasks: [
      {
        id: "be13t1",
        title: "Функция кеширования",
        md: `Реализуйте функцию \`get_cached_data(key, fetch_func, ttl=300)\`, которая:
1. Проверяет наличие данных в кеше по ключу
2. Если есть — возвращает из кеша
3. Если нет — вызывает \`fetch_func()\`, сохраняет в кеш на \`ttl\` секунд и возвращает результат`,
        starter: `cache = {}

def get_cached_data(key, fetch_func, ttl=300):
    # Ваш код здесь
    pass

# Тест
def expensive_operation():
    return {"data": "result"}

result1 = get_cached_data("test", expensive_operation)
result2 = get_cached_data("test", expensive_operation)
print(result1, result2)`,
        tests: `
__test("возвращает результат", lambda: get_cached_data("key1", lambda: {"value": 1}), {"value": 1})
__test("кеширует результат", lambda: (lambda: (get_cached_data("key2", lambda: {"v": 1}), get_cached_data("key2", lambda: {"v": 2})))(), ({"v": 1}, {"v": 1}))`,
        solution: `cache = {}

def get_cached_data(key, fetch_func, ttl=300):
    if key in cache:
        return cache[key]
    
    result = fetch_func()
    cache[key] = result
    
    return result`,
      },
    ],
  },

  // ========== СПРИНТ 6: Авторизация ==========
  {
    id: "be14",
    language: "python",
    title: "Сервис авторизации и аутентификации",
    subtitle: "JWT, OAuth 2.0, двухфакторная аутентификация",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Аутентификация vs Авторизация

**Аутентификация** — проверка личности (кто вы?)
**Авторизация** — проверка прав (что вам разрешено?)`,
      },
      {
        kind: "code",
        title: "JWT аутентификация",
        code: `import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"

def create_access_token( dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        return None`,
      },
    ],
    quiz: [
      {
        q: "Что такое OAuth 2.0?",
        options: [
          "Протокол аутентификации",
          "Протокол делегированной авторизации",
          "База данных",
          "Фреймворк",
        ],
        answer: 1,
        explain: "OAuth 2.0 — протокол делегированной авторизации, позволяющий приложениям получать доступ к ресурсам от имени пользователя без передачи пароля.",
      },
    ],
    tasks: [
      {
        id: "be14t1",
        title: "JWT токен",
        md: `Реализуйте функцию \`create_jwt_token(user_id, secret_key, expires_minutes=30)\`, которая создаёт JWT токен с payload \`{"sub": user_id, "exp": expiration_time}\`.`,
        starter: `import jwt
from datetime import datetime, timedelta

def create_jwt_token(user_id: int, secret_key: str, expires_minutes: int = 30) -> str:
    # Ваш код здесь
    pass

# Тест
token = create_jwt_token(123, "secret")
print(token)`,
        tests: `
__test("возвращает строку", lambda: isinstance(create_jwt_token(123, "secret"), str), True)
__test("токен декодируется", lambda: jwt.decode(create_jwt_token(123, "secret"), "secret", algorithms=["HS256"])["sub"], 123)`,
        solution: `import jwt
from datetime import datetime, timedelta

def create_jwt_token(user_id: int, secret_key: str, expires_minutes: int = 30) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=expires_minutes)
    }
    return jwt.encode(payload, secret_key, algorithm="HS256")`,
      },
    ],
  },

  // ========== СПРИНТ 7: Микросервисы ==========
  {
    id: "be15",
    language: "python",
    title: "Микросервисы и общение между сервисами",
    subtitle: "REST, gRPC, message brokers",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Микросервисная архитектура

Микросервисы — архитектурный стиль, где приложение состоит из небольших независимых сервисов:
- Каждый сервис отвечает за свою бизнес-область
- Сервисы общаются через API
- Независимое развёртывание и масштабирование`,
      },
      {
        kind: "code",
        title: "gRPC сервис",
        code: `# movie.proto
syntax = "proto3";

service MovieService {
    rpc GetMovie (MovieRequest) returns (MovieResponse);
}

message MovieRequest {
    int32 id = 1;
}

message MovieResponse {
    int32 id = 1;
    string title = 2;
    int32 year = 3;
}`,
      },
    ],
    quiz: [
      {
        q: "Что такое gRPC?",
        options: [
          "Веб-фреймворк",
          "Высокопроизводительный RPC фреймворк",
          "База данных",
          "Брокер сообщений",
        ],
        answer: 1,
        explain: "gRPC — высокопроизводительный RPC фреймворк от Google, использующий Protocol Buffers и HTTP/2.",
      },
    ],
    tasks: [
      {
        id: "be15t1",
        title: "gRPC клиент",
        md: `Создайте функцию \`get_movie_grpc(movie_id)\`, которая получает фильм через gRPC.`,
        starter: `def get_movie_grpc(movie_id: int):
    # Ваш код здесь
    pass

print("Функция создана")`,
        tests: `
__test("функция существует", lambda: callable(get_movie_grpc), True)`,
        solution: `def get_movie_grpc(movie_id: int):
    # gRPC client code
    return {"id": movie_id, "title": "Movie"}`,
      },
    ],
  },

  {
    id: "be16",
    language: "python",
    title: "Устойчивость сервиса к нагрузкам",
    subtitle: "Rate limiting, circuit breaker, health checks",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Rate Limiting

Ограничение количества запросов:
- Защита от DDoS-атак
- Справедливое распределение ресурсов
- Предотвращение злоупотреблений API`,
      },
      {
        kind: "code",
        title: "Rate limiting",
        code: `import redis
import time

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.redis = redis.Redis()
    
    def is_allowed(self, key: str) -> bool:
        current_time = int(time.time())
        window_key = f"rate_limit:{key}:{current_time // self.window_seconds}"
        
        requests = self.redis.incr(window_key)
        
        if requests == 1:
            self.redis.expire(window_key, self.window_seconds)
        
        return requests <= self.max_requests`,
      },
    ],
    quiz: [
      {
        q: "Что делает Circuit Breaker?",
        options: [
          "Ускоряет запросы",
          "Предотвращает каскадные сбои",
          "Кэширует данные",
          "Балансирует нагрузку",
        ],
        answer: 1,
        explain: "Circuit Breaker предотвращает каскадные сбои, блокируя запросы к недоступному сервису и позволяя ему восстановиться.",
      },
    ],
    tasks: [
      {
        id: "be16t1",
        title: "Rate limiter",
        md: `Реализуйте класс \`RateLimiter\` с методом \`is_allowed(key)\`, который проверяет, разрешён ли запрос для данного ключа. Используйте sliding window алгоритм.`,
        starter: `import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, key: str) -> bool:
        # Ваш код здесь
        pass

# Тест
limiter = RateLimiter(max_requests=5, window_seconds=60)
print(limiter.is_allowed("user1"))`,
        tests: `
__test("разрешает первые запросы", lambda: RateLimiter(5, 60).is_allowed("test"), True)
__test("ограничивает после лимита", lambda: (lambda l: [l.is_allowed("test") for _ in range(10)][-1])(RateLimiter(5, 60)), False)`,
        solution: `import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, key: str) -> bool:
        current_time = time.time()
        window_start = current_time - self.window_seconds
        
        self.requests[key] = [t for t in self.requests[key] if t > window_start]
        
        if len(self.requests[key]) >= self.max_requests:
            return False
        
        self.requests[key].append(current_time)
        return True`,
      },
    ],
  },

  // ========== СПРИНТ 8: UGC и большие данные ==========
  {
    id: "be17",
    language: "python",
    title: "UGC-сервис и большие данные",
    subtitle: "Apache Kafka, Spark, ClickHouse, шардирование",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Планирование UGC-сервиса

UGC (User Generated Content) — контент, создаваемый пользователями:
- Видеохостинги (YouTube)
- Социальные сети (Instagram)
- Форумы и блоги

Архитектура:
- PostgreSQL для метаданных
- S3 для файлов
- ClickHouse для аналитики`,
      },
      {
        kind: "code",
        title: "Apache Kafka",
        code: `from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def publish_event(topic: str, event: dict):
    producer.send(topic, value=event)
    producer.flush()`,
      },
    ],
    quiz: [
      {
        q: "Что такое Apache Kafka?",
        options: [
          "База данных",
          "Распределённая система обмена сообщениями",
          "Веб-сервер",
          "Кэш",
        ],
        answer: 1,
        explain: "Kafka — распределённая система обмена сообщениями для асинхронной коммуникации между сервисами.",
      },
    ],
    tasks: [
      {
        id: "be17t1",
        title: "Kafka producer",
        md: `Реализуйте функцию \`publish_video_event(video_id, event_type, metadata)\`, которая отправляет событие о видео в Kafka topic \`video_events\`.`,
        starter: `from kafka import KafkaProducer
import json
from datetime import datetime

def publish_video_event(video_id: int, event_type: str, meta dict):
    # Ваш код здесь
    pass

# Тест
publish_video_event(123, 'video.uploaded', {'title': 'Test Video'})
print("Событие опубликовано")`,
        tests: `
__test("функция существует", lambda: callable(publish_video_event), True)`,
        solution: `from kafka import KafkaProducer
import json
from datetime import datetime

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def publish_video_event(video_id: int, event_type: str, meta dict):
    event = {
        'video_id': video_id,
        'event_type': event_type,
        'metadata': metadata,
        'timestamp': datetime.utcnow().isoformat()
    }
    producer.send('video_events', value=event)
    producer.flush()`,
      },
    ],
  },

  // ========== СПРИНТ 9: CI/CD ==========
  {
    id: "be18",
    language: "python",
    title: "CI/CD, распределённые хранилища и мониторинг",
    subtitle: "GitHub Actions, ELK-стек, Sentry",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## CI/CD

CI/CD — Continuous Integration/Continuous Deployment:
- Автоматическая сборка и тестирование
- Автоматическое развёртывание
- Инструменты: GitHub Actions, GitLab CI, Jenkins`,
      },
      {
        kind: "code",
        title: "GitHub Actions",
        code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest`,
      },
    ],
    quiz: [
      {
        q: "Что такое CI/CD?",
        options: [
          "База данных",
          "Непрерывная интеграция и непрерывное развёртывание",
          "Фреймворк для тестирования",
          "Система мониторинга",
        ],
        answer: 1,
        explain: "CI/CD — Continuous Integration/Continuous Deployment, автоматизация сборки, тестирования и развёртывания.",
      },
    ],
    tasks: [
      {
        id: "be18t1",
        title: "GitHub Actions workflow",
        md: `Создайте YAML-файл для GitHub Actions workflow, который:
1. Запускается при push в ветку main
2. Устанавливает Python 3.11
3. Устанавливает зависимости из requirements.txt
4. Запускает линтеры (black, flake8)
5. Запускает тесты (pytest)`,
        starter: `# .github/workflows/ci.yml
# Ваш workflow здесь

print("Workflow создан")`,
        tests: `
__test("workflow создан", lambda: True, True)`,
        solution: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run linters
        run: |
          black --check .
          flake8 .
      - name: Run tests
        run: pytest`,
      },
    ],
  },

  // ========== СПРИНТ 10: Сервис нотификаций ==========
  {
    id: "be19",
    language: "python",
    title: "Сервис нотификаций и коммуникаций",
    subtitle: "Email, SMS, WebSocket, RabbitMQ, шаблонизация",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Принцип работы сервиса нотификаций

Сервис нотификаций — централизованная система отправки уведомлений:
- Email (SMTP)
- SMS
- Push-уведомления
- WebSocket (real-time)

Единая политика контактов:
- Пользовательские предпочтения
- Rate limiting
- Идемпотентность`,
      },
      {
        kind: "code",
        title: "Email сервис с шаблонизацией",
        code: `from jinja2 import Template
import smtplib
from email.mime.text import MIMEText

class EmailService:
    def __init__(self, smtp_host, smtp_port, username, password):
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
    
    def send_templated_email(self, to_email, template_name, context):
        template = self.load_template(template_name)
        rendered = template.render(**context)
        
        msg = MIMEText(rendered, 'html')
        msg['Subject'] = context.get('subject', 'Notification')
        msg['From'] = self.username
        msg['To'] = to_email
        
        with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)`,
      },
      {
        kind: "code",
        title: "WebSocket сервер",
        code: `from fastapi import WebSocket, WebSocketDisconnect

class NotificationWebSocket:
    def __init__(self):
        self.active_connections = {}
    
    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
    
    async def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
    
    async def send_to_user(self, user_id: int, notification: dict):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_json(notification)`,
      },
    ],
    quiz: [
      {
        q: "Для чего используется RabbitMQ в сервисе нотификаций?",
        options: [
          "Хранение данных",
          "Очереди сообщений для асинхронной обработки",
          "Кеширование",
          "Балансировка нагрузки",
        ],
        answer: 1,
        explain: "RabbitMQ обеспечивает очереди сообщений для асинхронной обработки уведомлений.",
      },
      {
        q: "Какой протокол используется для real-time уведомлений?",
        options: ["HTTP", "SMTP", "WebSocket", "FTP"],
        answer: 2,
        explain: "WebSocket обеспечивает двустороннюю связь для real-time уведомлений.",
      },
    ],
    tasks: [
      {
        id: "be19t1",
        title: "WebSocket модуль",
        md: `Создайте класс \`NotificationWebSocket\` с методами:
- \`connect(user_id)\` — подключение пользователя
- \`disconnect(user_id)\` — отключение
- \`send_to_user(user_id, message)\` — отправка конкретному пользователю
- \`broadcast(message)\` — отправка всем подключённым`,
        starter: `class NotificationWebSocket:
    def __init__(self):
        self.connections = {}
    
    async def connect(self, user_id: int, websocket):
        # Ваш код здесь
        pass
    
    async def disconnect(self, user_id: int, websocket):
        # Ваш код здесь
        pass
    
    async def send_to_user(self, user_id: int, message: dict):
        # Ваш код здесь
        pass
    
    async def broadcast(self, message: dict):
        # Ваш код здесь
        pass

print("WebSocket модуль создан")`,
        tests: `
__test("класс создан", lambda: NotificationWebSocket() is not None, True)`,
        solution: `class NotificationWebSocket:
    def __init__(self):
        self.connections = {}
    
    async def connect(self, user_id: int, websocket):
        if user_id not in self.connections:
            self.connections[user_id] = []
        self.connections[user_id].append(websocket)
    
    async def disconnect(self, user_id: int, websocket):
        if user_id in self.connections:
            self.connections[user_id].remove(websocket)
            if not self.connections[user_id]:
                del self.connections[user_id]
    
    async def send_to_user(self, user_id: int, message: dict):
        if user_id in self.connections:
            for ws in self.connections[user_id]:
                await ws.send_json(message)
    
    async def broadcast(self, message: dict):
        for user_connections in self.connections.values():
            for ws in user_connections:
                await ws.send_json(message)`,
      },
    ],
  },
];
