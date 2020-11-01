import { UpdateFlightDto } from '../../dto';

export class UpdateFlightCommand {
  constructor(public readonly updateFlightDto: UpdateFlightDto) {}
}
