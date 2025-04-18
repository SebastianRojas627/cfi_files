import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API documentation for my project')
  .setVersion('1.0')
  //.addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const uploadPath = configService.get<string>('UPLOAD_PATH');

  app.use('/files', express.static(join(process.cwd(), uploadPath || '', '')));

  await app.listen(process.env.PORT ?? 5002);
}
bootstrap();
