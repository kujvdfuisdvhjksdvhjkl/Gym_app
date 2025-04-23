# ===================================================================
# 1) Стадия сборки
# ===================================================================
FROM node:22-alpine AS build

# Устанавливаем рабочую директорию для всего репозитория
WORKDIR /app

# Копируем package-файлы фронтенда для кэширования npm install
COPY apps/frontend/package.json apps/frontend/package-lock.json ./apps/frontend/

# Устанавливаем зависимости фронтенда
RUN npm install --prefix apps/frontend

# Копируем весь исходник (включая libs/types), чтобы Vite мог разрешить алиасы
COPY . .

# Переходим в папку фронтенда и запускаем сборку
WORKDIR /app/apps/frontend
RUN npm run build

# ===================================================================
# 2) Стадия продакшена
# ===================================================================
FROM nginx:alpine

# Очищаем дефолтный контент
RUN rm -rf /usr/share/nginx/html/*

# Копируем собственный Nginx-конфиг для поддержки client-side routing
# файл лежит в apps/frontend/nginx.conf относительно контекста '.'
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем результаты сборки в веб-корень Nginx
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx в фореграунде
CMD ["nginx", "-g", "daemon off;"]
