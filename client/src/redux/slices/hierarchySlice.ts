import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IHierarchy {
  currentPageLength: number
  previousPageLength: number
  defaultDisplayLength: number
}

const DEFAULT_LENGTH = 5
const initialState: IHierarchy = {
  currentPageLength: DEFAULT_LENGTH,
  previousPageLength: DEFAULT_LENGTH,
  defaultDisplayLength: DEFAULT_LENGTH,
}

export const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
  reducers: {
    addShowMore: (
      state,
      action: PayloadAction<{
        currentPageLength: number
      }>,
    ) => {
      const { currentPageLength } = action.payload
      state.previousPageLength = currentPageLength
      state.currentPageLength =
        state.previousPageLength + state.defaultDisplayLength
    },
    addShowLess: (
      state,
      action: PayloadAction<{
        currentPageLength: number
      }>,
    ) => {
      const { currentPageLength } = action.payload
      state.previousPageLength = currentPageLength
      state.currentPageLength = Math.max(
        state.currentPageLength - state.defaultDisplayLength,
        state.defaultDisplayLength,
      )
    },
    reset: () => initialState,
  },
})

export const { addShowMore, addShowLess, reset } = hierarchySlice.actions

export default hierarchySlice.reducer
