import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateActivityDto, UpdateActivityDto } from '../dto';
import { ActivityEntity } from '../entities';
import { ActivityService } from '../services/activity.service';
import { TextResponseModel } from '../models/text-response.model';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @MessagePattern({ role: 'activity', cmd: 'getSingle' })
  async getSingleActivity(id: number): Promise<ActivityEntity> {
    return this.activityService.getSingleActivity(id);
  }

  @MessagePattern({ role: 'activity', cmd: 'getAll' })
  async getAllActivities(): Promise<ActivityEntity[]> {
    return this.activityService.getAllActivities();
  }

  @MessagePattern({ role: 'activity', cmd: 'getActivityByQuery' })
  async getActivitiesByQuery(query: string): Promise<ActivityEntity[]> {
    return this.activityService.getActivitiesByQuery(query);
  }

  @MessagePattern({ role: 'activity', cmd: 'create' })
  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<ActivityEntity> {
    return this.activityService.createActivity(createActivityDto);
  }

  @MessagePattern({ role: 'activity', cmd: 'update' })
  async updateActivity(
    updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityEntity> {
    return this.activityService.updateActivity(updateActivityDto);
  }

  @MessagePattern({ role: 'activity', cmd: 'delete' })
  async deleteActivity(id: number): Promise<TextResponseModel> {
    return this.activityService.deleteActivity(id);
  }
}
