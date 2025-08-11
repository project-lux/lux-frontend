import IMyCollection from '../data/IMyCollection'

export interface IEditCollection {
  collectionId: string
  collectionData: IMyCollection
  recordsToAdd: Array<string>
}
