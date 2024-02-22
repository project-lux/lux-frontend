import { cleanWkt, parseWkt } from '../../../lib/parse/data/mapHelper'

describe('mapHelper exported functions', () => {
  describe('cleanWkt', () => {
    it('returns transformed wkt', () => {
      const wkt = cleanWkt('POINT ( -72.9306 41.3079 )')
      expect(wkt).toEqual('POINT (-72.9306 41.3079)')
    })
  })

  describe('parseWkt with a polygon', () => {
    const mockPolygon =
      'POLYGON ((-80.09551 40.36157, -79.86579 40.36157, -79.86579 40.50104, -80.09551 40.50104, -80.09551 40.36157))'
    const result = parseWkt(mockPolygon)

    it('returns polygon center', () => {
      expect(result.center).toEqual([40.431305, -79.98065])
    })

    it('returns polygon type', () => {
      expect(result.type).toEqual('Polygon')
    })

    it('returns polygon zoom', () => {
      expect(result.zoom).toEqual(undefined)
    })

    it('returns point mapContainerKey', () => {
      expect(result.mapContainerKey).toEqual('40.431305--79.98065-undefined')
    })
  })

  describe('parseWkt with a polygon', () => {
    const mockPoint = 'POINT ( -72.9306 41.3079 )'
    const result = parseWkt(mockPoint)

    it('returns point center', () => {
      expect(result.center).toEqual([41.3079, -72.9306])
    })

    it('returns point type', () => {
      expect(result.type).toEqual('Point')
    })

    it('returns point zoom', () => {
      expect(result.zoom).toEqual(12)
    })

    it('returns point mapContainerKey', () => {
      expect(result.mapContainerKey).toEqual('41.3079--72.9306-12')
    })
  })
})
