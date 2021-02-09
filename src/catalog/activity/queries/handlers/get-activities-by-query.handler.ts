import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

import { EsService } from '../../../../es/es.service';
import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ActivityRepository } from '../../../../db/repositories';
import { GetActivitiesByQueryQuery } from '../impl';
import { ActivityEntity } from '../../../../db/entities/activity.entity';

@QueryHandler(GetActivitiesByQueryQuery)
export class GetActivitiesByQueryHandler
  implements IQueryHandler<GetActivitiesByQueryQuery> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly esService: EsService,
  ) {}

  async execute(query: GetActivitiesByQueryQuery): Promise<ActivityEntity[]> {
    const resultsFromEs = await this.esService.searchByText(
      'activity',
      query.query,
    );
    const ids = resultsFromEs.map((result) => result.id);

    if (!ids.length)
      this.rpcExceptionService.throwNotFound(
        `Activities not found by query ${query.query}`,
      );

    const activities = await this.activityRepository.find({
      where: { activity_id: In(ids) },
    });

    if (!activities.length)
      this.rpcExceptionService.throwNotFound(
        'Activities found in ES but not found in DB',
      );

    return activities;
  }
}
