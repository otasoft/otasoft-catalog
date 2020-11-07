import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { TextResponseModel } from '../../models/text-response.model';
import { FlightRepository } from '../../repositories';
import { DeleteFlightCommand } from '../impl';

@CommandHandler(DeleteFlightCommand)
export class DeleteFlightHandler
  implements ICommandHandler<DeleteFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
  ) {}

  async execute(command: DeleteFlightCommand): Promise<TextResponseModel> {
    try {
      this.flightRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove flight',
      });
    }

    return {
      response: `Flight with id #${command.id} successfuly deleted`,
    };
  }
}
