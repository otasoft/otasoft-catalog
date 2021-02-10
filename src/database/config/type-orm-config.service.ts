import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      synchronize: true,
      autoLoadEntities: true,
      replication: {
        master: {
          host: process.env.MASTER_HOST,
          port: parseInt(process.env.MASTER_PORT),
          username: process.env.MASTER_USER,
          password: process.env.MASTER_PASSWORD,
          database: process.env.MASTER_DATABASE,
        },
        slaves: [
          {
            host: process.env.SLAVE_HOST,
            port: parseInt(process.env.SLAVE_PORT),
            username: process.env.SLAVE_USER,
            password: process.env.SLAVE_PASSWORD,
            database: process.env.SLAVE_DATABASE,
          },
        ],
      },
    };
  }
}
