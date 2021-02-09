import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { GetSingleOfferQuery } from '../impl';
import { OfferEntity } from '../../../infrastructure/entities';

@QueryHandler(GetSingleOfferQuery)
export class GetSingleOfferHandler
  implements IQueryHandler<GetSingleOfferQuery> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
  ) {}

  async execute(query: GetSingleOfferQuery): Promise<OfferEntity> {
    const offer: OfferEntity = await this.offerRepository.findOne(
      query.id,
    );

    if (!offer)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Offer with ID ${query.id} not found`,
      });

    return offer;
  }
}
