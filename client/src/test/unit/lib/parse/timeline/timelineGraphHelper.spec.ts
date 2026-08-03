import TimelineParser from '../../../../../lib/parse/timeline/TimelineParser'
import {
  calculateRowIndexes,
  getRenderedHalLinks,
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
})
