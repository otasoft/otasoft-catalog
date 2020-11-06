import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { updateAllProperties } from "../helpers/updateAllProperties";
import { ISearchBody } from "../interfaces";

@Injectable()
export class EsUpdateService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    async updateRecord(index: string, recordBody: ISearchBody): Promise<unknown> {
        return await this.elasticsearchService.updateByQuery({
            index,
            body: {
                query: {
                    match: {
                        id: recordBody.id,
                    }
                },
                script: {
                    inline: updateAllProperties
                }
            }
        })
    }
}