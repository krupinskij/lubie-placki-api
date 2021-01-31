import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    preflightContinue: true,
    credentials: true,
  });
  await app.listen(config.PORT || 3030);
}
bootstrap();
