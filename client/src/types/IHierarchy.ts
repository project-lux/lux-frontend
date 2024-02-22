import IEntity from './data/IEntity'

export interface IHierarchy {
  current: IEntity
  parents: IEntity[]
  children: IEntity[]
}
