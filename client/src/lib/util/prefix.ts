import { getDataApiBaseUrl } from '../../config/config'

export const PROD_LUX_BASE_URL = 'https://lux.collections.yale.edu/'
export const getLuxDataPrefix = (): string => `${getDataApiBaseUrl()}data/`
export const getLuxProdDataPrefix = (): string => `${PROD_LUX_BASE_URL}data/`
