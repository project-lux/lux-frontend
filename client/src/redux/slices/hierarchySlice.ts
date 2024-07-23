import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import IEntity from '../../types/data/IEntity'

import IEntity from '../../types/data/IEntity'

export interface IHierarchy {
  currentPageLength: number
  previousPageLength: number
  defaultDisplayLength: number
  origin: IEntity | null
  fullscreen: boolean
}

const DEFAULT_LENGTH = 5
const initialState: IHierarchy = {
  currentPageLength: DEFAULT_LENGTH,
  previousPageLength: DEFAULT_LENGTH,
  defaultDisplayLength: DEFAULT_LENGTH,
  origin: null,
  fullscreen: false,
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
    addOrigin: (state, action: PayloadAction<{ value: IEntity }>) => {
      const { value } = action.payload
      state.origin = value
    },
    addFullscreen: (
      state,
      action: PayloadAction<{ isFullscreen: boolean }>,
    ) => {
      const { isFullscreen } = action.payload
      state.fullscreen = isFullscreen
    },
    reset: () => initialState,
  },
})

export const { addShowMore, addShowLess, addOrigin, addFullscreen, reset } =
  hierarchySlice.actions

export default hierarchySlice.reducer
