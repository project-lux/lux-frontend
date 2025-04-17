import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the place pages.
 */

// Tab content for related objects and works
export const relatedObjectsAndWorks: IHalLinks = {
  objectsRelated: {
    title: 'Objects Made or Encountered At',
    searchTag: 'lux:placeMadeDiscoveredItem',
    tab: 'objects',
  },
  worksCreatedAt: {
    title: 'Works Created At',
    searchTag: 'lux:placeCreatedWork',
    tab: 'works',
  },
  worksPublishedAt: {
    title: 'Works Published At',
    searchTag: 'lux:placePublishedWork',
    tab: 'works',
  },
  worksAboutPlace: {
    title: 'Works About',
    searchTag: 'lux:placeWorkAbout',
    tab: 'works',
  },
}

// Related item and work types
export const relatedTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    searchTag: 'lux:placeItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    searchTag: 'lux:placeWorkTypes',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  searchTag: 'lux:placeRelatedPlaces',
  tab: 'places',
}

// Shows related accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    searchTag: 'lux:placeRelatedAgents',
    tab: 'objects',
  },
  agentsBornHere: {
    title: 'People Born and Groups Formed Here',
    searchTag: 'lux:placeBornAgent',
    tab: 'people',
  },
  agentsDiedHere: {
    title: 'People Died and Groups Dissolved Here',
    searchTag: 'lux:placeDiedAgent',
    tab: 'people',
  },
  agentsActiveHere: {
    title: 'People and Groups Active Here',
    searchTag: 'lux:placeActiveAgent',
    tab: 'people',
  },
  concepts: {
    title: 'Related Concepts',
    searchTag: 'lux:placeRelatedConcepts',
    tab: 'objects',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    searchTag: 'lux:placeInfluencedConcepts',
    tab: 'concepts',
  },
  events: {
    title: 'Events that Took Place Here',
    searchTag: 'lux:placeEvents',
    tab: 'events',
  },
  ...relatedTypes,
  locations,
}

// Used for rendering hierarchy children
export const hierarchyChildren: IHalLink = {
  title: '',
  searchTag: 'lux:placeParts',
  tab: 'places',
}

// Used for rendering timelines
export const timelines: IHalLinks = {
  itemProductionDate: {
    searchTag: 'lux:placeItemMadeTime',
    tab: 'objects',
    jsonSearchTerm: 'producedDate',
  },
  itemEncounteredDate: {
    searchTag: 'lux:placeItemEncounteredTime',
    tab: 'objects',
    jsonSearchTerm: 'encounteredDate',
  },
  workCreationDate: {
    searchTag: 'lux:placeWorkCreatedTime',
    tab: 'works',
    jsonSearchTerm: 'createdDate',
  },
  workPublicationDate: {
    searchTag: 'lux:placeWorkPublishedTime',
    tab: 'works',
    jsonSearchTerm: 'publishedDate',
  },
  workCreationOrPublicationDate: {
    searchTag: 'lux:placeWorkAboutTime',
    tab: 'works',
    jsonSearchTerm: 'publishedDate,createdDate',
  },
}
