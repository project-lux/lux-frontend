import 'dotenv/config'
import os from 'os'
import cluster from 'cluster'

import { newApp } from './app/app'
import * as env from './config/env'
import * as log from './lib/log'

const numCores = os.cpus().length
const numInstances = env.numInstances === -1 ? numCores * 2 : env.numInstances

if (cluster.isMaster) {
  log.info(`luxEnv: ${env.luxEnv}`)
  log.info(`numCores: ${numCores}`)
  log.info(`numInstances: ${numInstances}`)
  log.info(`dataApiUrl: ${env.dataApiBaseUrl}`)
  log.info(`cmsApiUrl: ${env.cmsApiBaseUrl}`)
}

if (numInstances > 2) {
  if (cluster.isMaster) {
    for (let i = 0; i < numInstances; i += 1) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      log.info(`Worker ${worker.id} died with code=${code}, signal=${signal}`)
      const newWorker = cluster.fork()
      log.info(`Worker ${newWorker.id} created.`)
    })
  } else {
    const app = newApp({
      port: 8080,
    })
    app.run()
  }
} else {
  const app = newApp({
    port: env.port,
  })
  app.run()
}
