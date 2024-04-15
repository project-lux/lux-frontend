import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the concept pages.
 */

// Used for rendering related types accordions
export const relatedItems: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    searchTag: 'lux:conceptItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    searchTag: 'lux:conceptWorkTypes',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
}

// Tab content for related objects and works
export const relatedObjectsAndWorks: IHalLinks = {
  objectsRelated: {
    title: 'Objects Related',
    searchTag: 'lux:conceptRelatedItems',
    tab: 'objects',
  },
  worksRelated: {
    title: 'Works Related',
    searchTag: 'lux:conceptRelatedWorks',
    tab: 'works',
  },
}

// Used for rendering timelines
export const timeline: IHalLinks = {
  itemProductionDate: {
    searchTag: 'lux:conceptItemMadeTime',
    tab: 'objects',
    jsonSearchTerm: 'producedDate',
  },
  itemEncounteredDate: {
    searchTag: 'lux:conceptItemEncounteredTime',
    tab: 'objects',
    jsonSearchTerm: 'encounteredDate',
  },
  workPublicationDate: {
    searchTag: 'lux:conceptWorkPublishedTime',
    tab: 'works',
    jsonSearchTerm: 'publishedDate',
  },
  workCreationDate: {
    searchTag: 'lux:conceptWorkCreatedTime',
    tab: 'works',
    jsonSearchTerm: 'createdDate',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  searchTag: 'lux:conceptRelatedPlaces',
  tab: 'places',
}

// Used for rendering accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    searchTag: 'lux:conceptRelatedAgents',
    tab: 'objects',
  },
  concepts: {
    title: 'Related Concepts',
    searchTag: 'lux:conceptRelatedConcepts',
    tab: 'objects',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    searchTag: 'lux:conceptInfluencedConcepts',
    tab: 'concepts',
  },
  agentNationality: {
    title: 'People and Groups with Nationality',
    searchTag: 'lux:nationalityForAgent',
    tab: 'people',
  },
  agentGender: {
    title: 'People with Gender',
    searchTag: 'lux:genderForAgent',
    tab: 'people',
  },
  agentOccupation: {
    title: 'People and Groups with Occupation',
    searchTag: 'lux:occupationForAgent',
    tab: 'people',
  },
  agentType: {
    title: 'People and Groups with Type',
    searchTag: 'lux:typeForAgent',
    tab: 'people',
  },
  placeType: {
    title: 'Places with Type',
    searchTag: 'lux:typeForPlace',
    tab: 'places',
  },
  eventType: {
    title: 'Events with Type',
    searchTag: 'lux:typeForEvent',
    tab: 'events',
  },
  ...relatedItems,
  locations,
}
