/* eslint-disable @typescript-eslint/no-explicit-any */
import { conditionals } from '../../config/advancedSearch/conditionals'
import { comparators } from '../../config/advancedSearch/inputTypes'
import {
  addRemoveConfig,
  getDefaultSearchOptions,
  QueryOption,
} from '../../config/advancedSearch/options'
import config from '../../config/config'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'

import {
  getProperty,
  isBooleanInput,
  // isDateInput,
  isGroup,
  isInput,
  isRangeInput,
  isRecordTypeInput,
} from './advancedSearchParser'
import { getStateId } from './stateId'

export const getParentLabels = (
  parentScope: string,
): Record<string, string> => {
  if (parentScope === '') {
    return {}
  }

  const parentLabels: { [key: string]: string } = {}
  Object.entries(config.advancedSearch.terms[parentScope]).map(
    ([key, value]) => {
      const valueObj = value as Record<string, string>
      parentLabels[key] = valueObj.label
      return null
    },
  )

  return parentLabels
}

export const getFieldToEntityRelationship = (
  parentScope: string,
  searchTerm: string,
): string | null => {
  const searchTermConfig = config.advancedSearch.terms[parentScope][searchTerm]
  return searchTermConfig !== undefined ? searchTermConfig.relation : null
}

/**
 * Get existing value of property
 * @param obj IAdvancedSearchState; current object
 * @param objectKeys Array<string>; array of current object's keys
 * @returns IAdvancedSearchState | null
 */
export const getExistingValue = (
  obj: IAdvancedSearchState,
): IAdvancedSearchState | null => {
  let existingValue: any | null = null
  // Determine if object already contains a property or group
  const property = getProperty(obj)
  if (Object.keys(conditionals).includes(property)) {
    existingValue = obj[property]
  }
  // Check if existing value is a comparator
  if (
    typeof existingValue === 'string' &&
    comparators.hasOwnProperty(existingValue)
  ) {
    existingValue = null
  }
  delete obj[property]

  const optionsKeys = ['_weight', '_complete', '_options']
  Object.keys(obj).map((objKey) => {
    if (optionsKeys.includes(objKey)) {
      delete obj[objKey]
    }
    return null
  })

  return existingValue
}

/**
 * Add a field or update a field
 * @param {Record<string, any> | null} objectToUpdate object in state to update
 * @param {string} scope scope of the current selected field
 * @param {string} selected current selected field
 * @returns {Record<string, any> | null}
 */
export const addFieldSelectionHelper = (
  objectToUpdate: Record<string, any> | null,
  scope: string,
  selected: string,
): Record<string, any> | null => {
  if (objectToUpdate !== null) {
    const existingValue = getExistingValue(objectToUpdate)
    const newObject = {
      _stateId: getStateId(),
    }

    if (Object.keys(conditionals).includes(selected)) {
      // Group selected
      objectToUpdate[selected] =
        existingValue !== null ? existingValue : [newObject]
    } else if (isInput(selected)) {
      // Text input
      if (
        !isRecordTypeInput(selected) &&
        (typeof existingValue !== 'string' ||
          isRangeInput(selected) ||
          isBooleanInput(selected))
      ) {
        objectToUpdate[selected] = ''
        delete objectToUpdate._comp
      } else {
        objectToUpdate[selected] = existingValue !== null ? existingValue : ''
      }
    } else {
      // Field with entity relationship

      if (Array.isArray(existingValue) || typeof existingValue === 'string') {
        objectToUpdate[selected] = newObject
      } else {
        objectToUpdate[selected] =
          existingValue !== null ? existingValue : newObject
      }
    }
    let options = getDefaultSearchOptions(scope, selected)
    if (options !== null) {
      if (options.includes('exact')) {
        options = [
          'case-sensitive',
          'diacritic-sensitive',
          'punctuation-sensitive',
          'whitespace-sensitive',
          'unstemmed',
          'unwildcarded',
        ]
      }
      objectToUpdate._options = options
    }
  }
  return objectToUpdate
}

/**
 * Adds a child object when a user selects the add button
 * @param objectToUpdate object; object to update
 * @returns IAdvancedSearchState
 */
export const addChildHelper = (
  objectToUpdate: Record<string, any> | null,
): Record<string, any> | null => {
  if (objectToUpdate !== null) {
    const propertyName = getProperty(objectToUpdate)
    if (Object.keys(conditionals).includes(propertyName)) {
      // Group selected
      objectToUpdate[propertyName].push({
        _stateId: getStateId(),
      })
    }
  }
  return objectToUpdate
}

/**
 * Retreives updated search options based on the current options selected for a field
 * @param {QueryOption} selectedOption current option selected in the advanced search state
 * @param {QueryOption} currentOptions options available for the given search term
 * @returns {QueryOption[]}
 */
