import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentSearchState {
  searchType: 'advanced' | 'simple'
  isAiSearch: boolean
  clearedAdvancedSearch: boolean
}

const initialState: ICurrentSearchState = {
  searchType: 'simple',
  isAiSearch: true, // default to true
  clearedAdvancedSearch: false,
}

export const currentSearchSlice = createSlice({
  name: 'currentSearch',
  initialState,
  reducers: {
    // Updates the state.value onChange of user input
    changeClearedAdvancedSearch: (
      state,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      const { value } = action.payload
      state.clearedAdvancedSearch = value
    },
    // Updates the state.value onChange of user input
    changeCurrentSearchState: (
      state,
      action: PayloadAction<{ value: 'advanced' | 'simple' }>,
    ) => {
      const { value } = action.payload
      state.searchType = value
    },
    changeIsAiSearch: (state, action: PayloadAction<{ value: boolean }>) => {
      const { value } = action.payload
      state.isAiSearch = value
    },
    resetState: () => initialState,
  },
})

export const {
  changeClearedAdvancedSearch,
  changeCurrentSearchState,
  changeIsAiSearch,
  resetState,
} = currentSearchSlice.actions

export default currentSearchSlice.reducer
