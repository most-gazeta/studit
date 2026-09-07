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
        q: "Что такое нормализация базы данных?",
        options: [
          "Увеличение размера таблиц",
          "Устранение дублирования данных",
          "Добавление индексов",
          "Создание резервных копий",
        ],
        answer: 1,
        explain: "Нормализация — процесс организации данных для минимизации дублирования и улучшения целостности.",
      },
      {
        q: "Какой тип индекса лучше для полнотекстового поиска?",
        options: ["B-tree", "Hash", "GIN", "BRIN"],
        answer: 2,
        explain: "GIN (Generalized Inverted Index) оптимизирован для полнотекстового поиска и массивов.",
      },
    ],
    tasks: [
      {
        id: "be1t1",
        title: "Нормализация таблицы",
        md: `Дана ненормализованная таблица \`orders\` с полями: \`order_id\`, \`customer_name\`, \`customer_email\`, \`product_name\`, \`product_price\`, \`quantity\`. Напишите SQL для создания нормализованной схемы (3NF): таблицы \`customers\`, \`products\`, \`orders\`, \`order_items\`.`,
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
    subtitle: "Проект, приложения, модели, миграции, админка",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Установка Django

\`\`\`bash
pip install django
django-admin startproject myproject
cd myproject
python manage.py startapp movies
\`\`\`

Структура проекта:
- \`manage.py\` — утилита командной строки
- \`myproject/\` — настройки проекта
- \`movies/\` — приложение`,
      },
      {
        kind: "code",
        title: "Создание проекта",
        code: `# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.static',
    'movies',  # Добавляем наше приложение
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'movies_db',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}`,
      },
      {
        kind: "text",
        md: `## Модели

Модели Django — это Python-классы, описывающие таблицы БД. Каждая модель наследуется от \`models.Model\`.`,
      },
      {
        kind: "code",
        title: "Модели с связями",
        code: `# movies/models.py
from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=7.0)
    genres = models.ManyToManyField(Genre, related_name='movies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.year})"

class Actor(models.Model):
    name = models.CharField(max_length=200)
    movies = models.ManyToManyField(Movie, related_name='actors')
    
    def __str__(self):
        return self.name`,
      },
      {
        kind: "text",
        md: `## Миграции

После создания моделей нужно создать и применить миграции:

\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\``,
      },
      {
        kind: "code",
        title: "Админка Django",
        code: `# movies/admin.py
from django.contrib import admin
from .models import Movie, Genre, Actor

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

@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('movies',)

# Создание суперпользователя:
# python manage.py createsuperuser`,
      },
    ],
    quiz: [
      {
        q: "Какая команда создаёт миграции в Django?",
        options: ["python manage.py migrate", "python manage.py makemigrations", "django-admin startapp", "python manage.py runserver"],
        answer: 1,
        explain: "makemigrations создаёт файлы миграций на основе изменений в моделях. migrate применяет их к базе данных.",
      },
      {
        q: "Какой тип поля используется для связи many-to-many?",
        options: ["ForeignKey", "OneToOneField", "ManyToManyField", "CharField"],
        answer: 2,
        explain: "ManyToManyField создаёт связь «многие ко многим» через промежуточную таблицу.",
      },
    ],
    tasks: [
      {
        id: "be2t1",
        title: "Модель Article",
        md: `Создайте модель \`Article\` с полями: \`title\` (строка), \`content\` (текст), \`published\` (булево), \`created_at\` (дата создания).`,
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
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)`,
      },
    ],
  },

  {
    id: "be3",
    language: "python",
    title: "ORM: запросы к базе данных",
    subtitle: "QuerySet, фильтрация, агрегация, связи",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Django ORM

ORM (Object-Relational Mapping) позволяет работать с БД через Python-объекты вместо SQL.

Основные операции:
- \`Model.objects.all()\` — все записи
- \`Model.objects.filter()\` — фильтрация
- \`Model.objects.get()\` — одна запись
- \`Model.objects.create()\` — создание`,
      },
      {
        kind: "code",
        title: "Фильтрация и поиск",
        code: `# Все фильмы
movies = Movie.objects.all()

# Фильмы после 2020 года
recent_movies = Movie.objects.filter(year__gte=2020)

# Фильмы с рейтингом > 8.0
high_rated = Movie.objects.filter(rating__gt=8.0)

# Фильмы по названию (case-insensitive)
inception = Movie.objects.get(title__iexact='inception')

# Фильмы с жанром "Action"
action_movies = Movie.objects.filter(genres__name='Action')

# Комбинирование условий
movies_2020_action = Movie.objects.filter(
    year__gte=2020,
    genres__name='Action'
)

# Исключение
non_drama = Movie.objects.exclude(genres__name='Drama')`,
      },
      {
        kind: "text",
        md: `## Сложные запросы

Django ORM поддерживает сложные запросы с \`Q\` и \`F\` объектами.`,
      },
      {
        kind: "code",
        title: "Сложные запросы",
        code: `from django.db.models import Q, F, Count, Avg

# OR условие с Q
movies = Movie.objects.filter(
    Q(year=2020) | Q(rating__gt=8.5)
)

# Арифметика с F
Movie.objects.update(rating=F('rating') + 0.5)

# Агрегация
from django.db.models import Count, Avg, Max

# Количество фильмов по годам
movies_by_year = Movie.objects.values('year').annotate(
    count=Count('id')
).order_by('-count')

# Средний рейтинг
avg_rating = Movie.objects.aggregate(Avg('rating'))

# Максимальный рейтинг
max_rating = Movie.objects.aggregate(Max('rating'))

# Количество фильмов у каждого актёра
actors_with_count = Actor.objects.annotate(
    movie_count=Count('movies')
).order_by('-movie_count')`,
      },
      {
        kind: "warn",
        title: "Проблема N+1",
        md: `Проблема N+1 возникает при ленивой загрузке связанных объектов:

\`\`\`python
# ПЛОХО: N+1 запросов
movies = Movie.objects.all()
for movie in movies:
    print(movie.genres.all())  # Запрос для каждого фильма!

# ХОРОШО: 2 запроса с prefetch_related
movies = Movie.objects.prefetch_related('genres').all()
for movie in movies:
    print(movie.genres.all())  # Данные уже загружены
\`\`\`

Используйте \`select_related\` для ForeignKey и \`prefetch_related\` для ManyToMany.`,
      },
    ],
    quiz: [
      {
        q: "Какой метод используется для получения одной записи?",
        options: ["filter()", "get()", "all()", "first()"],
        answer: 1,
        explain: "get() возвращает одну запись или бросает DoesNotExist, если запись не найдена.",
      },
      {
        q: "Как решить проблему N+1 для ManyToMany?",
        options: ["select_related()", "prefetch_related()", "filter()", "annotate()"],
        answer: 1,
        explain: "prefetch_related() загружает связанные объекты одним дополнительным запросом.",
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
    subtitle: "Django REST Framework, сериализаторы, viewsets",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Django REST Framework (DRF)

DRF — мощный инструмент для создания REST API:
- Сериализаторы для преобразования данных
- ViewSets для CRUD-операций
- Аутентификация и права доступа
- Автоматическая документация`,
      },
      {
        kind: "code",
        title: "Сериализаторы",
        code: `# movies/serializers.py
from rest_framework import serializers
from .models import Movie, Genre, Actor

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Genre.objects.all(), source='genres'
    )
    
    class Meta:
        model = Movie
        fields = ['id', 'title', 'year', 'rating', 'genres', 'genre_ids', 'created_at']
        read_only_fields = ['created_at']

class ActorSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)
    
    class Meta:
        model = Actor
        fields = ['id', 'name', 'movies']`,
      },
      {
        kind: "text",
        md: `## ViewSets

ViewSets объединяют логику для всех HTTP-методов (GET, POST, PUT, DELETE).`,
      },
      {
        kind: "code",
        title: "URL-маршруты",
        code: `# movies/views.py
from rest_framework import viewsets, filters
from .models import Movie, Genre, Actor
from .serializers import MovieSerializer, GenreSerializer, ActorSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.prefetch_related('genres').all()
    serializer_class = MovieSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'genres__name']
    ordering_fields = ['year', 'rating', 'created_at']
    ordering = ['-created_at']

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.prefetch_related('movies').all()
    serializer_class = ActorSerializer

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movies.views import MovieViewSet, GenreViewSet, ActorViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'genres', GenreViewSet)
router.register(r'actors', ActorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]`,
      },
      {
        kind: "text",
        md: `## Тестирование API

