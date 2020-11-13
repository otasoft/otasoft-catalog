import { EntityRepository, Repository } from 'typeorm';

import { CarsEntity } from './cars.entity';

@EntityRepository(CarsEntity)
export class CarsRepository extends Repository<CarsEntity> {}
