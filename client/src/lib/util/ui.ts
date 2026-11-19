import { isValidElement } from 'react'

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
 * Return a React key for an item in a rendered list. The index is always
 * included so items that share a value or an existing key stay unique.
 * React elements that already carry a key use it as the prefix; elements
 * without one use 'element'; anything else uses its string value.
 * @param {unknown} value - the list item (string or React element)
 * @param {number} ind - the item's index in the list
 * @returns {string} key for the wrapping element
 */
export const getListItemKey = (value: unknown, ind: number): string => {
  if (isValidElement(value)) {
    return value.key !== null ? `${value.key}-${ind}` : `element-${ind}`
  }
  return `${value}-${ind}`
}
