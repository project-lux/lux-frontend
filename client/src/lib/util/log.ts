import config from '../../config/config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debug(message: string, ...optionalParams: any[]): void {
  if (config.env.luxEnv !== 'production') {
    console.log(`[DEBUG] ${message}`, ...optionalParams)
  }
}
