import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { AppModule } from './global/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const APP_NAME = process.env.APP_NAME || 'NestJS';
const APP_HOST = process.env.APP_HOST || 'localhost';
const APP_PORT = +(process.env.APP_PORT || 3000);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  configureMiddleware(app);
  configureValidation(app);

  await startServer(app);
}

function configureMiddleware(app: NestExpressApplication): void {
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.use(compression());
}

function configureValidation(app: NestExpressApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
}

async function startServer(app: NestExpressApplication): Promise<void> {
  await app.listen(APP_PORT);
  Logger.verbose(`Running on: [ http://${APP_HOST}:${APP_PORT} ]`, APP_NAME);
}

bootstrap();
