import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateHotelDto, UpdateHotelDto } from '../dto';
import { HotelEntity } from '../../../db/entities/hotel.entity';
import { HotelService } from '../services/hotel.service';
import { TextResponseModel } from '../models/text-response.model';

@Controller()
export class HotelController {
  constructor(private readonly HotelService: HotelService) {}

  @MessagePattern({ role: 'hotel', cmd: 'getSingle' })
  async getSingleHotel(id: number): Promise<HotelEntity> {
    return this.HotelService.getSingleHotel(id);
  }

  @MessagePattern({ role: 'hotel', cmd: 'getAll' })
  async getAllHotels(): Promise<HotelEntity[]> {
    return this.HotelService.getAllHotels();
  }

  @MessagePattern({ role: 'hotel', cmd: 'create' })
  async createHotel(createHotelDto: CreateHotelDto): Promise<HotelEntity> {
    return this.HotelService.createHotel(createHotelDto);
  }

  @MessagePattern({ role: 'hotel', cmd: 'update' })
  async updateHotel(updateHotelDto: UpdateHotelDto): Promise<HotelEntity> {
    return this.HotelService.updateHotel(updateHotelDto);
  }

  @MessagePattern({ role: 'hotel', cmd: 'delete' })
  async deleteHotel(id: number): Promise<TextResponseModel> {
    return this.HotelService.deleteHotel(id);
  }
}
