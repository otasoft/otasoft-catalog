import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorValidationService } from 'src/utils/error-validation/error-validation.service';
import { CommandHandlers } from './commands/handlers';
import { HotelController } from './controllers/hotel/hotel.controller';
import { QueryHandlers } from './queries/handlers';
import { HotelEntity } from './repositories/hotel.entity';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './services/hotel/hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelRepository, HotelEntity]),
    CqrsModule,
  ],
  controllers: [HotelController],
  providers: [HotelService, ...CommandHandlers, ...QueryHandlers, ErrorValidationService],
})
export class HotelModule {}
