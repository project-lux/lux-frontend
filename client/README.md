# LUX Client

## Requirements

1. Server
    - If choosing to run with the local server, see the local server configuration in the [server folder](https://github.com/project-lux/lux-frontend#running-server-locally).
2. Content mangament service (CMS) server (the application can run without this step)
2. IDE
3. [Node](https://nodejs.org/en)
    - Minimum required Node version is 14.18.1, however, it is recommended to have the latest version of Node installed.
4. npm (for installing yarn)
5. [yarn package manager](https://classic.yarnpkg.com/en/)

## Steps

1. Clone [https://github.com/project-lux/lux-frontend](https://github.com/project-lux/lux-frontend) repo.
2. Run `yarn install`
3. [Configure your environment](#configuration)
4. Run `yarn start` and navigate in a browser to https://localhost:3000

## Configuration

### Configure .env file

1. Create a .env file
2. Copy the contents of [.env.template](https://github.com/project-lux/lux-frontend/blob/main/client/.env.template) and add the appropriate environment variable values based on the documentation in .env.template.

### Configure index.html file
1. Create an index.html file in the [/client](https://github.com/project-lux/lux-frontend/tree/main/client) folder
2. Copy the contents of [index.html.template](https://github.com/project-lux/lux-frontend/blob/main/client/public/index.html.template) and add any additional tags deemed necessary.

### Configure pushClientEvent.ts file
1. Create an pushClientEvent.ts file in the [/src/lib](https://github.com/project-lux/lux-frontend/blob/main/client/src/lib/pushClientEvent.ts) folder
2. Copy the contents of [pushClientEvent.ts.template](https://github.com/project-lux/lux-frontend/blob/main/client/src/lib/pushClientEvent.ts.template) and add any functions required for site analytics.

## Search broadcasting

An external page that embeds LUX in an iframe, or opens it in a new window, can
subscribe to the searches the user runs. This is off unless an operator sets
`BROADCAST_SEARCH_ALLOWED_ORIGINS` (see `.env.template`).

### Protocol

1. Post `{ type: 'BROADCAST_SEARCH' }` to the LUX window. Do this on the
   iframe's `load` event -- LUX installs its listener while the page's module
   scripts run, which is always before `load` fires.
2. If the sender's origin is in the allowlist, LUX posts a `LUX_SEARCH` message
   for every subsequent search:

   ```js
   {
     type: 'LUX_SEARCH',
     params: { q, tab, page, pageLength, sort, filterResults, rnd },
     url: 'api/search/item?q=...',        // relative to the data API
     absoluteUrl: 'https://.../api/search/item?q=...',
     timestamp: 1758200000000,
   }
   ```

   `params.q` is the search criteria as JSON, and is what the user typed.

There is no acknowledgement and no unsubscribe: a request stays in effect until
the LUX page reloads. A request from an origin outside the allowlist is ignored
silently, so receiving nothing means either the origin was rejected or the
feature is disabled.

### Notes for integrators

- Only the most recent subscriber receives messages.
- Origins must match exactly -- scheme, host and port. Wildcards are rejected.
- Messages are posted to your specific origin, never `*`. If your page
  navigates elsewhere, messages are silently dropped.
- A search served from LUX's cache (a back-navigation, say) is broadcast too,
  so the same `url` can arrive more than once. De-duplicate on `url` if you
  need strictly distinct searches.

### Example embedder

```html
<iframe id="lux" src="https://lux.example.edu/view/results/objects?q=..."></iframe>
<script>
  const frame = document.getElementById('lux')
  frame.addEventListener('load', () => {
    frame.contentWindow.postMessage({ type: 'BROADCAST_SEARCH' }, 'https://lux.example.edu')
  })
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://lux.example.edu') return
    if (event.data?.type !== 'LUX_SEARCH') return
    console.log('search:', event.data.params, event.data.url)
  })
</script>
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Runs [eslint](https://eslint.org/) for finding errors in the code.

### `yarn build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).


### AWS WAF silent browser verification

Disabled unless `USE_WAF_CHALLENGE` is `true`; otherwise the app behaves as if
the integration did not exist. When enabled, App starts verification as soon as
`/env` has loaded: it loads AWS's `challenge.js` and primes a token. Axios
(`baseQuery`) and `fetchWithToken` wait for that, attach the token, and, if the
token can't be obtained or a response is a WAF challenge, refresh the token and
retry once. Only a second failure shows the Retry/Contact us screen
(`BrowserVerification`). Concurrent token requests share one operation. Tokens
are only attached to same-origin and explicitly configured API origins.

Configuration problems (missing or non-AWS script URL, invalid origin entries,
missing contact URL) are logged to the console and do not block the app.

Runtime server variables, served through `/env` (public, not secrets):

- `USE_WAF_CHALLENGE`: `true` to enable verification. Defaults to `false`.
- `WAF_CHALLENGE_SCRIPT_URL`: exact HTTPS `challenge.js` URL issued by the
  environment's AWS WAF application integration. Required when enabled.
- `WAF_CONTACT_URL`: optional HTTPS contact form or `mailto:` destination
  reachable without a challenge. Falls back to `LUX_FEEDBACK_URL`; the Contact
  us button is hidden if neither is a valid HTTPS/mailto URL.
- `WAF_PROTECTED_ORIGINS`: optional comma-separated additional protected API
  origins, e.g. `https://api.example.org`. Same-origin is included automatically.

For Vite local development use the corresponding `REACT_APP_USE_WAF_CHALLENGE`
and `REACT_APP_WAF_*` variables in `.env.template`.

Deployment order:

1. Obtain the script URL from the intended ACL's application integration; configure
   its token domain list for the frontend and any protected API domains. Configure
   CSP to permit the AWS integration resources according to AWS documentation.
2. For each origin in `WAF_PROTECTED_ORIGINS`, CORS must allow the
   `x-aws-waf-token` request header (preflight) and expose `x-amzn-waf-action`.
   Check with:
   `curl -si -X OPTIONS https://api.example.org/api/search -H 'Origin: https://lux.example.org' -H 'Access-Control-Request-Method: GET' -H 'Access-Control-Request-Headers: x-aws-waf-token'`
   WAF's own challenge responses omit CORS headers, so cross-origin challenges
   surface as network errors; these are retried once with a fresh token and
   then reported as ordinary request errors.
3. Deploy this frontend and server, then set `USE_WAF_CHALLENGE=true` with the
   script URL. Ensure `/env`, frontend HTML, JS/CSS assets, and the contact
   destination remain accessible without Challenge — verification cannot start
   until `/env` has loaded. Use narrowly scoped WAF rules on selected API/data
   routes. Do not use a broad terminating Allow to exempt assets from unrelated
   security rules.
4. Verify token acquisition, API calls, expired tokens, disabled JavaScript/script
   blocking, the failure screen, Retry, and contact access in a test environment.
5. Evaluate the proposed UA + exact JA4 + path rule in Count, then activate Challenge
   for the reviewed scope. This code does not enable any production WAF rules.
   Non-browser research clients need a separate authenticated/quota-managed option.

Unit tests: `pnpm vitest run src/test/unit/lib/wafChallenge.spec.ts`.

AWS references: https://docs.aws.amazon.com/waf/latest/developerguide/waf-js-challenge-api-get-token.html
and https://docs.aws.amazon.com/waf/latest/developerguide/waf-captcha-and-challenge-actions.html.