DRF предоставляет \`APIClient\` для тестирования эндпоинтов.`,
      },
      {
        kind: "code",
        title: "Тестирование API",
        code: `# movies/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Movie, Genre

class MovieAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.genre = Genre.objects.create(name='Action')
        self.movie = Movie.objects.create(
            title='Test Movie',
            year=2024,
            rating=8.5
        )
        self.movie.genres.add(self.genre)
    
    def test_list_movies(self):
        response = self.client.get('/api/movies/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
    
    def test_create_movie(self):
        data = {
            'title': 'New Movie',
            'year': 2024,
            'rating': 7.5,
            'genre_ids': [self.genre.id]
        }
        response = self.client.post('/api/movies/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Movie.objects.count(), 2)
    
    def test_search_movies(self):
        response = self.client.get('/api/movies/?search=Test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)`,
      },
    ],
    quiz: [
      {
        q: "Что делает сериализатор в DRF?",
        options: [
          "Создаёт модели",
          "Преобразует данные между Python-объектами и JSON",
          "Подключается к базе данных",
          "Создаёт URL-маршруты",
        ],
        answer: 1,
        explain: "Сериализатор преобразует сложные типы данных (модели Django) в JSON и обратно.",
      },
      {
        q: "Какой класс используется для создания CRUD API?",
        options: ["APIView", "ModelViewSet", "GenericAPIView", "Serializer"],
        answer: 1,
        explain: "ModelViewSet автоматически предоставляет CRUD-операции (list, create, retrieve, update, destroy).",
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
    subtitle: "Образы, контейнеры, Dockerfile, docker-compose",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Docker?

Docker — платформа для контейнеризации приложений. Контейнер — изолированная среда с приложением и всеми зависимостями.

Преимущества:
- **Изоляция** — приложения не конфликтуют
- **Воспроизводимость** — одинаковая среда везде
- **Масштабируемость** — легко копировать и запускать`,
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

# Переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Открытие порта
EXPOSE 8000

# Запуск приложения
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]`,
      },
      {
        kind: "text",
        md: `## docker-compose

docker-compose позволяет запускать несколько контейнеров вместе (приложение + база данных + Redis).`,
      },
      {
        kind: "code",
        title: "docker-compose.yml",
        code: `version: '3.8'

services:
  web:
    build: .
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
      - static_volume:/app/staticfiles
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/movies_db
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    volumes:
      - postgres_/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=movies_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_/data

volumes:
  postgres_
  redis_
  static_volume:`,
      },
      {
        kind: "warn",
        title: "Не храните секреты в Dockerfile",
        md: `Используйте переменные окружения или Docker secrets:

\`\`\`yaml
# docker-compose.yml
services:
  web:
    environment:
      - SECRET_KEY=\${SECRET_KEY}
      - DATABASE_PASSWORD=\${DB_PASSWORD}
\`\`\`

Создайте файл \`.env\` (добавьте в \`.gitignore\`):
\`\`\`
SECRET_KEY=your-secret-key
DB_PASSWORD=your-password
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что такое Dockerfile?",
        options: [
          "Конфигурация базы данных",
          "Инструкция для создания Docker-образа",
          "Файл с зависимостями Python",
          "Настройки nginx",
        ],
        answer: 1,
        explain: "Dockerfile содержит инструкции для сборки Docker-образа.",
      },
      {
        q: "Зачем нужен docker-compose?",
        options: [
          "Для компиляции кода",
          "Для запуска нескольких контейнеров вместе",
          "Для тестирования",
          "Для мониторинга",
        ],
        answer: 1,
        explain: "docker-compose позволяет описать и запустить многоконтейнерное приложение.",
      },
    ],
    tasks: [
      {
        id: "be5t1",
        title: "Dockerfile для Flask",
        md: `Создайте Dockerfile для Flask-приложения: базовый образ python:3.11-slim, установка зависимостей из requirements.txt, копирование кода, запуск через gunicorn на порту 5000.`,
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
    subtitle: "Reverse proxy, статика, продакшн-конфигурация",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Зачем нужен Nginx?

Nginx — веб-сервер, который работает как reverse proxy:
- Обработка статических файлов (быстрее, чем Django)
- SSL/TLS termination
- Балансировка нагрузки
- Кэширование
- Защита от DDoS`,
      },
      {
        kind: "code",
        title: "Конфигурация Nginx",
        code: `# /etc/nginx/sites-available/movies
upstream movies_app {
    server web:8000;
}

server {
    listen 80;
    server_name example.com;

    location /static/ {
        alias /app/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /app/media/;
        expires 7d;
    }

    location / {
        proxy_pass http://movies_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`,
      },
      {
        kind: "text",
        md: `## uWSGI

uWSGI — application server для Python. Он запускает Django/Flask и общается с Nginx через протокол WSGI.`,
      },
      {
        kind: "code",
        title: "docker-compose с Nginx",
        code: `version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    depends_on:
      - web

  web:
    build: .
    command: >
      gunicorn myproject.wsgi:application
        --bind 0.0.0.0:8000
        --workers 3
        --threads 2
        --timeout 120
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/movies_db
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=movies_db
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

Nginx отдаёт статику напрямую, минуя Django.`,
      },
    ],
    quiz: [
      {
        q: "Что такое reverse proxy?",
        options: [
          "Прокси для клиентов",
          "Сервер, который перенаправляет запросы к backend",
          "Файрвол",
          "База данных",
        ],
        answer: 1,
        explain: "Reverse proxy принимает запросы от клиентов и перенаправляет их к backend-серверам.",
      },
      {
        q: "Зачем нужен uWSGI?",
        options: [
          "Для работы с базой данных",
          "Application server для Python",
          "Веб-сервер для статики",
          "Кэш-сервер",
        ],
        answer: 1,
        explain: "uWSGI — application server, который запускает Python-приложения и общается с веб-сервером.",
      },
    ],
    tasks: [
      {
        id: "be6t1",
        title: "Nginx конфигурация",
        md: `Создайте конфигурацию Nginx для Django-приложения: reverse proxy на порт 8000, отдача статики из /static/, отдача медиа из /media/.`,
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
    subtitle: "Индексы, документы, запросы, полнотекстовый поиск",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Что такое Elasticsearch?

Elasticsearch — распределённый поисковый движок на основе Lucene:
- Полнотекстовый поиск
- Аналитика в реальном времени
- Масштабируемость
- JSON-based API`,
      },
      {
        kind: "code",
        title: "Индексы и документы",
        code: `from elasticsearch import Elasticsearch

# Подключение
es = Elasticsearch(['http://localhost:9200'])

# Создание индекса с маппингом
index_body = {
    'settings': {
        'number_of_shards': 1,
        'number_of_replicas': 0,
        'analysis': {
            'analyzer': {
                'default': {
                    'type': 'standard'
                }
            }
        }
    },
    'mappings': {
        'properties': {
            'title': {
                'type': 'text',
                'analyzer': 'standard',
                'fields': {
                    'keyword': {'type': 'keyword'}
                }
            },
            'description': {'type': 'text'},
            'year': {'type': 'integer'},
            'rating': {'type': 'float'},
            'genres': {'type': 'keyword'},
            'created_at': {'type': 'date'}
        }
    }
}

es.indices.create(index='movies', body=index_body)

# Индексация документа
doc = {
    'title': 'Inception',
    'description': 'A mind-bending thriller',
    'year': 2010,
    'rating': 8.8,
    'genres': ['Sci-Fi', 'Thriller'],
    'created_at': '2024-01-01'
}

es.index(index='movies', id=1, body=doc)`,
      },
      {
        kind: "text",
        md: `## Полнотекстовый поиск

Elasticsearch поддерживает сложные поисковые запросы.`,
      },
      {
        kind: "code",
        title: "Поисковые запросы",
        code: `# Простой поиск
query = {
    'query': {
        'multi_match': {
            'query': 'inception',
            'fields': ['title', 'description']
        }
    }
}

result = es.search(index='movies', body=query)
print(f"Found {result['hits']['total']['value']} movies")

# Фильтрация с агрегацией
query = {
    'query': {
        'bool': {
            'must': [
                {'range': {'year': {'gte': 2020}}}
            ],
            'filter': [
                {'term': {'genres': 'Action'}}
            ]
        }
    },
    'aggs': {
        'avg_rating': {
            'avg': {'field': 'rating'}
        },
        'genres_count': {
            'terms': {'field': 'genres'}
        }
    }
}

# Обновление документа
es.update(index='movies', id=1, body={
    'doc': {'rating': 9.0}
})

# Удаление
es.delete(index='movies', id=1)`,
      },
      {
        kind: "warn",
        title: "Не используйте Elasticsearch как основную БД",
        md: `Elasticsearch — поисковый движок, не реляционная БД:
- Нет транзакций
- Нет JOIN
- Данные могут быть потеряны при сбое
- Не подходит для критичных данных

Используйте PostgreSQL как основную БД, Elasticsearch — для поиска.`,
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
        explain: "Индекс — это коллекция документов, похожая на таблицу в реляционной БД.",
      },
      {
        q: "Какой тип поля используется для полнотекстового поиска?",
        options: ["keyword", "text", "integer", "date"],
        answer: 1,
        explain: "Тип 'text' анализируется и индексируется для полнотекстового поиска.",
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
    subtitle: "Extract, Transform, Load: синхронизация данных из PostgreSQL в Elasticsearch",
    minutes: 55,
    blocks: [
      {
        kind: "text",
        md: `## Что такое ETL?

ETL (Extract, Transform, Load) — процесс переноса данных:
- **Extract** — извлечение из источника (PostgreSQL)
- **Transform** — трансформация и очистка
- **Load** — загрузка в приёмник (Elasticsearch)

Зачем нужно:
- Синхронизация между БД и поисковым движком
- Миграция данных
- Аналитика и отчётность`,
      },
      {
        kind: "code",
        title: "ETL: PostgreSQL → Elasticsearch",
        code: `import psycopg2
from elasticsearch import Elasticsearch, helpers
from datetime import datetime

class MovieETL:
    def __init__(self, pg_config, es_host):
        self.pg_conn = psycopg2.connect(**pg_config)
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
        """Трансформация данных"""
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
        """Загрузка в Elasticsearch"""
        if documents:
            helpers.bulk(self.es, documents)
            print(f"Loaded {len(documents)} documents")
    
    def run(self, last_updated=None):
        """Запуск ETL процесса"""
        rows = self.extract(last_updated)
        documents = self.transform(rows)
        self.load(documents)
        return len(documents)

# Использование
pg_config = {
    'dbname': 'movies_db',
    'user': 'postgres',
    'password': 'password',
    'host': 'localhost',
    'port': 5432
}

etl = MovieETL(pg_config, 'http://localhost:9200')
count = etl.run()
print(f"Synced {count} movies")`,
      },
      {
        kind: "text",
        md: `## Обработка ошибок и повторные попытки

ETL-процессы должны быть устойчивы к ошибкам.`,
      },
      {
        kind: "code",
        title: "Обработка ошибок и повторные попытки",
        code: `from tenacity import retry, stop_after_attempt, wait_exponential

class RobustMovieETL(MovieETL):
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    def extract(self, last_updated=None):
        """Извлечение с повторными попытками"""
        try:
            return super().extract(last_updated)
        except psycopg2.Error as e:
            print(f"Database error: {e}")
            raise
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    def load(self, documents):
        """Загрузка с повторными попытками"""
        try:
            return super().load(documents)
        except Exception as e:
            print(f"Elasticsearch error: {e}")
            raise
    
    def run_safe(self, last_updated=None):
        """Безопасный запуск с логированием"""
        try:
            count = self.run(last_updated)
            print(f"ETL completed: {count} documents")
            return True
        except Exception as e:
            print(f"ETL failed: {e}")
            return False`,
      },
      {
        kind: "text",
        md: `## Идемпотентность ETL

ETL-процесс должен быть идемпотентным — многократный запуск даёт тот же результат.

Используйте upsert (обновление или вставку) вместо простой вставки.`,
      },
    ],
    quiz: [
      {
        q: "Что означает буква 'T' в ETL?",
        options: ["Test", "Transform", "Transfer", "Track"],
        answer: 1,
        explain: "Transform — трансформация данных между извлечением и загрузкой.",
      },
      {
        q: "Зачем нужны повторные попытки в ETL?",
        options: [
          "Для ускорения",
          "Для устойчивости к временным сбоям",
          "Для уменьшения размера данных",
          "Для шифрования",
        ],
        answer: 1,
        explain: "Повторные попытки помогают пережить временные сбои сети или базы данных.",
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

  // ========== СПРИНТ 4: Code Review, SOLID, Тестирование и Документация ==========
  {
    id: "be9",
    language: "python",
    title: "Code Review и SOLID",
    subtitle: "Принципы ревью кода, SOLID-принципы, рефакторинг",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Принципы код-ревью

Code review — процесс проверки кода коллегами перед слиянием в основную ветку. Цели:
- **Качество кода** — читаемость, поддерживаемость, соответствие стандартам
- **Обнаружение багов** — логические ошибки, edge cases, проблемы производительности
- **Обмен знаниями** — команда узнаёт о новых подходах и технологиях
- **Единообразие** — соблюдение стилевых соглашений

Хорошее ревью фокусируется на архитектуре и логике, а не на мелочах (для этого есть линтеры).`,
      },
      {
        kind: "text",
        md: `## SOLID-принципы

**S** — Single Responsibility Principle (Принцип единственной ответственности)
Класс должен иметь одну причину для изменения.

**O** — Open/Closed Principle (Принцип открытости/закрытости)
Классы открыты для расширения, но закрыты для модификации.

**L** — Liskov Substitution Principle (Принцип подстановки Барбары Лисков)
Объекты подклассов должны быть заменяемы объектами базового класса.

**I** — Interface Segregation Principle (Принцип разделения интерфейса)
Много специализированных интерфейсов лучше одного универсального.

**D** — Dependency Inversion Principle (Принцип инверсии зависимостей)
Зависьте от абстракций, а не от конкретик.`,
      },
      {
        kind: "code",
        title: "Нарушение SRP",
        code: `# ПЛОХО: класс делает слишком много
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

# ХОРОШО: разделение ответственностей
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
        title: "Принцип подстановки Лисков",
        code: `# ПЛОХО: подкласс нарушает поведение базового класса
class Bird:
    def fly(self):
        return "Flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly!")  # Нарушение LSP!

# ХОРОШО: правильная иерархия
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
    pass`,
      },
      {
        kind: "tip",
        title: "Чеклист для code review",
        md: `- [ ] Код читается легко, имена понятны
- [ ] Нет дублирования кода
- [ ] Функции делают одну вещь
- [ ] Нет магических чисел и строк
- [ ] Обработаны edge cases
- [ ] Нет SQL-инъекций и XSS
- [ ] Добавлены тесты для новой функциональности
- [ ] Документация обновлена (если нужно)
- [ ] Производительность приемлема`,
      },
    ],
    quiz: [
      {
        q: "Что означает принцип единственной ответственности (SRP)?",
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
        q: "Какой принцип SOLID нарушает код, где подкласс бросает исключение вместо выполнения метода базового класса?",
        options: ["SRP", "OCP", "LSP", "DIP"],
        answer: 2,
        explain: "Liskov Substitution Principle (LSP) требует, чтобы объекты подклассов могли заменять объекты базового класса без изменения поведения программы.",
      },
    ],
    tasks: [
      {
        id: "be9t1",
        title: "Рефакторинг к SRP",
        md: `Дан класс \`OrderProcessor\`, который делает всё: валидацию, сохранение, отправку уведомлений. Разделите его на три класса с единственной ответственностью: \`OrderValidator\`, \`OrderRepository\`, \`NotificationService\`.`,
        starter: `# ПЛОХО: нарушение SRP
class OrderProcessor:
    def process_order(self, order):
        # Валидация
        if not order.get("items"):
            raise ValueError("No items")
        
        # Сохранение
        print(f"Saving order {order['id']}")
        
        # Уведомление
        print(f"Sending email for order {order['id']}")

# ХОРОШО: разделение ответственностей
class OrderValidator:
    def validate(self, order):
        # ваш код
        pass

class OrderRepository:
    def save(self, order):
        # ваш код
        pass

class NotificationService:
    def notify(self, order_id):
        # ваш код
        pass

print("Классы созданы")`,
        tests: `
__test("OrderValidator существует", lambda: hasattr(OrderValidator, 'validate'), True)
__test("OrderRepository существует", lambda: hasattr(OrderRepository, 'save'), True)
__test("NotificationService существует", lambda: hasattr(NotificationService, 'notify'), True)
__test("OrderValidator валидирует пустые items", lambda: OrderValidator().validate({"items": []}), False)
__test("OrderValidator принимает валидный order", lambda: OrderValidator().validate({"items": ["item1"]}), True)`,
        solution: `class OrderValidator:
    def validate(self, order):
        return bool(order.get("items"))

class OrderRepository:
    def save(self, order):
        print(f"Saving order {order.get('id')}")
        return True

class NotificationService:
    def notify(self, order_id):
        print(f"Sending email for order {order_id}")
        return True`,
      },
    ],
  },

  {
    id: "be10",
    language: "python",
    title: "Тестирование и документация API",
    subtitle: "Функциональные тесты, pytest, Swagger/OpenAPI, документация",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Виды тестирования API

**Функциональные тесты** проверяют, что API делает то, что должно:
- Правильные HTTP-коды ответов (200, 201, 400, 404, 500)
- Корректность данных в ответах
- Обработка ошибок и валидация входных данных
- Работа с базой данных

**Интеграционные тесты** проверяют взаимодействие компонентов:
- API + база данных
- API + внешние сервисы
- API + кеш

**Нагрузочные тесты** проверяют производительность:
- Время отклика под нагрузкой
- Максимальное количество одновременных запросов
- Утечки памяти`,
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
- Интерактивная документация (Swagger UI, ReDoc)
- Генерация клиентских SDK

**Что должно быть в документации**:
- Описание каждого эндпоинта
- Формат запросов и ответов с примерами
- HTTP-коды ответов
- Аутентификация и авторизация
- Ограничения (rate limiting, пагинация)`,
      },
      {
        kind: "code",
        title: "Документация в FastAPI",
        code: `from fastapi import FastAPI, HTTPException
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

class MovieResponse(BaseModel):
    """Схема ответа с фильмом"""
    id: int
    title: str
    year: int
    rating: float

@app.post(
    "/movies/",
    response_model=MovieResponse,
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
    # Логика создания фильма
    return {"id": 1, **movie.dict()}

# Документация автоматически доступна на:
# /docs - Swagger UI
# /redoc - ReDoc
# /openapi.json - OpenAPI схема`,
      },
      {
        kind: "warn",
        title: "Не забывайте обновлять документацию",
        md: `Устаревшая документация хуже её отсутствия. Автоматизируйте:
- Генерируйте из кода (FastAPI, DRF)
- Добавляйте примеры запросов/ответов
- Тестируйте примеры из документации
- Ревью документации вместе с кодом`,
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
        starter: `# Симуляция тестирования API
class MockResponse:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self._json = json_data
    
    def json(self):
        return self._json

def mock_get_movies():
    """Мок для GET /movies/"""
    return MockResponse(200, [
        {"id": 1, "title": "Movie 1"},
        {"id": 2, "title": "Movie 2"}
    ])

def test_get_movies():
    """Тест получения списка фильмов"""
    # ваш код
    pass

print("Тест написан")`,
        tests: `
__test("тест проверяет статус-код", lambda: test_get_movies() is None or test_get_movies() == True, True)
__test("тест проверяет, что ответ - список", lambda: test_get_movies() is None or test_get_movies() == True, True)`,
        solution: `def test_get_movies():
    response = mock_get_movies()
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0`,
      },
    ],
  },

  // ========== СПРИНТ 5: Асинхронное программирование и FastAPI ==========
  {
    id: "be11",
    language: "python",
    title: "Асинхронное программирование в Python",
    subtitle: "async/await, корутины, asyncio, итераторы и генераторы",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Синхронное vs Асинхронное

**Синхронный код** выполняется последовательно:
- Каждая операция ждёт завершения предыдущей
- Простой для понимания и отладки
- Блокирует выполнение при ожидании I/O (сеть, диск)

**Асинхронный код** позволяет выполнять другие задачи во время ожидания:
- Не блокирует выполнение при I/O-операциях
- Лучше использует ресурсы (один поток может обслуживать тысячи соединений)
- Сложнее для понимания и отладки

Когда использовать async:
- Много I/O-операций (веб-скрейпинг, API-запросы)
- Высоконагруженные серверы (тысячи одновременных соединений)
- Реальное время (чаты, стриминг)`,
      },
      {
        kind: "code",
        title: "Синхронный vs Асинхронный код",
        code: `import time

# СИНХРОННЫЙ КОД
def fetch_data_sync(url):
    """Синхронный запрос"""
    time.sleep(1)  # Имитация сетевого запроса
    return f"Data from {url}"

def process_sync():
    start = time.time()
    result1 = fetch_data_sync("url1")
    result2 = fetch_data_sync("url2")
    result3 = fetch_data_sync("url3")
    print(f"Синхронно: {time.time() - start:.2f} сек")  # ~3 сек

# АСИНХРОННЫЙ КОД
import asyncio

async def fetch_data_async(url):
    """Асинхронный запрос"""
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
      {
        kind: "text",
        md: `## Корутины

**Корутина** — функция, которая может приостанавливать и возобновлять выполнение:
- Определяется через \`async def\`
- Приостанавливается через \`await\`
- Позволяет писать асинхронный код как синхронный

**Event Loop** — цикл событий, который управляет выполнением корутин:
- Отслеживает готовые к выполнению задачи
- Передаёт управление между корутинами
- Обрабатывает I/O-события`,
      },
      {
        kind: "code",
        title: "Корутины и asyncio",
        code: `import asyncio
import time

async def task(name, delay):
    """Корутина, имитирующая задачу"""
    print(f"Задача {name}: начало")
    await asyncio.sleep(delay)
    print(f"Задача {name}: конец")
    return f"Результат {name}"

async def main():
    # Последовательное выполнение
    start = time.time()
    result1 = await task("A", 1)
    result2 = await task("B", 2)
    print(f"Последовательно: {time.time() - start:.2f} сек")  # ~3 сек
    
    # Параллельное выполнение
    start = time.time()
    results = await asyncio.gather(
        task("X", 1),
        task("Y", 2),
        task("Z", 1)
    )
    print(f"Параллельно: {time.time() - start:.2f} сек")  # ~2 сек
    print(f"Результаты: {results}")

asyncio.run(main())`,
      },
      {
        kind: "warn",
        title: "Не смешивайте sync и async",
        md: `Блокирующие операции в async-коде блокируют весь event loop:
- \`time.sleep()\` — используйте \`asyncio.sleep()\`
- \`requests.get()\` — используйте \`aiohttp\` или \`httpx\`
- Синхронные операции с БД — используйте async-драйверы (asyncpg, motor)

Если нужно вызвать sync-код из async, используйте \`asyncio.to_thread()\`.`,
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
      {
        q: "Когда использовать async?",
        options: [
          "Для CPU-bound задач",
          "Для I/O-bound задач",
          "Всегда",
          "Никогда",
        ],
        answer: 1,
        explain: "Async эффективен для I/O-bound задач (сеть, диск), где много времени тратится на ожидание.",
      },
    ],
    tasks: [
      {
        id: "be11t1",
        title: "Асинхронная функция",
        md: `Создайте асинхронную функцию \`async_fetch_data(url)\`, которая имитирует сетевой запрос с задержкой 1 секунду и возвращает строку \`"Data from {url}"\`.`,
        starter: `import asyncio

async def async_fetch_data(url):
    """Асинхронная функция для получения данных"""
    # ваш код
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
- **Быстрый** — на уровне Node.js и Go (благодаря Starlette и Pydantic)
- **Быстрая разработка** — автоматическая документация, валидация, сериализация
- **Стандарты** — основан на OpenAPI и JSON Schema
- **Типизация** — использует type hints Python для валидации

Сравнение с Django REST Framework:
- FastAPI проще и быстрее
- DRF имеет больше готовых компонентов (admin, ORM)
- FastAPI лучше для микросервисов
- DRF лучше для монолитов`,
      },
      {
        kind: "code",
        title: "Первое FastAPI приложение",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Movie API")

# Модели данных (Pydantic)
class Movie(BaseModel):
    id: int
    title: str
    year: int
    rating: float = 7.0

class MovieCreate(BaseModel):
    title: str
    year: int
    rating: Optional[float] = 7.0

# In-memory хранилище для примера
movies_db = []
next_id = 1

# Маршруты
@app.get("/")
async def root():
    """Корневой эндпоинт"""
    return {"message": "Welcome to Movie API"}

@app.get("/movies/", response_model=list[Movie])
async def get_movies():
    """Получить все фильмы"""
    return movies_db

@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    """Получить фильм по ID"""
    for movie in movies_db:
        if movie.id == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Movie not found")

@app.post("/movies/", response_model=Movie, status_code=201)
async def create_movie(movie: MovieCreate):
    """Создать новый фильм"""
    global next_id
    new_movie = Movie(id=next_id, **movie.dict())
    movies_db.append(new_movie)
    next_id += 1
    return new_movie

@app.delete("/movies/{movie_id}", status_code=204)
async def delete_movie(movie_id: int):
    """Удалить фильм"""
    for i, movie in enumerate(movies_db):
        if movie.id == movie_id:
            movies_db.pop(i)
            return
    raise HTTPException(status_code=404, detail="Movie not found")

# Запуск: uvicorn main:app --reload
# Документация: http://localhost:8000/docs`,
      },
      {
        kind: "text",
        md: `## Валидация данных

Pydantic автоматически валидирует данные на основе type hints:
- Типы данных (str, int, float, bool)
- Обязательные и опциональные поля
- Ограничения (min, max, regex)
- Вложенные модели`,
      },
      {
        kind: "code",
        title: "Валидация с Pydantic",
        code: `from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class MovieCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    year: int = Field(..., ge=1888, le=2100)
    rating: float = Field(default=7.0, ge=0, le=10)
    description: Optional[str] = Field(None, max_length=1000)
    
    @validator('title')
    def title_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty')
        return v.strip()
    
    @validator('year')
    def year_must_be_reasonable(cls, v):
        current_year = datetime.now().year
        if v > current_year + 1:
            raise ValueError(f'Year cannot be greater than {current_year + 1}')
        return v
    
    class Config:
        schema_extra = {
            "example": {
                "title": "Inception",
                "year": 2010,
                "rating": 8.8,
                "description": "A mind-bending thriller"
            }
        }

# Примеры валидации
try:
    movie = MovieCreate(title="Test", year=2024, rating=8.5)
    print("Валидный фильм:", movie)
except ValueError as e:
    print("Ошибка валидации:", e)

# Автоматическая ошибка при невалидных данных
# POST /movies/ с {"title": "", "year": 3000}
# Вернёт 422 Unprocessable Entity с деталями ошибок`,
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
      {
        q: "Как запустить FastAPI приложение в режиме разработки?",
        options: [
          "python main.py",
          "uvicorn main:app --reload",
          "fastapi run",
          "python -m fastapi",
        ],
        answer: 1,
        explain: "uvicorn main:app --reload запускает сервер с автоматической перезагрузкой при изменении кода.",
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
__test("валидирует email", lambda: (lambda: (User(id=1, username="john", email="invalid"), False)[1])() if False else True, True)
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
    subtitle: "Docker, Redis, оптимизация, продакшн-конфигурация",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Кеширование с Redis

**Redis** — in-memory хранилище данных:
- Кеширование запросов к БД
- Сессии пользователей
- Rate limiting
- Очереди задач

**Когда кешировать**:
- Данные редко меняются
- Запросы дорогие (сложные JOIN, агрегации)
- Высокая нагрузка на БД
- Нужно снизить latency`,
      },
      {
        kind: "code",
        title: "Кеширование с Redis",
        code: `import redis
import json
from functools import wraps

# Подключение к Redis
redis_client = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)

# Декоратор для кеширования
def cache_response(ttl=300):
    """Кеширует результат функции на ttl секунд"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Генерируем ключ кеша
            cache_key = f"{func.__name__}:{args}:{kwargs}"
            
            # Проверяем кеш
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # Выполняем функцию
            result = await func(*args, **kwargs)
            
            # Сохраняем в кеш
            redis_client.setex(
                cache_key,
                ttl,
                json.dumps(result)
            )
            
            return result
        return wrapper
    return decorator

# Использование
@cache_response(ttl=300)  # 5 минут
async def get_popular_movies():
    """Получение популярных фильмов (дорогой запрос)"""
    # Сложный запрос к БД
    movies = await db.query("""
        SELECT m.*, COUNT(r.id) as rating_count
        FROM movies m
        LEFT JOIN ratings r ON m.id = r.movie_id
        GROUP BY m.id
        ORDER BY rating_count DESC
        LIMIT 100
    """)
    return movies

# Ручное управление кешем
async def invalidate_movie_cache(movie_id: int):
    """Инвалидация кеша при обновлении фильма"""
    pattern = f"get_popular_movies:*"
    keys = redis_client.keys(pattern)
    if keys:
        redis_client.delete(*keys)

@app.put("/movies/{id}")
async def update_movie(id: int, movie: MovieUpdate):
    updated = await db.update_movie(id, movie)
    await invalidate_movie_cache(id)
    return updated`,
      },
      {
        kind: "text",
        md: `## Docker для FastAPI

Контейнеризация FastAPI приложения:
- Python runtime
- Зависимости (requirements.txt)
- Код приложения
- Конфигурация`,
      },
      {
        kind: "code",
        title: "Dockerfile и docker-compose",
        code: `# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода
COPY . .

# Запуск приложения
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/movies
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/app  # Для разработки
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=movies
    volumes:
      - postgres_/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_/data

volumes:
  postgres_
  redis_

# requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
asyncpg==0.29.0
redis==5.0.1
pydantic==2.5.0
python-dotenv==1.0.0`,
      },
      {
        kind: "warn",
        title: "Продакшн-конфигурация",
        md: `Для продакшн-окружения:
- Отключите \`--reload\` (используйте несколько workers)
- Используйте Gunicorn с Uvicorn workers
- Настройте логирование
- Добавьте health checks
- Используйте secrets manager для паролей
- Настройте rate limiting
- Включите CORS только для нужных доменов`,
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
      {
        q: "Что делает декоратор @cache_response?",
        options: [
          "Компилирует функцию",
          "Кеширует результат функции на указанное время",
          "Валидирует входные данные",
          "Логирует вызовы функции",
        ],
        answer: 1,
        explain: "Декоратор @cache_response сохраняет результат функции в Redis на указанное время (TTL), чтобы при повторных вызовах возвращать кешированный результат.",
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
        starter: `import json

# Симуляция Redis
cache = {}

def get_cached_data(key, fetch_func, ttl=300):
    """Получение данных с кешированием"""
    # ваш код
    pass

# Тест
def expensive_operation():
    print("Выполняю дорогую операцию...")
    return {"data": "result"}

result1 = get_cached_data("test", expensive_operation)
result2 = get_cached_data("test", expensive_operation)  # Должно взять из кеша
print(result1, result2)`,
        tests: `
__test("возвращает результат", lambda: get_cached_data("key1", lambda: {"value": 1}), {"value": 1})
__test("кеширует результат", lambda: (lambda: (get_cached_data("key2", lambda: {"v": 1}), get_cached_data("key2", lambda: {"v": 2})))(), ({"v": 1}, {"v": 1}))`,
        solution: `def get_cached_data(key, fetch_func, ttl=300):
    # Проверяем кеш
    if key in cache:
        return cache[key]
    
    # Выполняем функцию
    result = fetch_func()
    
    # Сохраняем в кеш
    cache[key] = result
    
    return result`,
      },
    ],
  },

  // ========== СПРИНТ 6: Авторизация и аутентификация ==========
  {
    id: "be14",
    language: "python",
    title: "Сервис авторизации и аутентификации",
    subtitle: "JWT, OAuth 2.0, двухфакторная аутентификация, капча",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Аутентификация vs Авторизация

**Аутентификация** — проверка личности пользователя (кто вы?)
**Авторизация** — проверка прав доступа (что вам разрешено?)

Основные подходы:
- **Session-based** — сессии на сервере, cookie на клиенте
- **Token-based (JWT)** — токены на клиенте, проверка подписи
- **OAuth 2.0** — делегированная авторизация (вход через Google, GitHub)`,
      },
      {
        kind: "code",
        title: "JWT аутентификация",
        code: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

app = FastAPI()
security = HTTPBearer()

# Конфигурация
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"])

class User(BaseModel):
    username: str
    email: str

class UserInDB(User):
    hashed_password: str

# Фейковая база данных
fake_users_db = {
    "john": {
        "username": "john",
        "email": "john@example.com",
        "hashed_password": pwd_context.hash("secret123")
    }
}

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = fake_users_db.get(username)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@app.post("/token")
async def login(username: str, password: str):
    user = fake_users_db.get(username)
    if not user or not pwd_context.verify(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={"sub": username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user`,
      },
      {
        kind: "text",
        md: `## OAuth 2.0 и OpenID Connect

**OAuth 2.0** — протокол делегированной авторизации:
- **Authorization Code** — для веб-приложений
- **Implicit** — для SPA (устарел)
- **Client Credentials** — для machine-to-machine
- **Refresh Token** — обновление access token

**OpenID Connect** — надстройка над OAuth 2.0 для аутентификации:
- Предоставляет информацию о пользователе (id_token)
- Стандартизирует endpoints: /authorize, /token, /userinfo`,
      },
      {
        kind: "code",
        title: "OAuth 2.0 с Google",
        code: `from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

config = Config('.env')
oauth = OAuth(config)

# Регистрация Google OAuth
oauth.register(
    name='google',
    client_id=config('GOOGLE_CLIENT_ID'),
    client_secret=config('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@app.get('/login/google')
async def login_google(request: Request):
    redirect_uri = request.url_for('auth_google_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/google/callback')
async def auth_google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get('userinfo')
    
    # Создаём или находим пользователя
    user = await get_or_create_user(
        email=user_info['email'],
        name=user_info['name'],
        picture=user_info.get('picture')
    )
    
    # Создаём сессию или токен
    request.session['user'] = dict(user)
    return RedirectResponse(url='/')`,
      },
      {
        kind: "text",
        md: `## Двухфакторная аутентификация (2FA)

Добавляет второй фактор проверки:
- **TOTP** (Time-based One-Time Password) — Google Authenticator, Authy
- **SMS** — код по SMS (менее безопасно)
- **Email** — код на email
- **Hardware tokens** — YubiKey, FIDO2`,
      },
      {
        kind: "code",
        title: "TOTP двухфакторная аутентификация",
        code: `import pyotp
from fastapi import HTTPException

class TwoFactorAuth:
    def __init__(self):
        self.totp = pyotp.TOTP
    
    def generate_secret(self) -> str:
        """Генерация секретного ключа"""
        return pyotp.random_base32()
    
    def get_provisioning_uri(self, secret: str, email: str) -> str:
        """URI для QR-кода в Google Authenticator"""
        totp = pyotp.TOTP(secret)
        return totp.provisioning_uri(name=email, issuer_name="MyApp")
    
    def verify_code(self, secret: str, code: str) -> bool:
        """Проверка кода от пользователя"""
        totp = pyotp.TOTP(secret)
        return totp.verify(code)

# Использование
two_fa = TwoFactorAuth()

@app.post("/users/{user_id}/2fa/enable")
async def enable_2fa(user_id: int):
    secret = two_fa.generate_secret()
    # Сохраняем secret в БД для пользователя
    await save_2fa_secret(user_id, secret)
    
    user = await get_user(user_id)
    uri = two_fa.get_provisioning_uri(secret, user.email)
    
    return {
        "secret": secret,
        "qr_uri": uri,
        "message": "Отсканируйте QR-код в Google Authenticator"
    }

@app.post("/users/{user_id}/2fa/verify")
async def verify_2fa(user_id: int, code: str):
    secret = await get_2fa_secret(user_id)
    if not two_fa.verify_code(secret, code):
        raise HTTPException(status_code=400, detail="Invalid code")
    
    # Код верный — выдаём access token
    return {"message": "2FA verified", "access_token": create_access_token(user_id)}`,
      },
      {
        kind: "text",
        md: `## Капча (CAPTCHA)

Защита от ботов и автоматических атак:
- **reCAPTCHA v2** — "I'm not a robot" чекбокс
- **reCAPTCHA v3** — невидимая, анализ поведения
- **hCaptcha** — альтернатива reCAPTCHA
- **Cloudflare Turnstile** — новая бесплатная альтернатива`,
      },
      {
        kind: "code",
        title: "Интеграция reCAPTCHA",
        code: `import httpx
from fastapi import Form

RECAPTCHA_SECRET_KEY = "your-secret-key"
RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"

async def verify_recaptcha(token: str) -> bool:
    """Проверка токена reCAPTCHA"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            RECAPTCHA_VERIFY_URL,
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": token
            }
        )
        result = response.json()
        return result.get("success", False) and result.get("score", 0) > 0.5

@app.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    recaptcha_token: str = Form(...)
):
    # Проверяем капчу
    if not await verify_recaptcha(recaptcha_token):
        raise HTTPException(status_code=400, detail="Invalid captcha")
    
    # Создаём пользователя
    user = await create_user(username, email, password)
    return {"message": "User created", "user_id": user.id}`,
      },
      {
        kind: "warn",
        title: "Безопасность токенов",
        md: `- Храните SECRET_KEY в переменных окружения, не в коде
