/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import StyledSearchButtonRow from '../../styles/features/common/SearchButtonRow'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { searchScope } from '../../config/searchTypes'
import { pushClientEvent } from '../../lib/pushClientEvent'
import config from '../../config/config'

import ResultSnippet from './ResultSnippet'

interface IObjectsBy {
  uri: string // URI which is the argument of the search tag
  tab: string // scope - "objects", "works", etc
  title: string // the title of the current tab
}

export const resultsData = (
  orderedItems: Array<IOrderedItems>,
  tab: string,
  title: string,
): any =>
  orderedItems.slice(0, 5).map((item) => {
    const { id } = item
    return (
      <Row key={id}>
        <Col xs={12}>{ResultSnippet(id, tab, title)}</Col>
      </Row>
    )
  })

/**
 * Returns list of results snippets showing related objects or works
 * @param {string} uri the HAL link to retrieve the related data
 * @param {string} tab the results tab to redirect to when a user selects Show all X results
 * @returns {JSX.Element}
 */
const ObjectsContainer: React.FC<IObjectsBy> = ({ uri, tab, title }) => {
  // get relationship data
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri,
    },
  )

  if (isError && !config.env.luxEnv.includes('production')) {
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
          {resultsData(orderedItems, tab, title)}
          <StyledSearchButtonRow className="p-2">
            <Col xs={12}>
              <PrimaryButton
                variant="link"
                className="searchResultLink"
                href={`/view/results/${tab}?${formatHalLink(
                  uri,
                  searchScope[tab],
                )}&searchLink=true`}
                onClick={() =>
                  pushClientEvent('Search Link', 'Selected', `Tab ${title}`)
                }
                data-testid="objects-container-show-all-button"
              >
                Show all {estimate} result
                {estimate !== 1 && `s`}
              </PrimaryButton>
            </Col>
          </StyledSearchButtonRow>
        </React.Fragment>
      )
    }
    return <p>There are no related entities to be displayed.</p>
  }

  return <p>No results were returned with this entity.</p>
}

export default ObjectsContainer
