import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

import { primaryName } from './helperObjects'

export const personLinks: IEntity = {
  '@context': 'https://context',
  id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
  type: 'Person',
  _label: 'Person with a name',
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Mock Entity',
      classified_as: primaryName,
    },
  ],
  _links: {
    curies: [
      {
        name: 'la',
        href: 'https://linked.art/api/1.0/rels/{rel}',
        templated: true,
      },
      {
        name: 'lux',
        href: `${config.env.dataApiBaseUrl}api/rels/{rel}`,
        templated: true,
      },
    ],
    self: {
      href: `${config.env.dataApiBaseUrl}data/person/mock-person`,
    },
    // related objects/works
    'lux:agentMadeDiscoveredInfluencedItem': {
      href: `${config.env.dataApiBaseUrl}api/search/item?q=agentMadeDiscoveredInfluencedItem`,
      _estimate: 1,
    },
    'lux:agentCreatedPublishedInfluencedWork': {
      href: `${config.env.dataApiBaseUrl}api/search/work?q=agentCreatedPublishedInfluencedWork`,
      _estimate: 1,
    },
    // timeline
    'lux:agentItemMadeTime': {
      href: `${config.env.dataApiBaseUrl}api/facets/item?q=agentItemMadeTime`,
      _estimate: 1,
    },
    'lux:agentWorkCreatedTime': {
      href: `${config.env.dataApiBaseUrl}api/facets/work?q=agentWorkCreatedTime`,
      _estimate: 1,
    },
    // Related accordions
    'lux:agentInfluencedConcepts': {
      href: `${config.env.dataApiBaseUrl}api/search/concept?q=agentInfluencedConcepts`,
      _estimate: 1,
    },
    'lux:agentRelatedAgents': {
      href: `${config.env.dataApiBaseUrl}api/related-list/agent?&name=relatedToAgent&uri=mockEntityUri`,
      _estimate: 1,
    },
    'lux:agentRelatedItemTypes': {
      href: `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D&name=itemTypeId`,
      _estimate: 1,
    },
  },
}
