import config from '../../config/config'
import IEvent from '../../types/data/IEvent'

export const productionEvent: IEvent = {
  id: `${config.env.dataApiBaseUrl}data/concept/used-for`,
  type: 'Production',
  timespan: {
    type: 'TimeSpan',
    identified_by: [
      {
        type: 'Name',
        content: '1780–1800',
        classified_as: [
          {
            id: config.dc.displayName,
            type: 'Type',
            _label: 'Display Date',
          },
        ],
      },
    ],
    end_of_the_end: '1800-12-31T00:00:00Z',
    begin_of_the_begin: '1780-01-01T00:00:00Z',
    _seconds_since_epoch_begin_of_the_begin: -5995814400,
    _seconds_since_epoch_end_of_the_end: -5333212800,
  },
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/production`,
      type: 'Concept',
      _label: 'Production',
    },
  ],
  referred_to_by: [
    {
      type: 'LinguisticObject',
      content: 'Made in Middletown, Connecticut,  or Stepney, Connecticut',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/event-description`,
          type: 'Type',
          _label: 'event-description',
        },
      ],
    },
    {
      type: 'LinguisticObject',
      content: 'Reference without classified_by',
    },
  ],
  influenced_by: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/influence`,
      type: 'concept',
    },
  ],
  took_place_at: [
    {
      id: `${config.env.dataApiBaseUrl}data/place/event-took-place-at`,
      type: 'place',
    },
  ],
  technique: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/technique`,
      type: 'concept',
    },
  ],
  occurred_during: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/occurred-during`,
      type: 'concept',
    },
  ],
}

export const productionEventWithAttributedBy: IEvent = {
  ...productionEvent,
  attributed_by: [
    {
      type: 'AttributeAssignment',
      assigned: [
        {
          type: 'Production',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/person/attributed-by-agent-1`,
              type: 'Person',
              _label: 'Attributed By Agent 1',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/maker-possibly-by`,
          type: 'Type',
          _label: 'Maker, possibly by',
        },
      ],
      referred_to_by: [
        {
          type: 'LinguisticObject',
          content: 'Maker, possibly by: Attributed By Agent 1',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/creator-description-1`,
              type: 'Type',
              _label: 'Creator Description',
            },
          ],
        },
      ],
    },
    {
      type: 'AttributeAssignment',
      assigned: [
        {
          type: 'Production',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/person/attributed-by-agent-2`,
              type: 'Person',
              _label: 'Attributed By Agent 2',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/9dd650a4-323e-4951-8bcd-02a356520d07`,
          type: 'Type',
          _label: 'Maker, possibly by',
        },
      ],
      referred_to_by: [
        {
          type: 'LinguisticObject',
          content: 'Maker, possibly by: Attributed By Agent 2',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/creator-description-2`,
              type: 'Type',
              _label: 'Creator Description',
            },
          ],
        },
      ],
    },
  ],
}

export const productionEventWithParts: IEvent = {
  ...productionEvent,
  part: [
    {
      type: 'Production',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/artist-1`,
          type: 'Type',
          _label: 'Artist',
        },
      ],
      carried_out_by: [
        {
          id: `${config.env.dataApiBaseUrl}data/person/part-agent-1`,
          type: 'Person',
          _label: 'Part Agent 1',
        },
      ],
      referred_to_by: [
        {
          type: 'LinguisticObject',
          content: 'Artist: Part Agent 1',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/part-creator-description`,
              type: 'Type',
              _label: 'Creator Description',
            },
          ],
        },
      ],
    },
  ],
}

export const productionEventWithCarriedOutBy: IEvent = {
  ...productionEvent,
  carried_out_by: [
    {
      id: `${config.env.dataApiBaseUrl}data/person/carried-out-agent`,
      type: 'Person',
      _label: 'Artist: Unknown',
    },
  ],
  referred_to_by: [
    {
      type: 'LinguisticObject',
      content: 'Artist: Unknown',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/creator-description`,
          type: 'Type',
          _label: 'Creator Description',
        },
      ],
    },
  ],
}

export const productionEventWithAllAgentDataPoints: IEvent = {
  ...productionEvent,
  ...productionEventWithAttributedBy,
  ...productionEventWithParts,
  ...productionEventWithCarriedOutBy,
}

export const carriedOutByTransformed = {
  role: 'additional',
  id: 'https://endpoint.yale.edu/data/person/carried-out-agent',
  references: [],
}

export const attributedByTransformed = [
  {
    role: 'https://endpoint.yale.edu/data/concept/maker-possibly-by',
    id: 'https://endpoint.yale.edu/data/person/attributed-by-agent-1',
    references: [
      {
        type: 'https://endpoint.yale.edu/data/concept/creator-description-1',
        content: 'Maker, possibly by: Attributed By Agent 1',
      },
    ],
  },
  {
    role: 'https://endpoint.yale.edu/data/concept/9dd650a4-323e-4951-8bcd-02a356520d07',
    id: 'https://endpoint.yale.edu/data/person/attributed-by-agent-2',
    references: [
      {
        type: 'https://endpoint.yale.edu/data/concept/creator-description-2',
        content: 'Maker, possibly by: Attributed By Agent 2',
      },
    ],
  },
]

export const partTransformed = {
  role: 'https://endpoint.yale.edu/data/concept/artist-1',
  id: 'https://endpoint.yale.edu/data/person/part-agent-1',
  references: [
    {
      type: 'https://endpoint.yale.edu/data/concept/part-creator-description',
      content: 'Artist: Part Agent 1',
    },
  ],
}
