import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityRepository } from '../infrastructure/repositories';
import { CommandHandlers } from './commands/handlers';
import { ActivityController } from './controllers';
import { QueryHandlers } from './queries/handlers';
import { ActivityService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ActivityRepository]),
        CqrsModule,
    ],
    controllers: [ActivityController],
    providers: [ActivityService, ...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
