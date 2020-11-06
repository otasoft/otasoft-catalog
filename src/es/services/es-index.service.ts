import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { ISearchBody, ISearchResult } from "../interfaces";

@Injectable()
export class EsIndexService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
    ) {}
    /**
     * A method that indexes Elasticsearch with a new data.
     *
     * @param {string} index
     * @param {*} body {ISearchBody}
     * @return {*}  {Promise<void>}
     */
    async indexWithData(index: string, body: ISearchBody): Promise<unknown> {
        return await this.elasticsearchService.index<ISearchResult, ISearchBody>({
            index,
            body: {
                id: body.id,
                name: body.name,
                description: body.description
            }
        })
    }
}