import { HotelIdDto } from '../../dto';

export class DeleteHotelCommand {
  constructor(public readonly hotelIdDto: HotelIdDto) {}
}
