import { isNull, isUndefined } from 'lodash'
import { AuthContextProps } from 'react-oidc-context'

import config from '../../config/config'
import IConcept from '../../types/data/IConcept'
import IEntity from '../../types/data/IEntity'
import IMyCollection from '../../types/data/IMyCollection'
import IWebpages from '../../types/data/IWebpages'
import MyCollectionParser from '../parse/data/MyCollectionParser'
import { INoteContent } from '../../types/IContentWithLanguage'
import INames from '../../types/myCollections/INames'

export const getBaseCollectionObject = (): IEntity => {
  return {
    type: 'Set',
  }
}

/**
 * Creates a new collection JSON-LD object to be passed to the backend
 * @param {string} name the user entered name of the collection being created
 * @param {string} classification the user entered classification of the collection being created
 * @param {string} language the user entered language of the collection being created
 * @param {boolean} defaultCollection determines if the default collection classification should be added to the collection being created
 * @returns {IMyCollection}
 */
export const createCollectionObject = (
  name: string,
  classification: string,
  language: string,
  defaultCollection: boolean,
): IMyCollection => {
  const personalCollectionClassifiedAsObject: IConcept = {
    id: 'https://todo.concept.my.collection',
    type: 'Type',
    _label: 'My Collection',
  }

  let classifiedAs = [personalCollectionClassifiedAsObject]

  if (defaultCollection) {
    classifiedAs = [
      ...classifiedAs,
      {
        type: 'Type',
        id: 'defaultCollectionUUID',
      },
    ]
  }
  return {
    ...getBaseCollectionObject(),
    identified_by: [
      {
        id: '',
        type: 'Name',
        content: name,
        language: [
          {
            id: language,
            type: 'Language',
            _label: 'English',
            equivalent: [
              {
                id: config.aat.langen,
                type: 'Language',
                _label: 'English',
              },
            ],
          },
        ],
        classified_as: [
          {
            id: classification,
            type: 'Type',
            _label: 'Primary Name',
            equivalent: [
              {
                id: config.aat.primaryName,
                type: 'Type',
                _label: 'Primary Name',
              },
            ],
          },
        ],
      },
    ],
    classified_as: classifiedAs,
  }
}

/**
 * Adds the list of records to be added to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<string>} listOfRecordIds the list of record UUIDs to add to the collection
 * @returns {IMyCollection}
 */
export const addToCollectionObject = (
  collection: IMyCollection,
  listOfRecordIds: Array<string>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const recordsToAdd = listOfRecordIds.map((id) => {
    return {
      id,
      type: 'Set',
    }
  })

  if (collectionCopy.hasOwnProperty('containing')) {
    collectionCopy.containing = [...collectionCopy.containing, ...recordsToAdd]
  } else {
    collectionCopy.containing = recordsToAdd
  }

  return collectionCopy
}

/**
 * Finds and removed the records to be deleted from a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to delete from
 * @param {Array<string>} listOfRecordIds the list of record UUIDs to delete from the collection
 * @returns {IMyCollection}
 */
export const deleteFromCollectionObject = (
  collection: IMyCollection,
  listOfRecordIds: Array<string>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const collectionParser = new MyCollectionParser(collectionCopy)
  const containing = collectionParser.getContaining()

  listOfRecordIds.map((id) => {
    if (containing.includes(id)) {
      const ind = containing.indexOf(id)
      containing.splice(ind, 1)
    }
  })

  collectionCopy.containing = containing.map((c) => {
    return { id: c }
  })
  return collectionCopy
}

/**
 * Adds the list of names to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<INames>} listOfNames the list of names to add to the collection
 * @returns {IMyCollection}
 */
export const addNamesToCollectionObject = (
  collection: IMyCollection,
  listOfNames: Array<INames>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const identifiers = collectionCopy.identified_by.filter(
    (iB: IEntity) => iB.type === 'Identifier',
  )
  const namesToAdd = listOfNames.map((note) => {
    const { name, classifications, languages } = note
    const newNameObject: IEntity = {
      type: 'Name',
      content: name,
    }
    // Format languages data
    const languagesToAdd = !isUndefined(languages)
      ? languages.map((l) => {
          return {
            id: l,
            type: 'Language',
          }
        })
      : []

    // Add languages
    if (languagesToAdd.length > 0) {
      newNameObject.language = languagesToAdd
    }

    // Format classifications data
    const classificationsToAdd = !isUndefined(classifications)
      ? classifications.map((cl) => {
          return {
            id: cl,
            type: 'Type',
          }
        })
      : []

    // Add languages
    if (classificationsToAdd.length > 0) {
      newNameObject.classified_as = classificationsToAdd
    }

    return newNameObject
  })

  collectionCopy.identified_by = [...identifiers, ...namesToAdd]

  return collectionCopy
}

/**
 * Adds the list of classifications to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<string>} listOfClassifications the list of classifications to add to the collection
 * @returns {IMyCollection}
 */
export const addClassificationsToCollectionObject = (
  collection: IMyCollection,
  listOfClassifications: Array<string>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const classificationsToAdd = listOfClassifications.map((cl) => {
    return {
      type: 'Type',
      id: cl,
    }
  })

  collectionCopy.classified_as = classificationsToAdd

  return collectionCopy
}

/**
 * Sets the current collection as default
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @returns {IMyCollection}
 */
