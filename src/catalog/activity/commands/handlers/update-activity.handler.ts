import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ActivityEntity, ActivityRepository } from '../../repositories';
import { UpdateActivityCommand } from '../impl';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly rpcExceptionService: RpcExceptionService,
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
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot update activity',
      });
    }

    return activity;
  }
}
