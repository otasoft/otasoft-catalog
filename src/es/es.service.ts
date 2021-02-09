import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { convertRecordBodyToEsString } from './helpers';
import { ISearchBody, ISearchResult } from './interfaces';

/**
 * Service containing Elasticsearch methods (i.e. index, search, update).
 */
@Injectable()
export class EsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * Method that indexes Elasticsearch with a new data.
   */
  async indexWithData(index: string, body: ISearchBody): Promise<unknown> {
    return await this.elasticsearchService.index<ISearchResult, ISearchBody>({
      index,
      body,
      refresh: true,
    });
  }
  /**
   * Method that uses Elasticsearch engine to search for a text in certain index.
   * It looks for a match in both `name` and `description` fields and returns an array of search results.
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
    return hits.map((hit) => hit._source);
  }
  /**
   * Method that updates certain record by ID in Elasticsearch based on updated record body.
   * It uses an inline script to update all record properties.
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
          inline: convertRecordBodyToEsString(recordBody),
        },
      },
      refresh: true,
    });
  }
  /**
   * Method that removes a record from the Elasticsearch index by id.
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
      refresh: true,
    });
  }
  /**
   * Method that performs Elasticsearch reindex using ID.
   * Copies documents from a source to a destination.
   */
  async reindexById(
    sourceIndex: string,
    destIndex: string,
    documentId: number,
  ) {
    await this.elasticsearchService.reindex({
      wait_for_completion: true,
      refresh: true,
      body: {
        source: {
          index: sourceIndex,
          query: {
            match: { id: documentId },
          },
        },
        dest: {
          index: destIndex,
        },
      },
    });
  }
}
