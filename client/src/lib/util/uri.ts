export function getPath(uri: string): string {
  return uri.replace(/https?:\/\/[^/]+\/\w+\//, '')
}
