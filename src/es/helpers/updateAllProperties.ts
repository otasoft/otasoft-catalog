import { ISearchBody } from "../interfaces";
/**
 * Method that loops over an object and updates each of its properties to return a string.
 *
 * @param {ISearchBody} recordBody
 * @return {*} 
 */
export const updateAllProperties = (recordBody: ISearchBody) => {
    const updatedBody = Object.entries(recordBody).reduce((result, [key, value]) => {
        return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return updatedBody
}