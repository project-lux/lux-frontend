import { isUndefined } from 'lodash'

import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
// import config from '../../config/config'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import { getFieldToEntityRelationship } from '../advancedSearch/stateManager'
import { isValidDateObject, getDefaultDate } from '../facets/dateParser'
import { comparators } from '../../config/advancedSearch/inputTypes'
import { SEARCH_TYPE_PARAM } from '../../config/aiAssistedSearch/variables'
import { DEFAULT_PAGE_LENGTH } from '../../config/searchTypes'

export default class AiDisambigationParser {
  aiDisambiguation: Array<IAiDisambiguation>
  aiInterpretation: Array<{ [key: string]: string }>

  constructor(json: Array<IAiDisambiguation>) {
    this.aiDisambiguation = json
    this.aiInterpretation = []
  }

  /**
   * Returns the array of AI disambiguation options
   * @returns {Array<IAiDisambiguation>}
   */
  getData(): Array<IAiDisambiguation> {
    return this.aiDisambiguation
  }

  /**
   * Returns the number of AI disambiguation options
   * @returns {number}
   */
  getCount(): number {
    return this.aiDisambiguation.length
  }

  /**
   * Returns true if there are any AI disambiguation options
   * @returns {boolean}
   */
  hasDisambiguation(): boolean {
    return this.aiDisambiguation.length > 0
  }

  /**
   * Return the natural query strings from the AI disambiguation options
   * @returns {Array<string>}
   */
  getNaturalQueries(): Array<string> {
    return this.aiDisambiguation.map((option) => option.natural)
  }

  /**
   * Return the parsed query strings from the AI disambiguation options
   * @returns {Array<string>}
   */
  getParsedQueries(): Array<string> {
    return this.aiDisambiguation.map((option) => option.parsed)
  }

  /**
   * Return the query objects from the AI disambiguation options
   * @returns {Array<object>}
   */
  getQueries(): Array<object> {
    return this.aiDisambiguation.map((option) => option.query)
  }

  /**
   * Return the query params for the links available in the disambiguation
   * @param {string} search - The current search string from the URL
   * @param {IAdvancedSearchState} queryData - The advanced search query object generated from the user's initial search string
   * @param {string} sq - The natural query string
   * @param {string} qt - The current query tab
   * @returns {URLSearchParams}
   */
  static getUrlParams = (
    search: string,
    queryData: IAdvancedSearchState,
    sq: string,
    qt: string,
  ): URLSearchParams => {
    const newUrlParams = new URLSearchParams(search)
    newUrlParams.set('q', JSON.stringify(queryData))
    newUrlParams.set('pageLength', DEFAULT_PAGE_LENGTH.toString())
    newUrlParams.set('sq', sq)
    newUrlParams.set('qt', qt)
    newUrlParams.set(
      SEARCH_TYPE_PARAM,
      newUrlParams.has(SEARCH_TYPE_PARAM)
        ? (newUrlParams.get(SEARCH_TYPE_PARAM) as string)
        : 'simple',
    )
    return newUrlParams
  }

  static convertAdvancedSearchValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return value === 1 ? 'Yes' : 'No'
    }
    const dateObj = new Date(value)
    if (isValidDateObject(dateObj)) {
      const { year, month, day } = getDefaultDate(value)
      return `${month}-${day}-${year}`
    }
    return value
  }

  static getFieldLabel = (
    parentScope: string,
    searchTerm: string,
    comparator?: string,
  ): string | null => {
    const searchTermConfig = advancedSearch().terms[parentScope][searchTerm]
    if (!isUndefined(searchTermConfig)) {
      if (searchTermConfig.relation === 'date' && !isUndefined(comparator)) {
        return `${searchTermConfig.aiInterpretationLabel} ${comparators[comparator as string] || ''}`
      }
      return searchTermConfig.aiInterpretationLabel
    }
    return null
  }

  static parseAiDisambiguationQuery(
    obj: { [key: string]: Array<string> },
    query: IAdvancedSearchState,
    scope: string,
    prevField: string,
  ): { [key: string]: Array<string> } {
    const keys = Object.keys(query)
    for (const key of keys) {
      // Skip over special keys that are not part of the actual query fields
      if (
        key === '_scope' ||
        key === '_options' ||
        key === '_comp' ||
        key === '_lang'
      ) {
        continue
      }

      const nestedObject = query[key]
      const relation = getFieldToEntityRelationship(scope, key) || ''
      const fieldLabel =
        AiDisambigationParser.getFieldLabel(
          scope,
          key,
          query._comp as string | undefined,
        ) || key

      if (!Array.isArray(nestedObject) && typeof nestedObject === 'object') {
        AiDisambigationParser.parseAiDisambiguationQuery(
          obj,
          nestedObject,
          relation,
          fieldLabel,
        )
      }
      // > < >= <= ==
      if (Array.isArray(nestedObject)) {
        nestedObject.map((nestedObj) =>
          AiDisambigationParser.parseAiDisambiguationQuery(
            obj,
            nestedObj,
            scope,
            prevField,
          ),
        )
      }

      if (
        typeof nestedObject === 'string' ||
        typeof nestedObject === 'number'
      ) {
        const newValue =
          AiDisambigationParser.convertAdvancedSearchValue(nestedObject)
        if (prevField === '') {
          if (obj.hasOwnProperty(fieldLabel)) {
            obj[fieldLabel].push(newValue)
          } else {
            obj[fieldLabel] = [newValue]
          }
        } else {
          const field = prevField as string
          if (obj.hasOwnProperty(field)) {
            obj[field].push(newValue)
          } else {
            obj[field] = [newValue]
          }
        }
      }
    }
    return obj
  }

  /**
   * Return the query object in a flattened object where the keys are the query fields from the advancedSearch.ts configuration
   * The values will be the values from the corresponding query fields.
   */
  static getAiDisambiguationInterpretation(
    query: IAdvancedSearchState,
    scope?: string,
  ): Record<string, Array<string>> {
    const initialObj: Record<string, Array<string>> = {}
    // return this.aiDisambiguation.map((aiDis: IAiDisambiguation) => {
    const effectiveScope = scope || (query._scope as string)
    return AiDisambigationParser.parseAiDisambiguationQuery(
      initialObj,
      query,
      effectiveScope,
      '',
    )
  }
}
