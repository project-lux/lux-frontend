import config from '../../config/config'
import ISet from '../../types/data/ISet'

import { collections, displayName, primaryName } from './helperObjects'
import { productionEventWithCarriedOutBy as mockProductionEvent } from './productionEvent'

export const collection: ISet = {
  id: `${config.env.dataApiBaseUrl}data/set/mock-collection`,
  type: 'Set',
  _label: 'Haas Arts Library, Yale University Library',
  '@context': 'https://linked.art/ns/v1/linked-art.json',
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/member-of-1`,
      type: 'Set',
      _label: 'Mock Member Of',
    },
  ],
  classified_as: collections,
  identified_by: [
    {
      type: 'Name',
      content: 'Mock Collection',
      classified_as: primaryName,
    },
    {
      type: 'Name',
      content: 'Mock Collection Display Name',
      classified_as: displayName,
    },
  ],
  used_for: [mockProductionEvent],
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
      href: `${config.env.dataApiBaseUrl}data/set/68743654-fee9-47d2-bceb-94a8bbe3677c`,
    },
  },
}
