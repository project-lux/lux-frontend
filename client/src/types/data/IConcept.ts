import IEntity from './IEntity'

// type: 'Currency' | 'Language' | 'Material' | 'MeasurementUnit' | 'Type'
export default interface IConcept extends IEntity {
  broader?: IConcept[]
  created_by?: IEntity
}
