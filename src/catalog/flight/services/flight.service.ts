import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateFlightCommand,
  DeleteFlightCommand,
  UpdateFlightCommand,
} from '../commands/impl';
import { CreateFlightDto, UpdateFlightDto } from '../dto';
import { TextResponseModel } from '../models/text-response.model';
import { GetSingleFlightQuery, GetAllFlightsQuery } from '../queries/impl';
import { FlightEntity } from '../../../db/entities/flight.entity';

@Injectable()
export class FlightService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleFlight(id: number): Promise<FlightEntity> {
    return this.queryBus.execute(new GetSingleFlightQuery(id));
  }

  async getAllFlights(): Promise<FlightEntity[]> {
    return this.queryBus.execute(new GetAllFlightsQuery());
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<FlightEntity> {
    return this.commandBus.execute(new CreateFlightCommand(createFlightDto));
  }

  async updateFlight(updateFlightDto: UpdateFlightDto): Promise<FlightEntity> {
    return this.commandBus.execute(new UpdateFlightCommand(updateFlightDto));
  }

  async deleteFlight(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteFlightCommand(id));
  }
}
