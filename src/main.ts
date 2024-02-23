import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import { addHoveredTile } from "./hovered-tile"
import { addPlaneControl } from "./plane-control"
import { addStartFinishMarkers, INITIAL_FINISH_POSITION, INITIAL_START_POSITION } from "./start-finish-markers"
import { addPathLayer } from "./path-layer"
import { addLinkLayer, fetchLinks, initLinks } from "./link-layer"
import { addTileLayers } from "./tile-layers"
import { processPathResponse, requestPath } from "./request-path"
import { pointToLatLng } from "./util"

const pendingLinks = fetchLinks()
const pendingInitialPathRequest = requestPath({
	start: INITIAL_START_POSITION,
	finish: INITIAL_FINISH_POSITION,
})

const map = L.map("map", { crs: L.CRS.Simple })

map.fitBounds(
	L.latLngBounds(
		pointToLatLng({
			y: INITIAL_FINISH_POSITION.y,
			x: INITIAL_FINISH_POSITION.x - 100,
		}),
		pointToLatLng({
			y: INITIAL_START_POSITION.y,
			x: INITIAL_START_POSITION.x + 100,
		})
	)
)

document.getElementById("map")?.style.setProperty("cursor", "url(/cursor-dragon-scimitar.png), auto")

addTileLayers(map)
addHoveredTile(map)
addStartFinishMarkers(map)
addLinkLayer(map)
addPathLayer(map)
addPlaneControl(map)

pendingLinks
	.then((links) => initLinks(links))
	.then(() => processPathResponse(pendingInitialPathRequest, false))
	.catch((e) => console.error(e)) //fetch links failed
