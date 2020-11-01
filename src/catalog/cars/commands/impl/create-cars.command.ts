import { CreateCarsDto } from '../../dto/create-cars.dto';

export class CreateCarsCommand {
  constructor(public readonly createCarsDto: CreateCarsDto) {}
}
