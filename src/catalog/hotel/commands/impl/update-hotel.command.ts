import { UpdateHotelDto } from '../../dto';

export class UpdateHotelCommand {
  constructor(public readonly updateHotelDto: UpdateHotelDto) {}
}
