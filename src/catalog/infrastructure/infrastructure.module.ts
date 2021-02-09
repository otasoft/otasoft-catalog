import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferEntity } from './entities';
import { OfferRepository } from './repositories';

@Global()
@Module({
    imports:[TypeOrmModule.forFeature([OfferRepository, OfferEntity])],
})
export class InfrastructureModule {}
