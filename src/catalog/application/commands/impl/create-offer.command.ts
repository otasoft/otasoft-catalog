import { CreateOfferDto } from '../../dto';

export class CreateOfferCommand {
  constructor(public readonly createOfferDto: CreateOfferDto) {}
}
