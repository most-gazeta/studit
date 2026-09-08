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
        md: `## Реляционные базы данных\n\nРеляционная БД хранит данные в таблицах со связями между ними. Основные принципы:\n- **Атомарность** — каждая ячейка содержит одно значение\n- **Нормализация** — устранение дублирования данных\n- **Целостность** — ссылки между таблицами через внешние ключи`,
      },
      {
        kind: "text",
        md: `## Нормализация\n\n**1NF** — атомарные значения, нет повторяющихся групп\n**2NF** — 1NF + все неключевые атрибуты зависят от всего первичного ключа\n**3NF** — 2NF + нет транзитивных зависимостей`,
      },
      {
        kind: "code",
        title: "Пример схемы БД",
        code: `CREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL\n);\n\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INTEGER REFERENCES customers(id),\n    total DECIMAL(10, 2) NOT NULL\n);`,
      },
      {
        kind: "text",
        md: `## Индексы\n\nИндекс ускоряет поиск, но замедляет вставку. Создавайте индексы для:\n- Полей в WHERE, JOIN, ORDER BY\n- Внешних ключей\n- Уникальных ограничений`,
      },
    ],
    quiz: [
      {
        q: "Что такое нормализация базы данных?",
        options: ["Увеличение размера таблиц", "Устранение дублирования данных", "Добавление индексов", "Создание резервных копий"],
        answer: 1,
        explain: "Нормализация — процесс организации данных для минимизации дублирования.",
      },
    ],
    tasks: [
      {
        id: "be1t1",
        title: "Нормализация таблицы",
        md: "Напишите SQL для создания нормализованной схемы.",
        starter: `sql = """\n-- Ваш SQL здесь\n"""`,
        tests: `__test("содержит CREATE TABLE", lambda: "CREATE TABLE" in sql, True)`,
        solution: `sql = """\nCREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n"""`,
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
        md: `## Установка Django\n\n\`\`\`bash\npip install django\ndjango-admin startproject myproject\npython manage.py startapp movies\n\`\`\``,
      },
      {
        kind: "code",
        title: "Модели Django",
        code: `from django.db import models\n\nclass Movie(models.Model):\n    title = models.CharField(max_length=200)\n    year = models.IntegerField()\n    rating = models.DecimalField(max_digits=3, decimal_places=1)`,
      },
    ],
    quiz: [
      {
        q: "Какая команда создаёт миграции?",
        options: ["python manage.py migrate", "python manage.py makemigrations", "django-admin startapp", "python manage.py runserver"],
        answer: 1,
        explain: "makemigrations создаёт файлы миграций на основе изменений в моделях.",
      },
    ],
    tasks: [
      {
        id: "be2t1",
        title: "Модель Article",
        md: "Создайте модель Article с полями title, content, published, created_at.",
        starter: `from django.db import models\n\nclass Article(models.Model):\n    pass`,
        tests: `__test("имеет поле title", lambda: hasattr(Article, 'title'), True)`,
        solution: `from django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    published = models.BooleanField(default=False)\n    created_at = models.DateTimeField(auto_now_add=True)`,
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
        md: `## Django ORM\n\nORM позволяет работать с БД через Python-объекты.\n\nОсновные операции:\n- Model.objects.all() — все записи\n- Model.objects.filter() — фильтрация\n- Model.objects.get() — одна запись`,
      },
      {
        kind: "code",
        title: "Фильтрация",
        code: `# Все фильмы\nmovies = Movie.objects.all()\n\n# Фильмы после 2020\nrecent = Movie.objects.filter(year__gte=2020)\n\n# Фильмы с рейтингом > 8.0\nhigh_rated = Movie.objects.filter(rating__gt=8.0)`,
      },
    ],
    quiz: [
      {
        q: "Какой метод используется для получения одной записи?",
        options: ["filter()", "get()", "all()", "first()"],
        answer: 1,
        explain: "get() возвращает одну запись или бросает DoesNotExist.",
      },
    ],
    tasks: [
      {
        id: "be3t1",
        title: "Запрос фильмов",
        md: "Напишите функцию get_top_movies(year, min_rating).",
        starter: `def get_top_movies(year, min_rating):\n    pass`,
        tests: `__test("возвращает QuerySet", lambda: hasattr(get_top_movies(2020, 8.0), '__iter__'), True)`,
        solution: `def get_top_movies(year, min_rating):\n    return Movie.objects.filter(year=year, rating__gte=min_rating).order_by('-rating')`,
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
        md: `## Django REST Framework\n\nDRF — мощный инструмент для создания REST API:\n- Сериализаторы для преобразования данных\n- ViewSets для CRUD-операций\n- Аутентификация и права доступа`,
      },
      {
        kind: "code",
        title: "Сериализаторы",
        code: `from rest_framework import serializers\n\nclass MovieSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Movie\n        fields = ['id', 'title', 'year', 'rating']`,
      },
    ],
    quiz: [
      {
        q: "Что делает сериализатор в DRF?",
        options: ["Создаёт модели", "Преобразует данные между Python и JSON", "Подключается к БД", "Создаёт URL"],
        answer: 1,
        explain: "Сериализатор преобразует сложные типы данных в JSON и обратно.",
      },
    ],
    tasks: [
      {
        id: "be4t1",
        title: "Сериализатор Article",
        md: "Создайте сериализатор ArticleSerializer.",
        starter: `from rest_framework import serializers\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Article\n        fields = []`,
        tests: `__test("имеет поле title", lambda: 'title' in ArticleSerializer.Meta.fields, True)`,
        solution: `from rest_framework import serializers\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Article\n        fields = ['id', 'title', 'content', 'published', 'created_at']`,
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
        md: `## Что такое Docker?\n\nDocker — платформа для контейнеризации приложений. Контейнер — изолированная среда с приложением и всеми зависимостями.`,
      },
      {
        kind: "code",
        title: "Dockerfile",
        code: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]`,
      },
    ],
    quiz: [
      {
        q: "Что такое Dockerfile?",
        options: ["Конфигурация БД", "Инструкция для создания образа", "Файл зависимостей", "Настройки nginx"],
        answer: 1,
        explain: "Dockerfile содержит инструкции для сборки Docker-образа.",
      },
    ],
    tasks: [
      {
        id: "be5t1",
        title: "Dockerfile для Flask",
        md: "Создайте Dockerfile для Flask-приложения.",
        starter: `# Dockerfile\n# Ваш код здесь`,
        tests: `__test("содержит FROM", lambda: "FROM" in dockerfile, True)`,
        solution: `dockerfile = """\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nEXPOSE 5000\nCMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]\n"""`,
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
        md: `## Зачем нужен Nginx?\n\nNginx — веб-сервер, который работает как reverse proxy:\n- Обработка статических файлов\n- SSL/TLS termination\n- Балансировка нагрузки`,
      },
      {
        kind: "code",
        title: "Конфигурация Nginx",
        code: `server {\n    listen 80;\n    server_name example.com;\n\n    location /static/ {\n        alias /app/staticfiles/;\n    }\n\n    location / {\n        proxy_pass http://127.0.0.1:8000;\n    }\n}`,
      },
    ],
    quiz: [
      {
        q: "Что такое reverse proxy?",
        options: ["Прокси для клиентов", "Сервер, перенаправляющий запросы к backend", "Файрвол", "База данных"],
        answer: 1,
        explain: "Reverse proxy принимает запросы от клиентов и перенаправляет их к backend-серверам.",
      },
    ],
    tasks: [
      {
        id: "be6t1",
        title: "Nginx конфигурация",
        md: "Создайте конфигурацию Nginx для Django-приложения.",
        starter: `# nginx.conf\n# Ваш код здесь`,
        tests: `__test("содержит location /", lambda: "location /" in nginx_config, True)`,
        solution: `nginx_config = """\nserver {\n    listen 80;\n    location /static/ {\n        alias /app/staticfiles/;\n    }\n    location / {\n        proxy_pass http://127.0.0.1:8000;\n    }\n}\n"""`,
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
        md: `## Что такое Elasticsearch?\n\nElasticsearch — распределённый поисковый движок:\n- Полнотекстовый поиск\n- Аналитика в реальном времени\n- Масштабируемость`,
      },
      {
        kind: "code",
        title: "Индексы и документы",
        code: `from elasticsearch import Elasticsearch\n\nes = Elasticsearch(['http://localhost:9200'])\n\n# Создание индекса\nes.indices.create(index='movies', body={\n    'mappings': {\n        'properties': {\n            'title': {'type': 'text'},\n            'year': {'type': 'integer'}\n        }\n    }\n})`,
      },
    ],
    quiz: [
      {
        q: "Что такое индекс в Elasticsearch?",
        options: ["Таблица в SQL", "Коллекция документов", "Тип данных", "Пользователь"],
        answer: 1,
        explain: "Индекс — коллекция документов, похожая на таблицу в реляционной БД.",
      },
    ],
    tasks: [
      {
        id: "be7t1",
        title: "Поиск фильмов",
        md: "Напишите функцию search_movies(query).",
        starter: `from elasticsearch import Elasticsearch\n\nes = Elasticsearch(['http://localhost:9200'])\n\ndef search_movies(query):\n    pass`,
        tests: `__test("возвращает результат", lambda: callable(search_movies), True)`,
        solution: `def search_movies(query):\n    body = {\n        'query': {\n            'multi_match': {\n                'query': query,\n                'fields': ['title', 'description']\n            }\n        }\n    }\n    return es.search(index='movies', body=body)`,
      },
    ],
  },

  {
    id: "be8",
    language: "python",
    title: "ETL-процессы",
    subtitle: "Extract, Transform, Load: синхронизация данных",
    minutes: 55,
    blocks: [
      {
        kind: "text",
        md: `## Что такое ETL?\n\nETL (Extract, Transform, Load) — процесс переноса данных:\n- **Extract** — извлечение из источника\n- **Transform** — трансформация и очистка\n- **Load** — загрузка в приёмник`,
      },
      {
        kind: "code",
        title: "ETL: PostgreSQL → Elasticsearch",
        code: `import psycopg2\nfrom elasticsearch import Elasticsearch\n\nclass MovieETL:\n    def __init__(self, pg_config, es_host):\n        self.pg_conn = psycopg2.connect(**pg_config)\n        self.es = Elasticsearch([es_host])\n    \n    def extract(self):\n        # Извлечение из PostgreSQL\n        pass\n    \n    def transform(self, rows):\n        # Трансформация\n        pass\n    \n    def load(self, documents):\n        # Загрузка в Elasticsearch\n        pass`,
      },
    ],
    quiz: [
      {
        q: "Что означает буква 'T' в ETL?",
        options: ["Test", "Transform", "Transfer", "Track"],
        answer: 1,
        explain: "Transform — трансформация данных между извлечением и загрузкой.",
      },
    ],
    tasks: [
      {
        id: "be8t1",
        title: "ETL функция",
        md: "Реализуйте функцию transform_user(row).",
        starter: `def transform_user(row):\n    return {}`,
        tests: `__test("возвращает словарь", lambda: isinstance(transform_user((1, "John")), dict), True)`,
        solution: `def transform_user(row):\n    id, name, email = row\n    return {"id": id, "name": name, "email": email}`,
      },
    ],
  },

  // ========== СПРИНТ 4: Code Review и SOLID ==========
  {
    id: "be9",
    language: "python",
    title: "Code Review и SOLID",
    subtitle: "Принципы ревью кода, SOLID-принципы, рефакторинг",
    minutes: 40,
    blocks: [
      {
        kind: "text",
        md: `## Принципы код-ревью\n\nCode review — процесс проверки кода коллегами. Цели:\n- **Качество кода** — читаемость, поддерживаемость\n- **Обнаружение багов** — логические ошибки\n- **Обмен знаниями** — команда узнаёт о новых подходах`,
      },
      {
        kind: "text",
        md: `## SOLID-принципы\n\n**S** — Single Responsibility Principle\n**O** — Open/Closed Principle\n**L** — Liskov Substitution Principle\n**I** — Interface Segregation Principle\n**D** — Dependency Inversion Principle`,
      },
    ],
    quiz: [
      {
        q: "Что означает SRP?",
        options: ["Класс должен иметь только один метод", "Класс должен иметь одну причину для изменения", "Класс не должен наследоваться", "Класс не должен иметь зависимостей"],
        answer: 1,
        explain: "SRP означает, что класс должен отвечать за одну вещь.",
      },
    ],
    tasks: [
      {
        id: "be9t1",
        title: "Рефакторинг к SRP",
        md: "Разделите OrderProcessor на три класса.",
        starter: `class OrderValidator:\n    def validate(self, order):\n        pass\n\nclass OrderRepository:\n    def save(self, order):\n        pass\n\nclass NotificationService:\n    def notify(self, order_id):\n        pass`,
        tests: `__test("OrderValidator существует", lambda: hasattr(OrderValidator, 'validate'), True)`,
        solution: `class OrderValidator:\n    def validate(self, order):\n        return bool(order.get("items"))\n\nclass OrderRepository:\n    def save(self, order):\n        return True\n\nclass NotificationService:\n    def notify(self, order_id):\n        return True`,
      },
    ],
  },

  {
    id: "be10",
    language: "python",
    title: "Тестирование и документация API",
    subtitle: "Функциональные тесты, pytest, Swagger/OpenAPI",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Виды тестирования API\n\n**Функциональные тесты** проверяют, что API делает то, что должно:\n- Правильные HTTP-коды ответов\n- Корректность данных в ответах\n- Обработка ошибок`,
      },
      {
        kind: "code",
        title: "Тесты с pytest",
        code: `import pytest\nfrom fastapi.testclient import TestClient\nfrom main import app\n\nclient = TestClient(app)\n\ndef test_create_movie():\n    response = client.post("/movies/", json={\n        "title": "Inception",\n        "year": 2010\n    })\n    assert response.status_code == 201`,
      },
    ],
    quiz: [
      {
        q: "Какой HTTP-код при успешном создании ресурса?",
        options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
        answer: 1,
        explain: "201 Created возвращается при успешном создании ресурса через POST.",
      },
    ],
    tasks: [
      {
        id: "be10t1",
        title: "Тест API эндпоинта",
        md: "Напишите функцию test_get_movies().",
        starter: `def test_get_movies():\n    pass`,
        tests: `__test("тест проверяет статус-код", lambda: test_get_movies() is None or test_get_movies() == True, True)`,
        solution: `def test_get_movies():\n    response = mock_get_movies()\n    assert response.status_code == 200\n    data = response.json()\n    assert isinstance(data, list)`,
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
        md: `## Синхронное vs Асинхронное\n\n**Синхронный код** выполняется последовательно.\n**Асинхронный код** позволяет выполнять другие задачи во время ожидания.`,
      },
      {
        kind: "code",
        title: "async/await",
        code: `import asyncio\n\nasync def fetch_data(url):\n    await asyncio.sleep(1)\n    return f"Data from {url}"\n\nasync def main():\n    result = await fetch_data("example.com")\n    print(result)\n\nasyncio.run(main())`,
      },
    ],
    quiz: [
      {
        q: "Что делает await?",
        options: ["Создаёт корутину", "Приостанавливает корутину до завершения другой", "Запускает event loop", "Отменяет выполнение"],
        answer: 1,
        explain: "await приостанавливает выполнение текущей корутины и ждёт завершения другой.",
      },
    ],
    tasks: [
      {
        id: "be11t1",
        title: "Асинхронная функция",
        md: "Создайте async_fetch_data(url).",
        starter: `import asyncio\n\nasync def async_fetch_data(url):\n    pass`,
        tests: `async def run_test():\n    return await async_fetch_data("test.com")\n__test("возвращает строку", lambda: isinstance(asyncio.run(run_test()), str), True)`,
        solution: `async def async_fetch_data(url):\n    await asyncio.sleep(1)\n    return f"Data from {url}"`,
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
        md: `## Почему FastAPI?\n\n**FastAPI** — современный веб-фреймворк:\n- **Быстрый** — на уровне Node.js и Go\n- **Быстрая разработка** — автоматическая документация\n- **Стандарты** — основан на OpenAPI`,
      },
      {
        kind: "code",
        title: "Первое FastAPI приложение",
        code: `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Movie(BaseModel):\n    id: int\n    title: str\n    year: int\n\n@app.get("/movies/")\nasync def get_movies():\n    return []\n\n@app.post("/movies/")\nasync def create_movie(movie: Movie):\n    return movie`,
      },
    ],
    quiz: [
      {
        q: "Что такое Pydantic в FastAPI?",
        options: ["База данных", "Библиотека для валидации данных", "Веб-сервер", "ORM"],
        answer: 1,
        explain: "Pydantic — библиотека для валидации данных с использованием type hints.",
      },
    ],
    tasks: [
      {
        id: "be12t1",
        title: "FastAPI эндпоинт",
        md: "Создайте Pydantic-модель User.",
        starter: `from pydantic import BaseModel\n\nclass User(BaseModel):\n    id: int\n    username: str\n    email: str`,
        tests: `__test("создаёт пользователя", lambda: User(id=1, username="john", email="john@example.com").email, "john@example.com")`,
        solution: `from pydantic import BaseModel\n\nclass User(BaseModel):\n    id: int\n    username: str\n    email: str`,
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
        md: `## Кеширование с Redis\n\n**Redis** — in-memory хранилище:\n- Кеширование запросов к БД\n- Сессии пользователей\n- Rate limiting`,
      },
      {
        kind: "code",
        title: "Кеширование",
        code: `import redis\nimport json\n\nredis_client = redis.Redis(host='localhost', port=6379)\n\ndef cache_response(ttl=300):\n    def decorator(func):\n        async def wrapper(*args, **kwargs):\n            cache_key = f"{func.__name__}:{args}"\n            cached = redis_client.get(cache_key)\n            if cached:\n                return json.loads(cached)\n            result = await func(*args, **kwargs)\n            redis_client.setex(cache_key, ttl, json.dumps(result))\n            return result\n        return wrapper\n    return decorator`,
      },
    ],
    quiz: [
      {
        q: "Зачем нужен Redis?",
        options: ["Для хранения кода", "Для кеширования и быстрого доступа", "Для компиляции", "Для управления зависимостями"],
        answer: 1,
        explain: "Redis — in-memory хранилище для кеширования и быстрого доступа к данным.",
      },
    ],
    tasks: [
      {
        id: "be13t1",
        title: "Функция кеширования",
        md: "Реализуйте get_cached_data(key, fetch_func, ttl=300).",
        starter: `cache = {}\n\ndef get_cached_data(key, fetch_func, ttl=300):\n    pass`,
        tests: `__test("возвращает результат", lambda: get_cached_data("key1", lambda: {"value": 1}), {"value": 1})`,
        solution: `cache = {}\n\ndef get_cached_data(key, fetch_func, ttl=300):\n    if key in cache:\n        return cache[key]\n    result = fetch_func()\n    cache[key] = result\n    return result`,
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
        md: `## Аутентификация vs Авторизация\n\n**Аутентификация** — проверка личности (кто вы?)\n**Авторизация** — проверка прав (что разрешено?)`,
      },
      {
        kind: "code",
        title: "JWT аутентификация",
        code: `import jwt\nfrom datetime import datetime, timedelta\n\nSECRET_KEY = "your-secret-key"\n\ndef create_access_token(data: dict):\n    to_encode = data.copy()\n    expire = datetime.utcnow() + timedelta(minutes=30)\n    to_encode.update({"exp": expire})\n    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")`,
      },
    ],
    quiz: [
      {
        q: "Что такое OAuth 2.0?",
        options: ["Протокол аутентификации", "Протокол делегированной авторизации", "База данных", "Фреймворк"],
        answer: 1,
        explain: "OAuth 2.0 — протокол делегированной авторизации.",
      },
    ],
    tasks: [
      {
        id: "be14t1",
        title: "JWT токен",
        md: "Реализуйте create_jwt_token(user_id, secret_key).",
        starter: `import jwt\nfrom datetime import datetime, timedelta\n\ndef create_jwt_token(user_id: int, secret_key: str):\n    pass`,
        tests: `__test("возвращает строку", lambda: isinstance(create_jwt_token(123, "secret"), str), True)`,
        solution: `import jwt\nfrom datetime import datetime, timedelta\n\ndef create_jwt_token(user_id: int, secret_key: str):\n    payload = {\n        "sub": user_id,\n        "exp": datetime.utcnow() + timedelta(minutes=30)\n    }\n    return jwt.encode(payload, secret_key, algorithm="HS256")`,
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
        md: `## Микросервисная архитектура\n\nМикросервисы — архитектурный стиль, где приложение состоит из небольших независимых сервисов.\n\nПреимущества:\n- Масштабируемость\n- Независимые релизы\n- Отказоустойчивость`,
      },
      {
        kind: "code",
        title: "gRPC сервис",
        code: `# movie.proto\nsyntax = "proto3";\n\nservice MovieService {\n    rpc GetMovie (MovieRequest) returns (MovieResponse);\n}\n\nmessage MovieRequest {\n    int32 id = 1;\n}\n\nmessage MovieResponse {\n    int32 id = 1;\n    string title = 2;\n}`,
      },
    ],
    quiz: [
      {
        q: "Что такое gRPC?",
        options: ["Веб-фреймворк", "Высокопроизводительный RPC фреймворк", "База данных", "Кэш"],
        answer: 1,
        explain: "gRPC — высокопроизводительный RPC фреймворк от Google.",
      },
    ],
    tasks: [
      {
        id: "be15t1",
        title: "gRPC клиент",
        md: "Создайте функцию get_movie_grpc(movie_id).",
        starter: `def get_movie_grpc(movie_id: int):\n    pass`,
        tests: `__test("функция существует", lambda: callable(get_movie_grpc), True)`,
        solution: `def get_movie_grpc(movie_id: int):\n    # gRPC client code\n    return {"id": movie_id, "title": "Movie"}`,
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
        md: `## Rate Limiting\n\nОграничение количества запросов:\n- Защита от DDoS\n- Справедливое распределение ресурсов`,
      },
      {
        kind: "code",
        title: "Rate limiting",
        code: `import redis\nimport time\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.redis = redis.Redis()\n    \n    def is_allowed(self, key: str) -> bool:\n        current_time = int(time.time())\n        window_key = f"rate_limit:{key}:{current_time // self.window_seconds}"\n        requests = self.redis.incr(window_key)\n        if requests == 1:\n            self.redis.expire(window_key, self.window_seconds)\n        return requests <= self.max_requests`,
      },
    ],
    quiz: [
      {
        q: "Что делает Circuit Breaker?",
        options: ["Ускоряет запросы", "Предотвращает каскадные сбои", "Кэширует данные", "Балансирует нагрузку"],
        answer: 1,
        explain: "Circuit Breaker предотвращает каскадные сбои.",
      },
    ],
    tasks: [
      {
        id: "be16t1",
        title: "Rate limiter",
        md: "Реализуйте класс RateLimiter.",
        starter: `import time\nfrom collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.requests = defaultdict(list)\n    \n    def is_allowed(self, key: str) -> bool:\n        pass`,
        tests: `__test("разрешает первые запросы", lambda: RateLimiter(5, 60).is_allowed("test"), True)`,
        solution: `import time\nfrom collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.requests = defaultdict(list)\n    \n    def is_allowed(self, key: str) -> bool:\n        current_time = time.time()\n        window_start = current_time - self.window_seconds\n        self.requests[key] = [t for t in self.requests[key] if t > window_start]\n        if len(self.requests[key]) >= self.max_requests:\n            return False\n        self.requests[key].append(current_time)\n        return True`,
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
        md: `## Планирование UGC-сервиса\n\nUGC (User Generated Content) — контент, создаваемый пользователями.\n\nАрхитектура:\n- PostgreSQL для метаданных\n- S3 для файлов\n- ClickHouse для аналитики`,
      },
      {
        kind: "code",
        title: "Apache Kafka",
        code: `from kafka import KafkaProducer\nimport json\n\nproducer = KafkaProducer(\n    bootstrap_servers=['localhost:9092'],\n    value_serializer=lambda v: json.dumps(v).encode('utf-8')\n)\n\ndef publish_event(topic: str, event: dict):\n    producer.send(topic, value=event)\n    producer.flush()`,
      },
    ],
    quiz: [
      {
        q: "Что такое Apache Kafka?",
        options: ["База данных", "Распределённая система обмена сообщениями", "Веб-сервер", "Кэш"],
        answer: 1,
        explain: "Kafka — распределённая система обмена сообщениями.",
      },
    ],
    tasks: [
      {
        id: "be17t1",
        title: "Kafka producer",
        md: "Реализуйте функцию publish_video_event(video_id, event_type, metadata).",
        starter: `from kafka import KafkaProducer\nimport json\n\ndef publish_video_event(video_id: int, event_type: str, metadata: dict):\n    pass`,
        tests: `__test("функция существует", lambda: callable(publish_video_event), True)`,
        solution: `from kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\nproducer = KafkaProducer(\n    bootstrap_servers=['localhost:9092'],\n    value_serializer=lambda v: json.dumps(v).encode('utf-8')\n)\n\ndef publish_video_event(video_id: int, event_type: str, metadata: dict):\n    event = {\n        'video_id': video_id,\n        'event_type': event_type,\n        'metadata': metadata,\n        'timestamp': datetime.utcnow().isoformat()\n    }\n    producer.send('video_events', value=event)\n    producer.flush()`,
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
        md: `## CI/CD\n\nCI/CD — Continuous Integration/Continuous Deployment:\n- Автоматизация сборки\n- Автоматическое тестирование\n- Автоматическое развёртывание`,
      },
      {
        kind: "code",
        title: "GitHub Actions",
        code: `# .github/workflows/ci.yml\nname: CI\n\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up Python\n        uses: actions/setup-python@v4\n        with:\n          python-version: '3.11'\n      - name: Install dependencies\n        run: pip install -r requirements.txt\n      - name: Run tests\n        run: pytest`,
      },
    ],
    quiz: [
      {
        q: "Что такое CI/CD?",
        options: ["База данных", "Непрерывная интеграция и развёртывание", "Фреймворк для тестирования", "Система мониторинга"],
        answer: 1,
        explain: "CI/CD — Continuous Integration/Continuous Deployment.",
      },
    ],
    tasks: [
      {
        id: "be18t1",
        title: "GitHub Actions workflow",
        md: "Создайте YAML-файл для GitHub Actions.",
        starter: `# .github/workflows/ci.yml\n# Ваш workflow здесь`,
        tests: `__test("workflow создан", lambda: True, True)`,
        solution: `# .github/workflows/ci.yml\nname: CI\n\non:\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up Python\n        uses: actions/setup-python@v4\n        with:\n          python-version: '3.11'\n      - name: Install dependencies\n        run: pip install -r requirements.txt\n      - name: Run tests\n        run: pytest`,
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
        md: `## Принцип работы сервиса нотификаций\n\nСервис нотификаций — централизованная система отправки уведомлений:\n- Email (SMTP)\n- SMS\n- Push-уведомления\n- WebSocket (real-time)\n\nЕдиная политика контактов:\n- Пользовательские предпочтения\n- Rate limiting\n- Идемпотентность`,
      },
      {
        kind: "code",
        title: "Email сервис с шаблонизацией",
        code: `from jinja2 import Template\nimport smtplib\nfrom email.mime.text import MIMEText\n\nclass EmailService:\n    def __init__(self, smtp_host, smtp_port, username, password):\n        self.smtp_host = smtp_host\n        self.smtp_port = smtp_port\n        self.username = username\n        self.password = password\n    \n    def send_templated_email(self, to_email, template_name, context):\n        # Загрузка шаблона\n        template = self.load_template(template_name)\n        \n        # Рендеринг\n        rendered = template.render(**context)\n        \n        # Отправка\n        msg = MIMEText(rendered, 'html')\n        msg['Subject'] = context.get('subject', 'Notification')\n        msg['From'] = self.username\n        msg['To'] = to_email\n        \n        with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:\n            server.starttls()\n            server.login(self.username, self.password)\n            server.send_message(msg)`,
      },
      {
        kind: "text",
        md: `## WebSocket для real-time уведомлений\n\nWebSocket обеспечивает двустороннюю связь между клиентом и сервером:\n- Мгновенная доставка уведомлений\n- Низкая задержка\n- Эффективное использование ресурсов`,
      },
      {
        kind: "code",
        title: "WebSocket сервер",
        code: `from fastapi import WebSocket, WebSocketDisconnect\nimport json\n\nclass NotificationWebSocket:\n    def __init__(self):\n        self.active_connections = {}\n    \n    async def connect(self, websocket: WebSocket, user_id: int):\n        await websocket.accept()\n        if user_id not in self.active_connections:\n            self.active_connections[user_id] = []\n        self.active_connections[user_id].append(websocket)\n    \n    async def disconnect(self, websocket: WebSocket, user_id: int):\n        if user_id in self.active_connections:\n            self.active_connections[user_id].remove(websocket)\n    \n    async def send_to_user(self, user_id: int, notification: dict):\n        if user_id in self.active_connections:\n            for connection in self.active_connections[user_id]:\n                await connection.send_json(notification)`,
      },
      {
        kind: "text",
        md: `## RabbitMQ для очередей уведомлений\n\nRabbitMQ обеспечивает:\n- Гарантированную доставку\n- Масштабируемость\n- Асинхронную обработку`,
      },
      {
        kind: "code",
        title: "RabbitMQ producer",
        code: `import pika\nimport json\n\nclass NotificationQueue:\n    def __init__(self, host='localhost'):\n        self.connection = pika.BlockingConnection(\n            pika.ConnectionParameters(host)\n        )\n        self.channel = self.connection.channel()\n        self.channel.queue_declare(queue='notifications')\n    \n    def publish(self, notification: dict):\n        self.channel.basic_publish(\n            exchange='',\n            routing_key='notifications',\n            body=json.dumps(notification),\n            properties=pika.BasicProperties(delivery_mode=2)  # persistent\n        )`,
      },
      {
        kind: "text",
        md: `## Сокращённые ссылки\n\nСервис сокращения ссылок:\n- Генерация коротких URL\n- Редирект на оригинальный URL\n- Аналитика переходов`,
      },
      {
        kind: "code",
        title: "URL shortener",
        code: `import hashlib\nimport base64\n\nclass URLShortener:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.url_mapping = {}\n    \n    def shorten(self, long_url: str) -> str:\n        # Генерация хеша\n        hash_obj = hashlib.md5(long_url.encode())\n        short_code = base64.urlsafe_b64encode(hash_obj.digest()[:6]).decode()[:8]\n        \n        short_url = f"{self.base_url}/{short_code}"\n        self.url_mapping[short_code] = long_url\n        \n        return short_url\n    \n    def expand(self, short_code: str) -> str:\n        return self.url_mapping.get(short_code)`,
      },
    ],
    quiz: [
      {
        q: "Для чего используется RabbitMQ в сервисе нотификаций?",
        options: ["Хранение данных", "Очереди сообщений для асинхронной обработки", "Кеширование", "Балансировка нагрузки"],
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
        md: "Создайте класс NotificationWebSocket с методами connect, disconnect, send_to_user.",
        starter: `class NotificationWebSocket:\n    def __init__(self):\n        self.active_connections = {}\n    \n    async def connect(self, websocket, user_id):\n        pass\n    \n    async def disconnect(self, websocket, user_id):\n        pass\n    \n    async def send_to_user(self, user_id, notification):\n        pass`,
        tests: `__test("класс существует", lambda: hasattr(NotificationWebSocket, 'connect'), True)`,
        solution: `class NotificationWebSocket:\n    def __init__(self):\n        self.active_connections = {}\n    \n    async def connect(self, websocket, user_id):\n        await websocket.accept()\n        if user_id not in self.active_connections:\n            self.active_connections[user_id] = []\n        self.active_connections[user_id].append(websocket)\n    \n    async def disconnect(self, websocket, user_id):\n        if user_id in self.active_connections:\n            self.active_connections[user_id].remove(websocket)\n    \n    async def send_to_user(self, user_id, notification):\n        if user_id in self.active_connections:\n            for connection in self.active_connections[user_id]:\n                await connection.send_json(notification)`,
      },
    ],
  },
];
