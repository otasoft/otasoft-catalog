import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { ActivityRepository } from '../../repositories';
import { ActivityEntity } from '../../entities';
import { CreateActivityCommand } from '../impl';
import { ElasticSearchService } from '../../../../elastic-search/services';
import { ISearchBody } from '../../../../elastic-search/interfaces';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.create({
      ...command.createActivityDto,
    });

    try {
      await activity.save();
    } catch (error) {
      const { code, message } = validateDbError(error.code);

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }

    const searchBody: ISearchBody = {
      id: activity.activity_id,
      name: activity.name,
      description: activity.description,
    };

    this.elasticSearchService.indexWithData('activity', searchBody);

    return activity;
  }
}
