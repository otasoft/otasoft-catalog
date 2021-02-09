import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from "@nestjs/elasticsearch";

export class ElasticSearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
      return {
        node: `http://${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`,
          // This will be added in the next major release of the elasticsearch client library
          // proxy: 'http:user:password@//localhost:port/elasticsearch',
          maxRetries: 10,
          requestTimeout: 5000,
          auth: {
            username: process.env.ELASTICSEARCH_USERNAME,
            password: process.env.ELASTICSEARCH_PASSWORD,
          },
      };
    }
  }