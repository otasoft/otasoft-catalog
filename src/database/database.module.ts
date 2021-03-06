import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferSubscriber } from './subscribers';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  providers: [OfferSubscriber],
})
export class DatabaseModule {}
