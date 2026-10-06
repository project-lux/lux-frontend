import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import config from '../../config/config'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetTranslateKeywordSearchQuery } from '../../redux/api/ml_api'
import { scopeToTabTranslation, searchScope } from '../../config/searchTypes'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'

interface IProps {
  searchString: string
  resetDisambiguation: (value: Array<IAiDisambiguation>) => void
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

const KeywordSearchLink: React.FC<IProps> = ({
  searchString,
  resetDisambiguation,
}) => {
  const { search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'
  const linkText = removeStopWords(searchString)

  // get the keyword search translated to the appropriate JSON format
  const { data, isSuccess, isLoading } = useGetTranslateKeywordSearchQuery({
    searchString: linkText,
    isAiSearch: false,
    scope: searchScope[tab],
  })

  if (isSuccess && data) {
    const dataString = JSON.stringify(data)
    const dataCopy = JSON.parse(dataString)
    const scope = scopeToTabTranslation[dataCopy._scope]
    delete dataCopy._scope
    const newUrlParams = AiDisambigationParser.getUrlParams(
      search,
      dataCopy,
      linkText,
      tab,
    )

    return (
      <Link
        to={{
          pathname: `/view/results/${scope}`,
          search: newUrlParams.toString(),
        }}
        onClick={() => {
          pushClientEvent('Keyword Search', 'Selected', linkText)
          resetDisambiguation([])
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
