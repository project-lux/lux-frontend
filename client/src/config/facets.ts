import {
  IFacetNamesLists,
  IFacetToSearchTermConfig,
  ISearchTermToFacetConfig,
} from '../types/IFacetNames'
import { ICriteria } from '../types/ISearchResults'

/* eslint-disable import/prefer-default-export */

export type LabelFunc = (value: number | string) => string
export type QueryFunc = (value: number | string) => object

export type Scope = 'agent' | 'item' | 'work'

export interface IFacet {
  sectionLabel: string
  facetLabel?: string | LabelFunc
  selectedLabel?: string | LabelFunc
  buildQuery: QueryFunc
}

type IFacetConfig = Record<Scope, Record<string, IFacet>>

// This should replace facetLabels and facetSearchTerms
export const facets: IFacetConfig = {
  item: {
    itemHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
    itemIsOnline: {
      sectionLabel: 'Is Online',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) => (value === 1 ? 'Is online' : 'Not online'),
      buildQuery: (value) => ({ isOnline: value }),
    },
    responsibleCollections: {
      sectionLabel: 'Collection',
      buildQuery: (value) => ({
        OR: [
          {
            memberOf: {
              curatedBy: {
                memberOf: {
                  id: value,
                },
              },
            },
          },
          {
            memberOf: {
              curatedBy: {
                id: value,
              },
            },
          },
        ],
      }),
    },
    responsibleUnits: {
      sectionLabel: 'Campus Division',
      buildQuery: (value) => ({
        OR: [
          {
            memberOf: {
              curatedBy: {
                memberOf: {
                  id: value,
                },
              },
            },
          },
          {
            memberOf: {
              curatedBy: {
                id: value,
              },
            },
          },
        ],
      }),
    },
  },
  work: {
    workHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
    workIsOnline: {
      sectionLabel: 'Is Online',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) => (value === 1 ? 'Is online' : 'Not online'),
      buildQuery: (value) => ({ isOnline: value }),
    },
  },
  agent: {
    agentHasDigitalImage: {
      sectionLabel: 'Has Digital Image',
      facetLabel: (value) => (value === 1 ? 'Yes' : 'No'),
      selectedLabel: (value) =>
        value === 1 ? 'Has Digital Image' : 'No Digital Image',
      buildQuery: (value) => ({ hasDigitalImage: value }),
    },
  },
}

export const facetNamesLists: IFacetNamesLists = {
  objects: [
    'itemHasDigitalImage',
    'itemIsOnline',
    'itemTypeId',
    'itemMaterialId',
    'itemEncounteredAgentId',
    'itemEncounteredPlaceId',
    'itemEncounteredDate',
    'itemProductionAgentId',
    'itemProductionPlaceId',
    'itemProductionDate',
    'responsibleUnits',
    'responsibleCollections',
  ],
  works: [
    'workHasDigitalImage',
    'workIsOnline',
    'workTypeId',
    'workLanguageId',
    'workAboutAgentId',
    'workAboutPlaceId',
    'workAboutConceptId',
    'workCreationAgentId',
    'workCreationPlaceId',
    'workCreationDate',
    'workPublicationAgentId',
    'workPublicationPlaceId',
    'workPublicationDate',
  ],
  peopleAndOrgs: [
    'agentHasDigitalImage',
    'agentGenderId',
    'agentNationalityId',
    'agentTypeId',
    'agentStartPlaceId',
    'agentStartDate',
    'agentEndPlaceId',
    'agentEndDate',
    'agentOccupationId',
    'agentActivePlaceId',
    'agentActiveDate',
    'agentMemberOfId',
    'agentRecordType',
  ],
  places: ['placeTypeId', 'placePartOfId'],
  conceptsAndGroupings: ['conceptTypeId', 'conceptPartOfId'],
  events: [
    'eventTypeId',
    'eventPlaceId',
    'eventAgentId',
    'eventStartDate',
    'eventEndDate',
  ],
}

export const facetLabels: { [key: string]: string } = {
  agentHasDigitalImage: 'Has Digital Image',
  agentGenderId: 'Gender',
  agentNationalityId: 'Nationality',
  agentStartPlaceId: 'Born/Formed At',
  agentEndPlaceId: 'Died/Dissolved At',
  agentStartDate: 'Born/Formed Date',
  agentEndDate: 'Died/Dissolved Date',
  agentActiveDate: 'Professionally Active Date',
  agentOccupationId: 'Occupation',
  agentActivePlaceId: 'Professionally Active At',
  agentMemberOfId: 'Member Of',
  agentRecordType: 'Person or Group',
  agentTypeId: 'Type',
  conceptPartOfId: 'Part Of',
  conceptTypeId: 'Type',
  eventAgentId: 'Carried Out By',
  eventEndDate: 'End Date',
  eventPlaceId: 'Took Place At',
  eventStartDate: 'Start Date',
  eventTypeId: 'Type',
  itemHasDigitalImage: 'Has Digital Image',
  itemIsOnline: 'Is Online',
  itemTypeId: 'Object Type',
  itemMaterialId: 'Materials',
  itemEncounteredPlaceId: 'Encountered At',
  itemEncounteredAgentId: 'Encountered By',
  itemEncounteredDate: 'Encounter Date',
  itemProductionDate: 'Creation Date',
  itemProductionPlaceId: 'Created At',
  itemProductionAgentId: 'Created By',
  placePartOfId: 'Part Of',
  placeTypeId: 'Type',
  responsibleCollections: 'Collection',
  responsibleUnits: 'Campus Division',
  workHasDigitalImage: 'Has Digital Image',
  workIsOnline: 'Is Online',
  workTypeId: 'Work Type',
  workAboutAgentId: 'About People & Groups',
  workPublicationAgentId: 'Published By',
  workCreationAgentId: 'Created By',
  workAboutPlaceId: 'About Place',
  workPublicationPlaceId: 'Published At',
  workCreationPlaceId: 'Created At',
  workAboutConceptId: 'About Concept',
  workPublicationDate: 'Published Date',
  workCreationDate: 'Created Date',
  workLanguageId: 'Language',
}