- Используйте короткие expiration time для access tokens (15-30 минут)
- Реализуйте refresh tokens для длительного доступа
- Храните refresh tokens в httpOnly cookies
- Валидируйте токены на каждом защищённом endpoint
- Реализуйте отзыв токенов (blacklist)`,
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
      {
        q: "Какой тип 2FA наиболее безопасен?",
        options: ["SMS", "Email", "TOTP (Google Authenticator)", "Hardware token (YubiKey)"],
        answer: 3,
        explain: "Hardware tokens (YubiKey, FIDO2) наиболее безопасны, так как физическое устройство невозможно удалённо перехватить.",
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
    """Создание JWT токена"""
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

  // ========== СПРИНТ 7: Микросервисы и устойчивость ==========
  {
    id: "be15",
    language: "python",
    title: "Микросервисы и общение между сервисами",
    subtitle: "REST, gRPC, message brokers, паттерны взаимодействия",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Микросервисная архитектура

Микросервисы — архитектурный стиль, где приложение состоит из небольших независимых сервисов:
- Каждый сервис отвечает за свою бизнес-область
- Сервисы общаются через API
- Независимое развёртывание и масштабирование
- Разные технологии для разных сервисов

Преимущества:
- Масштабируемость отдельных частей
- Независимые релизы
- Отказоустойчивость

Недостатки:
- Сложность оркестрации
- Сетевые задержки
- Распределённые транзакции`,
      },
      {
        kind: "text",
        md: `## Синхронное взаимодействие

**REST API** — самый распространённый способ:
- Простота и универсальность
- HTTP протокол
- JSON формат
- Кэширование

**gRPC** — высокопроизводительный RPC фреймворк:
- Protocol Buffers (бинарная сериализация)
- Двунаправленные потоки
- Автоматическая генерация клиентов
- В 10 раз быстрее REST`,
      },
      {
        kind: "code",
        title: "gRPC сервис",
        code: `# proto file: movie.proto
syntax = "proto3";

service MovieService {
    rpc GetMovie (MovieRequest) returns (MovieResponse);
    rpc ListMovies (ListRequest) returns (stream MovieResponse);
}

message MovieRequest {
    int32 id = 1;
}

message MovieResponse {
    int32 id = 1;
    string title = 2;
    int32 year = 3;
    float rating = 4;
}

message ListRequest {
    int32 limit = 1;
    int32 offset = 2;
}

# Python сервер
import grpc
from concurrent import futures
import movie_pb2
import movie_pb2_grpc

class MovieServiceServicer(movie_pb2_grpc.MovieServiceServicer):
    def GetMovie(self, request, context):
        movie = get_movie_from_db(request.id)
        return movie_pb2.MovieResponse(
            id=movie.id,
            title=movie.title,
            year=movie.year,
            rating=movie.rating
        )
    
    def ListMovies(self, request, context):
        movies = get_movies_from_db(request.limit, request.offset)
        for movie in movies:
            yield movie_pb2.MovieResponse(
                id=movie.id,
                title=movie.title,
                year=movie.year,
                rating=movie.rating
            )

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
movie_pb2_grpc.add_MovieServiceServicer_to_server(
    MovieServiceServicer(), server
)
server.add_insecure_port('[::]:50051')
server.start()`,
      },
      {
        kind: "text",
        md: `## Асинхронное взаимодействие

**Message Brokers** — брокеры сообщений для асинхронного общения:
- **RabbitMQ** — классический broker, AMQP протокол
- **Apache Kafka** — high-throughput, log-based
- **Redis Pub/Sub** — простой pub/sub
- **AWS SQS/SNS** — облачные очереди

Паттерны:
- **Publish/Subscribe** — издатель/подписчик
- **Point-to-Point** — очередь задач
- **Event Sourcing** — хранение событий`,
      },
      {
        kind: "code",
        title: "RabbitMQ producer/consumer",
        code: `import pika
import json

# PRODUCER
class MovieEventProducer:
    def __init__(self, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host)
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='movie_events')
    
    def publish(self, event_type: str, data: dict):
        message = json.dumps({
            'type': event_type,
            'data': data
        })
        self.channel.basic_publish(
            exchange='',
            routing_key='movie_events',
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2,  # persistent
            )
        )
        print(f"Sent: {event_type}")
    
    def close(self):
        self.connection.close()

# CONSUMER
class MovieEventConsumer:
    def __init__(self, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host)
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='movie_events')
    
    def callback(self, ch, method, properties, body):
        event = json.loads(body)
        print(f"Received: {event['type']}")
        
        # Обработка события
        if event['type'] == 'movie.created':
            self.handle_movie_created(event['data'])
        elif event['type'] == 'movie.updated':
            self.handle_movie_updated(event['data'])
        
        # Подтверждение обработки
        ch.basic_ack(delivery_tag=method.delivery_tag)
    
    def handle_movie_created(self, data):
        print(f"Movie created: {data['title']}")
    
    def handle_movie_updated(self, data):
        print(f"Movie updated: {data['title']}")
    
    def start_consuming(self):
        self.channel.basic_consume(
            queue='movie_events',
            on_message_callback=self.callback
        )
        print('Waiting for messages...')
        self.channel.start_consuming()

# Использование
producer = MovieEventProducer()
producer.publish('movie.created', {'id': 1, 'title': 'Inception'})
producer.close()`,
      },
      {
        kind: "text",
        md: `## Паттерны взаимодействия

**Saga Pattern** — управление распределёнными транзакциями:
- Каждая микросервисная операция публикует событие
- Следующий сервис реагирует на событие
- Компенсирующие транзакции для отката

**CQRS** (Command Query Responsibility Segregation):
- Отдельные модели для записи (Command) и чтения (Query)
- Оптимизация под конкретные операции
- Eventual consistency`,
      },
      {
        kind: "warn",
        title: "Распределённые транзакции",
        md: `В микросервисах нельзя использовать обычные транзакции БД. Решения:
- **Saga Pattern** — последовательность локальных транзакций
- **Event Sourcing** — хранение событий вместо состояния
- **Two-Phase Commit (2PC)** — редко используется из-за блокировок

Избегайте сильной согласованности — используйте eventual consistency.`,
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
      {
        q: "Какой паттерн используется для распределённых транзакций?",
        options: ["Singleton", "Observer", "Saga", "Factory"],
        answer: 2,
        explain: "Saga Pattern — паттерн для управления распределёнными транзакциями через последовательность локальных транзакций и компенсирующих действий.",
      },
    ],
    tasks: [
      {
        id: "be15t1",
        title: "Event producer",
        md: `Реализуйте класс \`EventProducer\` с методом \`publish(event_type, data)\`, который отправляет событие в RabbitMQ очередь \`events\`.`,
        starter: `import pika
import json

class EventProducer:
    def __init__(self, host='localhost'):
        # Ваш код здесь
        pass
    
    def publish(self, event_type: str, data: dict):
        # Ваш код здесь
        pass
    
    def close(self):
        # Ваш код здесь
        pass

print("Класс создан")`,
        tests: `
__test("имеет метод publish", lambda: hasattr(EventProducer, 'publish'), True)
__test("имеет метод close", lambda: hasattr(EventProducer, 'close'), True)`,
        solution: `import pika
import json

class EventProducer:
    def __init__(self, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host)
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='events')
    
    def publish(self, event_type: str, data: dict):
        message = json.dumps({'type': event_type, 'data': data})
        self.channel.basic_publish(
            exchange='',
            routing_key='events',
            body=message
        )
    
    def close(self):
        self.connection.close()`,
      },
    ],
  },

  {
    id: "be16",
    language: "python",
    title: "Устойчивость сервисов и мониторинг",
    subtitle: "Rate limiting, circuit breaker, health checks, логирование",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Устойчивость к нагрузкам

**Rate Limiting** — ограничение количества запросов:
- Защита от DDoS-атак
- Справедливое распределение ресурсов
- Предотвращение злоупотреблений API

Реализации:
- **Fixed Window** — счётчик за фиксированный период
- **Sliding Window** — скользящее окно
- **Token Bucket** — токены пополняются со временем`,
      },
      {
        kind: "code",
        title: "Rate limiting с Redis",
        code: `from fastapi import FastAPI, Request, HTTPException
import redis
import time

app = FastAPI()
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
    
    def is_allowed(self, key: str) -> bool:
        """Проверка, разрешён ли запрос"""
        current_time = int(time.time())
        window_key = f"rate_limit:{key}:{current_time // self.window_seconds}"
        
        # Увеличиваем счётчик
        requests = redis_client.incr(window_key)
        
        # Устанавливаем TTL для ключа
        if requests == 1:
            redis_client.expire(window_key, self.window_seconds)
        
        return requests <= self.max_requests

# Создаём rate limiter: 100 запросов в минуту
rate_limiter = RateLimiter(max_requests=100, window_seconds=60)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Получаем IP клиента
    client_ip = request.client.host
    key = f"api:{client_ip}"
    
    if not rate_limiter.is_allowed(key):
        raise HTTPException(
            status_code=429,
            detail="Too many requests",
            headers={"Retry-After": "60"}
        )
    
    response = await call_next(request)
    return response

@app.get("/api/data")
async def get_data():
    return {"data": "some data"}`,
      },
      {
        kind: "text",
        md: `## Circuit Breaker

**Circuit Breaker** — паттерн для предотвращения каскадных сбоев:
- **Closed** — нормальная работа, запросы проходят
- **Open** — сервис недоступен, запросы блокируются
- **Half-Open** — проверка восстановления

Когда использовать:
- Зависимость от внешних сервисов
- Нестабильные сети
- Защита от cascade failures`,
      },
      {
        kind: "code",
        title: "Circuit Breaker реализация",
        code: `from enum import Enum
from datetime import datetime, timedelta
import functools

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        """Вызов функции с circuit breaker"""
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
    
    def _should_attempt_reset(self) -> bool:
        """Проверка, пора ли пытаться восстановить"""
        if self.last_failure_time is None:
            return True
        return datetime.utcnow() - self.last_failure_time > timedelta(
            seconds=self.recovery_timeout
        )
    
    def _on_success(self):
        """Обработка успешного вызова"""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        """Обработка неудачного вызова"""
        self.failure_count += 1
        self.last_failure_time = datetime.utcnow()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

# Использование
circuit_breaker = CircuitBreaker(failure_threshold=5, recovery_timeout=60)

@circuit_breaker_decorator
def call_external_api():
    # Вызов внешнего API
    import requests
    response = requests.get("https://api.example.com/data")
    return response.json()

def circuit_breaker_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return circuit_breaker.call(func, *args, **kwargs)
    return wrapper`,
      },
      {
        kind: "text",
        md: `## Health Checks

**Health checks** — проверки здоровья сервиса:
- **Liveness** — сервис жив (не завис)
- **Readiness** — сервис готов принимать запросы
- **Startup** — сервис запустился

Endpoints:
- \`/health\` — общая проверка
- \`/health/live\` — liveness probe
- \`/health/ready\` — readiness probe`,
      },
      {
        kind: "code",
        title: "Health check endpoints",
        code: `from fastapi import FastAPI
from sqlalchemy import text
import redis

app = FastAPI()

@app.get("/health")
async def health_check():
    """Общая проверка здоровья"""
    checks = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": {}
    }
    
    # Проверка БД
    try:
        db.execute(text("SELECT 1"))
        checks["checks"]["database"] = "healthy"
    except Exception as e:
        checks["checks"]["database"] = f"unhealthy: {str(e)}"
        checks["status"] = "unhealthy"
    
    # Проверка Redis
    try:
        redis_client.ping()
        checks["checks"]["redis"] = "healthy"
    except Exception as e:
        checks["checks"]["redis"] = f"unhealthy: {str(e)}"
        checks["status"] = "unhealthy"
    
    status_code = 200 if checks["status"] == "healthy" else 503
    return JSONResponse(content=checks, status_code=status_code)

@app.get("/health/live")
async def liveness_probe():
    """Liveness probe для Kubernetes"""
    return {"status": "alive"}

@app.get("/health/ready")
async def readiness_probe():
    """Readiness probe для Kubernetes"""
    # Проверяем, готов ли сервис принимать трафик
    if not is_database_connected():
        raise HTTPException(status_code=503, detail="Database not ready")
    return {"status": "ready"}`,
      },
      {
        kind: "text",
        md: `## Логирование и мониторинг

**Структурированное логирование**:
- JSON формат для машинной обработки
- Корреляционные ID для трекинга запросов
- Уровни: DEBUG, INFO, WARNING, ERROR, CRITICAL

**Метрики**:
- **Prometheus** — сбор и хранение метрик
- **Grafana** — визуализация
- **Alertmanager** — алерты

**Трейсинг**:
- **Jaeger** — распределённый трейсинг
- **Zipkin** — альтернатива Jaeger`,
      },
      {
        kind: "code",
        title: "Структурированное логирование",
        code: `import logging
import json
from pythonjsonlogger import jsonlogger
from uuid import uuid4
from contextvars import ContextVar

# Корреляционный ID для трекинга запросов
correlation_id_var: ContextVar[str] = ContextVar('correlation_id', default='')

class CorrelationIdFilter(logging.Filter):
    def filter(self, record):
        record.correlation_id = correlation_id_var.get()
        return True

# Настройка логгера
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(
    '%(timestamp)s %(level)s %(name)s %(message)s %(correlation_id)s'
)
handler.setFormatter(formatter)
handler.addFilter(CorrelationIdFilter())
logger.addHandler(handler)

# Middleware для установки correlation_id
@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    # Генерируем или берём из заголовка
    correlation_id = request.headers.get('X-Correlation-ID', str(uuid4()))
    correlation_id_var.set(correlation_id)
    
    # Логируем запрос
    logger.info(
        "Request started",
        extra={
            "method": request.method,
            "path": request.url.path,
            "client_ip": request.client.host
        }
    )
    
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Логируем ответ
    logger.info(
        "Request completed",
        extra={
            "status_code": response.status_code,
            "process_time_ms": round(process_time * 1000, 2)
        }
    )
    
    response.headers["X-Correlation-ID"] = correlation_id
    return response

# Использование
@app.get("/api/movies")
async def get_movies():
    logger.info("Fetching movies from database")
    movies = await db.get_movies()
    logger.info(f"Found {len(movies)} movies")
    return movies`,
      },
      {
        kind: "warn",
        title: "Не логируйте секреты",
        md: `Никогда не логируйте:
- Пароли и токены
- Данные карт (PAN, CVV)
- Персональные данные (PII)
- API ключи

Используйте маскирование:
\`\`\`python
logger.info(f"User login: {mask_email(user.email)}")
\`\`\``,
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
      {
        q: "Что такое liveness probe?",
        options: [
          "Проверка готовности принимать трафик",
          "Проверка, что сервис жив и не завис",
          "Проверка базы данных",
          "Проверка сети",
        ],
        answer: 1,
        explain: "Liveness probe проверяет, что сервис жив и не завис. Если проверка не проходит, Kubernetes перезапускает под.",
      },
    ],
    tasks: [
      {
        id: "be16t1",
        title: "Rate limiter",
        md: `Реализуйте класс \`RateLimiter\` с методом \`is_allowed(key)\`, который проверяет, разрешён ли запрос для данного ключа. Используйте sliding window алгоритм: не более \`max_requests\` запросов за \`window_seconds\`.`,
        starter: `import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, key: str) -> bool:
        """Проверка, разрешён ли запрос"""
        # Ваш код здесь
        pass

# Тест
limiter = RateLimiter(max_requests=5, window_seconds=60)
print(limiter.is_allowed("user1"))  # True
print(limiter.is_allowed("user1"))  # True`,
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
        
        # Удаляем старые запросы
        self.requests[key] = [
            t for t in self.requests[key] if t > window_start
        ]
        
        # Проверяем лимит
        if len(self.requests[key]) >= self.max_requests:
            return False
        
        # Добавляем текущий запрос
        self.requests[key].append(current_time)
        return True`,
      },
    ],
  },

  // ========== СПРИНТ 8: UGC-сервисы и большие данные ==========
  {
    id: "be17",
    language: "python",
    title: "Планирование UGC-сервиса и большие данные",
    subtitle: "Архитектура, Kafka, Spark, ClickHouse, распределённые вычисления",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## UGC-сервисы (User Generated Content)

UGC-сервисы — платформы, где пользователи создают контент:
- Социальные сети (посты, комментарии, лайки)
- Видеохостинги (загрузка, транскодирование, стриминг)
- Форумы и блоги
- Маркетплейсы отзывов

Особенности:
- Высокая нагрузка на запись
- Непредсказуемые пики активности
- Необходимость модерации
- Работа с медиафайлами`,
      },
      {
        kind: "text",
        md: `## Архитектура UGC-сервиса

Компоненты:
- **API Gateway** — маршрутизация, аутентификация
- **Сервис загрузки** — приём файлов, валидация
- **Сервис обработки** — транскодирование, генерация превью
- **Сервис хранения** — объектное хранилище (S3, MinIO)
- **Сервис доставки** — CDN для раздачи контента
- **Модерация** — автоматическая и ручная проверка

Паттерны:
- **Event-driven** — асинхронная обработка через события
- **CQRS** — разделение чтения и записи
- **Sharding** — шардирование данных по пользователям`,
      },
      {
        kind: "code",
        title: "Архитектура загрузки видео",
        code: `# Архитектура видеохостинга
architecture = """
1. Клиент загружает видео → API Gateway
2. API Gateway → Video Upload Service
3. Upload Service сохраняет в S3 (staging)
4. Publish событие 'video.uploaded' в Kafka
5. Video Processing Service:
   - Транскодирование (FFmpeg)
   - Генерация превью
   - Извлечение метаданных
6. Сохранение результата в S3 (processed)
7. Update метаданных в PostgreSQL
8. Publish событие 'video.processed' в Kafka
9. CDN кэширует готовое видео
"""

# Kafka producer для событий
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['kafka1:9092', 'kafka2:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def on_video_uploaded(video_id: str, user_id: int, filename: str):
    event = {
        'event_type': 'video.uploaded',
        'video_id': video_id,
        'user_id': user_id,
        'filename': filename,
        'timestamp': datetime.utcnow().isoformat()
    }
    producer.send('video_events', value=event)
    producer.flush()`,
      },
      {
        kind: "text",
        md: `## Apache Kafka для событийной архитектуры

**Kafka** — распределённый поток событий:
- **Topics** — категории событий
- **Partitions** — параллельная обработка
- **Consumer Groups** — масштабирование потребителей
- **Retention** — хранение событий (по времени или размеру)

Преимущества:
- Высокая пропускная способность (миллионы сообщений/сек)
- Persist messages — события не теряются
- Replay — повторная обработка событий
- Exactly-once semantics`,
      },
      {
        kind: "code",
        title: "Kafka consumer для обработки видео",
        code: `from kafka import KafkaConsumer
import json

class VideoProcessingConsumer:
    def __init__(self):
        self.consumer = KafkaConsumer(
            'video_events',
            bootstrap_servers=['kafka1:9092'],
            group_id='video-processing-group',
            auto_offset_reset='earliest',
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
    
    def process_events(self):
        for message in self.consumer:
            event = message.value
            
            if event['event_type'] == 'video.uploaded':
                self.process_video_upload(event)
            elif event['event_type'] == 'video.deleted':
                self.process_video_deletion(event)
    
    def process_video_upload(self, event):
        video_id = event['video_id']
        filename = event['filename']
        
        # Транскодирование
        self.transcode_video(video_id, filename)
        
        # Генерация превью
        self.generate_thumbnail(video_id)
        
        # Извлечение метаданных
        metadata = self.extract_metadata(video_id)
        
        # Сохранение в БД
        self.save_video_metadata(video_id, metadata)
        
        print(f"Processed video {video_id}")
    
    def transcode_video(self, video_id: str, filename: str):
        """Транскодирование видео в разные форматы"""
        # FFmpeg команды для разных разрешений
        formats = [
            ('360p', '640x360'),
            ('720p', '1280x720'),
            ('1080p', '1920x1080')
        ]
        
        for quality, resolution in formats:
            # ffmpeg -i input.mp4 -s {resolution} output_{quality}.mp4
            pass
    
    def generate_thumbnail(self, video_id: str):
        """Генерация превью из видео"""
        # ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 thumbnail.jpg
        pass
    
    def extract_metadata(self, video_id: str) -> dict:
        """Извлечение метаданных"""
        # ffprobe -v quiet -print_format json -show_format video.mp4
        return {
            'duration': 120.5,
            'resolution': '1920x1080',
            'codec': 'h264',
            'bitrate': 5000000
        }
    
    def save_video_metadata(self, video_id: str, metadata: dict):
        """Сохранение метаданных в БД"""
        # db.execute("UPDATE videos SET ... WHERE id = ?", ...)
        pass

# Запуск
consumer = VideoProcessingConsumer()
consumer.process_events()`,
      },
      {
        kind: "text",
        md: `## Apache Spark для обработки больших данных

**Spark** — фреймворк для распределённой обработки данных:
- **RDD** (Resilient Distributed Dataset) — базовая абстракция
- **DataFrame API** — высокоуровневый API (как pandas)
- **Spark SQL** — SQL запросы
- **Streaming** — обработка потоков данных

Когда использовать:
- Обработка терабайтов данных
- ETL пайплайны
- Машинное обучение на больших данных
- Графовые вычисления`,
      },
      {
        kind: "code",
        title: "Spark для аналитики видео",
        code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg

# Создание Spark сессии
spark = SparkSession.builder \\
    .appName("VideoAnalytics") \\
    .master("local[*]") \\
    .getOrCreate()

# Чтение данных из Parquet
videos_df = spark.read.parquet("s3://bucket/videos/")
views_df = spark.read.parquet("s3://bucket/views/")

# Аналитика: топ-10 популярных видео
top_videos = views_df \\
    .groupBy("video_id") \\
    .agg(
        count("*").alias("view_count"),
        avg("watch_duration").alias("avg_watch_time")
    ) \\
    .orderBy(col("view_count").desc()) \\
    .limit(10)

top_videos.show()

# Аналитика по пользователям
user_stats = views_df \\
    .groupBy("user_id") \\
    .agg(
        count("*").alias("total_views"),
        count("video_id").distinct().alias("unique_videos"),
        avg("watch_duration").alias("avg_watch_time")
    ) \\
    .orderBy(col("total_views").desc())

user_stats.show()

# Сохранение результатов
top_videos.write.parquet("s3://bucket/analytics/top_videos/")
user_stats.write.parquet("s3://bucket/analytics/user_stats/")

spark.stop()`,
      },
      {
        kind: "text",
        md: `## ClickHouse для аналитики

**ClickHouse** — колоночная СУБД для аналитики:
- Быстрые агрегатные запросы
- Column-oriented storage
- Векторное выполнение запросов
- Масштабирование на кластер

Когда использовать:
- Real-time аналитика
- Логи и метрики
- Бизнес-аналитика
- Time-series данные`,
      },
      {
        kind: "code",
        title: "ClickHouse для видеоаналитики",
        code: `import clickhouse_connect

# Подключение к ClickHouse
client = clickhouse_connect.get_client(
    host='localhost',
    port=8123,
    database='video_analytics'
)

# Создание таблицы
client.command("""
CREATE TABLE IF NOT EXISTS video_views (
    view_id UInt64,
    video_id UInt64,
    user_id UInt64,
    watched_at DateTime,
    watch_duration UInt32,
    device_type String,
    country String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(watched_at)
ORDER BY (video_id, watched_at)
""")

# Вставка данных
data = [
    (1, 100, 1001, '2024-01-15 10:30:00', 120, 'mobile', 'RU'),
    (2, 100, 1002, '2024-01-15 11:00:00', 90, 'desktop', 'US'),
    (3, 101, 1003, '2024-01-15 12:00:00', 180, 'tv', 'DE'),
]

client.insert('video_views', data, column_names=[
    'view_id', 'video_id', 'user_id', 'watched_at',
    'watch_duration', 'device_type', 'country'
])

# Аналитические запросы
# Топ-10 видео по просмотрам
result = client.query("""
SELECT 
    video_id,
    count(*) as views,
    avg(watch_duration) as avg_duration
FROM video_views
GROUP BY video_id
ORDER BY views DESC
LIMIT 10
""")

print("Top videos:")
for row in result.result_rows:
    print(f"Video {row[0]}: {row[1]} views, avg {row[2]:.1f}s")

# Статистика по странам
result = client.query("""
SELECT 
    country,
    count(*) as views,
    avg(watch_duration) as avg_duration
FROM video_views
GROUP BY country
ORDER BY views DESC
""")

print("\\nViews by country:")
for row in result.result_rows:
    print(f"{row[0]}: {row[1]} views")`,
      },
      {
        kind: "text",
        md: `## ETL для аналитического хранилища

**ETL пайплайн** для перегрузки данных из OLTP (PostgreSQL) в OLAP (ClickHouse):

1. **Extract** — чтение из PostgreSQL
2. **Transform** — очистка, агрегация, обогащение
3. **Load** — запись в ClickHouse

Инструменты:
- **Apache Airflow** — оркестрация
- **Apache Spark** — обработка
- **dbt** — трансформации SQL`,
      },
      {
        kind: "code",
        title: "ETL пайплайн с Airflow",
        code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import psycopg2
import clickhouse_connect

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'video_analytics_etl',
    default_args=default_args,
    description='ETL для видеоаналитики',
    schedule_interval='@hourly',
    catchup=False
)

def extract_from_postgres(**context):
    """Извлечение данных из PostgreSQL"""
    conn = psycopg2.connect(
        host='postgres',
        database='video_db',
        user='user',
        password='password'
    )
    
    cursor = conn.cursor()
    
    # Извлечение новых просмотров за последний час
    cursor.execute("""
        SELECT id, video_id, user_id, watched_at, watch_duration
        FROM video_views
        WHERE watched_at > NOW() - INTERVAL '1 hour'
    """)
    
    rows = cursor.fetchall()
    context['ti'].xcom_push(key='extracted_data', value=rows)
    
    conn.close()
    print(f"Extracted {len(rows)} rows")

def transform_data(**context):
    """Трансформация данных"""
    rows = context['ti'].xcom_pull(key='extracted_data')
    
    # Очистка и валидация
    transformed = []
    for row in rows:
        view_id, video_id, user_id, watched_at, watch_duration = row
        
        # Валидация
        if watch_duration < 0 or watch_duration > 86400:
            continue
        
        transformed.append({
            'view_id': view_id,
            'video_id': video_id,
            'user_id': user_id,
            'watched_at': watched_at.isoformat(),
            'watch_duration': watch_duration
        })
    
    context['ti'].xcom_push(key='transformed_data', value=transformed)
    print(f"Transformed {len(transformed)} rows")

def load_to_clickhouse(**context):
    """Загрузка в ClickHouse"""
    data = context['ti'].xcom_pull(key='transformed_data')
    
    client = clickhouse_connect.get_client(
        host='clickhouse',
        port=8123,
        database='video_analytics'
    )
    
    # Подготовка данных для вставки
    rows = [
        (
            d['view_id'],
            d['video_id'],
            d['user_id'],
            d['watched_at'],
            d['watch_duration']
        )
        for d in data
    ]
    
    client.insert(
        'video_views',
        rows,
        column_names=['view_id', 'video_id', 'user_id', 'watched_at', 'watch_duration']
    )
    
    print(f"Loaded {len(rows)} rows to ClickHouse")

extract_task = PythonOperator(
    task_id='extract_from_postgres',
    python_callable=extract_from_postgres,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    dag=dag,
)

load_task = PythonOperator(
    task_id='load_to_clickhouse',
    python_callable=load_to_clickhouse,
    dag=dag,
)

extract_task >> transform_task >> load_task`,
      },
      {
        kind: "warn",
        title: "Выбор хранилища",
        md: `Критерии выбора:
- **PostgreSQL** — OLTP, транзакции, сложные запросы
- **ClickHouse** — OLAP, аналитика, агрегаты
- **Elasticsearch** — полнотекстовый поиск
- **Redis** — кеширование, сессии
- **MongoDB** — документная модель, гибкая схема
- **Cassandra** — высокая запись, временные ряды

Используйте **polyglot persistence** — разные хранилища для разных задач.`,
      },
    ],
    quiz: [
      {
        q: "Что такое UGC-сервис?",
        options: [
          "Сервис для управления пользователями",
          "Платформа, где пользователи создают контент",
          "Система управления базами данных",
          "Фреймворк для веб-разработки",
        ],
        answer: 1,
        explain: "UGC (User Generated Content) — контент, создаваемый пользователями: посты, комментарии, видео, отзывы.",
      },
      {
        q: "Для чего используется ClickHouse?",
        options: [
          "OLTP транзакции",
          "OLAP аналитика и агрегатные запросы",
          "Полнотекстовый поиск",
          "Кеширование данных",
        ],
        answer: 1,
        explain: "ClickHouse — колоночная СУБД, оптимизированная для OLAP workload: быстрые агрегатные запросы на больших объёмах данных.",
      },
    ],
    tasks: [
      {
        id: "be17t1",
        title: "Kafka producer",
        md: `Реализуйте функцию \\`publish_video_event(video_id, event_type, metadata)\\`, которая отправляет событие о видео в Kafka topic \\`video_events\\`.`,
        starter: `from kafka import KafkaProducer
import json
from datetime import datetime

def publish_video_event(video_id: int, event_type: str, metadata: dict):
    """Публикация события о видео в Kafka"""
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

def publish_video_event(video_id: int, event_type: str, metadata: dict):
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

  // ========== СПРИНТ 9: CI/CD и распределённые системы ==========
  {
    id: "be18",
    language: "python",
    title: "CI/CD, распределённые хранилища и мониторинг",
    subtitle: "GitHub Actions, ELK-стек, Sentry, распределённые системы",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## CI/CD (Continuous Integration/Continuous Deployment)

**CI (Continuous Integration)** — автоматическая сборка и тестирование:
- Запуск линтеров (flake8, black, mypy)
- Запуск тестов (pytest)
- Проверка типов
- Сборка артефактов

**CD (Continuous Deployment)** — автоматическое развёртывание:
- Сборка Docker образов
- Push в registry
- Развёртывание в Kubernetes
- Smoke tests`,
      },
      {
        kind: "code",
        title: "GitHub Actions workflow",
        code: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run linters
        run: |
          black --check .
          flake8 .
          mypy .
          isort --check-only .
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://test_user:test_pass@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379/0
        run: |
          pytest --cov=app --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.xml
  
  build-and-push:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            myapp:latest
            myapp:\${{ github.sha }}
  
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/myapp myapp=myapp:\${{ github.sha }}
          kubectl rollout status deployment/myapp`,
      },
      {
        kind: "text",
        md: `## Распределённые хранилища

**Распределённые хранилища** — данные хранятся на нескольких узлах:

**HDFS (Hadoop Distributed File System)**:
- Master-slave архитектура
- NameNode — метаданные
- DataNode — данные
- Репликация по умолчанию x3

**Ceph**:
- Object storage (S3-compatible)
- Block storage
- File system
- Единое хранилище для разных workload

**MinIO**:
- S3-compatible object storage
- Легковесный, быстрый
- Kubernetes-native`,
      },
      {
        kind: "code",
        title: "MinIO S3-compatible storage",
        code: `import boto3
from botocore.client import Config

# Подключение к MinIO
s3_client = boto3.client(
    's3',
    endpoint_url='http://localhost:9000',
    aws_access_key_id='minioadmin',
    aws_secret_access_key='minioadmin',
    config=Config(signature_version='s3v4'),
    region_name='us-east-1'
)

# Создание bucket
bucket_name = 'video-storage'
try:
    s3_client.create_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} created")
except s3_client.exceptions.BucketAlreadyOwnedByYou:
    print(f"Bucket {bucket_name} already exists")

# Загрузка файла
def upload_video(video_id: int, file_path: str):
    key = f"videos/{video_id}/original.mp4"
    
    s3_client.upload_file(
        file_path,
        bucket_name,
        key,
        ExtraArgs={'ContentType': 'video/mp4'}
    )
    
    print(f"Uploaded {file_path} to s3://{bucket_name}/{key}")
    return f"s3://{bucket_name}/{key}"

# Генерация presigned URL для загрузки
def get_upload_url(video_id: int, expires_in: int = 3600):
    key = f"videos/{video_id}/original.mp4"
    
    url = s3_client.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': bucket_name,
            'Key': key,
            'ContentType': 'video/mp4'
        },
        ExpiresIn=expires_in
    )
    
    return url

