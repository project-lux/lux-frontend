import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { searchScope } from '../../config/searchTypes'
import { ResultsTab } from '../../types/ResultsTab'
import { tabToLinkLabel } from '../../config/results'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import {
  defaultEstimates,
  isAdvancedSearch,
  isSimpleSearch,
  redirectToTabWithResults,
} from '../../lib/parse/search/estimatesParser'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { useGetEstimatesQuery } from '../../redux/api/ml_api'
import {
  getFacetParamsForAdvancedSearchEstimatesRequest,
  getFacetParamsForSimpleSearchEstimatesRequest,
  getUrlState,
} from '../../lib/util/params'

import MobileTabButton from './MobileTabButton'

interface IProps {
  isSimpleSearch: boolean
  urlParams: URLSearchParams
  queryString: string
  search: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criteria: any
  isSwitchToSimpleSearch: boolean
}

const MobileNavigation: React.FC<IProps> = ({
  urlParams,
  criteria,
  search,
  isSwitchToSimpleSearch,
}) => {
  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: { [key: string]: boolean }
  }

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { qt, facetRequest } = getUrlState(urlParams, tab)
  const { searchType } = currentSearchState
  const advancedSearch = isAdvancedSearch(searchType)
  const simpleSearch = isSimpleSearch(searchType)
  const hasCriteria = criteria !== null && criteria !== undefined

  // Simple search estimates request
  const params =
    simpleSearch && !isSwitchToSimpleSearch
      ? getFacetParamsForSimpleSearchEstimatesRequest(criteria, urlParams)
      : getFacetParamsForAdvancedSearchEstimatesRequest(criteria, urlParams, qt)

  const { data, isSuccess, isFetching, isLoading, isError } =
    useGetEstimatesQuery(
      {
        searchType,
        facetRequest,
        qt,
        params,
        isSwitchToSimpleSearch,
      },
      {
        skip: !hasCriteria,
      },
    )

  // set to estimates or set empty if no results
  const estimates: Record<string, number | string> = defaultEstimates(
    isSuccess,
    data,
  )

  // If performing a simple search, check if the current tab has results
  if (simpleSearch && !isError) {
    if (estimates[tab] === 0) {
      const tabWithResults = redirectToTabWithResults(data, state, tab)
      if (tabWithResults !== null) {
        navigate({
          pathname: pathname.replace(tab, tabWithResults),
          search,
        })
      }
    }
  }

  const [show, setShow] = useState(false)

  const handleShow = (): void => {
    setShow(!show)
  }

  const handleOnLinkSelect = (key: string): void => {
    pushClientEvent('Results Tab', 'Selected', tabToLinkLabel[key])
    if (advancedSearch && key !== tab) {
      dispatch(resetState())
      dispatch(resetHelpTextState())
    }
    setShow(false)
    navigate(
      `/view/results/${key}?${
        (advancedSearch && !urlParams.has('qt') && key !== qt) ||
        isSwitchToSimpleSearch
          ? `${urlParams.toString()}&qt=${tab}`
          : urlParams.toString()
      }`,
    )
  }

  const handleModalStateOnWindowResize = (isMobile: boolean): void => {
    if (!isMobile) {
      setShow(false)
    }
  }

  useResizeableWindow(handleModalStateOnWindowResize)

  return (
    <React.Fragment>
      <MobileTabButton
        requestState={{
          isLoading,
          isFetching,
        }}
        role="button"
        estimate={estimates[tab]}
        icon={getIcon(tabToLinkLabel[tab])}
        tab={tab}
        handleClick={handleShow}
        showArrow
      />
      <Modal show={show} animation={false} onHide={() => setShow(false)}>
        <Modal.Body>
          {Object.entries(searchScope).map(([key, value]) => (
            <MobileTabButton
              role="link"
              requestState={{
                isLoading,
                isFetching,
              }}
              estimate={estimates[key]}
              icon={value}
              tab={key}
              handleClick={() => handleOnLinkSelect(key)}
              isCurrentTab={tab === key}
            />
          ))}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default MobileNavigation
