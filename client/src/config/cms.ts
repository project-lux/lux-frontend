// Constants for contents retrieved from the remote CMS

export enum UnitCode {
  YCBA = 1,
  YPM = 2,
  YUAG = 3,
  YUL = 4,
  ALL = 5,
  INVALID = -1,
}

export const unitCodeFromNumString = (s: string): UnitCode => {
  switch (s) {
    case '1':
      return UnitCode.YCBA
    case '2':
      return UnitCode.YPM
    case '3':
      return UnitCode.YUAG
    case '4':
      return UnitCode.YUL
    case '5':
      return UnitCode.ALL
    default:
      return UnitCode.INVALID
  }
}

export type PageKey =
  | 'aboutLux'
  | 'collabHistory'
  | 'landAck'
  | 'openAccess'
  | 'openAccessPolicy2011'
  | 'rightsInfo'
  | 'searchTips'
  | 'sharableOutcomes'
  | 'technology'
  | 'termsOfUse'
  | 'whoWeAre'

export const pagePaths = {
  aboutLux: 'node/page/502d21b5-2176-46b3-8990-bde1b681502f',
  collabHistory: 'node/page/58710c9b-5dbc-4266-9868-22edcff358be',
  landAck: 'node/page/5567909d-a297-4e9d-b396-f06ab33198fe',
  openAccess: 'node/page/d1883671-2d9e-4d9c-a50c-faa3c2281ec7',
  openAccessPolicy2011: 'node/page/e4cbcaa1-eb68-4492-aff6-2bfbf46693d8',
  rightsInfo: 'node/page/0aebbc66-791c-43e8-9ea8-f8c5174fc587',
  searchTips: 'node/page/11868202-066a-4f6a-8bdb-e7389177ee3a',
  sharableOutcomes: 'node/page/dab80fb8-6836-42e2-a423-aa3db71dd1d4',
  technology: 'node/page/876f1eb2-c403-42e0-98d0-0d348c4961eb',
  termsOfUse: 'node/page/9541cd7b-10df-4060-8594-004029fe3c38',
  whoWeAre: 'node/page/12ca43a3-f91b-4b50-a671-3a70f188355c',
}

export type OverlayKey =
  | 'objects'
  | 'works'
  | 'collections'
  | 'peopleAndOrgs'
  | 'places'
  | 'conceptsAndGroupings'
  | 'events'
  | 'objectsWorksHelp'

export const overlays = {
  objects: 'node/overlays/55538b06-19eb-4826-9e7d-bd65cf520277',
  works: 'node/overlays/bb17aee7-9ea4-4b6b-98ab-2aa42c18eb42',
  collections: 'node/overlays/2fd03ca8-626d-44df-893a-3a94a4941612',
  peopleAndOrgs: 'node/overlays/76db9289-5023-421a-9f22-f3057d0f87cc',
  places: 'node/overlays/a3f82f9d-441a-43b7-b29d-ca267d2cdb08',
  conceptsAndGroupings: 'node/overlays/7498936d-708d-4f69-b14b-58e6256615df',
  events: 'node/overlays/2ae8cde4-1218-412f-9eb3-b58c328da20c',
  objectsWorksHelp: 'node/overlays/427b2feb-ffe9-4a12-9624-d45f9356b5e0',
}

export const aboutPageRouteToKey: { [key: string]: PageKey } = {
  'about-lux': 'aboutLux',
  'collaboration-history': 'collabHistory',
  technology: 'technology',
  'sharable-outcomes': 'sharableOutcomes',
  'who-we-are': 'whoWeAre',
  'land-acknowledgement': 'landAck',
}

export const contentPageRouteToKey: { [key: string]: PageKey } = {
  'open-access': 'openAccess',
  'open-access-policy-2011': 'openAccessPolicy2011',
  'terms-of-use': 'termsOfUse',
}

export enum FaqGroupKey {
  NO_GROUP = '0',
  GENERAL_INFO = '1',
  SIMPLE_SEARCH = '2',
  ADVANCED_SEARCH = '3',
  RESULT_VIEWS = '4',
  ITEM_RECORDS = '5',
  ACCESS_TO_COLLECTIONS = '6',
  RIGHTS_USAGE = '7',
}

export const faqPageRouteToKey: { [key: string]: Array<FaqGroupKey> } = {
  faq: [FaqGroupKey.GENERAL_INFO],
  'simple-search': [FaqGroupKey.SIMPLE_SEARCH],
  'advanced-search': [FaqGroupKey.ADVANCED_SEARCH],
  'result-views': [FaqGroupKey.RESULT_VIEWS],
  'item-records': [FaqGroupKey.ITEM_RECORDS],
  'access-to-collections': [FaqGroupKey.ACCESS_TO_COLLECTIONS],
  'rights-info': [FaqGroupKey.RIGHTS_USAGE],
}

export function faqGroupKeyFromString(s: string): FaqGroupKey {
  switch (s) {
    case '1':
      return FaqGroupKey.GENERAL_INFO
    case '2':
      return FaqGroupKey.SIMPLE_SEARCH
    case '3':
      return FaqGroupKey.ADVANCED_SEARCH
    case '4':
      return FaqGroupKey.RESULT_VIEWS
    case '5':
      return FaqGroupKey.ITEM_RECORDS
    case '6':
      return FaqGroupKey.ACCESS_TO_COLLECTIONS
    case '7':
      return FaqGroupKey.RIGHTS_USAGE
  }
  return FaqGroupKey.NO_GROUP
}

// FAQ group tags for which to parse out CMS contents
export const faqGroupKeys = [
  FaqGroupKey.GENERAL_INFO,
  FaqGroupKey.SIMPLE_SEARCH,
  FaqGroupKey.ADVANCED_SEARCH,
  FaqGroupKey.RESULT_VIEWS,
  FaqGroupKey.ITEM_RECORDS,
  FaqGroupKey.ACCESS_TO_COLLECTIONS,
  FaqGroupKey.RIGHTS_USAGE,
]

// Labels to show for FAQ group tags
export const faqGroupLabels: { [key in FaqGroupKey]: string } = {
  [FaqGroupKey.NO_GROUP]: 'Default',
  [FaqGroupKey.GENERAL_INFO]: 'General Information',
  [FaqGroupKey.SIMPLE_SEARCH]: 'Simple Search',
  [FaqGroupKey.ADVANCED_SEARCH]: 'Advanced Search',
  [FaqGroupKey.RESULT_VIEWS]: 'Result Views',
  [FaqGroupKey.ITEM_RECORDS]: 'Item Records',
  [FaqGroupKey.ACCESS_TO_COLLECTIONS]: 'Access to Collections',
  [FaqGroupKey.RIGHTS_USAGE]: 'Rights and Usage',
}
