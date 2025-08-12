import IEntity from './IEntity'

export default interface IPlace extends IEntity {
  type: string
  _label?: string
  defined_by?: string
}
