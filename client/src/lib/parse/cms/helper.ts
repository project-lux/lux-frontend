import sanitizeHtml from 'sanitize-html'

export const processHtml = (html: string): string => {
  const html2 = html.replaceAll(
    new RegExp('<a\\s.*?href="(.*?)".*?>(.*?)</a>', 'g'),
    (m0, m1, m2) => {
      if (m1.startsWith('http')) {
        return `<a target="_blank" href="${m1}">${m2} <i class="bi bi-box-arrow-in-up-right"></i></a>`
      }
      return `<a href="${m1}">${m2}</a>`
    },
  )

  return sanitizeHtml(html2, {
    allowedClasses: {
      i: ['bi', 'bi-box-arrow-in-up-right'],
    },
  })
}
