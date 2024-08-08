import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import styled from 'styled-components'
import { AuthProvider } from 'react-oidc-context'

import config from './config/config'
import Routes from './features/common/LuxRoutes'
import GlobalStyle from './styles/global'
import { useGetEnvQuery } from './redux/api/configApi'
import { useGetAdvancedSearchConfigQuery } from './redux/api/ml_api'
import ScrollRestoration from './features/common/ScrollRestoration'
import ClearRedux from './features/common/ClearRedux'
import NoResultsAlert from './features/results/NoResultsAlert'

const Maintenance = styled.div`
  font-size: 1.5rem;
  margin: 4rem 8rem;
  padding: 1rem;
  border: solid 0.125em #89cff5;
  border-radius: 0.7rem;
`

const Error = styled.div`
  margin: 0.4rem 0.6rem;
`

const App: React.FC = () => {
  const [envLoaded, setEnvLoaded] = useState(false)
  const [asConfigLoaded, setAsConfigLoaded] = useState(false)
  const envResult = useGetEnvQuery()

  const removeTokenFromUrl = (): void => {
    const url = new URL(window.location.href)
    url.searchParams.delete('code')
    url.searchParams.delete('state')
    window.history.replaceState({}, '', url.toString())
  }

  // Skip will be passed to config query endpoints if local env exists or if it hasn't loaded
  const skip =
    envLoaded || (envResult.isError && config.hasLocalEnv)
      ? undefined
      : skipToken

  const asConfigResults = useGetAdvancedSearchConfigQuery(skip)

  useEffect(() => {
    if (envLoaded && !config.env.luxEnv.includes('production')) {
      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = `https://www.bugherd.com/sidebarv2.js?apikey=${config.env.bugherdApiKey}`
      script.async = true

      document.body.appendChild(script)
    }
  }, [envLoaded])

  if (!envLoaded && envResult.isSuccess && envResult.data) {
    config.setServerConfig(envResult.data)
    setEnvLoaded(true)
  }

  if (!asConfigLoaded && asConfigResults.isSuccess && asConfigResults.data) {
    config.setAdvancedSearch(asConfigResults.data)
    setAsConfigLoaded(true)
  }

  if (config.env.maintenanceMode) {
    return <Maintenance>{config.env.maintenanceMessage}</Maintenance>
  }

  if (envResult.isError) {
    console.error('failed to load env')
  }

  if (asConfigResults.isError) {
    console.error('failed to load advanced search config')
  }

  if (envResult.isLoading) {
    return <p>Loading env...</p>
  }

  if (asConfigResults.isLoading) {
    return <p>Loading advanced search configuration...</p>
  }

  const envReady = envResult.isSuccess || config.hasLocalEnv

  let errorMessage = null

  if (
    (!envResult.isSuccess && !config.hasLocalEnv) ||
    !asConfigResults.isSuccess
  ) {
    errorMessage =
      'Configuration from the backend failed to load. This may limit the functionality of the frontend.'
  }

  if (envReady || config.env.cacheViewerMode) {
    return (
      <AuthProvider
        authority={config.env.oidcAuthority}
        client_id={config.env.oidcClientId}
        redirect_uri={config.env.oidcRedirectUri}
        revokeTokenTypes={['refresh_token']}
        scope="openid email"
        onSigninCallback={removeTokenFromUrl}
      >
        <GlobalStyle />
        <Router>
          <ScrollRestoration />
          <ClearRedux />
          {errorMessage !== null && (
            <NoResultsAlert
              message={errorMessage}
              variant="warning"
              className="d-flex justify-content-center mb-0"
            />
          )}
          <Routes />
        </Router>
      </AuthProvider>
    )
  }

  if (!envReady) {
    return (
      <NoResultsAlert
        message="Configuration failed to load. Please check that all configuration is in place."
        variant="danger"
        className="d-flex justify-content-center mb-0"
      />
    )
  }

  return <Error>Unknown error</Error>
}

export default App
