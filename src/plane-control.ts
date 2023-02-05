import * as L from 'leaflet'

export const PLANE_COUNT = 4

export let currentPlane = 0

export function changePlane(map: L.Map, plane: number) {
  if (plane < 0) {
    plane = 0
  }

  if (plane >= PLANE_COUNT) {
    plane = PLANE_COUNT - 1
  }

  if (plane === currentPlane) return

  currentPlane = plane

  map.fire('planechange', { plane: plane })
}

export function addPlaneControl(map: L.Map) {
  map.addControl(new PlaneControl())
}

const PlaneControl = L.Control.extend({
  options: {
    position: 'topleft',
  },
  onAdd: function (map: L.Map) {
    const containerName = 'leaflet-control-plane'
    const container = L.DomUtil.create('div', `${containerName} leaflet-bar`)

    const upButton = L.DomUtil.create('a', `${containerName}-up`, container)
    upButton.innerHTML = '<div style="cursor:pointer;user-select: none;">▲Z</div>'
    upButton.title = 'Plane Up'
    upButton.onclick = () => changePlane(map, currentPlane + 1)
    L.DomEvent.disableClickPropagation(upButton)

    const downButton = L.DomUtil.create('a', `${containerName}-down`, container)
    downButton.innerHTML = '<div style="cursor:pointer;user-select: none;">▼Z</div>'
    downButton.title = 'Plane Down'
    downButton.onclick = () => changePlane(map, currentPlane - 1)
    L.DomEvent.disableClickPropagation(downButton)

    return container
  },
})
