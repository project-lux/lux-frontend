import IAttributeAssignment from './IAttributeAssignment'
import IConcept from './IConcept'
import IEntity from './IEntity'

// type: Dimension
export default interface IDimension extends IEntity {
  unit: IConcept
  value: number
  upper_value_limit?: number
  lower_value_limit?: number
  assigned_by?: IAttributeAssignment[]
}
