export interface IServerConfig {
  dataApiBaseUrl: string
  facetsApiBaseUrl: string
  cmsApiBaseUrl: string
  maintenanceMode: boolean
  maintenanceMessage: string
  luxEnv: string
  cacheViewerMode: boolean
  wikidataImagePathname: string
  luxWikidataManifestPrefix: string
  luxFeedbackUrl: string
}
