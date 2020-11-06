import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EsServices } from "./services";

@Global()
@Module({
    imports: [ElasticsearchModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            node: configService.get('ELASTICSEARCH_NODE'),
            maxRetries: 10,
            requestTimeout: 5000,
            auth: {
                username: configService.get('ELASTICSEARCH_USERNAME'),
                password: configService.get('ELASTICSEARCH_PASSWORD'),
            }
        }),
        inject: [ConfigService],
    }),],
    providers: [...EsServices],
    exports: [ElasticsearchModule],
})
export class EsWrapperModule {}