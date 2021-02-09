import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferRepository } from '../infrastructure/repositories';
import { CommandHandlers } from './commands/handlers';
import { OfferController } from './controllers';
import { QueryHandlers } from './queries/handlers';
import { OfferService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([OfferRepository]),
        CqrsModule,
    ],
    controllers: [OfferController],
    providers: [OfferService, ...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
