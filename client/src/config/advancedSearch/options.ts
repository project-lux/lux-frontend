import config from '../config'

export type QueryOption =
  | 'case-sensitive'
  | 'case-insensitive'
  | 'diacritic-sensitive'
  | 'diacritic-insensitive'
  | 'punctuation-sensitive'
  | 'punctuation-insensitive'
  | 'whitespace-sensitive'
  | 'whitespace-insensitive'
  | 'unstemmed'
  | 'stemmed'
  | 'unwildcarded'
  | 'wildcarded'
  | 'exact'

/**
 * Checks if configuration is defined
 * @param {any} terms the object containing advanced search terms or undefined
 * @param {any} options the object containing advanced search field options or undefined
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkConfiguration = (terms: any, options: any): boolean =>
  terms === undefined || options === undefined

/**
 * Gets the default search options for the user selected advanced search field.
 * @param scope string; current search scope
 * @param term string; selected search term
 * @returns QueryOption[]; list of options
 */
export function getDefaultSearchOptions(
  scope: string,
  term: string,
): QueryOption[] {
  const { terms, options } = config.advancedSearch
  // this conditional should only happen when there is no advanced search config
  if (checkConfiguration(terms, options)) {
    return []
  }

  if (terms.hasOwnProperty(scope)) {
    const scopedTerms = terms[scope as keyof typeof terms]
    if (scopedTerms.hasOwnProperty(term)) {
      const termConfig = scopedTerms[term as keyof typeof scopedTerms]
      if (termConfig.hasOwnProperty('defaultOptionsName')) {
        const defaultOptions =
          options[termConfig.defaultOptionsName as 'keyword' | 'exact'].default
        return defaultOptions
      }
    }
  }
  return []
}

/**
 * Determines what options to display with the selected advanced search field.
 * @param scope string; current search scope
 * @param term string; selected search term
 * @returns QueryOption[]; list of options
 */
export function getAllowedSearchOptions(
  scope: string,
  term: string,
): QueryOption[] {
  const { terms, options } = config.advancedSearch

  // this conditional should only happen when there is no advanced search config
  if (checkConfiguration(terms, options)) {
    return []
  }

  const scopedTerms = terms[scope as keyof typeof terms]
  if (scopedTerms.hasOwnProperty(term)) {
    const termConfig = scopedTerms[term as keyof typeof scopedTerms]
    if (termConfig.hasOwnProperty('allowedOptionsName')) {
      return options[termConfig.allowedOptionsName as 'keyword' | 'exact']
        .allowed
    }
  }
  return []
}

/**
 * Removes or adds values from the current JSON search value based on options the user has selected.
 * @returns object containing the values to add or remove
 */
export const addRemoveConfig: {
  [key in QueryOption]: {
    optionsToAdd: QueryOption[]
    optionsToRemove: QueryOption[]
  }
} = {
  'case-sensitive': {
    optionsToAdd: ['case-sensitive'],
    optionsToRemove: ['case-insensitive'],
  },
  'case-insensitive': {
    optionsToAdd: ['case-insensitive'],
    optionsToRemove: ['case-sensitive', 'exact'],
  },
  'diacritic-sensitive': {
    optionsToAdd: ['diacritic-sensitive'],
    optionsToRemove: ['diacritic-insensitive'],
  },
  'diacritic-insensitive': {
    optionsToAdd: ['diacritic-insensitive'],
    optionsToRemove: ['diacritic-sensitive', 'exact'],
  },
  'punctuation-sensitive': {
    optionsToAdd: ['punctuation-sensitive'],
    optionsToRemove: ['punctuation-insensitive'],
  },
  'punctuation-insensitive': {
    optionsToAdd: ['punctuation-insensitive'],
    optionsToRemove: ['punctuation-sensitive', 'exact'],
  },
  'whitespace-sensitive': {
    optionsToAdd: ['whitespace-sensitive'],
    optionsToRemove: ['whitespace-insensitive'],
  },
  'whitespace-insensitive': {
    optionsToAdd: ['whitespace-insensitive'],
    optionsToRemove: ['whitespace-sensitive', 'exact'],
  },
  unstemmed: {
    optionsToAdd: ['unstemmed'],
    optionsToRemove: ['stemmed'],
  },
  stemmed: {
    optionsToAdd: ['stemmed'],
    optionsToRemove: ['unstemmed', 'exact'],
  },
  unwildcarded: {
    optionsToAdd: ['unwildcarded'],
    optionsToRemove: ['wildcarded'],
  },
  wildcarded: {
    optionsToAdd: ['wildcarded'],
    optionsToRemove: ['unwildcarded', 'exact'],
  },
  exact: {
    optionsToAdd: [
      'case-sensitive',
      'diacritic-sensitive',
      'punctuation-sensitive',
      'whitespace-sensitive',
      'unstemmed',
      'unwildcarded',
    ],
    optionsToRemove: [
      'case-insensitive',
      'diacritic-insensitive',
      'punctuation-insensitive',
      'whitespace-insensitive',
      'stemmed',
      'wildcarded',
    ],
  },
}
