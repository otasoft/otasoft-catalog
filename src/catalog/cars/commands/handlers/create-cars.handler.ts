import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { CarsRepository } from '../../../../database/repositories';
import { CreateCarsCommand } from '../impl/create-cars.command';
import { CarsEntity } from '../../../../database/entities/cars.entity';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateCarsCommand)
export class CreateCarsHandler implements ICommandHandler<CreateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateCarsCommand): Promise<CarsEntity> {
    const cars: CarsEntity = await this.carsRepository.create();

    cars.name = command.createCarsDto.name;
    cars.description = command.createCarsDto.description;

    try {
      await cars.save();
    } catch (error) {
      const errorObject = validateDbError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return cars;
  }
}
