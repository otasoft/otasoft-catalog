import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { ActivityRepository } from '../../repositories';
import { GetAllActivitiesQuery } from '../impl/get-all-activities.query';
import { ActivityEntity } from '../../entities';

@QueryHandler(GetAllActivitiesQuery)
export class GetAllActivitiesHandler
  implements IQueryHandler<GetAllActivitiesQuery> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all activities will have some params like pagination, order, etc.
  async execute(query: GetAllActivitiesQuery): Promise<ActivityEntity[]> {
    const activities: ActivityEntity[] = await this.activityRepository.find();

    if (!activities.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Activities not found',
      });

    return activities;
  }
}
