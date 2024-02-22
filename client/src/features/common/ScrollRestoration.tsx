import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollRestoration: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!pathname.includes('/view/results')) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollRestoration
