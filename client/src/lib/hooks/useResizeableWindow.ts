import { useEffect } from 'react'

import theme from '../../styles/theme'

export default function useResizeableWindow(
  setIsMobileState: (x: boolean) => void,
): void {
  useEffect(() => {
    const listenResizeEvent = (): void => {
      if (window.innerWidth < theme.breakpoints.md) {
        setIsMobileState(true)
      }
      if (window.innerWidth > theme.breakpoints.md) {
        setIsMobileState(false)
      }
    }

    window.addEventListener('resize', listenResizeEvent)

    return () => window.removeEventListener('resize', listenResizeEvent)
  }, [])
}
