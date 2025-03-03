import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { activityStreams } from '../../../data/results'
import config from '../../../../config/config'
import { setEvent } from '../../../../config/collectionsSearchTags'
import { event as mockEvent } from '../../../data/event'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'
import ApiAboutData from '../../../../features/common/ApiAboutData'

const mockObject = reusableMinimalEntity('Mock')

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetSearchRelationshipQuery: vi.fn(() => ({
    data: activityStreams('/data/activity/testing', 1),
    isSuccess: true,
    refetch(): void {
      throw new Error('Function not implemented.')
    },
  })),
  useGetNameQuery: vi.fn(() => ({
    data: mockEvent,
    isSuccess: true,
    refetch(): void {
      throw new Error('Function not implemented.')
    },
  })),
  useGetItemQuery: () => ({
    data: mockObject,
    isSuccess: true,
  }),
}))

describe('SetEvent', () => {
  it('renders the exhibition', async () => {
    const mockLinks = {
      curies: [],
      self: {
        href: '',
      },
      'lux:setEvents': {
        href: `${config.env.dataApiBaseUrl}api/search/event?q=queryString`,
        _estimate: 1,
      },
    }
    const { container } = render(
      <BrowserRouter>
        <ApiAboutData providedLinks={mockLinks} configuredLink={setEvent} />
      </BrowserRouter>,
    )
    expect(container).toHaveTextContent('Mock Event')
  })
})
