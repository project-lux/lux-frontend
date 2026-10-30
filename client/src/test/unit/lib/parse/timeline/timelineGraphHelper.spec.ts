import TimelineParser from '../../../../../lib/parse/timeline/TimelineParser'
import {
  calculateRowIndexes,
  getFilteredYearTotal,
  getRenderedHalLinks,
  getTimelineRelationships,
  toggleRelationship,
  validateYearInput,
} from '../../../../../lib/parse/timeline/timelineGraphHelper'
import { ITimelinesTransformed } from '../../../../../types/ITimelines'
import {
  itemProductionDateHalLink,
  timelineResults as mockTimelineResults,
  workCreationDateHalLink,
  workPublicationDateHalLink,
} from '../../../../data/timelineResults'

describe('timelineGraphHelper', () => {
  const transformedTimelineData = new TimelineParser(
    mockTimelineResults,
  ).getTransformedTimelineData()

  describe('getRenderedHalLinks', () => {
    it('returns year hal links without total or criteria keys', () => {
      expect(
        getRenderedHalLinks(transformedTimelineData, '1982'),
      ).toStrictEqual([
        itemProductionDateHalLink,
        workCreationDateHalLink,
        workPublicationDateHalLink,
      ])
    })

    it('excludes metadata keys from the rendered links', () => {
      const mockData: ITimelinesTransformed = {
        '2000': {
          total: 1,
          criteria: {
            totalItems: 1,
            searchParams: '',
            searchTag: 'itemProductionDate',
          },
          [itemProductionDateHalLink]: {
            totalItems: 1,
            searchParams: '',
            searchTag: 'itemProductionDate',
          },
        },
      }

      expect(getRenderedHalLinks(mockData, '2000')).toStrictEqual([
        itemProductionDateHalLink,
      ])
    })

    it('returns only the selected relationships', () => {
      expect(
        getRenderedHalLinks(transformedTimelineData, '1982', [
          workCreationDateHalLink,
        ]),
      ).toStrictEqual([workCreationDateHalLink])
    })
  })

  describe('calculateRowIndexes', () => {
    it('returns row and link indexes for the rendered year links', () => {
      const years = ['1982', '1983']

      expect(calculateRowIndexes(years, transformedTimelineData)).toStrictEqual(
        {
          totalLinks: 5,
          yearRows: {
            '1982': {
              linkIndexes: {
                [itemProductionDateHalLink]: 0,
                [workCreationDateHalLink]: 1,
                [workPublicationDateHalLink]: 2,
              },
            },
            '1983': {
              linkIndexes: {
                [itemProductionDateHalLink]: 3,
                [workCreationDateHalLink]: 4,
              },
            },
          },
        },
      )
    })

    it('returns empty indexes when no years are provided', () => {
      expect(calculateRowIndexes([], transformedTimelineData)).toStrictEqual({
        totalLinks: 0,
        yearRows: {},
      })
    })
  })

  describe('calculateRowIndexes with selected relationships', () => {
    it('only indexes the selected relationships', () => {
      expect(
        calculateRowIndexes(['1982', '1983'], transformedTimelineData, [
          workCreationDateHalLink,
        ]),
      ).toStrictEqual({
        totalLinks: 2,
        yearRows: {
          '1982': { linkIndexes: { [workCreationDateHalLink]: 0 } },
          '1983': { linkIndexes: { [workCreationDateHalLink]: 1 } },
        },
      })
    })
  })

  describe('getTimelineRelationships', () => {
    it('returns every relationship in the data', () => {
      expect(getTimelineRelationships(transformedTimelineData)).toStrictEqual([
        itemProductionDateHalLink,
        workCreationDateHalLink,
        workPublicationDateHalLink,
      ])
    })

    it('uses legend order and puts relationships without a legend name last', () => {
      const criteria = { totalItems: 1, searchParams: '', searchTag: '' }
      const mockData: ITimelinesTransformed = {
        '2000': {
          total: 3,
          'lux:unknownTime': criteria,
          'lux:agentWorkCreatedTime': criteria,
          'lux:agentItemMadeTime': criteria,
        },
      }

      expect(getTimelineRelationships(mockData)).toStrictEqual([
        'lux:agentItemMadeTime',
        'lux:agentWorkCreatedTime',
        'lux:unknownTime',
      ])
    })
  })

  describe('getFilteredYearTotal', () => {
    const mockData: ITimelinesTransformed = {
      '2000': {
        total: 5,
        [itemProductionDateHalLink]: {
          totalItems: 2,
          searchParams: '',
          searchTag: '',
        },
        [workCreationDateHalLink]: {
          totalItems: 3,
          searchParams: '',
          searchTag: '',
        },
      },
    }

    it('returns the stored total when every relationship is selected', () => {
      expect(
        getFilteredYearTotal(mockData, '2000', [
          itemProductionDateHalLink,
          workCreationDateHalLink,
        ]),
      ).toBe(5)
    })

    it('returns the total for the selected relationships', () => {
      expect(
        getFilteredYearTotal(mockData, '2000', [workCreationDateHalLink]),
      ).toBe(3)
    })

    it('returns 0 when no relationships are selected', () => {
      expect(getFilteredYearTotal(mockData, '2000', [])).toBe(0)
    })

    it('returns 0 for a year with no data', () => {
      expect(
        getFilteredYearTotal(mockData, '2001', [itemProductionDateHalLink]),
      ).toBe(0)
    })
  })

  describe('toggleRelationship', () => {
    const relationships = ['a', 'b', 'c']

    it('removes a selected relationship', () => {
      expect(toggleRelationship(relationships, ['a', 'b'], 'a')).toStrictEqual([
        'b',
      ])
    })

    it('adds a relationship back in its original order', () => {
      expect(toggleRelationship(relationships, ['c'], 'a')).toStrictEqual([
        'a',
        'c',
      ])
    })
  })

  describe('validateYearInput', () => {
    const years = ['1950', '1951', '1952', '1953']
    const eraYears = ['-2', '-1', '0', '1']

    it('returns the index of a valid year', () => {
      expect(validateYearInput('1951', years, 'start', 3)).toStrictEqual({
        index: 1,
        error: null,
      })
    })

    it('ignores surrounding spaces and leading zeros', () => {
      expect(validateYearInput(' 01952 ', years, 'end', 0)).toStrictEqual({
        index: 2,
        error: null,
      })
    })

    it('requires a value', () => {
      expect(validateYearInput('  ', years, 'start', 3)).toStrictEqual({
        index: null,
        error: 'Enter a year.',
      })
    })

    it('rejects values that are not whole numbers', () => {
      for (const value of ['19a0', '1950.5', '1e3', '--1']) {
        expect(validateYearInput(value, years, 'start', 3)).toStrictEqual({
          index: null,
          error: 'Enter a whole number, for example 1950.',
        })
      }
    })

    it('explains the minus sign when the timeline has B.C.E. years', () => {
      expect(validateYearInput('abc', eraYears, 'start', 3).error).toBe(
        'Enter a whole number. Use a minus sign for B.C.E. years, for example -500.',
      )
    })

    it('rejects years outside the timeline', () => {
      expect(validateYearInput('1900', years, 'start', 3)).toStrictEqual({
        index: null,
        error: 'Enter a year from 1950 to 1953.',
      })
    })

    it('labels eras in the range error', () => {
      expect(validateYearInput('5', eraYears, 'end', 0).error).toBe(
        'Enter a year from 2 B.C.E. to 1 C.E.',
      )
    })

    it('accepts B.C.E. years and "-0"', () => {
      expect(validateYearInput('-2', eraYears, 'start', 3).index).toBe(0)
      expect(validateYearInput('-0', eraYears, 'start', 3).index).toBe(2)
    })

    it('rejects a start year after the end year', () => {
      expect(validateYearInput('1953', years, 'start', 1)).toStrictEqual({
        index: null,
        error: 'The start year must be 1951 or earlier.',
      })
    })

    it('rejects an end year before the start year', () => {
      expect(validateYearInput('1950', years, 'end', 2)).toStrictEqual({
        index: null,
        error: 'The end year must be 1952 or later.',
      })
    })

    it('allows the start and end to be the same year', () => {
      expect(validateYearInput('1951', years, 'end', 1).index).toBe(1)
    })
  })
})
