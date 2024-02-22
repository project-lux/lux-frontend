import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFacetsSelected {
  lastSelectedFacetName: string
  lastSelectedFacetUri: string
}

const initialState: IFacetsSelected = {
  lastSelectedFacetName: '',
  lastSelectedFacetUri: '',
}

export const facetSlice = createSlice({
  name: 'facetSelection',
  initialState,
  reducers: {
    addFacets: (
      state,
      action: PayloadAction<{
        facetName: string
        facetUri: string
      }>,
    ) => {
      const { facetName, facetUri } = action.payload
      state.lastSelectedFacetName = facetName
      state.lastSelectedFacetUri = facetUri
    },
    reset: () => initialState,
  },
})

export const { addFacets, reset } = facetSlice.actions

export default facetSlice.reducer
