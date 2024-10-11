import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'
import { convertYearToISOYear, getLuxISOString } from '../../facets/dateParser'

/**
 * Returns the criteria in string format for performing searches from timeline links
 * @param {string} year; the date to add the label
 * @param {string} searchTerm; the ML search term to use in the criteria for dates
 * @param {IAdvancedSearchState} criteria; the criteria to update
 * @returns {string}
 */
export const formatDateJsonSearch = (
  year: string,
  searchTerm: string,
  criteria: IAdvancedSearchState,
): string => {
  const earliestISODate = getLuxISOString(
    convertYearToISOYear(year),
    '01',
    '01',
  )
  const latestISODate = getLuxISOString(convertYearToISOYear(year), '12', '31')

  return JSON.stringify({
    AND: [
      criteria,
      { [searchTerm]: latestISODate, _comp: '<=' },
      { [searchTerm]: earliestISODate.toString(), _comp: '>=' },
    ],
  })
}
