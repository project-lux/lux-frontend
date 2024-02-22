import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import IEntity from '../../types/data/IEntity'

export interface IArchiveHierarchy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: {
    requests: {
      [key: string]: Array<string>
    }
    total: number
    page: number
  }
}

const initialState: IArchiveHierarchy = {}

export const hierarchySlice = createSlice({
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
          page,
        }
      }
      if (state[id].total === 0) {
        state[id].total += total
      }
      state[id].requests[`call${page}`] = values
      state[id].page = page
    },
    removeData: (
      state,
      action: PayloadAction<{
        id: string
        page: number
      }>,
    ) => {
      const { id, page } = action.payload
      const currentRequest = `call${page}`
      if (state[id].requests[currentRequest]) {
        delete state[id].requests[currentRequest]
      }
      state[id].page = page - 1
    },
    reset: () => initialState,
  },
})

export const { addData, removeData, reset } = hierarchySlice.actions

export default hierarchySlice.reducer
