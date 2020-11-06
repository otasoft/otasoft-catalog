import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { ISearchBody, ISearchResult } from "../interfaces";

@Injectable()
export class EsSearchService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
    ) {}
    /**
     * This method uses Elasticsearch engine to search for a text in certain index.
     * 
     * @param {string} index
     * @param {string} text
     * @return {*}  {Promise<ISearchBody[]>}
     */
    async searchByText(index: string, text: string): Promise<ISearchBody[]> {
        const { body } = await this.elasticsearchService.search<ISearchResult>({
            index,
            body: {
                query: {
                    multi_match: {
                        query: text,
                        fields: ['name', 'description'],
                    }
                }
            }
        })
        const hits = body.hits.hits;
        return hits.map(hit => hit._source);
    }
}