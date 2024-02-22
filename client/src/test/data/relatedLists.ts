import config from '../../config/config'

export const mockRelatedListsResults = {
  '@context': 'https://linked.art/ns/v1/search.json',
  id: 'https://endpoint.yale.eduapi/related-list/:scope?name=...&uri=...',
  type: 'OrderedCollectionPage',
  orderedItems: [
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 276,
      first: {
        id: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fconcept%2Fmock-concept-1%22%7D%7D%2C%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%5D%7D`,
        type: 'test',
      },
      value: `${config.env.dataApiBaseUrl}data/concept/mock-concept-1`,
      name: 'Is the Category of Works Created By',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 217,
      first: {
        id: `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fconcept%2Fmock-concept-1%22%7D%7D%2C%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%5D%7D`,
        type: 'test',
      },
      value: `${config.env.dataApiBaseUrl}data/concept/mock-concept-1`,
      name: 'Is the Category of Objects Created By',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 146,
      first: {
        id: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fconcept%2Fmock-concept-2%22%7D%7D%2C%7B%22aboutAgent%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person-1%22%7D%7D%5D%7D`,
        type: 'test',
      },
      value: `${config.env.dataApiBaseUrl}data/concept/mock-concept-2`,
      name: 'Classification Of Work',
    },
  ],
}

export const mockTranslatedRelatedListsResults = {
  'https://endpoint.yale.edu/data/concept/mock-concept-1': {
    work: {
      relations: {
        'Is the Category of Works Created By': {
          totalItems: 276,
          criteria: {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-1',
                },
              },
              {
                createdBy: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        },
      },
      criteria: {
        OR: [
          {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-1',
                },
              },
              {
                createdBy: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        ],
      },
    },
    item: {
      relations: {
        'Is the Category of Objects Created By': {
          totalItems: 217,
          criteria: {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-1',
                },
              },
              {
                producedBy: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        },
      },
      criteria: {
        OR: [
          {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-1',
                },
              },
              {
                producedBy: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        ],
      },
    },
  },
  'https://endpoint.yale.edu/data/concept/mock-concept-2': {
    work: {
      relations: {
        'Classification Of Work': {
          totalItems: 146,
          criteria: {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-2',
                },
              },
              {
                aboutAgent: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        },
      },
      criteria: {
        OR: [
          {
            AND: [
              {
                classification: {
                  id: 'https://endpoint.yale.edu/data/concept/mock-concept-2',
                },
              },
              {
                aboutAgent: {
                  id: 'https://endpoint.yale.edu/data/person/mock-person-1',
                },
              },
            ],
          },
        ],
      },
    },
  },
}
