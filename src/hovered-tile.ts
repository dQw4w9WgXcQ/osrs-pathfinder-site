import * as L from 'leaflet'
import { toBounds } from './util'

let hoveredTile: L.Rectangle = L.rectangle(toBounds(L.latLng(0, 0)), {
  color: 'yellow',
  weight: 2,
  interactive: false,
})

export function addHoveredTile(map: L.Map) {
  hoveredTile.addTo(map)
  map.on('mousemove', (e) => {
    let bounds = toBounds(e.latlng)

    hoveredTile.setBounds(bounds)
  })
}
