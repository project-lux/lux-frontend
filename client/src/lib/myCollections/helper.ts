import config from '../../config/config'
import IConcept from '../../types/data/IConcept'
import IEntity from '../../types/data/IEntity'
import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../parse/data/MyCollectionParser'

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
    id: 'https://not.checked',
    type: 'Concept',
    equivalent: [
      {
        type: 'Concept',
        id: 'https://todo.concept.my.collection',
      },
    ],
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

  collectionCopy.containing = containing
  return collectionCopy
}
