import nock from 'nock'

import { concept as mockConcept, languageConcept } from '../../data/concept'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function conceptMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // mock the api call for the place
  nock(apiUrl)
    .get('/data/concept/mock-concept')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the place name
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Type')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock influenced by
  nock(apiUrl)
    .get('/data/concept/influenced-by?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Influenced By')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock description statement
  nock(apiUrl)
    .get('/data/concept/b9d84f17-662e-46ef-ab8b-7499717f8337?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Description Statement')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock rights statement
  nock(apiUrl)
    .get('/data/concept/40ab3a0f-d7d1-440f-9be2-05131d6e567e?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Rights Statement')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the english language
  nock(apiUrl)
    .get('/data/concept/1fda962d-1edc-4fd7-bfa9-0c10e3153449?profile=name')
    .reply(200, JSON.stringify(languageConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the hierarchy parent
  nock(apiUrl)
    .get('/data/concept/broader-1?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Concept Parent', '/concept/broader-1'),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the hierarchy parent name
  nock(apiUrl)
    .get('/data/concept/broader-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Concept Parent')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
