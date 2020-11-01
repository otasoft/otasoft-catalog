import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateHotelCommand } from '../../commands/impl/create-hotel.command';
import { DeleteHotelCommand } from '../../commands/impl/delete-hotel.command';
import { UpdateHotelCommand } from '../../commands/impl/update-hotel.command';
import { HotelIdDto, CreateHotelDto, UpdateHotelDto } from '../../dto';
import { TextResponseModel } from '../../models/text-response.model';
import {
  GetSingleHotelQuery,
  GetAllHotelsQuery,
} from '../../queries/impl';
import { HotelEntity } from '../../repositories/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleHotel(
    HotelIdDto: HotelIdDto,
  ): Promise<HotelEntity> {
    return this.queryBus.execute(new GetSingleHotelQuery(HotelIdDto));
  }

  async getAllHotels(): Promise<HotelEntity[]> {
    return this.queryBus.execute(new GetAllHotelsQuery());
  }

  async createHotel(
    createHotelDto: CreateHotelDto,
  ): Promise<HotelEntity> {
    return this.commandBus.execute(
      new CreateHotelCommand(createHotelDto),
    );
  }

  async updateHotel(
    updateHotelDto: UpdateHotelDto,
  ): Promise<HotelEntity> {
    return this.commandBus.execute(
      new UpdateHotelCommand(updateHotelDto),
    );
  }

  async deleteHotel(
    HotelIdDto: HotelIdDto,
  ): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteHotelCommand(HotelIdDto));
  }
}
