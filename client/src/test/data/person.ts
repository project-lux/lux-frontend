import config from '../../config/config'
import IAgent from '../../types/data/IAgent'
import { IAgentSnippet } from '../../types/derived-data/IAgentSnippet'

import {
  copyrightStatement,
  englishLanguage,
  gender,
  nationality,
  occupation,
  primaryName,
  professionalActivity,
  webPage,
} from './helperObjects'

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
        ...professionalActivity,
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
      _label: 'male',
      classified_as: gender,
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/nationality-1`,
      type: 'Type',
      _label: 'American',
      classified_as: nationality,
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/nationality-2`,
      type: 'Type',
      _label: 'German',
      classified_as: nationality,
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/occupation-1`,
      type: 'Type',
      _label: 'artist',
      classified_as: occupation,
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
      language: englishLanguage,
      classified_as: primaryName,
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
              classified_as: copyrightStatement,
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
          classified_as: webPage,
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
