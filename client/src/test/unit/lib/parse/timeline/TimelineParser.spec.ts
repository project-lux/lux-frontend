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
        '',
      )
      expect(transformedResults).toStrictEqual(mockItemFacetsTransformed)
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
        '1945',
        '1958',
        '1959',
        '1964',
        '1966',
        '1967',
        '1968',
        '1971',
        '1972',
        '1973',
        '1974',
        '1976',
        '1977',
        '1978',
        '1979',
        '1980',
        '1981',
        '1982',
        '1983',
        '1984',
        '1985',
        '1986',
        '1987',
        '1998',
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
    expect(initialStart).toEqual(16)
    expect(initialEnd).toEqual(52)
  })
})
