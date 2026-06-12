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

export const setMockUserResultsQuery = (
  overrides: Partial<typeof defaultUserResultsQuery> = {},
): void => {
  mockUseGetUserResultsQuery.mockReturnValue({
    ...defaultUserResultsQuery,
    ...overrides,
  })
}

export const resetMockUserResultsQuery = (): void => {
  mockUseGetUserResultsQuery.mockReset()
  setMockUserResultsQuery()
}
