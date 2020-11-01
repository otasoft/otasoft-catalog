import { UpdateActivityDto } from '../../dto';

export class UpdateActivityCommand {
  constructor(public readonly updateActivityDto: UpdateActivityDto) {}
}
