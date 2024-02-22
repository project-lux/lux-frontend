import winston from 'winston'

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
})

export function debug(s: string): void {
  logger.debug(`[${process.pid}] ${s}`)
}

export function info(s: string): void {
  logger.info(`[${process.pid}] ${s}`)
}

export function warn(s: string): void {
  logger.warn(`[${process.pid}] ${s}`)
}

export function error(s: string): void {
  logger.error(`[${process.pid}] ${s}`)
}
