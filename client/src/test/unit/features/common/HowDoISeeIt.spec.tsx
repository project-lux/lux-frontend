import { render } from '@testing-library/react'
import React from 'react'

import HowDoISeeIt from '../../../../features/common/HowDoISeeIt'
import { reusableMinimalEntity as mockEntity } from '../../../data/reusableMinimalEntity'

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetCollectionQuery: () => ({
    data: [],
  }),
  useGetSearchRelationshipQuery: () => ({
    data: undefined,
  }),
}))

describe('HowDoISeeIt', () => {
  it('renders null', async () => {
    const { container } = render(
      <HowDoISeeIt data={mockEntity('Minimal Entity')} />,
    )
    expect(container.innerHTML).toBe('')
  })
})
