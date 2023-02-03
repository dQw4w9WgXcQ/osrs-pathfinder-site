import * as L from 'leaflet'
import { Point } from './dto'

export function toBounds(latlng: L.LatLng): L.LatLngBounds {
  const lat = Math.trunc(latlng.lat)
  const lng = Math.trunc(latlng.lng)
  return L.latLngBounds([lat, lng], [lat + 1, lng + 1])
}

export function prettyString(s: string) {
  return (s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).replace(
    '_',
    ' '
  )
}

export function toLatLng(x: number, y: number) {
  return L.latLng(y, x)
}

export function pointToLatLng(point: Point) {
  return toLatLng(point.x + 0.5, point.y + 0.5)
}

export function latLngToPoint(latlng: L.LatLng) {
  return { x: Math.trunc(latlng.lng), y: Math.trunc(latlng.lat) }
}
