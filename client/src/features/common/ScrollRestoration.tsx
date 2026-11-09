import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollRestoration: React.FC = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

export default ScrollRestoration
