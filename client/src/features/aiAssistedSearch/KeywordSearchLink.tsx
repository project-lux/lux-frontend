import React from 'react'
import { Link, useParams } from 'react-router-dom'

import config from '../../config/config'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetTranslateKeywordSearchQuery } from '../../redux/api/ml_api'
import { searchScope } from '../../config/searchTypes'

interface IProps {
  searchString: string
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

const KeywordSearchLink: React.FC<IProps> = ({ searchString }) => {
  const tab = useParams<{ tab: string }>().tab || 'objects'
  const linkText = removeStopWords(searchString)

  // get the keyword search translated to the appropriate JSON format
  const { data, isSuccess, isLoading } = useGetTranslateKeywordSearchQuery({
    searchString: linkText,
    isAiSearch: false,
    scope: searchScope[tab],
  })

  if (isSuccess && data) {
    console.log(data)
    const newUrlParams = new URLSearchParams()
    const dataString = JSON.stringify(data)
    const dataCopy = JSON.parse(dataString)
    delete dataCopy._scope
    newUrlParams.set('q', JSON.stringify(dataCopy))
    return (
      <Link
        to={{
          // default to objects page
          // TODO: change to the current results scope or default to objects
          pathname: `/view/results/objects`,
          search: newUrlParams.toString(),
        }}
        onClick={() => pushClientEvent('Keyword Search', 'Selected', linkText)}
        data-testid="keyword-search-link"
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
