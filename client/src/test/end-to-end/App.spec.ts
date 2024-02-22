import puppeteer, { Browser, Page } from 'puppeteer'

let browser: Browser
let page: Page

describe('Main screen', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    })
    page = await browser.newPage()
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle0',
    })
  })

  it('should have lux text', async () => {
    const text = await page.evaluate(() => document.body.textContent)
    expect(text).toContain('LUX')
  })

  it('matches screenshot', async () => {
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  afterEach(async () => {
    browser.close()
  })
})
