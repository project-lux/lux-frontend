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
}

// Shows related accordions
export const relatedAccordions: IHalLinks = {
  materials: {
    title: 'Related Materials',
    searchTag: 'lux:eventItemMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
}
