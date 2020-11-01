import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActivityCommand } from '../../commands/impl/create-activity.command';
import { DeleteActivityCommand } from '../../commands/impl/delete-activity.command';
import { UpdateActivityCommand } from '../../commands/impl/update-activity.command';
import { ActivityIdDto, CreateActivityDto, UpdateActivityDto } from '../../dto';
import { TextResponseModel } from '../../models/text-response.model';
import {
  GetSingleActivityQuery,
  GetAllActivitiesQuery,
} from '../../queries/impl';
import { ActivityEntity } from '../../repositories/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleActivity(
    activityIdDto: ActivityIdDto,
  ): Promise<ActivityEntity> {
    return this.queryBus.execute(new GetSingleActivityQuery(activityIdDto));
  }

  async getAllActivities(): Promise<ActivityEntity[]> {
    return this.queryBus.execute(new GetAllActivitiesQuery());
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<ActivityEntity> {
    return this.commandBus.execute(
      new CreateActivityCommand(createActivityDto),
    );
  }

  async updateActivity(
    updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityEntity> {
    return this.commandBus.execute(
      new UpdateActivityCommand(updateActivityDto),
    );
  }

  async deleteActivity(
    activityIdDto: ActivityIdDto,
  ): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteActivityCommand(activityIdDto));
  }
}
