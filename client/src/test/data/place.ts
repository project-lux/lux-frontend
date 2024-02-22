import config from '../../config/config'
import IPlace from '../../types/data/IPlace'

export const place: IPlace = {
  id: `${config.env.dataApiBaseUrl}data/place/mock-place`,
  type: 'Place',
  _label: 'Pittsburg',

  '@context': 'https://linked.art/ns/v1/linked-art.json',
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'cities',
    },
  ],
  defined_by:
    'POLYGON ((-80.09551 40.36157, -79.86579 40.36157, -79.86579 40.50104, -80.09551 40.50104, -80.09551 40.36157))',
  equivalent: [
    {
      id: 'https://linked-art.library.yale.edu/node/b968c561-86ff-49e0-8ab3-db456e365e46',
      type: 'Place',
      _label: 'Pittsburgh (Pa.)',
    },
  ],
  identified_by: [
    {
      type: 'Name',
      content: 'Pittsburgh',
      language: [
        {
          id: config.dc.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
      classified_as: [
        {
          id: config.dc.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
  part_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/place/mock-place-parent-entity`,
      type: 'Place',
      _label: 'Pennsylvania',
    },
  ],
  referred_to_by: [
    {
      type: 'LinguisticObject',
      content: 'Mock place notes content',
      language: [
        {
          id: config.dc.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/description-statement`,
          type: 'Type',
          _label: 'Description',
        },
      ],
    },
  ],
  representation: [],
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
              id: 'https://testing.com/',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: config.dc.webPage,
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
      href: `${config.env.dataApiBaseUrl}data/place/mock-place`,
    },
  },
}

export const placeParent: IPlace = {
  id: `${config.env.dataApiBaseUrl}data/place/mock-place-parent-entity`,
  type: 'Place',
  _label: 'Pittsburg',
  '@context': 'https://linked.art/ns/v1/linked-art.json',
  defined_by:
    'POLYGON ((-80.09551 40.36157, -79.86579 40.36157, -79.86579 40.50104, -80.09551 40.50104, -80.09551 40.36157))',
  identified_by: [
    {
      type: 'Name',
      content: 'Pennsylvania',
      language: [
        {
          id: config.dc.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
      classified_as: [
        {
          id: config.dc.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
}
