import type { Lesson } from "../lib/types";

export const backendLessons: Lesson[] = [
  // ========== СПРИНТ 1: Django и базы данных ==========
  {
    id: "be1",
    language: "python",
    title: "Проектирование базы данных",
    subtitle: "Нормализация, связи, типы данных, индексы",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Реляционные базы данных

Реляционная БД хранит данные в таблицах со связями между ними. Основные принципы:
- **Атомарность** — каждая ячейка содержит одно значение
- **Нормализация** — устранение дублирования данных
- **Целостность** — ссылки между таблицами через внешние ключи`,
      },
      {
        kind: "text",
        md: `## Нормализация

**1NF** — атомарные значения, нет повторяющихся групп
**2NF** — 1NF + все неключевые атрибуты зависят от всего первичного ключа
**3NF** — 2NF + нет транзитивных зависимостей

Пример денормализации: таблица \`orders\` с полями \`customer_name\`, \`customer_email\` нарушает 2NF — имя и email зависят от \`customer_id\`, а не от \`order_id\`.

Решение: вынести клиентов в отдельную таблицу \`customers\`, в \`orders\` оставить только \`customer_id\`.`,
      },
      {
        kind: "code",
        title: "Пример схемы БД",
        code: `-- Таблица клиентов
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица заказов (связь с customers)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0
);

-- Таблица позиций заказа (many-to-many)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);`,
      },
      {
        kind: "text",
        md: `## Индексы

Индекс ускоряет поиск, но замедляет вставку. Создавайте индексы для:
- Полей в \`WHERE\`, \`JOIN\`, \`ORDER BY\`
- Внешних ключей
- Уникальных ограничений

\`\`\`sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_name ON products(name);
\`\`\`

**B-tree** — стандартный индекс для сравнений (=, <, >, BETWEEN)
**Hash** — только для точного совпадения (=)
**GIN** — для полнотекстового поиска и массивов`,
      },
      {
        kind: "warn",
        title: "Не создавайте индексы на всё",
        md: `Каждый индекс:
- Замедляет INSERT/UPDATE/DELETE
- Занимает место на диске
- Требует обслуживания (REINDEX)

Создавайте индексы только для часто запрашиваемых полей. Используйте \`EXPLAIN ANALYZE\` для проверки эффективности запросов.`,
      },
    ],
    quiz: [
      {
        q: "Что такое 3-я нормальная форма (3NF)?",
        options: [
          "Все значения атомарны",
          "Нет частичных зависимостей от ключа",
          "Нет транзитивных зависимостей",
          "Все поля обязательны",
        ],
        answer: 2,
        explain: "3NF = 2NF + отсутствие транзитивных зависимостей (неключевые поля не зависят друг от друга).",
      },
      {
        q: "Зачем нужны индексы?",
        options: [
          "Ускоряют INSERT",
          "Ускоряют SELECT с условиями",
          "Экономят место на диске",
          "Автоматически создаются для всех полей",
        ],
        answer: 1,
        explain: "Индексы ускоряют поиск (SELECT), но замедляют вставку (INSERT/UPDATE) и занимают место.",
      },
    ],
    tasks: [
      {
        id: "be1t1",
        title: "Нормализация таблицы",
        md: `Дана таблица \`employees\` с полями: \`id\`, \`name\`, \`department_name\`, \`department_location\`. Приведите к 3NF: создайте две таблицы — \`departments\` и \`employees\` (с внешним ключом). Верните SQL-код.`,
        starter: `def normalize_employees():
    # Верните SQL для создания таблиц departments и employees
    return """
    -- ваш SQL
    """

print(normalize_employees())`,
        tests: `
__test("создаёт таблицу departments", lambda: "CREATE TABLE departments" in normalize_employees(), True)
__test("создаёт таблицу employees", lambda: "CREATE TABLE employees" in normalize_employees(), True)
__test("employees ссылается на departments", lambda: "REFERENCES departments" in normalize_employees(), True)
__test("departments содержит name и location", lambda: "name" in normalize_employees() and "location" in normalize_employees(), True)`,
        solution: `def normalize_employees():
    return """
    CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(200)
    );
    
    CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department_id INTEGER REFERENCES departments(id)
    );
    """`,
      },
    ],
  },

  {
    id: "be2",
    language: "python",
    title: "Django: от установки до админки",
    subtitle: "Проект, приложения, модели, миграции, админка",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Django

Django — высокоуровневый Python-фреймворк для веб-разработки. Принцип: **"batteries included"** — всё включено (ORM, админка, аутентификация, формы).

Преимущества:
- Быстрая разработка (admin, ORM, миграции из коробки)
- Безопасность (защита от SQL-инъекций, XSS, CSRF)
- Масштабируемость (Instagram, Pinterest, Mozilla)`,
      },
      {
        kind: "code",
        title: "Создание проекта",
        code: `# Установка Django
# pip install django

# Создание проекта
# django-admin startproject myproject
# cd myproject

# Создание приложения
# python manage.py startapp movies

# Структура проекта:
# myproject/
# ├── manage.py
# ├── myproject/
# │   ├── settings.py
# │   ├── urls.py
# │   └── wsgi.py
# └── movies/
#     ├── models.py
#     ├── views.py
#     └── admin.py

print("Django-проект создан")
print("Приложение movies добавлено")`,
      },
      {
        kind: "text",
        md: `## Модели

Модель — Python-класс, описывающий таблицу БД. Django автоматически создаёт миграции и таблицы.

\`\`\`python
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"
\`\`\`

Типы полей: \`CharField\`, \`IntegerField\`, \`TextField\`, \`BooleanField\`, \`DateTimeField\`, \`ForeignKey\`, \`ManyToManyField\`.`,
      },
      {
        kind: "code",
        title: "Модели с связями",
        code: `from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    genres = models.ManyToManyField(Genre, related_name='movies')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-year', 'title']
    
    def __str__(self):
        return f"{self.title} ({self.year})"

class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    author = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 11)])
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.movie.title} - {self.author}"`,
      },
      {
        kind: "text",
        md: `## Миграции

Миграции — способ синхронизации моделей с БД.

\`\`\`bash
# Создать миграцию на основе изменений моделей
python manage.py makemigrations

# Применить миграции к БД
python manage.py migrate

# Откатить последнюю миграцию
python manage.py migrate movies 0001

# Показать список миграций
python manage.py showmigrations
\`\`\``,
      },
      {
        kind: "code",
        title: "Админка Django",
        code: `# movies/admin.py
from django.contrib import admin
from .models import Movie, Genre, Review

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'rating', 'created_at')
    list_filter = ('year', 'genres', 'rating')
    search_fields = ('title',)
    filter_horizontal = ('genres',)
    date_hierarchy = 'created_at'

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('movie', 'author', 'rating', 'created_at')
    list_filter = ('rating', 'movie')
    search_fields = ('author', 'text')`,
      },
      {
        kind: "tip",
        title: "Запуск сервера",
        md: `\`\`\`bash
# Создать суперпользователя
python manage.py createsuperuser

# Запустить dev-сервер
python manage.py runserver

# Открыть админку
# http://127.0.0.1:8000/admin/
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что делает команда makemigrations?",
        options: [
          "Применяет миграции к БД",
          "Создаёт файлы миграций на основе изменений моделей",
          "Удаляет старые миграции",
          "Запускает сервер",
        ],
        answer: 1,
        explain: "makemigrations анализирует изменения в моделях и создаёт файлы миграций. migrate применяет их к БД.",
      },
      {
        q: "Какой тип поля используется для связи many-to-many?",
        options: ["ForeignKey", "OneToOneField", "ManyToManyField", "CharField"],
        answer: 2,
        explain: "ManyToManyField создаёт промежуточную таблицу для связи многие-ко-многим.",
      },
    ],
    tasks: [
      {
        id: "be2t1",
        title: "Модель Article",
        md: `Создайте модель \`Article\` с полями: \`title\` (строка до 200 символов), \`content\` (текст), \`published\` (булево, по умолчанию False), \`created_at\` (дата создания, автоматически). Добавьте метод \`__str__\`.`,
        starter: `def create_article_model():
    # Верните код модели Article
    return """
    from django.db import models
    
    class Article(models.Model):
        # ваш код
        pass
    """

print(create_article_model())`,
        tests: `
__test("содержит title", lambda: "title" in create_article_model(), True)
__test("содержит content", lambda: "content" in create_article_model(), True)
__test("содержит published", lambda: "published" in create_article_model(), True)
__test("содержит created_at", lambda: "created_at" in create_article_model(), True)
__test("имеет __str__", lambda: "__str__" in create_article_model(), True)`,
        solution: `def create_article_model():
    return """
    from django.db import models
    
    class Article(models.Model):
        title = models.CharField(max_length=200)
        content = models.TextField()
        published = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_now_add=True)
        
        def __str__(self):
            return self.title
    """`,
      },
    ],
  },

  {
    id: "be3",
    language: "python",
    title: "ORM: запросы к базе данных",
    subtitle: "QuerySet, фильтрация, агрегация, связи",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Django ORM

ORM (Object-Relational Mapping) позволяет работать с БД через Python-объекты, не writing SQL.

\`\`\`python
from movies.models import Movie

# Создать запись
movie = Movie.objects.create(
    title="Inception",
    year=2010,
    rating=8.8
)

# Получить все записи
movies = Movie.objects.all()

# Фильтрация
movies_2010 = Movie.objects.filter(year=2010)
movies_high_rating = Movie.objects.filter(rating__gte=8.0)

# Получить одну запись
movie = Movie.objects.get(id=1)
\`\`\``,
      },
      {
        kind: "code",
        title: "Фильтрация и поиск",
        code: `from movies.models import Movie

# Точное совпадение
Movie.objects.filter(title="Inception")

# Содержит (LIKE %...%)
Movie.objects.filter(title__contains="tion")

# Начинается с
Movie.objects.filter(title__startswith="In")

# В списке
Movie.objects.filter(year__in=[2010, 2014, 2020])

# Диапазон
Movie.objects.filter(year__range=(2010, 2020))

# Больше/меньше
Movie.objects.filter(rating__gt=8.0)  # >
Movie.objects.filter(rating__gte=8.0) # >=
Movie.objects.filter(rating__lt=5.0)  # <
Movie.objects.filter(rating__lte=5.0) # <=

# NULL
Movie.objects.filter(director__isnull=True)

# Связи (many-to-many)
Movie.objects.filter(genres__name="Action")`,
      },
      {
        kind: "text",
        md: `## Агрегация и аннотация

\`\`\`python
from django.db.models import Count, Avg, Max, Min, Sum

# Подсчёт
total = Movie.objects.count()

# Средний рейтинг
avg_rating = Movie.objects.aggregate(Avg('rating'))

# Группировка
from django.db.models import Count
movies_by_year = Movie.objects.values('year').annotate(count=Count('id'))

# Аннотация (добавить поле к каждой записи)
movies = Movie.objects.annotate(review_count=Count('reviews'))
\`\`\``,
      },
      {
        kind: "code",
        title: "Сложные запросы",
        code: `from django.db.models import Q, F, Count, Avg

# Логические операторы (OR)
movies = Movie.objects.filter(
    Q(year=2010) | Q(year=2014)
)

# Сложные условия
movies = Movie.objects.filter(
    Q(rating__gte=8.0) & Q(year__gte=2010)
)

# Обновление с F() (использовать значения полей)
Movie.objects.filter(year=2010).update(rating=F('rating') + 0.1)

# Связи через select_related ( ForeignKey)
movies = Movie.objects.select_related('director').all()

# Связи через prefetch_related (ManyToMany)
movies = Movie.objects.prefetch_related('genres').all()

# Уникальные значения
years = Movie.objects.values_list('year', flat=True).distinct()

# Сортировка
movies = Movie.objects.order_by('-rating', 'year')`,
      },
      {
        kind: "warn",
        title: "Проблема N+1",
        md: `Запрос внутри цикла вызывает N+1 запросов к БД:

\`\`\`python
# ПЛОХО: N+1 запросов
for movie in Movie.objects.all():
    print(movie.genres.all())  # отдельный запрос для каждого фильма

# ХОРОШО: 2 запроса
for movie in Movie.objects.prefetch_related('genres').all():
    print(movie.genres.all())
\`\`\`

Используйте \`select_related\` для ForeignKey и \`prefetch_related\` для ManyToMany.`,
      },
    ],
    quiz: [
      {
        q: "Как отфильтровать фильмы с рейтингом >= 8.0?",
        options: [
          "Movie.objects.filter(rating=8.0)",
          "Movie.objects.filter(rating__gte=8.0)",
          "Movie.objects.filter(rating>=8.0)",
          "Movie.objects.where(rating >= 8.0)",
        ],
        answer: 1,
        explain: "Lookup __gte означает 'greater than or equal' (больше или равно).",
      },
      {
        q: "Что решает prefetch_related?",
        options: [
          "Ускоряет создание записей",
          "Решает проблему N+1 для ManyToMany",
          "Автоматически создаёт индексы",
          "Кэширует запросы",
        ],
        answer: 1,
        explain: "prefetch_related загружает связанные объекты за один запрос, решая проблему N+1.",
      },
    ],
    tasks: [
      {
        id: "be3t1",
        title: "Запрос фильмов",
        md: `Напишите функцию \`get_top_movies()\`, возвращающую QuerySet фильмов с рейтингом >= 8.0, отсортированных по убыванию рейтинга.`,
        starter: `def get_top_movies():
    # Верните QuerySet фильмов
    return "Movie.objects..."  # ваш код

print(get_top_movies())`,
        tests: `
__test("фильтрует по рейтингу", lambda: "rating__gte=8.0" in get_top_movies() or "rating__gte = 8.0" in get_top_movies(), True)
__test("сортирует по рейтингу", lambda: "order_by" in get_top_movies() and "rating" in get_top_movies(), True)
__test("возвращает QuerySet", lambda: "Movie.objects" in get_top_movies(), True)`,
        solution: `def get_top_movies():
    return Movie.objects.filter(rating__gte=8.0).order_by('-rating')`,
      },
    ],
  },

  {
    id: "be4",
    language: "python",
    title: "REST API на Django",
    subtitle: "Django REST Framework, сериализаторы, viewsets",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Django REST Framework (DRF)

DRF — библиотека для создания REST API на Django.

Установка:
\`\`\`bash
pip install djangorestframework
\`\`\`

Добавьте в \`settings.py\`:
\`\`\`python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
\`\`\``,
      },
      {
        kind: "code",
        title: "Сериализаторы",
        code: `# movies/serializers.py
from rest_framework import serializers
from .models import Movie, Genre, Review

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author', 'text', 'rating', 'created_at']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Genre.objects.all(), source='genres'
    )
    
    class Meta:
        model = Movie
        fields = ['id', 'title', 'year', 'rating', 'genres', 'genre_ids', 'reviews', 'created_at']`,
      },
      {
        kind: "text",
        md: `## ViewSets

ViewSet — класс, обрабатывающий все HTTP-методы для модели.

\`\`\`python
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
    # Фильтрация
    def get_queryset(self):
        queryset = Movie.objects.all()
        year = self.request.query_params.get('year')
        if year:
            queryset = queryset.filter(year=year)
        return queryset
\`\`\`

ModelViewSet автоматически предоставляет:
- GET /movies/ — список
- POST /movies/ — создание
- GET /movies/{id}/ — детальная информация
- PUT /movies/{id}/ — полное обновление
- PATCH /movies/{id}/ — частичное обновление
- DELETE /movies/{id}/ — удаление`,
      },
      {
        kind: "code",
        title: "URL-маршруты",
        code: `# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movies.views import MovieViewSet, GenreViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'genres', GenreViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Результат:
# GET /api/movies/
# POST /api/movies/
# GET /api/movies/{id}/
# PUT /api/movies/{id}/
# DELETE /api/movies/{id}/`,
      },
      {
        kind: "text",
        md: `## Аутентификация и разрешения

\`\`\`python
from rest_framework import permissions

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
    # Только аутентифицированные пользователи могут создавать
    def get_permissions(self):
        if self.action in ['create', 'update', 'delete']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
\`\`\`

Типы аутентификации:
- TokenAuthentication
- SessionAuthentication
- JWT (через djangorestframework-simplejwt)`,
      },
      {
        kind: "tip",
        title: "Тестирование API",
        md: `Используйте \`httpie\` или \`curl\` для тестирования:

\`\`\`bash
# Получить список фильмов
http GET http://127.0.0.1:8000/api/movies/

# Создать фильм
http POST http://127.0.0.1:8000/api/movies/ title="Inception" year=2010 rating:=8.8

# Обновить фильм
http PATCH http://127.0.0.1:8000/api/movies/1/ rating:=9.0
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что делает ModelViewSet?",
        options: [
          "Только читает данные",
          "Предоставляет все CRUD-операции",
          "Только создаёт записи",
          "Управляет миграциями",
        ],
        answer: 1,
        explain: "ModelViewSet автоматически предоставляет list, create, retrieve, update, partial_update, destroy.",
      },
      {
        q: "Какой HTTP-метод используется для частичного обновления?",
        options: ["GET", "POST", "PUT", "PATCH"],
        answer: 3,
        explain: "PATCH — частичное обновление (только указанные поля). PUT — полное обновление (все поля).",
      },
    ],
    tasks: [
      {
        id: "be4t1",
        title: "Сериализатор Article",
        md: `Создайте сериализатор \`ArticleSerializer\` для модели \`Article\` (поля: title, content, published, created_at).`,
        starter: `def create_article_serializer():
    return """
    from rest_framework import serializers
    from .models import Article
    
    class ArticleSerializer(serializers.ModelSerializer):
        # ваш код
        pass
    """

print(create_article_serializer())`,
        tests: `
__test("наследует ModelSerializer", lambda: "ModelSerializer" in create_article_serializer(), True)
__test("указывает модель", lambda: "model = Article" in create_article_serializer() or "model=Article" in create_article_serializer(), True)
__test("указывает поля", lambda: "fields" in create_article_serializer(), True)`,
        solution: `def create_article_serializer():
    return """
    from rest_framework import serializers
    from .models import Article
    
    class ArticleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ['id', 'title', 'content', 'published', 'created_at']
    """`,
      },
    ],
  },

  // ========== СПРИНТ 2: Docker и деплой ==========
  {
    id: "be5",
    language: "python",
    title: "Docker: основы контейнеризации",
    subtitle: "Образы, контейнеры, Dockerfile, docker-compose",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Docker

Docker — платформа для контейнеризации приложений. Контейнер — изолированная среда с приложением и всеми зависимостями.

Преимущества:
- **Портативность** — работает везде (dev, staging, production)
- **Изоляция** — приложения не конфликтуют
- **Воспроизводимость** — одинаковое окружение на всех машинах
- **Масштабируемость** — легко запускать несколько копий`,
      },
      {
        kind: "code",
        title: "Dockerfile для Django",
        code: `# Dockerfile
FROM python:3.11-slim

# Установка зависимостей
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода
COPY . .

# Сборка статики
RUN python manage.py collectstatic --noinput

# Запуск
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]

