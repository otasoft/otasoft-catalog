import { CreateActivityDto } from '../../dto';

export class CreateActivityCommand {
  constructor(public readonly createActivityDto: CreateActivityDto) {}
}
