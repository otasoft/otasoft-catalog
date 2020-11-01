import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { ActivityController } from './controllers/activity/activity.controller';
import { QueryHandlers } from './queries/handlers';
import { ActivityService } from './services/activity/activity.service';

@Module({
  imports: [CqrsModule],
  controllers: [ActivityController],
  providers: [ActivityService, ...CommandHandlers, ...QueryHandlers],
})
export class ActivityModule {}
