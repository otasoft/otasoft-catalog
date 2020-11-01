import { CreateFlightHandler } from './create-flight.handler';
import { DeleteFlightHandler } from './delete-flight.handler';
import { UpdateFlightHandler } from './update-flight.handler';

export const CommandHandlers = [
  CreateFlightHandler,
  DeleteFlightHandler,
  UpdateFlightHandler,
];
