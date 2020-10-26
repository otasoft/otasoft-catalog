import { EntityRepository, Repository } from "typeorm";
import { ActivityEntity } from "./activity.entity";

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity> {}
