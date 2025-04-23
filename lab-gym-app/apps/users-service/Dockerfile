# Dockerfile для микросервиса users-service

# Используем официальный образ Node.js на базе Alpine Linux
FROM node:22-alpine AS build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшийся исходный код
COPY . .

# Собираем TypeScript в JavaScript (если используется компиляция)
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main.js"]
