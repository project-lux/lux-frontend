import IEntity from './IEntity'

export default interface IPlace extends IEntity {
  id: string
  type: string
  _label?: string
  defined_by?: string
}
