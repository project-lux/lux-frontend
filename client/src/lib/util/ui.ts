import { IOrderedItems } from '../../types/ISearchResults'

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
 * Function used to sort facet values for the bar chart
 * @param {IOrderedItems} a facet value
 * @param {IOrderedItems} b facet value to compare against a
 * @returns {number}
 */
export const sortFacetValues = (a: IOrderedItems, b: IOrderedItems): number => {
  const aValue = a.value as string
  const bValue = b.value as string
  if (aValue < bValue) {
    return -1
  }

  if (aValue > bValue) {
    return 1
  }

  return 0
}
