import { CarIdDto } from "../../dto";

export class GetSingleCarQuery {
  constructor(public readonly carIdDto: CarIdDto) {}
}
