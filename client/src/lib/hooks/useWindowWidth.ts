import { useEffect, useState } from 'react'

function getWindowDimensions(): { width: number } {
  const { innerWidth: width } = window
  return {
    width,
  }
}

export const useWindowWidth = (): { width: number } => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
