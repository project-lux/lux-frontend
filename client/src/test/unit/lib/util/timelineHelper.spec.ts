import {
  transformTimelineData,
  sortTimelineData,
  getYearWithLabel,
  addYearsWithNoData,
} from '../../../../lib/util/timelineHelper'
import {
  timelineResults as mockTimelineResults,
  transformedTimelineFacets as mockTransformedResults,
} from '../../../data/timelineResults'

describe('timelineHelper', () => {
  describe('transformTimelineData', () => {
    it('converts related lists results correctly', () => {
      const translatedResults = transformTimelineData(mockTimelineResults)
      expect(translatedResults).toStrictEqual(mockTransformedResults)
    })
  })

  describe('sortTimelineData', () => {
    it('returns the sorted years', () => {
      const mockData = {
        '1': 'test',
        '4': 'test',
        '1000': 'test',
        '-40': 'test',
        '-20': 'test',
        '0': 'test',
      }

      const mockSortedData = ['-40', '-20', '0', '1', '4', '1000']
      expect(sortTimelineData(mockData)).toStrictEqual(mockSortedData)
    })
  })

  describe('addYearsWithNoData', () => {
    it('returns the sorted years', () => {
      const mockSortedData = ['-10', '-5', '0', '4']
      const mockReturned = [
        '-10',
        '-9',
        '-8',
        '-7',
        '-6',
        '-5',
        '-4',
        '-3',
        '-2',
        '-1',
        '0',
        '1',
        '2',
        '3',
        '4',
      ]
      expect(addYearsWithNoData(mockSortedData)).toStrictEqual(mockReturned)
    })
  })

  describe('getYearWithLabel', () => {
    it('returns the negative year with label', () => {
      const mockYear = '-2024'

      expect(getYearWithLabel(mockYear)).toEqual('2024 B.C.E.')
    })

    it('returns the positive year with label', () => {
      const mockYear = '2024'

      expect(getYearWithLabel(mockYear)).toEqual('2024 C.E.')
    })
  })
})
