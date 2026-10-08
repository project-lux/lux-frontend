import { buildSearchRequestUrl } from '../../../../../lib/parse/search/buildSearchUrl'
import { ISearchParams } from '../../../../../types/IMlApiParams'

describe('buildSearchRequestUrl', () => {
  const baseParams: ISearchParams = {
    q: '{"AND":[{"text":"andy"}]}',
    facets: {},
  }

  it('builds the URL the integration mocks expect', () => {
    // Matches the nock fixture in
    // src/test/integration/utils/objectResultsMockAPI.tsx -- param order
    // included, since nock matches the query string exactly.
    expect(
      buildSearchRequestUrl({
        q: '{"AND":[{"text":"andy","_lang":"en"},{"text":"warhol","_lang":"en"}]}',
        facets: {},
        tab: 'objects',
        page: 1,
        pageLength: 20,
      }),
    ).toEqual(
      'api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20',
    )
  })

  it('maps the tab to a search scope', () => {
    expect(buildSearchRequestUrl({ ...baseParams, tab: 'people' })).toContain(
      'api/search/agent?',
    )
    expect(buildSearchRequestUrl({ ...baseParams, tab: 'places' })).toContain(
      'api/search/place?',
    )
  })

  it('leaves the scope empty when no tab is given', () => {
    expect(buildSearchRequestUrl(baseParams)).toContain('api/search/?')
  })

  it('url-encodes the query', () => {
    const url = buildSearchRequestUrl({ ...baseParams, q: 'a b&c=d' })
    expect(url).toContain('q=a+b%26c%3Dd')
  })

  it.each([
    ['undefined', undefined],
    ['null', null],
  ])('omits filterResults when it is %s', (_label, value) => {
    const url = buildSearchRequestUrl({
      ...baseParams,
      filterResults: value as unknown as string,
    })
    expect(url).not.toContain('filterResults')
  })

  it('includes filterResults when set', () => {
    const url = buildSearchRequestUrl({
      ...baseParams,
      filterResults: 'some-filter',
    })
    expect(url).toContain('filterResults=some-filter')
  })

  it('formats the sort parameter', () => {
    // formatSortParameter turns "name:asc" into "name:asc"-style ML syntax
    const url = buildSearchRequestUrl({ ...baseParams, sort: 'name:asc' })
    expect(url).toContain('sort=')
  })

  it('includes rnd when present and omits it otherwise', () => {
    expect(buildSearchRequestUrl({ ...baseParams, rnd: '42' })).toContain(
      'rnd=42',
    )
    expect(buildSearchRequestUrl(baseParams)).not.toContain('rnd')
  })

  it('omits page and pageLength when not given', () => {
    const url = buildSearchRequestUrl(baseParams)
    expect(url).not.toContain('page=')
    expect(url).not.toContain('pageLength=')
  })
})
