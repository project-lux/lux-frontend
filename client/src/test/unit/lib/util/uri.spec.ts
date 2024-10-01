import { getRouteNames } from '../../../../config/routerPages'
import { getPath, getTargetName } from '../../../../lib/util/uri'
import { physicalObject as mockObject } from '../../../data/object'

describe('uri exported functions', () => {
  describe('getPath', () => {
    it('returns only pathname', () => {
      expect(
        getPath(
          'http://enpoint.yale.edu/view/set/7fab7de6-da35-4b50-bffe-b2b5e7bafff8',
        ),
      ).toEqual('set/7fab7de6-da35-4b50-bffe-b2b5e7bafff8')
    })
  })

  describe('getTargetName', () => {
    it('returns targetName of entity page', () => {
      const pathname = '/view/object/mock-object'
      const routes = getRouteNames()
      const isNotAnEntityPage = false
      const isSuccess = true
      const data = mockObject
      expect(
        getTargetName(pathname, routes, isNotAnEntityPage, isSuccess, data),
      ).toEqual('Mock Object')
    })

    it('returns targetName of results page', () => {
      const pathname = '/view/results/works'
      const routes = getRouteNames()
      const isNotAnEntityPage = true
      const isSuccess = false
      const data = undefined
      expect(
        getTargetName(pathname, routes, isNotAnEntityPage, isSuccess, data),
      ).toEqual('Results Page')
    })

    it('returns targetName of cms pages', () => {
      const routes = getRouteNames()
      const keys = Array.from(routes.keys())
      const pathname = keys[Math.floor(Math.random() * keys.length)]
      const isNotAnEntityPage = true
      const isSuccess = false
      const data = undefined
      const returnedTargetName = routes.get(pathname)
      expect(
        getTargetName(pathname, routes, isNotAnEntityPage, isSuccess, data),
      ).toEqual(returnedTargetName)
    })

    it('returns targetName of 404 pages', () => {
      const pathname = '/not/a/real/path'
      const routes = getRouteNames()
      const isNotAnEntityPage = true
      const isSuccess = false
      const data = undefined
      expect(
        getTargetName(pathname, routes, isNotAnEntityPage, isSuccess, data),
      ).toEqual('404 Page Not Found')
    })
  })
})
