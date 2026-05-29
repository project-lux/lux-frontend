import React, { ChangeEvent, useState } from 'react'
import { Accordion, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { translate } from '../../lib/util/translate'
import {
  DEFAULT_PAGE_LENGTH,
  scopeToTabTranslation,
} from '../../config/searchTypes'
import LoadingSpinner from '../common/LoadingSpinner'
import AiQueryOptions from '../search/AiQueryOptions'

interface IProps {
  currentScope: string
  resultsTab: string
}

/**
 * Component for expanding the advanced search with an AI search option.
 * @param {string} currentScope sets the current scope of the advanced search
 * @returns
 */
const AiSearchAccordion: React.FC<IProps> = ({ currentScope }) => {
  const [newQuery, setNewQuery] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [aiDisambiguation, setAiDisambiguation] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Array<any>>([])
  const navigate = useNavigate()
  const { search } = useLocation()
  const fullSearchQuery = new URLSearchParams(search)
  const query = fullSearchQuery.get('sq') || ''
  const translatedQuery = fullSearchQuery.get('q') || ''

  const handleAiSearchSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault()
    translate({
      query: newQuery,
      isAiSearch: true,
      scope: currentScope,
      prevQuery: translatedQuery,
      onSuccess: (translatedString) => {
        const jsonTranslatedString = JSON.parse(translatedString)
        console.log(jsonTranslatedString)
        const newUrlParams = new URLSearchParams()
        if (jsonTranslatedString.length > 1) {
          setAiDisambiguation(jsonTranslatedString)
          return
        } else {
          const newTranslatedQuery = jsonTranslatedString[0].query
          const newTab = scopeToTabTranslation[newTranslatedQuery._scope]
          delete newTranslatedQuery._scope
          newUrlParams.set('q', JSON.stringify(newTranslatedQuery))
          newUrlParams.set('pageLength', DEFAULT_PAGE_LENGTH.toString())
          newUrlParams.set('aiSearch', 'true')
          newUrlParams.set('sq', newQuery)
          setIsLoading(false)
          setNewQuery('')
          pushClientEvent('Search Button', 'Submit', 'AI Updated Search')
          navigate({
            pathname: `/view/results/${newTab}`,
            search: `${newUrlParams.toString()}`,
          })
        }
      },
      onError: () => setIsLoading(false),
      onLoading: () => setIsLoading(true),
    })
  }

  return (
    <Accordion className="mt-3" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Expand with AI Search</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Previous Query</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Enter previous query"
              value={query}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Query</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new query"
              value={newQuery}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: ChangeEvent<any>) => setNewQuery(e.target.value)}
            />
          </Form.Group>
          <PrimaryButton
            variant="primary"
            type="submit"
            onClick={(e) => handleAiSearchSubmit(e)}
          >
            Submit Updated AI Search {isLoading && <LoadingSpinner />}
          </PrimaryButton>
          {aiDisambiguation.length > 0 && (
            <AiQueryOptions aiDisambiguation={aiDisambiguation} />
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AiSearchAccordion
