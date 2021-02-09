import { EntityRepository, Repository } from 'typeorm';

import { ActivityEntity } from '../../../db/entities/activity.entity';

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity> {}
