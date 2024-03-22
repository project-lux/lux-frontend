import { IHalLinks } from '../types/IHalLinks'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the event pages.
 */

// Tab content for related objects
export const relatedObjects: IHalLinks = {
  objects: {
    title: 'Files in Exhibition',
    searchTag: 'lux:eventIncludedItems',
    tab: 'objects',
  },
  works: {
    title: 'Datasets About',
    searchTag: 'lux:eventWorksAbout',
    tab: 'works',
  },
  worksCausedBy: {
    title: 'Generated Datasets',
    searchTag: 'lux:eventWorksCausedBy',
    tab: 'works',
  },
}

// Used for rendering related types accordions
export const itemAndWorkTypes: IHalLinks = {
  itemTypes: {
    title: 'File Types',
    searchTag: 'lux:eventObjectTypesUsed',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  itemTypesPeriods: {
    title: 'File Types',
    searchTag: 'lux:eventObjectTypesAbout',
    tab: 'objects',
    jsonSearchTerm: 'classification',
  },
  workTypes: {
    title: 'Dataset Types',
    searchTag: 'lux:eventWorkTypesUsed',
    tab: 'works',
    jsonSearchTerm: 'classification',
  },
  workTypesPeriods: {
    title: 'Dataset Types',
    searchTag: 'lux:eventWorkTypesAbout',
    tab: 'works',
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
  materials: {
    title: 'Related Materials',
    searchTag: 'lux:eventItemMaterials',
    tab: 'concepts',
    jsonSearchTerm: 'material',
  },
  subjects: {
    title: 'Related Subjects',
    searchTag: 'lux:eventConceptsOfItems',
    tab: 'concepts',
  },
  ...itemAndWorkTypes,
}
