import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { OfferRepository } from '../../../infrastructure/repositories';
import { OfferEntity } from '../../../infrastructure/entities';
import { CreateOfferCommand } from '../impl';
import { ElasticSearchService } from '../../../../elastic-search/services';
import { ISearchBody } from '../../../../elastic-search/interfaces';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: CreateOfferCommand): Promise<OfferEntity> {
    const offer: OfferEntity = await this.offerRepository.create({
      ...command.createOfferDto,
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

    this.elasticSearchService.indexWithData('offer', searchBody);

    return offer;
  }
}
