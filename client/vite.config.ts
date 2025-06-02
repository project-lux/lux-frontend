import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // depending on your application, base can also be "/"
  return {
    base: '/',
    plugins: [react(), viteTsconfigPaths(), eslint()],
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    envPrefix: 'REACT_',
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
      hmr: true,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      testMatch: ['./src/test/**/*.spec.tsx'],
      globals: true,
    },
  }
})
