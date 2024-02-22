/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import StyledSearchLink from '../../styles/shared/SearchLink'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
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

const getSnippet = (
  uri: string,
  tab: string,
  index: number,
): JSX.Element | null => {
  if (tab === 'objects') {
    return <ObjectSnippet uri={uri} view="list" />
  }

  if (tab === 'works') {
    return <WorksSnippet uri={uri} view="list" />
  }

  return null
}

const resultsData = (orderedItems: Array<IOrderedItems>, tab: string): any =>
  orderedItems.slice(0, 5).map((item, ind) => {
    const { id } = item
    return (
      <div key={id} className="row">
        <div className="col-12">{getSnippet(id, tab, ind + 1)}</div>
      </div>
    )
  })

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

    return (
      <StyledEntityPageSection style={{ paddingTop: 0 }}>
        {estimate > 0 ? (
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
        ) : (
          <p>There are no related entities to be displayed.</p>
        )}
      </StyledEntityPageSection>
    )
  }

  return <p>No results were returned with this entity.</p>
}

export default ObjectsContainer
