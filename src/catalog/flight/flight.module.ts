import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { FlightController } from './controllers/flight/flight.controller';
import { QueryHandlers } from './queries/handlers';
import { FlightService } from './services/flight/flight.service';

@Module({
  imports: [CqrsModule],
  controllers: [FlightController],
  providers: [FlightService, ...CommandHandlers, ...QueryHandlers],
})
export class FlightModule {}
