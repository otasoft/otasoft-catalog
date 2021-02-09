import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ErrorValidationService } from '../../../../utils/error-validation';
import { FlightRepository } from '../../../../database/repositories';
import { CreateFlightCommand } from '../impl';
import { FlightEntity } from '../../../../database/entities/flight.entity';

@CommandHandler(CreateFlightCommand)
export class CreateFlightHandler
  implements ICommandHandler<CreateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly errorValidationService: ErrorValidationService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.create();

    flight.name = command.createFlightDto.name;
    flight.description = command.createFlightDto.description;

    try {
      await flight.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return flight;
  }
}
