import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { ActivityRepository } from '../../../infrastructure/repositories';
import { GetSingleActivityQuery } from '../impl';
import { ActivityEntity } from '../../../infrastructure/entities';

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
