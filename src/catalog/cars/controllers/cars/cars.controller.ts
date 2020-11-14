import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateCarsDto, UpdateCarsDto } from '../../dto';
import { CarsEntity } from '../../../../db/entities/cars.entity';
import { CarsService } from '../../services/cars/cars.service';
import { TextResponseModel } from '../../models/text-response.model';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @MessagePattern({ role: 'cars', cmd: 'getSingle' })
  async getSingleCars(id: number): Promise<CarsEntity> {
    return this.carsService.getSingleCars(id);
  }

  @MessagePattern({ role: 'cars', cmd: 'getAll' })
  async getAllACars(): Promise<CarsEntity[]> {
    return this.carsService.getAllCars();
  }

  @MessagePattern({ role: 'cars', cmd: 'create' })
  async createCars(createCarsDto: CreateCarsDto): Promise<CarsEntity> {
    return this.carsService.createCars(createCarsDto);
  }

  @MessagePattern({ role: 'cars', cmd: 'update' })
  async updateCars(updateCarsDto: UpdateCarsDto): Promise<CarsEntity> {
    return this.carsService.updateCars(updateCarsDto);
  }

  @MessagePattern({ role: 'cars', cmd: 'delete' })
  async deleteCars(id: number): Promise<TextResponseModel> {
    return this.carsService.deleteCars(id);
  }
}
