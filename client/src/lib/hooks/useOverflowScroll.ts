import { RefObject, useLayoutEffect, useState } from 'react'

export default function useOverflowScroll(
  parentRef: RefObject<HTMLElement> | RefObject<null>,
  childRef: RefObject<HTMLElement> | RefObject<null>,
): boolean {
  const [isOverflow, setIsOverflow] = useState(false)

  useLayoutEffect(() => {
    const parentCurrent = parentRef.current
    const childCurrent = childRef.current

    const trigger = (): void => {
      if (parentCurrent && childCurrent) {
        const hasOverflow =
          parentCurrent.clientHeight < childCurrent.scrollHeight
        setIsOverflow(hasOverflow)
      }
    }

    trigger()
    window.addEventListener('resize', trigger)

    if (
      !parentCurrent ||
      !childCurrent ||
      typeof ResizeObserver === 'undefined'
    ) {
      return () => window.removeEventListener('resize', trigger)
    }

    const resizeObserver = new ResizeObserver(trigger)
    resizeObserver.observe(parentCurrent)
    resizeObserver.observe(childCurrent)

    return () => {
      window.removeEventListener('resize', trigger)
      resizeObserver.disconnect()
    }
  }, [parentRef, childRef])

  return isOverflow
}
