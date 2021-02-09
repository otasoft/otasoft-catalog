import { GetActivitiesByQueryHandler } from './get-activities-by-query.handler';
import { GetAllActivitiesHandler } from './get-all-activities.handler';
import { GetSingleActivityHandler } from './get-single-activity.handler';

export const QueryHandlers = [
  GetSingleActivityHandler,
  GetAllActivitiesHandler,
  GetActivitiesByQueryHandler,
];
