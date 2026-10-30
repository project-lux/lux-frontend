# LUX Client

## Requirements

1. Server
    - If choosing to run with the local server, see the local server configuration in the [server folder](https://github.com/project-lux/lux-frontend#running-server-locally).
2. Content mangament service (CMS) server (the application can run without this step)
2. IDE
3. [Node](https://nodejs.org/en)
    - Minimum required Node version is 14.18.1, however, it is recommended to have the latest version of Node installed.
4. npm (for installing pnpm)
5. [pnpm](https://pnpm.io/)

## Steps

1. Clone [https://github.com/project-lux/lux-frontend](https://github.com/project-lux/lux-frontend) repo.
2. Run `pnpm install`
3. [Configure your environment](#configuration)
4. Run `pnpm start` and navigate in a browser to https://localhost:3000

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

### `pnpm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm lint`

Runs [eslint](https://eslint.org/) for finding errors in the code.

### `pnpm build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
