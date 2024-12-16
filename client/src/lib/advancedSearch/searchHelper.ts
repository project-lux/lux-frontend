import {
  collectionsIcon,
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  workIcon,
} from '../../config/resources'

export const getIcon = (scope: string): string => {
  switch (scope) {
    case 'item':
      return objectsIcon
    case 'work':
      return workIcon
    case 'set':
      return collectionsIcon
    case 'agent':
      return peopleOrgsIcon
    case 'place':
      return placesIcon
    case 'concept':
      return conceptsIcon
    case 'event':
      return eventsIcon
  }
  return objectsIcon
}
