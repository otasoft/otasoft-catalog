import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogEntities } from './entities';
import { CatalogSubscribers } from './subscribers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        entities: [...CatalogEntities],
        synchronize: true,
        replication: {
          master: {
            host: configService.get('MASTER_HOST'),
            port: configService.get('MASTER_PORT'),
            username: configService.get('MASTER_USER'),
            password: configService.get('MASTER_PASSWORD'),
            database: configService.get('MASTER_DATABASE'),
          },
          slaves: [{
            host: configService.get('SLAVE_HOST'),
            port: configService.get('SLAVE_PORT'),
            username: configService.get('SLAVE_USER'),
            password: configService.get('SLAVE_PASSWORD'),
            database: configService.get('SLAVE_DATABASE'),
          }]
        }
      }),
    }),
  ],
  providers: [...CatalogSubscribers],
})
export class DbModule {}
