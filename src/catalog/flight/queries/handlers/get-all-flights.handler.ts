import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightRepository } from '../../repositories/flight.repository';
import { GetAllFlightsQuery } from '../impl/get-all-flights.query';

@QueryHandler(GetAllFlightsQuery)
export class GetAllFlightsHandler implements IQueryHandler<GetAllFlightsQuery> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all Flights will have some params like pagination, order, etc.
  async execute(query: GetAllFlightsQuery): Promise<FlightEntity[]> {
    const flights: FlightEntity[] = await this.flightRepository.find();

    if (!flights.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Flights not found',
      });

    return flights;
  }
}
