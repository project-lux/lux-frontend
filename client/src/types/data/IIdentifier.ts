import IAttributeAssignment from './IAttributeAssignment'
import IAttribution from './IAttribution'
import IConcept from './IConcept'
import IEntity from './IEntity'

// type: Identifier
export default interface IIdentifier extends IEntity {
  content?: string
  language?: IConcept[]
  assigned_by?: IAttributeAssignment[]
  attributed_by?: IAttribution[]
}
