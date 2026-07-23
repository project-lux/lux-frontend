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
    halLinkName: 'lux:conceptItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    halLinkName: 'lux:conceptWorkTypes',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
}

// Tab content for related objects and works
export const relatedObjectsAndWorks: IHalLinks = {
  objectsRelated: {
    title: 'Objects Related',
    halLinkName: 'lux:conceptRelatedItems',
    tab: 'objects',
  },
  worksRelated: {
    title: 'Works Related',
    halLinkName: 'lux:conceptRelatedWorks',
    tab: 'works',
  },
  collectionsRelated: {
    title: 'Collections Related',
    halLinkName: 'lux:conceptRelatedSets',
    tab: 'collections',
  },
}

// Used for rendering timelines
export const timeline: IHalLinks = {
  'lux:conceptItemMadeTime': {
    halLinkName: 'lux:conceptItemMadeTime',
    tab: 'objects',
  },
  'lux:conceptItemEncounteredTime': {
    halLinkName: 'lux:conceptItemEncounteredTime',
    tab: 'objects',
  },
  'lux:conceptWorkPublishedTime': {
    halLinkName: 'lux:conceptWorkPublishedTime',
    tab: 'works',
  },
  'lux:conceptWorkCreatedTime': {
    halLinkName: 'lux:conceptWorkCreatedTime',
    tab: 'works',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  halLinkName: 'lux:conceptRelatedPlaces',
  tab: 'places',
}

// Used for rendering accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    halLinkName: 'lux:conceptRelatedAgents',
    tab: 'objects',
  },
  concepts: {
    title: 'Related Concepts',
    halLinkName: 'lux:conceptRelatedConcepts',
    tab: 'objects',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    halLinkName: 'lux:conceptInfluencedConcepts',
    tab: 'concepts',
  },
  agentNationality: {
    title: 'People and Groups with Nationality',
    halLinkName: 'lux:nationalityForAgent',
    tab: 'people',
  },
  agentGender: {
    title: 'People with Gender',
    halLinkName: 'lux:genderForAgent',
    tab: 'people',
  },
  agentOccupation: {
    title: 'People and Groups with Occupation/Role',
    halLinkName: 'lux:occupationForAgent',
    tab: 'people',
  },
  agentType: {
    title: 'People and Groups with Type',
    halLinkName: 'lux:typeForAgent',
    tab: 'people',
  },
  placeType: {
    title: 'Places with Type',
    halLinkName: 'lux:typeForPlace',
    tab: 'places',
  },
  eventType: {
    title: 'Events with Type',
    halLinkName: 'lux:typeForEvent',
    tab: 'events',
  },
  ...relatedItems,
  locations,
}

// Used for rendering hierarchy children
export const hierarchyChildren: IHalLink = {
  title: '',
  halLinkName: 'lux:conceptChildren',
  tab: 'concepts',
}
