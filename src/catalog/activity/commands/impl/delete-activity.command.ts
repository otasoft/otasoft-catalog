import { ActivityIdDto } from '../../dto';

export class DeleteActivityCommand {
  constructor(public readonly activityIdDto: ActivityIdDto) {}
}