export const facetSearchTerms: IFacetToSearchTermConfig = {
  item: {
    itemHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    itemIsOnline: {
      searchTermName: 'isOnline',
      idFacet: false,
    },
    itemTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    itemMaterialId: {
      searchTermName: 'material',
      idFacet: true,
    },
    itemEncounteredDate: {
      searchTermName: 'encounteredDate',
      idFacet: false,
    },
    itemEncounteredAgentId: {
      searchTermName: 'encounteredBy',
      idFacet: true,
    },
    itemEncounteredPlaceId: {
      searchTermName: 'encounteredAt',
      idFacet: true,
    },
    itemProductionPlaceId: {
      searchTermName: 'producedAt',
      idFacet: true,
    },
    itemProductionAgentId: {
      searchTermName: 'producedBy',
      idFacet: true,
    },
    itemProductionDate: {
      searchTermName: 'producedDate',
      idFacet: false,
    },
  },
  work: {
    workHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    workIsOnline: {
      searchTermName: 'isOnline',
      idFacet: false,
    },
    workTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    workAboutAgentId: {
      searchTermName: 'aboutAgent',
      idFacet: true,
    },
    workPublicationAgentId: {
      searchTermName: 'publishedBy',
      idFacet: true,
    },
    workCreationAgentId: {
      searchTermName: 'createdBy',
      idFacet: true,
    },
    workAboutPlaceId: {
      searchTermName: 'aboutPlace',
      idFacet: true,
    },
    workPublicationPlaceId: {
      searchTermName: 'publishedAt',
      idFacet: true,
    },
    workCreationPlaceId: {
      searchTermName: 'createdAt',
      idFacet: true,
    },
    workAboutConceptId: {
      searchTermName: 'aboutConcept',
      idFacet: true,
    },
    workPublicationDate: {
      searchTermName: 'publishedDate',
      idFacet: false,
    },
    workCreationDate: {
      searchTermName: 'createdDate',
      idFacet: false,
    },
    workLanguageId: {
      searchTermName: 'language',
      idFacet: true,
    },
  },
  agent: {
    agentHasDigitalImage: {
      searchTermName: 'hasDigitalImage',
      idFacet: false,
    },
    agentGenderId: {
      searchTermName: 'gender',
      idFacet: true,
    },
    agentNationalityId: {
      searchTermName: 'nationality',
      idFacet: true,
    },
    agentStartPlaceId: {
      searchTermName: 'startAt',
      idFacet: true,
    },
    agentEndPlaceId: {
      searchTermName: 'endAt',
      idFacet: true,
    },
    agentStartDate: {
      searchTermName: 'startDate',
      idFacet: false,
    },
    agentEndDate: {
      searchTermName: 'endDate',
      idFacet: false,
    },
    agentActiveDate: {
      searchTermName: 'activeDate',
      idFacet: false,
    },
    agentOccupationId: {
      searchTermName: 'occupation',
      idFacet: true,
    },
    agentActivePlaceId: {
      searchTermName: 'activeAt',
      idFacet: true,
    },
    agentMemberOfId: {
      searchTermName: 'memberOf',
      idFacet: true,
    },
    agentTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    agentRecordType: {
      searchTermName: 'recordType',
      idFacet: false,
    },
  },
  place: {
    placeTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    placePartOfId: {
      searchTermName: 'partOf',
      idFacet: true,
    },
  },
  concept: {
    conceptTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    conceptPartOfId: {
      searchTermName: 'broader',
      idFacet: true,
    },
  },
  event: {
    eventStartDate: {
      searchTermName: 'startDate',
      idFacet: false,
    },
    eventEndDate: {
      searchTermName: 'endDate',
      idFacet: false,
    },
    eventTypeId: {
      searchTermName: 'classification',
      idFacet: true,
    },
    eventPlaceId: {
      searchTermName: 'tookPlaceAt',
      idFacet: true,
    },
    eventAgentId: {
      searchTermName: 'carriedOutBy',
      idFacet: true,
    },
  },
}

