import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'

import advancedSearchReducer from '../redux/slices/advancedSearchSlice'
import simpleSearchReducer from '../redux/slices/simpleSearchSlice'
import helpTextReducer from '../redux/slices/helpTextSlice'
import hierarchyReducer from '../redux/slices/hierarchySlice'
import facetsReducer from '../redux/slices/facetsSlice'
import currentSearchReducer from '../redux/slices/currentSearchSlice'
import { configApi } from '../redux/api/configApi'
import { cmsApi } from '../redux/api/cmsApi'
import { mlApi } from '../redux/api/ml_api'
import { searchBroadcastMiddleware } from '../redux/middleware/searchBroadcastMiddleware'

export const store = configureStore({
  reducer: {
    advancedSearch: advancedSearchReducer,
    simpleSearch: simpleSearchReducer,
    helpTextKey: helpTextReducer,
    facetSelection: facetsReducer,
    currentSearch: currentSearchReducer,
    hierarchy: hierarchyReducer,
    [configApi.reducerPath]: configApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [mlApi.reducerPath]: mlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Must come before mlApi.middleware: RTK Query's middleware does not
      // forward the condition-rejection action that a cache hit produces, so
      // anything after it only ever sees fresh fetches.
      .concat(searchBroadcastMiddleware)
      .concat(configApi.middleware)
      .concat(mlApi.middleware)
      .concat(cmsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
