import * as L from "leaflet";

let hoveredTile: L.Rectangle | undefined = undefined

export function registerHoveredTile(map: L.Map) {
    map.on('mousemove', (e) => {
        let lat = Math.trunc(e.latlng.lat)
        let lng = Math.trunc(e.latlng.lng)
        let bounds = L.latLngBounds([lat, lng], [lat + 1, lng + 1])

        if (hoveredTile === undefined) {
            hoveredTile = L.rectangle(bounds, {color: 'yellow', weight: 2, interactive: false})
            hoveredTile.addTo(map)
        }

        hoveredTile.setBounds(bounds)
    })
}
