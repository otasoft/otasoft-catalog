import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorValidationService } from '../../../../utils/error-validation/error-validation.service';
import { CarsEntity } from '../../repositories/cars.entity';
import { CarsRepository } from '../../repositories/cars.repository';
import { CreateCarsCommand } from '../impl/create-cars.command';

@CommandHandler(CreateCarsCommand)
export class CreateCarsHandler implements ICommandHandler<CreateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(command: CreateCarsCommand): Promise<CarsEntity> {
    const cars: CarsEntity = await this.carsRepository.create();

    cars.name = command.createCarsDto.name;
    cars.description = command.createCarsDto.description;

    try {
      await cars.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);
      throw new RpcException({
        statusCode: errorObject.code,
        errorStatus: errorObject.message,
      });
    }

    return cars;
  }
}
