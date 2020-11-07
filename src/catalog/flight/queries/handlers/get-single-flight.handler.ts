import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { FlightEntity, FlightRepository } from '../../repositories';
import { GetSingleFlightQuery } from '../impl';

@QueryHandler(GetSingleFlightQuery)
export class GetSingleFlightHandler
  implements IQueryHandler<GetSingleFlightQuery> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
  ) {}

  async execute(query: GetSingleFlightQuery): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.findOne(query.id);

    if (!flight)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Flight with ID ${query.id} not found`,
      });

    return flight;
  }
}
