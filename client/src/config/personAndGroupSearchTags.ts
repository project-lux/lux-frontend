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
    searchTag: 'lux:departmentItems',
    tab: 'objects',
  },
  objectsCreated: {
    title: 'Objects Created, Encountered, or Influenced By',
    searchTag: 'lux:agentMadeDiscoveredInfluencedItem',
    tab: 'objects',
  },
  worksCreated: {
    title: 'Works Created, Published, or Influenced By',
    searchTag: 'lux:agentCreatedPublishedInfluencedWork',
    tab: 'works',
  },
  worksAbout: {
    title: 'Works About',
    searchTag: 'lux:agentWorkAbout',
    tab: 'works',
  },
}

// Used for rendering related types accordions
export const itemAndWorkTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    searchTag: 'lux:agentRelatedItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    searchTag: 'lux:agentRelatedWorkTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  searchTag: 'lux:agentRelatedPlaces',
  tab: 'places',
}

// Used for rendering timelines
export const timelines: IHalLinks = {
  itemProductionDate: {
    searchTag: 'lux:agentItemMadeTime',
    tab: 'objects',
    jsonSearchTerm: 'producedDate',
  },
  itemEncounteredDate: {
    searchTag: 'lux:agentItemEncounteredTime',
    tab: 'objects',
    jsonSearchTerm: 'encounteredDate',
  },
  workCreationDate: {
    searchTag: 'lux:agentWorkCreatedTime',
    tab: 'works',
    jsonSearchTerm: 'createdDate',
  },
  workPublicationDate: {
    searchTag: 'lux:agentWorkPublishedTime',
    tab: 'works',
    jsonSearchTerm: 'publishedDate',
  },
}

export const timelineGraph: Map<string, string> = new Map([
  ['itemProductionDate', 'Objects Produced'],
  ['itemEncounteredDate', 'Objects Encountered'],
  ['workCreationDate', 'Works Created'],
  ['workPublicationDate', 'Works Published'],
])

// Used for rendering accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    searchTag: 'lux:agentRelatedAgents',
    tab: 'objects',
  },
  founded: {
    title: 'Groups Founded',
    searchTag: 'lux:agentFoundedByAgent',
    tab: 'people',
  },
  materials: {
    title: 'Related Materials',
    searchTag: 'lux:agentRelatedMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
  concepts: {
    title: 'Related Concepts',
    searchTag: 'lux:agentRelatedConcepts',
    tab: 'concepts',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    searchTag: 'lux:agentInfluencedConcepts',
    tab: 'concepts',
  },
  eventsCarriedOut: {
    title: 'Events Carried Out',
    searchTag: 'lux:agentEventsCarriedOut',
    tab: 'events',
  },
  eventsContainingObjects: {
    title: 'Events Containing Objects Created By',
    searchTag: 'lux:agentEventsUsingProducedObjects',
    tab: 'events',
  },
  members: {
    title: 'Members',
    searchTag: 'lux:agentAgentMemberOf',
    tab: 'people',
  },
  ...itemAndWorkTypes,
  locations,
}
