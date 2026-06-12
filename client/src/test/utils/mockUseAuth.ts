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

export const setMockAuthState = (
  overrides: Partial<AuthContextProps> = {},
): void => {
  mockUseAuth.mockReturnValue({
    ...defaultAuthState,
    ...overrides,
  } as AuthContextProps)
}

export const resetMockAuthState = (): void => {
  mockUseAuth.mockReset()
  setMockAuthState()
}
