import React, { useEffect, useState } from 'react'
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

function embedBugherdScript(): void {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src = `https://www.bugherd.com/sidebarv2.js?apikey=${config.env.bugherdApiKey}`
  script.async = true

  document.body.appendChild(script)
}

const App: React.FC = () => {
  // All configs have been loaded (or failed to load)
  const [initialized, setInitialized] = useState(false)

  // Fetch environment variables from the frontend server
  const envResult = useGetEnvQuery()

  // Fetch advanced search configuration from the backend
  const asConfigResults = useGetAdvancedSearchConfigQuery()

  const hasRemoteEnv = envResult.isSuccess && envResult.data
  const hasAdvancedSearchConfig =
    asConfigResults.isSuccess && asConfigResults.data

  console.log('asConfigResults:', asConfigResults)

  const succeeded =
    (hasRemoteEnv || config.hasLocalEnv) &&
    (hasAdvancedSearchConfig || config.env.cacheViewerMode)
  const failed =
    (envResult.isError && !config.hasLocalEnv) || asConfigResults.isError

  // uninitialized -> initialized
  if (!initialized && (succeeded || failed)) {
    if (hasRemoteEnv) {
      config.setServerConfig(envResult.data)
    } else if (config.hasLocalEnv) {
      console.log('server env is not available, using local env')
    }
    if (hasAdvancedSearchConfig) {
      config.setAdvancedSearch(asConfigResults.data)
    }
    setInitialized(true)
  }

  useEffect(() => {
    if (initialized && !config.env.luxEnv.includes('production')) {
      embedBugherdScript()
    }
  }, [initialized])

  if (envResult.isLoading) {
    return <p>Loading env...</p>
  }

  if (asConfigResults.isLoading) {
    return <p>Loading advanced search configuration...</p>
  }

  let errorMessage = null

  if (failed) {
    errorMessage =
      'Configuration from the backend failed to load. This may limit the functionality of the frontend.'
  }

  if (initialized && config.env.maintenanceMode) {
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
