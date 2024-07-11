/* eslint-disable import/prefer-default-export */
import config from '../../config/config'
import IConcept from '../../types/data/IConcept'

import {
  descriptionStatement,
  englishLanguage,
  primaryName,
} from './helperObjects'

export const concept: IConcept = {
  id: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
  type: 'Language',
  _label: 'Brythonic languages',
  broader: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/broader-1`,
      type: 'Language',
      _label: 'Celtic languages',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'mock type',
    },
  ],
  created_by: {
    type: 'testing',
    influenced_by: [
      {
        id: `${config.env.dataApiBaseUrl}data/concept/influenced-by`,
        type: 'test',
      },
    ],
  },
  equivalent: [
    {
      id: 'http://id.loc.gov/authorities/subjects/sh85017387',
      type: 'Language',
      _label: 'Brythonic languages',
    },
    {
      id: 'http://data.bnf.fr/ark:/12148/cb122582965',
      type: 'Language',
      _label: 'Equivalent Entity',
    },
    {
      id: 'https://id.loc.gov/authorities/classification/PB2001-PB2060',
      type: 'Language',
      _label: 'Equivalent Entity',
    },
    {
      id: 'http://id.worldcat.org/fast/839934',
      type: 'Language',
      _label: 'Equivalent Entity',
    },
  ],
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Mock Concept',
      language: englishLanguage,
      classified_as: primaryName,
    },
    {
      id: '',
      type: 'Name',
      content: 'British languages (Celtic)',
      language: englishLanguage,
      classified_as: primaryName,
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      content:
        'Languages of the Celts; in the first millennium BCE, these languages were spoken across a wide area of Europe and Asia Minor. Surviving Surviving Celtic languages are now spoken in Ireland, Scotland, Wales, Brittany, Cornwall, and the Isle of Man, and Cape Breton Island.',
      language: englishLanguage,
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/40ab3a0f-d7d1-440f-9be2-05131d6e567e`,
          type: 'Type',
          _label: 'Rights Statement',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/brief-text`,
              type: 'Type',
              _label: 'Brief Text',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      content: 'Description statement in english.',
      language: englishLanguage,
      classified_as: descriptionStatement,
    },
  ],
}

export const displayNameConcept: IConcept = {
  id: `${config.env.dataApiBaseUrl}data/concept/display-name`,
  type: 'Language',
  _label: 'Display name',
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'display name',
      language: englishLanguage,
      classified_as: primaryName,
    },
  ],
}
