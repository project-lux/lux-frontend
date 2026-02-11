function getBool(s: string | undefined): boolean | null {
  if (s === undefined) {
    return null
  }
  return s.toLowerCase() === 'true'
}

function getInt(s: string | undefined): number | null {
  if (s === undefined) {
    return null
  }
  return parseInt(s, 10)
}

function getString(s: string | undefined): string | null {
  if (s === undefined) {
    return null
  }
  return s
}

export const port = getInt(process.env.APP_PORT) || 8088
export const numInstances = getInt(process.env.NUM_INSTANCES) || -1

export const dataApiBaseUrl = getString(process.env.DATA_API_BASE_URL)
export const cmsApiBaseUrl = getString(process.env.CMS_API_BASE_URL)
export const aiSearchApiBaseUrl = getString(process.env.AI_SEARCH_API_BASE_URL)

export const wikidataImagePathname = getString(
  process.env.WIKIDATA_IMAGE_PATHNAME,
)
export const luxWikidataManifestPrefix = getString(
  process.env.LUX_WIKIDATA_MANIFEST_PREFIX,
)
export const luxFeedbackUrl = getString(process.env.LUX_FEEDBACK_URL)
export const luxEnv = getString(process.env.LUX_ENVIRONMENT)
export const maintenanceMode = getBool(process.env.MAINTENANCE_MODE) || false
export const maintenanceMessage = getString(process.env.MAINTENANCE_MESSAGE)
export const cacheViewerMode = getBool(process.env.CACHE_VIEWER_MODE)

export const bugherdApiKey = getString(process.env.BUGHERD_API_KEY)

export const oidcAuthority = getString(process.env.OIDC_AUTHORITY)
export const oidcClientId = getString(process.env.OIDC_CLIENT_ID)
export const oidcRedirectUri = getString(process.env.OIDC_REDIRECT_URI)

export const featureMyCollections = getBool(process.env.FEATURE_MY_COLLECTIONS)
