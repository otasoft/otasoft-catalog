import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { TextResponseModel } from '../../models/text-response.model';
import { CarsRepository } from '../../repositories';
import { DeleteCarsCommand } from '../impl';

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
