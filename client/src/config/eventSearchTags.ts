import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the event pages.
 */

// Tab content for related objects
export const relatedObjects: IHalLinks = {
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
  worksCausedBy: {
    title: 'Works Caused By',
    searchTag: 'lux:eventCausedWorks',
    tab: 'works',
  },
}

// Used for rendering related types accordions
export const itemAndWorkTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    searchTag: 'lux:eventObjectTypesUsed',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  itemTypesPeriods: {
    title: 'Object Types',
    searchTag: 'lux:eventObjectTypesAbout',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    searchTag: 'lux:eventWorkTypesUsed',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
  workTypesPeriods: {
    title: 'Work Types',
    searchTag: 'lux:eventWorkTypesAbout',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
}

// Shows related accordions
export const relatedAccordions: IHalLinks = {
  conceptInfluenced: {
    title: 'Concepts Influenced',
    searchTag: 'lux:eventConceptsInfluencedBy',
    tab: 'concepts',
  },
  agents: {
    title: 'Related People and Groups',
    searchTag: 'lux:eventRelatedAgents',
    tab: 'people',
  },
  places: {
    title: 'Related Locations',
    searchTag: 'lux:eventRelatedPlaces',
    tab: 'places',
  },
  materials: {
    title: 'Related Materials',
    searchTag: 'lux:eventItemMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
  subjects: {
    title: 'Related Concepts',
    searchTag: 'lux:eventRelatedConcepts',
    tab: 'concepts',
  },
  ...itemAndWorkTypes,
}
