import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateCarsCommand,
  UpdateCarsCommand,
  DeleteCarsCommand,
} from '../../commands/impl';
import { CreateCarsDto, UpdateCarsDto } from '../../dto';
import { TextResponseModel } from '../../models/text-response.model';
import { GetSingleCarQuery, GetAllCarsQuery } from '../../queries/impl';
import { CarsEntity } from '../../repositories/cars.entity';

@Injectable()
export class CarsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleCars(id: number): Promise<CarsEntity> {
    return this.queryBus.execute(new GetSingleCarQuery(id));
  }

  async getAllCars(): Promise<CarsEntity[]> {
    return this.queryBus.execute(new GetAllCarsQuery());
  }

  async createCars(createCarsDto: CreateCarsDto): Promise<CarsEntity> {
    return this.commandBus.execute(new CreateCarsCommand(createCarsDto));
  }

  async updateCars(updateCarsDto: UpdateCarsDto): Promise<CarsEntity> {
    return this.commandBus.execute(new UpdateCarsCommand(updateCarsDto));
  }

  async deleteCars(id: number): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteCarsCommand(id));
  }
}
