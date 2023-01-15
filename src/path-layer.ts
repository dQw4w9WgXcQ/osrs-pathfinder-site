import * as L from 'leaflet'

const pathLayer = L.layerGroup()

export function addPathLayer(map: L.Map) {
    pathLayer.addTo(map)
}

export function setPath(path: [number, number][]) {
    pathLayer.clearLayers()

    let prev: L.LatLng | undefined = undefined
    path.forEach(([x, y], i) => {
        let latlng = L.latLng(y + 0.5, x + 0.5);

        if (prev) {
            let line = L.polyline([prev, latlng], {color: 'blue'})
            line.addTo(pathLayer)
        }

        prev = latlng
    })
}