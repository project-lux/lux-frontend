import { IAdvancedSearchConfigResponse } from '../types/IAdvancedSearchConfigResponse'

import * as localEnv from './localEnv'
import { IServerConfig } from './IServerConfig'
import { IDataConstants, defaultConstants } from './dataConstants'
import {
  advancedSearch,
  IAdvancedSearchConfig,
} from './advancedSearch/advancedSearch'

class Config {
  env: IServerConfig

  hasLocalEnv = false

  dc: IDataConstants = {}

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
    }
    this.hasLocalEnv =
      localEnv.dataApiBaseUrl !== '' && localEnv.cmsApiBaseUrl !== ''
    this.setDefaultDataConstants(this.env.dataApiBaseUrl)
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
    }
  }

  setDefaultDataConstants(baseUrl: string): void {
    this.dc = defaultConstants(`${baseUrl}`)
  }

  setDataConstants(data: IDataConstants): void {
    // Default must be set again with the new base URL from the server
    this.setDefaultDataConstants(this.env.dataApiBaseUrl)

    this.dc = { ...this.dc, ...data }
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

export default config
