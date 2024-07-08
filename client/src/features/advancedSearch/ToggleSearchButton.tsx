import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addAqParamValue } from '../../redux/slices/advancedSearchSlice'
import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'
import { searchScope } from '../../config/searchTypes'
import { translate } from '../../lib/util/translate'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import {
  ICurrentSearchState,
  updateCurrentSearchState,
} from '../../redux/slices/currentSearchSlice'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IToggleSearchButton {
  setIsError: (x: boolean) => void
  setShowModal?: (x: boolean) => void
}

/**
 * Button to switch between advanced search and simple search.
 * @param {(x: boolean) => void} setIsError callback function to set error message on the current search form
 * @param {(x: boolean) => void} setShowModal optional; only used when switching to simple search, set AlertModal showModal value
 * @returns {JSX.Element}
 */
const ToggleButton: React.FC<IToggleSearchButton> = ({
  setIsError,
  setShowModal = () => null,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(search)

  const simpleSearchState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const { value } = simpleSearchState
  const scope = searchScope[tab]

  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  const dispatch = useAppDispatch()

  const handleSwitchToAdvancedSearch = (): void => {
    const searchString = value || ''
    pushClientEvent('Search Switch', 'Selected', 'To Advanced Search')
    if (searchString === '') {
      dispatch(addAqParamValue({ scope, aqParamValue: '{}' }))
      dispatch(updateCurrentSearchState({ value: 'advanced' }))
      urlParams.delete('sq')
      navigate(`${pathname}?${urlParams.toString()}`, {
        state: { targetName: 'Results Page' },
      })
      return
    }
    translate({
      query: searchString,
      scope,
      onSuccess: (translatedString) => {
        dispatch(updateCurrentSearchState({ value: 'advanced' }))
        const translatedObject = JSON.parse(translatedString)
        delete translatedObject._scope
        const noScopeJSON = JSON.stringify(translatedObject)
        dispatch(addAqParamValue({ scope, aqParamValue: noScopeJSON }))
        urlParams.delete('sq')
        urlParams.set('q', noScopeJSON)
        navigate(`${pathname}?${urlParams.toString()}`, {
          state: { targetName: 'Results Page' },
        })
      },
      onError: () => setIsError(true),
      onLoading: () => null,
    })
  }

  const handleSwitchToSimpleSearch = (): void => {
    setShowModal(true)
  }

  const buttonText =
    currentSearchState.searchType === 'advanced'
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
        currentSearchState.searchType === 'simple'
          ? handleSwitchToAdvancedSearch()
          : handleSwitchToSimpleSearch()
      }
      data-testid="search-toggle-button"
    >
      Switch to {buttonText}
    </LinkButton>
  )
}

export default ToggleButton
