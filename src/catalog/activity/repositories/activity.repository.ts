import { EntityRepository, Repository } from 'typeorm';

import { ActivityEntity } from '../entities';

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity> {}
