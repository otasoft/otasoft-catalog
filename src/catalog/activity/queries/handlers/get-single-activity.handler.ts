import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ActivityRepository } from '../../../../db/repositories';
import { GetSingleActivityQuery } from '../impl';
import { ActivityEntity } from '../../../../db/entities/activity.entity';

@QueryHandler(GetSingleActivityQuery)
export class GetSingleActivityHandler
  implements IQueryHandler<GetSingleActivityQuery> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(query: GetSingleActivityQuery): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.findOne(
      query.id,
    );

    if (!activity)
      this.rpcExceptionService.throwNotFound(
        `Activity with ID ${query.id} not found`,
      );

    return activity;
  }
}
