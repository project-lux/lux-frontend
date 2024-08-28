/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'

/**
 * Reads the sorting config value and translates it for ML
 * @param sort string, config term to translate to a ML sort term
 * @returns string
 */
export const formatSortParameter = (sort: string | undefined): string => {
  if (sort === undefined) {
    return ''
  }

  if (sort.includes('Asc')) {
    return `${sort.replace('Asc', '')}:asc`
  }

  if (sort.includes('Desc')) {
    return `${sort.replace('Desc', '')}:desc`
  }

  if (sort === 'relevance') {
    return ''
  }

  return `${sort}`
}

/**
 * Checks if the previous search was from the landing page
 * @param {Record<string, boolean>} state the state passed via React Router, not Redux state
 * @returns {boolean}
 */
export const isFromLandingPage = (state: { [key: string]: boolean }): boolean =>
  state !== null && state !== undefined && state.fromLandingPage !== null
    ? state.fromLandingPage
    : false

/**
 * Formats the search link for the HAL links
 * @param {string} uri the HAL link
 * @returns {string}
 */
export const formatHalLink = (uri: string, mlScope: string): string =>
  uri.replace(`${config.env.dataApiBaseUrl}api/search/${mlScope}`, '')
