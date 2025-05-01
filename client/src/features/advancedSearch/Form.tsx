/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  containsInput,
  getProperty,
} from '../../lib/advancedSearch/advancedSearchParser'

import FieldSelectRow from './FieldSelectRow'
import Group from './Group'
import InputRow from './InputRow'
import RelationshipRow from './RelationshipRow'

interface IAdvancedSearchForm {
  state: Record<string, any>
  parentScope: string
  parentStateId: string
  nestedLevel: number
  childInd?: number
  siblings?: Array<Record<string, any>>
  parentBgColor?: 'bg-white' | 'bg-light'
}
/**
 * Container for holding all functionality related to rendering advanced search rows based on the current
 * advanced search state.
 * @param {Record<string, any>} state the current nested state within the advanced search state
 * @param {string} parentScope the scope of the parent object
 * @param {string} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @param {number} childInd optional; the array index of the object within a group
 * @param {Array<Record<string, any>> | undefined} siblings optional; array containing the list of children in a group
 * @returns {JSX.Element}
 */
const AdvancedSearchForm: React.FC<IAdvancedSearchForm> = ({
  state,
  parentScope,
  parentStateId,
  nestedLevel,
  childInd = undefined,
  siblings = undefined,
  parentBgColor = 'bg-white',
}) => {
  const stateKeys = Object.keys(state)
  // The current state object is empty
  if (stateKeys.length === 1 && stateKeys[0] === '_stateId') {
    return (
      <FieldSelectRow
        stateId={state._stateId as string}
        scope={parentScope}
        state={state}
        parentStateId={parentStateId}
        childInd={childInd}
        siblings={siblings}
        parentBgColor={parentBgColor}
      />
    )
  }
  const property = getProperty(state)
  // The current state contains keys that are mapped as input
  if (containsInput(stateKeys)) {
    return (
      <InputRow
        stateId={state._stateId}
        scope={parentScope}
        selectedKey={property}
        state={state}
        parentStateId={parentStateId}
        nestedLevel={nestedLevel}
      />
    )
  }
  // Only groups contain arrays
  if (Array.isArray(state[property])) {
    const groupObjects: any = state[property]
    return (
      <Group
        stateId={state._stateId}
        selectedKey={property}
        state={groupObjects}
        parentScope={parentScope}
        parentStateId={parentStateId}
        nestedLevel={nestedLevel}
        bgColor={state._bgColor}
      />
    )
  }
  // Nested relationships are always object types but not arrays
  if (typeof state[property] === 'object') {
    return (
      <RelationshipRow
        stateId={state._stateId}
        selectedKey={property}
        state={state[property]}
        parentScope={parentScope}
        parentStateId={parentStateId}
        nestedLevel={nestedLevel}
      />
    )
  }
  return null
}
export default AdvancedSearchForm
