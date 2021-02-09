import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { GetAllActivitiesQuery } from '../impl/get-all-activities.query';
import { OfferEntity } from '../../../infrastructure/entities';

@QueryHandler(GetAllActivitiesQuery)
export class GetAllActivitiesHandler
  implements IQueryHandler<GetAllActivitiesQuery> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
  ) {}

  // Currently query is not used, but in the future, requesting all activities will have some params like pagination, order, etc.
  async execute(query: GetAllActivitiesQuery): Promise<OfferEntity[]> {
    const offers: OfferEntity[] = await this.offerRepository.find();

    if (!offers.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Activities not found',
      });

    return offers;
  }
}
