import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from '../../repositories/cars.entity';
import { CarsRepository } from '../../repositories/cars.repository';
import { CreateCarsCommand } from '../impl/create-cars.command';

@CommandHandler(CreateCarsCommand)
export class CreatecarsHandler
  implements ICommandHandler<CreateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  async execute(command: CreateCarsCommand): Promise<CarsEntity> {
    const cars: CarsEntity = await this.carsRepository.create();

    cars.name = command.createCarsDto.name;
    cars.description = command.createCarsDto.description;

    try {
      cars.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Error while creating an cars',
      });
    }

    return cars;
  }
}
