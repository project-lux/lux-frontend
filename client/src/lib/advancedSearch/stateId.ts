import _ from 'lodash'

/**
 * Returns a unique id from lodash uniqueId funciton
 * @returns {string}
 */
export const getStateId = (): string => _.uniqueId()
