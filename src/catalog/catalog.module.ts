import { Module } from '@nestjs/common';

import { ActivityModule } from './activity/activity.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ActivityModule, ApplicationModule, InfrastructureModule, DomainModule],
})
export class CatalogModule {}
