import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ErrorValidationService } from '../../../../utils/error-validation';
import { ActivityEntity, ActivityRepository } from '../../repositories';
import { CreateActivityCommand } from '../impl';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly errorValidationService: ErrorValidationService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.create();

    activity.name = command.createActivityDto.name;
    activity.description = command.createActivityDto.description;

    try {
      await activity.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return activity;
  }
}
