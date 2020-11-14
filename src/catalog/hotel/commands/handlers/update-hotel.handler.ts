import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { HotelRepository } from '../../repositories';
import { UpdateHotelCommand } from '../impl';
import { HotelEntity } from '../../../../db/entities/hotel.entity';

@CommandHandler(UpdateHotelCommand)
export class UpdateHotelHandler implements ICommandHandler<UpdateHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: UpdateHotelCommand): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.findOne(
      command.updateHotelDto.id,
    );

    hotel.name = command.updateHotelDto.updateHotelDto.name;
    hotel.description = command.updateHotelDto.updateHotelDto.description;

    try {
      hotel.save();
    } catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: error.code,
        message: 'Cannot update hotel',
      });
    }

    return hotel;
  }
}
