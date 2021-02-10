import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ApplicationModule, InfrastructureModule, DomainModule],
})
export class CatalogModule {}
