import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { ElasticSearchService } from '../../../../elastic-search/services';
import { TextResponseModel } from '../../models';
import { OfferRepository } from '../../../infrastructure/repositories';
import { DeleteActivityCommand } from '../impl';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityHandler
  implements ICommandHandler<DeleteActivityCommand> {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async execute(command: DeleteActivityCommand): Promise<TextResponseModel> {
    try {
      await this.offerRepository.delete(command.id);
    } catch (error) {
      throw new RpcException({
        statusCode: error.code,
        errorStatus: 'Cannot remove activity',
      });
    }

    await this.elasticSearchService.removeRecordById('activity', command.id);

    return {
      response: `Activity with id #${command.id} successfuly deleted`,
    };
  }
}
