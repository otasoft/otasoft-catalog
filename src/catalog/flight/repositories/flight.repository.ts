import { EntityRepository, Repository } from 'typeorm';
import { FlightEntity } from './flight.entity';

@EntityRepository(FlightEntity)
export class ActivityRepository extends Repository<FlightEntity> {}
