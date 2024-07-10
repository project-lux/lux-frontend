import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

const baseEntity = (
  id: string,
  _label: string,
  type: string,
  aat: string,
): Array<IEntity> => [
  {
    id,
    type,
    _label,
    equivalent: [
      {
        id: aat,
        type,
        _label,
      },
    ],
  },
]

const baseId = (type: string, identifier: string): string =>
  `${config.env.dataApiBaseUrl}data/${type}/${identifier}`

// reusable /classified_as/id
export const primaryNameId = baseId('concept', 'primary-name')
export const displayNameId = baseId('concept', 'display-name')
export const englishLanguageId = baseId('concept', 'english-language')
export const frenchLanguageId = baseId('concept', 'french-language')
export const dutchLanguageId = baseId('concept', 'dutch-language')
export const callNumberId = baseId('concept', 'call-number')
export const accessStatementId = baseId('concept', 'access-statement')
export const dimensionStatementId = baseId('concept', 'dimension-statement')
export const exhibitionId = baseId('concept', 'exhibition')
export const copyrightStatementId = baseId('concept', 'copyright-statement')
export const visitorsId = baseId('concept', 'visitors')
export const webPageId = baseId('concept', 'web-page')
export const typeOfPartId = baseId('concept', 'type-of-part')
export const archivesId = baseId('concept', 'archive')
export const collectionsId = baseId('concept', 'collection')
export const collectionItemId = baseId('concept', 'collection-item')
export const descriptionStatementId = baseId('concept', 'description-statement')
export const sortId = baseId('concept', 'sort-value')
export const animalSpecimensId = baseId('concept', 'animal-specimens')
export const languageStatementId = baseId('concept', 'language-statement')
export const imprintStatementId = baseId('concept', 'imprint-statement')
export const professionalActivityId = baseId('concept', 'professional-activity')
export const genderId = baseId('concept', 'gender')
export const occupationId = baseId('concept', 'occupation')
export const nationiltyId = baseId('concept', 'nationality')

// reusable nested entities
export const primaryName: Array<IEntity> = baseEntity(
  primaryNameId,
  'Primary Name',
  'Type',
  config.aat.primaryName,
)
export const displayName: Array<IEntity> = baseEntity(
  displayNameId,
  'Display Name',
  'Type',
  config.aat.displayName,
)
export const englishLanguage: Array<IEntity> = baseEntity(
  englishLanguageId,
  'Display Name',
  'Language',
  config.aat.langen,
)
export const frenchLanguage: Array<IEntity> = baseEntity(
  frenchLanguageId,
  'Display Name',
  'Language',
  config.aat.langfr,
)
export const dutchLanguage: Array<IEntity> = baseEntity(
  dutchLanguageId,
  'Display Name',
  'Language',
  config.aat.langdut,
)
export const callNumber: Array<IEntity> = baseEntity(
  callNumberId,
  'Call Number',
  'Type',
  config.aat.callNumber,
)
export const accessStatement: Array<IEntity> = baseEntity(
  accessStatementId,
  'Access Statement',
  'Type',
  config.aat.accessStatement,
)
export const dimensionStatement: Array<IEntity> = baseEntity(
  dimensionStatementId,
  'Dimension Statement',
  'Type',
  config.aat.dimensionStatement,
)
export const exhibition: Array<IEntity> = baseEntity(
  exhibitionId,
  'Exhibition',
  'Type',
  config.aat.exhibition,
)
export const copyrightStatement: Array<IEntity> = baseEntity(
  copyrightStatementId,
  'Copyright Statement',
  'Type',
  config.aat.copyrightLicensingStatement,
)
export const visitors: Array<IEntity> = baseEntity(
  visitorsId,
  'Visitors',
  'Type',
  config.aat.visitors,
)
export const webPage: Array<IEntity> = baseEntity(
  webPageId,
  'Web Page',
  'Type',
  config.aat.webPage,
)
export const typeOfPart: Array<IEntity> = baseEntity(
  typeOfPartId,
  'Type of Part',
  'Type',
  config.aat.typeOfPart,
)
export const archives: Array<IEntity> = baseEntity(
  archivesId,
  'Archive',
  'Type',
  config.aat.archive,
)
export const collections: Array<IEntity> = baseEntity(
  collectionsId,
  'Collection',
  'Type',
  config.aat.collection,
)
export const collectionItem: Array<IEntity> = baseEntity(
  collectionItemId,
  'Collection Item',
  'Type',
  config.aat.collectionItem,
)
export const descriptionStatement: Array<IEntity> = baseEntity(
  descriptionStatementId,
  'Description Statement',
  'Type',
  config.aat.descriptionStatement,
)
export const sortValue: Array<IEntity> = baseEntity(
  sortId,
  'Sort Value',
  'Type',
  config.aat.sortValue,
)
export const animalSpecimens: Array<IEntity> = baseEntity(
  animalSpecimensId,
  'Animal Specimens',
  'Type',
  config.aat.animalSpecimens,
)
export const languageStatement: Array<IEntity> = baseEntity(
  languageStatementId,
  'Language Statement',
  'Type',
  config.aat.languageStatement,
)
export const imprintStatement: Array<IEntity> = baseEntity(
  imprintStatementId,
  'Language Statement',
  'Type',
  config.aat.imprintStatement,
)
export const professionalActivity: Array<IEntity> = baseEntity(
  professionalActivityId,
  'Professional Activity',
  'Type',
  config.aat.active,
)
export const gender: Array<IEntity> = baseEntity(
  genderId,
  'Gender',
  'Type',
  config.aat.gender,
)
export const occupation: Array<IEntity> = baseEntity(
  occupationId,
  'Occupation',
  'Type',
  config.aat.occupation,
)
export const nationality: Array<IEntity> = baseEntity(
  nationiltyId,
  'Nationality',
  'Type',
  config.aat.nationality,
)
