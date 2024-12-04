import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  return (
    <React.Fragment>
      <MobileTabButton
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
