import { isUndefined } from 'lodash'
import { AuthContextProps } from 'react-oidc-context'

import config from '../../config/config'
import IConcept from '../../types/data/IConcept'
import IEntity from '../../types/data/IEntity'
import IMyCollection from '../../types/data/IMyCollection'
import IWebpages from '../../types/data/IWebpages'
import MyCollectionParser from '../parse/data/MyCollectionParser'
import { INoteContent } from '../../types/IContentWithLanguage'
import INames from '../../types/myCollections/INames'
import IName from '../../types/data/IName'
import IAgent from '../../types/data/IAgent'

export const getUsername = (auth: AuthContextProps): string | undefined => {
  if (auth.user) {
    return auth.user?.profile['cognito:username'] as string
  }

  return undefined
}

export const getFormattedUuidForSubmission = (uuid: string): string => {
  if (uuid.includes(config.env.dataApiBaseUrl)) {
    return uuid
  }

  return `${config.env.dataApiBaseUrl}${uuid}`
}

export const getFormattedUuidFromPathname = (uuid: string): string =>
  `${config.env.dataApiBaseUrl}${uuid.replace('/view', 'data')}`

export const getFormattedDate = (date?: string): string => {
  let newDate = new Date()
  if (!isUndefined(date)) {
    newDate = new Date(`${date}Z`)
  }
  const formattedDate = newDate.toLocaleDateString()
  const formattedTime = newDate.toLocaleTimeString([], {
    timeZoneName: 'short',
  })
  return `[${formattedDate} at ${formattedTime}]`
}

export const getBaseCollectionObject = (): IEntity => {
  return {
    type: 'Set',
  }
}

const getFormattedUuids = (
  type: string,
  listOfUuids?: Array<string>,
): Array<IConcept> => {
  if (!isUndefined(listOfUuids)) {
    return listOfUuids.map((uuid) => {
      return {
        id:
          uuid === config.aat.personalCollection
            ? config.aat.personalCollection
            : getFormattedUuidForSubmission(uuid),
        type,
      }
    })
  }
  return []
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
  if (listOfRecordIds.length === 0) {
    return collection
  }
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
 * Creates a new collection JSON-LD object to be passed to the backend
 * @param {string} name the user entered name of the collection being created
 * @param {Array<string>} classifications the user entered classifications of the name of the collection being created
 * @param {Array<string>} languages the user entered languages of the name of the collection being created
 * @returns {IMyCollection}
 */
export const createCollectionObject = (
  name: string,
  classifications: Array<string>,
  languages: Array<string>,
  records?: Array<string>,
): IMyCollection => {
  // create new object for adding the name of the collection and its classifications and languages
  const newIdentifiedBy: IName = {
    id: '',
    type: 'Name',
    content: name,
  }
  // Format languages of name data
  const nameLanguagesToAdd = getFormattedUuids('Language', languages)

  // Add languages to the new name object
  if (nameLanguagesToAdd.length > 0) {
    newIdentifiedBy.language = nameLanguagesToAdd
  }

  // Format classifications of name data
  const nameClassificationsToAdd = getFormattedUuids('Type', classifications)

  // Add classifications to the new name object
  if (nameClassificationsToAdd.length > 0) {
    newIdentifiedBy.classified_as = nameClassificationsToAdd
  }

  // Set the collection as a Personal Collection
  const personalCollectionClassifiedAsObject: IConcept = {
    id: 'https://todo.concept.my.collection',
    type: 'Type',
    _label: 'My Collection',
  }

  const newCollection = {
    ...getBaseCollectionObject(),
    identified_by: [newIdentifiedBy],
    classified_as: [personalCollectionClassifiedAsObject],
  }

  if (!isUndefined(records)) {
    return addToCollectionObject(newCollection, records)
  }

  return newCollection
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
    const languagesToAdd = getFormattedUuids('Language', languages)

    // Add languages
    if (languagesToAdd.length > 0) {
      newNameObject.language = languagesToAdd
    }

    // Format classifications data
    const classificationsToAdd = getFormattedUuids('Type', classifications)

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
  const classificationsToAdd = getFormattedUuids('Type', listOfClassifications)

  collectionCopy.classified_as = classificationsToAdd

  return collectionCopy
}

/**
 * Sets the current collection as default
 * @param {string} collectionUuid the collection UUID to make the default
 * @param {IAgent} currentUser the current logged in user data
 * @returns {IMyCollection}
 */
export const setCollectionAsDefault = (
  collectionUuid: string,
  currentUser: IAgent,
): IMyCollection => {
  const currentUserCopy = JSON.parse(JSON.stringify(currentUser))
  currentUserCopy._lux_default_collection = collectionUuid

  return currentUserCopy
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
  const webpagesToAdd = listOfWebpages.map((wp) => {
    const { link, contentIdentifier, languages } = wp
    const languagesToAdd = getFormattedUuids('Language', languages)

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
          classified_as: [
            {
              type: 'Type',
              _label: 'Web Page',
              equivalent: [
                {
                  id: config.aat.webPage,
                  type: 'Type',
                  _label: 'Web Page',
                },
              ],
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

  collectionCopy.subject_of = webpagesToAdd

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
    const languagesToAdd = getFormattedUuids('Language', languages)

    // Add languages
    if (languagesToAdd.length > 0) {
      newNoteObject.language = languagesToAdd
    }

    // Format classifications data
    const classificationsToAdd = getFormattedUuids('Type', classifications)

    // Add languages
    if (classificationsToAdd.length > 0) {
      newNoteObject.classified_as = classificationsToAdd
    }
    // Format label language data
    const labelLanguagesToAdd = getFormattedUuids('Language', labelLanguages)

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
  user: string | undefined,
  subTab: string,
  searchQueryString: string,
): string => {
  if (isUndefined(user)) {
    return searchQueryString
  }

  const parsed = JSON.parse(searchQueryString)
  const queryByUser = {
    createdBy: { username: user },
  }
  if (!parsed.hasOwnProperty('AND')) {
    parsed.AND = []
  }
  if (subTab === 'lux-collections') {
    parsed.AND.push({
      NOT: [queryByUser],
    })
  }

  if (subTab === 'my-collections') {
    parsed.AND.push(queryByUser)
  }

  return JSON.stringify(parsed)
}
