import nock from 'nock'

import config from '../../../config/config'
import { physicalObject as mockObject } from '../../data/object'
import { set as mockSet } from '../../data/set'
import { person as mockPerson } from '../../data/person'
import { linguisticObject as mockWork } from '../../data/linguisticObject'
import {
  concept as mockConcept,
  displayNameConcept,
  languageConcept,
} from '../../data/concept'
import { place as mockPlace } from '../../data/place'
import { event as mockEvent } from '../../data/event'
import { archive as mockArchive } from '../../data/archive'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import { facets } from '../../data/facets'

export default function physicalObjectsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock object call
  nock(apiUrl)
    .get('/data/object/mock-object')
    .reply(200, JSON.stringify(mockObject), {
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

  // mock the api call for the call number name
  nock(apiUrl)
    .get('/data/concept/35961a03-7a62-4494-bd50-f1630477035f?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the call number name
  nock(apiUrl)
    .get('/data/concept/5088ec29-065b-4c66-b49e-e61d3c8f3717?profile=name')
    .reply(200, JSON.stringify(displayNameConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the original works
  nock(apiUrl)
    .get('/data/text/original-work-1?profile=name')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/text/original-work-2?profile=name')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for carries
  nock(apiUrl)
    .get('/data/text/carries?profile=name')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for shows
  nock(apiUrl)
    .get('/data/text/shows?profile=name')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('mocked type')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for material
  nock(apiUrl)
    .get('/data/concept/made-of-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('mocked material')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for dimensions
  nock(apiUrl)
    .get('/data/concept/dimension-classified-as-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for dimensions statement label
  nock(apiUrl)
    .get('/data/concept/53922f57-dab5-43c5-a527-fc20a63fe128?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('dimensions description')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  nock(apiUrl)
    .get('/data/concept/dimension-classified-as-2?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for units
  nock(apiUrl)
    .get('/data/concept/unit-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/unit-2?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for carried out by
  nock(apiUrl)
    .get('/data/person/production-carried-out-by?profile=results')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for production carried out by
  nock(apiUrl)
    .get('/data/person/production-carried-out-by?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/person/production-carried-out-by?profile=results')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for production label
  nock(apiUrl)
    .get('/data/concept/production-part-classified-as?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for production location
  nock(apiUrl)
    .get('/data/place/production-took-place-at?profile=results')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for production technique
  nock(apiUrl)
    .get('/data/concept/production-technique?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('creation technique')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for production time period
  nock(apiUrl)
    .get('/data/activity/production-occurred-during?profile=name')
    .reply(200, JSON.stringify(mockEvent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for encounter carried out by
  nock(apiUrl)
    .get('/data/person/encounter-carried-out-by?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for encounter location
  nock(apiUrl)
    .get('/data/place/encounter-took-place-at?profile=name')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for encounter location
  nock(apiUrl)
    .get('/data/concept/referred-to-by-classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Notes label')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for publication label
  nock(apiUrl)
    .get('/data/concept/d1d83293-3374-4fba-916a-ce79c31184d3?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Publication Location')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for hierarchy
  nock(apiUrl)
    .get('/data/set/member-of-collection-1')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/set/member-of-collection-1?profile=name')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for collection results
  // parent that is an archive
  nock(apiUrl)
    .get('/data/set/mock-archive?profile=name')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/set/mock-archive')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for collection results
  nock(apiUrl)
    .get('/data/set/member-of-collection-1?profile=results')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // additional member_of data
  nock(apiUrl)
    .get('/data/set/member-of-collection-2?profile=name')
    .reply(200, JSON.stringify(mockSet), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for nationality name
  nock(apiUrl)
    .get('/data/concept/nationality-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('British')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // How do I see it? mocks
  // mock current location
  nock(apiUrl)
    .get('/data/set/current-location-unit-1?profile=name')
    .reply(200, JSON.stringify(mockSet), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the itemUnit HAL link
  nock(apiUrl)
    .get('/api/facets/item?q=responsibleUnits')
    .reply(200, JSON.stringify(facets), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the itemUnit name
  nock(apiUrl)
    .get('/data/group/d07b9b86-0a1e-4026-aa4c-8ecba8bbd9c9?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Unit')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
