import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightRepository } from '../../repositories/flight.repository';
import { GetSingleFlightQuery } from '../impl';

@QueryHandler(GetSingleFlightQuery)
export class GetSingleFlightHandler
  implements IQueryHandler<GetSingleFlightQuery> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly FlightRepository: FlightRepository,
  ) {}

  async execute(query: GetSingleFlightQuery): Promise<FlightEntity> {
    const flight: FlightEntity = await this.FlightRepository.findOne(
      query.FlightIdDto.id,
    );

    if (!flight)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'flight not found',
      });

    return flight;
  }
}
