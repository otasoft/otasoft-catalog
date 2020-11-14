import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { CarsRepository } from '../../repositories';
import { GetAllCarsQuery } from '../impl/get-all-cars.query';
import { CarsEntity } from '../../../../db/entities/cars.entity';

@QueryHandler(GetAllCarsQuery)
export class GetAllCarsHandler implements IQueryHandler<GetAllCarsQuery> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  // Currently query is not used, but in the future, requesting all activities will have some params like pagination, order, etc.
  async execute(query: GetAllCarsQuery): Promise<CarsEntity[]> {
    const cars: CarsEntity[] = await this.carsRepository.find();

    if (!cars.length) this.rpcExceptionService.throwNotFound('Cars not found');

    return cars;
  }
}
