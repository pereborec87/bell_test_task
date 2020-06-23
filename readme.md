# Тестовое задание Bell Integrator

## Первые шаги для запуска
1. Установить gulp выполнив команду
```sh
npm i gulp -g
```
2. Установить webpack выполнив команду
```sh
npm i webpack -g
```
3. Выполнить команду
```sh
npm install
```
4. Выполнить команду
```sh
npm run build
```
5. Установить npm пакет http-server
```sh
npm i http-server -g
```
6. В корне репозитория выполнить команду 
```sh
http-server -p=8088
```
Порт может быть любым.
В браузере перейти по адресу localhost:<порт на котором запустился сервер> (например, localhost:8088)

## Команды для сборки js бандла
1. Production сборка
```sh
npm run build
```
2. Development сборка
```sh
npm run build:dev
```

3. Инкрементальная сборка
```sh
npm run build:watch
```

## Дополнительные gulp команды
1. Очистка каталога dist 
```sh
gulp clean
```

2. Копирование ресурсов изображений в каталог dist
```sh
gulp copy-images
```
3. Построение стилей
```sh
gulp scss
```

4. Инкрементальное построение стилей
```sh
gulp scss-dev
```