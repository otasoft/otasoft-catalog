import { ISearchBody } from '../interfaces';
/**
 * Method that loops over properties of a record object and returns a string of new properties
 * in a Elasticsearch script form, i.e. `'ctx._source["property"] = "value"'`.
 */
export const convertRecordBodyToEsString = (recordBody: ISearchBody): string => {
  const esString = Object.entries(recordBody).reduce(
    (result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    },
    '',
  );

  return esString;
};
