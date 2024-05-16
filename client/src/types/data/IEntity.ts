import IAttribution from './IAttribution'
import IConcept from './IConcept'
import IDigitalObject from './IDigitalObject'
import IDimension from './IDimension'
import IIdentification from './IIdentifier'
import IEvent from './IEvent'
import ILinguisticObject from './ILinguisticObject'
import ILinks from './ILinks'
import IName from './IName'
import IObject from './IObject'
import IVisualItem from './IVisualItem'

// IEntity is used both
// (1) as a base type that other entities extend, and
// (2) a general entity type to use when it's not clear which concrete
// type is applicable.
export default interface IEntity {
  id?: string
  type: string

  '@context'?: string
  _label?: string
  _links?: ILinks

  about?: IEntity[]
  assigned_by?: IEntity[]
  attributed_by?: IAttribution[]
  classified_as?: IConcept[]
  conforms_to?: IEntity[]
  _content_html?: string
  content?: string
  digitally_shown_by?: IDigitalObject[]
  dimension?: IDimension[]
  equivalent?: IEntity[]
  identified_by?: (IName | IIdentification)[]
  influenced_by?: IEntity[]
  language?: IConcept[]
  member_of?: IEntity[]
  part_of?: IEntity[]
  referred_to_by?: ILinguisticObject[]
  representation?: IVisualItem[]
  represents?: IEntity[]
  subject_of?: IObject[]
  subject_to?: IEntity[]
  used_for?: IEvent[]
}
