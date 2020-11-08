import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { updateAllProperties } from './helpers/updateAllProperties';
import { ISearchBody, ISearchResult } from './interfaces';

/**
 * Service containing Elasticsearch methods (i.e. index, search, update).
 *
 */
@Injectable()
export class EsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * Method that indexes Elasticsearch with a new data.
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
        description: body.description,
      },
    });
  }

  /**
   * Method that uses Elasticsearch engine to search for a text in certain index.
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
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map(hit => hit._source);
  }

  /**
   * Method that updates certain record based on updated record body.
   *
   * @param {string} index
   * @param {ISearchBody} recordBody
   * @return {*}  {Promise<unknown>}
   */
  async updateRecord(index: string, recordBody: ISearchBody): Promise<unknown> {
    return await this.elasticsearchService.updateByQuery({
      index,
      body: {
        query: {
          match: {
            id: recordBody.id,
          },
        },
        script: {
          inline: updateAllProperties,
        },
      },
    });
  }

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
