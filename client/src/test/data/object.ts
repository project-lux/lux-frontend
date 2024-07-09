import config from '../../config/config'
import IObject from '../../types/data/IObject'

// eslint-disable-next-line import/prefer-default-export
export const physicalObject: IObject = {
  id: `${config.env.dataApiBaseUrl}data/object/mock-object`,
  type: 'HumanMadeObject',
  '@context': 'https://linked.art/ns/v1/data.json',
  _label: 'Test Object',
  access_point: [
    {
      id: 'https://yale.test.org/test?URL=testing.com',
      type: 'DigitalObject',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: 'Online dataset',
          classified_as: [
            {
              id: 'http://vocab.getty.edu/aat/300404669',
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
    },
  ],
  carries: [
    {
      id: `${config.env.dataApiBaseUrl}data/text/original-work-2`,
      type: 'LinguisticObject',
      _label: 'Original Work 2',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'photographs',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/type`,
          type: 'Type',
          _label: 'Type of Work',
        },
      ],
    },
  ],
  current_location: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/current-location-unit-1`,
      type: 'Set',
      _label: 'Unit',
    },
  ],
  digitally_carries: [
    {
      id: `${config.env.dataApiBaseUrl}data/text/carries`,
      type: 'LinguisticObject',
      _label: 'Digitally Carries',
    },
  ],
  digitally_shows: [
    {
      id: `${config.env.dataApiBaseUrl}data/text/shows`,
      type: 'LinguisticObject',
      _label: 'Digitally Shows',
    },
  ],
  dimension: [
    {
      type: 'Dimension',
      unit: {
        id: `${config.env.dataApiBaseUrl}data/concept/unit-1`,
        type: 'MeasurementUnit',
        _label: 'cm',
      },
      value: 90.25,
      assigned_by: [
        {
          type: 'AttributeAssignment',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/assigned-by-classified-as-1`,
              type: 'Type',
              _label: 'sheet',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/dimension-classified-as-1`,
          type: 'Type',
          _label: 'height',
        },
      ],
    },
    {
      type: 'Dimension',
      unit: {
        id: `${config.env.dataApiBaseUrl}data/concept/unit-2`,
        type: 'MeasurementUnit',
        _label: 'cm',
      },
      value: 91.44,
      assigned_by: [
        {
          type: 'AttributeAssignment',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/assigned-by-classified-as-2`,
              type: 'Type',
              _label: 'sheet',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/dimension-classified-as-2`,
          type: 'Type',
          _label: 'width',
        },
      ],
    },
    {
      type: 'Dimension',
      unit: {
        id: `${config.env.dataApiBaseUrl}data/concept/unit-3`,
        type: 'MeasurementUnit',
        _label: 'cm',
      },
      value: 100,
      assigned_by: [
        {
          type: 'AttributeAssignment',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/assigned-by-classified-as-3`,
              type: 'Type',
              _label: 'sheet',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/dimension-classified-as-3`,
          type: 'Type',
          _label: 'width',
          equivalent: [
            {
              id: config.aat.typeOfPart,
              type: 'Type',
              _label: 'width',
            },
          ],
        },
      ],
    },
  ],
  encountered_by: [
    {
      id: '',
      type: 'Encounter',
      _label: 'Collecting Event',
      timespan: {
        id: '',
        type: 'TimeSpan',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: '1891',
          },
        ],
        end_of_the_end: '1891-12-31T23:59:59Z',
        begin_of_the_begin: '1891-01-01T00:00:00Z',
      },
      took_place_at: [
        {
          id: `${config.env.dataApiBaseUrl}data/place/encounter-took-place-at`,
          type: 'Place',
          _label:
            'North America. USA. Wyoming. Niobrara County. Lightning Creek. ceratopsian locality 19, near top of bluff on the north side of Lightning Creek, about 2 miles southeast of the mouth, in the bottom and near the extreme head of a small, dry watercourse.',
        },
      ],
      carried_out_by: [
        {
          id: `${config.env.dataApiBaseUrl}data/person/encounter-carried-out-by`,
          type: 'Person',
          _label: 'Collector',
        },
      ],
    },
  ],
  equivalent: [
    {
      id: 'https://media.art.yale.edu/content/test.json',
      type: 'HumanMadeObject',
      _label: 'label',
    },
    {
      id: 'http://www.wikidata.org/entity/externalSource',
      type: 'HumanMadeObject',
      _label: 'label',
    },
  ],
  identified_by: [
    {
      type: 'Identifier',
      content: 'Mock Call Number',
      classified_as: [
        {
          id: config.aat.callNumber,
          type: 'Type',
          _label: 'Call Number',
        },
      ],
    },
    {
      type: 'Name',
      content: 'Mock Object',
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary',
        },
      ],
    },
    {
      type: 'Name',
      content: 'Object that is mocked',
      classified_as: [
        {
          id: config.aat.displayName,
          type: 'Type',
          _label: 'Primary',
        },
      ],
      language: [
        {
          id: config.aat.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
    },
  ],
  made_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/made-of-1`,
      type: 'Material',
    },
  ],
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
      type: 'Set',
      _label: 'Collection 1',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
      type: 'Set',
      _label: 'Collection 2',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/set/member-of-unit-1`,
      type: 'Set',
      _label: 'Unit 1',
    },
  ],
  part_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/object/part-of-1`,
      type: 'object',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/object/part-of-2`,
      type: 'object',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/object/part-of-3`,
      type: 'object',
    },
  ],
  produced_by: {
    id: '',
    part: [
      {
        id: '',
        type: 'Production',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/production-part-classified-as`,
            type: 'Type',
            _label: 'Artist',
          },
        ],
        carried_out_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/person/production-carried-out-by`,
            type: 'Person',
            _label: 'Andy Warhol, American, 1928–1987',
          },
        ],
      },
    ],
    type: 'Production',
    timespan: {
      id: '',
      type: 'TimeSpan',
      identified_by: [
        {
          id: '',
          type: 'Name',
          content: '1983',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/production-timespan-identified-by-classified-as`,
              type: 'Type',
              _label: 'Display Date',
            },
          ],
        },
      ],
      end_of_the_end: '1983-12-31T00:00:00Z',
      begin_of_the_begin: '1983-01-01T00:00:00Z',
    },
    technique: [
      {
        id: `${config.env.dataApiBaseUrl}data/concept/production-technique`,
        type: 'Type',
        _label: 'internal dye diffusion transfer process',
      },
    ],
    took_place_at: [
      {
        id: `${config.env.dataApiBaseUrl}data/place/production-took-place-at`,
        type: 'Type',
        _label: 'Scotland',
      },
    ],
    occurred_during: [
      {
        id: `${config.env.dataApiBaseUrl}data/activity/production-occurred-during`,
        type: 'Type',
        _label: 'Cretaceous',
      },
    ],
  },
  referred_to_by: [
    {
      id: `${config.env.dataApiBaseUrl}data/text/referred-to-by-1`,
      type: 'LinguisticObject',
      content: 'referred_to_by mock 1',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/referred-to-by-classified-as-1`,
          type: 'Type',
          _label: 'Citations',
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      content: 'On view',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/access-statement`,
          type: 'Type',
          _label: 'Access Statement',
          equivalent: [
            {
              id: config.aat.accessStatement,
              type: 'Type',
              _label: 'Access Statement',
            },
          ],
        },
      ],
      language: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/language`,
          type: 'Type',
          _label: 'Access Statement',
        },
      ],
    },
    {
      type: 'LinguisticObject',
      content: '36 15/16 × 14 1/4 × 2 in. (93.8 × 36.2 × 5.1 cm)',
      classified_as: [
        {
          id: config.aat.dimensionStatement,
          type: 'Type',
          _label: 'Dimensions',
        },
      ],
    },
    {
      type: 'LinguisticObject',
      content: 'A Cool Exhibition',
      classified_as: [
        {
          id: config.aat.exhibition,
          type: 'Type',
          _label: 'Dimensions',
        },
      ],
    },
    {
      type: 'LinguisticObject',
      content: 'Mock Copyright Information',
      classified_as: [
        {
          id: config.aat.copyrightLicensingStatement,
          type: 'Type',
          _label: 'Copyright',
        },
      ],
    },
    {
      type: 'LinguisticObject',
      content: 'Plan Your Visit',
      classified_as: [
        {
          id: config.aat.visitors,
          type: 'Type',
          _label: "Visitors' Statement",
        },
      ],
      _content_html:
        "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
    },
  ],
  shows: [
    {
      id: `${config.env.dataApiBaseUrl}data/text/original-work-1`,
      type: 'LinguisticObject',
      _label: 'Original Work 1',
    },
  ],
  subject_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/subject-of-1`,
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'https://www.mongodb.com/',
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
    {
      type: 'LinguisticObject',
      _label: 'IIIF v3 manifest',
      digitally_carried_by: [
        {
          type: 'DigitalObject',
          _label: 'IIIF v3 manifest',
          format: 'application/ld+json',
          conforms_to: [
            {
              id: 'http://iiif.io/api/presentation/3/context.json',
              type: 'InformationObject',
            },
          ],
          access_point: [
            {
              id: 'https://manifests.collections.yale.edu/test',
              type: 'DigitalObject',
            },
          ],
          identified_by: [
            {
              type: 'Name',
              content: 'IIIF v3 manifest',
            },
          ],
        },
      ],
    },
  ],
  used_for: [
    {
      id: '',
      type: 'Activity',
      timespan: {
        id: '',
        type: 'TimeSpan',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: '2009',
            classified_as: [
              {
                id: 'https://endpoint.yale.edu/data/concept/display-title',
                type: 'Type',
                _label: 'Display Title',
              },
            ],
          },
        ],
        end_of_the_end: '2009-12-31T23:59:59',
        begin_of_the_begin: '2009-01-01T00:00:00',
      },
      classified_as: [
        {
          id: 'https://endpoint.yale.edu/data/concept/d1d83293-3374-4fba-916a-ce79c31184d3',
          type: 'Type',
          _label: 'Publishing',
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
    'lux:itemUnit': {
      href: `${config.env.dataApiBaseUrl}api/facets/item?q=responsibleUnits`,
      _estimate: 1,
    },
    'lux:itemDepartment': {
      href: `${config.env.dataApiBaseUrl}api/search/item?q=itemDepartment`,
      _estimate: 1,
    },
  },
}

export default physicalObject
