import IPlace from '../../types/data/IPlace'
import { IWktParseResult, parseWkt } from '../parse/data/mapHelper'

/**
 * Returns the criteria in string format for performing searches from timeline links
 * @param {Array<IEntity>} data; the date to add the label
 * @returns {string}
 */
export const getPinpoints = (data: Array<IPlace>): Array<IWktParseResult> => {
  return data
    .map((d) => {
      if (d.hasOwnProperty('defined_by')) {
        return parseWkt(d.defined_by!)
      }
      return null
    })
    .filter((d) => d !== null) as Array<IWktParseResult>
}
