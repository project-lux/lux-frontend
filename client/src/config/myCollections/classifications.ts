import config from '../config'

export const commonClassifications: Record<string, string> = {
  [`${config.env.dataApiBaseUrl}data/concept/f7ef5bb4-e7fb-443d-9c6b-371a23e717ec`]:
    'Primary Name',
  [`${config.env.dataApiBaseUrl}data/concept/ab99d278-9323-4d84-8e97-1846058fc587`]:
    'Secondary Name',
}

export const collectionClassifications: Record<string, string> = {
  // TODO: change once the concept record is created
  [`${config.env.dataApiBaseUrl}data/concept/personal-collection-uuid`]:
    'Personal Collection',
  [`${config.env.dataApiBaseUrl}data/concept/b84791d3-5de0-4a91-ae01-606986992527`]:
    'Research',
  [`${config.env.dataApiBaseUrl}data/concept/86e2cdb0-e84a-46fe-89cd-fb344228f359`]:
    'Exhibitions',
}
