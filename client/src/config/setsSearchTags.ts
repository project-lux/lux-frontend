import { IHalLink } from '../types/IHalLink'

// Used to request and display unit data
export const archive: IHalLink = {
  title: 'View records from this archive with images',
  searchTag: 'lux:setItemsWithImages',
}

// Used to request and display events within a set
export const events: IHalLink = {
  title: 'Exhibition Event',
  searchTag: 'lux:setEvents',
}
