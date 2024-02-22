import IEntity from './IEntity'
import IObject from './IObject'
import IEvent from './IEvent'

export default interface IWork extends IEntity {
  about?: IEntity[]
  created_by?: IEvent
  members_exemplified_by?: IObject[]
}
