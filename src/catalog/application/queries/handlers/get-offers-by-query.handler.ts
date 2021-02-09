import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

import { ElasticSearchService } from '../../../../elastic-search/services';
import { OfferRepository } from '../../../infrastructure/repositories';
import { GetOffersByQueryQuery } from '../impl';
import { OfferEntity } from '../../../infrastructure/entities';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetOffersByQueryQuery)
export class GetOffersByQueryHandler
  implements IQueryHandler<GetOffersByQueryQuery> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(query: GetOffersByQueryQuery): Promise<OfferEntity[]> {
    const resultsFromEs = await this.elasticSearchService.searchByText(
      'offer',
      query.query,
    );
    const ids = resultsFromEs.map((result) => result.id);

    if (!ids.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Offers not found by query ${query.query}`,
      });

    const offers = await this.offerRepository.find({
      where: { offer_id: In(ids) },
    });

    if (!offers.length)
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Offers found in ES but not found in DB',
      });

    return offers;
  }
}
