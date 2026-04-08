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
  oidcAuthority: string
  oidcClientId: string
  oidcRedirectUri: string
  featureMyCollections: boolean
}
