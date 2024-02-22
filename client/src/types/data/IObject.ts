import IDigitalObject from './IDigitalObject'
import IEntity from './IEntity'
import IEvent from './IEvent'

export default interface IObject extends IEntity {
  access_point?: IEntity[]
  carries?: IEntity[]
  created_by?: IEvent
  current_location?: IEntity[]
  digitally_carried_by?: IDigitalObject[]
  digitally_carries?: IEntity[]
  digitally_shows?: IEntity[]
  encountered_by?: IEvent[]
  made_of?: IEntity[]
  part_of?: IEntity[]
  produced_by?: IEvent
  used_for?: IEvent[]
  shows?: IEntity[]
}
