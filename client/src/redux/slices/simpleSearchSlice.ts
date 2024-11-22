import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ISimpleSearchState {
  value: string | null
}

const initialState: ISimpleSearchState = { value: null }

export const simpleSearchSlice = createSlice({
  name: 'simpleSearch',
  initialState,
  reducers: {
    // Updates the state.value onChange of user input
    addSimpleSearchInput: (state, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload
      state.value = value as string
    },
    resetState: () => initialState,
  },
})

export const { addSimpleSearchInput, resetState } = simpleSearchSlice.actions

export default simpleSearchSlice.reducer
