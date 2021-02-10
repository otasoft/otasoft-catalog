import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { ElasticSearchService } from '../../../../elastic-search/services';
import { TextResponseModel } from '../../models';
import { OfferRepository } from '../../../infrastructure/repositories';
import { DeleteOfferCommand } from '../impl';

@CommandHandler(DeleteOfferCommand)
export class DeleteOfferHandler implements ICommandHandler<DeleteOfferCommand> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: DeleteOfferCommand): Promise<TextResponseModel> {
    try {
      await this.offerRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove offer',
      });
    }

    await this.elasticSearchService.removeRecordById('offer', command.id);

    return {
      response: `Offer with id #${command.id} successfuly deleted`,
    };
  }
}
