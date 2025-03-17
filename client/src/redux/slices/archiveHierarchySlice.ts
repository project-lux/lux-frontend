import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// import IEntity from '../../types/data/IEntity'

export interface IArchiveHierarchy {
  [key: string]: {
    requests: {
      [key: string]: Array<string>
    }
    total: number
  }
}

const initialState: IArchiveHierarchy = {}

export const archiveHierarchySlice = createSlice({
  name: 'archiveHierarchy',
  initialState,
  reducers: {
    addData: (
      state,
      action: PayloadAction<{
        id: string
        values: Array<string>
        total: number
        page: number
      }>,
    ) => {
      const { id, values, total, page } = action.payload
      if (!state.hasOwnProperty(id)) {
        state[id] = {
          requests: {},
          total: 0,
        }
      }
      if (state[id].total === 0) {
        state[id].total += total
      }
      const requestProperty = `${page}`
      // have the call type, work or item, passed to this function and set [type]Call[page] set to values
      if (state[id].requests.hasOwnProperty(requestProperty)) {
        state[id].requests[requestProperty] = values
      } else {
        state[id].requests[requestProperty] = values
      }
    },
    removeData: (
      state,
      action: PayloadAction<{
        id: string
        page: number
      }>,
    ) => {
      const { id, page } = action.payload
      const currentRequest = `${page}`
      if (state[id].requests[currentRequest]) {
        delete state[id].requests[currentRequest]
      }
    },
    reset: () => initialState,
  },
})

export const { addData, removeData, reset } = archiveHierarchySlice.actions

export default archiveHierarchySlice.reducer
