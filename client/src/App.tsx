import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
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
import { onSignIn } from './lib/auth/helper'
import { pushClientEvent } from './lib/pushClientEvent'

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
  // true if either local or remote env vars are available
  const [envLoaded, setEnvLoaded] = useState(false)

  // true if advanced search config has been loaded or skipped
  const [asConfigLoaded, setAsConfigLoaded] = useState(false)

  // true if env and advanced search config have been processed -- be it success or failure
  const [initialized, setInitialized] = useState(false)

  // Fetch environment variables from the frontend server
  // unless local env vars are set (for local development).
  // Thus it is important that local .env file does not exist if variables
  // from the server are to be used.
  const envResult = useGetEnvQuery(undefined, { skip: config.hasLocalEnv })

  const hasRemoteEnv = envResult.isSuccess && envResult.data

  if (!envLoaded && (hasRemoteEnv || config.hasLocalEnv)) {
    if (hasRemoteEnv) {
      config.setServerConfig(envResult.data)
    }
    setEnvLoaded(true)
  }

  // Fetch advanced search configuration from the backend.
  // Requires envResult to succeed first to get the API base URL.
  const asConfigResults = useGetAdvancedSearchConfigQuery(undefined, {
    skip: !envLoaded,
  })

  if (!asConfigLoaded && asConfigResults.isSuccess && asConfigResults.data) {
    config.setAdvancedSearch(asConfigResults.data)
    setAsConfigLoaded(true)
  }

  const initSuccess =
    envLoaded && (asConfigLoaded || config.env.cacheViewerMode)
  const environmentLoadingError = envResult.isError
  const localEnvError = !config.hasLocalEnv
  const advancedSearchConfigError = asConfigResults.isError

  const initFailure =
    (environmentLoadingError && localEnvError) || advancedSearchConfigError
  // uninitialized -> initialized
  if (!initialized && (initSuccess || initFailure)) {
    if (config.hasLocalEnv) {
      console.log('using local env')
    }
    setInitialized(true)
  }

  if (envResult.isLoading) {
    return <p>Loading env...</p>
  }

  if (asConfigResults.isLoading) {
    return <p>Loading advanced search configuration...</p>
  }

  let errorMessage = null
  if (initFailure) {
    errorMessage =
      'Configuration from the backend failed to load. This may limit the functionality of the frontend.'
  }

  // Environment variables failed to load
  if (environmentLoadingError) {
    pushClientEvent(
      'Error',
      'Triggered',
      'Environment Variables Configuration Error',
    )
  }

  // The necessary API endpoint variables failed to load
  if (localEnvError) {
    pushClientEvent('Error', 'Triggered', 'API Endpoints Configuration Error')
  }

  // The advanced search configuration failed to load
  if (advancedSearchConfigError) {
    pushClientEvent('Error', 'Triggered', 'Advanced Search Configuration Error')
  }

  if (envLoaded && config.env.maintenanceMode) {
    return <Maintenance>{config.env.maintenanceMessage}</Maintenance>
  }

  if (initialized) {
    return (
      <AuthProvider
        authority={config.env.oidcAuthority}
        client_id={config.env.oidcClientId}
        redirect_uri={config.env.oidcRedirectUri}
        revokeTokenTypes={['refresh_token']}
        response_type="code"
        scope="openid email"
        onSigninCallback={onSignIn}
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

  return <Error>Unknown error</Error>
}

export default App
