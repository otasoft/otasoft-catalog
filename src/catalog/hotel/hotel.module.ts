import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { HotelController } from './controllers/hotel/hotel.controller';
import { QueryHandlers } from './queries/handlers';
import { HotelSubscriber, HotelEntity, HotelRepository } from './repositories';
import { HotelService } from './services/hotel/hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelRepository, HotelEntity]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [HotelController],
  providers: [
    HotelService,
    ...CommandHandlers,
    ...QueryHandlers,
    HotelSubscriber,
  ],
})
export class HotelModule {}
