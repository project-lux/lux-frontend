import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'

import advancedSearchReducer from '../redux/slices/advancedSearchSlice'
import simpleSearchReducer from '../redux/slices/simpleSearchSlice'
import helpTextReducer from '../redux/slices/helpTextSlice'
import hierarchyReducer from '../redux/slices/hierarchySlice'
import facetsReducer from '../redux/slices/facetsSlice'
import currentSearchReducer from '../redux/slices/currentSearchSlice'
import myCollectionsReducer from '../redux/slices/myCollectionsSlice'
import { configApi } from '../redux/api/configApi'
import { cmsApi } from '../redux/api/cmsApi'
import { mlApi } from '../redux/api/ml_api'
import { mlMyCollectionsApi } from '../redux/api/mlMyCollectionsApi'

export const store = configureStore({
  reducer: {
    advancedSearch: advancedSearchReducer,
    simpleSearch: simpleSearchReducer,
    helpTextKey: helpTextReducer,
    facetSelection: facetsReducer,
    currentSearch: currentSearchReducer,
    hierarchy: hierarchyReducer,
    myCollections: myCollectionsReducer,
    [configApi.reducerPath]: configApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [mlApi.reducerPath]: mlApi.reducer,
    [mlMyCollectionsApi.reducerPath]: mlMyCollectionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(configApi.middleware)
      .concat(mlApi.middleware)
      .concat(cmsApi.middleware)
      .concat(mlMyCollectionsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
