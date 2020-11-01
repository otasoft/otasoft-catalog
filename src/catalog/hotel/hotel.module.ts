import { Module } from '@nestjs/common';
import { HotelController } from './controllers/hotel/hotel.controller';
import { HotelService } from './services/hotel/hotel.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