export const setCollectionAsDefault = (
  collection: IMyCollection,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const defaultClassificationObject = {
    id: 'defaultId',
    type: 'Type',
  }

  if (collectionCopy.hasOwnProperty('classified_as')) {
    collectionCopy.classified_as.push(defaultClassificationObject)
  } else {
    collectionCopy.classified_as = [defaultClassificationObject]
  }

  return collectionCopy
}

/**
 * Adds the list of identifiers to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<string>} listOfIdentifiers the list of identifiers to add to the collection
 * @returns {IMyCollection}
 */
export const addIdentifiersToCollectionObject = (
  collection: IMyCollection,
  listOfIdentifiers: Array<string>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const names = collectionCopy.identified_by.filter(
    (iB: IEntity) => iB.type === 'Name',
  )
  const identifiersToAdd = listOfIdentifiers.map((id) => {
    return {
      content: id,
      type: 'Identifier',
    }
  })

  collectionCopy.identified_by = [...names, ...identifiersToAdd]

  return collectionCopy
}

/**
 * Adds the list of identifiers to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<IWebpages>} listOfWebpages the list of identifiers to add to the collection
 * @returns {IMyCollection}
 */
export const addWebpagesToCollectionObject = (
  collection: IMyCollection,
  listOfWebpages: Array<IWebpages>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const wepagesToAdd = listOfWebpages.map((wp) => {
    const { link, contentIdentifier, languages } = wp
    const languagesToAdd = !isUndefined(languages)
      ? languages.map((l) => {
          return {
            id: l,
            type: 'Language',
          }
        })
      : undefined
    return {
      id: '',
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: link,
              type: 'DigitalObject',
            },
          ],
          identified_by: [
            {
              id: 'Name',
              type: 'Type',
              _label: 'Web Page',
              content: contentIdentifier,
            },
          ],
          language: languagesToAdd,
        },
      ],
    }
  })

  collectionCopy.subject_of = wepagesToAdd

  return collectionCopy
}

/**
 * Adds the list of identifiers to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<INoteContent>} listOfIdentifiers the list of identifiers to add to the collection
 * @returns {IMyCollection}
 */
export const addNotesToCollectionObject = (
  collection: IMyCollection,
  listOfNotes: Array<INoteContent>,
): IMyCollection => {
  const collectionCopy = JSON.parse(JSON.stringify(collection))
  const notesToAdd = listOfNotes.map((note) => {
    const { content, label, labelLanguages, classifications, languages } = note
    const newNoteObject: IEntity = {
      type: 'LinguisticObject',
      content,
    }
    // Format languages data
    const languagesToAdd = !isUndefined(languages)
      ? languages.map((l) => {
          return {
            id: l,
            type: 'Language',
          }
        })
      : []

    // Add languages
    if (languagesToAdd.length > 0) {
      newNoteObject.language = languagesToAdd
    }

    // Format classifications data
    const classificationsToAdd = !isUndefined(classifications)
      ? classifications.map((cl) => {
          return {
            id: cl,
            type: 'Type',
          }
        })
      : []

    // Add languages
    if (classificationsToAdd.length > 0) {
      newNoteObject.classified_as = classificationsToAdd
    }
    // Format label language data
    const labelLanguagesToAdd = !isUndefined(labelLanguages)
      ? labelLanguages.map((l) => {
          return {
            id: l,
            type: 'Language',
          }
        })
      : []

    // Format label data
    const identifiedByToAdd: IEntity =
      !isUndefined(label) && label !== ''
        ? { type: 'Name', content: label }
        : { type: 'Name' }
    // Add label languages to the label object only if the identifiedByToAdd object is not empty
    if (identifiedByToAdd.hasOwnProperty('content')) {
      if (labelLanguagesToAdd.length > 0) {
        identifiedByToAdd.language = labelLanguagesToAdd
      }
      newNoteObject.identified_by = [identifiedByToAdd]
    }

    return newNoteObject
  })

  collectionCopy.referred_to_by = notesToAdd

  return collectionCopy
}

/**
 * Adds the list of identifiers to a collection
 * Returns the collection JSON-LD object to be passed to the backend
 * @param {IMyCollectionObject} collection the collection JSON-LD to add to
 * @param {Array<INoteContent>} listOfIdentifiers the list of identifiers to add to the collection
 * @returns {IMyCollection}
 */
export const formatSubTabNavLinks = (
  auth: AuthContextProps,
  subTab: string,
  searchQueryString: string,
): string => {
  const urlParams = new URLSearchParams(searchQueryString)
  const query = urlParams.has('q') ? (urlParams.get('q') as string) : ''
  const sq = urlParams.has('sq') ? (urlParams.get('sq') as string) : null

  let searchQuery = query
  const parsed = JSON.parse(searchQuery)

  if (subTab === 'lux-collections') {
    parsed.NOT = [
      {
        createdBy: { username: auth.user?.profile['cognito:username'] },
      },
    ]
    return `?q=${JSON.stringify(parsed)}&filterResults=false${!isNull(sq) ? `&sq=${sq}` : ''}`
  }

  if (subTab === 'my-collections') {
    parsed.AND.push({
      createdBy: {
        username: auth.user?.profile['cognito:username'],
      },
    })

    return `?q=${JSON.stringify(parsed)}&filterResults=false${!isNull(sq) ? `&sq=${sq}` : ''}`
  }

  return searchQueryString
}
