import { expect, afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

import miscMocks from './integration/utils/miscMocks'
import { mockUseAuth, resetMockAuthState } from './utils/mockUseAuth'
import {
  mockUseGetUserResultsQuery,
  resetMockUserResultsQuery,
} from './utils/mockUseGetUserResultsQuery'
import { mockUseLocation, resetMockLocation } from './utils/mockUseLocation'

vi.mock('react-oidc-context', async () => {
  const actual = await vi.importActual('react-oidc-context')
  return {
    ...actual,
    useAuth: mockUseAuth,
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: mockUseLocation,
  }
})

vi.mock('../redux/api/ml_api', async () => {
  const actual = await vi.importActual('../redux/api/ml_api')
  return {
    ...actual,
    useGetUserResultsQuery: mockUseGetUserResultsQuery,
  }
})

expect.extend(matchers)

beforeEach(() => {
  resetMockAuthState()
  resetMockUserResultsQuery()
  resetMockLocation()
  miscMocks()
})

afterEach(() => {
  cleanup()
})
