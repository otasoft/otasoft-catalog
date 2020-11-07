import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { CarsEntity, CarsRepository } from '../../repositories';
import { GetSingleCarQuery } from '../impl';

@QueryHandler(GetSingleCarQuery)
export class GetSingleCarsHandler implements IQueryHandler<GetSingleCarQuery> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  async execute(query: GetSingleCarQuery): Promise<CarsEntity> {
    const car: CarsEntity = await this.carsRepository.findOne(query.id);

    if (!car)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Car with ID ${query.id} not found`,
      });

    return car;
  }
}
