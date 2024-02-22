/* eslint-disable import/prefer-default-export */
import { defaultConstants } from '../../config/dataConstants'
import IEntity from '../../types/data/IEntity'
import IObject from '../../types/data/IObject'

const dc = defaultConstants(`${process.env.REACT_APP_API_BASE_URL}`)

export const name: IEntity = {
  id: 'https://endpoint.yale.edu/data/concept/',
  type: 'Person',
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Imprint',
      language: [
        {
          id: dc.langen,
          type: 'Language',
          _label: 'eng',
        },
      ],
      classified_as: [
        {
          id: dc.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
}

export const relationship: IObject = {
  id: '',
  type: '',
  produced_by: {
    id: '',
    type: 'Production',
    part: [
      {
        id: '',
        type: 'Production',
        classified_as: [
          {
            id: 'https://test.collection.com/1',
            type: 'Type',
            _label: 'Artist',
          },
        ],
        carried_out_by: [
          {
            id: 'https://test.collection.com/4325564',
            type: 'Person',
            _label: 'Joe Test',
          },
        ],
      },
    ],
  },
  classified_as: [
    {
      id: 'http://endpoint.yale.edu/1',
      type: 'Type',
      classified_as: [
        {
          id: 'http://id.test.come',
          type: 'Type',
          _label: 'art',
        },
      ],
      _label: 'picture',
    },
  ],
}
