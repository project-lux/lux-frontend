export interface IServerConfig {
  dataApiBaseUrl: string
  cmsApiBaseUrl: string
  maintenanceMode: boolean
  maintenanceMessage: string
  luxEnv: string
  cacheViewerMode: boolean
  wikidataImagePathname: string
  luxWikidataManifestPrefix: string
  luxFeedbackUrl: string
  bugherdApiKey: string
  oidcAuthority: string
  oidcClientId: string
  oidcRedirectUri: string
  featureMyCollections: boolean
}
