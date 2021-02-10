import { EntityRepository, Repository } from 'typeorm';

import { OfferEntity } from '../entities';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity> {}
