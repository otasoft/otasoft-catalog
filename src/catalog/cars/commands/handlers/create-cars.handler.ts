import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { ErrorValidationService } from '../../../../utils/error-validation';
import { CarsEntity, CarsRepository } from '../../repositories';
import { CreateCarsCommand } from '../impl/create-cars.command';

@CommandHandler(CreateCarsCommand)
export class CreateCarsHandler implements ICommandHandler<CreateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly errorValidationService: ErrorValidationService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateCarsCommand): Promise<CarsEntity> {
    const cars: CarsEntity = await this.carsRepository.create();

    cars.name = command.createCarsDto.name;
    cars.description = command.createCarsDto.description;

    try {
      await cars.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return cars;
  }
}
