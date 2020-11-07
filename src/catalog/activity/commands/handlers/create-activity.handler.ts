import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { ErrorValidationService } from '../../../../utils/error-validation/error-validation.service';
import { ActivityEntity, ActivityRepository } from '../../repositories';
import { CreateActivityCommand } from '../impl';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.create();

    activity.name = command.createActivityDto.name;
    activity.description = command.createActivityDto.description;

    try {
      await activity.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);
      throw new RpcException({
        statusCode: errorObject.code,
        errorStatus: errorObject.message,
      });
    }

    return activity;
  }
}
