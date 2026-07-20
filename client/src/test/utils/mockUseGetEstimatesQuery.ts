import { vi } from 'vitest'

const defaultEstimatesQuery = {
  data: undefined,
  isSuccess: false,
  isFetching: false,
  isLoading: false,
  isError: false,
  error: undefined,
  refetch: vi.fn(),
}

export const mockUseGetEstimatesQuery = vi.fn(() => defaultEstimatesQuery)

// Set the mock estimates query state for tests to simulate success, loading, and error scenarios.
export const setMockEstimatesQuery = (
  overrides: Partial<typeof defaultEstimatesQuery> = {},
): void => {
  mockUseGetEstimatesQuery.mockReturnValue({
    ...defaultEstimatesQuery,
    ...overrides,
  })
}

// Reset the mock estimates query state so each test starts from the same baseline.
export const resetMockEstimatesQuery = (): void => {
  mockUseGetEstimatesQuery.mockReset()
  setMockEstimatesQuery()
}
