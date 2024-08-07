import config from '../../config/config'
import { ISearchResults } from '../../types/ISearchResults'

export const types = (id: string): ISearchResults => ({
  '@context': 'context',
  id,
  type: 'OrderedCollectionPage',
  orderedItems: [
    {
      id: 'id',
      type: 'OrderedCollection',
      value: `${config.env.dataApiBaseUrl}data/concept/mock-facet-concept`,
      totalItems: 217,
    },
  ],
  partOf: {
    id: '',
    type: 'OrderedCollection',
    totalItems: 1,
  },
})
