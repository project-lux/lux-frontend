import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import { searchScope } from '../../config/searchTypes'
import { ResultsTab } from '../../types/ResultsTab'
import { tabToLinkLabel } from '../../config/results'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { isAdvancedSearch } from '../../lib/parse/search/estimatesParser'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { resetState } from '../../redux/slices/advancedSearchSlice'

import MobileTabButton from './MobileTabButton'

interface IProps {
  isSimpleSearch: boolean
  urlParams: URLSearchParams
  queryString: string
  search: string
  isSwitchToSimpleSearch: boolean
}

const getUrlState = (
  urlParams: URLSearchParams,
  currentTab: string,
): {
  qt: string
  facetRequest: boolean
} => {
  const qt = urlParams.get('qt') || currentTab
  const facetRequest = urlParams.get('facetRequest') === 'true'
  return {
    qt,
    facetRequest,
  }
}

const MobileNavigation: React.FC<IProps> = ({
  urlParams,
  isSwitchToSimpleSearch,
}) => {
  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  const dispatch = useAppDispatch()

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { qt } = getUrlState(urlParams, tab)
  const { searchType } = currentSearchState
  const advancedSearch = isAdvancedSearch(searchType)

  // set to estimates or set empty if no results
  const estimates: Record<string, number | string> = {
    objects: '-',
    works: '-',
    people: '-',
    places: '-',
    concepts: '-',
    events: '-',
  }

  const [show, setShow] = useState(false)

  const handleShow = (): void => {
    setShow(!show)
  }

  return (
    <React.Fragment>
      <MobileTabButton
        estimate={estimates[tab]}
        icon={getIcon(tabToLinkLabel[tab])}
        tab={tab}
        handleClick={handleShow}
        showArrow
      />
      <Modal show={show} animation={false} onHide={() => setShow(false)}>
        <Modal.Body>
          {Object.entries(searchScope).map(([key, value]) => (
            <Link
              key={key}
              to={`/view/results/${key}?${
                (advancedSearch && !urlParams.has('qt') && key !== qt) ||
                isSwitchToSimpleSearch
                  ? `${urlParams.toString()}&qt=${tab}`
                  : urlParams.toString()
              }`}
              onClick={() => {
                pushClientEvent('Results Tab', 'Selected', tabToLinkLabel[key])
                if (advancedSearch && key !== tab) {
                  dispatch(resetState())
                  dispatch(resetHelpTextState())
                }
              }}
              style={{
                marginRight: key !== 'events' ? '10px' : '0px',
              }}
              id={key}
              data-testid={`${key}-results-tab-button`}
            >
              <MobileTabButton
                estimate={estimates[key]}
                icon={value}
                tab={key}
                handleClick={() => null}
              />
            </Link>
          ))}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default MobileNavigation
