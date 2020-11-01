import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightRepository } from '../../repositories/flight.repository';
import { CreateFlightCommand } from '../impl/create-flight.command';

@CommandHandler(CreateFlightCommand)
export class CreateFlightHandler
  implements ICommandHandler<CreateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly FlightRepository: FlightRepository,
  ) {}

  async execute(command: CreateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.FlightRepository.create();

    flight.name = command.createFlightDto.name;
    flight.description = command.createFlightDto.description;

    try {
      flight.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Error while creating an flight',
      });
    }

    return flight;
  }
}
