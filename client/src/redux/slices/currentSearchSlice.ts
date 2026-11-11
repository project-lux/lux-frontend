import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentSearchState {
  searchType: 'advanced' | 'simple'
  isAiSearch: boolean
  clearedAdvancedSearch: boolean
  autoFocusNextInput: boolean
  focusResultsHeader: boolean
}

const initialState: ICurrentSearchState = {
  searchType: 'simple',
  isAiSearch: true, // default to true
  clearedAdvancedSearch: false,
  // set when the user selects an advanced search field so only the newly added input receives focus
  autoFocusNextInput: false,
  // set when an advanced search is submitted so focus moves to the results heading once results load
  focusResultsHeader: false,
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
    changeAutoFocusNextInput: (
      state,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      const { value } = action.payload
      state.autoFocusNextInput = value
    },
    changeFocusResultsHeader: (
      state,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      const { value } = action.payload
      state.focusResultsHeader = value
    },
    resetState: () => initialState,
  },
})

export const {
  changeClearedAdvancedSearch,
  changeCurrentSearchState,
  changeIsAiSearch,
  changeAutoFocusNextInput,
  changeFocusResultsHeader,
  resetState,
} = currentSearchSlice.actions

export default currentSearchSlice.reducer
