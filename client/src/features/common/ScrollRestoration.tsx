import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const isResultsPage = (path: string): boolean =>
  path.startsWith('/view/results')

/**
 * Scrolls to the top of the page when the route changes.
 * URL changes that stay on the same results tab (submitting an advanced search, pagination, facets,
 * sorting, etc.) are skipped: the results page handles its own scrolling, such as scrolling to the
 * results heading after an advanced search is submitted or a new page of results is selected.
 * @returns {null}
 */
const ScrollRestoration: React.FC = () => {
  const { pathname, search } = useLocation()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    const isSameResultsPage =
      prevPathname.current === pathname && isResultsPage(pathname)

    if (!isSameResultsPage) {
      window.scrollTo(0, 0)
    }
    prevPathname.current = pathname
  }, [pathname, search])

  return null
}

export default ScrollRestoration
