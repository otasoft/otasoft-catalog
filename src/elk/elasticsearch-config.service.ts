import { Injectable } from "@nestjs/common";
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from "@nestjs/elasticsearch/dist/interfaces/elasticsearch-module-options.interface";

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
        return {
            node: process.env.ELASTICSEARCH_NODE,
            maxRetries: 10,
            requestTimeout: 5000,
            auth: {
                username: process.env.PROXY_BASIC_AUTH_USERNAME,
                password: process.env.PROXY_BASIC_AUTH_PASSWORD,
            }
        }
    }
}