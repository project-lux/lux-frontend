import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the place pages.
 */

// Tab content for related objects and works
export const relatedObjectsAndWorks: IHalLinks = {
  objectsRelated: {
    title: 'Files Made or Encountered At',
    searchTag: 'lux:placeMadeDiscoveredItem',
    tab: 'objects',
  },
  worksCreatedAt: {
    title: 'Datasets Created At',
    searchTag: 'lux:placeCreatedWork',
    tab: 'works',
  },
  worksPublishedAt: {
    title: 'Datasets Published At',
    searchTag: 'lux:placePublishedWork',
    tab: 'objects',
  },
  worksAboutPlace: {
    title: 'Datasets About',
    searchTag: 'lux:placeWorkAbout',
    tab: 'works',
  },
}

// Related item and work types
export const relatedTypes: IHalLinks = {
  itemTypes: {
    title: 'File Types',
    searchTag: 'lux:placeItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Dataset Types',
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
    title: 'Projects that Took Place Here',
    searchTag: 'lux:placeEvents',
    tab: 'events',
  },
  ...relatedTypes,
  locations,
}
