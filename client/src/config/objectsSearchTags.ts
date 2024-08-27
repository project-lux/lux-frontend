import { IHalLink } from '../types/IHalLink'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the object pages.
 */

// Used to request and display collection data
export const collection: IHalLink = {
  title: 'Collection',
  searchTag: 'lux:itemDepartment',
  facetName: 'responsibleCollections',
}

// Used to request and display unit data
export const unit: IHalLink = {
  title: 'Responsible Unit',
  searchTag: 'lux:itemUnit',
}

// Used to request and display items that are the subject of a work
export const subjectOf: IHalLink = {
  title: 'Subject Of',
  searchTag: 'lux:itemWorkAbout',
}
