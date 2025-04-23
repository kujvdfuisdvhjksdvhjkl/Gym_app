# apps/clients-service/Dockerfile

FROM node:22-alpine AS build
WORKDIR /app

# Копируем package.json + package-lock.json
COPY package*.json ./

# Устанавливаем зависимости и билдим
RUN npm install
COPY . .
RUN npm run build

# Финальный образ на Alpine+Node для продакшена
FROM node:22-alpine AS runtime

WORKDIR /app

# Копируем только то, что нужно для запуска
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Переменные окружения (необязательно, можно задавать в Compose)
ENV NODE_ENV=production

# Запускаем скомпилированный код
CMD ["node", "dist/main.js"]
