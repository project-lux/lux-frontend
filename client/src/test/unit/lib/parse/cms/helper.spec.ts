import { processHtml } from '../../../../../lib/parse/cms/helper'

describe('processHtml', () => {
  it('converts external link correctly', () => {
    const text = `See <a href="https://wikipedia.org">wikipedia</a> for further info`

    expect(processHtml(text)).toEqual(
      'See <a target="_blank" href="https://wikipedia.org">wikipedia <i class="bi bi-box-arrow-in-up-right"></i></a> for further info',
    )
  })
  it('converts internal link correctly', () => {
    const text = `See <a href="/view/person/1efc">guy noir</a> for further info`

    expect(processHtml(text)).toEqual(
      'See <a href="/view/person/1efc">guy noir</a> for further info',
    )
  })
})
