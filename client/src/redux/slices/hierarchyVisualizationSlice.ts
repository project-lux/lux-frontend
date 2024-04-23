import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import IEntity from '../../types/data/IEntity'

export interface IHierarchyVisualization {
  origin: string
  parents: Array<string>
  children: Array<string>
}

const initialState: IHierarchyVisualization = {
  origin: '',
  parents: [],
  children: [],
}

export const hierarchyVisualizationSlice = createSlice({
  name: 'hierarchyVisualization',
  initialState,
  reducers: {
    addInitialState: (state, action: PayloadAction<IHierarchyVisualization>) =>
      action.payload,
    addOrigin: (state, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload
      state.origin = value
    },
    reset: () => initialState,
  },
})

export const { addInitialState, addOrigin, reset } =
  hierarchyVisualizationSlice.actions

export default hierarchyVisualizationSlice.reducer
