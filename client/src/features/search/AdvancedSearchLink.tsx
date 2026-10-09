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
  const newPathname = pathname.includes('/view/results')
    ? pathname
    : `/view/results`
  const searchParams = new URLSearchParams(search)
  searchParams.set(SEARCH_TYPE_PARAM, 'advanced')

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
