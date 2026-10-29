import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import config from '../../../../config/config'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'
import LinkContainer from '../../../../features/common/LinkContainer'

const mockName = 'English'
const mockEntity = reusableMinimalEntity(mockName)

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

const mockContent = [
  `${config.env.dataApiBaseUrl}data/test1`,
  `${config.env.dataApiBaseUrl}data/test2`,
  `${config.env.dataApiBaseUrl}data/test3`,
]
const mockLabel = 'Test Label'
const mockId = 'test-link-container'

describe('LinkContainer', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <LinkContainer content={mockContent} label={mockLabel} id={mockId} />
      </BrowserRouter>,
    )

    const container = screen.getByTestId(mockId)
    expect(container).toBeInTheDocument()
  })

  it('renders the text label', async () => {
    render(
      <BrowserRouter>
        <LinkContainer content={mockContent} label={mockLabel} id={mockId} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('test-label-text-label')
    expect(label).toBeInTheDocument()
  })

  it('renders the content', async () => {
    render(
      <BrowserRouter>
        <LinkContainer content={mockContent} label={mockLabel} id={mockId} />
      </BrowserRouter>,
    )

    const content = screen.getByTestId('text-value')
    expect(content).toBeInTheDocument()
  })
})
