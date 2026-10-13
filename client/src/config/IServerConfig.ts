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
  /** Comma-separated origins allowed to request search broadcasts. */
  broadcastSearchAllowedOrigins: string
}
