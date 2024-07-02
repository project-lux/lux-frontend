import config from '../../config/config'
import IEvent from '../../types/data/IEvent'

export const event: IEvent = {
  id: `${config.env.dataApiBaseUrl}data/activity/mock-event`,
  type: 'Activity',
  _label:
    'Nottingham Festival Exhibition (Nottingham Castle Museum and Art Gallery, 1988-05-29 - 1988-07-24)',
  carried_out_by: [
    {
      id: `${config.env.dataApiBaseUrl}data/group/carried-out-by-1`,
      type: 'Group',
      _label: 'Nottingham Castle Museum and Art Gallery',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
      type: 'Type',
      _label: 'Exhibiting',
    },
  ],
  equivalent: [
    {
      id: 'https://ycba-lux.s3.amazonaws.com/v3/activity/21/2129afd9-ddee-4ca0-b788-6a66c64dd0c8.json',
      type: 'Activity',
      _label: 'Equivalent Entity',
    },
  ],
  identified_by: [
    {
      id: '',
      type: 'Identifier',
      content: '407-1988-05-29',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/identifier-classified-as`,
          type: 'Type',
          _label: 'System-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'Mock Event',
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
  part: [
    {
      id: `${config.env.dataApiBaseUrl}data/activity/event-1`,
      type: 'Activity',
      timespan: {
        id: '',
        type: 'TimeSpan',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: '1900-01-01 - 2000-01-01',
            classified_as: [
              {
                id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
                type: 'Type',
                _label: 'Display Title',
              },
            ],
          },
        ],
        end_of_the_end: '2000-01-01T00:00:00Z',
        begin_of_the_end: '2000-01-01T00:00:00Z',
        end_of_the_begin: '1900-01-01T00:00:00Z',
        begin_of_the_begin: '1900-01-01T00:00:00Z',
      },
      transferred_title_of: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/transferred-title-of`,
          type: 'Transfer',
        },
      ],
      carried_out_by: [
        {
          id: `${config.env.dataApiBaseUrl}data/group/part-carried-out-by`,
          type: 'Group',
          _label: 'Nottingham Castle Museum and Art Gallery',
        },
      ],
    },
  ],
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
  ],
  subject_of: [
    {
      type: 'LinguisticObject',
      _label: 'HomePage Content for Exhibition',
      digitally_carried_by: [
        {
          type: 'DigitalObject',
          _label: 'HomePage for Exhibition',
          format: 'text/html',
          access_point: [
            {
              id: 'https://artgallery.yale.edu/exhibitions/exhibition/test-unit-link',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: 'web page id',
              type: 'Type',
              _label: 'Web Page',
              equivalent: [
                {
                  id: config.aat.webPage,
                  type: 'Type',
                  _label: 'Web Page',
                },
              ],
            },
          ],
          identified_by: [
            {
              type: 'Name',
              content: 'Homepage for Exhibition Record',
              classified_as: [
                {
                  id: 'primary name',
                  type: 'Type',
                  _label: 'Primary Name',
                  equivalent: [
                    {
                      id: config.aat.primaryName,
                      type: 'Type',
                      _label: 'Primary Name',
                    },
                  ],
                },
              ],
            },
          ],
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
        content: '1988-01-01 - 1988-07-24',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
            type: 'Type',
            _label: 'Display Title',
          },
        ],
      },
    ],
    end_of_the_end: '1988-07-25T00:00:00Z',
    begin_of_the_end: '1988-07-24T00:00:00Z',
    end_of_the_begin: '1988-05-30T00:00:00Z',
    begin_of_the_begin: '1988-05-29T00:00:00Z',
  },
  took_place_at: [
    {
      id: `${config.env.dataApiBaseUrl}data/place/took-place-at-1`,
      type: 'Place',
      _label: 'Nottingham Castle Museum and Art Gallery 1',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/place/took-place-at-2`,
      type: 'Place',
      _label: 'Nottingham Castle Museum and Art Gallery 2',
    },
  ],
  used_specific_object: [
    {
      id: `${config.env.dataApiBaseUrl}data/set/mock-set`,
      type: 'Set',
      _label:
        "Exhibit set for 'Nottingham Festival Exhibition (Nottingham Castle Museum and Art Gallery, 1988-05-29 - 1988-07-24)'",
    },
  ],
}
