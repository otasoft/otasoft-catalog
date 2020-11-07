import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { CarsEntity, CarsRepository } from '../../repositories';
import { UpdateCarsCommand } from '../impl';

@CommandHandler(UpdateCarsCommand)
export class UpdateCarsHandler implements ICommandHandler<UpdateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  async execute(command: UpdateCarsCommand): Promise<CarsEntity> {
    const cars: CarsEntity = await this.carsRepository.findOne(
      command.updateCarsDto.id,
    );

    cars.name = command.updateCarsDto.updateCarsDto.name;
    cars.description = command.updateCarsDto.updateCarsDto.description;

    try {
      cars.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot update cars',
      });
    }

    return cars;
  }
}
