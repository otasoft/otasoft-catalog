import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { TextResponseModel } from '../../models/text-response.model';
import { FlightRepository } from '../../../../database/repositories';
import { DeleteFlightCommand } from '../impl';

@CommandHandler(DeleteFlightCommand)
export class DeleteFlightHandler
  implements ICommandHandler<DeleteFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: DeleteFlightCommand): Promise<TextResponseModel> {
    try {
      this.flightRepository.delete(command.id);
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot remove flight',
      });
    }

    return {
      response: `Flight with id #${command.id} successfuly deleted`,
    };
  }
}
