import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCarsCommand } from '../../commands/impl/create-cars.command';
import { DeleteCarsCommand } from '../../commands/impl/delete-cars.command';
import { UpdateCarsCommand } from '../../commands/impl/update-cars.command';
import { CarsIdDto, CreateCarsDto, UpdateCarsDto } from '../../dto';
import { TextResponseModel } from '../../models/text-response.model';
import {
  GetSingleCarQuery,
  GetAllCarsQuery,
} from '../../queries/impl';
import { CarsEntity } from '../../repositories/cars.entity';

@Injectable()
export class CarsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getSingleCars(
    CarsIdDto: CarsIdDto,
  ): Promise<CarsEntity> {
    return this.queryBus.execute(new GetSingleCarQuery(CarsIdDto));
  }

  async getAllActivities(): Promise<CarsEntity[]> {
    return this.queryBus.execute(new GetAllCarsQuery());
  }

  async createCars(
    createCarsDto: CreateCarsDto,
  ): Promise<CarsEntity> {
    return this.commandBus.execute(
      new CreateCarsCommand(createCarsDto),
    );
  }

  async updateCars(
    updateCarsDto: UpdateCarsDto,
  ): Promise<CarsEntity> {
    return this.commandBus.execute(
      new UpdateCarsCommand(updateCarsDto),
    );
  }

  async deleteCars(
    CarsIdDto: CarsIdDto,
  ): Promise<TextResponseModel> {
    return this.commandBus.execute(new DeleteCarsCommand(CarsIdDto));
  }
}
