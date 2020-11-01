import { UpdateCarsDto } from '../../dto';

export class UpdateCarsCommand {
  constructor(public readonly updateCarsDto: UpdateCarsDto) {}
}
