import React, { ChangeEvent } from 'react'
import { Accordion, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { translate } from '../../lib/util/translate'
import { scopeToTabTranslation } from '../../config/searchTypes'
import LoadingSpinner from '../common/LoadingSpinner'

interface IProps {
  currentScope: string
  resultsTab: string
}

/**
 * Component for expanding the advanced search with an AI search option.
 * @param {string} currentScope sets the current scope of the advanced search
 * @param {string} resultsTab sets the current results tab to determine where to navigate after submitting the AI search
 * @returns
 */
const AiSearchAccordion: React.FC<IProps> = ({ currentScope, resultsTab }) => {
  const [newQuery, setNewQuery] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
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
        let newTab = resultsTab
        const jsonTranslatedString = JSON.parse(translatedString)
        newTab = scopeToTabTranslation[jsonTranslatedString._scope]
        const newUrlParams = new URLSearchParams()
        const newJSONQuery = JSON.parse(translatedString)
        delete newJSONQuery._scope
        newUrlParams.set('q', JSON.stringify(newJSONQuery))
        newUrlParams.set('sq', newQuery)
        newUrlParams.set('aiSearch', 'true')
        setNewQuery('')
        pushClientEvent('Search Button', 'Submit', 'AI Updated Search')
        navigate({
          pathname: `/view/results/${newTab}`,
          search: `${newUrlParams.toString()}`,
        })
      },
      onError: () => setIsLoading(false),
      onLoading: () => setIsLoading(true),
    })
  }

  return (
    <Accordion className="mt-3">
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AiSearchAccordion
