import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { ElasticSearchConfigService } from './config';
import { ElasticSearchService } from './services';

/**
 * Wrapper module for ElasticsearchModule with async configuration, and ElasticSearchService with all Elasticsearch methods (index, search, etc.)
 */
@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({ useClass: ElasticSearchConfigService }),
  ],
  providers: [ElasticSearchService],
  exports: [ElasticsearchModule, ElasticSearchService],
})
export class ElasticSearchModule {}
