import IEntity from './IEntity'
import IEvent from './IEvent'
import ISet from './ISet'

export default interface IMyCollection extends ISet {
  containing?: Array<IEntity>
  added_to_by?: Array<IEvent>
}
