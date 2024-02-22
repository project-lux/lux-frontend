import IEntity from './IEntity'
import IDigitalObject from './IDigitalObject'
import IEvent from './IEvent'

export default interface IVisualItem extends IEntity {
  created_by?: IEvent
  digitally_shown_by?: IDigitalObject[]
}
