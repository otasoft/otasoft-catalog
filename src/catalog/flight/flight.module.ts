import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { FlightController } from './controllers/flight/flight.controller';
import { QueryHandlers } from './queries/handlers';
import {
  FlightSubscriber,
  FlightEntity,
  FlightRepository,
} from './repositories';
import { FlightService } from './services/flight/flight.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightRepository, FlightEntity]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [FlightController],
  providers: [
    FlightService,
    ...CommandHandlers,
    ...QueryHandlers,
    FlightSubscriber,
  ],
})
export class FlightModule {}
