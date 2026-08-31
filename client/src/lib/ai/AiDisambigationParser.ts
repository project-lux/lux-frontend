import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
// import config from '../../config/config'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import { getFieldToEntityRelationship } from '../advancedSearch/stateManager'

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

  static getFieldLabel = (
    parentScope: string,
    searchTerm: string,
  ): string | null => {
    const searchTermConfig = advancedSearch().terms[parentScope][searchTerm]
    // config.advancedSearch.terms[parentScope][searchTerm]
    return searchTermConfig !== undefined
      ? searchTermConfig.aiInterpretationLabel
      : null
  }

  static parseAiDisambiguationQuery(
    obj: { [key: string]: Array<string> },
    query: IAdvancedSearchState,
    scope: string,
    prevField: string,
  ): { [key: string]: Array<string> } {
    const keys = Object.keys(query)
    for (const key of keys) {
      const nestedObject = query[key]

      if (!Array.isArray(nestedObject) && typeof nestedObject === 'object') {
        const relation = getFieldToEntityRelationship(scope, key) || ''
        const fieldLabel = AiDisambigationParser.getFieldLabel(scope, key)
        AiDisambigationParser.parseAiDisambiguationQuery(
          obj,
          nestedObject,
          relation,
          fieldLabel || key,
        )
      }

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

      if (typeof nestedObject === 'string') {
        if (prevField === '') {
          if (obj.hasOwnProperty(key)) {
            obj[key].push(nestedObject)
          } else {
            obj[key] = [nestedObject]
          }
        } else {
          const field = prevField as string
          if (obj.hasOwnProperty(field)) {
            obj[field].push(nestedObject)
          } else {
            obj[field] = [nestedObject]
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
  ): Record<string, Array<string>> {
    const initialObj: Record<string, Array<string>> = {}
    // return this.aiDisambiguation.map((aiDis: IAiDisambiguation) => {
    const scope = query._scope as string
    return AiDisambigationParser.parseAiDisambiguationQuery(
      initialObj,
      query,
      scope,
      '',
    )
  }
}
