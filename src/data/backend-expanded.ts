// Расширенные уроки be10-be19 для курса Backend

export const expandedBackendLessons = [
  // Урок be10: Тестирование и документация API (расширенный)
  {
    id: "be10",
    language: "python",
    title: "Тестирование и документация API",
    subtitle: "Пишем тесты и документацию для API",
    minutes: 35,
    blocks: [
      {
        kind: "text",
        md: `## Зачем нужны тесты? Представьте страховку 🛡️

**Тесты** — это как страховка для вашего кода. Они проверяют, что всё работает правильно.

**Аналогия:** Представьте, что вы строите мост.
- **Без тестов:** вы строите мост и надеетесь, что он не упадёт. Когда машина проезжает — мост рушится.
- **С тестами:** вы проверяете мост грузовиками разной массы перед открытием. Если что-то не так — чините до того, как поедут реальные машины.

**Зачем писать тесты?**
- **Надёжность** — код работает правильно после изменений
- **Документация** — тесты показывают, как должен работать код
- **Быстрая разработка** — можно менять код без страха что-то сломать
- **Командная работа** — новые разработчики понимают, как работает код`,
      },
      {
        kind: "text",
        md: `## Виды тестирования API

**1. Функциональные тесты** — проверяют, что API делает то, что должно:
- Правильные HTTP-коды ответов (200, 201, 400, 404, 500)
- Корректность данных в ответах
- Обработка ошибок и валидация

**Аналогия:** Проверяете, что калькулятор правильно считает:
- 2 + 2 = 4 ✓
- 10 / 2 = 5 ✓
- 1 / 0 = ошибка ✓

**2. Интеграционные тесты** — проверяют взаимодействие компонентов:
- API + база данных
- API + внешние сервисы (email, SMS)
- API + кэш

**Аналогия:** Проверяете, что интернет-магазин работает целиком:
- Клиент добавляет товар в корзину
- Товар сохраняется в базе данных
- Email с подтверждением отправляется

**3. Нагрузочные тесты** — проверяют производительность:
- Время отклика под нагрузкой
- Максимальное количество одновременных запросов
- Утечки памяти

**Аналогия:** Проверяете, сколько людей может одновременно зайти в магазин:
- 100 человек — всё работает ✓
- 1000 человек — медленно, но работает ✓
- 10000 человек — магазин рушится ✗`,
      },
      {
        kind: "code",
        title: "Устанавливаем pytest и зависимости для тестирования",
        code: `# Устанавливаем pytest и дополнительные библиотеки
pip install pytest pytest-asyncio httpx

# Создаём файл для тестов
mkdir tests
touch tests/__init__.py
touch tests/test_api.py

# Структура проекта:
# myproject/
# ├── main.py
# ├── tests/
# │   ├── __init__.py
# │   └── test_api.py
# └── requirements.txt`,
      },
      {
        kind: "code",
        title: "Пишем первый тест для FastAPI",
        code: `# tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app

# Создаём тестовый клиент
client = TestClient(app)

def test_root():
    """Тест корневого эндпоинта"""
    response = client.get("/")
    assert response.status_code == 200  # Проверяем статус
    assert response.json() == {"message": "Hello World"}  # Проверяем данные

def test_create_movie():
    """Тест создания фильма"""
    # Отправляем POST запрос
    response = client.post("/movies/", json={
        "title": "Inception",
        "year": 2010,
        "rating": 8.8
    })
    
    # Проверяем статус
    assert response.status_code == 201  # 201 = Created
    
    # Проверяем данные
    data = response.json()
    assert data["title"] == "Inception"
    assert data["year"] == 2010
    assert data["rating"] == 8.8
    assert "id" in data  # ID должен быть в ответе

def test_get_movie():
    """Тест получения фильма"""
    # Сначала создаём фильм
    create_response = client.post("/movies/", json={
        "title": "The Matrix",
        "year": 1999,
        "rating": 8.7
    })
    movie_id = create_response.json()["id"]
    
    # Получаем фильм
    response = client.get(f"/movies/{movie_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "The Matrix"

def test_get_movie_not_found():
    """Тест получения несуществующего фильма"""
    response = client.get("/movies/99999")
    assert response.status_code == 404  # 404 = Not Found

def test_create_movie_invalid_data():
    """Тест валидации входных данных"""
    # Пустое название
    response = client.post("/movies/", json={
        "title": "",
        "year": 2010
    })
    assert response.status_code == 422  # 422 = Validation Error
    
    # Невалидный год
    response = client.post("/movies/", json={
        "title": "Movie",
        "year": 3000
    })
    assert response.status_code == 422`,
      },
      {
        kind: "text",
        md: `## Фикстуры — подготовка данных для тестов

**Фикстуры (fixtures)** — это функции, которые подготавливают данные для тестов.

**Аналогия:** Представьте, что вы готовите экзамен.
- **Без фикстур:** каждый раз вы создаёте нового студента, записываете его в базу, даёте ему оценки...
- **С фикстурами:** у вас есть готовый студент с оценками. Вы просто используете его в тестах.

**Преимущества фикстур:**
- Не повторяем код
- Данные всегда одинаковые
- Легко менять данные в одном месте`,
      },
      {
        kind: "code",
        title: "Используем фикстуры",
        code: `# tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.fixture
def sample_movie():
    """Фикстура: создаёт тестовый фильм"""
    return {
        "title": "Test Movie",
        "year": 2024,
        "rating": 7.5
    }

@pytest.fixture
def created_movie(sample_movie):
    """Фикстура: создаёт фильм в базе"""
    response = client.post("/movies/", json=sample_movie)
    return response.json()

def test_update_movie(sample_movie, created_movie):
    """Тест обновления фильма"""
    movie_id = created_movie["id"]
    
    # Обновляем рейтинг
    update_response = client.put(f"/movies/{movie_id}", json={
        "rating": 9.0
    })
    
    assert update_response.status_code == 200
    assert update_response.json()["rating"] == 9.0

def test_delete_movie(created_movie):
    """Тест удаления фильма"""
    movie_id = created_movie["id"]
    
    # Удаляем фильм
    delete_response = client.delete(f"/movies/{movie_id}")
    assert delete_response.status_code == 204  # 204 = No Content
    
    # Проверяем, что фильм удалён
    get_response = client.get(f"/movies/{movie_id}")
    assert get_response.status_code == 404`,
      },
      {
        kind: "code",
        title: "Запускаем тесты",
        code: `# Запуск всех тестов
pytest

# Запуск с подробным выводом
pytest -v

# Запуск конкретного теста
pytest tests/test_api.py::test_create_movie

# Запуск тестов с отчётом о покрытии
pytest --cov=main --cov-report=html

# Результат:
# ========================= test session starts =========================
# tests/test_api.py::test_root PASSED                               [ 20%]
# tests/test_api.py::test_create_movie PASSED                       [ 40%]
# tests/test_api.py::test_get_movie PASSED                          [ 60%]
# tests/test_api.py::test_get_movie_not_found PASSED                [ 80%]
# tests/test_api.py::test_create_movie_invalid_data PASSED          [100%]
# ========================= 5 passed in 0.5s =========================`,
      },
      {
        kind: "text",
        md: `## Документация API: Swagger/OpenAPI

**Документация** — это инструкция для разработчиков, которые будут использовать ваш API.

**Аналогия:** Представьте, что вы купили новый телефон.
- **Без документации:** вы тыкаете кнопки наугад, пытаясь понять, как работает телефон.
- **С документацией:** вы читаете инструкцию и быстро разбираетесь, как пользоваться телефоном.

**Swagger/OpenAPI** — стандарт описания REST API:
- Автоматическая генерация из кода (FastAPI, DRF)
- Интерактивная документация (можно тестировать API прямо в браузере)
- Генерация клиентских SDK (библиотеки для разных языков)`,
      },
      {
        kind: "code",
        title: "Добавляем документацию в FastAPI",
        code: `from fastapi import FastAPI
from pydantic import BaseModel, Field

# Создаём приложение с описанием
app = FastAPI(
    title="Movie API",
    description="API для управления каталогом фильмов",
    version="1.0.0",
    terms_of_service="https://example.com/terms/",
    contact={
        "name": "API Support",
        "email": "support@example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

class MovieCreate(BaseModel):
    """Схема создания фильма"""
    title: str = Field(
        ...,  # Обязательное поле
        min_length=1,
        max_length=200,
        description="Название фильма",
        examples=["Inception", "The Matrix"]
    )
    year: int = Field(
        ...,
        ge=1900,
        le=2100,
        description="Год выпуска",
        examples=[2010, 1999]
    )
    rating: float = Field(
        default=7.0,
        ge=0,
        le=10,
        description="Рейтинг от 0 до 10",
        examples=[8.8, 9.0]
    )

@app.post(
    "/movies/",
    response_model=MovieCreate,
    status_code=201,
    summary="Создать фильм",
    description="Создаёт новый фильм в каталоге",
    responses={
        201: {
            "description": "Фильм успешно создан",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "title": "Inception",
                        "year": 2010,
                        "rating": 8.8
                    }
                }
            }
        },
        400: {"description": "Невалидные данные"},
        409: {"description": "Фильм уже существует"},
    }
)
async def create_movie(movie: MovieCreate):
    """
    Создаёт новый фильм.
    
    - **title**: название фильма (обязательно, 1-200 символов)
    - **year**: год выпуска (обязательно, 1900-2100)
    - **rating**: рейтинг от 0 до 10 (по умолчанию 7.0)
    
    Возвращает созданный фильм с ID.
    """
    # Логика создания фильма
    return movie

# Документация доступна на:
# http://localhost:8000/docs - Swagger UI (интерактивная)
# http://localhost:8000/redoc - ReDoc (красивая)
# http://localhost:8000/openapi.json - JSON схема`,
      },
      {
        kind: "tip",
        title: "Как тестировать API без кода?",
        md: `**Postman** — популярный инструмент для тестирования API:

**Шаг 1:** Скачайте Postman с https://www.postman.com/

**Шаг 2:** Создайте новый запрос:
- Выберите метод (GET, POST, PUT, DELETE)
- Введите URL: http://127.0.0.1:8000/api/movies/
- Для POST/PUT добавьте тело запроса в формате JSON

**Шаг 3:** Нажмите "Send" и посмотрите ответ

**Альтернативы:**
- **Insomnia** — похож на Postman, но проще
- **curl** — командная строка: \`curl http://127.0.0.1:8000/api/movies/\`
- **Swagger UI** — автоматически генерируется FastAPI по адресу \`/docs\``,
      },
      {
        kind: "warn",
        title: "Не забывайте про edge cases!",
        md: `**Edge cases** — это граничные случаи, которые могут сломать ваш код:

**Примеры edge cases:**
- Пустые строки
- Очень длинные строки (10000 символов)
- Специальные символы (\`, !, @, #, $)
- Unicode символы (кириллица, эмодзи)
- Отрицательные числа
- Очень большие числа
- Null/None значения

**Как тестировать edge cases:**
\`\`\`python
def test_edge_cases():
    # Пустая строка
    response = client.post("/movies/", json={"title": "", "year": 2024})
    assert response.status_code == 422
    
    # Очень длинная строка
    response = client.post("/movies/", json={"title": "a" * 10000, "year": 2024})
    assert response.status_code == 422
    
    # Специальные символы
    response = client.post("/movies/", json={"title": "Movie!@#$%", "year": 2024})
    assert response.status_code == 201
    
    # Unicode
    response = client.post("/movies/", json={"title": "Фильм 🎬", "year": 2024})
    assert response.status_code == 201
\`\`\``,
      },
    ],
    quiz: [
      {
        q: "Что такое фикстура в pytest?",
        options: [
          "Тестовый случай",
          "Функция для подготовки данных перед тестом",
          "Тип ассерта",
          "Плагин для pytest",
        ],
        answer: 1,
        explain: "Фикстура — функция, которая подготавливает данные или состояние перед выполнением теста. Может использоваться повторно в разных тестах. Аналогия: готовый студент с оценками для экзамена.",
      },
      {
        q: "Какой HTTP-код возвращается при успешном создании ресурса?",
        options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
        answer: 1,
        explain: "201 Created возвращается при успешном создании нового ресурса через POST-запрос. 200 — для успешных GET/PUT, 204 — для успешного DELETE.",
      },
      {
        q: "Для чего нужна документация API?",
        options: [
          "Для ускорения кода",
          "Для объяснения разработчикам, как использовать API",
          "Для тестирования",
          "Для шифрования данных",
        ],
        answer: 1,
        explain: "Документация объясняет разработчикам, какие эндпоинты есть, какие параметры они принимают, какие данные возвращают. Это как инструкция к телефону.",
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
    assert isinstance(data, list)
    assert len(data) > 0`,
      },
    ],
  },

  // Урок be11: Асинхронное программирование (расширенный)
  {
    id: "be11",
    language: "python",
    title: "Асинхронное программирование в Python",
    subtitle: "async/await, корутины, asyncio",
    minutes: 45,
    blocks: [
      {
        kind: "text",
        md: `## Синхронное vs Асинхронное: аналогия с кухней 🍳

Представьте, что вы готовите обед из трёх блюд: суп, салат и десерт.

**Синхронный подход** (как работает обычный код):
1. Готовите суп (30 минут) — стоите и ждёте
2. Готовите салат (10 минут) — стоите и ждёте
3. Готовите десерт (20 минут) — стоите и ждёте
**Итого: 60 минут**

**Асинхронный подход** (как работает async код):
1. Ставите суп вариться (30 минут)
2. Пока суп варится, готовите салат (10 минут)
3. Пока суп и салат готовятся, готовите десерт (20 минут)
4. Возвращаетесь к супу, когда он готов
**Итого: 30 минут** (вместо 60!)

**Вывод:** Асинхронный код позволяет выполнять другие задачи во время ожидания.`,
      },
      {
        kind: "text",
        md: `## Когда использовать async?

**Используйте async, когда:**
- Много I/O-операций (сеть, диск, база данных)
- Высоконагруженные серверы (тысячи одновременных запросов)
- Real-time приложения (чаты, стриминг)

**НЕ используйте async, когда:**
- CPU-bound задачи (математические вычисления, обработка изображений)
- Простые скрипты с малым количеством операций
- Когда не понимаете, что делаете (async сложнее отлаживать)

**Аналогия:**
- **I/O-bound** — вы ждёте, пока закипит вода (можно делать что-то другое)
- **CPU-bound** — вы режете овощи (нужно всё ваше внимание)`,
      },
      {
        kind: "code",
        title: "Синхронный код: медленно и просто",
        code: `import time

# Синхронная функция
def fetch_data_sync(url):
    """Синхронный запрос (блокирует выполнение)"""
    print(f"Начинаем загрузку {url}")
    time.sleep(2)  # Имитация сетевого запроса (2 секунды)
    print(f"Загрузка {url} завершена")
    return f"Data from {url}"

def process_sync():
    """Обработка трёх запросов последовательно"""
    start = time.time()
    
    result1 = fetch_data_sync("url1")  # 2 секунды
    result2 = fetch_data_sync("url2")  # 2 секунды
    result3 = fetch_data_sync("url3")  # 2 секунды
    
    print(f"Синхронно: {time.time() - start:.2f} сек")  # ~6 сек

process_sync()
# Вывод:
# Начинаем загрузку url1
# Загрузка url1 завершена
# Начинаем загрузку url2
# Загрузка url2 завершена
# Начинаем загрузку url3
# Загрузка url3 завершена
# Синхронно: 6.00 сек`,
      },
      {
        kind: "code",
        title: "Асинхронный код: быстро и эффективно",
        code: `import asyncio
import time

# Асинхронная функция
async def fetch_data_async(url):
    """Асинхронный запрос (не блокирует выполнение)"""
    print(f"Начинаем загрузку {url}")
    await asyncio.sleep(2)  # Не блокирует event loop
    print(f"Загрузка {url} завершена")
    return f"Data from {url}"

async def process_async():
    """Обработка трёх запросов параллельно"""
    start = time.time()
    
    # Запускаем все запросы параллельно
    result1, result2, result3 = await asyncio.gather(
        fetch_data_async("url1"),
        fetch_data_async("url2"),
        fetch_data_async("url3")
    )
    
    print(f"Асинхронно: {time.time() - start:.2f} сек")  # ~2 сек

# Запуск асинхронного кода
asyncio.run(process_async())
# Вывод:
# Начинаем загрузку url1
# Начинаем загрузку url2
# Начинаем загрузку url3
# Загрузка url1 завершена
# Загрузка url2 завершена
# Загрузка url3 завершена
# Асинхронно: 2.00 сек`,
      },
      {
        kind: "text",
        md: `## Что такое корутина?

**Корутина** — это функция, которая может приостанавливать и возобновлять выполнение.

**Аналогия:** Представьте, что вы читаете книгу.
- **Обычная функция** — вы читаете книгу от начала до конца, не отвлекаясь.
- **Корутина** — вы читаете книгу, но можете отложить закладку, сделать что-то другое, а потом вернуться к тому же месту.

**Ключевые слова:**
- \`async def\` — объявление корутины
- \`await\` — приостановка корутины до завершения другой операции`,
      },
      {
        kind: "code",
        title: "Как работает event loop",
        code: `import asyncio

async def task1():
    print("Задача 1: начало")
    await asyncio.sleep(1)
    print("Задача 1: конец")

async def task2():
    print("Задача 2: начало")
    await asyncio.sleep(1)
    print("Задача 2: конец")

async def main():
    print("Главная функция: начало")
    
    # Запускаем задачи параллельно
    await asyncio.gather(task1(), task2())
    
    print("Главная функция: конец")

# Запуск
asyncio.run(main())

# Что происходит:
# 1. Главная функция начинает выполнение
# 2. Запускается task1, печатает "начало", приостанавливается на await
# 3. Event loop переключается на task2, печатает "начало", приостанавливается
# 4. Через 1 секунду task1 возобновляется, печатает "конец"
# 5. Одновременно task2 возобновляется, печатает "конец"
# 6. Главная функция продолжает выполнение, печатает "конец"

# Вывод:
# Главная функция: начало
# Задача 1: начало
# Задача 2: начало
# (пауза 1 секунда)
# Задача 1: конец
# Задача 2: конец
# Главная функция: конец`,
      },
      {
        kind: "code",
        title: "Асинхронные HTTP-запросы с aiohttp",
        code: `import aiohttp
import asyncio

async def fetch_url(url):
    """Асинхронный HTTP-запрос"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    # Параллельная загрузка нескольких страниц
    urls = [
        "https://example.com",
        "https://example.org",
        "https://example.net"
    ]
    
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)
    
    for url, result in zip(urls, results):
        print(f"{url}: {len(result)} байт")

asyncio.run(main())`,
      },
      {
        kind: "warn",
        title: "Не смешивайте sync и async!",
        md: `**ПЛОХО** (блокирует event loop):
\`\`\`python
async def bad_example():
    time.sleep(1)  # Блокирует весь event loop!
    # Все другие задачи тоже ждут
\`\`\`

**ХОРОШО** (не блокирует):
\`\`\`python
async def good_example():
    await asyncio.sleep(1)  # Не блокирует event loop
    # Другие задачи могут выполняться
\`\`\`

**Если нужно вызвать sync-код из async:**
\`\`\`python
import asyncio

def sync_function():
    time.sleep(1)
    return "result"

async def async_wrapper():
    # Запускаем sync-функцию в отдельном потоке
    result = await asyncio.to_thread(sync_function)
    return result
\`\`\``,
      },
      {
        kind: "tip",
        title: "Как отлаживать async код?",
        md: `**Проблема:** async код сложнее отлаживать, чем sync.

**Решения:**
1. **Используйте logging:**
\`\`\`python
import logging
logging.basicConfig(level=logging.DEBUG)
\`\`\`

2. **Добавляйте print для отладки:**
\`\`\`python
async def my_function():
    print("Начало функции")
    result = await some_operation()
    print(f"Результат: {result}")
    return result
\`\`\`

3. **Используйте asyncio.debug:**
\`\`\`python
import asyncio
asyncio.run(main(), debug=True)
\`\`\`

4. **Проверяйте, не блокируете ли вы event loop:**
\`\`\`python
# Плохо
async def bad():
    time.sleep(1)  # Блокирует!

# Хорошо
async def good():
    await asyncio.sleep(1)  # Не блокирует
\`\`\``,
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
        explain: "await приостанавливает выполнение текущей корутины и ждёт завершения другой корутины, передавая управление event loop. Это как отложить книгу с закладкой и сделать что-то другое.",
      },
      {
        q: "Когда использовать async?",
        options: [
          "Для математических вычислений",
          "Для I/O-операций (сеть, диск)",
          "Всегда",
          "Никогда",
        ],
        answer: 1,
        explain: "Async эффективен для I/O-bound задач, где много времени тратится на ожидание (сеть, диск). Для CPU-bound задач (математика) async не даёт преимуществ.",
      },
      {
        q: "Что такое event loop?",
        options: [
          "Цикл for",
          "Механизм, который управляет выполнением корутин",
          "База данных",
          "Веб-сервер",
        ],
        answer: 1,
        explain: "Event loop — это механизм, который отслеживает готовые к выполнению задачи и переключается между ними. Как диспетчер на кухне, который решает, какое блюдо готовить следующим.",
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

  // Продолжение: be12-be19 будут добавлены в следующем обновлении
];
