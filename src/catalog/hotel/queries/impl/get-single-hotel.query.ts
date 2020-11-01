import { HotelIdDto } from '../../dto/hotel-id.dto';

export class GetSingleHotelQuery {
  constructor(public readonly hotelIdDto: HotelIdDto) {}
}
