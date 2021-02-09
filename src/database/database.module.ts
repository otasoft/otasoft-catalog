import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitySubscriber } from './subscribers';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  providers: [ActivitySubscriber],
})
export class DatabaseModule {}
