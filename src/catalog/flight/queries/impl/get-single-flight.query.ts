import { FlightIdDto } from '../../dto/flight-id.dto';

export class GetSingleFlightQuery {
  constructor(public readonly flightIdDto: FlightIdDto) {}
}
