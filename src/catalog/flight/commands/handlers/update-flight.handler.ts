import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { FlightRepository } from '../../../../db/repositories';
import { UpdateFlightCommand } from '../impl';
import { FlightEntity } from '../../../../db/entities/flight.entity';

@CommandHandler(UpdateFlightCommand)
export class UpdateFlightHandler
  implements ICommandHandler<UpdateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: UpdateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.findOne(
      command.updateFlightDto.id,
    );

    flight.name = command.updateFlightDto.updateFlightDto.name;
    flight.description = command.updateFlightDto.updateFlightDto.description;

    try {
      flight.save();
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot update flight',
      });
    }

    return flight;
  }
}
