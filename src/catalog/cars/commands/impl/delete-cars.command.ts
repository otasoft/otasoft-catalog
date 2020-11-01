import { CarsIdDto } from '../../dto';

export class DeleteCarsCommand {
  constructor(public readonly carsIdDto: CarsIdDto) {}
}
