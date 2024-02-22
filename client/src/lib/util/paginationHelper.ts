export const DOTS = '...'

const range = (start: number, end: number): Array<number> => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const getPagination = (
  estimate: number,
  pageSize: number,
  siblingCount: number,
  currentPage: number,
  // eslint-disable-next-line consistent-return
): Array<number | string> | undefined => {
  const totalPageCount = Math.ceil(estimate / pageSize)

  const totalPageNumbers = siblingCount + 5

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < totalPageCount - 2

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2
    const leftRange = range(1, leftItemCount)

    return [...leftRange, DOTS]
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount,
    )
    return [DOTS, ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [DOTS, ...middleRange, DOTS]
  }
}
