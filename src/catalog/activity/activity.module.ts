import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { ActivityController } from './controllers/activity/activity.controller';
import { QueryHandlers } from './queries/handlers';
import {
  ActivitySubscriber,
  ActivityEntity,
  ActivityRepository,
} from './repositories';
import { ActivityService } from './services/activity/activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityRepository, ActivityEntity]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ...CommandHandlers,
    ...QueryHandlers,
    ActivitySubscriber,
  ],
})
export class ActivityModule {}
