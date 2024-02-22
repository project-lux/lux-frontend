import IDigitalObject from '../../types/data/IDigitalObject'

export const digitalObject: IDigitalObject = {
  id: 'https://endpoint.yale.edu/data/digital/f0533039-048b-4f6d-8b62-614781b4c935',
  type: 'DigitalObject',
  about: [
    {
      id: 'https://endpoint.yale.edu/data/person/fff5ddd3-7053-42d0-b9e8-73b3720938f4',
      type: 'Person',
      _label: 'Kahn, Louis I., 1901-1974',
    },
  ],
  _label:
    'Yellow light and blue shadow [videorecording] : the Yale Center for British Art /c Michael Cadwell',
  '@context': 'https://linked.art/ns/v1/linked-art.json',
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
      took_place_at: [
        {
          id: 'https://endpoint.yale.edu/data/place/1f977da1-4dd4-4706-a99e-6b21122afa94',
          type: 'Place',
          _label: 'Connecticut',
        },
      ],
    },
  ],
  member_of: [
    {
      id: 'https://endpoint.yale.edu/data/set/6b2f3f29-61b4-4c46-bdb5-afeba06040e5',
      type: 'Set',
      _label: 'Yale Center for British Art',
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
            id: 'https://endpoint.yale.edu/data/concept/7686a91b-9f6a-4533-8616-29e98698c231',
            type: 'Type',
            _label: 'Contributor',
          },
        ],
        carried_out_by: [
          {
            id: 'https://endpoint.yale.edu/data/group/f7248add-0daa-476e-b1d5-4011eee76667',
            type: 'Group',
            _label: 'Yale Center for British Art',
          },
        ],
      },
      {
        id: '',
        type: 'Creation',
        _label: 'Creation',
        classified_as: [
          {
            id: 'https://endpoint.yale.edu/data/concept/7686a91b-9f6a-4533-8616-29e98698c231',
            type: 'Type',
            _label: 'Contributor',
          },
        ],
        carried_out_by: [
          {
            id: 'https://endpoint.yale.edu/data/group/214e3c24-b5e9-4482-8295-5bd52813b210',
            type: 'Group',
            _label: 'Yale University Art Gallery',
          },
        ],
      },
      {
        id: '',
        type: 'Creation',
        _label: 'Creation',
        classified_as: [
          {
            id: 'https://endpoint.yale.edu/data/concept/083b5d2e-655f-4928-aa8a-37f580867a14',
            type: 'Type',
            _label: 'Creator',
          },
        ],
        carried_out_by: [
          {
            id: 'https://endpoint.yale.edu/data/person/c6561167-bf69-42db-8cf5-7e99807fc43d',
            type: 'Person',
            _label: 'Cadwell, Mike, 1952-',
          },
        ],
      },
    ],
    type: 'Creation',
  },
  equivalent: [
    {
      id: 'https://linked-art.library.yale.edu/node/a13cbfeb-6f26-41b3-911b-01b9e3866bcd',
      type: 'DigitalObject',
      _label: 'Equivalent Entity',
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
              id: 'https://search.library.yale.edu/catalog/8616436',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: 'https://endpoint.yale.edu/data/concept/2eca07bd-be42-4ef5-9ec5-87c1bbfe639d',
              type: 'Type',
              _label: 'Web Page',
            },
          ],
        },
      ],
    },
  ],
  classified_as: [
    {
      id: 'https://endpoint.yale.edu/data/concept/7382f0bb-5568-456f-8dae-a55faf434ffd',
      type: 'Type',
      _label: 'Software Applications',
      classified_as: [
        {
          id: 'https://endpoint.yale.edu/data/concept/type-of-work',
          type: 'Type',
          _label: 'Type of Work',
        },
      ],
    },
  ],
  identified_by: [
    {
      id: '',
      type: 'Identifier',
      content: 'ils:yul:8616436',
      attributed_by: [
        {
          id: '',
          type: 'AttributeAssignment',
          carried_out_by: [
            {
              id: 'https://endpoint.yale.edu/data/group/852a7845-b2c5-44ed-ad91-ef9ef9162cc1',
              type: 'Group',
              _label: 'Yale University Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: 'https://endpoint.yale.edu/data/concept/a4bc4a81-f7c6-4921-a883-647050f268b1',
          type: 'Type',
          _label: 'System-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content:
        'Yellow light and blue shadow [videorecording] : the Yale Center for British Art /c Michael Cadwell',
      classified_as: [
        {
          id: 'https://endpoint.yale.edu/data/concept/f7ef5bb4-e7fb-443d-9c6b-371a23e717ec',
          type: 'Type',
          _label: 'Primary Name',
        },
        {
          id: 'https://endpoint.yale.edu/data/concept/f7ef5bb4-e7fb-443d-9c6b-371a23e717ec',
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content: '1 videodisc  (DVD)  (70 min.)',
      classified_as: [
        {
          id: 'https://endpoint.yale.edu/data/concept/b815001d-c61f-47ac-b083-3e7a986b129e',
          type: 'Type',
          _label: 'Dimension Statement',
          classified_as: [
            {
              id: 'https://endpoint.yale.edu/data/concept/brief-text',
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
          content: 'Extent',
          classified_as: [
            {
              id: 'https://endpoint.yale.edu/data/concept/display-title',
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
    },
  ],
}
