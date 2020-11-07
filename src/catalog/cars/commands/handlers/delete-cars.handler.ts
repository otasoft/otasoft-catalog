import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { TextResponseModel } from '../../models/text-response.model';
import { CarsRepository } from '../../repositories';
import { DeleteCarsCommand } from '../impl';

@CommandHandler(DeleteCarsCommand)
export class DeleteCarsHandler implements ICommandHandler<DeleteCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: DeleteCarsCommand): Promise<TextResponseModel> {
    try {
      this.carsRepository.delete(command.id);
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot remove cars',
      });
    }

    return {
      response: `cars with id #${command.id} successfuly deleted`,
    };
  }
}
