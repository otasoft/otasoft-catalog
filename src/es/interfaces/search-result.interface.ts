import { ISearchBody } from './search-body.interface';
/**
 * @interface ISearchResult
 * @property {Object} - hits
 * @property {number} - total
 * @property {ISearchBody} - _source
 */
export interface ISearchResult {
  hits: {
    total: number;
    hits: {
      _source: ISearchBody;
    }[];
  };
}
