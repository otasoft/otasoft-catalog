import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { ErrorValidationService } from '../../../../utils/error-validation/error-validation.service';
import { HotelEntity, HotelRepository } from '../../repositories';
import { CreateHotelCommand } from '../impl/create-hotel.command';

@CommandHandler(CreateHotelCommand)
export class CreateHotelHandler implements ICommandHandler<CreateHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
    private readonly errorValidationService: ErrorValidationService,
  ) {}

  async execute(command: CreateHotelCommand): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.create();

    hotel.name = command.createHotelDto.name;
    hotel.description = command.createHotelDto.description;

    try {
      await hotel.save();
    } catch (error) {
      const errorObject = this.errorValidationService.validateError(error.code);
      throw new RpcException({
        statusCode: errorObject.code,
        errorStatus: errorObject.message,
      });
    }

    return hotel;
  }
}
