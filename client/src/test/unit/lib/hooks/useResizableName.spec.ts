import { shortenIfNeeded } from '../../../../lib/hooks/useResizableName'

describe('useResizbleName exported functions', () => {
  describe('shortenIfNeeded', () => {
    it('returns shortened array', () => {
      const longTitle =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      const shortTitle =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...'
      expect(shortenIfNeeded(longTitle)).toEqual(shortTitle)
    })
  })
})
