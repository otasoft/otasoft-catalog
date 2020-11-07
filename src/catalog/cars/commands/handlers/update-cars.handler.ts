import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { CarsEntity, CarsRepository } from '../../repositories';
import { UpdateCarsCommand } from '../impl';

@CommandHandler(UpdateCarsCommand)
export class UpdateCarsHandler implements ICommandHandler<UpdateCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
    private readonly rpcExceptionService: RpcExceptionService,
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
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot update cars',
      });
    }

    return cars;
  }
}
