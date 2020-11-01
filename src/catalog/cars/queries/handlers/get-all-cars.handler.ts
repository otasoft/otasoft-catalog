import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from '../../repositories/cars.entity';
import { CarsRepository } from '../../repositories/cars.repository';
import { GetAllCarsQuery } from '../impl/get-all-cars.query';

@QueryHandler(GetAllCarsQuery)
export class GetAllActivitiesHandler
  implements IQueryHandler<GetAllCarsQuery> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all activities will have some params like pagination, order, etc.
  async execute(query: GetAllCarsQuery): Promise<CarsEntity[]> {
    const activities: CarsEntity[] = await this.carsRepository.find();

    if (!activities.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Activities not found',
      });

    return activities;
  }
}
