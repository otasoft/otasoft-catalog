import { EntityRepository, Repository } from 'typeorm';

import { HotelEntity } from '../../../db/entities/hotel.entity';

@EntityRepository(HotelEntity)
export class HotelRepository extends Repository<HotelEntity> {}
