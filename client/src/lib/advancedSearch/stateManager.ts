/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNull } from 'lodash'

import { conditionals } from '../../config/advancedSearch/conditionals'
import {
  addRemoveConfig,
  getDefaultSearchOptions,
  QueryOption,
} from '../../config/advancedSearch/options'
import config from '../../config/config'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'

import {
  getProperty,
  isBooleanInput,
  isDateInput,
  isGroup,
  isInput,
  isRangeInput,
  isRecordTypeInput,
  isTextInput,
} from './advancedSearchParser'
import { getStateId } from './stateId'

/**
 * Returns the labels of dropdown options
 * @param {string} parentScope the scope of the parent object
 * @returns {Record<string, string>}
 */
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

/**
 * Returns the dropdown options for single fields organized based on scope
 * @param {string} parentScope the scope of the parent object
 * @returns {Record<string, Record<string, string>>}
 */
export const getSingleFieldDropdownOptions = (
  parentScope: string,
): Record<string, Record<string, string>> => {
  if (parentScope === '') {
    return {}
  }

  const parentLabels: Record<string, Record<string, string>> = {}
  Object.entries(config.advancedSearch.terms[parentScope]).map(
    ([key, value]) => {
      const valueObj = value as Record<string, string>
      // If the search term is not specific to one scope
      if (!Object.keys(scopeToAriaLabel).includes(valueObj.relation)) {
        parentLabels.general = {
          ...parentLabels.general,
          [key]: valueObj.label,
        }
      } else {
        parentLabels[valueObj.relation] = {
          ...parentLabels[valueObj.relation],
          [key]: valueObj.label,
        }
      }
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

export type PropertyType =
  | 'text'
  | 'date'
  | 'boolean'
  | 'range'
  | 'group'
  | 'type'

// Helper function to determine if the current field and selected field are the same type of input, such as text, date, boolean, or range.
const arePropertiesTheSameType = (
  currentProperty: string,
  selectedProperty: string,
): PropertyType | null => {
  if (
    Object.keys(conditionals).includes(currentProperty) &&
    Object.keys(conditionals).includes(selectedProperty)
  ) {
    return 'group'
  }
  // check if the properties are text input
  if (isTextInput(currentProperty) && isTextInput(selectedProperty)) {
    return 'text'
  }
  // check if the properties are date input
  if (isDateInput(currentProperty) && isDateInput(selectedProperty)) {
    return 'date'
  }
  // check if the properties are boolean input
  if (isBooleanInput(currentProperty) && isBooleanInput(selectedProperty)) {
    return 'boolean'
  }
  // check if the properties are range input
  if (isRangeInput(currentProperty) && isRangeInput(selectedProperty)) {
    return 'range'
  }
  // check if the properties are record type input
  if (
    isRecordTypeInput(currentProperty) &&
    isRecordTypeInput(selectedProperty)
  ) {
    return 'type'
  }

  return null
}

/**
 * Get existing value of property
 * @param obj IAdvancedSearchState; current object
 * @param objectKeys Array<string>; array of current object's keys
 * @returns IAdvancedSearchState | null
 */
export const getExistingValue = (
  obj: IAdvancedSearchState,
  selected: string,
): Array<
  string | number | Record<string, any> | Record<string, any>[] | null
> => {
  let existingValue = null
  let comparator = null
  // Determine if object already contains a property or group
  const property = getProperty(obj)
  const propertyType = arePropertiesTheSameType(property, selected)
  if (propertyType === null) {
    return []
  }

  if (
    propertyType === 'text' ||
    propertyType === 'type' ||
    propertyType === 'boolean' ||
    propertyType === 'group'
  ) {
    existingValue = obj[property]
  }

  if (propertyType === 'range' || propertyType === 'date') {
    existingValue = obj[property]
    comparator = obj._comp
  }

  return [existingValue, comparator]
}

/**
 * Add a field or update a field
 * @param {Record<string, any> | null} objectToUpdate object in state to update
 * @param {string} scope scope of the current selected field
 * @param {string} selectedProperty current selected field
 * @returns {Record<string, any> | null}
 */
export const addFieldSelectionHelper = (
  objectToUpdate: Record<string, any> | null,
  scope: string,
  selectedProperty: string,
  parentBgColor?: 'bg-white' | 'bg-light',
): Record<string, any> | null => {
  if (objectToUpdate !== null) {
    // Initialize the new object with a new _stateId
    const newObject: IAdvancedSearchState = {
      _stateId: getStateId(),
    }

    // get any existing values for the field being added
    const [existingValue, comparator] = getExistingValue(
      objectToUpdate,
      selectedProperty,
    )

    // Get the current property for the object being updated
    const currentProperty = getProperty(objectToUpdate)
    const arePropertiesTheSame = arePropertiesTheSameType(
      currentProperty,
      selectedProperty,
    )

    // Delete the old properties that are not needed
    delete objectToUpdate[currentProperty]
    delete objectToUpdate._comp

    // If the current and selected property are the same type of input, such as text, date, boolean, range, or group, retain the existing value when adding a new field
    if (!isNull(arePropertiesTheSame)) {
      // Set the new object's property to the existing value if the current and selected properties are the same type of input; otherwise, set to null
      if (!isNull(existingValue)) {
        objectToUpdate[selectedProperty] = existingValue
      }

      // Set the new object's _comp if the existing value has a comparator
      if (!isNull(comparator)) {
        objectToUpdate._comp = comparator
      }
    } else if (Object.keys(conditionals).includes(selectedProperty)) {
      // Group selected
      // add _bgColor for rendering purposes
      if (!objectToUpdate.hasOwnProperty('_bgColor')) {
        objectToUpdate._bgColor =
          parentBgColor === 'bg-white' ? 'bg-light' : 'bg-white'
      }
      objectToUpdate[selectedProperty] = [newObject]
    } else if (isInput(selectedProperty)) {
      objectToUpdate[selectedProperty] = ''
    } else {
      objectToUpdate[selectedProperty] = newObject
    }

    // update options with default
    let options = getDefaultSearchOptions(scope, selectedProperty)
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
 * @param {IAdvancedSearchState} parent object to parse
 * @param {string} id id of the object to find
 * @returns {Record<string, any>}
 */
export const findObjectInState = (
  parent: IAdvancedSearchState,
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
 * @param {string} parentBgColor the parent object's background color
 * @returns {IAdvancedSearchState}
 */
export const convertAqSearchParam = (
  scope: string,
  jsonAqParamValue: IAdvancedSearchState,
  parentBgColor: 'bg-light' | 'bg-white',
): IAdvancedSearchState => {
  let newBgColor = parentBgColor
  const keys = Object.keys(jsonAqParamValue)
  // Remove scope as it is not needed for rendering and scope gets passed via the current tab
  if (keys.includes('_scope')) {
    delete jsonAqParamValue._scope
  }

  // Check if object contains a conditional and add _bgColor
  for (const key of keys) {
    if (isGroup(key)) {
      newBgColor = parentBgColor === 'bg-white' ? 'bg-light' : 'bg-white'
      jsonAqParamValue._bgColor = newBgColor
    }
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
          newBgColor,
        )
      }

      if (Array.isArray(nestedObject)) {
        jsonAqParamValue[key] = nestedObject.map((obj) =>
          convertAqSearchParam(scope, obj, newBgColor),
        )
      }
    }
  }

  return jsonAqParamValue
}

/**
 * Adds _options to the text field being edited
 * @param objectToUpdate object; object to update
 * @param scope string; the scope of the field
 * @param field string; the field being updated
 * @returns IAdvancedSearchState
 */
export const addOptions = (
  objectToUpdate: IAdvancedSearchState,
  scope: string,
  field: string,
): IAdvancedSearchState => {
  if (!Object.keys(objectToUpdate).includes('_options')) {
    let options = getDefaultSearchOptions(scope, field)
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
