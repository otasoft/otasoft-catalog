import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatalogSubscribers } from './subscribers';
import { dbAsyncConfig } from './config';

@Module({
  imports: [TypeOrmModule.forRootAsync(dbAsyncConfig)],
  providers: [...CatalogSubscribers],
})
export class DbModule {}
