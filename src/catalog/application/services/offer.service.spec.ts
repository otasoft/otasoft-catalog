import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { OfferService } from './offer.service';

describe('ActivityService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],

      providers: [OfferService],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
