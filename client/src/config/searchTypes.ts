/**
 * Various mapping scenarios for retrieving and rendering data in React components.
 */

/**
 * Object containing a mapping of the entity types to their corresponding data types.
 * This is used to route users to the appropriate view/component.
 */
export const searchTypes: Record<string, string> = {
  objects: 'HumanMadeObject,DigitalObject',
  works: 'LinguisticObject,VisualItem,Set',
  people: 'Person,Group',
  places: 'Place',
  concepts: 'Currency,Language,Material,MeasurementUnit,Type',
  events: 'Activity,Period,Event',
  all: 'HumanMadeObject,DigitalObject,LinguisticObject,VisualItem,Set,Person,Group,Place,Currency,Language,Material,MeasurementUnit,Type,Activity,Period',
}

/**
 * MarkLogic requires the following mapped object to determine the correct tab to MarkLogic data type.
 * Several functions depend on the values of this object to all be strings with unique first characters
 */
export const searchScope: Record<string, string> = {
  objects: 'item',
  works: 'work',
  people: 'agent',
  places: 'place',
  concepts: 'concept',
  events: 'event',
}

/**
 * The inverse of the searchScope object.
 * Used for mapping results that are facets.
 */
export const scopeToTabTranslation: Record<string, string> = {
  item: 'objects',
  work: 'works',
  agent: 'people',
  place: 'places',
  concept: 'concepts',
  event: 'events',
}

/**
 * Maps the results tab type to the appropriate Advanced Search header text.
 */
export const advancedSearchTitles: Record<string, string> = {
  objects: 'Objects',
  works: 'Works',
  people: 'People & Groups',
  places: 'Places',
  concepts: 'Concepts',
  events: 'Events',
}

/**
 * Used in advanced search for aria-labels based on the current advanced search row's scope.
 */
export const scopeToAriaLabel: Record<string, string> = {
  item: 'objects',
  work: 'works',
  agent: 'people and groups',
  place: 'places',
  concept: 'concepts',
  event: 'events',
}
