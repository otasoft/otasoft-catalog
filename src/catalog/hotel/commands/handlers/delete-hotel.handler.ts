import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { TextResponseModel } from '../../models/text-response.model';
import { HotelRepository } from '../../../../db/repositories';
import { DeleteHotelCommand } from '../impl';

@CommandHandler(DeleteHotelCommand)
export class DeleteHotelHandler implements ICommandHandler<DeleteHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: DeleteHotelCommand): Promise<TextResponseModel> {
    try {
      this.hotelRepository.delete(command.id);
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot remove hotel',
      });
    }

    return {
      response: `Hotel with ID #${command.id} successfuly deleted`,
    };
  }
}
