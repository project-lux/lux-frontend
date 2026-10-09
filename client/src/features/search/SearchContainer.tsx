import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import theme from '../../styles/theme'
import { pushClientEvent } from '../../lib/pushClientEvent'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import AiToggleButton from '../aiAssistedSearch/AiToggleButton'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  OPT_IN_MODAL_CANCEL_BUTTON_TEXT,
  OPT_IN_MODAL_CONFIRM_BUTTON_TEXT,
  OPT_IN_MODAL_TEXT,
  OPT_IN_MODAL_TITLE,
  OPT_OUT_MODAL_TITLE,
  OPT_OUT_MODAL_TEXT,
  OPT_OUT_MODAL_CONFIRM_BUTTON_TEXT,
  OPT_OUT_MODAL_CANCEL_BUTTON_TEXT,
} from '../../config/aiAssistedSearch/variables'
import AlertModal from '../advancedSearch/AlertModal'
import { DEFAULT_PAGE_LENGTH, searchScope } from '../../config/searchTypes'
import { checkForStopWords, translate } from '../../lib/util/translate'
import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'
import { validateInput } from '../../lib/parse/search/searchBoxHelper'
import { changeIsAiSearch } from '../../redux/slices/currentSearchSlice'
import LinkDivider from '../../styles/features/search/LinkDivider'

import SearchBox from './SearchBox'
import ErrorMessage from './ErrorMessage'
import AdvancedSearchLink from './AdvancedSearchLink'

interface IProps {
  className: string
  id: string
  bgColor: string
  linkStyle?: {
    color: string
    textDecoration: string
  }
  isResultsPage?: boolean
  isStickyHeaderActive?: boolean
  isInHeader?: boolean
}

export const MAX_WORDS = 100

