import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { HotelController } from './controllers/hotel/hotel.controller';
import { QueryHandlers } from './queries/handlers';
import { HotelRepository } from '../../db/repositories';
import { HotelService } from './services/hotel/hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelRepository]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [HotelController],
  providers: [HotelService, ...CommandHandlers, ...QueryHandlers],
})
export class HotelModule {}
