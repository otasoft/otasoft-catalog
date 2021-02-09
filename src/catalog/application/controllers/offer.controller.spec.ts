import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { OfferService } from '../services/offer.service';
import { OfferController } from './offer.controller';

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [OfferController],
      providers: [OfferService],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
