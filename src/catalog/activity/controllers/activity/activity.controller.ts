import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateActivityDto } from '../../dto/create-activity.dto';
import { ActivityIdDto } from '../../dto/activity-id.dto';
import { UpdateActivityDto } from '../../dto/update-activity.dto';
import { ActivityEntity } from '../../repositories/activity.entity';
import { ActivityService } from '../../services/activity/activity.service';
import { TextResponseModel } from '../../models/text-response.model';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @MessagePattern({ role: 'activity', cmd: 'getSingle' })
  async getSingleActivity(
    activityIdDto: ActivityIdDto,
  ): Promise<ActivityEntity> {
    return this.activityService.getSingleActivity(activityIdDto);
  }

  @MessagePattern({ role: 'activity', cmd: 'getAll' })
  async getAllActivities(): Promise<ActivityEntity[]> {
    return this.activityService.getAllActivities();
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
  async deleteActivity(
    activityIdDto: ActivityIdDto,
  ): Promise<TextResponseModel> {
    return this.activityService.deleteActivity(activityIdDto);
  }
}
