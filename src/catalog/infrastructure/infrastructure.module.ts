import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityEntity } from './entities';
import { ActivityRepository } from './repositories';

@Global()
@Module({
    imports:[TypeOrmModule.forFeature([ActivityRepository, ActivityEntity])],
})
export class InfrastructureModule {}
