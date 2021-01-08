import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModuleAsyncOptions } from "@nestjs/elasticsearch";

export const esAsyncOptions: ElasticsearchModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
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
}