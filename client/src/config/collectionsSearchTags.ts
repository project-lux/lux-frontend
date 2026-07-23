import { IHalLink } from '../types/IHalLink'
import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the collection pages.
 */

// Exhibition event
export const setEvent: IHalLink = {
  title: 'Exhibition Event',
  halLinkName: 'lux:setEvents',
}

// Tab content for related objects
export const objectsIncluded: IHalLinks = {
  objects: {
    title: 'Objects Included',
    halLinkName: 'lux:setIncludedItems',
    tab: 'objects',
  },
}

// Used for rendering timeline data
export const timeline: IHalLinks = {
  'lux:setItemMadeTime': {
    halLinkName: 'lux:setItemMadeTime',
    tab: 'objects',
  },
  'lux:setItemEncounteredTime': {
    halLinkName: 'lux:setItemEncounteredTime',
    tab: 'objects',
  },
}

export const relatedTypes: IHalLinks = {
  types: {
    title: 'Object Types',
    halLinkName: 'lux:setItemTypes',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
}

// Used for rendering accordions and their content
export const relatedAccordions: IHalLinks = {
  ...relatedTypes,
}
