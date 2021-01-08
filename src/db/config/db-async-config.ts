import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { CatalogEntities } from '../entities';

export const dbAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    entities: [...CatalogEntities],
    synchronize: true,
    replication: {
      master: {
        host: configService.get<string>('MASTER_HOST'),
        port: configService.get<number>('MASTER_PORT'),
        username: configService.get<string>('MASTER_USER'),
        password: configService.get<string>('MASTER_PASSWORD'),
        database: configService.get<string>('MASTER_DATABASE'),
      },
      slaves: [
        {
          host: configService.get<string>('SLAVE_HOST'),
          port: configService.get<number>('SLAVE_PORT'),
          username: configService.get<string>('SLAVE_USER'),
          password: configService.get<string>('SLAVE_PASSWORD'),
          database: configService.get<string>('SLAVE_DATABASE'),
        },
      ],
    },
  }),
};
