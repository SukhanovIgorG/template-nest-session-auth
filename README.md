Инструкция по запуску

1. Добавить .env

```
# App
PORT=3000

# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=0000
POSTGRES_DB=postgres_db
```

2. Запустить

Запуск в режиме разработки

```
yarn docker:dev
```

Запуск в режиме продакшена

```
yarn docker:prod
```

Остановить сервис

```
yarn docker:down
```
