import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { EsService } from '../../../../es/es.service';
import { RpcExceptionService } from '../../../../utils/exception-handling';
import { TextResponseModel } from '../../models/text-response.model';
import { ActivityRepository } from '../../repositories';
import { DeleteActivityCommand } from '../impl';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityHandler
  implements ICommandHandler<DeleteActivityCommand> {
  constructor(
    @InjectRepository(ActivityRepository)
    private readonly activityRepository: ActivityRepository,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly esService: EsService,
  ) {}

  async execute(command: DeleteActivityCommand): Promise<TextResponseModel> {
    try {
      await this.activityRepository.delete(command.id);
    } catch (error) {
      console.log(error.code);
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot remove activity',
      });
    }

    await this.esService.removeRecordById('activity', command.id);

    return {
      response: `Activity with id #${command.id} successfuly deleted`,
    };
  }
}
