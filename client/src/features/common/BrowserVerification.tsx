import React, { useSyncExternalStore } from 'react'

import {
  getWafContactUrl,
  hasWafFailure,
  subscribeToWafFailure,
} from '../../lib/wafChallenge'

/**
 * Kept outside App so configuration/API failures cannot hide the recovery UI.
 * Verification itself is started by App once the runtime config has loaded.
 */
const BrowserVerification: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const failed = useSyncExternalStore(subscribeToWafFailure, hasWafFailure)

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
  return <React.Fragment>{children}</React.Fragment>
}

export default BrowserVerification
