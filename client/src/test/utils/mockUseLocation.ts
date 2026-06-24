import type { Location } from 'react-router-dom'
import { vi } from 'vitest'

const defaultLocation: Partial<Location> = {
  pathname: 'mock/pathname',
  search: '',
  hash: '',
  state: null,
  key: 'default',
}

export const mockUseLocation = vi.fn(() => defaultLocation as Location)

// Set the mock location state for tests. This allows you to simulate different scenarios by providing overrides for the default state.
export const setMockLocation = (overrides: Partial<Location> = {}): void => {
  mockUseLocation.mockReturnValue({
    ...defaultLocation,
    ...overrides,
  } as Location)
}

// Reset the mock location state to the default state. This is useful to ensure that each test starts with a clean slate and is not affected by any previous tests that may have modified the location state.
export const resetMockLocation = (): void => {
  mockUseLocation.mockReset()
  setMockLocation()
}
