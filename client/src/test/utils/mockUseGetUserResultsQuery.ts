import { vi } from 'vitest'

const defaultUserResultsQuery = {
  data: undefined,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: undefined,
  refetch: vi.fn(),
}

export const mockUseGetUserResultsQuery = vi.fn(() => defaultUserResultsQuery)

// Set the mock user results query state for tests. This allows you to simulate different scenarios by providing overrides for the default state.
export const setMockUserResultsQuery = (
  overrides: Partial<typeof defaultUserResultsQuery> = {},
): void => {
  mockUseGetUserResultsQuery.mockReturnValue({
    ...defaultUserResultsQuery,
    ...overrides,
  })
}

// Reset the mock user results query state to the default state. This is useful to ensure that each test starts with a clean slate and is not affected by any previous tests that may have modified the query state.
export const resetMockUserResultsQuery = (): void => {
  mockUseGetUserResultsQuery.mockReset()
  setMockUserResultsQuery()
}
