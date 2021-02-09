import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from './database/database.module';
import { CatalogModule } from './catalog/catalog.module';
import { HealthModule } from './health/health.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    ElasticSearchModule,
    DatabaseModule,
    CatalogModule,
    HealthModule,
  ],
})
export class AppModule {}
