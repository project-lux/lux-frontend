import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the event pages.
 */

// Tab content for related objects
export const relatedEntites: IHalLinks = {
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
  collectionsCausedBy: {
    title: 'Collections Caused By',
    searchTag: 'lux:setCausedByEvent',
    tab: 'collections',
  },
  collectionsAboutEvent: {
    title: 'Collections About',
    searchTag: 'lux:setAboutEvent',
    tab: 'collections',
  },
}

// Used for rendering related types accordions
export const relatedTypes: IHalLinks = {
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
  collectionTypes: {
    title: 'Collection Types',
    searchTag: 'lux:eventSetTypes',
    tab: 'collections',
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
  ...relatedTypes,
}

// Used for rendering timelines
export const timelines: IHalLinks = {
  objects: {
    searchTag: 'lux:eventItemIncludedTime',
    tab: 'objects',
    jsonSearchTerm: 'publishedDate,createdDate',
  },
  works: {
    searchTag: 'lux:eventWorksAboutTime',
    tab: 'works',
    jsonSearchTerm: 'publishedDate,createdDate',
  },
  worksCausedBy: {
    searchTag: 'lux:eventWorksCausedByTime',
    tab: 'works',
    jsonSearchTerm: 'causedCreationOfDate', // needs to be created
  },
  collectionsCausedBy: {
    searchTag: 'lux:eventSetsCausedByTime',
    tab: 'collections',
    jsonSearchTerm: 'causedCreationOfDate', // needs to be created
  },
  setAboutDate: {
    searchTag: 'lux:eventSetsAboutTime',
    tab: 'collections',
    jsonSearchTerm: 'publishedDate,createdDate', // this should be correct
  },
}
