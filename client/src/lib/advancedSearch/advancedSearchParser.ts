/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash'

import { conditionals } from '../../config/advancedSearch/conditionals'
import { dimensions, text } from '../../config/advancedSearch/inputTypes'
import { getDefaultSearchOptions } from '../../config/advancedSearch/options'
// import config from '../../config/config'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import {
  convertLuxISODateToISODate,
  isValidDateObject,
} from '../facets/dateParser'
import { checkForStopWords } from '../util/translate'

import { getFieldToEntityRelationship } from './stateManager'

/**
 * Returns the property that is a search term for the provided object
 * @param obj IAdvancedSearchState; object for which to parse keys
 * @returns string
 */
export const getProperty = (obj: IAdvancedSearchState): string => {
  const objKeys = Object.keys(obj)
  for (const key of objKeys) {
    if (!key.startsWith('_')) {
      return key
    }
  }

  return ''
}

/**
 * Returns if the object does not contain needed data
 * @param stateKeys Array<string>; the keys of the current state object
 * @returns boolean
 */
export const isEmptyObj = (stateKeys: Array<string>): boolean =>
  stateKeys.length === 1 && stateKeys[0] === '_stateId'

/**
 * Determines if the provided search term is a group/conditional
 * @param {string} searchTerm the search term from the advanced search state
 * @returns boolean
 */
const isAGroup = (searchTerm: string): boolean =>
  Object.keys(conditionals).includes(searchTerm)

/**
 * Determines if the property given requires text input
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isTextInput = (searchTerm: string): boolean =>
  Object.keys(text).includes(searchTerm)

/**
 * Determines if the property given requires range input using a comparator
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isRangeInput = (searchTerm: string): boolean =>
  dimensions.includes(searchTerm)

/**
 * Determines if the property given requires selector input
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isRecordTypeInput = (searchTerm: string): boolean =>
  searchTerm.includes('recordType')

/**
 * Determines if the property given requires date input using a comparator
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isDateInput = (searchTerm: string): boolean =>
  searchTerm.toLowerCase().includes('date')

/**
 * Determines if the property given requires boolean checkbox input
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isBooleanInput = (searchTerm: string): boolean =>
  searchTerm === 'hasDigitalImage' ||
  searchTerm === 'isOnline' ||
  searchTerm === 'isPublicDomain'

/**
 * Determines if the property given requires user input
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isInput = (searchTerm: string): boolean =>
  isRangeInput(searchTerm) ||
  isTextInput(searchTerm) ||
  isBooleanInput(searchTerm) ||
  isRecordTypeInput(searchTerm) ||
  isDateInput(searchTerm)

/**
 * Returns whether the object has any child objects that are groups
 * @param {IAdvancedSearch} obj the advanced search object to check
 * @returns boolean
 */
export const isChildAGroup = (obj: IAdvancedSearchState): boolean => {
  if (isEmptyObj(Object.keys(obj))) {
    return false
  }
  const property = getProperty(obj)
  const childObj = obj[property] as IAdvancedSearchState
  const childProperty = getProperty(childObj)
  return Array.isArray(childObj[childProperty])
}

/**
 * Returns whether the object has any child objects that are input fields
 * @param {IAdvancedSearch} obj the advanced search object to check
 * @returns boolean
 */
export const isChildAnInputField = (obj: IAdvancedSearchState): boolean => {
  if (isEmptyObj(Object.keys(obj))) {
    return false
  }
  const property = getProperty(obj)
  const childObj = obj[property] as IAdvancedSearchState
  const childProperty = getProperty(childObj)
  return isInput(childProperty)
}

/**
 * Determines if the object contains a single relationship field
 * @param {IAdvancedSearchState} obj advanced search state object
 * @returns boolean
 */
export const isSingleRelationshipField = (
  obj: IAdvancedSearchState,
): boolean => {
  const property = getProperty(obj)
  return (
    !isInput(property) && !isAGroup(property) && !isEmptyObj(Object.keys(obj))
  )
}

/**
 * Determines if the properties given contains a property that requires user input
 * @param properties Array<string>; array of properties
 * @returns boolean
 */
