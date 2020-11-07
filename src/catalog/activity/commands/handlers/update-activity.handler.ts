import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { ActivityEntity, ActivityRepository } from '../../repositories';
import { UpdateActivityCommand } from '../impl';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.findOne(
      command.updateActivityDto.id,
    );

    activity.name = command.updateActivityDto.updateActivityDto.name;
    activity.description =
      command.updateActivityDto.updateActivityDto.description;

    try {
      activity.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot update activity',
      });
    }

    return activity;
  }
}
