/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config/config'
import { defaultConstants } from '../../config/dataConstants'
import IAgent from '../../types/data/IAgent'
import { IAgentSnippet } from '../../types/derived-data/IAgentSnippet'

const dc = defaultConstants(`${config.env.dataApiBaseUrl}`)

export const person: IAgent = {
  '@context': 'https://context',
  id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
  type: 'Person',
  _label: 'Person with a name',
  born: {
    id: '',
    type: 'Birth',
    _label: 'birth',
    timespan: {
      id: '',
      type: 'TimeSpan',
      begin_of_the_begin: '1950-03-04T00:00:00',
      end_of_the_end: '1950-12-31T23:59:59Z',
    },
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/born-place`,
        type: 'Place',
        _label: 'London',
      },
    ],
  },
  carried_out: [
    {
      id: '',
      type: 'Activity',
      _label: 'Active Dates',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/professional-activity`,
          type: 'Type',
          _label: 'Professional Activities',
          equivalent: [
            {
              id: config.aat.active,
              type: 'Type',
              _label: 'Professional Activities',
            },
          ],
        },
        {
          id: `${config.env.dataApiBaseUrl}data/concept/professional-activity-to-display`,
          type: 'Type',
          _label: 'Professional Activity',
          equivalent: [
            {
              id: 'not the aat to filter',
              type: 'Type',
              _label: 'Professional Activities',
            },
          ],
        },
      ],
      timespan: {
        id: '',
        type: 'TimeSpan',
        begin_of_the_begin: '2000-01-01T00:00:00Z',
        end_of_the_end: '2010-10-05T00:00:00Z',
      },
      took_place_at: [
        {
          id: `${config.env.dataApiBaseUrl}data/place/activity-took-place-at-1`,
          type: 'Place',
          _label: 'Berlin',
        },
        {
          id: `${config.env.dataApiBaseUrl}data/place/activity-took-place-at-2`,
          type: 'Place',
          _label: 'New York',
        },
      ],
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/gender-1`,
      type: 'Type',
      classified_as: [
        {
          id: dc.gender,
          type: 'Type',
          _label: 'gender',
          equivalent: [
            {
              id: config.aat.gender,
              type: 'Type',
              _label: 'gender',
            },
          ],
        },
      ],
      _label: 'male',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/nationality-1`,
      type: 'Type',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/nationality-label`,
          type: 'Type',
          _label: 'nationality',
          equivalent: [
            {
              id: config.aat.nationality,
              type: 'Type',
              _label: 'nationality',
            },
          ],
        },
      ],
      _label: 'American',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/nationality-2`,
      type: 'Type',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/nationality-label`,
          type: 'Type',
          _label: 'nationality',
          equivalent: [
            {
              id: config.aat.nationality,
              type: 'Type',
              _label: 'nationality',
            },
          ],
        },
      ],
      _label: 'German',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/occupation-1`,
      type: 'Type',
      classified_as: [
        {
          id: 'occupation',
          type: 'Type',
          _label: 'Occupations',
          equivalent: [
            {
              id: config.aat.occupation,
              type: 'Type',
              _label: 'occupation',
            },
          ],
        },
      ],
      _label: 'artist',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
      type: 'Type',
      _label: 'artist',
    },
  ],
  died: {
    id: '',
    type: 'Birth',
    _label: 'birth',
    timespan: {
      id: '',
      type: 'TimeSpan',
      begin_of_the_begin: '2000-05-10T00:00:00',
      end_of_the_end: '2000-12-31T23:59:59Z',
    },
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/death-place`,
        type: 'Place',
        _label: 'London',
      },
    ],
  },
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Mock Person',
      language: [
        {
          id: config.aat.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
    {
      id: '',
      type: 'Identifier',
      content: '12345',
    },
  ],
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/member-of-1`,
      type: 'concept',
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content: 'American, 1864–1946',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/biography-statement`,
          type: 'Type',
          _label: 'Display Biography',
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
  representation: [
    {
      type: 'VisualItem',
      _label: 'image',
      digitally_shown_by: [
        {
          type: 'DigitalObject',
          '@context': 'context',
          subject_to: [
            {
              type: 'Right',
              classified_as: [
                {
                  id: '',
                  type: 'Type',
                },
              ],
            },
          ],
          access_point: [
            {
              id: 'https://commons.wikimedia.org/wiki/Special:Filepath/test-image.jpg',
              type: 'DigitalObject',
            },
          ],
          referred_to_by: [
            {
              type: 'LinguisticObject',
              content: 'Image attribution',
              classified_as: [
                {
                  id: config.aat.copyrightLicensingStatement,
                  type: 'Type',
                  _label: 'Copyright/License Statement',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  residence: [
    {
      id: `${config.env.dataApiBaseUrl}data/place/residence-1`,
      type: 'place',
    },
  ],
  subject_of: [
    {
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'http://www.mock.org',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: config.aat.webPage,
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
      href: `${config.env.dataApiBaseUrl}data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83`,
    },
  },
}

export const agentData: IAgentSnippet = {
  birthYear: '1950',
  deathYear: '2000',
  name: 'Mock Person',
  nationalities: [
    `${config.env.dataApiBaseUrl}data/concept/nationality-1`,
    `${config.env.dataApiBaseUrl}data/concept/nationality-2`,
  ],
  uri: `${config.env.dataApiBaseUrl}view/person/mock-person`,
}
