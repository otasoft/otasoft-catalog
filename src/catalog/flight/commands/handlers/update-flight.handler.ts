import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from '../../repositories/flight.entity';
import { FlightRepository } from '../../repositories/flight.repository';
import { UpdateFlightCommand } from '../impl/update-flight.command';

@CommandHandler(UpdateFlightCommand)
export class UpdateFlightHandler
  implements ICommandHandler<UpdateFlightCommand> {
  constructor(
    @InjectRepository(FlightRepository)
    private readonly flightRepository: FlightRepository,
  ) {}

  async execute(command: UpdateFlightCommand): Promise<FlightEntity> {
    const flight: FlightEntity = await this.flightRepository.findOne(
      command.updateFlightDto.id,
    );

    flight.name = command.updateFlightDto.updateFlightDto.name;
    flight.description =
      command.updateFlightDto.updateFlightDto.description;

    try {
      flight.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot update flight',
      });
    }

    return flight;
  }
}