import config from '../../config/config'
import { IEstimateItems } from '../../types/ISearchEstimates'
import { ISearchResults } from '../../types/ISearchResults'

export const searchEstimate = (total: number): IEstimateItems => ({
  '@context': `${config.env.dataApiBaseUrl}api/search/1.0/context.json`,
  id: `${config.env.dataApiBaseUrl}api/search-estimate/item?q=theQuery`,
  type: 'OrderedCollection',
  label: {
    en: ['entity type'],
  },
  summary: {
    en: ['Summary of the results page'],
  },
  totalItems: total,
  first: {
    id: `${config.env.dataApiBaseUrl}api/search/?q=theQuery`,
    type: 'OrderedCollectionPage',
  },
  last: {
    id: `${config.env.dataApiBaseUrl}api/search/?q=theQuery`,
    type: 'OrderedCollectionPage',
  },
  partOf: `${config.env.dataApiBaseUrl}api/search-estimate/item?q=theQuery`,
})

export const errorsResults: { statusCode: number; errorMessage: string } = {
  statusCode: 400,
  errorMessage: 'Error message that should display in the alert.',
}

export const activityStreams = (
  endpoint: string,
  total: number,
): ISearchResults => ({
  '@context': `${config.env.dataApiBaseUrl}api/search/1.0/context.json`,
  id: `${config.env.dataApiBaseUrl}api/search/?q=%22%7B%5C%22AND%5C%22%3A%5B%7B%5C%22text%5C%22%3A%5C%22andy%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%2C%7B%5C%22text%5C%22%3A%5C%22warhol%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%5D%7D%22&page=1&pageLength=20`,
  type: 'OrderedCollectionPage',
  partOf: [
    {
      id: `${config.env.dataApiBaseUrl}api/search-estimate/item?q=%22%7B%5C%22AND%5C%22%3A%5B%7B%5C%22text%5C%22%3A%5C%22andy%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%2C%7B%5C%22text%5C%22%3A%5C%22warhol%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%5D%7D%22`,
      type: 'OrderedCollection',
      label: {
        en: ['Objects'],
      },
      summary: {
        en: [
          'Records representing physical and digital objects that match your search.',
        ],
      },
      totalItems: total,
      partOf: [
        {
          id: `${config.env.dataApiBaseUrl}api/search-estimate/item?q=%22%7B%5C%22AND%5C%22%3A%5B%7B%5C%22text%5C%22%3A%5C%22andy%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%2C%7B%5C%22text%5C%22%3A%5C%22warhol%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%5D%7D%22`,
          type: 'Collection',
        },
      ],
    },
  ],
  orderedItems: [
    {
      id: `${config.env.dataApiBaseUrl}${endpoint}`,
      type: 'Test',
    },
  ],
  next: {
    id: `${config.env.dataApiBaseUrl}api/search/?q=%22%7B%5C%22AND%5C%22%3A%5B%7B%5C%22text%5C%22%3A%5C%22andy%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%2C%7B%5C%22text%5C%22%3A%5C%22warhol%5C%22%2C%5C%22_lang%5C%22%3A%5C%22en%5C%22%7D%5D%7D%22&page=2&pageLength=20`,
    type: 'OrderedCollectionPage',
  },
})
