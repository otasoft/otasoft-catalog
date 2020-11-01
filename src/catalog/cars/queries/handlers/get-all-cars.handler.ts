import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from '../../repositories/cars.entity';
import { CarsRepository } from '../../repositories/cars.repository';
import { GetAllCarsQuery } from '../impl/get-all-cars.query';

@QueryHandler(GetAllCarsQuery)
export class GetAllCarsHandler implements IQueryHandler<GetAllCarsQuery> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all activities will have some params like pagination, order, etc.
  async execute(query: GetAllCarsQuery): Promise<CarsEntity[]> {
    const cars: CarsEntity[] = await this.carsRepository.find();

    if (!cars.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Cars not found',
      });

    return cars;
  }
}
