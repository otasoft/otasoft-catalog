import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class EsDeleteService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * Method that removes a record from the Elasticsearch index by id.
   *
   * @param {string} index
   * @param {number} catalogId
   * @return {*}  {Promise<void>}
   */
  async removeRecordById(index: string, catalogId: number): Promise<void> {
    await this.elasticsearchService.deleteByQuery({
      index,
      body: {
        query: {
          match: {
            id: catalogId,
          },
        },
      },
    });
  }
}
