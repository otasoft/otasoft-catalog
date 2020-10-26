import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { FlightModule } from './flight/flight.module';
import { CarsModule } from './cars/cars.module';
import { ActivityModule } from './activity/activity.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  imports: [FlightModule, CarsModule, ActivityModule, HotelModule],
})
export class CatalogModule {}
