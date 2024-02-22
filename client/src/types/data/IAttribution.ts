import IAgent from './IAgent'
import IEntity from './IEntity'

export default interface IAttribution {
  assigned?: IEntity[]
  id?: string
  type: string
  carried_out_by?: IAgent[]
  _label?: string
}
