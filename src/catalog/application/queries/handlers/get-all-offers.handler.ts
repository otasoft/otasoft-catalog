import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { GetAllOffersQuery } from '../impl/get-all-offers.query';
import { OfferEntity } from '../../../infrastructure/entities';

@QueryHandler(GetAllOffersQuery)
export class GetAllOffersHandler implements IQueryHandler<GetAllOffersQuery> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all offers will have some params like pagination, order, etc.
  async execute(query: GetAllOffersQuery): Promise<OfferEntity[]> {
    const offers: OfferEntity[] = await this.offerRepository.find();

    if (!offers.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Offers not found',
      });

    return offers;
  }
}
