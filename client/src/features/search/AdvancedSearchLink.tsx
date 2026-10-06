import { Link, useLocation } from 'react-router-dom'

import { pushClientEvent } from '../../lib/pushClientEvent'
import {
  // AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'

const AdvancedSearchLink: React.FC<{
  linkStyle: React.CSSProperties
}> = ({ linkStyle }) => {
  const { pathname, search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const query = searchParams.get('q') || ''
  const sq = searchParams.get('sq')
  const qt = searchParams.get('qt')

  return (
    <Link
      to={`${pathname === '/' ? '/view/results' : pathname}?${query !== '' ? `q=${encodeURIComponent(query)}` : ''}${sq ? `&sq=${sq}` : ''}${qt ? `&qt=${qt}` : ''}&${SEARCH_TYPE_PARAM}=advanced`}
      style={{
        ...linkStyle,
        fontWeight: '400',
        fontSize: '1rem',
      }}
      onClick={() =>
        pushClientEvent('Search Switch', 'Selected', 'To Advanced Search')
      }
    >
      Advanced Search
    </Link>
  )
}

export default AdvancedSearchLink
