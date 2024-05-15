import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import IEntity from '../../types/data/IEntity'

export interface IHierarchyVisualization {
  origin: IEntity | null
}

const initialState: IHierarchyVisualization = {
  origin: null,
}

export const hierarchyVisualizationSlice = createSlice({
  name: 'hierarchyVisualization',
  initialState,
  reducers: {
    addInitialState: (state, action: PayloadAction<IHierarchyVisualization>) =>
      action.payload,
    addOrigin: (state, action: PayloadAction<{ value: IEntity }>) => {
      const { value } = action.payload
      state.origin = value
    },
    resetHierarchy: () => initialState,
  },
})

export const { addInitialState, addOrigin, resetHierarchy } =
  hierarchyVisualizationSlice.actions

export default hierarchyVisualizationSlice.reducer
