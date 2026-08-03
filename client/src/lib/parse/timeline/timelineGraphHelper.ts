import {
  ITimelinesTransformed,
  IYearRowIndexes,
} from '../../../types/ITimelines'

export const getRenderedHalLinks = (
  data: ITimelinesTransformed,
  year: string,
): Array<string> =>
  Object.keys(data[year]).filter(
    (halLink) => halLink !== 'total' && halLink !== 'criteria',
  )

export const calculateRowIndexes = (
  years: Array<string>,
  data: ITimelinesTransformed,
): {
  totalLinks: number
  yearRows: Record<string, IYearRowIndexes>
} => {
  let nextLinkIndex = 0
  const yearRows: Record<string, IYearRowIndexes> = {}

  years.forEach((year) => {
    const linkIndexes: Record<string, number> = {}

    getRenderedHalLinks(data, year).forEach((halLink) => {
      linkIndexes[halLink] = nextLinkIndex
      nextLinkIndex += 1
    })

    yearRows[year] = {
      linkIndexes,
    }
  })

  return {
    totalLinks: nextLinkIndex,
    yearRows,
  }
}
