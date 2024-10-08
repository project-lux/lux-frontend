import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { isNull, isUndefined } from 'lodash'

import theme from '../../styles/theme'
import ErrorPage from '../error/ErrorPage'
import RoutingComponent from '../results/RoutingComponent'
import Landing from '../landing/LandingPage'
import ResultsPage from '../results/ResultsPage'
import Header from '../header/Header'
import CmsRoutingComponent from '../cms/CmsRoutingComponent'
import { pushClientPageEvent } from '../../lib/pushClientEvent'

import Footer from './Footer'

const RedirectOldProd: React.FC = () => {
  const { hostname, pathname, search } = window.location
  let target = 'https://lux.collections.yale.edu'

  if (hostname === 'lux-front-prd.collections.yale.edu') {
    if (pathname) {
      target = `${target}${pathname}`
    }
    if (search) {
      target = `${target}${search}`
    }
    window.location.href = target
  }
  return null
}

const LuxRoutes: React.FC = () => {
  const { pathname, search, state } = useLocation()
  const [prevUrl, setPrevUrl] = useState('')

  useEffect(() => {
    const currentUrl = `${window.location.protocol}//${window.location.hostname}${pathname}${search}`
    const targetName = !isNull(state) ? state.targetName : undefined
    // Push a tracking event for a page change
    pushClientPageEvent(
      currentUrl,
      prevUrl,
      !isUndefined(targetName) ? targetName : 'unknown page name',
    )
    setPrevUrl(currentUrl)
  }, [pathname, prevUrl, search, state])

  return (
    <React.Fragment>
      <RedirectOldProd />
      <Routes>
        <Route path="/view/results/*" element={<Header hideSearch />} />
        <Route path="/" element={<Header hideSearch />} />
        <Route path="/*" element={<Header />} />
      </Routes>
      <div className="container-fluid px-0" id="route-container">
        {window.innerWidth < theme.breakpoints.md && (
          <Alert variant="info" className="d-flex justify-content-center">
            LUX is optimized for desktop use. Some features are not available on
            mobile devices.
          </Alert>
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index.html" element={<Landing />} />

          {/* BEGIN data/search views */}
          <Route path="/view/results/:tab" element={<ResultsPage />} />
          <Route path="/view/*" element={<RoutingComponent />} />
          {/* END data/search views */}

          {/* BEGIN CMS pages */}
          <Route path="/content/:pageKey" element={<CmsRoutingComponent />} />
          {/* END CMS pages */}

          <Route path="*" element={<ErrorPage code={404} />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default LuxRoutes
