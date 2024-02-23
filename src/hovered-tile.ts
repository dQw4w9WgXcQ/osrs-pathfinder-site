import * as L from "leaflet"
import { toBounds } from "./util"

const hoveredTile: L.Rectangle = L.rectangle(toBounds(L.latLng(0, 0)), {
	color: "yellow",
	weight: 2,
	interactive: false,
})

export function addHoveredTile(map: L.Map) {
	hoveredTile.addTo(map)
	map.on("mousemove", (e) => {
		const bounds = toBounds(e.latlng)

		hoveredTile.setBounds(bounds)
	})
}
