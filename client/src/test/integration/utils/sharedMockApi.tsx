import nock from 'nock'

import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import {
  accessStatementId,
  callNumberId,
  descriptionStatementId,
  dimensionStatementId,
  displayNameId,
  dutchLanguageId,
  englishLanguageId,
  frenchLanguageId,
  imprintStatementId,
  languageStatementId,
  nationalityId,
  primaryNameId,
} from '../../data/helperObjects'

export default function sharedMock(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // mock description statement
  nock(apiUrl)
    .get('/data/concept/description-statement?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Description Statement', descriptionStatementId),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock primary name
  nock(apiUrl)
    .get('/data/concept/primary-name?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Primary Name', primaryNameId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock primary name
  nock(apiUrl)
    .get('/data/concept/display-name?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Display Name', displayNameId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the english language
  nock(apiUrl)
    .get('/data/concept/english-language?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('English', englishLanguageId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  nock(apiUrl)
    .get('/data/concept/english-language?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('English', englishLanguageId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the french language
  nock(apiUrl)
    .get('/data/concept/french-language?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('French', frenchLanguageId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the dutch language
  nock(apiUrl)
    .get('/data/concept/dutch-language?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Dutch', dutchLanguageId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the imprint statement
  nock(apiUrl)
    .get('/data/concept/imprint-statement?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Imprint Statement', imprintStatementId),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the imprint statement
  nock(apiUrl)
    .get('/data/concept/language-statement?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Language Statement', languageStatementId),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the imprint statement
  nock(apiUrl)
    .get('/data/concept/dimension-statement?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Dimension Statement', dimensionStatementId),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the imprint statement
  nock(apiUrl)
    .get('/data/concept/call-number?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Call Number', callNumberId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the imprint statement
  nock(apiUrl)
    .get('/data/concept/access-statement?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Access Statement', accessStatementId),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the nationality
  nock(apiUrl)
    .get('/data/concept/nationality?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('American', nationalityId)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )
}
