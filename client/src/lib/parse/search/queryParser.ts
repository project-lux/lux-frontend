/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { searchScope } from '../../../config/searchTypes'
import { ArrayOfOneOrMore } from '../../../types/ArrayOfOneOrMore'
import { ISearchParams } from '../../../types/IMlApiParams'
import { formatYear } from '../../facets/dateParser'

// FIXME: remove
export const formatSearchRequestUrl = (
  requestedQueries: ArrayOfOneOrMore<string>,
  uri: string,
  facets: string,
  facetsOnly: boolean,
  urlPrefix: string,
): string => {
  const numberOfQueries = requestedQueries.length
  // open parentheses is required in order for ML to
  // properly read the search string as (a OR b) AND c
  let url = `${urlPrefix}?q=(`
  if (numberOfQueries === 1) {
    return `${url}${requestedQueries[0]}:("${uri}"))${facets}&facetsOnly=${facetsOnly}`
    // else numberOfQueries is > 1
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfQueries - 1; i++) {
    url += `${requestedQueries[i]}:("${uri}") OR `
  }
  url += `${
    requestedQueries[numberOfQueries - 1]
  }:("${uri}"))${facets}&facetsOnly=${facetsOnly}`

  return url
}

// Transforms the frontend URL into the Marklogic
// accepted API request
/**
 * @param searchParams URL params
 * @returns string
 */
// FIXME: remove
export const formatFacetSearchRequestUrl = (
  searchParams: ISearchParams,
): string => {
  let formatMarklogicFacets = ''

  Object.keys(searchParams.facets).forEach((key) => {
    if (key.includes('Date')) {
      const [earliest, latest] = searchParams.facets[key].split(' to ')
      formatMarklogicFacets += ` (${key} GE "${formatYear(
        earliest,
      )}" AND ${key} LE "${formatYear(latest)}") `
    } else {
      const itemIds = searchParams.facets[key].split(',')
      itemIds.forEach((itemId) => {
        formatMarklogicFacets += `${key}:(${itemId}) `
      })
    }
  })

  return formatMarklogicFacets
}

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

// Gets the scope of the search based on the passed in tab
/**
 * @param currentTab string
 * @returns string
 */
export const getScope = (currentTab: string | undefined): string => {
  if (currentTab === undefined) {
    return ''
  }
  const paramString = '&scope='
  let scope = ''
  switch (currentTab) {
    case 'objects':
      scope = `${paramString}${searchScope.objects}`
      break
    case 'works':
      scope = `${paramString}${searchScope.works}`
      break
    case 'people':
      scope = `${paramString}${searchScope.people}`
      break
    case 'places':
      scope = `${paramString}${searchScope.places}`
      break
    case 'concepts':
      scope = `${paramString}${searchScope.concepts}`
      break
    case 'events':
      scope = `${paramString}${searchScope.events}`
      break
    default:
      scope = ''
      break
  }
  return scope
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

/**
 * Returns scope of a search term for links in QueryRelationsList
 * @param uri string; the HAL link
 * @returns string | null; scope of search term
 */
export const getQueryRelationsListLink = (uri: string): string | null => {
  if (uri.includes('person') || uri.includes('group')) {
    return 'Agent'
  }

  if (uri.includes('concept')) {
    return 'Concept'
  }

  if (uri.includes('place')) {
    return 'Place'
  }

  return null
}
