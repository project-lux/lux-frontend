import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Accordion, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import StyledSearchButton from '../../styles/features/aiAssistedSearch/SearchButton'
import { translate } from '../../lib/util/translate'
import LoadingSpinner from '../common/LoadingSpinner'
import theme from '../../styles/theme'
import AdvancedSearchFormContainer from '../advancedSearch/FormContainer'
import { ResultsTab } from '../../types/ResultsTab'
import { searchScope } from '../../config/searchTypes'
import { StyledContainer } from '../../styles/features/advancedSearch/AdvancedSearchContainers'
import FormHeader from '../advancedSearch/FormHeader'
import StyledHr from '../../styles/shared/Hr'
import { SEARCH_TYPE_PARAM } from '../../config/aiAssistedSearch/variables'
import { pushClientEvent } from '../../lib/pushClientEvent'

import Disambiguation from './Disambiguation'
import InterpretationContainer from './InterpretationContainer'

const StyledAccordionHeader = styled(Accordion.Header)`
  :after {
    margin-left: 0px;
  }
`

/**
 * Component for expanding the advanced search with an AI search option.
 * @param {string} currentScope sets the current scope of the advanced search
 * @returns
 */
const RefinementContainer: React.FC = () => {
  const { search, state } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const fullSearchQuery = new URLSearchParams(search)
  const originalSearchString =
    fullSearchQuery.has('sq') && fullSearchQuery.get('qt') === tab
      ? fullSearchQuery.get('sq')
      : null
  const translatedQuery = fullSearchQuery.get('q') || ''
  const searchType = fullSearchQuery.has(SEARCH_TYPE_PARAM)
    ? fullSearchQuery.get(SEARCH_TYPE_PARAM)
    : null
  const isNewAdvancedSearch =
    translatedQuery.length === 0 && searchType === 'advanced'
  const isAdvancedSearchAccordionOpenByDefault = fullSearchQuery.has('openQB')
    ? fullSearchQuery.get('openQB') === 'true'
    : false
  // Labels and text for the AI-assisted search form based on whether it's a new search or a refinement
  const formLabel = isNewAdvancedSearch
    ? 'AI-Assisted Search'
    : 'Refine Search with AI'
  const formText = isNewAdvancedSearch
    ? 'Search using natural language.'
    : 'Use natural language to refine this search.'
  const accordionLabel = isNewAdvancedSearch
    ? 'Search with Query Builder'
    : 'Refine with Query Builder'

  const [newQuery, setNewQuery] = React.useState<string>(
    originalSearchString || '',
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(
    isAdvancedSearchAccordionOpenByDefault,
  )
  const [aiDisambiguation, setAiDisambiguation] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Array<any>>([])
  const refinementInputRef = useRef<HTMLInputElement>(null)
  const disambiguationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state?.focusRefinementInput) {
      refinementInputRef.current?.focus()
    }
  }, [state])

  const handleAiSearchSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault()
    pushClientEvent(
      'Search Button',
      'Submit',
      isNewAdvancedSearch ? 'AI-Assisted Search' : 'Refined Search',
    )
    translate({
      query: newQuery,
      isAiSearch: true,
      scope,
      prevQuery: translatedQuery.length > 0 ? translatedQuery : undefined,
      onSuccess: (translatedString) => {
        const jsonTranslatedString = JSON.parse(translatedString)
        if (jsonTranslatedString.length > 0) {
          setAiDisambiguation(jsonTranslatedString)
          setIsLoading(false)
          return
        }
      },
      onError: () => setIsLoading(false),
      onLoading: () => setIsLoading(true),
    })
  }

  useEffect(() => {
    if (aiDisambiguation.length === 0) {
      return undefined
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        disambiguationRef.current &&
        !disambiguationRef.current.contains(event.target as Node)
      ) {
        setAiDisambiguation([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [aiDisambiguation])

  const handleDisambiguationLinkSelection = (): void => {
    setIsAccordionExpanded(false)
    setAiDisambiguation([])
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAccordionSelect = (eventKey: any): void => {
    setIsAccordionExpanded(eventKey === '0')
    pushClientEvent(
      'Accordion Item',
      isAccordionExpanded ? 'Close' : 'Open',
      'Advanced Search',
    )
  }

  return (
    <Row className="ai-search-refinement-container mx-3 mb-3">
      <StyledContainer
        className="refinementSearchBody"
        $asBodyBorderTopLeftRadius={tab === 'objects' ? '0px' : undefined}
        data-testid="refine-search-container"
      >
        <FormHeader tab={tab} originalSearchString={originalSearchString} />
        <StyledHr width="100%" />
        <Col xs={12} className="mt-2">
          <InterpretationContainer
            className="refineSearchWithoutAiButton"
            showRefineButton={false}
          />
        </Col>
        <Col xs={12}>
          <div
            className="p-3 my-3"
            style={{
              borderColor: theme.color.lightGray,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: theme.border.radius,
              backgroundColor: theme.color.lightBabyBlue,
            }}
          >
            <div className="d-flex align-items-end gap-2">
              <Form.Group
                className="mb-0 flex-grow-1"
                controlId="formBasicEmail"
              >
                <Form.Label className="fw-bold" id="refine-search-label">
                  {formLabel}
                </Form.Label>
                &nbsp;
                <Form.Text style={{ fontSize: '16px' }}>{formText}</Form.Text>
                <div className="position-relative mb-3">
                  <InputGroup
                    size="lg"
                    style={{
                      zIndex: '1001',
                      border: 'solid 1px #979797',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <InputGroup.Text
                      id="refine-search-input-group-text"
                      className="bg-white pe-0 text-muted"
                    >
                      <i className="bi bi-search" />
                    </InputGroup.Text>
                    <Form.Control
                      ref={refinementInputRef}
                      type="text"
                      placeholder={originalSearchString || ''}
                      value={newQuery}
                      style={{
                        borderLeftStyle: 'none',
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: ChangeEvent<any>) =>
                        setNewQuery(e.target.value)
                      }
                      aria-describedby="refine-search-label"
                      data-testid={
                        isNewAdvancedSearch
                          ? 'ai-assisted-search-input'
                          : 'refine-search-input'
                      }
                    />
                    {newQuery !== '' && (
                      <button
                        type="button"
                        className="btn clearButton bg-white"
                        aria-label="clear search input"
                        onClick={() => setNewQuery('')}
                        data-testid={
                          isNewAdvancedSearch
                            ? 'ai-assisted-search-clear-button'
                            : 'refine-search-clear-button'
                        }
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    )}
                  </InputGroup>
                  {aiDisambiguation.length > 0 && (
                    <div ref={disambiguationRef}>
                      <Disambiguation
                        aiDisambiguation={aiDisambiguation}
                        className="refinementDisambiguation"
                        resetDisambiguation={handleDisambiguationLinkSelection}
                        generateNewSuggestions={handleAiSearchSubmit}
                      />
                    </div>
                  )}
                </div>
              </Form.Group>
              <StyledSearchButton
                variant="primary"
                type="submit"
                className="mb-3 p-2"
                onClick={(e) => handleAiSearchSubmit(e)}
                data-testid={
                  isNewAdvancedSearch
                    ? 'ai-assisted-search-submit-button'
                    : 'refine-search-submit-button'
                }
              >
                <i className="bi bi-stars" />
                Search&nbsp;{isLoading && <LoadingSpinner size="sm" />}
              </StyledSearchButton>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <Accordion
            className="bg-light"
            defaultActiveKey={isAccordionExpanded ? '0' : null}
            onSelect={(eventKey) => handleAccordionSelect(eventKey)}
            data-testid="query-builder-accordion"
          >
            <Accordion.Item eventKey="0">
              <StyledAccordionHeader className="d-flex align-items-center">
                {accordionLabel}&nbsp;
                <p className="mb-0">
                  Use fields and conditions to build a more precise search.
                </p>
                <span
                  className="ms-auto me-2"
                  style={{ color: theme.color.link }}
                >
                  {isAccordionExpanded ? 'Collapse' : 'Expand'}
                </span>
              </StyledAccordionHeader>
              <Accordion.Body>
                <AdvancedSearchFormContainer
                  formClassName="refinementAdvancedSearchContainer"
                  helpTextClassName="refinementHelpText"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </StyledContainer>
    </Row>
  )
}

export default RefinementContainer
