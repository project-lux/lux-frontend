import config, { getDataApiBaseUrl } from '../../../../../config/config'
import {
  redirectToTabWithResults,
  transformAdvancedSearchEstimates,
  transformSimpleSearchEstimates,
} from '../../../../../lib/parse/search/estimatesParser'
import {
  advancedSearchEstimates,
  estimatesErrorResults,
  estimatesResults,
  estimatesResultsWithRedirect,
  estimatesState,
  objectEstimates,
} from '../../../../data/estimates'

describe('estimatesParser', () => {
  config.env.dataApiBaseUrl = getDataApiBaseUrl()

  describe('transformAdvancedSearchEstimates', () => {
    it('returns the translated estimates for all tabs', () => {
      const mockEstimates = objectEstimates.objects
      const mockTransformedEstimates = advancedSearchEstimates
      expect(
        transformAdvancedSearchEstimates({ objects: mockEstimates }, 'objects'),
      ).toStrictEqual(mockTransformedEstimates)
    })
  })

  describe('transformSimpleSearchEstimates', () => {
    it('returns the translated estimates for all tabs', () => {
      const mockSimpleSearchEstimatesResults = estimatesResults
      expect(
        transformSimpleSearchEstimates(mockSimpleSearchEstimatesResults),
      ).toStrictEqual({
        objects: 803,
        works: 100,
        people: 20,
        places: 14,
        concepts: 730,
        events: 1,
      })
    })

    it('returns the estimates when there are errors in the results', () => {
      const mockSimpleSearchEstimatesResults = estimatesErrorResults
      expect(
        transformSimpleSearchEstimates(mockSimpleSearchEstimatesResults),
      ).toStrictEqual({
        objects: '-',
        works: '-',
        people: '-',
        places: '-',
        concepts: '-',
        events: '-',
      })
    })
  })

  describe('redirectToTabWithResults', () => {
    it('returns the results tab to redirect to', () => {
      const mockSimpleSearchEstimatesResults = estimatesResultsWithRedirect
      const mockState = estimatesState
      expect(
        redirectToTabWithResults(
          mockSimpleSearchEstimatesResults,
          mockState,
          'objects',
        ),
      ).toEqual('works')
    })
  })
})