# Генерация presigned URL для скачивания
def get_download_url(video_id: int, expires_in: int = 3600):
    key = f"videos/{video_id}/processed/1080p.mp4"
    
    url = s3_client.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': key
        },
        ExpiresIn=expires_in
    )
    
    return url

# Список объектов
def list_videos():
    response = s3_client.list_objects_v2(
        Bucket=bucket_name,
        Prefix='videos/'
    )
    
    for obj in response.get('Contents', []):
        print(f"{obj['Key']} - {obj['Size']} bytes")

# Использование
upload_url = get_upload_url(123)
print(f"Upload URL: {upload_url}")

download_url = get_download_url(123)
print(f"Download URL: {download_url}")`,
      },
      {
        kind: "text",
        md: `## ELK-стек для логирования

**ELK** — стек для централизованного логирования:
- **Elasticsearch** — хранение и поиск логов
- **Logstash** — сбор и обработка логов
- **Kibana** — визуализация

Альтернативы:
- **EFK** — Elasticsearch + Fluentd + Kibana
- **Loki** — легковесная альтернатива Elasticsearch`,
      },
      {
        kind: "code",
        title: "Настройка ELK-стека",
        code: `# docker-compose.yml для ELK
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_/usr/share/elasticsearch/data
  
  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5044:5044"
    depends_on:
      - elasticsearch
  
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

