import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from '../../repositories/activity.entity';
import { ActivityRepository } from '../../repositories/activity.repository';
import { CreateActivityCommand } from '../impl/create-activity.command';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
  ) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.create();

    activity.name = command.createActivityDto.name;
    activity.description = command.createActivityDto.description;

    try {
      activity.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Error while creating an activity',
      });
    }

    return activity;
  }
}
