import { IHalLink } from '../types/IHalLink'

// Used to request and display unit data
export const archive: IHalLink = {
  title: 'View records from this archive with images',
  searchTag: 'lux:setItemsWithImages',
}

// Used to request and display unit data
export const setWithMemberOf: IHalLink = {
  title: 'Explore',
  searchTag: 'lux:objectOrSetMemberOfSet',
}

// Used for retrieving and rendering the set's unit
export const setUnit: IHalLink = {
  title: 'Collection',
  searchTag: 'lux:setUnit',
  facetName: 'responsibleUnits',
}
