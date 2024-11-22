import config from '../../config/config'
import IObject from '../../types/data/IObject'

import {
  displayName,
  englishLanguage,
  imprintStatement,
  languageStatement,
  primaryName,
} from './helperObjects'
import { productionEventWithCarriedOutBy as mockProductionEvent } from './productionEvent'

export const linguisticObject: IObject = {
  id: `${config.env.dataApiBaseUrl}data/text/mock-linguistic-object`,
  type: 'LinguisticObject',
  _label: 'Economic indicators [electronic resource]',
  about: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-1`,
      type: 'Type',
      _label: 'About 1',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-2`,
      type: 'Type',
      _label: 'About 2',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'Journals and Periodicals',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/type-of-work`,
          type: 'Type',
          _label: 'Type of Work',
        },
      ],
    },
  ],
  created_by: {
    id: '',
    part: [
      {
        id: '',
        type: 'Creation',
        _label: 'Creation',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/created-by-classified-as-1`,
            type: 'Type',
            _label: 'Contributor',
          },
        ],
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/group/created-by-carried-out-by-1`,
            type: 'Group',
            _label: 'United States. Congress. Joint Economic Committee 2',
          },
        ],
      },
      {
        id: '',
        type: 'Creation',
        _label: 'Creation',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/created-by-classified-as-2`,
            type: 'Type',
            _label: 'Contributor',
          },
        ],
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/group/created-by-carried-out-by-2`,
            type: 'Group',
            _label: 'Council of Economic Advisers (U.S.)',
          },
        ],
      },
    ],
    timespan: {
      id: '',
      type: 'TimeSpan',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: '2009-01-01',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
      end_of_the_end: '2009-12-31T23:59:59Z',
      begin_of_the_begin: '2009-01-01T00:00:00Z',
    },
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/mock-place-entity`,
        type: 'Place',
      },
    ],
    technique: [
      {
        id: `${config.env.dataApiBaseUrl}data/concept/created-by-technique-1`,
        type: 'Type',
      },
    ],
    type: 'Creation',
  },
  digitally_carried_by: [
    {
      id: `${config.env.dataApiBaseUrl}data/digital/44f29095-39bb-4dcd-8048-dec90bc2b144`,
      type: 'DigitalObject',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: 'Online resource',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
    },
  ],
  equivalent: [
    {
      id: 'https://linked-art.library.yale.edu/node/bb17d497-2373-4ab6-a7b7-bdff25a2fec5',
      type: 'LinguisticObject',
      _label: 'Equivalent Entity',
    },
  ],
  identified_by: [
    {
      id: '',
      type: 'Identifier',
      content: 'ils:yul:11519799',
      attributed_by: [
        {
          id: '',
          type: 'AttributeAssignment',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/group/attributed-by-carried-out-by`,
              type: 'Group',
              _label: 'Yale University Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/system-assigned-number`,
          type: 'Type',
          _label: 'System-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'Mock Work',
      classified_as: primaryName,
    },
    {
      id: '',
      type: 'Name',
      content: 'Mock Work Display Name',
      classified_as: displayName,
    },
  ],
  language: englishLanguage,
  part_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/part-of`,
      type: 'concept',
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content: 'Access is available to the Yale community.',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/note`,
          type: 'Type',
          _label: 'Note',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/brief-text`,
              type: 'Type',
              _label: 'Brief Text',
            },
          ],
        },
      ],
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: 'Local Note',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      content: 'This is in english',
      classified_as: languageStatement,
    },
    {
      id: '',
      type: 'LinguisticObject',
      content: 'This is an imprint statement',
      classified_as: imprintStatement,
    },
  ],
  represents: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/represents`,
      type: 'concept',
    },
  ],
  subject_of: [
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'Text of Repository Page',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Repository Page',
          access_point: [
            {
              id: 'https://search.library.yale.edu/catalog/11519799',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/2eca07bd-be42-4ef5-9ec5-87c1bbfe639d`,
              type: 'Type',
              _label: 'Web Page',
            },
          ],
        },
      ],
    },
  ],
  subject_to: [
    {
      type: 'right',
      _label: 'copyright',
      classified_as: [
        {
          id: 'https://creativecommons.org/publicdomain/zero/1.0/',
          type: 'type',
        },
      ],
      identified_by: [
        {
          type: 'name',
          content: 'Public Domain',
        },
      ],
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
      href: `${config.env.dataApiBaseUrl}data/object/3ba2c43e-e63d-49ba-8cae-46e1af2ebe48`,
    },
    'lux:workCarriedBy': {
      href: `${config.env.dataApiBaseUrl}api/search/agent?q=workCarriedByMockHalLink`,
      _estimate: 1,
    },
  },
}
