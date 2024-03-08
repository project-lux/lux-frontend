import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'

import { LinksContainerRow } from '../../styles/features/search/LinksContainerRow'
import theme from '../../styles/theme'
import ToggleButton from '../advancedSearch/ToggleSearchButton'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

import AdvancedSearchButton from './AdvancedSearchButton'
import SearchBox from './SearchBox'
import ErrorMessage from './ErrorMessage'

interface IProps {
  className: string
  id: string
  bgColor: string
  searchTipsStyle?: {
    color: string
    textDecoration: string
  }
  isResultsPage?: boolean
}

const SearchContainer: React.FC<IProps> = ({
  className,
  id,
  bgColor,
  searchTipsStyle = {
    color: theme.color.link,
    textDecoration: 'none',
  },
  isResultsPage = false,
}) => {
  const { pathname, search } = useLocation()
  const [isError, setIsError] = useState<boolean>(false)

  return (
    <Row
      className={`d-flex mx-0 py-3 ${className}`}
      style={{ backgroundColor: bgColor }}
      id={id}
    >
      <Col xs={12}>
        {isError && <ErrorMessage onClose={setIsError} />}
        <SearchBox id={id} setIsError={setIsError} isResults={isResultsPage} />
      </Col>
      {isResultsPage ? (
        <Col xs={12} className="w-75 d-flex justify-content-end">
          <ToggleButton setIsError={setIsError} />
        </Col>
      ) : (
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center mt-3"
        >
          <LinksContainerRow>
            <Col xs={6} className="d-inline-flex justify-content-start">
              <AdvancedSearchButton setIsError={setIsError} id={id} />
            </Col>
            <Col xs={6} className="d-inline-flex justify-content-end">
              <HashLink
                to="/content/simple-search"
                state={{
                  prevPath: `${pathname}${search}`,
                  targetName: 'SearchTips',
                }}
                style={{
                  ...searchTipsStyle,
                  fontWeight: '400',
                  fontSize: '1rem',
                }}
                onClick={() =>
                  pushSiteImproveEvent(
                    'Internal Link',
                    'Selected',
                    'Internal Search Tips',
                  )
                }
              >
                Search Tips
              </HashLink>
            </Col>
          </LinksContainerRow>
        </Col>
      )}
    </Row>
  )
}

export default SearchContainer
