/**
 * Values in this modules must be used ONLY for setting the default config.env
 * values, which will be overwritten by values retrieved from the server
 * except for some local development use cases. All other code should access
 * config/config.ts directly.
 */

function getBoolean(s: string | undefined): boolean {
  if (s === undefined) {
    return false
  }
  return s.toLowerCase() === 'true'
}

function getString(s: string | undefined): string {
  if (s === undefined) {
    return ''
  }
  return s.trim()
}

export const dataApiBaseUrl = getString(import.meta.env.REACT_APP_API_BASE_URL)
export const cmsApiBaseUrl = getString(
  import.meta.env.REACT_APP_CMS_API_BASE_URL,
)
export const maintenanceMode = getBoolean(
  import.meta.env.REACT_APP_MAINTENANCE_MODE,
)
export const maintenanceMessage = getString(
  import.meta.env.REACT_APP_MAINTENANCE_MESSAGE,
)
export const luxEnv = getString(import.meta.env.REACT_APP_LUX_ENV)
export const cacheViewerMode = getBoolean(
  import.meta.env.REACT_APP_CACHE_VIEWER_MODE,
)
export const wikidataImagePathname = getString(
  import.meta.env.REACT_APP_WIKIDATA_IMAGE_PATHNAME,
)
export const luxWikidataManifestPrefix = getString(
  import.meta.env.REACT_APP_LUX_WIKIDATA_MANIFEST_PREFIX,
)
export const luxFeedbackUrl = getString(
  import.meta.env.REACT_APP_LUX_FEEDBACK_URL,
)
export const bugherdApiKey = getString(
  import.meta.env.REACT_APP_BUGHERD_API_KEY,
)
export const oidcAuthority = getString(import.meta.env.REACT_APP_OIDC_AUTHORITY)
export const oidcClientId = getString(import.meta.env.REACT_APP_OIDC_CLIENT_ID)
export const oidcRedirectUri = getString(
  import.meta.env.REACT_APP_OIDC_REDIRECT_URI,
)
export const myCollectionsUri = getString(
  import.meta.env.REACT_APP_MY_COLLECTIONS_URI,
)

export const featureMyCollections = getBoolean(
  import.meta.env.REACT_APP_FEATURE_MY_COLLECTIONS,
)
