import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import express from 'express';
import { validateEnv } from './config/env';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  validateEnv();

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    helmet({
      contentSecurityPolicy: false, // allow APIs & Swagger later
    }),
  );

  app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later',
    skip: (req) => req.method === 'OPTIONS', // ✅ KEY LINE
  }),
);

  app.enableCors({
  origin: ['http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  app.use(express.json({ limit: '10kb' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
