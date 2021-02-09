import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateActivityCommand,
  DeleteActivityCommand,
  UpdateActivityCommand,
} from '../commands/impl';
import { CreateActivityDto, UpdateActivityDto } from '../dto';
import { TextResponseModel } from '../models/text-response.model';
import {
  GetSingleActivityQuery,
  GetAllActivitiesQuery,
  GetActivitiesByQueryQuery,
} from '../queries/impl';
import { ActivityEntity } from '../../infrastructure/entities';

@Injectable()
export class ActivityService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleActivity(id: number): Promise<ActivityEntity> {
    return this.queryBus.execute(new GetSingleActivityQuery(id));
  }

  async getAllActivities(): Promise<ActivityEntity[]> {
    return this.queryBus.execute(new GetAllActivitiesQuery());
  }

  async getActivitiesByQuery(query: string): Promise<ActivityEntity[]> {
    return this.queryBus.execute(new GetActivitiesByQueryQuery(query));
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

  async deleteActivity(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteActivityCommand(id));
  }
}
