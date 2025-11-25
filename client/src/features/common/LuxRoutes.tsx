import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import { getRouteNames } from '../../config/routerPages'
import useAuthentication from '../../lib/hooks/useAuthentication'
import { pushClientPageEvent } from '../../lib/pushClientEvent'
import { getTargetName } from '../../lib/util/uri'
import { useGetItemQuery } from '../../redux/api/ml_api'
import theme from '../../styles/theme'
import AdvancedSearchConfig from '../advancedSearchConfig/AdvancedSearchConfig'
import CmsRoutingComponent from '../cms/CmsRoutingComponent'
import ErrorPage from '../error/ErrorPage'
import Header from '../header/Header'
import Landing from '../landing/LandingPage'
import ResultsPage from '../results/ResultsPage'
import RoutingComponent from '../results/RoutingComponent'

// import PrivateRoute from '../myCollections/PrivateRoute'
// import Callback from '../myCollections/LoginCallback'

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
  const auth = useAuthentication()
  const forceRefetch = auth.isAuthenticated

  const { pathname, search } = useLocation()
  const [prevUrl, setPrevUrl] = useState('')
  const [showMobileAlert] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const routes = getRouteNames()
  const isNotAnEntityPage = routes.has(pathname)

  // used to get the name of the page if on an entity page
  const { isSuccess, data } = useGetItemQuery(
    {
      uri: pathname.replace('/view/', ''),
    },
    {
      skip: auth.isLoading === true || isNotAnEntityPage,
      forceRefetch,
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
        {showMobileAlert && (
          <Alert
            dismissible
            variant="info"
            className="d-flex justify-content-center mb-0"
          >
            LUX is optimized for desktop use. Some features are not available on
            mobile devices.
          </Alert>
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/index.html" element={<Landing />} />

          {/* BEGIN data/search views */}
          {/* <Route path="/view/results/collections" element={<ResultsPage />}>
            <Route path="all" element={<ResultsPage />} />
            <Route path="lux-collections" element={<ResultsPage />} />
            <Route path="my-collections" element={<ResultsPage />} />
          </Route> */}
          {/* TODO: continue testing */}
          {/* <Route path="/signin-oidc" element={<Callback />} />
          <Route path="/view/results/:tab" element={<ResultsPage />}>
            <Route
              path=":subTab"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />
          </Route> */}
          <Route path="/view/results/:tab" element={<ResultsPage />}>
            <Route path=":subTab" element={<ResultsPage />} />
          </Route>
          <Route path="/view/*" element={<RoutingComponent />} />
          {/* END data/search views */}

          {/* BEGIN CMS pages */}
          <Route path="/content/:pageKey" element={<CmsRoutingComponent />} />
          {/* END CMS pages */}
          <Route
            path="/view/advanced-search-config"
            element={<AdvancedSearchConfig />}
          />

          <Route path="*" element={<ErrorPage code={404} />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default LuxRoutes
