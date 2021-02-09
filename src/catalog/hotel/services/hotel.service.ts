import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateHotelCommand,
  UpdateHotelCommand,
  DeleteHotelCommand,
} from '../commands/impl';
import { CreateHotelDto, UpdateHotelDto } from '../dto';
import { TextResponseModel } from '../models/text-response.model';
import { GetSingleHotelQuery, GetAllHotelsQuery } from '../queries/impl';
import { HotelEntity } from '../../../database/entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleHotel(id: number): Promise<HotelEntity> {
    return this.queryBus.execute(new GetSingleHotelQuery(id));
  }

  async getAllHotels(): Promise<HotelEntity[]> {
    return this.queryBus.execute(new GetAllHotelsQuery());
  }

  async createHotel(createHotelDto: CreateHotelDto): Promise<HotelEntity> {
    return this.commandBus.execute(new CreateHotelCommand(createHotelDto));
  }

  async updateHotel(updateHotelDto: UpdateHotelDto): Promise<HotelEntity> {
    return this.commandBus.execute(new UpdateHotelCommand(updateHotelDto));
  }

  async deleteHotel(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteHotelCommand(id));
  }
}