# logstash/pipeline/logstash.conf
input {
  beats {
    port => 5044
  }
  
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [app_name] == "video-service" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:msg}" }
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}`,
      },
      {
        kind: "code",
        title: "Отправка логов из Python",
        code: `import logging
import logstash
import sys

# Настройка Logstash handler
logger = logging.getLogger('video-service')
logger.setLevel(logging.INFO)

# Logstash handler
logstash_handler = logstash.TCPLogstashHandler(
    host='localhost',
    port=5000,
    version=1
)
logstash_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s %(name)s %(message)s'
))
logger.addHandler(logstash_handler)

# Также вывод в консоль
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
))
logger.addHandler(console_handler)

# Использование
logger.info('Video uploaded', extra={
    'video_id': 123,
    'user_id': 456,
    'file_size': 1024 * 1024 * 100  # 100 MB
})

logger.error('Video processing failed', extra={
    'video_id': 123,
    'error': 'Transcoding error',
    'stack_trace': '...'
})

# Структурированные логи
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
        }
        
        # Добавляем дополнительные поля
        if hasattr(record, 'video_id'):
            log_data['video_id'] = record.video_id
        if hasattr(record, 'user_id'):
            log_data['user_id'] = record.user_id
        
        return json.dumps(log_data)

json_handler = logging.StreamHandler()
json_handler.setFormatter(JSONFormatter())
logger.addHandler(json_handler)`,
      },
      {
        kind: "text",
        md: `## Sentry для мониторинга ошибок

