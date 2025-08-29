export const primaryNameUuid =
  'data/concept/f7ef5bb4-e7fb-443d-9c6b-371a23e717ec'

export const commonClassifications: Record<string, string> = {
  [primaryNameUuid]: 'Primary Name (Default)',
  ['data/concept/ab99d278-9323-4d84-8e97-1846058fc587']: 'Secondary Name',
}

export const collectionClassifications: Record<string, string> = {
  // TODO: change once the concept record is created
  'https://todo.concept.my.collection': 'Personal Collection',
  ['data/concept/b84791d3-5de0-4a91-ae01-606986992527']: 'Research',
  ['data/concept/86e2cdb0-e84a-46fe-89cd-fb344228f359']: 'Exhibitions',
}

// TODO: edit once there is a solid list of classifications
export const noteClassifications: Record<string, string> = {
  // TODO: change once the concept record is created
  ['data/concept/317cb8e3-4b69-4b03-962d-e6f8b1d46c72']: 'Abstract',
  ['data/concept/53922f57-dab5-43c5-a527-fc20a63fe128']: 'Extent',
  ['data/concept/54e35d81-9548-4b4e-8973-de02b09bf9da']: 'Display Biography',
}
