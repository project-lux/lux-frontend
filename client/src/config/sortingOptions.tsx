/**
 * Configuration required for sorting results on the results page.
 * Each results page has its own sorting options.
 */

export const sortBy: { [key: string]: Record<string, string> } = {
  objects: {
    anySortName: 'Title/Label',
    itemProductionDate: 'Creation Date',
    itemEncounteredDate: 'Encounter Date',
    itemDimensionValue: 'Any Dimension',
    itemDepthDimensionValue: 'Depth',
    itemHeightDimensionValue: 'Height',
    itemWidthDimensionValue: 'Width',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  works: {
    anySortName: 'Title/Label',
    random: 'Shuffle Results',
    relevance: 'Relevance',
    workCreationDate: 'Created Date',
    workPublicationDate: 'Published Date',
  },
  people: {
    anySortName: 'Name',
    agentEndDate: 'Died/Dissolved Date',
    agentStartDate: 'Born/Formed Date',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  places: {
    anySortName: 'Name',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  concepts: {
    anySortName: 'Name',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  events: {
    anySortName: 'Title/Label',
    eventStartDate: 'Start Date',
    eventEndDate: 'End Date',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
}

export const sortDirection: Record<string, string> = {
  asc: 'asc',
  desc: 'desc',
}
