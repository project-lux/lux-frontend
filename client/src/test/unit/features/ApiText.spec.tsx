import config from '../../../config/config'
import ApiText from '../../../features/common/ApiText'
import { useGetNameQuery } from '../../../redux/api/ml_api'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

const mockLabel = 'Name'
const mockPerson = reusableMinimalEntity('Mock Person')
const mockPathname = `${config.env.dataApiBaseUrl}view/person/mock-person`

jest.mock('../../../redux/api/ml_api', () => ({
  useGetNameQuery: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockPathname,
  }),
}))

jest.mock('../../../lib/parse/data/helper', () => ({
  ...jest.requireActual('../../../lib/parse/data/helper'),
  getLabelBasedOnEntityType: () => mockLabel,
}))

describe('ApiText', () => {
  describe('returns primary name', () => {
    beforeEach(async () => {
      const getName = useGetNameQuery as jest.MockedFunction<
        typeof useGetNameQuery
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
      const getName = useGetNameQuery as jest.MockedFunction<
        typeof useGetNameQuery
      >
      // the api call is skipped
      getName.mockReturnValueOnce({
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

    it('returns the label if value is a preferred term', () => {
      const value = config.dc.primaryName
      const text = ApiText(value)

      expect(text).toEqual(mockLabel)
    })
  })

  describe('returns the value', () => {
    beforeEach(async () => {
      const getName = useGetNameQuery as jest.MockedFunction<
        typeof useGetNameQuery
      >
      // the api call is skipped
      getName.mockImplementation((skipToken) => ({
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
