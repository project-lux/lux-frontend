import config from '../../config/config'
import ISet from '../../types/data/ISet'

import {
  accessStatement,
  archives,
  displayName,
  primaryName,
} from './helperObjects'

export const archive: ISet = {
  id: `${config.env.dataApiBaseUrl}data/set/mock-archive`,
  type: 'Set',
  _label: 'Mock Archive',
  about: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-1`,
      type: '',
      _label: 'Mock about 1',
    },
  ],
  classified_as: archives,
  created_by: {
    id: '',
    type: 'Creation',
    carried_out_by: [
      {
        id: `${config.env.dataApiBaseUrl}data/group/mock-group`,
        type: 'Group',
        _label: 'Yale University. Library. Judaica Collection',
      },
    ],
  },
  equivalent: [
    {
      id: 'https://linked-art.library.yale.edu/node/d548b70c-7f55-497a-ad3f-d2de31836bc5',
      type: 'Set',
      _label: 'Equivalent Entity',
    },
  ],
  identified_by: [
    {
      id: '',
      type: 'Identifier',
      content: 'mssa.ms.1824',
      attributed_by: [
        {
          id: '',
          type: 'AttributeAssignment',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/group/carried-out-by`,
              type: 'Group',
              _label: 'Yale University Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
          type: 'Type',
          _label: 'Owner-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'Mock Archive',
      classified_as: primaryName,
    },
  ],
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
      type: 'type',
    },
  ],
  members_exemplified_by: [
    {
      id: '',
      type: 'HumanMadeObject',
      _label: 'Mock Archive',
      produced_by: {
        id: '',
        type: 'Production',
        timespan: {
          id: '',
          type: 'TimeSpan',
          identified_by: [
            {
              id: '',
              type: 'Name',
              content: '1623-1960',
              classified_as: displayName,
            },
          ],
          end_of_the_end: '1960-12-31T23:59:59',
          begin_of_the_begin: '1623-01-01T00:00:00',
        },
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/group/mock-group`,
            type: 'Group',
            _label: 'United States. Congress. Joint Economic Committee',
          },
        ],
        took_place_at: [
          {
            id: `${config.env.dataApiBaseUrl}data/place/mock-place`,
            type: 'Place',
          },
        ],
        technique: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
            type: 'Type',
          },
        ],
      },
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content:
        'To request items from this collection for use on site, please use the request links in the HTML version of this finding aid, available at http://hdl.handle.net/10079/fa/mssa.ms.1824',
      classified_as: accessStatement,
    },
  ],
  subject_of: [
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'HomePage Content for Item',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'HomePage for Item',
          format: 'text/html',
          access_point: [
            {
              id: 'https://archives.yale.edu/repositories/12/resources/3761',
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
    'lux:itemArchive': {
      href: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22identifier%22%3A%22http%3A%2F%2Fvocab.getty.edu%2Faat%2F300375748%22%7D%7D%2C%7B%22containing%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fobject%2F3ba2c43e-e63d-49ba-8cae-46e1af2ebe48%22%7D%7D%5D%7D`,
      _estimate: 1,
    },
  },
}
