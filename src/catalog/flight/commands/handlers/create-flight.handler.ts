import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { FlightRepository } from '../../../../database/repositories';
import { CreateFlightCommand } from '../impl';
import { FlightEntity } from '../../../../database/entities/flight.entity';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateFlightCommand)
export class CreateFlightHandler
  implements ICommandHandler<CreateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.create();

    flight.name = command.createFlightDto.name;
    flight.description = command.createFlightDto.description;

    try {
      await flight.save();
    } catch (error) {
      const errorObject = validateDbError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return flight;
  }
}
