import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the event pages.
 */

// Tab content for related objects
export const relatedObjectsAndWorks: IHalLinks = {
  objects: {
    title: 'Objects in Exhibition',
    searchTag: 'lux:eventIncludedItems',
    tab: 'objects',
  },
  works: {
    title: 'Works About',
    searchTag: 'lux:eventWorksAbout',
    tab: 'works',
  },
}

// Related item and work types
export const relatedTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    searchTag: 'lux:eventItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    searchTag: 'lux:eventWorkTypes',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  searchTag: 'lux:eventRelatedPlaces',
  tab: 'places',
  isSemantic: true,
}

// Shows related accordions
export const relatedAccordions: IHalLinks = {
  peopleAndGroups: {
    title: 'Related People and Groups',
    searchTag: 'lux:eventRelatedAgents',
    tab: 'objects',
    jsonSearchTerm: [],
  },
  subjects: {
    title: 'Related Subjects',
    searchTag: 'lux:eventRelatedSubjects',
    tab: 'objects',
    jsonSearchTerm: [],
  },
  materials: {
    title: 'Related Materials',
    searchTag: 'lux:eventItemMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
  ...relatedTypes,
  locations,
}
