import { getIcon } from '../../../../lib/advancedSearch/searchHelper'

describe('searchHelper functions', () => {
  it('returns the objects icon', () => {
    expect(getIcon('item')).toEqual('objects.svg')
  })

  it('returns the works icon', () => {
    expect(getIcon('work')).toEqual('work.svg')
  })

  it('returns the people icon', () => {
    expect(getIcon('agent')).toEqual('people-orgs.svg')
  })

  it('returns the places icon', () => {
    expect(getIcon('place')).toEqual('places.svg')
  })

  it('returns the concepts icon', () => {
    expect(getIcon('concept')).toEqual('concepts.svg')
  })

  it('returns the events icon', () => {
    expect(getIcon('event')).toEqual('events.svg')
  })
})
