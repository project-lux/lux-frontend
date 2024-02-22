import IConcept from './IConcept'
import IEntity from './IEntity'
import IIdentifier from './IIdentifier'

export default interface ILinguisticObject extends IEntity {
  content?: string
  language?: IConcept[]
  identified_by?: IIdentifier[]
  format?: string
}
