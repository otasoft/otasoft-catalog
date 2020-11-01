import { FlightIdDto } from '../../dto';

export class DeleteFlightCommand {
  constructor(public readonly flightIdDto: FlightIdDto) {}
}