export const getUpdatedOptions = (
  selectedOption: QueryOption,
  currentOptions: QueryOption[],
): QueryOption[] => {
  const { optionsToAdd, optionsToRemove } = addRemoveConfig[selectedOption]
  const updatedOptions = currentOptions ? [...currentOptions] : []
  for (const option of optionsToRemove) {
    const indexToRemove = updatedOptions.indexOf(option)
    if (indexToRemove !== -1) {
      updatedOptions.splice(indexToRemove, 1)
    }
  }
  for (const option of optionsToAdd) {
    if (!updatedOptions.includes(option)) {
      updatedOptions.push(option)
    }
  }
  return updatedOptions
}

/**
 * Remove an object from state
 * @param parentObject IAdvancedSearchState; Parent object from which to remove child
 * @param objectToRemove IAdvancedSearchState; Child object to remove
 * @returns object
 */
export const removeObjectFromState = (
  parentObject: IAdvancedSearchState | null,
  objectToRemove: IAdvancedSearchState,
  currentState: IAdvancedSearchState,
): IAdvancedSearchState => {
  if (parentObject === null) {
    return currentState
  }

  const parentProperty = getProperty(parentObject)
  const parentPropIsGroup = isGroup(parentProperty)
  const objectToRemoveProperty = getProperty(objectToRemove)
  const objectToRemovePropIsGroup = isGroup(objectToRemoveProperty)

  const arr = parentPropIsGroup
    ? (parentObject[parentProperty] as Array<IAdvancedSearchState>)
    : []

  if (objectToRemovePropIsGroup) {
    Object.keys(objectToRemove).map((key) => {
      // if the key is not the _stateId and the object is at the top level
      if (key !== '_stateId') {
        delete objectToRemove[key]
      }
      return null
    })
  } else if (arr.length > 1) {
    arr.map((obj, ind) => {
      if (obj._stateId === objectToRemove._stateId) {
        arr.splice(ind, 1)
      }
      return null
    })
  } else {
    Object.keys(objectToRemove).map((key) => {
      // if the key is not the _stateId and the object is at the top level
      if (key !== '_stateId') {
        delete objectToRemove[key]
      }
      return null
    })
  }
  return currentState
}

/**
 * Find the matching parent object
 * @param {Record<string, any>} parent object to parse
 * @param {string} id id of the object to find
 * @returns {Record<string, any>}
 */
export const findObjectInState = (
  parent: any,
  id: string,
): Record<string, any> | null => {
  // if the _stateId matches the provided id, return the object it matches
  if (parent._stateId === id) {
    return parent
  }

  for (const key of Object.keys(parent)) {
    const nestedObject = parent[key]

    if (!Array.isArray(nestedObject) && typeof nestedObject === 'object') {
      return findObjectInState(nestedObject, id)
    }

    if (Array.isArray(nestedObject)) {
      for (const obj of nestedObject) {
        const match = findObjectInState(obj, id)
        if (match !== null) {
          return match
        }
      }
    }
  }

  return null
}

/**
 * Parses the aq param from the URL and adds _stateIds for component rendering
 * @param {string} scope entity scope of the current search, such as item, work, places, etc
 * @param {IAdvancedSearchState} jsonAqParamValue object to convert
 * @returns {IAdvancedSearchState}
 */
export const convertAqSearchParam = (
  scope: string,
  jsonAqParamValue: IAdvancedSearchState,
): IAdvancedSearchState => {
  const keys = Object.keys(jsonAqParamValue)

  // Remove scope as it is not needed for rendering and scope gets passed via the current tab
  if (keys.includes('_scope')) {
    delete jsonAqParamValue._scope
  }

  if (!jsonAqParamValue.hasOwnProperty('_stateId')) {
    jsonAqParamValue._stateId = getStateId()
  }

  for (const key of keys) {
    if (!conditionals.hasOwnProperty(key) && !key.startsWith('_')) {
      const currentOptions = (jsonAqParamValue._options as QueryOption[]) || []
      let newOptions = getDefaultSearchOptions(scope, key) || []
      for (const currentOption of currentOptions) {
        newOptions = getUpdatedOptions(currentOption, newOptions)
      }
      // In the store, we will track 'exact' as its component options.
      // On submit, we will convert back to 'exact' if all component options are selected
      if (newOptions.includes('exact')) {
        newOptions = [
          'case-sensitive',
          'diacritic-sensitive',
          'punctuation-sensitive',
          'whitespace-sensitive',
          'unstemmed',
          'unwildcarded',
        ]
      }
      jsonAqParamValue._options = newOptions
    }
    if (key !== '_options') {
      const nestedObject = jsonAqParamValue[key]

      if (!Array.isArray(nestedObject) && typeof nestedObject === 'object') {
        jsonAqParamValue[key] = convertAqSearchParam(
          getFieldToEntityRelationship(scope, key) || '',
          nestedObject,
        )
      }

      if (Array.isArray(nestedObject)) {
        jsonAqParamValue[key] = nestedObject.map((obj) =>
          convertAqSearchParam(scope, obj),
        )
      }
    }
  }

  return jsonAqParamValue
}
