/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import {
  addChildHelper,
  addFieldSelectionHelper,
  convertAqSearchParam,
  findObjectInState,
  getUpdatedOptions,
  removeObjectFromState,
  addOptions,
} from '../../lib/advancedSearch/stateManager'
import { QueryOption } from '../../config/advancedSearch/options'
import {
  getProperty,
  isGroup,
} from '../../lib/advancedSearch/advancedSearchParser'
import { getStateId } from '../../lib/advancedSearch/stateId'

export interface IAdvancedSearchState {
  [key: string]:
    | Array<Record<string, any>>
    | string
    | number
    | Record<string, any>
}

const initialState: IAdvancedSearchState = {
  _stateId: getStateId(),
}

export const advancedSearchSlice = createSlice({
  name: 'advancedSearch',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // New
    addFieldSelection: (
      state,
      action: PayloadAction<{
        scope: string
        selected: string
        stateId: string
        parentBgColor?: 'bg-white' | 'bg-light'
      }>,
    ) => {
      const { scope, selected, stateId, parentBgColor } = action.payload
      const objectInState = findObjectInState(state, stateId)
      addFieldSelectionHelper(objectInState, scope, selected, parentBgColor)
    },
    // New from Peter
    updateOptions: (
      state,
      action: PayloadAction<{
        stateId: string
        selectedOption: QueryOption
      }>,
    ) => {
      const { stateId, selectedOption } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState._options = getUpdatedOptions(
          selectedOption,
          objectInState._options,
        )
      }
    },
    // New from Peter
    addBoost: (state, action: PayloadAction<{ stateId: string }>) => {
      const { stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState._weight = 2
      }
    },
    // New from Peter
    removeBoost: (state, action: PayloadAction<{ stateId: string }>) => {
      const { stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        delete objectInState._weight
      }
    },
    // New from Peter
    addComplete: (state, action: PayloadAction<{ stateId: string }>) => {
      const { stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState._complete = true
      }
    },
    // New from Peter
    removeComplete: (state, action: PayloadAction<{ stateId: string }>) => {
      const { stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        delete objectInState._complete
      }
    },
    // New
    addTextValue: (
      state,
      action: PayloadAction<{
        field: string
        value: string
        stateId: string
        scope: string
      }>,
    ) => {
      const { field, value, stateId, scope } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState[field] = value
        // if the current entity doesn't have an _options
        addOptions(objectInState, scope, field)
      }
    },
    // New
    addNewGroupChild: (
      state,
      action: PayloadAction<{
        stateId: string
      }>,
    ) => {
      const { stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      addChildHelper(objectInState)
    },
    // New
    addRangeValue: (
      state,
      action: PayloadAction<{
        field: string
        value: string
        stateId: string
      }>,
    ) => {
      const { field, value, stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState[field] = value
        if (objectInState._comp === undefined) {
          objectInState._comp = '>='
        }
      }
    },
    addStartDateValue: (
      state,
      action: PayloadAction<{
        field: string
        value: string
        stateId: string
      }>,
    ) => {
      const { field, value, stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState[field].start = value
      }
    },
    addEndDateValue: (
      state,
      action: PayloadAction<{
        field: string
        value: string
        stateId: string
      }>,
    ) => {
      const { field, value, stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState[field].end = value
      }
    },
    addBooleanValue: (
      state,
      action: PayloadAction<{ field: string; value: number; stateId: string }>,
    ) => {
      const { field, value, stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState[field] = value
      }
    },
    // New
    addRangeComparator: (
      state,
      action: PayloadAction<{
        comp: string
        stateId: string
      }>,
    ) => {
      const { comp, stateId } = action.payload
      const objectInState = findObjectInState(state, stateId)
      if (objectInState !== null) {
        objectInState._comp = comp
      }
    },
    // New
    addAqParamValue: (
      state,
      action: PayloadAction<{
        scope: string
        aqParamValue: string
      }>,
    ) => {
      const { scope, aqParamValue } = action.payload
      let AqParamValueToJson = JSON.parse(aqParamValue)
      const property = getProperty(AqParamValueToJson)
      if (!isGroup(property)) {
        AqParamValueToJson = {
          AND: [AqParamValueToJson],
        }
      }
      const convertedAqParam = convertAqSearchParam(
        scope,
        AqParamValueToJson,
        AqParamValueToJson._bgColor || 'bg-light',
      )
      return convertedAqParam
    },
    remove: (
      state,
      action: PayloadAction<{ stateId: string; parentStateId: string }>,
    ) => {
      const { stateId, parentStateId } = action.payload
      const objectToRemoveProperty = findObjectInState(state, stateId)
      const parentObject = findObjectInState(state, parentStateId)
      if (objectToRemoveProperty !== null) {
        removeObjectFromState(parentObject, objectToRemoveProperty, state)
      }
    },
    resetState: () => initialState,
  },
})

export const {
  addFieldSelection,
  addTextValue,
  addNewGroupChild,
  addRangeValue,
  addRangeComparator,
  addStartDateValue,
  addEndDateValue,
  addAqParamValue,
  addBooleanValue,
  remove,
  resetState,
  updateOptions,
  addBoost,
  removeBoost,
  addComplete,
  removeComplete,
} = advancedSearchSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.item.value)`
// export const selectCount = (state: RootState): number => state.item.value

export const selectCount = (state: RootState): IAdvancedSearchState =>
  state.advancedSearch as IAdvancedSearchState

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default advancedSearchSlice.reducer
