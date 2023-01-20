import * as L from "leaflet";
import {LatLng} from "leaflet";
import {toRectangleBounds} from "./util";

let hoveredTile: L.Rectangle = L.rectangle(
    toRectangleBounds(new LatLng(0, 0)),
    {color: 'yellow', weight: 2, interactive: false}
)

export function addHoveredTile(map: L.Map) {
    hoveredTile.addTo(map)
    map.on('mousemove', (e) => {
        let bounds = toRectangleBounds(e.latlng)

        hoveredTile.setBounds(bounds)
    })
}