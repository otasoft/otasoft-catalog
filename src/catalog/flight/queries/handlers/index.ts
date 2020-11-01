import { GetAllFlightsHandler } from './get-all-flights.handler';
import { GetSingleFlightHandler } from './get-single-flight.handler';

export const QueryHandlers = [
  GetSingleFlightHandler,
  GetAllFlightsHandler,
];
