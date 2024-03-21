import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import { addHoveredTile } from "./hovered-tile"
import { addPlaneControl } from "./plane-control"
import {
	addAlgoControl,
	addStartEndMarkers,
	currentAlgo,
	INITIAL_END_POSITION,
	INITIAL_START_POSITION,
} from "./start-end-markers"
import { addPathLayer } from "./path-layer"
import { addLinkLayer, fetchLinks, initLinks } from "./link-layer"
import { addTileLayers } from "./tile-layers"
import { processPathResponse, requestPath } from "./request-path"
import { pointToLatLng } from "./util"

const pendingLinks = fetchLinks()
const pendingInitialPathRequest = requestPath({
	start: INITIAL_START_POSITION,
	end: INITIAL_END_POSITION,
	algo: currentAlgo,
})

const map = L.map("map", { crs: L.CRS.Simple })

map.fitBounds(
	L.latLngBounds(
		pointToLatLng({
			y: INITIAL_END_POSITION.y,
			x: INITIAL_END_POSITION.x - 100,
		}),
		pointToLatLng({
			y: INITIAL_START_POSITION.y,
			x: INITIAL_START_POSITION.x + 100,
		})
	)
)

function addCursorControl(map: L.Map) {
	map.addControl(new CursorControl())
}

const CursorControl = L.Control.extend({
	options: {
		position: "bottomright",
	},
	onAdd: function (map: L.Map) {
		const containerName = "leaflet-control-cursor"
		const container = L.DomUtil.create("div", `${containerName} leaflet-bar`)
		container.style.backgroundColor = "white"
		L.DomEvent.disableClickPropagation(container)

		const label = L.DomUtil.create("label", `${containerName}-label`, container)
		label.textContent = " Dragon Scimitar Cursor"
		container.appendChild(label)

		const input = L.DomUtil.create("input", `${containerName}-select`, container)
		input.type = "checkbox"
		container.appendChild(input)

		input.onchange = () => {
			if (input.checked) {
				document.getElementById("map")?.style.setProperty("cursor", "url(/cursor-dragon-scimitar.png), auto")
			} else {
				document.getElementById("map")?.style.removeProperty("cursor")
			}
		}

		return container
	},
})

addTileLayers(map)
addHoveredTile(map)
addStartEndMarkers(map)
addLinkLayer(map)
addPathLayer(map)
addPlaneControl(map)
addAlgoControl(map)
addCursorControl(map)

pendingLinks
	.then((links) => initLinks(links))
	.then(() => processPathResponse(pendingInitialPathRequest, false))
	.catch((e) => console.error(e)) //fetch links failed
