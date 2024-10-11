import { formatDateJsonSearch } from '../../../../../lib/parse/timeline/timelineHelper'

describe('timelineHelper', () => {
  describe('formatDateJsonSearch', () => {
    it('returns string with formatted search when given single searchTerm', () => {
      const mockJsonCriteria = {
        producedBy: {
          id: 'https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83',
        },
      }
      const formattedYear = formatDateJsonSearch(
        '1980',
        'producedDate',
        mockJsonCriteria,
      )
      expect(formattedYear).toEqual(
        '{"AND":[{"producedBy":{"id":"https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83"}},{"producedDate":"1980-12-31T00:00:00.000Z","_comp":"<="},{"producedDate":"1980-01-01T00:00:00.000Z","_comp":">="}]}',
      )
    })
  })
})
