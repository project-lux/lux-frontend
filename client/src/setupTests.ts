// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

jest.setTimeout(60000)
global.scrollTo = jest.fn()

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.02,
  failureThresholdType: 'percent',
})
expect.extend({ toMatchImageSnapshot })
