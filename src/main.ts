import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  console.log("env ", process.env)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'uploads/avatars'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.MONGOPORT || 3000);
}
bootstrap();
