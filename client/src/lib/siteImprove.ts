interface IPageEvent {
  url: string
  ref: string
  title: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    _sz: {
      push: (args: Array<string | IPageEvent>) => void
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

export const pushSiteImprovePageEvent = (
  targetUrl: string,
  currentUrl: string,
  targetTitle: string,
): void => {
  window._sz.push([
    'trackdynamic',
    {
      url: targetUrl,
      ref: currentUrl,
      title: targetTitle,
    },
  ])
}
