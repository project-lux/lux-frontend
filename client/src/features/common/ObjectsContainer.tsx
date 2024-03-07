/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import StyledSearchLink from '../../styles/shared/SearchLink'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import ObjectSnippet from '../results/ObjectSnippet'
import WorksSnippet from '../results/WorksSnippet'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { searchScope } from '../../config/searchTypes'

interface IObjectsBy {
  uri: string // URI which is the argument of the search tag
  tab: string // scope - "objects", "works", etc
}

export const getSnippet = (uri: string, tab: string): JSX.Element | null => {
  if (tab === 'objects') {
    return <ObjectSnippet uri={uri} view="list" />
  }

  if (tab === 'works') {
    return <WorksSnippet uri={uri} view="list" />
  }

  return null
}

export const resultsData = (
  orderedItems: Array<IOrderedItems>,
  tab: string,
): any =>
  orderedItems.slice(0, 5).map((item) => {
    const { id } = item
    return (
      <div key={id} className="row">
        <div className="col-12">{getSnippet(id, tab)}</div>
      </div>
    )
  })

/**
 * Returns list of results snippets showing related objects or works
 * @param {string} uri the HAL link to retrieve the related data
 * @param {string} tab the results tab to redirect to when a user selects Show all X results
 * @returns {JSX.Element}
 */
const ObjectsContainer: React.FC<IObjectsBy> = ({ uri, tab }) => {
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri,
    },
  )

  if (isError) {
    return <p>An error occurred fetching the data.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess && data) {
    const { orderedItems } = data as ISearchResults
    const estimate = getEstimates(data)

    if (estimate > 0) {
      return (
        <React.Fragment>
          {resultsData(orderedItems, tab)}
          <StyledSearchLink className="row p-2">
            <div className="col-12">
              <PrimaryButton
                variant="link"
                href={`/view/results/${tab}${formatHalLink(
                  uri,
                  searchScope[tab],
                )}&openSearch=false`}
                data-testid="objects-container-show-all-button"
              >
                Show all {estimate} result
                {estimate !== 1 && `s`}
              </PrimaryButton>
            </div>
          </StyledSearchLink>
        </React.Fragment>
      )
    }
    return <p>There are no related entities to be displayed.</p>
  }

  return <p>No results were returned with this entity.</p>
}

export default ObjectsContainer
