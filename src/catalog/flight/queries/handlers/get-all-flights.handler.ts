import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { FlightRepository } from '../../repositories';
import { GetAllFlightsQuery } from '../impl/get-all-flights.query';
import { FlightEntity } from '../../../../db/entities/flight.entity';

@QueryHandler(GetAllFlightsQuery)
export class GetAllFlightsHandler implements IQueryHandler<GetAllFlightsQuery> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  // Currently query is not used, but in the future, requesting all Flights will have some params like pagination, order, etc.
  async execute(query: GetAllFlightsQuery): Promise<FlightEntity[]> {
    const flights: FlightEntity[] = await this.flightRepository.find();

    if (!flights.length)
      this.rpcExceptionService.throwNotFound('Flights not found');

    return flights;
  }
}
