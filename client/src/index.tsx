import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'
import { installSearchBroadcastListener } from './lib/searchBroadcast'

// Registered before the first render so a BROADCAST_SEARCH sent immediately
// after load is captured. Requests are only authorized later, once the
// allowlist arrives with the rest of the configuration.
installSearchBroadcastListener()

const container = document.getElementById('root')

const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
