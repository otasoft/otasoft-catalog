import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCarsDto } from '../../dto/create-cars.dto';
import { CarsIdDto } from '../../dto/cars-id.dto';
import { UpdateCarsDto } from '../../dto/update-cars.dto';
import { CarsEntity } from '../../repositories/cars.entity';
import { CarsService } from '../../services/cars/cars.service';
import { TextResponseModel } from '../../models/text-response.model';

@Controller()
export class CarsController {
  constructor(private readonly CarsService: CarsService) {}

  @MessagePattern({ role: 'cars', cmd: 'getSingle' })
  async getSingleCars(
    CarsIdDto: CarsIdDto,
  ): Promise<CarsEntity> {
    return this.CarsService.getSingleCars(CarsIdDto);
  }

  @MessagePattern({ role: 'cars', cmd: 'getAll' })
  async getAllActivities(): Promise<CarsEntity[]> {
    return this.CarsService.getAllActivities();
  }

  @MessagePattern({ role: 'cars', cmd: 'create' })
  async createCars(
    createCarsDto: CreateCarsDto,
  ): Promise<CarsEntity> {
    return this.CarsService.createCars(createCarsDto);
  }

  @MessagePattern({ role: 'cars', cmd: 'update' })
  async updateCars(
    updateCarsDto: UpdateCarsDto,
  ): Promise<CarsEntity> {
    return this.CarsService.updateCars(updateCarsDto);
  }

  @MessagePattern({ role: 'cars', cmd: 'delete' })
  async deleteCars(
    CarsIdDto: CarsIdDto,
  ): Promise<TextResponseModel> {
    return this.CarsService.deleteCars(CarsIdDto);
  }
}
