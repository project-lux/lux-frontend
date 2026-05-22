import { useMemo } from 'react'

import { getPagination } from '../../lib/util/paginationHelper'
import { DEFAULT_PAGE_LENGTH } from '../../config/searchTypes'

export const Paginator = ({
  estimate = 0,
  pageSize = DEFAULT_PAGE_LENGTH,
  siblingCount = 2,
  currentPage = 1,
}): Array<string | number> => {
  const paginationRange = useMemo(
    () => getPagination(estimate, pageSize, siblingCount, currentPage),
    [estimate, pageSize, siblingCount, currentPage],
  )

  if (paginationRange === undefined) {
    return []
  }

  return paginationRange
}
