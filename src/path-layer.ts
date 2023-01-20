import * as L from 'leaflet'

const layer = L.layerGroup()

export function addPathLayer(map: L.Map) {
    map.addLayer(layer)
}

export function setPath(path: any[]) {
    layer.clearLayers()
}

function addLines(lines: [number, number, number, number][], color: string) {
    for (const [x1, y1, x2, y2] of lines) {
        L.polyline([[x1, y1], [x2, y2]], {color}).addTo(layer)
    }
}