# BeautySalon

Статическое SPA на ванильном JavaScript: без сборщиков, npm-зависимостей и серверного рендеринга.

## Запуск
Откройте проект через локальный HTTP-сервер (например, Live Server в VS Code). ES-модули и `fetch()` не работают корректно при открытии через `file://`.

## Структура
- `index.html` — HTML shell приложения.
- `src/app.js` — точка входа и глобальные обработчики UI.
- `src/app/router.js` — hash-маршрутизация и загрузка страниц.
- `src/components/` — общие header, footer и booking modal.
- `pages/` — HTML-фрагменты страниц, загружаемые через `fetch()`.
- `styles/style.css` — общая дизайн-система и стили страниц.
- `scripts/script.js` — прежняя логика, пока не подключается в SPA shell.

## Маршруты
- `#/home` — главная.
- `#/services/hardware-massages` — аппаратные массажи.
