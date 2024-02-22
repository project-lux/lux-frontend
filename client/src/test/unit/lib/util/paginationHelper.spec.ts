import { DOTS, getPagination } from '../../../../lib/util/paginationHelper'

describe('paginationHelper', () => {
  const mockEstimate = 1000
  const mockPageSize = 20
  const mockSiblingCount = 2

  it('returns correct array when on page one', () => {
    expect(
      getPagination(mockEstimate, mockPageSize, mockSiblingCount, 1),
    ).toEqual([1, 2, 3, 4, 5, DOTS])
  })

  it('returns correct array when on last page', () => {
    expect(
      getPagination(mockEstimate, mockPageSize, mockSiblingCount, 50),
    ).toEqual([DOTS, 46, 47, 48, 49, 50])
  })

  it('returns correct array when on page in the middle', () => {
    expect(
      getPagination(mockEstimate, mockPageSize, mockSiblingCount, 25),
    ).toEqual([DOTS, 23, 24, 25, 26, 27, DOTS])
  })
})
