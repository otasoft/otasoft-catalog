import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { catalogMicroserviceOptions } from './microservice-connection/microservice-connection';

const logger = new Logger('CatalogMicroservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    catalogMicroserviceOptions,
  );

  await app.listen(() => {
    logger.log('Microservice is listening');
  });
}
bootstrap();
