import IAgent from './IAgent'
import IEntity from './IEntity'
import IPlace from './IPlace'
import ITimeSpan from './ITimeSpan'

// type: 'Activity' | 'Creation' | 'Event'
export default interface IEvent extends IEntity {
  assigned?: IEvent[]
  assigned_by?: IEntity[]
  attributed_by?: IEvent[]
  carried_out_by?: IAgent[]
  caused_by?: IEvent[]
  influenced_by?: IEntity[]
  occurred_during?: IEntity[]
  part?: IEvent[]
  part_of?: IEntity[]
  referred_to_by?: IEntity[]
  technique?: IEntity[]
  timespan?: ITimeSpan
  transferred_title_of?: IEntity[]
  took_place_at?: IPlace[]
  used_specific_object?: IEntity[]
}
