import { useMemo } from 'react'

import { getPagination } from '../../lib/util/paginationHelper'

export const Paginator = ({
  estimate = 0,
  pageSize = 20,
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
