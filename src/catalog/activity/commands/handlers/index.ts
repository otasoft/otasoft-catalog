import { CreateActivityHandler } from './create-activity.handler';
import { DeleteActivityHandler } from './delete-activity.handler';
import { UpdateActivityHandler } from './update-activity.handler';

export const CommandHandlers = [
  CreateActivityHandler,
  DeleteActivityHandler,
  UpdateActivityHandler,
];
