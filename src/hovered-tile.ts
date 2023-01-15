import * as L from "leaflet";
import {LatLng} from "leaflet";

let hoveredTile: L.Rectangle = L.rectangle(
    getTileBounds(new LatLng(0, 0)),
    {color: 'yellow', weight: 2, interactive: false}
)

export function addHoveredTile(map: L.Map) {
    hoveredTile.addTo(map)
    map.on('mousemove', (e) => {
        let bounds = getTileBounds(e.latlng)

        hoveredTile.setBounds(bounds)
    })
}

export function getTileBounds(latlng: L.LatLng): L.LatLngBounds {
    let lat = Math.trunc(latlng.lat)
    let lng = Math.trunc(latlng.lng)
    return L.latLngBounds([lat, lng], [lat + 1, lng + 1])
}