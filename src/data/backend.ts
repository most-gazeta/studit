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
];
