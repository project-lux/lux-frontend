import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

import miscMocks from './integration/utils/miscMocks'

expect.extend(matchers)

beforeEach(() => {
  miscMocks()
})

afterEach(() => {
  cleanup()
})
