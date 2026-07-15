import { getIcon } from '../../../../lib/advancedSearch/searchHelper'
import {
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  workIcon,
} from '../../../../config/resources'

describe('searchHelper functions', () => {
  it('returns the objects icon', () => {
    expect(getIcon('item')).toEqual(objectsIcon)
  })

  it('returns the works icon', () => {
    expect(getIcon('work')).toEqual(workIcon)
  })

  it('returns the people icon', () => {
    expect(getIcon('agent')).toEqual(peopleOrgsIcon)
  })

  it('returns the places icon', () => {
    expect(getIcon('place')).toEqual(placesIcon)
  })

  it('returns the concepts icon', () => {
    expect(getIcon('concept')).toEqual(conceptsIcon)
  })

  it('returns the events icon', () => {
    expect(getIcon('event')).toEqual(eventsIcon)
  })
})
