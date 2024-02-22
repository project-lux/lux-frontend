import IConcept from './IConcept'
import IEntity from './IEntity'

// type: 'MonetaryAmount'
export default interface IMonetaryAmount extends IEntity {
  value: number
  currency: IConcept
  upper_value_limit?: number
  lower_value_limit?: number
}
