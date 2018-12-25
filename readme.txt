Материаллы:
# Express: основы и Middleware
https://www.youtube.com/watch?v=2Xp9yj3UIAg&list=PLDyvV36pndZFWfEQpNixIHVvp191Hb3Gg&index=30

1. Создаем костяк
# Базовое приложение под фреймворком "Express".
npm i -g express
# Модуль для генерации фрагментов Express. С v4 вынесен в отдельный модуль.
npm install -g express-generator
# ??? ХЗ для чего. Нужно пересмотреть лекцию
npm install -g connect
# Модуль для работы с конфигурационными файлами
npm i nconf
# Модуль для логирования.
npm i winston

# Загружаем зависимости (подтянется то, что написано в "package.json").
npm i

# Информация о командах-помошниках фреймворка "Express". 
express --help

# Подключаем поддержку сессий(-s) и шаблонизатора "-e"(ejs)
express -e -s
# Задаем параметры работы
## package.json
Для windows, чтобы nodeJS находил модули, устанавливаем переменную окружения "NODE_PATH"
Иначе упадет с ошибкой следующее выражение: var config = require('config');
В package.json, в опцию "scripts/start" записываем:
"start": " set NODE_PATH=.&set NODE_ENV=development&nodemon app.js﻿"
## В опциях запуска PHPStorm.
Menu/Run/Edit Configurations/Environment Variables/Add:
NODE_PATH=.