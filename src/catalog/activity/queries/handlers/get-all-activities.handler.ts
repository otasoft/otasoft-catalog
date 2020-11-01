import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from '../../repositories/activity.entity';
import { ActivityRepository } from '../../repositories/activity.repository';
import { GetAllActivitiesQuery } from '../impl/get-all-activities.query';

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
