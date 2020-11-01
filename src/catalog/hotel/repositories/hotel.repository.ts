import { EntityRepository, Repository } from 'typeorm';
import { HotelEntity } from './hotel.entity';

@EntityRepository(HotelEntity)
export class ActivityRepository extends Repository<HotelEntity> {}
