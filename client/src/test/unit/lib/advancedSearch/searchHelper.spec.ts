import { getIcon } from '../../../../lib/advancedSearch/searchHelper'

describe('searchHelper functions', () => {
  it('returns the objects icon', () => {
    expect(getIcon('item')).toEqual('/src/resources/images/entity/objects.svg')
  })

  it('returns the works icon', () => {
    expect(getIcon('work')).toEqual('/src/resources/images/entity/work.svg')
  })

  it('returns the people icon', () => {
    expect(getIcon('agent')).toEqual(
      '/src/resources/images/entity/people-orgs.svg',
    )
  })

  it('returns the places icon', () => {
    expect(getIcon('place')).toEqual('/src/resources/images/entity/places.svg')
  })

  it('returns the concepts icon', () => {
    expect(getIcon('concept')).toEqual(
      '/src/resources/images/entity/concepts.svg',
    )
  })

  it('returns the events icon', () => {
    expect(getIcon('event')).toEqual('/src/resources/images/entity/events.svg')
  })
})
