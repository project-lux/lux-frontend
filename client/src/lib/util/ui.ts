/**
 * Return column width of child elements
 * @param {boolean} expandColumn - (sub)document to examine
 * @returns {string} Bootstrap column width of TextValue and TextLabel
 */
export const getColumnWidth = (expandColumns: boolean): Array<string> => [
  expandColumns ? 'col-md-12' : 'col-md-9',
  expandColumns ? 'col-md-12' : 'col-md-3',
]
