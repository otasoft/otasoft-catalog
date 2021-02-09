import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { ElasticSearchService } from '../../../../elastic-search/services/';
import { ISearchBody } from '../../../../elastic-search/interfaces';
import { ActivityRepository } from '../../../infrastructure/repositories';
import { UpdateActivityCommand } from '../impl';
import { ActivityEntity } from '../../../infrastructure/entities';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
    try {
      await this.activityRepository.update(command.updateActivityDto.id, {
        name: command.updateActivityDto.updateActivityDto.name,
        description: command.updateActivityDto.updateActivityDto.description,
      });
    } catch (error) {
      const { code, message } = validateDbError(error.code);

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }

    const updatedActivity = await this.activityRepository.findOne(
      command.updateActivityDto.id,
    );

    const updatedBody: ISearchBody = {
      id: updatedActivity.activity_id,
      name: updatedActivity.name,
      description: updatedActivity.description,
    };

    await this.elasticSearchService.updateRecord('activity', updatedBody);

    return updatedActivity;
  }
}
