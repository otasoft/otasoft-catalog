import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateOfferDto, UpdateOfferDto } from '../dto';
import { OfferEntity } from '../../infrastructure/entities';
import { TextResponseModel } from '../models';
import { OfferService } from '../services';

@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @MessagePattern({ role: 'offer', cmd: 'getSingle' })
  async getSingleOffer(id: number): Promise<OfferEntity> {
    return this.offerService.getSingleOffer(id);
  }

  @MessagePattern({ role: 'offer', cmd: 'getAll' })
  async getAllOffers(): Promise<OfferEntity[]> {
    return this.offerService.getAllOffers();
  }

  @MessagePattern({ role: 'offer', cmd: 'getByQuery' })
  async getOffersByQuery(query: string): Promise<OfferEntity[]> {
    return this.offerService.getOffersByQuery(query);
  }

  @MessagePattern({ role: 'offer', cmd: 'create' })
  async createOffer(
    createOfferDto: CreateOfferDto,
  ): Promise<OfferEntity> {
    return this.offerService.createOffer(createOfferDto);
  }

  @MessagePattern({ role: 'offer', cmd: 'update' })
  async updateOffer(
    updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    return this.offerService.updateOffer(updateOfferDto);
  }

  @MessagePattern({ role: 'offer', cmd: 'delete' })
  async deleteOffer(id: number): Promise<TextResponseModel> {
    return this.offerService.deleteOffer(id);
  }
}
