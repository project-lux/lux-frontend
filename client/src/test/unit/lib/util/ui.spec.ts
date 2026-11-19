import React from 'react'

import { getColumnWidth, getListItemKey } from '../../../../lib/util/ui'

describe('ui exported functions', () => {
  describe('getColumnWidth', () => {
    it('returns array with column class names when false', () => {
      expect(getColumnWidth(false)).toStrictEqual(['col-md-9', 'col-md-3'])
    })

    it('returns array with column class names when true', () => {
      expect(getColumnWidth(true)).toStrictEqual(['col-md-12', 'col-md-12'])
    })
  })

  describe('getListItemKey', () => {
    it('returns the string value with the index', () => {
      expect(getListItemKey('some text', 2)).toEqual('some text-2')
    })

    it('returns the existing element key with the index', () => {
      const element = React.createElement('span', { key: 'https://lux/1' })
      expect(getListItemKey(element, 0)).toEqual('https://lux/1-0')
    })

    it('returns unique keys for elements that share a key', () => {
      const first = React.createElement('span', { key: 'https://lux/1' })
      const second = React.createElement('span', { key: 'https://lux/1' })
      expect(getListItemKey(first, 0)).not.toEqual(getListItemKey(second, 1))
    })

    it('returns a generic key for elements without a key', () => {
      const element = React.createElement('span')
      expect(getListItemKey(element, 3)).toEqual('element-3')
    })

    it('returns the value with the index for null', () => {
      expect(getListItemKey(null, 1)).toEqual('null-1')
    })
  })
})
