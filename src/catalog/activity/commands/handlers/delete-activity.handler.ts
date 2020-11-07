import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

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
  ) {}

  async execute(command: DeleteActivityCommand): Promise<TextResponseModel> {
    try {
      this.activityRepository.delete(command.id);
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot remove activity',
      });
    }

    return {
      response: `Activity with id #${command.id} successfuly deleted`,
    };
  }
}
