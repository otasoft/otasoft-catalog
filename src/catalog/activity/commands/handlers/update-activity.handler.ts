import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorValidationService } from 'src/utils/error-validation';

import { EsService } from '../../../../es/es.service';
import { ISearchBody } from '../../../../es/interfaces';
import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ActivityRepository } from '../../../../db/repositories';
import { UpdateActivityCommand } from '../impl';
import { ActivityEntity } from '../../../../db/entities/activity.entity';

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityHandler
  implements ICommandHandler<UpdateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly errorValidationService: ErrorValidationService,
    private readonly esService: EsService,
  ) {}

  async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
    try {
      await this.activityRepository.update(command.updateActivityDto.id, {
        name: command.updateActivityDto.updateActivityDto.name,
        description: command.updateActivityDto.updateActivityDto.description,
      });
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    const updatedActivity = await this.activityRepository.findOne(
      command.updateActivityDto.id,
    );

    const updatedBody: ISearchBody = {
      id: updatedActivity.activity_id,
      name: updatedActivity.name,
      description: updatedActivity.description,
    };

    await this.esService.updateRecord('activity', updatedBody);

    return updatedActivity;
  }
}
