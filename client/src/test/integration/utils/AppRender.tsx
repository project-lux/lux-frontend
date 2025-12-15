import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'

import Routes from '../../../features/common/LuxRoutes'
import { store } from '../../../app/store'

interface IProps {
  route: string
}

const AppRender: React.FC<IProps> = ({ route }) => (
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider
        authority="dummy"
        client_id="dummy"
        redirect_uri="dummy"
        revokeTokenTypes={['refresh_token']}
        response_type="code"
        scope="openid email"
        onSigninCallback={() => {}}
      >
        <Router initialEntries={[route]} initialIndex={1}>
          <Routes />
        </Router>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)

export default AppRender