# Сборка образа
# docker build -t myproject .

# Запуск контейнера
# docker run -p 8000:8000 myproject`,
      },
      {
        kind: "text",
        md: `## Основные команды Docker

\`\`\`bash
# Образы
docker build -t name .          # собрать образ
docker images                   # список образов
docker rmi image_id             # удалить образ

# Контейнеры
docker run -p 8000:8000 name    # запустить контейнер
docker ps                       # список запущенных
docker stop container_id        # остановить
docker rm container_id          # удалить
docker logs container_id        # логи
docker exec -it container_id bash  # войти в контейнер
\`\`\``,
      },
      {
        kind: "code",
        title: "docker-compose.yml",
        code: `# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - DEBUG=False
    depends_on:
      - db
      - redis
    volumes:
      - static_volume:/app/staticfiles
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  static_volume:

# Запуск
# docker-compose up -d
# docker-compose down`,
      },
      {
        kind: "text",
        md: `## Volumes и сети

**Volumes** — постоянное хранилище данных:
\`\`\`yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
\`\`\`

**Сети** — изолированная сеть для контейнеров:
\`\`\`yaml
networks:
  backend:
    driver: bridge
\`\`\`

Контейнеры в одной сети могут общаться по имени сервиса (например, \`db:5432\`).`,
      },
      {
        kind: "warn",
        title: "Не храните секреты в Dockerfile",
        md: `Используйте переменные окружения или Docker Secrets:

\`\`\`yaml
environment:
  - SECRET_KEY=\${SECRET_KEY}
  - DATABASE_PASSWORD=\${DB_PASSWORD}
\`\`\`

Или .env файл (не коммитить в Git!):
\`\`\`bash
SECRET_KEY=your-secret-key
DB_PASSWORD=your-password
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что делает команда docker-compose up -d?",
        options: [
          "Останавливает контейнеры",
          "Запускает контейнеры в фоне",
          "Удаляет контейнеры",
          "Показывает логи",
        ],
        answer: 1,
        explain: "Флаг -d означает 'detached' — запуск в фоновом режиме.",
      },
      {
        q: "Зачем нужны volumes?",
        options: [
          "Для ускорения контейнеров",
          "Для постоянного хранения данных",
          "Для изоляции сетей",
          "Для установки зависимостей",
        ],
        answer: 1,
        explain: "Volumes сохраняют данные между перезапусками контейнеров (например, данные БД).",
      },
    ],
    tasks: [
      {
        id: "be5t1",
        title: "Dockerfile для Flask",
        md: `Создайте Dockerfile для Flask-приложения: базовый образ python:3.11-slim, установка зависимостей из requirements.txt, копирование кода, запуск через gunicorn на порту 5000.`,
        starter: `def create_dockerfile():
    return """
    # ваш Dockerfile
    """

print(create_dockerfile())`,
        tests: `
__test("базовый образ Python", lambda: "FROM python" in create_dockerfile(), True)
__test("копирует requirements.txt", lambda: "COPY requirements.txt" in create_dockerfile(), True)
__test("устанавливает зависимости", lambda: "pip install" in create_dockerfile(), True)
__test("запускает gunicorn", lambda: "gunicorn" in create_dockerfile(), True)
__test("порт 5000", lambda: "5000" in create_dockerfile(), True)`,
        solution: `def create_dockerfile():
    return """
    FROM python:3.11-slim
    
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    COPY . .
    
    CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
    """`,
      },
    ],
  },

  {
    id: "be6",
    language: "python",
    title: "Nginx и uWSGI",
    subtitle: "Reverse proxy, статика, продакшн-конфигурация",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Зачем нужен Nginx

Nginx — веб-сервер и reverse proxy. В продакшн-среде:
- Обрабатывает статические файлы (быстрее, чем Django)
- Балансирует нагрузку между несколькими Django-инстансами
- SSL/TLS termination
- Защита от DDoS

Схема: \`Client → Nginx → uWSGI → Django\``,
      },
      {
        kind: "code",
        title: "Конфигурация Nginx",
        code: `# nginx.conf
upstream django {
    server web:8000;  # имя сервиса из docker-compose
}

server {
    listen 80;
    server_name example.com;
    
    # Статические файлы
    location /static/ {
        alias /app/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Медиа файлы
    location /media/ {
        alias /app/media/;
        expires 7d;
    }
    
    # API и Django
    location / {
        uwsgi_pass django;
        include uwsgi_params;
        
        # Таймауты
        uwsgi_read_timeout 300;
        uwsgi_send_timeout 300;
        
        # Заголовки
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
      },
      {
        kind: "text",
        md: `## uWSGI

uWSGI — сервер приложений для Python. Принимает запросы от Nginx и передаёт в Django.

\`\`\`ini
# uwsgi.ini
[uwsgi]
chdir = /app
module = myproject.wsgi:application
master = true
processes = 4
threads = 2
socket = :8000
vacuum = true
die-on-term = true
max-requests = 5000
harakiri = 60
\`\`\`

Параметры:
- \`processes\` — количество воркеров (обычно 2 * CPU + 1)
- \`threads\` — потоки на воркер
- \`max-requests\` — перезапуск воркера после N запросов (защита от утечек памяти)`,
      },
      {
        kind: "code",
        title: "docker-compose с Nginx",
        code: `# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    command: uwsgi --ini uwsgi.ini
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    depends_on:
      - web
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
  static_volume:
  media_volume:`,
      },
      {
        kind: "text",
        md: `## SSL/TLS с Let's Encrypt

\`\`\`bash
# Установка certbot
apt install certbot python3-certbot-nginx

# Получение сертификата
certbot --nginx -d example.com

# Автообновление
certbot renew --dry-run
\`\`\`

Nginx автоматически перенаправляет HTTP → HTTPS.`,
      },
      {
        kind: "tip",
        title: "Оптимизация статики",
        md: `Включите gzip и кэширование:

\`\`\`nginx
gzip on;
gzip_types text/plain application/json application/javascript text/css;

location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что делает reverse proxy?",
        options: [
          "Ускоряет Python-код",
          "Перенаправляет запросы от клиента к backend-серверу",
          "Кэширует базу данных",
          "Компилирует статические файлы",
        ],
        answer: 1,
        explain: "Reverse proxy принимает запросы от клиентов и перенаправляет их на backend-серверы (Django, Node.js и т.д.).",
      },
      {
        q: "Зачем нужен uWSGI?",
        options: [
          "Для работы с базой данных",
          "Для обслуживания статики",
          "Для запуска Python-приложений и обработки запросов",
          "Для управления Docker-контейнерами",
        ],
        answer: 2,
        explain: "uWSGI — сервер приложений, который запускает Python-код и обрабатывает запросы от Nginx.",
      },
    ],
    tasks: [
      {
        id: "be6t1",
        title: "Nginx конфигурация",
        md: `Создайте конфигурацию Nginx для Django-приложения: проксирование на upstream \`django\` (порт 8000), обслуживание статики из \`/app/staticfiles/\` по пути \`/static/\`.`,
        starter: `def create_nginx_config():
    return """
    # ваш nginx.conf
    """

print(create_nginx_config())`,
        tests: `
__test("upstream django", lambda: "upstream django" in create_nginx_config(), True)
__test("проксирование", lambda: "uwsgi_pass" in create_nginx_config() or "proxy_pass" in create_nginx_config(), True)
__test("статика", lambda: "/static/" in create_nginx_config(), True)
__test("alias для статики", lambda: "alias" in create_nginx_config() and "staticfiles" in create_nginx_config(), True)`,
        solution: `def create_nginx_config():
    return """
    upstream django {
        server web:8000;
    }
    
    server {
        listen 80;
        
        location /static/ {
            alias /app/staticfiles/;
        }
        
        location / {
            uwsgi_pass django;
            include uwsgi_params;
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
    subtitle: "Индексы, документы, запросы, полнотекстовый поиск",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Elasticsearch

Elasticsearch — распределённый поисковый движок на основе Apache Lucene. Хранит данные в формате JSON, поддерживает полнотекстовый поиск, агрегации, аналитику.

Использование:
- Полнотекстовый поиск (сайты, документы)
- Логирование (ELK stack: Elasticsearch + Logstash + Kibana)
- Аналитика в реальном времени
- Геопространственный поиск`,
      },
      {
        kind: "code",
        title: "Индексы и документы",
        code: `# Подключение к Elasticsearch
from elasticsearch import Elasticsearch

es = Elasticsearch(["http://localhost:9200"])

# Создание индекса
es.indices.create(index="movies", body={
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "title": {"type": "text", "analyzer": "standard"},
            "year": {"type": "integer"},
            "rating": {"type": "float"},
            "description": {"type": "text"},
            "genres": {"type": "keyword"}
        }
    }
})

# Добавление документа
es.index(index="movies", id=1, body={
    "title": "Inception",
    "year": 2010,
    "rating": 8.8,
    "description": "A thief who steals corporate secrets through dream-sharing technology",
    "genres": ["Action", "Sci-Fi", "Thriller"]
})`,
      },
      {
        kind: "text",
        md: `## Полнотекстовый поиск

\`\`\`python
# Простой поиск
result = es.search(index="movies", body={
    "query": {
        "match": {
            "title": "inception"
        }
    }
})

# Поиск по нескольким полям
result = es.search(index="movies", body={
    "query": {
        "multi_match": {
            "query": "dream thief",
            "fields": ["title", "description"]
        }
    }
})

# Фильтр + поиск
result = es.search(index="movies", body={
    "query": {
        "bool": {
            "must": [
                {"match": {"title": "inception"}}
            ],
            "filter": [
                {"range": {"year": {"gte": 2010}}},
                {"term": {"genres": "Action"}}
            ]
        }
    }
})
\`\`\``,
      },
      {
        kind: "code",
        title: "Агрегации",
        code: `# Подсчёт фильмов по годам
result = es.search(index="movies", body={
    "size": 0,
    "aggs": {
        "years": {
            "histogram": {
                "field": "year",
                "interval": 5
            }
        }
    }
})

# Средний рейтинг по жанрам
result = es.search(index="movies", body={
    "size": 0,
    "aggs": {
        "genres": {
            "terms": {"field": "genres"},
            "aggs": {
                "avg_rating": {"avg": {"field": "rating"}}
            }
        }
    }
})

# Топ-10 фильмов по рейтингу
result = es.search(index="movies", body={
    "query": {"match_all": {}},
    "sort": [{"rating": {"order": "desc"}}],
    "size": 10
})`,
      },
      {
        kind: "text",
        md: `## Анализ текста

Elasticsearch использует анализаторы для обработки текста:

1. **Standard analyzer** — разбивает по пробелам, приводит к нижнему регистру
2. **Snowball analyzer** — стемминг (running → run)
3. **Custom analyzer** — токенизатор + фильтры

\`\`\`json
{
    "settings": {
        "analysis": {
            "analyzer": {
                "my_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": ["lowercase", "stop", "snowball"]
                }
            }
        }
    }
}
\`\`\``,
      },
      {
        kind: "warn",
        title: "Не используйте Elasticsearch как основную БД",
        md: `Elasticsearch:
- Не поддерживает транзакции
- Не гарантирует целостность данных (eventual consistency)
- Занимает много памяти

Используйте PostgreSQL как основную БД, Elasticsearch — для поиска и аналитики.`,
      },
    ],
    quiz: [
      {
        q: "Что такое индекс в Elasticsearch?",
        options: [
          "Таблица в SQL",
          "Коллекция документов с похожими характеристиками",
          "Поле для поиска",
          "Тип данных",
        ],
        answer: 1,
        explain: "Индекс — аналог таблицы в SQL: коллекция документов с определённой схемой (mappings).",
      },
      {
        q: "Какой запрос используется для полнотекстового поиска?",
        options: ["term", "match", "range", "exists"],
        answer: 1,
        explain: "match — полнотекстовый поиск с анализом текста. term — точное совпадение без анализа.",
      },
    ],
    tasks: [
      {
        id: "be7t1",
        title: "Поиск фильмов",
        md: `Напишите функцию \`search_movies(query)\`, выполняющую полнотекстовый поиск по полям \`title\` и \`description\` в индексе \`movies\`.`,
        starter: `def search_movies(query):
    # Верните код поиска
    return "es.search(...)"  # ваш код

print(search_movies("inception"))`,
        tests: `
__test("использует es.search", lambda: "es.search" in search_movies("test"), True)
__test("индекс movies", lambda: "movies" in search_movies("test"), True)
__test("полнотекстовый поиск", lambda: "match" in search_movies("test") or "multi_match" in search_movies("test"), True)
__test("поля title и description", lambda: "title" in search_movies("test") and "description" in search_movies("test"), True)`,
        solution: `def search_movies(query):
    return es.search(index="movies", body={
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title", "description"]
            }
        }
    })`,
      },
    ],
  },

  {
    id: "be8",
    language: "python",
    title: "ETL-процессы",
    subtitle: "Extract, Transform, Load: синхронизация данных из PostgreSQL в Elasticsearch",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Что такое ETL

ETL (Extract, Transform, Load) — процесс переноса данных из одного источника в другой с трансформацией.

Этапы:
1. **Extract** — извлечение данных из источника (PostgreSQL)
2. **Transform** — преобразование (очистка, фильтрация, обогащение)
3. **Load** — загрузка в приёмник (Elasticsearch)

Инструменты:
- Python-скрипты (для простых задач)
- Apache Airflow (оркестрация)
- Logstash (для логов)
- Custom ETL-фреймворки`,
      },
      {
        kind: "code",
        title: "ETL: PostgreSQL → Elasticsearch",
        code: `import psycopg2
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

# Подключение к PostgreSQL
pg_conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="user",
    password="pass"
)

