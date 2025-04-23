// apps/clients-service/src/main.ts

// Подключаем WebCrypto API для поддержки crypto.randomUUID в TypeORM
import { webcrypto } from 'crypto';
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto,
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для всех доменов (можно указать конкретные origin вместо true)
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // === Swagger setup ===
  const config = new DocumentBuilder()
    .setTitle('Clients API')
    .setDescription('Микросервис учёта клиентов')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // ======================

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`Clients service listening on http://localhost:${port}`);
}

void bootstrap();
