import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { TextResponseModel } from '../../models/text-response.model';
import { CarsRepository } from '../../repositories/cars.repository';
import { DeleteCarsCommand } from '../impl/delete-cars.command';

@CommandHandler(DeleteCarsCommand)
export class DeleteCarsHandler implements ICommandHandler<DeleteCarsCommand> {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}

  async execute(command: DeleteCarsCommand): Promise<TextResponseModel> {
    try {
      this.carsRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove cars',
      });
    }

    return {
      response: `cars with id #${command.id} successfuly deleted`,
    };
  }
}
