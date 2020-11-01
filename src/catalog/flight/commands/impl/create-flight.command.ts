import { CreateFlightDto } from '../../dto/create-flight.dto';

export class CreateFlightCommand {
  constructor(public readonly createFlightDto: CreateFlightDto) {}
}
