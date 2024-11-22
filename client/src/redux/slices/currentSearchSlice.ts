import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentSearchState {
  searchType: 'advanced' | 'simple'
  clearedAdvancedSearch: boolean
}

const initialState: ICurrentSearchState = {
  searchType: 'simple',
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
    resetState: () => initialState,
  },
})

export const {
  changeClearedAdvancedSearch,
  changeCurrentSearchState,
  resetState,
} = currentSearchSlice.actions

export default currentSearchSlice.reducer
