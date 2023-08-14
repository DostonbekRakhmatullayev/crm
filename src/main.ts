import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ErrorHandle } from './filter/custom.exetepsion.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandle());

  const config = app.get(ConfigService);

  const port = config.getOrThrow<number>('app.port');
  const host = config.getOrThrow<string>('app.host');
  await app.listen(port, host);
}
bootstrap();
