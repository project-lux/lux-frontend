import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the people and group pages.
 */

// Shown in people and group page tab content
export const relatedObjectsAndWorks: IHalLinks = {
  objectsInDepartment: {
    title: 'Objects in Collection',
    halLinkName: 'lux:departmentItems',
    tab: 'objects',
  },
  objectsCreated: {
    title: 'Objects Created, Encountered, or Influenced By',
    halLinkName: 'lux:agentMadeDiscoveredInfluencedItem',
    tab: 'objects',
  },
  worksCreated: {
    title: 'Works Created, Published, or Influenced By',
    halLinkName: 'lux:agentCreatedPublishedInfluencedWork',
    tab: 'works',
  },
  worksAbout: {
    title: 'Works About or Related To',
    halLinkName: 'lux:agentWorkAbout',
    tab: 'works',
  },
  collectionsCreatedPublishedInfluencedBy: {
    title: 'Collections Created, Published, or Influenced By',
    halLinkName: 'lux:agentCreatedPublishedInfluencedSet',
    tab: 'collections',
  },
  collectionsAboutEvent: {
    title: 'Collections About',
    halLinkName: 'lux:setAboutAgent',
    tab: 'collections',
  },
}

// Used for rendering related types accordions
export const itemAndWorkTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    halLinkName: 'lux:agentRelatedItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    halLinkName: 'lux:agentRelatedWorkTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  halLinkName: 'lux:agentRelatedPlaces',
  tab: 'places',
}

// Used for rendering timelines
export const timelines: IHalLinks = {
  // Objects Produced
  'lux:agentItemMadeTime': {
    halLinkName: 'lux:agentItemMadeTime',
    tab: 'objects',
  },
  // Objects Encountered By
  'lux:agentItemEncounteredTime': {
    halLinkName: 'lux:agentItemEncounteredTime',
    tab: 'objects',
  },
  // Works Created By
  'lux:agentWorkCreatedTime': {
    halLinkName: 'lux:agentWorkCreatedTime',
    tab: 'works',
  },
  // Works Published By
  'lux:agentWorkPublishedTime': {
    halLinkName: 'lux:agentWorkPublishedTime',
    tab: 'works',
  },
  // Works Influenced By
  'lux:agentWorkInfluencedTime': {
    halLinkName: 'lux:agentWorkInfluencedTime',
    tab: 'works',
  },
  // Works About
  'lux:agentWorkAboutTime': {
    halLinkName: 'lux:agentWorkAboutTime',
    tab: 'works',
  },
  // Collections About
  'lux:agentSetAboutTime': {
    halLinkName: 'lux:agentSetAboutTime',
    tab: 'collections',
  },
  // Collections Created By
  'lux:agentSetCreatedTime': {
    halLinkName: 'lux:agentSetCreatedTime',
    tab: 'collections',
  },
  // Collections Published By
  'lux:agentSetPublishedTime': {
    halLinkName: 'lux:agentSetPublishedTime',
    tab: 'collections',
  },
}

// Used for rendering accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    halLinkName: 'lux:agentRelatedAgents',
    tab: 'objects',
  },
  founded: {
    title: 'Groups Founded',
    halLinkName: 'lux:agentFoundedByAgent',
    tab: 'people',
  },
  materials: {
    title: 'Related Materials',
    halLinkName: 'lux:agentRelatedMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
  concepts: {
    title: 'Related Concepts',
    halLinkName: 'lux:agentRelatedConcepts',
    tab: 'concepts',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    halLinkName: 'lux:agentInfluencedConcepts',
    tab: 'concepts',
  },
  eventsCarriedOut: {
    title: 'Events Carried Out',
    halLinkName: 'lux:agentEventsCarriedOut',
    tab: 'events',
  },
  eventsContainingObjects: {
    title: 'Events Containing Objects Created By',
    halLinkName: 'lux:agentEventsUsingProducedObjects',
    tab: 'events',
  },
  members: {
    title: 'Members',
    halLinkName: 'lux:agentAgentMemberOf',
    tab: 'people',
  },
  collectionTypes: {
    title: 'Collection Types',
    halLinkName: 'lux:agentSetTypes',
    tab: 'collections',
    jsonSearchTerm: 'classification',
  },
  ...itemAndWorkTypes,
  locations,
}
