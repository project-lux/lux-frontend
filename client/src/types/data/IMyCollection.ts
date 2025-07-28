import IEntity from './IEntity'
import ISet from './ISet'

export default interface IMyCollection extends ISet {
  containing?: Array<IEntity>
}
