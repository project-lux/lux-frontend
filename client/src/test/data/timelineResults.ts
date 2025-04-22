import config from '../../config/config'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { ITransformedData } from '../../types/ITimelines'

export const productionDateCriteria = {
  producedBy: {
    id: `${config.env.dataApiBaseUrl}data/person/mock-person-1`,
  },
}

const workDateCriteria = {
  OR: [
    {
      createdBy: {
        id: `${config.env.dataApiBaseUrl}data/person/mock-person-1`,
      },
    },
    {
      publishedBy: {
        id: `${config.env.dataApiBaseUrl}data/person/mock-person-1`,
      },
    },
  ],
}

const defaultOrderedCollection = {
  id: '',
  type: 'OrderedCollection',
}

export const itemProductionDateFacets: Array<IOrderedItems> = [
  {
    ...defaultOrderedCollection,
    value: '1983-01-01T00:00:00Z',
    totalItems: 22,
  },
  {
    ...defaultOrderedCollection,
    value: '1980-01-01T00:00:00Z',
    totalItems: 19,
  },
  {
    ...defaultOrderedCollection,
    value: '1977-01-01T00:00:00Z',
    totalItems: 18,
  },
  {
    ...defaultOrderedCollection,
    value: '1974-01-01T00:00:00Z',
    totalItems: 17,
  },
  {
    ...defaultOrderedCollection,
    value: '1982-01-01T00:00:00Z',
    totalItems: 15,
  },
  {
    ...defaultOrderedCollection,
    value: '1976-01-01T00:00:00Z',
    totalItems: 12,
  },
  {
    ...defaultOrderedCollection,
    value: '1985-01-01T00:00:00Z',
    totalItems: 12,
  },
  {
    ...defaultOrderedCollection,
    value: '1986-01-01T00:00:00Z',
    totalItems: 12,
  },
  {
    ...defaultOrderedCollection,
    value: '1971-01-01T00:00:00Z',
    totalItems: 11,
  },
  {
    ...defaultOrderedCollection,
    value: '1972-01-01T00:00:00Z',
    totalItems: 10,
  },
  {
    ...defaultOrderedCollection,
    value: '1984-01-01T00:00:00Z',
    totalItems: 10,
  },
  { ...defaultOrderedCollection, value: '1981-01-01T00:00:00Z', totalItems: 8 },
  { ...defaultOrderedCollection, value: '1979-01-01T00:00:00Z', totalItems: 4 },
  { ...defaultOrderedCollection, value: '1964-01-01T00:00:00Z', totalItems: 3 },
  { ...defaultOrderedCollection, value: '1968-01-01T00:00:00Z', totalItems: 3 },
  { ...defaultOrderedCollection, value: '1958-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1967-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1978-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1987-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1945-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1959-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1966-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1973-01-01T00:00:00', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1998-01-01T00:00:00Z', totalItems: 1 },
]

const workCreationDateFacets: Array<IOrderedItems> = [
  { ...defaultOrderedCollection, value: '1983-01-01T00:00:00Z', totalItems: 5 },
  { ...defaultOrderedCollection, value: '1980-01-01T00:00:00Z', totalItems: 3 },
  { ...defaultOrderedCollection, value: '1977-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1974-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1982-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1976-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1985-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1986-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1971-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1972-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1984-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1981-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1979-01-01T00:00:00Z', totalItems: 1 },
]

const workPublicationDateFacets: Array<IOrderedItems> = [
  { ...defaultOrderedCollection, value: '1982-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1976-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1985-01-01T00:00:00Z', totalItems: 2 },
  { ...defaultOrderedCollection, value: '1986-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1971-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1972-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1984-01-01T00:00:00Z', totalItems: 1 },
  { ...defaultOrderedCollection, value: '1981-01-01T00:00:00Z', totalItems: 1 },
]

export const timelineResults: Array<{ [key: string]: ISearchResults }> = [
  {
    'https://endpoint.yale.edu/api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D&name=itemProductionDate':
      {
        '@context': 'test',
        id: 'uri',
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
        id: 'uri',
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
        id: 'uri',
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
    id: 'productionDateCriteria',
  },
  {
    value: '1980',
    totalItems: 19,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1977',
    totalItems: 18,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1974',
    totalItems: 17,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1982',
    totalItems: 15,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1976',
    totalItems: 12,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1985',
    totalItems: 12,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1986',
    totalItems: 12,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1971',
    totalItems: 11,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1972',
    totalItems: 10,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1984',
    totalItems: 10,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1981',
    totalItems: 8,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1979',
    totalItems: 4,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1964',
    totalItems: 3,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1968',
    totalItems: 3,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1958',
    totalItems: 2,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1967',
    totalItems: 2,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1978',
    totalItems: 2,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1987',
    totalItems: 2,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1945',
    totalItems: 1,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1959',
    totalItems: 1,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1966',
    totalItems: 1,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1973',
    totalItems: 1,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
  {
    value: '1998',
    totalItems: 1,
    searchTag: 'itemProductionDate',
    id: 'productionDateCriteria',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformedTimelineFacets: any = {
  '1945': {
    total: 1,
    itemProductionDate: { totalItems: 1, id: 'productionDateCriteria' },
  },
  '1958': {
    total: 2,
    itemProductionDate: { totalItems: 2, id: 'productionDateCriteria' },
  },
  '1959': {
    total: 1,
    itemProductionDate: { totalItems: 1, id: 'productionDateCriteria' },
  },
  '1964': {
    total: 3,
    itemProductionDate: { totalItems: 3, id: 'productionDateCriteria' },
  },
  '1966': {
    total: 1,
    itemProductionDate: { totalItems: 1, id: 'productionDateCriteria' },
  },
  '1967': {
    total: 2,
    itemProductionDate: { totalItems: 2, id: 'productionDateCriteria' },
  },
  '1968': {
    total: 3,
    itemProductionDate: { totalItems: 3, id: 'productionDateCriteria' },
  },
  '1971': {
    total: 13,
    itemProductionDate: { totalItems: 11, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1972': {
    total: 12,
    itemProductionDate: { totalItems: 10, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1973': {
    total: 1,
    itemProductionDate: { totalItems: 1, id: 'productionDateCriteria' },
  },
  '1974': {
    total: 19,
    itemProductionDate: { totalItems: 17, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 2, id: workDateCriteria },
  },
  '1976': {
    total: 16,
    itemProductionDate: { totalItems: 12, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 2, id: workDateCriteria },
    workPublicationDate: { totalItems: 2, id: workDateCriteria },
  },
  '1977': {
    total: 20,
    itemProductionDate: { totalItems: 18, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 2, id: workDateCriteria },
  },
  '1978': {
    total: 2,
    itemProductionDate: { totalItems: 2, id: 'productionDateCriteria' },
  },
  '1979': {
    total: 5,
    itemProductionDate: { totalItems: 4, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1980': {
    total: 22,
    itemProductionDate: { totalItems: 19, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 3, id: workDateCriteria },
  },
  '1981': {
    total: 10,
    itemProductionDate: { totalItems: 8, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1982': {
    total: 19,
    itemProductionDate: { totalItems: 15, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 2, id: workDateCriteria },
    workPublicationDate: { totalItems: 2, id: workDateCriteria },
  },
  '1983': {
    total: 27,
    itemProductionDate: { totalItems: 22, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 5, id: workDateCriteria },
  },
  '1984': {
    total: 12,
    itemProductionDate: { totalItems: 10, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1985': {
    total: 15,
    itemProductionDate: { totalItems: 12, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 2, id: workDateCriteria },
  },
  '1986': {
    total: 14,
    itemProductionDate: { totalItems: 12, id: 'productionDateCriteria' },
    workCreationDate: { totalItems: 1, id: workDateCriteria },
    workPublicationDate: { totalItems: 1, id: workDateCriteria },
  },
  '1987': {
    total: 2,
    itemProductionDate: { totalItems: 2, id: 'productionDateCriteria' },
  },
  '1998': {
    total: 1,
    itemProductionDate: { totalItems: 1, id: 'productionDateCriteria' },
  },
}
