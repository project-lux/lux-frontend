import type { Location } from 'react-router-dom'
import { vi } from 'vitest'

const defaultLocation: Partial<Location> = {
  pathname: '/mock/pathname',
  search: '',
  hash: '',
  state: null,
  key: 'default',
}

export const mockUseLocation = vi.fn(() => defaultLocation as Location)

export const setMockLocation = (overrides: Partial<Location> = {}): void => {
  mockUseLocation.mockReturnValue({
    ...defaultLocation,
    ...overrides,
  } as Location)
}

export const resetMockLocation = (): void => {
  mockUseLocation.mockReset()
  setMockLocation()
}
