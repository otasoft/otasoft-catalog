import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ErrorValidationService } from '../../../../utils/error-validation';
import { ActivityRepository } from '../../repositories';
import { ActivityEntity } from '../../../../db/entities/activity.entity'
import { CreateActivityCommand } from '../impl';
import { EsService } from '../../../../es/es.service';
import { ISearchBody } from 'src/es/interfaces';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly errorValidationService: ErrorValidationService,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly esService: EsService,
  ) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const activity: ActivityEntity = await this.activityRepository.create({
      ...command.createActivityDto,
    });

    try {
      await activity.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    const searchBody: ISearchBody = {
      id: activity.activity_id,
      name: activity.name,
      description: activity.description,
    };

    this.esService.indexWithData('activity', searchBody);

    return activity;
  }
}
