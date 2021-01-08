import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { esAsyncOptions } from './config';
import { EsService } from './es.service';

/**
 * Wrapper module for ElasticsearchModule with async configuration, and EsService with all Elasticsearch methods (index, search, etc.)
 */
@Global()
@Module({
  imports: [ElasticsearchModule.registerAsync(esAsyncOptions)],
  providers: [EsService],
  exports: [ElasticsearchModule, EsService],
})
export class EsModule {}
