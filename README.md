# CI_server_shri

### Запуск проекта 

Сервер и клиент запускаются вместе.

1. Зайти в папку ci-client, запустить `npm install`
2. Выйти в корневую папку, запустить `npm install`
3. Для того, чтобы сервер мог обращаться в Swagger UI, нужно добавить в корневую папку файл .env и прописать в нем 
`REACT_APP_API_KEY=<ваш ключ аутентификации>`
3. Запустить проект из корневой папки командой `yarn dev`

### Сценарии тестов

На данный момент написаны модульные тесты для проверки работы сервера. Это можно считать за отдельный логический блок.

Сценарии:
- достать настройки репозитория
- добавить настройки репозитория
- достать лист сборок
- достать детали сборки
- возвращение ошибки на запрос деталей сборки с пустым buildId
- достать лог сборки


Запустить тесты можно из корневой папки с помощью `npm test`.
Из лекции хотелось переиспользовать моки работы сервера, например брать buildId, чтобы прокидывать его в следующий вызов, но пока не получилось это сделать.
Также модульными тестами можно проверять работу отдельных реакт компонент, как было показано в лекции.

Интеграционные тесты остались в попытках установить hermione на мак с ошибкой `gyp: binding.gyp not found `

### Запуск билд-сервера и агентов

1. Для запуска билд-сервера `cd server && npm ci && npm start`
2. Для запуска билд-агента `cd client && npm ci && npm start`

### Локализация

1. По дефолту выставлен английский язык. Чтобы переключить язык на русский, нужно нажать снизу в футере на кнопку "Русская версия", если обратно на английский — "English version" там же. 
2. Такие типы контента как заголовки, любые пояснения в виде текста и текст на кнопках поддерживают переключение языка, реализовано при помощи библиотеки для реакта [i18next](https://www.i18next.com/) — одной из наиболее популярных и удобных для локализации реакт приложений.
3. Сборка приложения не изменилась, все переводы хранятся в отдельном файле в locales/ru.json, откуда достаются нужные переводы. 
