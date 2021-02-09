import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateOfferCommand,
  DeleteOfferCommand,
  UpdateOfferCommand,
} from '../commands/impl';
import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { TextResponseModel } from '../models';
import {
  GetSingleOfferQuery,
  GetAllOffersQuery,
  GetOffersByQueryQuery,
} from '../queries/impl';
import { OfferEntity } from '../../infrastructure/entities';

@Injectable()
export class OfferService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleOffer(id: number): Promise<OfferEntity> {
    return this.queryBus.execute(new GetSingleOfferQuery(id));
  }

  async getAllOffers(): Promise<OfferEntity[]> {
    return this.queryBus.execute(new GetAllOffersQuery());
  }

  async getOffersByQuery(query: string): Promise<OfferEntity[]> {
    return this.queryBus.execute(new GetOffersByQueryQuery(query));
  }

  async createOffer(
    createofferDto: CreateOfferDto,
  ): Promise<OfferEntity> {
    return this.commandBus.execute(
      new CreateOfferCommand(createofferDto),
    );
  }

  async updateOffer(
    updateofferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    return this.commandBus.execute(
      new UpdateOfferCommand(updateofferDto),
    );
  }

  async deleteOffer(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteOfferCommand(id));
  }
}
