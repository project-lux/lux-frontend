import IEntity from './IEntity'
import IObject from './IObject'

export default interface IDigitalObject extends IObject {
  access_point?: IEntity[]
  digitally_carries?: IObject[]
  digitally_shows?: IEntity[]
  format?: string
}
