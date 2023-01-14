import * as L from "leaflet";

let cursorTile: L.Rectangle | undefined = undefined
export function registerHoveredTile(map: L.Map) {
    map.on('mousemove', (e) => {
        let lat = Math.trunc(e.latlng.lat)
        let lng = Math.trunc(e.latlng.lng)
        let bounds = L.latLngBounds([lat, lng], [lat + 1, lng + 1])

        if (cursorTile === undefined) {
            cursorTile = L.rectangle(bounds, {color: 'yellow', weight: 2, interactive: false})
            cursorTile.addTo(map)
        } else if (cursorTile.getBounds() != bounds) {
            cursorTile.setBounds(bounds)
        }
    })
}