/* eslint-disable react/no-danger */

import React, { useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { useAppSelector } from '../../app/hooks'
import { translate } from '../../lib/util/translate'
import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'
import StyledDropdown from '../../styles/shared/Dropdown'
import { searchScope } from '../../config/searchTypes'
import { getParamPrefix } from '../../lib/util/params'
import Tooltip from '../common/Tooltip'
import EntityResultsDescription from '../cms/EntityResultsDescription'

interface IProps {
  setIsError: (x: boolean) => void
  id: string
}

const AdvancedSearchButton: React.FC<IProps> = ({ setIsError, id }) => {
  const simpleSearchState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const { value } = simpleSearchState
  const navigate = useNavigate()

  const handleSelect = (entityType: string): void => {
    const searchString = value || ''
    if (searchString === '') {
      navigate(`/view/results/${entityType}?q=`, {
        state: {
          fromLandingPage: true,
        },
      })
      return
    }
    translate({
      query: searchString,
      scope: searchScope[entityType],
      onSuccess: (translatedString) => {
        const urlParams = new URLSearchParams()
        urlParams.set('q', translatedString)
        urlParams.set(`${getParamPrefix(entityType)}p`, '1')
        navigate(`/view/results/${entityType}?${urlParams.toString()}`)
      },
      onError: () => setIsError(true),
      onLoading: () => null,
    })
  }

  // remove error message if the user changes simple search
  useEffect(() => {
    setIsError(false)
  }, [setIsError, simpleSearchState])

  return (
    <Row className="px-3">
      <Col className="ps-0">
        <StyledDropdown
          drop="end"
          onSelect={handleSelect}
          id="advanced-search-switch"
          data-testid={`${id}-advanced-search-switch-dropdown`}
        >
          <Dropdown.Toggle
            id="advanced-search-dropdown-toggle"
            data-testid={`${id}-advanced-search-switch-dropdown-toggle`}
          >
            Advanced Search
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item disabled>I want to search for...</Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="objects"
              data-testid={`${id}-objects-dropdown-item`}
            >
              Objects
              <Tooltip
                html={EntityResultsDescription('objects') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-objects-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="works"
              data-testid={`${id}-works-dropdown-item`}
            >
              Works
              <Tooltip
                html={EntityResultsDescription('works') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-works-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="people"
              data-testid={`${id}-people-and-groups-dropdown-item`}
            >
              People or Groups
              <Tooltip
                html={EntityResultsDescription('peopleAndOrgs') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-people-and-groups-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="places"
              data-testid={`${id}-places-dropdown-item`}
            >
              Places
              <Tooltip
                html={EntityResultsDescription('places') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-places-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="concepts"
              data-testid={`${id}-concepts-dropdown-item`}
            >
              Concepts
              <Tooltip
                html={EntityResultsDescription('conceptsAndGroupings') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-concepts-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="events"
              data-testid={`${id}-events-dropdown-item`}
            >
              Events
              <Tooltip
                html={EntityResultsDescription('events') || ''}
                placement="bottom"
              >
                <i
                  className="bi bi-question-circle"
                  style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
                  data-testid={`${id}-events-react-overlay-icon`}
                />
              </Tooltip>
            </Dropdown.Item>
          </Dropdown.Menu>
        </StyledDropdown>
      </Col>
    </Row>
  )
}

export default AdvancedSearchButton
