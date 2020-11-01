import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { TextResponseModel } from '../../models/text-response.model';
import { HotelRepository } from '../../repositories/hotel.repository';
import { DeleteHotelCommand } from '../impl/delete-hotel.command';

@CommandHandler(DeleteHotelCommand)
export class DeleteHotelHandler
  implements ICommandHandler<DeleteHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async execute(command: DeleteHotelCommand): Promise<TextResponseModel> {
    try {
      this.hotelRepository.delete(command.hotelIdDto.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove hotel',
      });
    }

    return {
      response: `hotel with id #${command.hotelIdDto.id} successfuly deleted`,
    };
  }
}
