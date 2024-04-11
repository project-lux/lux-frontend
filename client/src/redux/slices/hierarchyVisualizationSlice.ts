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
    addInitalState: (state, action: PayloadAction<IHierarchyVisualization>) =>
      action.payload,
    reset: () => initialState,
  },
})

export const { addInitalState, reset } = hierarchyVisualizationSlice.actions

export default hierarchyVisualizationSlice.reducer
