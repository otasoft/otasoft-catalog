import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { FlightRepository } from '../../repositories';
import { GetSingleFlightQuery } from '../impl';
import { FlightEntity } from '../../../../db/entities/flight.entity';

@QueryHandler(GetSingleFlightQuery)
export class GetSingleFlightHandler
  implements IQueryHandler<GetSingleFlightQuery> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(query: GetSingleFlightQuery): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.findOne(query.id);

    if (!flight)
      this.rpcExceptionService.throwNotFound(
        `Flight with ID ${query.id} not found`,
      );

    return flight;
  }
}
