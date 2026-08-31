import { expect, afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

import miscMocks from './integration/utils/miscMocks'
import {
  mockUseGetEstimatesQuery,
  resetMockEstimatesQuery,
} from './utils/mockUseGetEstimatesQuery'
import { mockUseLocation, resetMockLocation } from './utils/mockUseLocation'

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
  resetMockEstimatesQuery()
  resetMockLocation()
  miscMocks()
})

afterEach(() => {
  cleanup()
})
