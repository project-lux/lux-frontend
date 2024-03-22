import config from '../../config/config'
import { ISearchResults } from '../../types/ISearchResults'

export const relatedListResults: ISearchResults = {
  '@context': 'context',
  id: 'id',
  type: 'OrderedCollectionPage',
  orderedItems: [
    {
      value: `${config.env.dataApiBaseUrl}data/group/mock-semantic-group`,
      name: 'Co-created Works With',
      totalItems: 12,
      first: {
        id: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D%2C%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-2%22%7D%7D%5D%7D`,
        type: 'OrderedCollectionPage',
      },
      id: '',
      type: 'OrderedCollection',
    },
    {
      value: `${config.env.dataApiBaseUrl}data/group/mock-semantic-group`,
      name: 'Co-created Files With',
      totalItems: 11,
      first: {
        id: `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22AND%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D%2C%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fgroup%2Fmock-group%22%7D%7D%5D%7D`,
        type: 'OrderedCollectionPage',
      },
      id: '',
      type: 'OrderedCollection',
    },
  ],
  next: {
    id: 'next id',
    type: '',
  },
}
