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
    halLinkName: 'lux:placeMadeDiscoveredItem',
    tab: 'objects',
  },
  worksCreatedPublishedAt: {
    title: 'Works Created or Published At',
    halLinkName: 'lux:placeCreatedPublishedWork',
    tab: 'works',
  },
  worksAboutPlace: {
    title: 'Works About or Related To',
    halLinkName: 'lux:placeWorkAbout',
    tab: 'works',
  },
  collectionsCreatedAt: {
    title: 'Collections Created At',
    halLinkName: 'lux:setCreatedAtPlace',
    tab: 'collections',
  },
  collectionsAboutPlace: {
    title: 'Collections About',
    halLinkName: 'lux:setAboutPlace',
    tab: 'collections',
  },
}

// Related item and work types
export const relatedTypes: IHalLinks = {
  itemTypes: {
    title: 'Object Types',
    halLinkName: 'lux:placeItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Work Types',
    halLinkName: 'lux:placeWorkTypes',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
  collectionTypes: {
    title: 'Collection Types',
    halLinkName: 'lux:placeSetTypes',
    tab: 'collections',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering related locations
export const locations: IHalLink = {
  title: 'Related Locations',
  halLinkName: 'lux:placeRelatedPlaces',
  tab: 'places',
}

// Shows related accordions
export const relatedAccordions: IHalLinks = {
  agents: {
    title: 'Related People and Groups',
    halLinkName: 'lux:placeRelatedAgents',
    tab: 'objects',
  },
  agentsBornHere: {
    title: 'People Born and Groups Formed Here',
    halLinkName: 'lux:placeBornAgent',
    tab: 'people',
  },
  agentsDiedHere: {
    title: 'People Died and Groups Dissolved Here',
    halLinkName: 'lux:placeDiedAgent',
    tab: 'people',
  },
  agentsActiveHere: {
    title: 'People and Groups Active Here',
    halLinkName: 'lux:placeActiveAgent',
    tab: 'people',
  },
  concepts: {
    title: 'Related Concepts',
    halLinkName: 'lux:placeRelatedConcepts',
    tab: 'objects',
  },
  conceptInfluenced: {
    title: 'Concepts Influenced',
    halLinkName: 'lux:placeInfluencedConcepts',
    tab: 'concepts',
  },
  events: {
    title: 'Events that Took Place Here',
    halLinkName: 'lux:placeEvents',
    tab: 'events',
  },
  ...relatedTypes,
  locations,
}

// Used for rendering hierarchy children
export const hierarchyChildren: IHalLink = {
  title: '',
  halLinkName: 'lux:placeParts',
  tab: 'places',
}

// Used for rendering timelines
export const timelines: IHalLinks = {
  // Objects Produced
  'lux:placeItemMadeTime': {
    halLinkName: 'lux:placeItemMadeTime',
    tab: 'objects',
  },
  // Objects Encountered
  'lux:placeItemEncounteredTime': {
    halLinkName: 'lux:placeItemEncounteredTime',
    tab: 'objects',
  },
  // Works Created
  'lux:placeWorkCreatedTime': {
    halLinkName: 'lux:placeWorkCreatedTime',
    tab: 'works',
  },
  // Works Published
  'lux:placeWorkPublishedTime': {
    halLinkName: 'lux:placeWorkPublishedTime',
    tab: 'works',
  },
  // Works About or Related To
  'lux:placeWorkAboutTime': {
    halLinkName: 'lux:placeWorkAboutTime',
    tab: 'works',
  },
  // Collections About
  'lux:placeSetAboutTime': {
    halLinkName: 'lux:placeSetAboutTime',
    tab: 'collections',
  },
}
