import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { ElasticSearchService } from '../../../../elastic-search/services';
import { ISearchBody } from '../../../../elastic-search/interfaces';
import { OfferRepository } from '../../../infrastructure/repositories';
import { UpdateOfferCommand } from '../impl';
import { OfferEntity } from '../../../infrastructure/entities';
import { validateDbError } from '../../../../database/helpers';

@CommandHandler(UpdateOfferCommand)
export class UpdateOfferHandler implements ICommandHandler<UpdateOfferCommand> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: UpdateOfferCommand): Promise<OfferEntity> {
    try {
      await this.offerRepository.update(command.updateOfferDto.id, {
        name: command.updateOfferDto.updateOfferDto.name,
        description: command.updateOfferDto.updateOfferDto.description,
      });
    } catch (error) {
      const { code, message } = validateDbError(error.code);

      throw new RpcException({
        statusCode: code,
        errorStatus: message,
      });
    }

    const updatedOffer = await this.offerRepository.findOne(
      command.updateOfferDto.id,
    );

    const updatedBody: ISearchBody = {
      id: updatedOffer.offer_id,
      name: updatedOffer.name,
      description: updatedOffer.description,
    };

    await this.elasticSearchService.updateRecord('offer', updatedBody);

    return updatedOffer;
  }
}
