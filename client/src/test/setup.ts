import { expect, afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

import miscMocks from './integration/utils/miscMocks'
import { mockUseAuth, resetMockAuthState } from './utils/mockUseAuth'
import {
  mockUseGetUserResultsQuery,
  resetMockUserResultsQuery,
} from './utils/mockUseGetUserResultsQuery'
import {
  mockUseGetEstimatesQuery,
  resetMockEstimatesQuery,
} from './utils/mockUseGetEstimatesQuery'
import { mockUseLocation, resetMockLocation } from './utils/mockUseLocation'

// Mock the authentication library and the API calls to avoid making real network requests during tests
// This library is not being used currently. It is for My Collections work.
vi.mock('react-oidc-context', async () => {
  const actual = await vi.importActual('react-oidc-context')
  return {
    ...actual,
    useAuth: mockUseAuth,
  }
})

// Mock useLocation from react-router-dom. It does not need to return anything specific.
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
    useGetEstimatesQuery: mockUseGetEstimatesQuery,
    useGetUserResultsQuery: mockUseGetUserResultsQuery,
  }
})

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

expect.extend(matchers)

beforeEach(() => {
  resetMockAuthState()
  resetMockEstimatesQuery()
  resetMockUserResultsQuery()
  resetMockLocation()
  miscMocks()
})

afterEach(() => {
  cleanup()
})
