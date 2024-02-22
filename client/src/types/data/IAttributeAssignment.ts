import IEvent from './IEvent'

// type: AttributeAssignment
export default interface IAttributeAssignment extends IEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assigned_properties?: string
}
