import React from 'react'
import { Link, useParams } from 'react-router-dom'

import config from '../../config/config'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetTranslateKeywordSearchQuery } from '../../redux/api/ml_api'
import { scopeToTabTranslation, searchScope } from '../../config/searchTypes'
import { AI_SEARCH_PARAM } from '../../config/aiAssistedSearch/variables'

interface IProps {
  searchString: string
  onSelect?: () => void
}

/**
 * Removes any words in the config's stop words list from the searchString.
 */
export function removeStopWords(searchString: string): string {
  return searchString
    .split(/\s+/)
    .filter(
      (word) =>
        word !== '' &&
        !config.advancedSearch.stopWords.includes(word.toLowerCase()),
    )
    .join(' ')
}

const KeywordSearchLink: React.FC<IProps> = ({ searchString, onSelect }) => {
  const tab = useParams<{ tab: string }>().tab || 'objects'
  const linkText = removeStopWords(searchString)

  // get the keyword search translated to the appropriate JSON format
  const { data, isSuccess, isLoading } = useGetTranslateKeywordSearchQuery({
    searchString: linkText,
    isAiSearch: false,
    scope: searchScope[tab],
  })

  if (isSuccess && data) {
    const newUrlParams = new URLSearchParams()
    const dataString = JSON.stringify(data)
    const dataCopy = JSON.parse(dataString)
    const scope = scopeToTabTranslation[dataCopy._scope]
    delete dataCopy._scope
    newUrlParams.set('q', JSON.stringify(dataCopy))
    newUrlParams.set('sq', searchString)
    newUrlParams.set(AI_SEARCH_PARAM, 'false')

    return (
      <Link
        to={{
          // default to objects page
          // TODO: change to the current results scope or default to objects
          pathname: `/view/results/${scope}`,
          search: newUrlParams.toString(),
        }}
        onClick={() => {
          pushClientEvent('Keyword Search', 'Selected', linkText)
          onSelect?.()
        }}
        data-testid="keyword-search-link"
        className="fw-medium"
      >
        {linkText}
      </Link>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}
export default KeywordSearchLink
