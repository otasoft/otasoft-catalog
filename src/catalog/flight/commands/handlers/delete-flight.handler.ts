import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { TextResponseModel } from '../../models/text-response.model';
import { FlightRepository } from '../../repositories/flight.repository';
import { DeleteFlightCommand } from '../impl/delete-flight.command';

@CommandHandler(DeleteFlightCommand)
export class DeleteFlightHandler
  implements ICommandHandler<DeleteFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
  ) {}

  async execute(command: DeleteFlightCommand): Promise<TextResponseModel> {
    try {
      this.flightRepository.delete(command.flightIdDto.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove flight',
      });
    }

    return {
      response: `flight with id #${command.flightIdDto.id} successfuly deleted`,
    };
  }
}
