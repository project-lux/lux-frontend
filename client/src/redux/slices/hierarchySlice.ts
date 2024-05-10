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
    next: string | null
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
        next: string
      }>,
    ) => {
      const { id, values, total, page, next } = action.payload
      if (!state.hasOwnProperty(id)) {
        state[id] = {
          requests: {},
          total: 0,
          page,
          next,
        }
      }
      if (state[id].total === 0) {
        state[id].total += total
      }
      state[id].requests[`call${page}`] = values
      state[id].page = page
      state[id].next = next
    },
    addNext: (
      state,
      action: PayloadAction<{
        id: string
        next: string
      }>,
    ) => {
      const { id, next } = action.payload
      state[id].next = next
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

export const { addData, addNext, removeData, reset } = hierarchySlice.actions

export default hierarchySlice.reducer
