import config from '../../../../../config/config'
import TimelineParser from '../../../../../lib/parse/timeline/TimelineParser'
import {
  timelineResults as mockTimelineResults,
  itemProductionDateFacetsTransformed as mockItemFacetsTransformed,
  itemProductionDateFacets as mockItemFacets,
  transformedTimelineFacets as mockTransformedResults,
} from '../../../../data/timelineResults'

describe('TimelineParser', () => {
  describe('addSearchTagToFacetValues', () => {
    it('converts related lists results correctly', () => {
      const transformedResults = TimelineParser.addSearchTagToFacetValues(
        mockItemFacets,
        'itemProductionDate',
      )
      expect(transformedResults).toStrictEqual(mockItemFacetsTransformed)
    })
  })

  describe('getSearchTagFromFacetedSearch', () => {
    it('returns the search tag', () => {
      const mockSearchTag = 'itemProductionDate'
      const mockHalLink = `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D&name=${mockSearchTag}`

      expect(TimelineParser.getSearchTagFromFacetedSearch(mockHalLink)).toEqual(
        mockSearchTag,
      )
    })
  })

  describe('getTransformedTimelineData', () => {
    it('converts related lists results correctly', () => {
      const timeline = new TimelineParser(mockTimelineResults)
      const translatedResults = timeline.getTransformedTimelineData()
      expect(translatedResults).toStrictEqual(mockTransformedResults)
    })
  })

  describe('getSortedTimelineYears', () => {
    it('returns the sorted years', () => {
      const timeline = new TimelineParser(mockTimelineResults)
      const mockSortedData = [
        '1974',
        '1977',
        '1981',
        '1983',
        '1985',
        '1986',
        '1987',
      ]
      expect(timeline.getSortedTimelineYears()).toStrictEqual(mockSortedData)
    })
  })

  describe('getYearWithLabel', () => {
    it('returns the negative year with label', () => {
      const mockYear = '-2024'

      expect(TimelineParser.getYearWithLabel(mockYear)).toEqual('2024 B.C.E.')
    })

    it('returns the positive year with label', () => {
      const mockYear = '2024'

      expect(TimelineParser.getYearWithLabel(mockYear)).toEqual('2024 C.E.')
    })
  })

  describe('getYearFromSingleFacetValue', () => {
    it('returns BC year', () => {
      const year = TimelineParser.getYearFromSingleFacetValue(
        '-002017-10-20T00:00:00',
      )
      expect(year).toEqual('-2017')
    })

    it('returns year', () => {
      const year = TimelineParser.getYearFromSingleFacetValue(
        '2017-10-20T00:00:00',
      )
      expect(year).toEqual('2017')
    })
  })
})

describe('getStartAndEndIndex', () => {
  it('returns start and end index', () => {
    const timelineParser = new TimelineParser(mockTimelineResults)
    const transformedResults = timelineParser.getTransformedTimelineData()
    const sortedTimelineYears = timelineParser.getSortedTimelineYears()
    const yearsRange = TimelineParser.addYearsWithNoData(sortedTimelineYears)
    const { initialStart, initialEnd } = TimelineParser.getStartAndEndIndex(
      sortedTimelineYears,
      transformedResults,
      yearsRange,
    )
    expect(initialStart).toEqual(4)
    expect(initialEnd).toEqual(12)
  })
})
