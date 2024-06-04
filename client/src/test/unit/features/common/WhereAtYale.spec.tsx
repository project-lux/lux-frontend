import { render } from '@testing-library/react'
import React from 'react'

import WhereAtYale from '../../../../features/common/WhereAtYale'
import { reusableMinimalEntity as mockEntity } from '../../../data/reusableMinimalEntity'

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetCollectionQuery: () => ({
    data: [],
  }),
  useGetSearchRelationshipQuery: () => ({
    data: undefined,
  }),
}))

describe('WhereAtYale', () => {
  it('renders null', async () => {
    const { container } = render(
      <WhereAtYale data={mockEntity('Minimal Entity')} />,
    )
    expect(container.innerHTML).toBe('')
  })
})
