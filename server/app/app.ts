import path from 'path'

import cors from 'cors'
import express from 'express'

import * as env from '../config/env'
import * as log from '../lib/log'

export type AppConfig = {
  port: number
}

const robotsText = `User-agent: Twitterbot
Disallow:

User-agent: Googlebot
Disallow: /view/results/
Allow /

User-agent: *
Disallow: /
`

class App {
  port: number

  constructor(config: AppConfig) {
    this.port = config.port
  }

  run(): void {
    const { port } = this
    const exp = express()
    exp.use(cors())
    exp.use(express.static('public'))

    exp.get('/health', (req: express.Request, res: express.Response) => {
      res.json({
        status: 'ok',
      })
    })

    exp.get('/env', (req: express.Request, res: express.Response) => {
      res.json({
        dataApiBaseUrl: env.dataApiBaseUrl,
        facetsApiBaseUrl: env.facetsApiBaseUrl,
        cmsApiBaseUrl: env.cmsApiBaseUrl,
        wikidataImagePathname: env.wikidataImagePathname,
        luxWikidataManifestPrefix: env.luxWikidataManifestPrefix,
        luxFeedbackUrl: env.luxFeedbackUrl,
        luxEnv: env.luxEnv,
        maintenanceMode: env.maintenanceMode,
        maintenanceMessage: env.maintenanceMessage,
        cacheViewerMode: env.cacheViewerMode,
      })
    })

    exp.get('/robots.txt', (req: express.Request, res: express.Response) => {
      res.type('text/plain').send(robotsText)
    })

    exp.use((req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
    })

    exp.listen(port, () => {
      log.info(`Listening on port ${port}`)
    })
  }
}

export function newApp(config: AppConfig): App {
  const app = new App(config)
  return app
}
