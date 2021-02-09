import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

import { ElasticSearchService } from '../../../../elastic-search/services';
import { ActivityRepository } from '../../../infrastructure/repositories';
import { GetActivitiesByQueryQuery } from '../impl';
import { ActivityEntity } from '../../../infrastructure/entities';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetActivitiesByQueryQuery)
export class GetActivitiesByQueryHandler
  implements IQueryHandler<GetActivitiesByQueryQuery> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly elasticSearchService: ElasticSearchService
  ) {}

  async execute(query: GetActivitiesByQueryQuery): Promise<ActivityEntity[]> {
    const resultsFromEs = await this.elasticSearchService.searchByText(
      'activity',
      query.query,
    );
    const ids = resultsFromEs.map((result) => result.id);

    if (!ids.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Activities not found by query ${query.query}`,
      });

    const activities = await this.activityRepository.find({
      where: { activity_id: In(ids) },
    });

    if (!activities.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Activities found in ES but not found in DB',
      });

    return activities;
  }
}
