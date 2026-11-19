/**
 * Return column width of child elements
 * @param {boolean} expandColumn - (sub)document to examine
 * @returns {string} Bootstrap column width of TextValue and TextLabel
 */
export const getColumnWidth = (expandColumns: boolean): Array<string> => [
  expandColumns ? 'col-md-12' : 'col-md-9',
  expandColumns ? 'col-md-12' : 'col-md-3',
]

/**
 * Return a React key for an item in a rendered list. React elements that
 * already carry a key keep it; anything else falls back to value + index.
 * @param {unknown} value - the list item (string or React element)
 * @param {number} ind - the item's index in the list
 * @returns {string} key for the wrapping element
 */
export const getListItemKey = (value: unknown, ind: number): string => {
  if (
    value !== null &&
    typeof value === 'object' &&
    'key' in value &&
    value.key !== null &&
    value.key !== undefined
  ) {
    return String(value.key)
  }
  return `${value}-${ind}`
}
