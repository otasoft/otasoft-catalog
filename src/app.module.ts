import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from './db/db.module';
import { CatalogModule } from './catalog/catalog.module';
import { HealthModule } from './health/health.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    DbModule,
    CatalogModule,
    HealthModule,
    UtilsModule,
  ],
})
export class AppModule {}
