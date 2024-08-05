import { IAdvancedSearchConfigResponse } from '../types/IAdvancedSearchConfigResponse'

import * as localEnv from './localEnv'
import { IServerConfig } from './IServerConfig'
import {
  advancedSearch,
  IAdvancedSearchConfig,
} from './advancedSearch/advancedSearch'
import { IAat, defaultAats } from './aat'

class Config {
  env: IServerConfig

  hasLocalEnv = false

  aat: IAat = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  advancedSearch: IAdvancedSearchConfig = {}

  constructor() {
    this.env = {
      dataApiBaseUrl: localEnv.dataApiBaseUrl,
      facetsApiBaseUrl: localEnv.facetsApiBaseUrl,
      cmsApiBaseUrl: localEnv.cmsApiBaseUrl,
      maintenanceMode: localEnv.maintenanceMode,
      maintenanceMessage: localEnv.maintenanceMessage,
      luxEnv: localEnv.luxEnv,
      cacheViewerMode: localEnv.cacheViewerMode,
      wikidataImagePathname: localEnv.wikidataImagePathname,
      luxWikidataManifestPrefix: localEnv.luxWikidataManifestPrefix,
      luxFeedbackUrl: localEnv.luxFeedbackUrl,
      oidcAuthority: localEnv.oidcAuthority,
      oidcClientId: localEnv.oidcClientId,
      oidcRedirectUri: localEnv.oidcRedirectUri,
      myCollectionsUri: localEnv.myCollectionsUri,
    }
    this.hasLocalEnv =
      localEnv.dataApiBaseUrl !== '' && localEnv.cmsApiBaseUrl !== ''
    this.setDefaultAats(this.env.dataApiBaseUrl)
  }

  setServerConfig(data: IServerConfig): void {
    this.env = {
      dataApiBaseUrl: data.dataApiBaseUrl,
      facetsApiBaseUrl: data.facetsApiBaseUrl,
      cmsApiBaseUrl: data.cmsApiBaseUrl,
      maintenanceMode: data.maintenanceMode,
      maintenanceMessage: data.maintenanceMessage,
      luxEnv: data.luxEnv,
      cacheViewerMode: data.cacheViewerMode,
      wikidataImagePathname: data.wikidataImagePathname,
      luxWikidataManifestPrefix: data.luxWikidataManifestPrefix,
      luxFeedbackUrl: data.luxFeedbackUrl,
      oidcAuthority: data.oidcAuthority,
      oidcClientId: data.oidcClientId,
      oidcRedirectUri: data.oidcRedirectUri,
      myCollectionsUri: data.myCollectionsUri,
    }
  }

  setDefaultAats(baseUrl: string): void {
    this.aat = defaultAats()
  }

  setAats(data: IAat): void {
    // Default must be set again with the new base URL from the server
    this.setDefaultAats(this.env.dataApiBaseUrl)

    this.aat = { ...this.aat, ...data }
  }

  setDefaultAdvancedSearchConfig(): void {
    this.advancedSearch = advancedSearch()
  }

  setAdvancedSearch(data: IAdvancedSearchConfigResponse): void {
    this.setDefaultAdvancedSearchConfig()
    this.advancedSearch = {
      ...this.advancedSearch,
      ...data,
    }
  }
}

const config = new Config()

export const getDataApiBaseUrl = (): string => config.env.dataApiBaseUrl
export const getFacetsApiBaseUrl = (): string => config.env.facetsApiBaseUrl
export const getCmsApiBaseUrl = (): string => config.env.cmsApiBaseUrl
export const getOidcAuthority = (): string => config.env.oidcAuthority
export const getOidcClientId = (): string => config.env.oidcClientId
export const getOidcRedirectUri = (): string => config.env.oidcRedirectUri

export default config
