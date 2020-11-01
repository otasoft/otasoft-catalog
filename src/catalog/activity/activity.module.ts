import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { ActivityController } from './controllers/activity/activity.controller';
import { QueryHandlers } from './queries/handlers';
import { ActivityEntity } from './repositories/activity.entity';
import { ActivityRepository } from './repositories/activity.repository';
import { ActivityService } from './services/activity/activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityRepository, ActivityEntity]), CqrsModule],
  controllers: [ActivityController],
  providers: [ActivityService, ...CommandHandlers, ...QueryHandlers],
})
export class ActivityModule {}
