import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import Routes from '../../../features/common/LuxRoutes'
import { store } from '../../../app/store'

interface IProps {
  route: string
}

const AppRender: React.FC<IProps> = ({ route }) => (
  <React.StrictMode>
    <Provider store={store}>
      <Router initialEntries={[route]} initialIndex={1}>
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>
)

export default AppRender