const SearchContainer: React.FC<IProps> = ({
  className,
  id,
  bgColor,
  linkStyle = {
    color: theme.color.link,
    textDecoration: 'none',
  },
  isResultsPage = false,
  isStickyHeaderActive = false,
  isInHeader = false,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'

  const [showModal, setShowModal] = useState<boolean>(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })
  const [aiDisambiguation, setAiDisambiguation] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Array<any>>([])

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)

  const currentState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )

  const handleCloseModal = (): void => {
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      isAiSearch ? 'Keep AI-Assisted Search' : 'Keep Standard Search',
    )
  }

  const handleAiSearchToggle = (): void => {
    const nextIsActive = !isAiSearch
    setIsAiSearch(nextIsActive)
    dispatch(changeIsAiSearch({ value: nextIsActive }))

    localStorage.setItem(
      AI_ASSISTED_SEARCH_STORAGE_KEY,
      JSON.stringify(nextIsActive),
    )
    if (isResultsPage) {
      const newUrlParams = new URLSearchParams(search)
      if (!newUrlParams.has('qt')) {
        newUrlParams.set('qt', tab)
      }
      navigate({
        pathname,
        search: `?${newUrlParams.toString()}`,
      })
    }
  }

  // Set both the local storage and the component state
  const handleConfirmToggleSwitch = (): void => {
    const isTurningAiSearchOn = !isAiSearch
    handleAiSearchToggle()
    if (isResultsPage && isTurningAiSearchOn && validateInput(currentState)) {
      translate({
        query: checkForStopWords(currentState.value!),
        isAiSearch: true,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          setAiDisambiguation(JSON.parse(translatedString))
          setIsSearchLoading(false)
          setIsError(false)
        },
        onError: () => {
          setIsSearchLoading(false)
          setIsError(true)
        },
        onLoading: () => setIsSearchLoading(true),
      })
    }
    pushClientEvent(
      'Search Switch',
      'Selected',
      isAiSearch ? 'Use Standard Search' : 'Use AI-Assisted Search',
    )
    setShowModal(false)
  }

  const handleToggle = (): void => {
    setShowModal(true)
  }

  useResizeableWindow(setIsMobile)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (validateInput(currentState)) {
      const valueToSubmit = checkForStopWords(currentState.value!)
      translate({
        query: valueToSubmit,
        isAiSearch,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          const newUrlParams = new URLSearchParams()
          let newTab = tab
          inputRef.current!.value = ''
          setIsError(false)
          setIsSearchLoading(false)
          pushClientEvent(
            'Search Button',
            'Submit',
            isAiSearch ? 'AI-Assisted Search' : 'Simple Search',
          )
          if (isAiSearch) {
            // Event to push the user's search string to the analytics site
            pushClientEvent('Search Button', 'Submit', valueToSubmit)
            setIsSearchLoading(false)
            const jsonTranslatedString = JSON.parse(translatedString)
            if (jsonTranslatedString.length > 0) {
              setAiDisambiguation(jsonTranslatedString)
              return
            } else {
              setIsError(true)
            }
          } else {
            const query = JSON.parse(translatedString)
            delete query._scope
            newUrlParams.set('q', JSON.stringify(query))
            newUrlParams.set('pageLength', DEFAULT_PAGE_LENGTH.toString())
            newUrlParams.set('sq', valueToSubmit)
            navigate(
              {
                pathname: `/view/results/${newTab}`,
                search: `${newUrlParams.toString()}`,
              },
              {
                state: {
                  fromNonResultsPage: !isResultsPage,
                },
              },
            )
          }
        },
        onError: () => {
          setIsSearchLoading(false)
          setIsError(true)
        },
        onLoading: () => setIsSearchLoading(true),
      })
    }
  }

  return (
    <Row
      className={`d-flex mx-0 ${className} ${isMobile ? 'py-1' : 'py-3'}`}
      style={{ backgroundColor: bgColor }}
      id={id}
    >
      {showModal && (
        <AlertModal
          showModal={showModal}
          onConfirm={handleConfirmToggleSwitch}
          onClose={handleCloseModal}
          title={isAiSearch ? OPT_OUT_MODAL_TITLE : OPT_IN_MODAL_TITLE}
          text={isAiSearch ? OPT_OUT_MODAL_TEXT : OPT_IN_MODAL_TEXT}
          confirmButtonText={
            isAiSearch
              ? OPT_OUT_MODAL_CONFIRM_BUTTON_TEXT
              : OPT_IN_MODAL_CONFIRM_BUTTON_TEXT
          }
          cancelButtonText={
            isAiSearch
              ? OPT_OUT_MODAL_CANCEL_BUTTON_TEXT
              : OPT_IN_MODAL_CANCEL_BUTTON_TEXT
          }
          confirmButtonDataTestId={
            isAiSearch
              ? 'use-standard-search-button'
              : 'use-ai-assisted-search-button'
          }
          cancelButtonDataTestId={
            isAiSearch
              ? 'keep-ai-assisted-search-button'
              : 'keep-standard-search-button'
          }
          modalDataTestId={
            isAiSearch ? 'ai-off-alert-modal' : 'ai-on-alert-modal'
          }
        />
      )}
      <Col xs={12}>
        {isError && <ErrorMessage onClose={setIsError} />}
        <SearchBox
          id={id}
          setIsError={setIsError}
          isResults={isResultsPage}
          submitForm={submitHandler}
          isSearchLoading={isSearchLoading}
          inputRef={inputRef}
          aiDisambiguation={aiDisambiguation}
          setAiDisambiguation={setAiDisambiguation}
        />
      </Col>
      <Col
        xs={12}
        className={`d-flex justify-content-center ${isResultsPage ? '' : 'mt-3'}`}
      >
        <div
          className={`d-inline-flex justify-content-${isResultsPage ? 'end' : 'center'} align-items-center`}
          style={{ width: theme.searchBox.width }}
        >
          {!isMobile && (
            <React.Fragment>
              <AdvancedSearchLink linkStyle={linkStyle} />
              <LinkDivider />
            </React.Fragment>
          )}
          <AiToggleButton
            linkStyle={linkStyle}
            isStickyHeaderActive={isStickyHeaderActive}
            isAiSearch={isAiSearch}
            handleToggle={isResultsPage ? handleToggle : handleAiSearchToggle}
            isInHeader={isInHeader}
          />
          <LinkDivider />
          <Link
            to="/content/simple-search"
            style={{
              ...linkStyle,
              fontWeight: '400',
              fontSize: '1rem',
            }}
            onClick={() =>
              pushClientEvent(
                'Internal Link',
                'Selected',
                'Internal Search Tips',
              )
            }
          >
            Search Tips
          </Link>
        </div>
      </Col>
    </Row>
  )
}

export default SearchContainer
