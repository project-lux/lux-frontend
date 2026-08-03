import { IHalLink } from '../types/IHalLink'

// Used to request and display unit data
export const archive: IHalLink = {
  title: 'View records from this archive with images',
  halLinkName: 'lux:setItemsWithImages',
}

// Used to request and display unit data
export const setWithMemberOf: IHalLink = {
  title: 'Explore',
  halLinkName: 'lux:objectOrSetMemberOfSet',
}

// Used for retrieving and rendering the set's unit
export const setUnit: IHalLink = {
  title: 'Collection',
  halLinkName: 'lux:setUnit',
  facetName: 'responsibleUnits',
}
