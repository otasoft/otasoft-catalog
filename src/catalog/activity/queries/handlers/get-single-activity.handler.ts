import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from '../../repositories/activity.entity';
import { ActivityRepository } from '../../repositories/activity.repository';
import { GetSingleActivityQuery } from '../impl';

@QueryHandler(GetSingleActivityQuery)
export class GetSingleActivityHandler
  implements IQueryHandler<GetSingleActivityQuery> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(query: GetSingleActivityQuery): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.findOne(
      query.id,
    );

    if (!activity)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Activity with ID ${query.id} not found`,
      });

    return activity;
  }
}