export const whereAtYaleSearchTermFacets = {
  item: {
    OR: (searchObj: ICriteria) => {
      // due to YUL workaround, this method now returns an array with both types of where at yale facet values in it
      let returnValue: Array<ICriteria> | null = []
      if (searchObj.OR) {
        for (const obj of searchObj.OR) {
          if (obj.memberOf?.curatedBy?.memberOf?.id) {
            returnValue.push({
              facetName: 'responsibleUnits',
              value: obj.memberOf.curatedBy.memberOf.id,
            })
          }
          if (obj.memberOf?.curatedBy?.id) {
            returnValue.push({
              facetName: 'responsibleCollections',
              value: obj.memberOf.curatedBy.id,
            })
          }
        }
      }
      returnValue = returnValue.length === 0 ? null : returnValue
      return returnValue
    },
  },
}

export const searchTermFacets: ISearchTermToFacetConfig = {
  item: {
    classification: {
      facetName: 'itemTypeId',
      idFacet: true,
    },
    encounteredBy: {
      facetName: 'itemEncounteredAgentId',
      idFacet: true,
    },
    encounteredAt: {
      facetName: 'itemEncounteredPlaceId',
      idFacet: true,
    },
    encounteredDate: {
      facetName: 'itemEncounteredDate',
      idFacet: false,
    },
    hasDigitalImage: {
      facetName: 'itemHasDigitalImage',
      idFacet: false,
    },
    isOnline: {
      facetName: 'itemIsOnline',
      idFacet: false,
    },
    material: {
      facetName: 'itemMaterialId',
      idFacet: true,
    },
    producedAt: {
      facetName: 'itemProductionPlaceId',
      idFacet: true,
    },
    producedBy: {
      facetName: 'itemProductionAgentId',
      idFacet: true,
    },
    producedDate: {
      facetName: 'itemProductionDate',
      idFacet: false,
    },
  },
  work: {
    hasDigitalImage: {
      facetName: 'workHasDigitalImage',
      idFacet: false,
    },
    isOnline: {
      facetName: 'workIsOnline',
      idFacet: false,
    },
    classification: {
      facetName: 'workTypeId',
      idFacet: true,
    },
    aboutAgent: {
      facetName: 'workAboutAgentId',
      idFacet: true,
    },
    publishedBy: {
      facetName: 'workPublicationAgentId',
      idFacet: true,
    },
    createdBy: {
      facetName: 'workCreationAgentId',
      idFacet: true,
    },
    aboutPlace: {
      facetName: 'workAboutPlaceId',
      idFacet: true,
    },
    publishedAt: {
      facetName: 'workPublicationPlaceId',
      idFacet: true,
    },
    createdAt: {
      facetName: 'workCreationPlaceId',
      idFacet: true,
    },
    aboutConcept: {
      facetName: 'workAboutConceptId',
      idFacet: true,
    },
    publishedDate: {
      facetName: 'workPublicationDate',
      idFacet: false,
    },
    createdDate: {
      facetName: 'workCreationDate',
      idFacet: false,
    },
    language: {
      facetName: 'workLanguageId',
      idFacet: true,
    },
  },
  agent: {
    hasDigitalImage: {
      facetName: 'agentHasDigitalImage',
      idFacet: false,
    },
    gender: {
      facetName: 'agentGenderId',
      idFacet: true,
    },
    nationality: {
      facetName: 'agentNationalityId',
      idFacet: true,
    },
    startAt: {
      facetName: 'agentStartPlaceId',
      idFacet: true,
    },
    endAt: {
      facetName: 'agentEndPlaceId',
      idFacet: true,
    },
    startDate: {
      facetName: 'agentStartDate',
      idFacet: false,
    },
    endDate: {
      facetName: 'agentEndDate',
      idFacet: false,
    },
    activeDate: {
      facetName: 'agentActiveDate',
      idFacet: false,
    },
    occupation: {
      facetName: 'agentOccupationId',
      idFacet: true,
    },
    activeAt: {
      facetName: 'agentActivePlaceId',
      idFacet: true,
    },
    memberOf: {
      facetName: 'agentMemberOfId',
      idFacet: true,
    },
    classification: {
      facetName: 'agentTypeId',
      idFacet: true,
    },
    recordType: {
      facetName: 'agentRecordType',
      idFacet: false,
    },
  },
  place: {
    classification: {
      facetName: 'placeTypeId',
      idFacet: true,
    },
    partOf: {
      facetName: 'placePartOfId',
      idFacet: true,
    },
  },
  concept: {
    classification: {
      facetName: 'conceptTypeId',
      idFacet: true,
    },
    broader: {
      facetName: 'conceptPartOfId',
      idFacet: true,
    },
  },
  event: {
    classification: {
      facetName: 'eventTypeId',
      idFacet: true,
    },
    tookPlaceAt: {
      facetName: 'eventPlaceId',
      idFacet: true,
    },
    carriedOutBy: {
      facetName: 'eventAgentId',
      idFacet: true,
    },
  },
}

export const booleanFacetNames = new Set([
  'itemIsOnline',
  'workIsOnline',
  'itemHasDigitalImage',
  'workHasDigitalImage',
  'agentHasDigitalImage',
])
