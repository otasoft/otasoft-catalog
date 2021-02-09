import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ActivityModule],
})
export class CatalogModule {}
