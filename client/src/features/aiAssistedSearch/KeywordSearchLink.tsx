import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetTranslateKeywordSearchQuery } from '../../redux/api/ml_api'
import { scopeToTabTranslation, searchScope } from '../../config/searchTypes'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'

interface IProps {
  searchString: string
  resetDisambiguation: () => void
}

const KeywordSearchLink: React.FC<IProps> = ({
  searchString,
  resetDisambiguation,
}) => {
  const { search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'

  // get the keyword search translated to the appropriate JSON format
  const { data, isSuccess, isLoading } = useGetTranslateKeywordSearchQuery({
    searchString,
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
      searchString,
      tab,
      true,
    )

    return (
      <Link
        to={{
          pathname: `/view/results/${scope}`,
          search: newUrlParams.toString(),
        }}
        onClick={() => {
          pushClientEvent('Keyword Search', 'Selected', searchString)
          resetDisambiguation()
        }}
        data-testid="keyword-search-link"
        className="fw-medium"
      >
        {searchString}
      </Link>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}
export default KeywordSearchLink
