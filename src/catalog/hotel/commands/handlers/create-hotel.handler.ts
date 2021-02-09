import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { RpcExceptionService } from '../../../../utils/exception-handling';
import { HotelRepository } from '../../../../database/repositories';
import { CreateHotelCommand } from '../impl/create-hotel.command';
import { HotelEntity } from '../../../../database/entities/hotel.entity';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateHotelCommand)
export class CreateHotelHandler implements ICommandHandler<CreateHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: CreateHotelCommand): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.create();

    hotel.name = command.createHotelDto.name;
    hotel.description = command.createHotelDto.description;

    try {
      await hotel.save();
    } catch (error) {
      const errorObject = validateDbError(error.code);

      this.rpcExceptionService.throwCatchedException(errorObject);
    }

    return hotel;
  }
}
