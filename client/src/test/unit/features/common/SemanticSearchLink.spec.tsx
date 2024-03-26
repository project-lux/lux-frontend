import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import SemanticSearchLink from '../../../../features/common/SemanticSearchLink'

const mockId = 'test'
const mockScope = 'item'
const mockTitle = 'test title'
const mockCriteria = {
  AND: [
    {
      createdBy: {
        id: 'test',
      },
    },
  ],
}

describe('SemanticSearchLink', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <SemanticSearchLink
          scope={mockScope}
          criteria={mockCriteria}
          id={mockId}
          total={10}
          title={mockTitle}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`semantic-search-link-${mockId}`)
    expect(link).toBeInTheDocument()
  })

  it('renders with correct href', async () => {
    render(
      <BrowserRouter>
        <SemanticSearchLink
          scope={mockScope}
          criteria={mockCriteria}
          id={mockId}
          total={10}
          title={mockTitle}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`semantic-search-link-${mockId}`)
    expect(link).toHaveAttribute(
      'href',
      '/view/results/objects?q={"AND":[{"createdBy":{"id":"test"}}]}&openSearch=false',
    )
  })

  it('renders the text if total and label are provided', async () => {
    render(
      <BrowserRouter>
        <SemanticSearchLink
          scope={mockScope}
          criteria={mockCriteria}
          id={mockId}
          total={10}
          label="item"
          title={mockTitle}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`semantic-search-link-${mockId}`)
    expect(link).toHaveTextContent('Show all 10 item results')
  })

  it('renders with correct text if totat and label are not provided', async () => {
    render(
      <BrowserRouter>
        <SemanticSearchLink
          scope={mockScope}
          criteria={mockCriteria}
          id={mockId}
          title={mockTitle}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`semantic-search-link-${mockId}`)
    expect(link).toHaveTextContent('Show all results')
  })
})
