import config from '../../config/config'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { ITransformedData } from '../../types/ITimelines'

export const productionDateCriteria = {
  producedBy: {
    id: `${config.env.dataApiBaseUrl}data/person/mock-person-1`,
  },
}

const defaultOrderedCollection = {
  id: `${config.env.dataApiBaseUrl}api/search-estimate/work?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D`,
  type: 'OrderedCollection',
}

export const itemProductionDateFacets: Array<IOrderedItems> = [
  {
    ...defaultOrderedCollection,
    value: '1983-01-01T00:00:00Z',
    totalItems: 22,
  },
  { ...defaultOrderedCollection, value: '1981-01-01T00:00:00Z', totalItems: 8 },
  { ...defaultOrderedCollection, value: '1987-01-01T00:00:00Z', totalItems: 2 },
]

const workCreationDateFacets: Array<IOrderedItems> = [
  { ...defaultOrderedCollection, value: '1977-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1974-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1985-01-01T00:00:00Z', totalItems: 1 },
]

const workPublicationDateFacets: Array<IOrderedItems> = [
  { ...defaultOrderedCollection, value: '1985-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1986-01-01T00:00:00Z', totalItems: 1 },
]

export const timelineResults: Array<{ [key: string]: ISearchResults }> = [
  {
    'https://endpoint.yale.edu/api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D&name=itemProductionDate':
      {
        '@context': 'test',
        id: 'https://endpoint.yale.edu/api/search-estimate/work?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
        type: 'OrderedCollectionPage',
        orderedItems: itemProductionDateFacets,
        next: {
          id: 'id',
          type: 'OrderedCollectionPage',
        },
      },
  },
  {
    'https://endpoint.yale.edu/api/facets/work?q=%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%5D%7D&name=workCreationDate':
      {
        '@context': 'test',
        id: 'https://endpoint.yale.edu/api/search-estimate/work?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
        type: 'OrderedCollectionPage',
        orderedItems: workCreationDateFacets,
        next: {
          id: 'id',
          type: 'OrderedCollectionPage',
        },
      },
  },
  {
    'https://endpoint.yale.edu/api/facets/work?q=%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%5D%7D&name=workPublicationDate':
      {
        '@context': 'test',
        id: 'https://endpoint.yale.edu/api/search-estimate/work?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
        type: 'OrderedCollectionPage',
        orderedItems: workPublicationDateFacets,
        next: {
          id: 'id',
          type: 'OrderedCollectionPage',
        },
      },
  },
]

export const itemProductionDateFacetsTransformed: Array<ITransformedData> = [
  {
    value: '1983',
    totalItems: 22,
    searchTag: 'itemProductionDate',
    id: '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
  },
  {
    value: '1981',
    totalItems: 8,
    searchTag: 'itemProductionDate',
    id: '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
  },
  {
    value: '1987',
    totalItems: 2,
    searchTag: 'itemProductionDate',
    id: '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformedTimelineFacets: any = {
  '1974': {
    total: 2,
    workCreationDate: {
      totalItems: 2,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1977': {
    total: 2,
    workCreationDate: {
      totalItems: 2,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1981': {
    total: 8,
    itemProductionDate: {
      totalItems: 8,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1983': {
    total: 22,
    itemProductionDate: {
      totalItems: 22,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1985': {
    total: 3,
    workCreationDate: {
      totalItems: 1,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
    workPublicationDate: {
      totalItems: 2,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1986': {
    total: 1,
    workPublicationDate: {
      totalItems: 1,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
  '1987': {
    total: 2,
    itemProductionDate: {
      totalItems: 2,
      searchParams:
        '?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F66049111-383e-4526-9632-2e9b6b6302dd%22%7D%7D%5D%7D%2C%7B%22AND%22%3A%5B%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3E%3D%22%7D%2C%7B%22createdDate%22%3A%221962-01-01T00%3A00%3A00.000Z%22%2C%22_comp%22%3A%22%3C%3D%22%7D%5D%7D%5D%7D',
    },
  },
}
