import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { FlightController } from './controllers/flight.controller';
import { QueryHandlers } from './queries/handlers';
import { FlightRepository } from '../../database/repositories';
import { FlightService } from './services/flight.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightRepository]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [FlightController],
  providers: [FlightService, ...CommandHandlers, ...QueryHandlers],
})
export class FlightModule {}
