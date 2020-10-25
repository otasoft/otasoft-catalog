import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, CatalogModule],
})
export class AppModule {}
