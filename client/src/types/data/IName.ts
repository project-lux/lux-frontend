import IConcept from './IConcept'
import IEntity from './IEntity'

export default interface IName extends IEntity {
  content: string
  language?: IConcept[]
  part?: IName[]
}
