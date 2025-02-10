/**
 * Configuration required for sorting results on the results page.
 * Each results page has its own sorting options.
 */

export const sortBy: { [key: string]: Record<string, string> } = {
  objects: {
    anySortName: 'Title/Label',
    itemProductionDate: 'Creation Date',
    itemEncounteredDate: 'Encounter Date',
    itemDimensionValue: 'Any Dimension',
    itemDepthDimensionValue: 'Depth',
    itemHeightDimensionValue: 'Height',
    itemWidthDimensionValue: 'Width',
    itemClassificationConceptName: 'Categorized As',
    itemEncounterPlaceName: 'Encountered At',
    itemEncounterAgentName: 'Encountered By',
    itemProductionInfluencedByAgentName: 'Influenced By',
    itemMaterialConceptName: 'Materials',
    itemProductionPlaceName: 'Produced At',
    itemProductionAgentName: 'Produced By',
    itemTechniqueConceptName: 'Technique',
    itemHasDigitalImage: 'Has Digital Image',
    itemRecordType: 'Object Class',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  works: {
    anySortName: 'Title/Label',
    random: 'Shuffle Results',
    relevance: 'Relevance',
    workCreationDate: 'Created Date',
    workPublicationDate: 'Published Date',
    workClassificationConceptName: 'Categorized As',
    workCreationAgentName: 'Created By',
    workPublicationPlaceName: 'Published At',
    workPublicationAgentName: 'Published By',
    workHasDigitalImage: 'Has Digital Image',
    workRecordType: 'Work Class',
  },
  // TODO: this is a place holder, remove at later date
  collections: {
    anySortName: 'Name',
  },
  people: {
    anySortName: 'Name',
    agentEndDate: 'Died/Dissolved Date',
    agentStartDate: 'Born/Formed Date',
    agentHasDigitalImage: 'Has Digital Image',
    agentRecordType: 'Person/Group Class',
    agentStartPlaceName: 'Born/Formed At',
    agentClassificationConceptName: 'Categorized As',
    agentEndPlaceName: 'Died/Dissolved At',
    agentGenderConceptName: 'Gender',
    agentNationalityConceptName: 'Nationality',
    agentOccupationConceptName: 'Occupation',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  places: {
    anySortName: 'Name',
    placeHasDigitalImage: 'Has Digital Image',
    placeClassificationConceptName: 'Categorized As',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  concepts: {
    anySortName: 'Name',
    conceptRecordType: 'Concept Class',
    conceptClassificationConceptName: 'Categorized As',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
  events: {
    anySortName: 'Title/Label',
    eventStartDate: 'Start Date',
    eventEndDate: 'End Date',
    eventRecordType: 'Event Class',
    eventCarriedOutByAgentName: 'Carried Out By',
    eventClassificationConceptName: 'Categorized As',
    eventTookPlaceAtPlaceName: 'Took Place At',
    random: 'Shuffle Results',
    relevance: 'Relevance',
  },
}

export const sortDirection: Record<string, string> = {
  asc: 'asc',
  desc: 'desc',
}
