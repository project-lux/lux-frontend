import config from '../../config/config'
import IVisualItem from '../../types/data/IVisualItem'

import { productionEventWithCarriedOutBy as mockProductionEvent } from './productionEvent'

export const visualItem: IVisualItem = {
  id: `${config.env.dataApiBaseUrl}data/visual/mock-visual-item`,
  type: 'VisualItem',
  _label: 'Mock Visual Item',
  '@context': 'https://linked.art/ns/v1/linked-art.json',
  about: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-1`,
      type: 'Type',
      _label: 'About',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'Visual Works',
    },
  ],
  created_by: {
    part: [
      {
        type: 'Creation',
        _label: 'Creation',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/carried-out-by-classified-as`,
            type: 'Type',
            _label: 'Contributor',
          },
        ],
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
            type: 'Person',
            _label: 'Mock Person',
          },
        ],
      },
    ],
    type: 'Creation',
  },
  equivalent: [
    {
      id: 'https://linked-art.library.yale.edu/equivalent/mock',
      type: 'VisualItem',
      _label: 'mock equivalent',
    },
  ],
  identified_by: [
    {
      type: 'Name',
      content: 'Mock Visual Item',
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
    {
      type: 'Name',
      content: 'Mock Visual Item Name',
      classified_as: [
        {
          id: config.aat.displayName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
  referred_to_by: [
    {
      type: 'LinguisticObject',
      content: 'Testing notes',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
          type: 'Type',
          _label: 'Mock Concept',
        },
      ],
      identified_by: [
        {
          type: 'Name',
          content: 'Mocked Notes Label',
        },
      ],
    },
  ],
  represents: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/represents`,
      type: 'concept',
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
      href: `${config.env.dataApiBaseUrl}data/visual/mock-visual-item`,
    },
  },
}
