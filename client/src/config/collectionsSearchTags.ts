import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the collection pages.
 */

// Tab content for related objects
export const objectsIncluded: IHalLinks = {
  objects: {
    title: 'Objects Included',
    searchTag: 'lux:setIncludedItems',
    tab: 'objects',
  },
}

// Used for rendering timeline data
export const timeline: IHalLinks = {
  itemProductionDate: {
    searchTag: 'lux:setItemMadeTime',
    tab: 'objects',
    jsonSearchTerm: 'producedDate',
  },
  itemEncounteredDate: {
    searchTag: 'lux:setItemEncounteredTime',
    tab: 'objects',
    jsonSearchTerm: 'encounteredDate',
  },
}

export const relatedTypes: IHalLinks = {
  types: {
    title: 'Object Types',
    searchTag: 'lux:setItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering accordions and their content
export const relatedAccordions: IHalLinks = {
  ...relatedTypes,
}
