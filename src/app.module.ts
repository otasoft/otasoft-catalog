import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from './db/db.module';
import { CatalogModule } from './catalog/catalog.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    DbModule,
    CatalogModule,
    HealthModule,
  ],
})
export class AppModule {}
