import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../../utils/utils.module';
import { CommandHandlers } from './commands/handlers';
import { CarsController } from './controllers/cars.controller';
import { QueryHandlers } from './queries/handlers';
import { CarsRepository } from '../../database/repositories';
import { CarsService } from './services/cars.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarsRepository]),
    CqrsModule,
    UtilsModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, ...CommandHandlers, ...QueryHandlers],
})
export class CarsModule {}
