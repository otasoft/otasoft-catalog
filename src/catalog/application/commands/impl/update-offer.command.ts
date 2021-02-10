import { UpdateOfferDto } from '../../dto';

export class UpdateOfferCommand {
  constructor(public readonly updateOfferDto: UpdateOfferDto) {}
}