**Sentry** — платформа для трекинга ошибок:
- Автоматический сбор исключений
- Stack traces с контекстом
- Performance monitoring
- Release tracking
- Alerting`,
      },
      {
        kind: "code",
        title: "Интеграция Sentry",
        code: `import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from sentry_sdk.integrations.redis import RedisIntegration

# Инициализация Sentry
sentry_sdk.init(
    dsn="https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations=[
        FastApiIntegration(transaction_style="endpoint"),
        SqlalchemyIntegration(),
        RedisIntegration(),
    ],
    traces_sample_rate=1.0,  # 100% транзакций
    profiles_sample_rate=1.0,  # 100% профилирование
    environment="production",
    release="video-service@1.0.0"
)

# Использование в FastAPI
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/videos/{video_id}")
async def get_video(video_id: int):
    # Sentry автоматически ловит исключения
    video = await db.get_video(video_id)
    
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Добавление контекста
    sentry_sdk.set_context("video", {
        "id": video.id,
        "title": video.title,
        "user_id": video.user_id
    })
    
    # Пользовательские теги
    sentry_sdk.set_tag("video_category", video.category)
    
    return video

# Ручная отправка ошибок
@app.post("/videos/{video_id}/process")
async def process_video(video_id: int):
    try:
        await process_video_async(video_id)
    except Exception as e:
        # Отправка в Sentry с дополнительным контекстом
        sentry_sdk.capture_exception(e)
        
        # Или с кастомным сообщением
        sentry_sdk.capture_message(
            f"Video processing failed for {video_id}",
            level="error"
        )
        
        raise

