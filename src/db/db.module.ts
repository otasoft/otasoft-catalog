import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatalogSubscribers } from './subscribers';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  providers: [...CatalogSubscribers],
})
export class DbModule {}
