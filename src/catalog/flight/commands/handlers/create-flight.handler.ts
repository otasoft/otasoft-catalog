import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorValidationService } from '../../../../utils/error-validation/error-validation.service';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightRepository } from '../../repositories/flight.repository';
import { CreateFlightCommand } from '../impl/create-flight.command';

@CommandHandler(CreateFlightCommand)
export class CreateFlightHandler
  implements ICommandHandler<CreateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(command: CreateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.create();

    flight.name = command.createFlightDto.name;
    flight.description = command.createFlightDto.description;

    try {
      await flight.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);
      throw new RpcException({
        statusCode: errorObject.code,
        errorStatus: errorObject.message,
      });
    }

    return flight;
  }
}
