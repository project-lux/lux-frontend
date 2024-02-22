import {
  conceptsIcon,
  eventsIcon,
  objectIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  workIcon,
} from '../../config/resources'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getIcon = (scope: string): any => {
  switch (scope) {
    case 'item':
      return objectsIcon
    case 'work':
      return workIcon
    case 'agent':
      return peopleOrgsIcon
    case 'place':
      return placesIcon
    case 'concept':
      return conceptsIcon
    case 'event':
      return eventsIcon
  }
  return objectIcon
}
