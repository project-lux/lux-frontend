/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentSearchState {
  searchType: 'advanced' | 'simple'
}

const initialState: ICurrentSearchState = { searchType: 'simple' }

export const currentSearchSlice = createSlice({
  name: 'currentSearch',
  initialState,
  reducers: {
    // Updates the state.value onChange of user input
    updateCurrentSearchState: (
      state,
      action: PayloadAction<{ value: 'advanced' | 'simple' }>,
    ) => {
      const { value } = action.payload
      state.searchType = value
    },
    resetState: () => initialState,
  },
})

export const { updateCurrentSearchState, resetState } =
  currentSearchSlice.actions

export default currentSearchSlice.reducer
