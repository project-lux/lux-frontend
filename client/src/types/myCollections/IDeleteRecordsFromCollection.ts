import IMyCollection from '../data/IMyCollection'

export interface IDeleteRecordsFromCollection {
  collectionId: string
  collectionData: IMyCollection
  recordsToDelete: Array<string>
}
