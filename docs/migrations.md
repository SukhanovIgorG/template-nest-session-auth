# Миграции TypeORM

Этот проект использует TypeORM (v0.3.x) и `ts-node` для генерации и выполнения миграций на основе `DataSource` в `src/database/data-source.ts`.

## Предпосылки

- Заполнены переменные окружения для Postgres (`POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`).
- Сервис БД запущен и доступен.
- Установлены зависимости проекта (`npm install`).

## Где лежат миграции

- Папка: `src/database/migrations`
- Конфигурация DataSource указывает путь `migrations: [__dirname + '/migrations/*.{ts,js}']`.
  Это означает, что при запуске через `ts-node` используются `*.ts`, а после сборки — `dist/database/migrations/*.js`.

## Основные команды

Все команды используют общий DataSource `src/database/data-source.ts`.

- Сгенерировать миграцию из изменений сущностей:
  - `npm run migration:generate -- src/database/migrations/<Name>`
  - Пример: `npm run migration:generate -- src/database/migrations/InitUser`

- Создать пустую миграцию вручную:
  - `npm run migration:create -- src/database/migrations/<Name>`
  - Пример: `npm run migration:create -- src/database/migrations/AddIndexes`

- Применить миграции:
  - `npm run migration:run`

- Откатить последнюю миграцию:
  - `npm run migration:revert`

- Посмотреть статус миграций:
  - `npm run migration:show`

## Рекомендации по использованию

- Перед `migration:generate` убедитесь, что сущности актуальны и проект собирается (`npm run build`).
- На production не используйте `synchronize`; применяйте миграции (`migration:run`).
- Имена миграций задавайте осмысленно (например, `AddRefreshTokenColumn`).

## Пример рабочего цикла

1. Обновите сущности (например, `src/users/user.entity.ts`).
2. Сгенерируйте миграцию: `npm run migration:generate -- src/database/migrations/AddRefreshTokenColumn`
3. Просмотрите и при необходимости поправьте сгенерированный файл в `src/database/migrations`.
4. Примените миграцию: `npm run migration:run`
5. Проверьте статус: `npm run migration:show`

## Применение после сборки

После `npm run build` можно запускать миграции на основе скомпилированного JS:

- `node ./node_modules/typeorm/cli.js migration:run -d dist/database/data-source.js`
- `node ./node_modules/typeorm/cli.js migration:revert -d dist/database/data-source.js`

Это удобно для серверов, где нет `ts-node`.

// для запусков команд внутри докер контейнера:

```
docker exec -it nest_backend npm run migration:run
```
