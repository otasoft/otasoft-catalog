import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { FlightController } from './controllers/flight/flight.controller';
import { QueryHandlers } from './queries/handlers';
import { FlightEntity } from './repositories/flight.entity';
import { FlightRepository } from './repositories/flight.repository';
import { FlightService } from './services/flight/flight.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlightRepository, FlightEntity]), CqrsModule],
  controllers: [FlightController],
  providers: [FlightService, ...CommandHandlers, ...QueryHandlers],
})
export class FlightModule {}
