import { IHalLink } from '../types/IHalLink'

/**
 * Contains configuration for React components for which search tags should be used to render data
 * on the object pages.
 */

// Used for retrieving and rendering carried by data
export const carriedBy: IHalLink = {
  title: 'Carried By',
  searchTag: 'lux:workCarriedBy',
}

// Used for retrieving and rendering the set's unit
export const setUnit: IHalLink = {
  title: 'Collection',
  searchTag: 'lux:setUnit',
  facetName: 'responsibleUnits',
}

// Used to request and display works that are the subject of a work
export const subjectOf: IHalLink = {
  title: 'Subject Of',
  searchTag: 'lux:workWorksAbout',
}

// Works that contain other works
export const workContains: IHalLink = {
  title: 'Contains',
  searchTag: 'lux:workIncludedWorks',
}
