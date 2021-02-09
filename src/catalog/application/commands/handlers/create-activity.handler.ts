import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { OfferEntity } from '../../../infrastructure/entities';
import { CreateActivityCommand } from '../impl';
import { ElasticSearchService } from '../../../../elastic-search/services';
import { ISearchBody } from '../../../../elastic-search/interfaces';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
  implements ICommandHandler<CreateActivityCommand> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: CreateActivityCommand): Promise<OfferEntity> {
    const offer: OfferEntity = await this.offerRepository.create({
      ...command.createActivityDto,
    });

    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      const { code, message } = validateDbError(error.code);

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }

    const searchBody: ISearchBody = {
      id: offer.offer_id,
      name: offer.name,
      description: offer.description,
    };

    this.elasticSearchService.indexWithData('activity', searchBody);

    return offer;
  }
}
