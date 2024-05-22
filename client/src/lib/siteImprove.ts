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

/**
 * Pushes event tracking
 * @param {string} category; the Site Improve event category
 * @param {string} action; the action the user took to trigger the event
 * @param {string} label optional; the label of the event which is a subcategory
 * @returns {void}
 */
export const pushSiteImproveEvent = (
  category: string,
  action: string,
  label?: string,
): void => {
  const args = label
    ? ['event', category, action, label]
    : ['event', category, action]
  if (window && window._sz) {
    window._sz.push(args)
  }
}

/**
 * Pushes page tracking
 * @param {string} targetUrl; the URL the user is navigating to
 * @param {string} currentUrl; the URL the user is navigating from
 * @param {string} targetTitle; the name of the page passed via state props
 * @returns {void}
 */
export const pushSiteImprovePageEvent = (
  targetUrl: string,
  currentUrl: string,
  targetTitle: string,
): void => {
  if (window && window._sz) {
    window._sz.push([
      'trackdynamic',
      {
        url: targetUrl,
        ref: currentUrl,
        title: targetTitle,
      },
    ])
  }
}
