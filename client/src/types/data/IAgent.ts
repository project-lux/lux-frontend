import IEntity from './IEntity'
import IEvent from './IEvent'

// Group or Person
export default interface IAgent extends IEntity {
  born?: IEvent
  died?: IEvent
  carried_out?: IEvent[]
  dissolved_by?: IEvent
  formed_by?: IEvent
  residence?: IEntity[]
}
