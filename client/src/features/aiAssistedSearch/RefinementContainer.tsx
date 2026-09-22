import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Accordion, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'

import StyledSearchButton from '../../styles/features/aiAssistedSearch/SearchButton'
import { translate } from '../../lib/util/translate'
import LoadingSpinner from '../common/LoadingSpinner'
import theme from '../../styles/theme'
import AdvancedSearchContainer from '../advancedSearch/AdvancedSearchContainer'
import { ResultsTab } from '../../types/ResultsTab'
import { searchScope } from '../../config/searchTypes'
import { StyledContainer } from '../../styles/features/advancedSearch/AdvancedSearchContainers'
import FormHeader from '../advancedSearch/FormHeader'
import StyledHr from '../../styles/shared/Hr'

import Disambiguation from './Disambiguation'
import InterpretationContainer from './InterpretationContainer'

/**
 * Component for expanding the advanced search with an AI search option.
 * @param {string} currentScope sets the current scope of the advanced search
 * @returns
 */
const RefinementContainer: React.FC = () => {
  const { search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const fullSearchQuery = new URLSearchParams(search)
  const originalSearchString = fullSearchQuery.has('sq')
    ? fullSearchQuery.get('sq')
    : null
  const translatedQuery = fullSearchQuery.get('q') || ''

  const [newQuery, setNewQuery] = React.useState<string>(
    originalSearchString || '',
  )
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [aiDisambiguation, setAiDisambiguation] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Array<any>>([])
  const disambiguationRef = useRef<HTMLDivElement>(null)

  const handleAiSearchSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault()
    translate({
      query: newQuery,
      isAiSearch: true,
      scope,
      prevQuery: translatedQuery,
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

  return (
    <Row className="ai-search-refinement-container mx-3 mb-3">
      <StyledContainer
        className="refinementSearchBody"
        $asBodyBorderTopLeftRadius={tab === 'objects' ? '0px' : undefined}
        data-testid="refined-search-form-container"
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
                  Refine Search with AI
                </Form.Label>
                &nbsp;
                <Form.Text>
                  Use natural language to refine this search.
                </Form.Text>
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
                    />
                    {newQuery !== '' && (
                      <button
                        type="button"
                        className="btn clearButton bg-white"
                        aria-label="clear search input"
                        onClick={() => setNewQuery('')}
                        data-testid="refine-search-clear-button"
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    )}
                  </InputGroup>
                  {aiDisambiguation.length > 0 && (
                    <div ref={disambiguationRef}>
                      <Disambiguation
                        aiDisambiguation={aiDisambiguation}
                        searchString={newQuery !== null ? newQuery : ''}
                        className="refinementDisambiguation"
                        onSelect={() => setAiDisambiguation([])}
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
              >
                <i className="bi bi-stars" />
                Search{isLoading && <LoadingSpinner />}
              </StyledSearchButton>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <Accordion className="bg-light">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="d-flex align-items-center">
                Refine with Query Builder&nbsp;
                <p className="mb-0">
                  Use fields and conditions to build a more precise search.
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <AdvancedSearchContainer
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
