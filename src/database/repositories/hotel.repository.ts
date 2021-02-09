import { EntityRepository, Repository } from 'typeorm';

import { HotelEntity } from '../entities/hotel.entity';

@EntityRepository(HotelEntity)
export class HotelRepository extends Repository<HotelEntity> {}
