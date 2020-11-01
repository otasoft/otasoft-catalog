import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateHotelDto } from '../../dto/create-hotel.dto';
import { HotelIdDto } from '../../dto/hotel-id.dto';
import { UpdateHotelDto } from '../../dto/update-hotel.dto';
import { HotelEntity } from '../../repositories/hotel.entity';
import { HotelService } from '../../services/hotel/hotel.service';
import { TextResponseModel } from '../../models/text-response.model';

@Controller()
export class HotelController {
  constructor(private readonly HotelService: HotelService) {}

  @MessagePattern({ role: 'hotel', cmd: 'getSingle' })
  async getSingleHotel(
    HotelIdDto: HotelIdDto,
  ): Promise<HotelEntity> {
    return this.HotelService.getSingleHotel(HotelIdDto);
  }

  @MessagePattern({ role: 'hotel', cmd: 'getAll' })
  async getAllHotels(): Promise<HotelEntity[]> {
    return this.HotelService.getAllHotels();
  }

  @MessagePattern({ role: 'hotel', cmd: 'create' })
  async createHotel(
    createHotelDto: CreateHotelDto,
  ): Promise<HotelEntity> {
    return this.HotelService.createHotel(createHotelDto);
  }

  @MessagePattern({ role: 'hotel', cmd: 'update' })
  async updateHotel(
    updateHotelDto: UpdateHotelDto,
  ): Promise<HotelEntity> {
    return this.HotelService.updateHotel(updateHotelDto);
  }

  @MessagePattern({ role: 'hotel', cmd: 'delete' })
  async deleteHotel(
    HotelIdDto: HotelIdDto,
  ): Promise<TextResponseModel> {
    return this.HotelService.deleteHotel(HotelIdDto);
  }
}