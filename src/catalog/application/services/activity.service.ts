import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateActivityCommand,
  DeleteActivityCommand,
  UpdateActivityCommand,
} from '../commands/impl';
import { CreateActivityDto, UpdateActivityDto } from '../dto';
import { TextResponseModel } from '../models';
import {
  GetSingleActivityQuery,
  GetAllActivitiesQuery,
  GetActivitiesByQueryQuery,
} from '../queries/impl';
import { OfferEntity } from '../../infrastructure/entities';

@Injectable()
export class ActivityService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleActivity(id: number): Promise<OfferEntity> {
    return this.queryBus.execute(new GetSingleActivityQuery(id));
  }

  async getAllActivities(): Promise<OfferEntity[]> {
    return this.queryBus.execute(new GetAllActivitiesQuery());
  }

  async getActivitiesByQuery(query: string): Promise<OfferEntity[]> {
    return this.queryBus.execute(new GetActivitiesByQueryQuery(query));
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<OfferEntity> {
    return this.commandBus.execute(
      new CreateActivityCommand(createActivityDto),
    );
  }

  async updateActivity(
    updateActivityDto: UpdateActivityDto,
  ): Promise<OfferEntity> {
    return this.commandBus.execute(
      new UpdateActivityCommand(updateActivityDto),
    );
  }

  async deleteActivity(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteActivityCommand(id));
  }
}
