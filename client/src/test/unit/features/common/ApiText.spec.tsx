import { vi } from 'vitest'

import config from '../../../../config/config'
import ApiText from '../../../../features/common/ApiText'
import { useGetItemQuery } from '../../../../redux/api/ml_api'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockLabel = 'Name'
const mockPerson = reusableMinimalEntity('Mock Person')
const mockEntity = {
  id: 'test',
  _label: 'test',
  type: 'HumanMadeObject',
  equivalent: [
    {
      id: config.aat.primaryName,
      type: 'type',
      label: 'test',
    },
  ],
}
const mockPathname = `${config.env.dataApiBaseUrl}view/person/mock-person`

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockPathname,
  }),
}))

vi.mock('../../../../lib/parse/data/helper', () => ({
  ...jest.requireActual('../../../../lib/parse/data/helper'),
  getLabelBasedOnEntityType: () => mockLabel,
}))

describe('ApiText', () => {
  describe('returns primary name', () => {
    beforeEach(async () => {
      const getName = useGetItemQuery as jest.MockedFunction<
        typeof useGetItemQuery
      >
      getName.mockReturnValueOnce({
        data: mockPerson,
        isSuccess: true,
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('returns the primary name', () => {
      const text = ApiText(mockPathname)
      expect(text).toEqual('Mock Person')
    })
  })

  describe('returns primary name label', () => {
    beforeEach(async () => {
      const getName = useGetItemQuery as jest.MockedFunction<
        typeof useGetItemQuery
      >
      // the api call is skipped
      getName.mockReturnValueOnce({
        currentData: undefined,
        data: mockEntity,
        isError: false,
        isFetching: false,
        isLoading: false,
        isSuccess: true,
        isUninitialized: false,
        status: 'fulfilled',
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('returns the label if value is a preferred term', () => {
      const value = config.aat.primaryName
      const text = ApiText(value)

      expect(text).toEqual(mockLabel)
    })
  })

  describe('returns the value', () => {
    beforeEach(async () => {
      const getName = useGetItemQuery as jest.MockedFunction<
        typeof useGetItemQuery
      >
      // the api call is skipped
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getName.mockImplementation((skipToken: any) => ({
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
      }))
    })

    it('returns the original value if it does not contain the base url', () => {
      const value = 'Andy Warhol'
      const text = ApiText(value)

      expect(text).toEqual(value)
    })
  })
})
