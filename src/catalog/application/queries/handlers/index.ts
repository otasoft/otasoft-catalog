import { GetActivitiesByQueryHandler } from './get-offers-by-query.handler';
import { GetAllActivitiesHandler } from './get-all-offers.handler';
import { GetSingleActivityHandler } from './get-single-offer.handler';

export const QueryHandlers = [
  GetSingleActivityHandler,
  GetAllActivitiesHandler,
  GetActivitiesByQueryHandler,
];
