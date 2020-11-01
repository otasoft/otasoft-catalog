import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { CarsController } from './controllers/cars/cars.controller';
import { QueryHandlers } from './queries/handlers';
import { CarsService } from './services/cars/cars.service';

@Module({
  imports: [CqrsModule],
  controllers: [CarsController],
  providers: [CarsService, ...CommandHandlers, ...QueryHandlers],
})
export class CarsModule {}
