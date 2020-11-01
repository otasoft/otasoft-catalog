import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { CarsController } from './controllers/cars/cars.controller';
import { QueryHandlers } from './queries/handlers';
import { CarsEntity } from './repositories/cars.entity';
import { CarsRepository } from './repositories/cars.repository';
import { CarsService } from './services/cars/cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarsRepository, CarsEntity]), CqrsModule],
  controllers: [CarsController],
  providers: [CarsService, ...CommandHandlers, ...QueryHandlers],
})
export class CarsModule {}
