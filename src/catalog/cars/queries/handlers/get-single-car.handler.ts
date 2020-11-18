import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { CarsRepository } from '../../repositories';
import { GetSingleCarQuery } from '../impl';
import { CarsEntity } from '../../../../db/entities/cars.entity';

@QueryHandler(GetSingleCarQuery)
export class GetSingleCarsHandler implements IQueryHandler<GetSingleCarQuery> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(query: GetSingleCarQuery): Promise<CarsEntity> {
    const car: CarsEntity = await this.carsRepository.findOne(query.id);

    if (!car)
      this.rpcExceptionService.throwNotFound(
        `Car with ID ${query.id} not found`,
      );

    return car;
  }
}
