import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { LinksContainerRow } from '../../styles/features/search/LinksContainerRow'
import theme from '../../styles/theme'
import ToggleSearchButton from '../advancedSearch/ToggleSearchButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import AiToggleButton from '../aiAssistedSearch/AiToggleButton'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'

import SearchBox from './SearchBox'
import ErrorMessage from './ErrorMessage'

const LinkDivider = styled.span`
  border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
  height: 1.25rem;
  margin: 0 1rem;
`

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
  const [isError, setIsError] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })

  // Set both the local storage and the component state
  const handleToggle = (): void => {
    const nextIsActive = !isAiSearch
    setIsAiSearch(nextIsActive)
    localStorage.setItem(
      AI_ASSISTED_SEARCH_STORAGE_KEY,
      JSON.stringify(nextIsActive),
    )
  }

  useResizeableWindow(setIsMobile)

  return (
    <Row
      className={`d-flex mx-0 ${className} ${isMobile ? 'py-1' : 'py-3'}`}
      style={{ backgroundColor: bgColor }}
      id={id}
    >
      <Col xs={12}>
        {isError && <ErrorMessage onClose={setIsError} />}
        <SearchBox
          id={id}
          setIsError={setIsError}
          isResults={isResultsPage}
          isAiSearch={isAiSearch}
        />
      </Col>
      {isResultsPage ? (
        <Col xs={12} className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-end align-items-center"
            style={{ width: theme.searchBox.width }}
          >
            <ToggleSearchButton setIsError={setIsError} />
            <LinkDivider />
            <AiToggleButton
              linkStyle={linkStyle}
              isStickyHeaderActive={isStickyHeaderActive}
              isAiSearch={isAiSearch}
              handleToggle={handleToggle}
            />
          </div>
        </Col>
      ) : (
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center mt-3"
        >
          <LinksContainerRow>
            <Col
              xs={12}
              className="d-inline-flex justify-content-center align-items-center"
            >
              <Link
                to={`/view/results?${isAiSearch ? `${AI_REFINEMENT_PARAM}=true` : ''}&${SEARCH_TYPE_PARAM}=advanced`}
                style={{
                  ...linkStyle,
                  fontWeight: '400',
                  fontSize: '1rem',
                }}
                onClick={() =>
                  pushClientEvent(
                    'Search Switch',
                    'Selected',
                    'To Advanced Search',
                  )
                }
              >
                Advanced Search
              </Link>
              <LinkDivider />
              <AiToggleButton
                linkStyle={linkStyle}
                isStickyHeaderActive={isStickyHeaderActive}
                isAiSearch={isAiSearch}
                handleToggle={handleToggle}
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
            </Col>
          </LinksContainerRow>
        </Col>
      )}
    </Row>
  )
}

export default SearchContainer
