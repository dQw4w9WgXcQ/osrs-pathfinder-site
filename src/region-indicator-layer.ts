import * as L from 'leaflet'
import { PolylineOptions } from 'leaflet'
import { toLatLng } from './util'

const REGION_X_MAX = 66
const REGION_Y_MAX = 196
const REGION_SIZE = 64
const Y_MAX = (REGION_X_MAX + 1) * REGION_SIZE
const X_MAX = (REGION_Y_MAX + 1) * REGION_SIZE

let regionTooltip: L.Tooltip | undefined = undefined

export function createRegionIndicatorLayer(map: L.Map) {
  const layer = L.layerGroup()

  map.on('mousemove', (e) => {
    const regionX = Math.trunc(e.latlng.lng / REGION_SIZE)
    const xRegion = Math.trunc(e.latlng.lng) % REGION_SIZE
    const regionY = Math.trunc(e.latlng.lat / REGION_SIZE)
    const yRegion = Math.trunc(e.latlng.lat) % REGION_SIZE
    const tooltipLatLng = toLatLng(
      regionX * REGION_SIZE + REGION_SIZE / 2 + 0.5,
      regionY * REGION_SIZE + REGION_SIZE / 2 + 0.5
    )
    if (regionTooltip === undefined) {
      regionTooltip = L.tooltip({ permanent: true, direction: 'center' })
      regionTooltip.setLatLng(tooltipLatLng)
      regionTooltip.addTo(layer)
    }

    regionTooltip.setLatLng(tooltipLatLng)
    regionTooltip.setContent('(' + regionX + ', ' + regionY + ') (' + xRegion + ', ' + yRegion + ')')
  })

  const opts: PolylineOptions = {
    color: 'black',
    weight: 1,
    interactive: false,
  }

  for (let x = 0; x <= REGION_X_MAX + 1; x++) {
    L.polyline(
      [
        [0, x * REGION_SIZE],
        [X_MAX, x * REGION_SIZE],
      ],
      opts
    ).addTo(layer)
  }

  for (let y = 0; y <= REGION_Y_MAX + 1; y++) {
    L.polyline(
      [
        [y * REGION_SIZE, 0],
        [y * REGION_SIZE, Y_MAX],
      ],
      opts
    ).addTo(layer)
  }

  return layer
}
