import { createSlice } from '@reduxjs/toolkit'

export interface IAdvancedSearchStyleState {
  bgColor: 'bg-light' | 'bg-white'
}

const initialState: IAdvancedSearchStyleState = {
  bgColor: 'bg-light',
}

export const advancedSearchStyleSlice = createSlice({
  name: 'advancedSearchStyle',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeBackgroundColor: (state) => {
      if (state.bgColor === 'bg-white') {
        state.bgColor = 'bg-light'
      }

      state.bgColor = 'bg-white'
    },
    resetState: () => initialState,
  },
})

export const { changeBackgroundColor } = advancedSearchStyleSlice.actions

export default advancedSearchStyleSlice.reducer
