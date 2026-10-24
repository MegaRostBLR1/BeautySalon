# BeautySalon

Статический многостраничный сайт на ванильном JavaScript: без сборщиков, npm-зависимостей и серверного рендеринга.

## Запуск
Откройте проект через локальный HTTP-сервер (например, Live Server в VS Code). ES-модули и `fetch()` не работают корректно при открытии через `file://`.

## Структура
- `index.html` — HTML shell приложения.
- `src/app.js` — точка входа и глобальные обработчики UI.
- `src/components/` — общие header, footer и booking modal.
- `src/pages/` — исходные HTML-фрагменты страниц.
- `services/*/index.html` — самостоятельные HTML-страницы с чистыми URL.
- `styles/style.css` — общая дизайн-система и стили страниц.

## Страницы
- `/` — главная.
- `/services/hardware-massages/` — аппаратные массажи.
- `/services/manual-massages/` — ручные массажи.
- `/services/weight-loss/` — программы похудения.
- `/services/hair-services/` — парикмахерские услуги.

На GitHub Pages проект доступен с префиксом `/BeautySalon/`; после подключения домена базовый путь автоматически станет `/`.