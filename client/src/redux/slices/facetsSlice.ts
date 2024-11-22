import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    addLastSelectedFacet: (
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

export const { addLastSelectedFacet, reset } = facetSlice.actions

export default facetSlice.reducer
