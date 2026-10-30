import {
  ITimelineCriteria,
  ITimelinesTransformed,
  IYearRowIndexes,
} from '../../../types/ITimelines'
import { halLinkMapToLegendName } from '../../../config/timeline'

import TimelineParser from './TimelineParser'

export const getRenderedHalLinks = (
  data: ITimelinesTransformed,
  year: string,
  selectedRelationships?: Array<string>,
): Array<string> =>
  Object.keys(data[year]).filter(
    (halLink) =>
      halLink !== 'total' &&
      halLink !== 'criteria' &&
      (selectedRelationships === undefined ||
        selectedRelationships.includes(halLink)),
  )

export const calculateRowIndexes = (
  years: Array<string>,
  data: ITimelinesTransformed,
  selectedRelationships?: Array<string>,
): {
  totalLinks: number
  yearRows: Record<string, IYearRowIndexes>
} => {
  let nextLinkIndex = 0
  const yearRows: Record<string, IYearRowIndexes> = {}

  years.forEach((year) => {
    const linkIndexes: Record<string, number> = {}

    getRenderedHalLinks(data, year, selectedRelationships).forEach(
      (halLink) => {
        linkIndexes[halLink] = nextLinkIndex
        nextLinkIndex += 1
      },
    )

    yearRows[year] = {
      linkIndexes,
    }
  })

  return {
    totalLinks: nextLinkIndex,
    yearRows,
  }
}

/**
 * Returns the relationships present in the timeline data, in the same order
 * as the graph legend. Relationships without a legend name come last.
 * @param {ITimelinesTransformed} data the transformed timeline data
 * @returns {Array<string>}
 */
export const getTimelineRelationships = (
  data: ITimelinesTransformed,
): Array<string> => {
  const usedHalLinks = new Set(
    Object.keys(data).flatMap((year) => getRenderedHalLinks(data, year)),
  )
  const legendOrder = Array.from(halLinkMapToLegendName.keys())
  return [
    ...legendOrder.filter((halLink) => usedHalLinks.has(halLink)),
    ...Array.from(usedHalLinks).filter(
      (halLink) => !legendOrder.includes(halLink),
    ),
  ]
}

/**
 * Returns the number of items in a year for the selected relationships only.
 * @param {ITimelinesTransformed} data the transformed timeline data
 * @param {string} year the year to total
 * @param {Array<string>} selectedRelationships the relationships to include
 * @returns {number}
 */
export const getFilteredYearTotal = (
  data: ITimelinesTransformed,
  year: string,
  selectedRelationships: Array<string>,
): number => {
  if (!data.hasOwnProperty(year)) {
    return 0
  }
  const selectedHalLinks = getRenderedHalLinks(
    data,
    year,
    selectedRelationships,
  )
  // use the stored total when nothing in this year is filtered out
  if (selectedHalLinks.length === getRenderedHalLinks(data, year).length) {
    return data[year].total
  }
  return selectedHalLinks.reduce(
    (total, halLink) =>
      total + (data[year][halLink] as ITimelineCriteria).totalItems,
    0,
  )
}

/**
 * Adds or removes a relationship from the selection, keeping the legend order.
 * @param {Array<string>} relationships all relationships, in legend order
 * @param {Array<string>} selectedRelationships the current selection
 * @param {string} halLink the relationship to toggle
 * @returns {Array<string>}
 */
export const toggleRelationship = (
  relationships: Array<string>,
  selectedRelationships: Array<string>,
  halLink: string,
): Array<string> =>
  selectedRelationships.includes(halLink)
    ? selectedRelationships.filter((selected) => selected !== halLink)
    : relationships.filter(
        (relationship) =>
          relationship === halLink ||
          selectedRelationships.includes(relationship),
      )

/**
 * Validates a year typed into a timeline filter input and converts it to an
 * index in the years array.
 * @param {string} value the text the user entered
 * @param {Array<string>} years every year in the timeline, in order
 * @param {'start' | 'end'} field which end of the range is being edited
 * @param {number} otherIndex the index of the other end of the range
 * @returns {{ index: number, error: null } | { index: null, error: string }}
 */
export const validateYearInput = (
  value: string,
  years: Array<string>,
  field: 'start' | 'end',
  otherIndex: number,
): { index: number; error: null } | { index: null; error: string } => {
  const showEras = TimelineParser.showYearEra(years)
  const getYearLabel = (year: string): string =>
    showEras ? TimelineParser.getYearWithLabel(year) : year
  const trimmed = value.trim()

  if (trimmed === '') {
    return { index: null, error: 'Enter a year.' }
  }
  if (!/^-?\d+$/.test(trimmed)) {
    return {
      index: null,
      error: showEras
        ? 'Enter a whole number. Use a minus sign for B.C.E. years, for example -500.'
        : 'Enter a whole number, for example 1950.',
    }
  }

  // normalize leading zeros and "-0" so the value matches the stored years
  const year = String(parseInt(trimmed, 10))
  const index = years.indexOf(year)
  if (index === -1) {
    const lastYear = getYearLabel(years[years.length - 1])
    // era labels already end in a full stop
    const ending = lastYear.endsWith('.') ? '' : '.'
    return {
      index: null,
      error: `Enter a year from ${getYearLabel(years[0])} to ${lastYear}${ending}`,
    }
  }
  if (field === 'start' && index > otherIndex) {
    return {
      index: null,
      error: `The start year must be ${getYearLabel(years[otherIndex])} or earlier.`,
    }
  }
  if (field === 'end' && index < otherIndex) {
    return {
      index: null,
      error: `The end year must be ${getYearLabel(years[otherIndex])} or later.`,
    }
  }
  return { index, error: null }
}