# Подключение к Elasticsearch
es = Elasticsearch(["http://localhost:9200"])

def extract_movies():
    """Извлечение данных из PostgreSQL"""
    with pg_conn.cursor() as cur:
        cur.execute("""
            SELECT m.id, m.title, m.year, m.rating,
                   array_agg(g.name) as genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            GROUP BY m.id
        """)
        return cur.fetchall()

def transform_movie(row):
    """Трансформация данных"""
    id, title, year, rating, genres = row
    return {
        "_index": "movies",
        "_id": id,
        "_source": {
            "title": title,
            "year": year,
            "rating": float(rating) if rating else 0.0,
            "genres": genres or []
        }
    }

def load_movies(docs):
    """Загрузка в Elasticsearch"""
    success, _ = bulk(es, docs, chunk_size=500)
    return success

# Полный ETL-процесс
def sync_movies():
    rows = extract_movies()
    docs = [transform_movie(row) for row in rows]
    count = load_movies(docs)
    print(f"Синхронизировано {count} фильмов")`,
      },
      {
        kind: "text",
        md: `## Инкрементальная синхронизация

Полная синхронизация каждые N минут — неэффективно. Используйте инкрементальную:

\`\`\`python
def sync_updated_movies(last_sync):
    """Синхронизация только изменённых записей"""
    with pg_conn.cursor() as cur:
        cur.execute("""
            SELECT * FROM movies
            WHERE updated_at > %s
        """, (last_sync,))
        return cur.fetchall()

# Запуск каждые 5 минут
last_sync = datetime.now() - timedelta(minutes=5)
sync_updated_movies(last_sync)
\`\`\``,
      },
      {
        kind: "code",
        title: "Обработка ошибок и повторные попытки",
        code: `from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def load_movies_with_retry(docs):
    """Загрузка с повторными попытками"""
    try:
        success, failed = bulk(es, docs, chunk_size=500, raise_on_error=False)
        if failed:
            raise Exception(f"Не удалось загрузить {len(failed)} документов")
        return success
    except Exception as e:
        print(f"Ошибка загрузки: {e}")
        raise

# Логирование и мониторинг
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def sync_with_logging():
    logger.info("Начало синхронизации")
    try:
        rows = extract_movies()
        logger.info(f"Извлечено {len(rows)} записей")
        
        docs = [transform_movie(row) for row in rows]
        count = load_movies_with_retry(docs)
        
        logger.info(f"Загружено {count} документов")
    except Exception as e:
        logger.error(f"Ошибка синхронизации: {e}")
        raise`,
      },
      {
        kind: "text",
        md: `## Оркестрация с Airflow

Apache Airflow — платформа для оркестрации workflow.

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'sync_movies_to_elasticsearch',
    default_args=default_args,
    schedule_interval='*/5 * * * *',  # каждые 5 минут
    start_date=datetime(2024, 1, 1),
    catchup=False
) as dag:
    
    sync_task = PythonOperator(
        task_id='sync_movies',
        python_callable=sync_with_logging
    )
\`\`\``,
      },
      {
        kind: "tip",
        title: "Идемпотентность ETL",
        md: `ETL-процесс должен быть идемпотентным: повторный запуск с теми же данными даёт тот же результат.

Используйте:
- \`upsert\` вместо \`insert\` (обновление существующих записей)
- Уникальные идентификаторы (\`_id\` в Elasticsearch)
- Транзакции (для PostgreSQL)`,
      },
    ],
    quiz: [
      {
        q: "Что означает буква 'T' в ETL?",
        options: ["Transfer", "Transform", "Translate", "Transmit"],
        answer: 1,
        explain: "ETL = Extract (извлечение), Transform (преобразование), Load (загрузка).",
      },
      {
        q: "Зачем нужна инкрементальная синхронизация?",
        options: [
          "Для ускорения полной синхронизации",
          "Для синхронизации только изменённых данных",
          "Для удаления старых данных",
          "Для создания резервных копий",
        ],
        answer: 1,
        explain: "Инкрементальная синхронизация обрабатывает только данные, изменённые с последней синхронизации — быстрее и эффективнее.",
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
];
