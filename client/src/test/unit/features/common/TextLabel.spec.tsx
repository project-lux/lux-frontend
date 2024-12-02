import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import TextLabel from '../../../../features/common/TextLabel'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockLabel = 'Mock Label'
const mockEntity = reusableMinimalEntity(mockLabel)

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/mock/pathname',
    }),
  }
})

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('TextLabel', () => {
  it('renders the passed label', async () => {
    render(<TextLabel label={mockLabel} />)

    const label = screen.getByTestId('mock-label-text-label')
    expect(label).toHaveTextContent('Mock Label')
  })

  it('renders the default label', async () => {
    render(<TextLabel />)

    const label = screen.getByTestId('text-label')
    expect(label).toBeInTheDocument()
  })

  it('renders the tooltip', async () => {
    render(<TextLabel label={mockLabel} tooltipText="mock tooltip text" />)

    const tooltip = screen.getByTestId('tooltip-icon')
    expect(tooltip).toBeInTheDocument()
  })
})
