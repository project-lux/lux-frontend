/* eslint-disable import/prefer-default-export */
import config from '../../config/config'
import ISet from '../../types/data/ISet'

import { productionEvent as mockProductionEvent } from './productionEvent'

export const set: ISet = {
  id: `${config.env.dataApiBaseUrl}data/set/mock-set`,
  type: 'Set',
  _label: 'Mock Set',
  about: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-1`,
      type: '',
      _label: 'Mock about 1',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'Archival and Manuscript Material',
    },
    {
      id: config.dc.archive,
      type: 'Type',
      _label: 'Archival and Manuscript Material',
    },
  ],
  created_by: {
    id: '',
    type: 'Creation',
    carried_out_by: [
      {
        id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
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
              id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
              type: 'Group',
              _label: 'Yale University Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
          type: 'Type',
          _label: 'Owner-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'Mock Set',
      classified_as: [
        {
          id: config.dc.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
  members_exemplified_by: [
    {
      id: '',
      type: 'HumanMadeObject',
      _label: 'Mock Set',
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
              classified_as: [
                {
                  id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
                  type: 'Type',
                  _label: 'Display Title',
                },
              ],
            },
          ],
          end_of_the_end: '1960-12-31T23:59:59',
          begin_of_the_begin: '1623-01-01T00:00:00',
        },
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
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
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/set-member-of-1`,
      type: 'Set',
      _label: 'Manuscripts and Archives',
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content:
        'To request items from this collection for use on site, please use the request links in the HTML version of this finding aid, available at http://hdl.handle.net/10079/fa/mssa.ms.1824',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/03f4eb19-0611-4f31-8e09-fc111c52f898`,
          type: 'Type',
          _label: 'Access Statement',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/brief-text`,
              type: 'Type',
              _label: 'Brief Text',
            },
          ],
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
      href: `${config.env.dataApiBaseUrl}data/set/mock-set`,
    },
  },
}
