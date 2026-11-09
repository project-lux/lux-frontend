import { Link, useLocation, useParams } from 'react-router'

import { useAppSelector } from '../../app/hooks'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { pushClientEvent } from '../../lib/pushClientEvent'
import {
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'
import { ResultsTab } from '../../types/ResultsTab'

const AdvancedSearchLink: React.FC<{
  linkStyle: React.CSSProperties
}> = ({ linkStyle }) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const asSearchState = useAppSelector(
    (searchState) => searchState.currentSearch as ICurrentSearchState,
  )
  const isAiSearch = asSearchState.isAiSearch
  const { pathname, search } = useLocation()
  const newPathname = pathname.includes('/view/results')
    ? pathname
    : `/view/results`
  const searchParams = new URLSearchParams(search)
  if (pathname.includes('/view/results')) {
    searchParams.set('qt', tab)
  }
  searchParams.set(SEARCH_TYPE_PARAM, 'advanced')
  if (isAiSearch) {
    searchParams.set(AI_REFINEMENT_PARAM, 'true')
  }

  return (
    <Link
      to={{
        pathname: newPathname,
        search: searchParams.toString(),
      }}
      style={{
        ...linkStyle,
        fontWeight: '400',
        fontSize: '1rem',
      }}
      onClick={() =>
        pushClientEvent('Search Link', 'Selected', 'To Advanced Search')
      }
    >
      Advanced Search
    </Link>
  )
}

export default AdvancedSearchLink
