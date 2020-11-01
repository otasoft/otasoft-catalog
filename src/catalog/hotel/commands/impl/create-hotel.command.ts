import { CreateHotelDto } from '../../dto/create-hotel.dto';

export class CreateHotelCommand {
  constructor(public readonly createHotelDto: CreateHotelDto) {}
}
