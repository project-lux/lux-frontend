import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addAqParamValue } from '../../redux/slices/advancedSearchSlice'
import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'
import { searchScope } from '../../config/searchTypes'
import { translate } from '../../lib/util/translate'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IToggleSearchButton {
  setIsError: (x: boolean) => void
  setShowModal?: (x: boolean) => void
}

/**
 * Button to switch between advanced search and simple search.
 * @param {(x: boolean) => void} setIsError callback function to set error message on the current search form
 * @param {boolean} isAiSearch boolean to determine if user has AI assisted search enabled
 * @param {(x: boolean) => void} setShowModal optional; only used when switching to simple search, set AlertModal showModal value
 * @returns {JSX.Element}
 */
const ToggleSearchButton: React.FC<IToggleSearchButton> = ({
  setIsError,
  setShowModal = () => null,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(search)
  // default to simple
  const searchType = urlParams.get('searchType') || 'simple'

  const simpleSearchState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const { value } = simpleSearchState
  const scope = searchScope[tab]

  const dispatch = useAppDispatch()

  const handleSwitchToAdvancedSearch = (): void => {
    const searchString = value || ''
    pushClientEvent('Search Switch', 'Selected', 'To Advanced Search')
    if (searchString === '') {
      dispatch(addAqParamValue({ scope, aqParamValue: '{}' }))
      urlParams.delete('sq')
      urlParams.set('searchType', 'advanced')
      navigate(`${pathname}?${urlParams.toString()}`)
      return
    }
    translate({
      query: searchString,
      scope,
      isAiSearch: false,
      onSuccess: (translatedString) => {
        const translatedObject = JSON.parse(translatedString)
        delete translatedObject._scope
        const noScopeJSON = JSON.stringify(translatedObject)
        dispatch(addAqParamValue({ scope, aqParamValue: noScopeJSON }))
        urlParams.delete('sq')
        urlParams.set('searchType', 'advanced')
        urlParams.set('q', noScopeJSON)
        urlParams.set('qt', tab)
        navigate(`${pathname}?${urlParams.toString()}`)
      },
      onError: () => setIsError(true),
      onLoading: () => null,
    })
  }

  const handleSwitchToSimpleSearch = (): void => {
    setShowModal(true)
  }

  const buttonText =
    searchType === 'advanced' || searchType === 'aiAssisted'
      ? 'Simple Search'
      : 'Advanced Search'

  return (
    <LinkButton
      variant="link"
      type="button"
      className="searchToggle"
      id="search-toggle"
      value="searchToggle"
      aria-label={`Switch to ${buttonText}`}
      onClick={() =>
        searchType === 'simple'
          ? handleSwitchToAdvancedSearch()
          : handleSwitchToSimpleSearch()
      }
      data-testid="search-toggle-button"
    >
      Switch to {buttonText}
    </LinkButton>
  )
}

export default ToggleSearchButton
