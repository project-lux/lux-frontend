import config from '../../config/config'
import { ISearchResults } from '../../types/ISearchResults'

export const facets: ISearchResults = {
  '@context': 'context',
  id: 'id',
  type: 'OrderedCollectionPage',
  orderedItems: [
    {
      id: '',
      type: 'OrderedCollection',
      totalItems: 1,
      value: `${config.env.dataApiBaseUrl}data/group/d07b9b86-0a1e-4026-aa4c-8ecba8bbd9c9`,
      first: {
        id: 'search endpoint',
        type: 'OrderedCollectionPage',
      },
    },
  ],
}