export const containsInput = (properties: Array<string>): boolean => {
  for (const prop of properties) {
    const isInputValue = isInput(prop)
    if (isInputValue) {
      return isInputValue
    }
  }

  return false
}

/**
 * Determines if the property is a conditional
 * @param searchTerm string; string property from the state
 * @returns boolean
 */
export const isGroup = (searchTerm: string): boolean =>
  Object.keys(conditionals).includes(searchTerm)

/**
 * Check if state contains valid data for submitting
 * @param state IAdvancedSearchState; current state
 * @returns boolean
 */
export const validateAdvancedSearch = (
  state: IAdvancedSearchState,
): boolean => {
  const stateKeys = Object.keys(state)
  const ind = stateKeys.indexOf('_stateId')
  stateKeys.splice(ind, 1)

  const property = getProperty(state)
  const nested = state[property]

  // If the nested property is text input and it is a string value that is not empty
  if (isTextInput(property) || isRecordTypeInput(property)) {
    const nestedClone = nested as string
    // Text input should not allow for strings containing only double quotes and/or spaces
    if (nestedClone.replace(/"/g, '').trim() !== '') {
      return true
    }
  }

  // If the nested property is range input and it is a string value and comparator that is not empty
  if (
    (isRangeInput(property) || isDateInput(property)) &&
    nested !== '' &&
    state.hasOwnProperty('_comp') &&
    state._comp !== ''
  ) {
    return true
  }

  if (isBooleanInput(property) && typeof nested === 'number') {
    return true
  }

  if (!Array.isArray(nested) && typeof nested === 'object') {
    return validateAdvancedSearch(nested)
  }

  if (Array.isArray(nested)) {
    const vals: Array<boolean> = []
    for (const obj of nested) {
      vals.push(validateAdvancedSearch(obj))
    }
    return vals.includes(true)
  }

  return false
}

/**
 * Check if state contains valid data for submitting
 * @param scope string; scope of state
 * @param state IAdvancedSearchState; current state
 * @returns boolean
 */
export const filterAdvancedSearch = (scope: string, state: any): any => {
  const currentState = _.cloneDeep(state)

  // remove _stateId as it is only used on the frontend and is not valid in the backend
  if (currentState.hasOwnProperty('_stateId')) {
    delete currentState._stateId
  }

  // remove _bgColor as it is only used on the frontend and is not valid in the backend
  if (currentState.hasOwnProperty('_bgColor')) {
    delete currentState._bgColor
  }

  const stateKeys = Object.keys(currentState)
  if (stateKeys.length === 0) {
    return null
  }

  // _stateId is removed and there are more properties in the object
  const propertyToCheck = getProperty(currentState)

  // Is null
  if (currentState[propertyToCheck] === null) {
    return null
  }

  // Is text
  if (isTextInput(propertyToCheck)) {
    if (currentState[propertyToCheck].replace(/"/g, '').trim() === '') {
      return null
    }

    currentState[propertyToCheck] = checkForStopWords(
      currentState[propertyToCheck],
    )
  }

  // is boolean
  if (isBooleanInput(propertyToCheck)) {
    if (currentState[propertyToCheck] === '') {
      return null
    }
  }

  if (isDateInput(propertyToCheck)) {
    const value = currentState[propertyToCheck]
    const dateObj = new Date(value)
    // Ensure that the date is valid before submitting
    // Change it if needed
    if (!isValidDateObject(dateObj)) {
      // value should be a LUX ISO string format
      const dateToSubmit = convertLuxISODateToISODate(value)
      if (isValidDateObject(dateToSubmit)) {
        currentState[propertyToCheck] = dateToSubmit.toISOString()
      }
    }
  }

  // Is range
  if (isRangeInput(propertyToCheck)) {
    if (currentState[propertyToCheck] === '') {
      return null
    }
  }

  // Is range
  if (currentState.hasOwnProperty('_comp')) {
    if (currentState._comp === '') {
      return null
    }
  }

  // we want to shrink the _options param as small as possible, so that we don't make our request unnecessarily large
  if (currentState.hasOwnProperty('_options')) {
    let updatedOptions = currentState._options as string[]
    // these 6 options together are equivalent to 'exact'
    // if we have all of them, replace with 'exact'
    if (
      updatedOptions.length === 6 &&
      updatedOptions.includes('case-sensitive') &&
      updatedOptions.includes('diacritic-sensitive') &&
      updatedOptions.includes('punctuation-sensitive') &&
      updatedOptions.includes('whitespace-sensitive') &&
      updatedOptions.includes('unstemmed') &&
      updatedOptions.includes('unwildcarded')
    ) {
      updatedOptions = ['exact']
    }
    // if there are options selected that ML applies by default, let's not them in the request
    const defaultOptions = getDefaultSearchOptions(scope, propertyToCheck)
    if (defaultOptions !== null) {
      for (const defaultOption of defaultOptions) {
        updatedOptions = updatedOptions.filter(
          (option) => option !== defaultOption,
        )
      }
    }
    // if the array is empty, delete it
    if (updatedOptions.length === 0) {
      delete currentState._options
    } else {
      currentState._options = updatedOptions
    }
  }

  if (Array.isArray(currentState[propertyToCheck])) {
    if (currentState[propertyToCheck].length === 0) {
      return null
    }

    const newArray = currentState[propertyToCheck]
      .map((nestedObj: any) => filterAdvancedSearch(scope, nestedObj))
      .filter((newObj: any) => newObj !== null)
    if (newArray.length === 0) {
      return null
    }
    currentState[propertyToCheck] = newArray
  }

  if (
    !Array.isArray(currentState[propertyToCheck]) &&
    typeof currentState[propertyToCheck] === 'object'
  ) {
    // Return null if there is no valid property within the object
    if (getProperty(currentState[propertyToCheck]) === '') {
      return null
    }
    // typeof null is 'object', so return null if that is the case
    if (currentState[propertyToCheck] === null) {
      return null
    }
    // if the property is numeric (inside an array), simply pass down the scope
    if (/[0-9]/.test(propertyToCheck)) {
      currentState[propertyToCheck] = filterAdvancedSearch(
        scope,
        currentState[propertyToCheck],
      )
      // }
      // since the property is none of the following: null, array, numeric string, it must be a valid search term. Recurse with the new target scope for this search term
      // else if (!Object.keys(text).includes(propertyToCheck)) {
      //   let parentScope = scope
      //   Object.keys(config.advancedSearch).map((entity) => {
      //     if (
      //       Object.keys(config.advancedSearch[entity]).includes(propertyToCheck)
      //     ) {
      //       parentScope = entity
      //     }
      //     return null
      //   })
      //   currentState[propertyToCheck] = filterAdvancedSearch(
      //     getFieldToEntityRelationship(parentScope, propertyToCheck) || '',
      //     currentState[propertyToCheck],
      //   )
    } else {
      currentState[propertyToCheck] = filterAdvancedSearch(
        getFieldToEntityRelationship(scope, propertyToCheck) || '',
        currentState[propertyToCheck],
      )
      if (currentState[propertyToCheck] === null) {
        return null
      }
    }
  }

  return currentState
}

/**
 * Check if state contains valid data for submitting
 * @param state IAdvancedSearchState; current state
 * @returns boolean
 */
export const getAdvancedSearchDepth = (state: IAdvancedSearchState): number => {
  let depth = 1
  if (depth > 6) {
    return depth
  }
  const stateKeys = Object.keys(state)
  const ind = stateKeys.indexOf('_stateId')
  stateKeys.splice(ind, 1)

  const property = getProperty(state)
  const nested = state[property]

  // If the nested property is text input and it is a string value that is not empty
  if (isInput(property)) {
    return depth
  }

  if (Array.isArray(nested)) {
    // If the node is an array, iterate over its children
    for (const child of nested) {
      depth += getAdvancedSearchDepth(child)
    }
  } else if (typeof nested === 'object') {
    depth += getAdvancedSearchDepth(nested)
  }

  return depth
}
