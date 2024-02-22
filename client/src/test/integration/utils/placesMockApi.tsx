import nock from 'nock'

import { place as mockPlace, placeParent as mockParent } from '../../data/place'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import { languageConcept } from '../../data/concept'

export default function placeMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // mock the api call for the place
  nock(apiUrl)
    .get('/data/place/mock-place')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the place name
  nock(apiUrl)
    .get('/data/place/mock-place?profile=name')
    .reply(200, JSON.stringify(mockPlace), {
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

  // mock the api call for the initial parent in the hierarchy
  nock(apiUrl)
    .get('/data/place/mock-place-parent-entity?profile=name')
    .reply(200, JSON.stringify(mockParent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the hierarchy set
  nock(apiUrl)
    .get('/data/place/mock-place-parent-entity?profile=results')
    .reply(200, JSON.stringify(mockParent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/concept?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Parent')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the hiearchy container call
  nock(apiUrl)
    .get(
      `/api/hierarchy/place?id=${config.env.dataApiBaseUrl}data/place/mock-place`,
    )
    .reply(200, JSON.stringify(null), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the name language
  nock(apiUrl)
    .get('/data/concept/1fda962d-1edc-4fd7-bfa9-0c10e3153449?profile=name')
    .reply(200, JSON.stringify(languageConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for description statement from referred_to_by
  nock(apiUrl)
    .get('/data/concept/description-statement?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Note')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
