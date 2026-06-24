import type { AuthContextProps } from 'react-oidc-context'
import { vi } from 'vitest'

const defaultAuthState: Partial<AuthContextProps> = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  signinRedirect: vi.fn(),
  signoutRedirect: vi.fn(),
  removeUser: vi.fn(),
  signinSilent: vi.fn(),
  startSilentRenew: vi.fn(),
  stopSilentRenew: vi.fn(),
}

export const mockUseAuth = vi.fn(() => defaultAuthState as AuthContextProps)

// Set the mock authentication state for tests. This allows you to simulate different authentication scenarios by providing overrides for the default state.
export const setMockAuthState = (
  overrides: Partial<AuthContextProps> = {},
): void => {
  mockUseAuth.mockReturnValue({
    ...defaultAuthState,
    ...overrides,
  } as AuthContextProps)
}

// Reset the mock authentication state to the default state. This is useful to ensure that each test starts with a clean slate and is not affected by any previous tests that may have modified the authentication state.
export const resetMockAuthState = (): void => {
  mockUseAuth.mockReset()
  setMockAuthState()
}
