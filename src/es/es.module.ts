import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { EsService } from './es.service';

/**
 * Wrapper module for ElasticsearchModule with async configuration, and EsService with all Elasticsearch methods (index, search, etc.)
 */
@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: `http://${configService.get(
          'ELASTICSEARCH_HOST',
        )}:${configService.get('ELASTICSEARCH_PORT')}`,
        // This will be added in the next major release of the elasticsearch client library
        // proxy: 'http:user:password@//localhost:port/elasticsearch',
        maxRetries: 10,
        requestTimeout: 5000,
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EsService],
  exports: [ElasticsearchModule, EsService],
})
export class EsModule {}
