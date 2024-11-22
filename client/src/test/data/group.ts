import config from '../../config/config'
import IAgent from '../../types/data/IAgent'

import {
  dutchLanguage,
  englishLanguage,
  frenchLanguage,
  primaryName,
  webPage,
} from './helperObjects'

export const group: IAgent = {
  id: `${config.env.dataApiBaseUrl}data/group/mock-group`,
  type: 'Group',
  _label: 'Mock Group',
  carried_out: [
    {
      id: '',
      type: 'Activity',
      _label: 'Active Dates',
      timespan: {
        id: '',
        type: 'TimeSpan',
        begin_of_the_begin: '2000-01-01T00:00:00Z',
        end_of_the_end: '2010-10-05T00:00:00Z',
      },
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'museums (institutions)',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1-label`,
          type: 'Type',
          _label: 'Occupation',
        },
      ],
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-2`,
      type: 'Type',
      _label: 'American (North American)',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-3`,
      type: 'Type',
      _label: 'Organization',
    },
  ],
  dissolved_by: {
    id: '',
    type: 'Dissolution',
    timespan: {
      id: '',
      type: 'TimeSpan',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: '1994-05-13',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
      end_of_the_end: '1994-05-13T23:59:59Z',
      begin_of_the_begin: '1994-05-13T00:00:00Z',
    },
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/mock-dissolution-place`,
        type: 'Place',
        _label: 'Pittsburgh, Pa.',
      },
    ],
    carried_out_by: [
      {
        id: `${config.env.dataApiBaseUrl}data/person/mock-dissolution-person`,
        type: 'Place',
        _label: 'Paul Mellon',
      },
    ],
  },
  equivalent: [
    {
      id: 'http://id.loc.gov/authorities/names/1234',
      type: 'Group',
      _label: 'Mock Group',
    },
  ],
  formed_by: {
    id: '',
    type: 'Formation',
    timespan: {
      id: '',
      type: 'TimeSpan',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: '1990-04-10',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
      end_of_the_end: '1990-04-10T23:59:59Z',
      begin_of_the_begin: '1990-04-10T00:00:00Z',
    },
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/mock-formation-place`,
        type: 'Place',
        _label: 'New Haven, CT',
      },
    ],
    carried_out_by: [
      {
        id: `${config.env.dataApiBaseUrl}data/person/mock-formed-by-person`,
        type: 'Place',
        _label: 'Paul Mellon',
      },
    ],
  },
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Mock Group',
      language: [...englishLanguage, ...frenchLanguage, ...dutchLanguage],
      classified_as: primaryName,
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
      content: 'American museum, Pittsburgh, contemporary',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/biography-statement`,
          type: 'Type',
          _label: 'Biography Statement',
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
    {
      id: '',
      type: 'LinguisticObject',
      content: 'In Pittsburgh, Penn.',
      language: englishLanguage,
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/description`,
          type: 'Type',
          _label: 'Description',
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
    {
      id: '',
      type: 'LinguisticObject',
      content: 'Pittsburgh, Pa',
      language: frenchLanguage,
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/description`,
          type: 'Type',
          _label: 'Description',
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
      id: '',
      type: 'VisualItem',
      _label: 'Wikidata Image',
      digitally_shown_by: [
        {
          id: '',
          type: 'DigitalObject',
          access_point: [
            {
              id: 'https://commons.wikimedia.org/wiki/Special:Filepath/Andy_Warhol_Museum,_Pittsburgh,_2015-06-17,_01.jpg',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/digital-image`,
              type: 'Type',
              _label: 'Digital Image',
            },
          ],
        },
      ],
    },
  ],
  residence: [
    {
      id: `${config.env.dataApiBaseUrl}data/place/mock-place`,
      type: 'Place',
      _label: 'Pittsburgh, Pa.',
    },
  ],
  subject_of: [
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'http://www.mock.org/',
              type: 'DigitalObject',
            },
          ],
          classified_as: webPage,
        },
      ],
    },
  ],
}
