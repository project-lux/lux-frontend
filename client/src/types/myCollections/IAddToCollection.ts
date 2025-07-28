import IMyCollection from '../data/IMyCollection'

export interface IAddToCollection {
  collectionId: string
  collectionData: IMyCollection
  recordsToAdd: Array<string>
}
