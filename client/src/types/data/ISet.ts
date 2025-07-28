import IEntity from './IEntity'
import IObject from './IObject'
import IEvent from './IEvent'

export default interface ISet extends IEntity {
  containing?: Array<IEntity>
  created_by?: IEvent
  member_of?: ISet[]
  members_exemplified_by?: IObject[]
}
