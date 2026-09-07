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

  // ========== СПРИНТ 8: UGC-сервис и большие данные ==========
  {
    id: "be17",
    language: "python",
    title: "Планирование UGC-сервиса и работа с большими данными",
    subtitle: "Kafka, Spark, ClickHouse, архитектура UGC-сервиса",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## UGC-сервис (User Generated Content)

UGC-сервис — платформа для пользовательского контента (видео, фото, комментарии):
- Высокая нагрузка на запись
- Асинхронная обработка
- Хранение метаданных и бинарных данных
- Аналитика и рекомендации

Примеры: YouTube, Instagram, TikTok`,
      },
      {
        kind: "text",
        md: `## Архитектура UGC-сервиса

Основные компоненты:
- **API Gateway** — приём запросов, аутентификация
- **Upload Service** — загрузка файлов в object storage (S3)
- **Processing Queue** — очередь задач (Kafka/RabbitMQ)
- **Transcoding Service** — конвертация видео в разные форматы
- **Metadata DB** — PostgreSQL для метаданных
- **Object Storage** — S3/MinIO для бинарных данных
- **Analytics** — ClickHouse для аналитики`,
      },
      {
        kind: "code",
        title: "Архитектура UGC-сервиса",
        code: `# Архитектура UGC-сервиса
#
# Client -> API Gateway -> Upload Service -> S3
#                              |
#                              v
#                         Kafka Queue
#                              |
#                              v
#                    Transcoding Service
#                              |
#                              v
#                    Metadata DB (PostgreSQL)
#                              |
#                              v
#                    Analytics (ClickHouse)

# Пример обработки загрузки видео
from fastapi import FastAPI, UploadFile, BackgroundTasks
import boto3
from kafka import KafkaProducer
import json

app = FastAPI()
s3_client = boto3.client('s3')
kafka_producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

@app.post("/upload/video")
async def upload_video(
    file: UploadFile,
    background_tasks: BackgroundTasks
):
    # 1. Загрузка в S3
    s3_key = f"videos/{file.filename}"
    s3_client.upload_fileobj(file.file, "my-bucket", s3_key)
    
    # 2. Отправка события в Kafka
    event = {
        "event_type": "video.uploaded",
        "s3_key": s3_key,
        "filename": file.filename
    }
    kafka_producer.send("video_events", value=event)
    kafka_producer.flush()
    
    # 3. Фоновая обработка (транскодирование)
    background_tasks.add_task(process_video, s3_key)
    
    return {"message": "Video uploaded", "s3_key": s3_key}

async def process_video(s3_key: str):
    # Транскодирование видео
    # Создание thumbnail
    # Обновление метаданных в БД
    pass`,
      },
      {
        kind: "text",
        md: `## Apache Kafka

Kafka — распределённая система обмена сообщениями:
- **Topics** — категории сообщений
- **Producers** — отправители сообщений
- **Consumers** — получатели сообщений
- **Partitions** — параллельная обработка
- **Consumer Groups** — балансировка нагрузки

Преимущества:
- Высокая пропускная способность
- Персистентность сообщений
- Масштабируемость
- Replay (повторное чтение)`,
      },
      {
        kind: "code",
        title: "Kafka producer и consumer",
        code: `from kafka import KafkaProducer, KafkaConsumer
import json

# Producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Отправка сообщения
event = {
    "video_id": 123,
    "event_type": "video.processed",
    "status": "completed"
}
producer.send("video_events", value=event)
producer.flush()

# Consumer
consumer = KafkaConsumer(
    "video_events",
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    group_id="video-processing-group"
)

# Обработка сообщений
for message in consumer:
    event = message.value
    print(f"Received: {event}")
    # Обработка события`,
      },
      {
        kind: "text",
        md: `## Apache Spark

Spark — фреймворк для распределённой обработки больших данных:
- **DataFrame API** — работа с данными как с таблицами
- **RDD** — низкоуровневый API
- **Spark SQL** — SQL-запросы к данным
- **MLlib** — машинное обучение
- **Streaming** — обработка потоков данных

Использование:
- ETL-процессы
- Аналитика
- Машинное обучение
- Обработка логов`,
      },
      {
        kind: "code",
        title: "Spark обработка данных",
        code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg

# Создание Spark сессии
spark = SparkSession.builder \\
    .appName("VideoAnalytics") \\
    .master("local[*]") \\
    .getOrCreate()

# Чтение данных из PostgreSQL
videos_df = spark.read \\
    .format("jdbc") \\
    .option("url", "jdbc:postgresql://localhost:5432/videos") \\
    .option("dbtable", "videos") \\
    .option("user", "postgres") \\
    .option("password", "password") \\
    .load()

# Анализ: среднее количество просмотров по категориям
category_stats = videos_df \\
    .groupBy("category") \\
    .agg(
        count("id").alias("video_count"),
        avg("views").alias("avg_views")
    ) \\
    .orderBy(col("avg_views").desc())

category_stats.show()

# Фильтрация популярных видео
popular_videos = videos_df.filter(col("views") > 10000)
popular_videos.show()

spark.stop()`,
      },
      {
        kind: "text",
        md: `## ClickHouse

ClickHouse — колоночная СУБД для аналитики:
- Быстрые агрегатные запросы
- Колоночное хранение
- Сжатие данных
- Распределённые запросы

Использование:
- Аналитика просмотров
- Отчёты
- Дашборды
- Real-time аналитика`,
      },
      {
        kind: "code",
        title: "ClickHouse запросы",
        code: `import clickhouse_connect

# Подключение к ClickHouse
client = clickhouse_connect.get_client(
    host='localhost',
    port=8123,
    database='analytics'
)

# Создание таблицы для аналитики просмотров
client.command("""
CREATE TABLE IF NOT EXISTS video_views (
    video_id UInt64,
    user_id UInt64,
    view_time DateTime,
    duration UInt32,
    category String
) ENGINE = MergeTree()
ORDER BY (video_id, view_time)
""")

# Вставка данных
data = [
    (123, 456, '2024-01-01 10:00:00', 300, 'tech'),
    (123, 789, '2024-01-01 11:00:00', 250, 'tech'),
    (456, 456, '2024-01-01 12:00:00', 180, 'music')
]
client.insert('video_views', data, column_names=['video_id', 'user_id', 'view_time', 'duration', 'category'])

# Аналитический запрос: топ видео по просмотрам
result = client.query("""
SELECT 
    video_id,
    count() as view_count,
    avg(duration) as avg_duration
FROM video_views
GROUP BY video_id
ORDER BY view_count DESC
LIMIT 10
""")

for row in result.result_rows:
    print(f"Video {row[0]}: {row[1]} views, avg duration {row[2]:.0f}s")`,
      },
      {
        kind: "warn",
        title: "Не используйте ClickHouse для OLTP",
        md: `ClickHouse оптимизирован для аналитических запросов (OLAP), не для транзакций (OLTP):
- Нет полноценных UPDATE/DELETE
- Не подходит для частых мелких записей
- Используйте PostgreSQL для OLTP, ClickHouse для аналитики`,
      },
    ],
    quiz: [
      {
        q: "Для чего используется Apache Kafka?",
        options: [
          "Хранение файлов",
          "Обмен сообщениями между сервисами",
          "Веб-сервер",
          "База данных",
        ],
        answer: 1,
        explain: "Kafka — распределённая система обмена сообщениями для асинхронной коммуникации между сервисами.",
      },
      {
        q: "Какой тип СУБД является ClickHouse?",
        options: [
          "Документоориентированная",
          "Колоночная аналитическая",
          "Графовая",
          "Ключ-значение",
        ],
        answer: 1,
        explain: "ClickHouse — колоночная СУБД, оптимизированная для аналитических запросов (OLAP).",
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

Автоматизация процесса разработки:
- **CI** — автоматическая сборка и тестирование при каждом коммите
- **CD** — автоматическое развёртывание в продакшн
- **Инструменты**: GitHub Actions, GitLab CI, Jenkins, CircleCI

Преимущества:
- Раннее обнаружение ошибок
- Быстрые релизы
- Воспроизводимость сборок
- Автоматизация рутины`,
      },
      {
        kind: "code",
        title: "GitHub Actions workflow",
        code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
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
          pip install black flake8 mypy
      
      - name: Run linters
        run: |
          black --check .
          flake8 .
          mypy .
  
  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run tests
        run: pytest --cov=. --cov-report=xml
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/test_db
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          # Деплой через SSH или API
          echo "Deploying to production..."`,
      },
      {
        kind: "text",
        md: `## Распределённые хранилища

Когда данные не помещаются на один сервер:
- **Шардирование** — разделение данных по серверам
- **Репликация** — копирование данных для отказоустойчивости
- **Распределённые БД** — Cassandra, MongoDB, CockroachDB

Проблемы:
- Сетевые задержки
- Консистентность данных
- Сложность операций`,
      },
      {
        kind: "code",
        title: "Шардирование PostgreSQL",
        code: `# Шардирование PostgreSQL с помощью PgBouncer и Citus

# Установка Citus (расширение для шардирования)
# CREATE EXTENSION citus;

# Создание распределённой таблицы
SELECT create_distributed_table('videos', 'id');

# Добавление шардов
SELECT master_add_node('shard1.example.com', 5432);
SELECT master_add_node('shard2.example.com', 5432);

# Данные автоматически распределяются по шардам
# Запросы маршрутизируются через coordinator

# Пример: вставка данных
INSERT INTO videos (id, title, category) VALUES
(1, 'Video 1', 'tech'),
(2, 'Video 2', 'music'),
(3, 'Video 3', 'tech');

# Запрос автоматически идёт на нужный шард
SELECT * FROM videos WHERE id = 1;`,
      },
      {
        kind: "text",
        md: `## ELK-стек (Elasticsearch, Logstash, Kibana)

Централизованное логирование:
- **Elasticsearch** — хранение и поиск логов
- **Logstash** — сбор и обработка логов
- **Kibana** — визуализация и дашборды

Альтернативы:
- **Loki** + Grafana (легковесная альтернатива)
- **Fluentd** + Elasticsearch`,
      },
      {
        kind: "code",
        title: "Настройка ELK-стека",
        code: `# docker-compose.yml для ELK-стека
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - es_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5000:5000"
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

volumes:
  es_data:

# logstash/pipeline/logstash.conf
# input {
#   beats {
#     port => 5000
#   }
# }
# 
# filter {
#   json {
#     source => "message"
#   }
# }
# 
# output {
#   elasticsearch {
#     hosts => ["elasticsearch:9200"]
#     index => "logs-%{+YYYY.MM.dd}"
#   }
# }`,
      },
      {
        kind: "text",
        md: `## Sentry — мониторинг ошибок

Sentry — платформа для трекинга ошибок:
- Автоматический сбор stack traces
- Контекст запроса (user, request, environment)
- Уведомления (email, Slack)
- Performance monitoring
- Release tracking`,
      },
      {
        kind: "code",
        title: "Интеграция Sentry",
        code: `import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from fastapi import FastAPI

# Инициализация Sentry
sentry_sdk.init(
    dsn="https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations=[
        FastApiIntegration(transaction_style="endpoint"),
        SqlalchemyIntegration()
    ],
    traces_sample_rate=1.0,  # 100% транзакций для трейсинга
    environment="production",
    release="1.0.0"
)

app = FastAPI()

@app.get("/api/videos/{video_id}")
async def get_video(video_id: int):
    try:
        video = await db.get_video(video_id)
        if not video:
            raise ValueError(f"Video {video_id} not found")
        return video
    except Exception as e:
        # Sentry автоматически захватит исключение
        sentry_sdk.capture_exception(e)
        raise

# Добавление контекста
@app.middleware("http")
async def sentry_middleware(request, call_next):
    with sentry_sdk.configure_scope() as scope:
        scope.set_user({"id": request.headers.get("X-User-ID")})
        scope.set_tag("path", request.url.path)
    
    response = await call_next(request)
    return response`,
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

  // ========== СПРИНТ 10: Сервис нотификаций ==========
  {
    id: "be19",
    language: "python",
    title: "Сервис нотификаций и коммуникаций",
    subtitle: "Email, SMS, WebSocket, RabbitMQ, шаблонизация, массовые рассылки",
    minutes: 50,
    blocks: [
      {
        kind: "text",
        md: `## Архитектура сервиса нотификаций

Сервис нотификаций — централизованная система отправки сообщений пользователям через различные каналы:
- **Email** — основная коммуникация
- **SMS** — срочные уведомления
- **Push** — мобильные уведомления
- **WebSocket** — real-time обновления

Принципы проектирования:
- **Единая политика контактов** — централизованное управление предпочтениями пользователей
- **Идемпотентность** — защита от дублирования сообщений
- **Rate limiting** — контроль частоты отправки
- **Retry mechanism** — автоматические повторные попытки при сбоях
- **Template engine** — шаблонизация для персонализации`,
      },
      {
        kind: "code",
        title: "Модель уведомлений",
        code: `from dataclasses import dataclass
from enum import Enum
from typing import Optional
from datetime import datetime

class NotificationType(Enum):
    EMAIL = "email"
    SMS = "sms"
    PUSH = "push"
    WEBSOCKET = "websocket"

class NotificationPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

@dataclass
class Notification:
    id: str
    user_id: int
    type: NotificationType
    priority: NotificationPriority
    template: str
    context: dict
    created_at: datetime
    sent_at: Optional[datetime] = None
    status: str = "pending"  # pending, sent, failed

@dataclass
class UserPreferences:
    user_id: int
    email_enabled: bool = True
    sms_enabled: bool = False
    push_enabled: bool = True
    email_frequency: str = "immediate"  # immediate, daily, weekly`,
      },
      {
        kind: "text",
        md: `## Шаблонизация email

Используйте Jinja2 для создания динамических шаблонов:
- **Переменные** — подстановка данных пользователя
- **Циклы** — списки товаров, заказов
- **Условия** — персонализация контента
- **Наследование** — базовые шаблоны для бренда`,
      },
      {
        kind: "code",
        title: "Email шаблонизация",
        code: `from jinja2 import Environment, FileSystemLoader
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib

class EmailService:
    def __init__(self, smtp_host, smtp_port, username, password):
        self.env = Environment(loader=FileSystemLoader('templates/email'))
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
    
    def render_template(self, template_name: str, context: dict) -> str:
        """Рендеринг HTML шаблона"""
        template = self.env.get_template(template_name)
        return template.render(**context)
    
    def send_email(self, to: str, subject: str, template: str, context: dict):
        """Отправка email"""
        html_content = self.render_template(template, context)
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = self.username
        msg['To'] = to
        
        # HTML версия
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Отправка через SMTP
        with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)

# Использование
email_service = EmailService(
    smtp_host='smtp.gmail.com',
    smtp_port=587,
    username='noreply@example.com',
    password='your-password'
)

email_service.send_email(
    to='user@example.com',
    subject='Добро пожаловать!',
    template='welcome.html',
    context={'username': 'Иван', 'activation_link': 'https://...'}
)`,
      },
      {
        kind: "text",
        md: `## RabbitMQ для очередей сообщений

RabbitMQ — брокер сообщений для асинхронной обработки:
- **Producer** — отправляет сообщения в очередь
- **Consumer** — обрабатывает сообщения из очереди
- **Exchange** — маршрутизация сообщений
- **Queue** — хранение сообщений до обработки

Преимущества:
- Разгрузка основного приложения
- Гарантия доставки
- Масштабируемость
- Retry mechanism`,
      },
      {
        kind: "code",
        title: "RabbitMQ producer и consumer",
        code: `import pika
import json
from typing import Callable

class NotificationProducer:
    def __init__(self, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host)
        )
        self.channel = self.connection.channel()
        
        # Объявление exchange и queue
        self.channel.exchange_declare(
            exchange='notifications',
            exchange_type='direct'
        )
        self.channel.queue_declare(queue='email_queue')
        self.channel.queue_declare(queue='sms_queue')
    
    def send_notification(self, notification_type: str, data: dict):
        """Отправка уведомления в очередь"""
        self.channel.basic_publish(
            exchange='notifications',
            routing_key=notification_type,
            body=json.dumps(data),
            properties=pika.BasicProperties(delivery_mode=2)  # persistent
        )

class NotificationConsumer:
    def __init__(self, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host)
        )
        self.channel = self.connection.channel()
    
    def consume(self, queue_name: str, callback: Callable):
        """Обработка сообщений из очереди"""
        def wrapped_callback(ch, method, properties, body):
            data = json.loads(body)
            try:
                callback(data)
                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as e:
                # Retry через 5 секунд
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
                raise
        
        self.channel.basic_consume(
            queue=queue_name,
            on_message_callback=wrapped_callback
        )
        self.channel.start_consuming()

# Использование
producer = NotificationProducer()
producer.send_notification('email', {
    'to': 'user@example.com',
    'template': 'welcome',
    'context': {'username': 'Иван'}
})

# Consumer в отдельном процессе
def process_email(data):
    print(f"Sending email to {data['to']}")
    # Логика отправки email

consumer = NotificationConsumer()
consumer.consume('email_queue', process_email)`,
      },
      {
        kind: "text",
        md: `## WebSocket для real-time уведомлений

WebSocket обеспечивает двустороннюю связь между клиентом и сервером:
- **Низкая задержка** — мгновенная доставка
- **Persistent connection** — постоянное соединение
- **Bidirectional** — сервер может отправлять данные клиенту

Используйте FastAPI с WebSocket для real-time обновлений.`,
      },
      {
        kind: "code",
        title: "WebSocket сервер",
        code: `from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
import asyncio

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)
    
    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket)
    try:
        while True:
            # Получение сообщений от клиента
            data = await websocket.receive_json()
            print(f"Received from user {user_id}: {data}")
            
            # Отправка подтверждения
            await manager.send_personal_message(
                {"type": "ack", "message": "Received"},
                websocket
            )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"User {user_id} disconnected")

# Отправка уведомления всем подключённым пользователям
async def send_notification_to_all(notification: dict):
    await manager.broadcast({
        "type": "notification",
        "data": notification
    })

# Интеграция с RabbitMQ
async def process_notifications():
    consumer = NotificationConsumer()
    
    def handle_notification(data):
        asyncio.create_task(
            send_notification_to_all(data)
        )
    
    consumer.consume('websocket_queue', handle_notification)`,
      },
      {
        kind: "text",
        md: `## Массовые рассылки и сокращённые ссылки

Для массовых рассылок используйте:
- **Batch processing** — отправка пакетами
- **Rate limiting** — контроль скорости отправки
- **Unsubscribe mechanism** — обязательная возможность отписки
- **Tracking** — отслеживание открытых писем

Для сокращённых ссылок:
- **URL shortener** — сервис сокращения ссылок
- **Analytics** — статистика переходов
- **Expiration** — срок действия ссылок`,
      },
      {
        kind: "code",
        title: "Batch email sending",
        code: `from typing import List
import time

class BatchEmailSender:
    def __init__(self, email_service: EmailService, rate_limit: int = 100):
        self.email_service = email_service
        self.rate_limit = rate_limit  # писем в минуту
    
    def send_batch(self, recipients: List[dict], template: str, context: dict):
        """Массовая отправка с rate limiting"""
        sent_count = 0
        start_time = time.time()
        
        for recipient in recipients:
            # Проверка rate limit
            elapsed = time.time() - start_time
            if sent_count >= self.rate_limit and elapsed < 60:
                sleep_time = 60 - elapsed
                print(f"Rate limit reached. Sleeping for {sleep_time:.2f}s")
                time.sleep(sleep_time)
                start_time = time.time()
                sent_count = 0
            
            # Отправка письма
            try:
                self.email_service.send_email(
                    to=recipient['email'],
                    subject=context.get('subject', 'Notification'),
                    template=template,
                    context={**context, **recipient}
                )
                sent_count += 1
                print(f"Sent to {recipient['email']}")
            except Exception as e:
                print(f"Failed to send to {recipient['email']}: {e}")
        
        print(f"Batch completed. Sent: {sent_count}/{len(recipients)}")

# Использование
sender = BatchEmailSender(email_service, rate_limit=100)
recipients = [
    {'email': 'user1@example.com', 'username': 'Иван'},
    {'email': 'user2@example.com', 'username': 'Мария'},
    # ... тысячи получателей
]

sender.send_batch(
    recipients=recipients,
    template='newsletter.html',
    context={
        'subject': 'Еженедельная рассылка',
        'unsubscribe_url': 'https://example.com/unsubscribe'
    }
)`,
      },
      {
        kind: "warn",
        title: "Безопасность и compliance",
        md: `При работе с уведомлениями соблюдайте:
- **GDPR** — согласие на обработку данных
- **CAN-SPAM** — обязательная ссылка отписки
- **Rate limiting** — защита от спама
- **Data encryption** — шифрование чувствительных данных
- **Audit log** — логирование всех отправок`,
      },
    ],
    quiz: [
      {
        q: "Какой протокол используется для real-time уведомлений?",
        options: [
          "HTTP",
          "WebSocket",
          "FTP",
          "SMTP",
        ],
        answer: 1,
        explain: "WebSocket обеспечивает двустороннюю связь с низкой задержкой для real-time обновлений.",
      },
      {
        q: "Для чего используется RabbitMQ в сервисе нотификаций?",
        options: [
          "Хранение шаблонов",
          "Асинхронная обработка сообщений",
          "Отправка email",
          "Управление пользователями",
        ],
        answer: 1,
        explain: "RabbitMQ — брокер сообщений для асинхронной обработки, разгрузки основного приложения и гарантии доставки.",
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
        starter: `from typing import Dict, List

class NotificationWebSocket:
    def __init__(self):
        self.connections: Dict[int, List] = {}
    
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
        solution: `from typing import Dict, List

class NotificationWebSocket:
    def __init__(self):
        self.connections: Dict[int, List] = {}
    
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
