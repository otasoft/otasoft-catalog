import { EntityRepository, Repository } from 'typeorm';

import { FlightEntity } from '../../../db/entities/flight.entity';

@EntityRepository(FlightEntity)
export class FlightRepository extends Repository<FlightEntity> {}
