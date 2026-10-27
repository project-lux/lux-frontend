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
  /** Enables AWS WAF silent browser verification when true. */
  useWafChallenge: boolean
  wafChallengeScriptUrl: string
  wafContactUrl: string
  /** Comma-separated cross-origin API origins that receive WAF tokens. */
  wafProtectedOrigins: string
}
