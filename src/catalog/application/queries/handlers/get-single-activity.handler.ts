import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { GetSingleActivityQuery } from '../impl';
import { OfferEntity } from '../../../infrastructure/entities';

@QueryHandler(GetSingleActivityQuery)
export class GetSingleActivityHandler
  implements IQueryHandler<GetSingleActivityQuery> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
  ) {}

  async execute(query: GetSingleActivityQuery): Promise<OfferEntity> {
    const offer: OfferEntity = await this.offerRepository.findOne(
      query.id,
    );

    if (!offer)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Activity with ID ${query.id} not found`,
      });

    return offer;
  }
}