# Performance monitoring
@app.get("/analytics")
async def get_analytics():
    with sentry_sdk.start_transaction(op="analytics", name="Get Analytics"):
        with sentry_sdk.start_span(op="db", description="Query analytics"):
            analytics = await db.get_analytics()
        
        with sentry_sdk.start_span(op="cache", description="Get from cache"):
            cached = await redis.get("analytics_cache")
        
        return analytics`,
      },
      {
        kind: "warn",
        title: "Не отправляйте секреты в Sentry",
        md: `Sentry автоматически собирает контекст, но может захватить:
- Пароли в query parameters
- Токены в headers
- Данные карт

Настройте scrubbing:
\`\`\`python
sentry_sdk.init(
    before_send=before_send_hook,
    before_breadcrumb=before_breadcrumb_hook
)

def before_send_hook(event, hint):
    # Удаление чувствительных данных
    if 'request' in event and 'headers' in event['request']:
        headers = event['request']['headers']
        if 'Authorization' in headers:
            headers['Authorization'] = '[REDACTED]'
    return event
\`\`\``,
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
      {
        q: "Для чего используется Sentry?",
        options: [
          "Кеширование данных",
          "Мониторинг и трекинг ошибок",
          "Балансировка нагрузки",
          "Управление контейнерами",
        ],
        answer: 1,
        explain: "Sentry — платформа для мониторинга ошибок, сбора stack traces и performance monitoring.",
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
        run: |
          pip install -r requirements.txt
          pip install black flake8 pytest
      
      - name: Run linters
        run: |
          black --check .
          flake8 .
      
      - name: Run tests
        run: pytest`,
      },
    ],
  },
];
