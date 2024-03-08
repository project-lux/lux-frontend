import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import ExpandableList from '../../../../features/common/ExpandableList'
import TextValue from '../../../../features/common/TextValue'

const mockValues = Array(21)
  .fill(0)
  .map((_, i) => `testValue${i * i}`)

describe('ExpandableList', () => {
  it('renders the list', () => {
    render(
      <ExpandableList className="col-12" itemSpacing="single">
        <TextValue values={mockValues} />
      </ExpandableList>,
    )

    const list = screen.getByTestId('expandable-list')
    expect(list).toBeInTheDocument()
  })

  it('renders the list without the show all button', () => {
    render(
      <ExpandableList className="col-12" length={50} itemSpacing="single">
        <TextValue values={mockValues} />
      </ExpandableList>,
    )

    const button = screen.queryByTestId('expandable-list-show-all')
    expect(button).not.toBeInTheDocument()
  })

  it('renders the show all button', () => {
    render(
      <ExpandableList className="col-12" itemSpacing="single">
        <TextValue values={mockValues} />
      </ExpandableList>,
    )

    const button = screen.getByTestId('expandable-list-show-all')
    expect(button).toBeInTheDocument()
  })

  it('renders the show less button', () => {
    render(
      <ExpandableList className="col-12" itemSpacing="single">
        <TextValue values={mockValues} />
      </ExpandableList>,
    )

    const showAll = screen.getByTestId('expandable-list-show-all')
    fireEvent.click(showAll)

    const showLess = screen.getByTestId('expandable-list-show-less')
    expect(showLess).toBeInTheDocument()
  })
})
