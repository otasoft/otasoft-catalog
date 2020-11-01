import { ActivityIdDto } from '../../dto/activity-id.dto';

export class GetSingleActivityQuery {
  constructor(public readonly activityIdDto: ActivityIdDto) {}
}
