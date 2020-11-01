import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';
import { CarsModule } from './cars/cars.module';
import { ActivityModule } from './activity/activity.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [FlightModule, CarsModule, ActivityModule, HotelModule],
})
export class CatalogModule {}
