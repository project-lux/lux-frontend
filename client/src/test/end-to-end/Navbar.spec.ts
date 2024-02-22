import puppeteer, { Browser, Page } from 'puppeteer'

let browser: Browser
let page: Page

describe('Navbar', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    })
    page = await browser.newPage()

    await page.emulate(puppeteer.devices['iPhone 6'])

    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle0',
    })
  })

  it('matches screenshot', async () => {
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })

  afterEach(async () => {
    browser.close()
  })
})
