import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useGetItemQuery } from '../../redux/api/ml_api'
import ErrorPage from '../error/ErrorPage'
import RoutingComponent from '../results/RoutingComponent'
import Landing from '../landing/LandingPage'
import ResultsPage from '../results/ResultsPage'
import Header from '../header/Header'
import CmsRoutingComponent from '../cms/CmsRoutingComponent'
import { pushClientPageEvent } from '../../lib/pushClientEvent'
import { getTargetName } from '../../lib/util/uri'
import { getRouteNames } from '../../config/routerPages'

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
  const { pathname, search } = useLocation()
  const [prevUrl, setPrevUrl] = useState('')

  const routes = getRouteNames()
  const isNotAnEntityPage = routes.has(pathname)

  // used to get the name of the page if on an entity page
  const { isSuccess, data } = useGetItemQuery(
    {
      uri: pathname.replace('/view/', ''),
    },
    {
      skip: isNotAnEntityPage,
    },
  )

  useEffect(() => {
    // Set the current URL
    // If the landing page does not have a named path, add it
    const currentUrl = `${window.location.protocol}//${
      window.location.hostname
    }${pathname === '/' ? '/landing' : pathname}${search}`

    // Get the target page name based on the current url
    const targetName = getTargetName(
      pathname,
      routes,
      isNotAnEntityPage,
      isSuccess,
      data,
    )

    // Push a tracking event for a page change
    pushClientPageEvent(currentUrl, prevUrl, targetName)
    setPrevUrl(currentUrl)
  }, [data, isNotAnEntityPage, isSuccess, pathname, prevUrl, routes, search])

  return (
    <React.Fragment>
      <RedirectOldProd />
      <Routes>
        <Route path="/view/results/*" element={<Header hideSearch />} />
        <Route path="/" element={<Header hideSearch />} />
        <Route path="/*" element={<Header />} />
      </Routes>
      <div className="container-fluid px-0" id="route-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
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
