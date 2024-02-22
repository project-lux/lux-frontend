declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    _sz: {
      push: (args: string[]) => void
    }
  }
}

export const pushSiteImproveEvent = (
  category: string,
  action: string,
  label?: string,
): void => {
  const args = label
    ? ['event', category, action, label]
    : ['event', category, action]
  window._sz.push(args)
}
