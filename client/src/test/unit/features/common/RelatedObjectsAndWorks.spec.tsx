import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import RelatedObjectsAndWorks from '../../../../features/common/RelatedObjectsAndWorks'
import { entity as mockEntity } from '../../../data/entity'
import ILinks from '../../../../types/data/ILinks'

const mockRelationships = {
  objects: {
    title: 'Related Objects',
    searchTag: 'lux:relatedObjectsSearchTag',
    tab: 'objects',
  },
}

describe('RelatedObjectsAndWorks', () => {
  it('renders the error message', async () => {
    render(
      <BrowserRouter>
        <RelatedObjectsAndWorks
          links={mockEntity._links as ILinks}
          relationships={mockRelationships}
          type="event"
        />
      </BrowserRouter>,
    )

    const message = screen.getByTestId('no-related-objects-works')
    expect(message).toHaveTextContent(
      'Yale University does not have any objects or works directly related to this event.',
    )
  })
})
