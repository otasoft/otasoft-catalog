import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from '../../repositories/hotel.entity';
import { HotelRepository } from '../../repositories/hotel.repository';
import { CreateHotelCommand } from '../impl/create-hotel.command';

@CommandHandler(CreateHotelCommand)
export class CreateHotelHandler implements ICommandHandler<CreateHotelCommand> {
  constructor(
    @InjectRepository(HotelRepository)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async execute(command: CreateHotelCommand): Promise<HotelEntity> {
    const hotel: HotelEntity = await this.hotelRepository.create();

    hotel.name = command.createHotelDto.name;
    hotel.description = command.createHotelDto.description;

    try {
      hotel.save();
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Error while creating an hotel',
      });
    }

    return hotel;
  }
}
