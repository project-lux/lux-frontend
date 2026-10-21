import React, { useEffect, useState, useSyncExternalStore } from 'react'

import {
  getWafContactUrl,
  hasWafFailure,
  initializeWafChallenge,
  subscribeToWafFailure,
} from '../../lib/wafChallenge'

/** Kept outside App so configuration/API failures cannot hide the recovery UI. */
const BrowserVerification: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [ready, setReady] = useState(false)
  const failed = useSyncExternalStore(subscribeToWafFailure, hasWafFailure)
  useEffect(() => {
    let mounted = true
    initializeWafChallenge()
      .then(() => {
        if (mounted) setReady(true)
      })
      .catch(() => {
        /* Failure is displayed by the external store. */
      })
    return () => {
      mounted = false
    }
  }, [])

  if (failed) {
    const contactUrl = getWafContactUrl()
    return (
      <main className="container py-5" aria-labelledby="verification-title">
        <div role="alert" className="alert alert-warning">
          <h1 id="verification-title">We couldn’t verify your browser.</h1>
          <p>
            Please enable JavaScript and try again. If you still cannot access
            LUX, contact the LUX support team.
          </p>
          <p>
            If you use automated research tools, contact us to discuss access
            options.
          </p>
          <p>
            Please include the page address and the time of the problem when
            contacting us.
          </p>
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          {contactUrl && (
            <a className="btn btn-outline-primary" href={contactUrl}>
              Contact us
            </a>
          )}
        </div>
      </main>
    )
  }
  if (!ready)
    return (
      <p role="status" className="container py-4">
        Preparing secure access to LUX…
      </p>
    )
  return <React.Fragment>{children}</React.Fragment>
}

export default BrowserVerification
