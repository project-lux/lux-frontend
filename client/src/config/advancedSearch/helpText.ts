/**
 * Help Text configuration for advanced search components that are not returned from the server.
 */

export const nonSearchTermHelpText: {
  [key: string]: { helpText: string; label: string }
} = {
  AND: {
    helpText:
      'A result matches if All of the included fields are found. This is similar to a Boolean AND operator.',
    label: 'have All of',
  },
  OR: {
    helpText:
      'A result matches if Any of the included fields are found. This is similar to a Boolean OR operator.',
    label: 'have Any of',
  },
  NOT: {
    helpText:
      'A result matches if None of the included fields are found. This is similar to a Boolean NOT operator. ',
    label: 'have None of',
  },
  '<': {
    helpText: 'Search for records less than the given value.',
    label: 'Less than',
  },
  '<=': {
    helpText: 'Search for records less than or equal to the given value.',
    label: 'Less than or Equal to',
  },
  '>': {
    helpText: 'Search for records greater than the given value.',
    label: 'Greater than',
  },
  '>=': {
    helpText: 'Search for records greater than or equal to the given value.',
    label: 'Greater than or Equal to',
  },
  '=': {
    helpText: 'Search for records that equal the given value.',
    label: 'Equals',
  },
  '!=': {
    helpText: 'Search for records that do not equal the given value.',
    label: 'Not Equals',
  },
  boosted: {
    helpText:
      'Treat this row as more important than other rows for determining the order of the results.',
    label: 'Boosted',
  },
  caseSensitive: {
    helpText: 'If checked, the case of the terms must match.',
    label: 'Case Sensitive',
  },
  diacriticSensitive: {
    helpText: 'If checked, any diacritics on the characters must match.',
    label: 'Diacritic Sensitive',
  },
  exact: {
    helpText: 'Find this complete search string, with no other terms.',
    label: 'Exact',
  },
  fieldSelectRow: {
    helpText:
      'Select Multiple Fields to enter more than one search criterion. Multiple Fields will prompt you to select a grouping for those criteria by using: ALL, ANY, NONE. Use Single Field to select and search for a specific term. When using Multiple Fields add a Single Field when you are ready to enter search term(s) in a text box.',
    label: '',
  },
  options: {
    helpText:
      'By default, LUX applies Linguistic Stemming and Wildcarding On to your Advanced Search string, which creates broader results by looking for variants of words. For this reason, you may see results that do not exactly match the terms you enter. The Gear icon allows you to turn off these options and apply other specifications.',
    label: 'Options',
  },
  punctuationSensitive: {
    helpText: 'If checked, any punctuation must match.',
    label: 'Punctuation Sensitive',
  },
  remove: {
    helpText: 'Remove this row and any rows nested beneath it from the search.',
    label: 'Remove',
  },
  searchSwitch: {
    helpText:
      'Use Advanced Search options to specify and enter your search terms. Use Simple Search to create nested searches; these can be Boolean or phrase searches. Select Multiple Fields to enter more than one search criterion. Multiple Fields will prompt you to select a grouping (ALL, ANY, NONE).  Use Single Field to select and search for a specific term. When using Multiple Fields add a Single Field when you are ready to enter search term(s) in a text box.',
    label: '',
  },
  stemmed: {
    helpText:
      'If checked, any linguistic variant will match (birds will match bird and birding).',
    label: 'Stemmed',
  },
  wildcarded: {
    helpText:
      'If checked, ? will match any one character, and * will match any number of characters, rather than the characters "?" and "*".',
    label: 'Wildcarded',
  },
}
