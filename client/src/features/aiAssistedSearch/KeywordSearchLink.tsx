import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { scopeToTabTranslation } from '../../config/searchTypes'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'

interface IProps {
  keywordSearchFromDisambiguation: IAiDisambiguation
  resetDisambiguation: () => void
}

const KeywordSearchLink: React.FC<IProps> = ({
  keywordSearchFromDisambiguation,
  resetDisambiguation,
}) => {
  const { search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'

  const keywordSearchString = new AiDisambigationParser([
    keywordSearchFromDisambiguation,
  ]).getKeywordSearchString()
  const { natural, query } = keywordSearchFromDisambiguation
  const queryString = JSON.stringify(query)
  const queryCopy = JSON.parse(queryString)
  const scope = scopeToTabTranslation[queryCopy._scope]
  delete queryCopy._scope
  const newUrlParams = AiDisambigationParser.getUrlParams(
    search,
    queryCopy,
    keywordSearchString,
    tab,
    true,
    'simple',
  )

  return (
    <Link
      to={{
        pathname: `/view/results/${scope}`,
        search: newUrlParams.toString(),
      }}
      onClick={() => {
        pushClientEvent('Keyword Search', 'Selected', natural)
        resetDisambiguation()
      }}
      data-testid="keyword-search-link"
      className="fw-medium"
    >
      {natural}
    </Link>
  )
}
export default KeywordSearchLink
