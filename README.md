# xieffect main app

Фронтенд основного приложения стартапа

### Описание

Монорепозиторий с основным приложением xi.front и пакетами в папке packages, покате локальные, не выложены в регистр, тк явялются логическими частями приложения

### Начало работы 

После того как вы склонирвоали репозиторий, установите пакеты, выполните в корне:
```
npm i
```

Чтобы у вас работали запросы на сервер, напишите @unknownproperty, он подскажет как установить нужную переменную окружения

Для локального запуска приложения используйте из корня
```
npm run dev
```
Команда запустит dev скрипт во всех пакетах и приложениях, но в пакетах такого скрипта нет, а так как у нас только одно приложение, то запуститься только оно
