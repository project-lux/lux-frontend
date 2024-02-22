import { render, screen } from '@testing-library/react'
import React from 'react'

import Images from '../../../features/works/Images'
import { physicalObject as mockObject } from '../../data/object'
import { linguisticObject as mockWork } from '../../data/linguisticObject'
import { activityStreams as mockActivityStreams } from '../../data/results'
import ILinguisticObject from '../../../types/data/ILinguisticObject'
import config from '../../../config/config'
import { useGetSearchRelationshipQuery } from '../../../redux/api/ml_api'

const mockResults = mockActivityStreams('/data/concept/concept', 1)

jest.mock('../../../redux/api/ml_api', () => ({
  useGetSearchRelationshipQuery: jest.fn(),
  useGetItemQuery: () => ({
    data: mockObject,
    isSuccess: true,
  }),
}))

describe('Images', () => {
  describe('IiifImageViewer', () => {
    beforeEach(async () => {
      const getSearchRelationship =
        useGetSearchRelationshipQuery as jest.MockedFunction<
          typeof useGetSearchRelationshipQuery
        >
      getSearchRelationship.mockReturnValueOnce({
        data: mockResults,
        isSuccess: true,
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('renders the UV with IIIF manifest', async () => {
      render(<Images entity={mockWork} />)

      const viewer = screen.getByTestId('uv-viewer')
      expect(viewer).toHaveAttribute(
        'src',
        '/uv/uv.html#?manifest=https://manifests.collections.yale.edu/test',
      )
    })
  })

  describe('WikiDataImageViewer', () => {
    beforeEach(async () => {
      const getSearchRelationship =
        useGetSearchRelationshipQuery as jest.MockedFunction<
          typeof useGetSearchRelationshipQuery
        >
      // the api call is skipped
      getSearchRelationship.mockReturnValueOnce({
        currentData: undefined,
        data: undefined,
        isError: false,
        isFetching: false,
        isLoading: false,
        isSuccess: false,
        isUninitialized: true,
        status: 'uninitialized',
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('renders the UV with wikidata manifest', async () => {
      const mockWorkWithoutLinks: ILinguisticObject = {
        id: 'mockId',
        type: 'LinguisticObject',
        representation: [
          {
            type: 'VisualItem',
            _label: 'Wikidata Image',
            digitally_shown_by: [
              {
                type: 'DigitalObject',
                access_point: [
                  {
                    id: `${config.env.wikidataImagePathname}Alfred Stieglitz_self-portrait, freienwald,_1886.jpg`,
                    type: 'DigitalObject',
                  },
                ],
              },
            ],
          },
        ],
      }
      render(<Images entity={mockWorkWithoutLinks} />)

      const viewer = screen.getByTestId('uv-viewer')
      expect(viewer).toHaveAttribute(
        'src',
        `/uv/uv.html#?manifest=${config.env.luxWikidataManifestPrefix}Alfred_Stieglitz_self-portrait,_freienwald,_1886.jpg`,
      )
    })
  })
})
