import * as W from 'wellknown' // WKT parser
import bbox from '@turf/bbox'
import centroid from '@turf/centroid'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export const cleanWkt = (wkt: string): string =>
  wkt
    .replace(/(\w+)\s\s+\(/, '$1 (')
    .replace(/\(\s+/, '(')
    .replace(/\s+\)/, ')')

export interface IWktParseResult {
  geoJson: W.GeoJSONGeometry
  type: string
  center: L.LatLngExpression
  bounds: L.LatLngBoundsExpression
  zoom: number | undefined
  mapContainerKey: string
}

export const parseWkt = (wktStr: string): IWktParseResult => {
  const s = cleanWkt(wktStr)
  const geo: W.GeoJSONGeometry = W.parse(s)
  const res = {
    geoJson: geo,
    type: geo === null ? 'Point' : geo.type,
    center: [0, 0] as [number, number],
    bounds: L.latLngBounds([
      [0, 0],
      [0, 0],
    ]),
    zoom: geo !== null && geo.type === 'Point' ? 12 : undefined,
    mapContainerKey: '',
  }

  if (geo === null) {
    return res
  }

  const c = centroid(geo).geometry.coordinates
  res.center = [c[1], c[0]]

  const bb = bbox(geo)
  res.bounds = L.latLngBounds([
    [bb[1], bb[0]],
    [bb[3], bb[2]],
  ])

  res.mapContainerKey = `${c[1]}-${c[0]}-${res.zoom}`

  return res
}
