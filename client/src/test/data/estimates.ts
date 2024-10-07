import config from '../../config/config'
import { IEstimateItems } from '../../types/ISearchEstimates'
import { ISearchResultsErrorData } from '../../types/ISearchResults'

export const objectEstimates: Record<string, IEstimateItems> = {
  objects: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Objects'],
    },
    totalItems: 803,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

const workEstimates: Record<string, IEstimateItems> = {
  works: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/work?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Works'],
    },
    totalItems: 100,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

const peopleEstimates: Record<string, IEstimateItems> = {
  people: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/agent?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Agents'],
    },
    totalItems: 20,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/agent?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/agent?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

const placeEstimates: Record<string, IEstimateItems> = {
  places: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/place?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Places'],
    },
    totalItems: 14,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/place?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/place?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

const conceptEstimates: Record<string, IEstimateItems> = {
  concepts: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/concept?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Concepts'],
    },
    totalItems: 730,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/concept?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/concept?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

const eventEstimates: Record<string, IEstimateItems> = {
  events: {
    '@context': 'https://linked.art/ns/v1/search.json',
    id: `${config.env.dataApiBaseUrl}api/search-estimate/event?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D`,
    type: 'OrderedCollection',
    label: {
      en: ['Objects'],
    },
    summary: {
      en: ['Events'],
    },
    totalItems: 1,
    first: {
      id: `${config.env.dataApiBaseUrl}api/search/event?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
    last: {
      id: `${config.env.dataApiBaseUrl}api/search/event?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=41&pageLength=20`,
      type: 'OrderedCollectionPage',
    },
  },
}

export const estimatesResults: Array<Record<string, IEstimateItems>> = [
  objectEstimates,
  workEstimates,
  peopleEstimates,
  placeEstimates,
  conceptEstimates,
  eventEstimates,
]

export const estimatesErrorResults: Array<
  Record<string, ISearchResultsErrorData>
> = [
  {
    objects: {
      errorMessage: 'string',
      statusCode: 400,
    },
  },
  { works: { errorMessage: 'string', statusCode: 400 } },
  { people: { errorMessage: 'string', statusCode: 400 } },
  { places: { errorMessage: 'string', statusCode: 400 } },
  { concepts: { errorMessage: 'string', statusCode: 400 } },
  { events: { errorMessage: 'string', statusCode: 400 } },
]

export const estimatesState = {
  fromNonResultsPage: true,
}

export const advancedSearchEstimates: Record<string, string | number> = {
  objects: 803,
  works: '-',
  people: '-',
  places: '-',
  concepts: '-',
  events: '-',
}
