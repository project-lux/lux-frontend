import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

export interface IMyCollectionsResultsState {
  uuids: Array<string>
  scopeOfSelections: string | undefined
}

const initialState: IMyCollectionsResultsState = {
  uuids: [],
  scopeOfSelections: undefined,
}

export const myCollectionsSlice = createSlice({
  name: 'myCollections',
  initialState,
  reducers: {
    // Updates the state.value onChange of user input
    addEntity: (
      state,
      action: PayloadAction<{ uuid: string; scope: string }>,
    ) => {
      const { uuid, scope } = action.payload
      // reset the state of the list of uuids first
      if (scope !== state.scopeOfSelections) {
        state.uuids = []
      }
      state.uuids.push(uuid)
      state.scopeOfSelections = scope
    },
    // Updates the state.value onChange of user input
    addSelectAll: (
      state,
      action: PayloadAction<{ uuids: Array<string>; scope: string }>,
    ) => {
      const { uuids, scope } = action.payload
      state.scopeOfSelections = scope
      state.uuids = uuids
    },
    removeEntity: (state, action: PayloadAction<{ uuid: string }>) => {
      const { uuid } = action.payload
      _.remove(state.uuids, function (entity) {
        return entity === uuid
      })
    },
    resetState: () => initialState,
  },
})

export const { addEntity, addSelectAll, removeEntity, resetState } =
  myCollectionsSlice.actions

export default myCollectionsSlice.reducer
