import * as L from "leaflet"
import { currentPlane } from "./plane-control"
import { latLngToPoint, pointToLatLng, toBounds } from "./util"
import { Algo, Point, Position } from "./dto"
import { doPath } from "./request-path"

export const INITIAL_START_POSITION: Position = { x: 3222, y: 3219, plane: 0 }
export const INITIAL_END_POSITION: Position = { x: 2662, y: 3298, plane: 0 }

export function addStartEndMarkers(map: L.Map) {
	startMarker.on("dragend", () => {
		if (JSON.stringify(startPositionDrag) != JSON.stringify(startPosition)) {
			startPositionDrag = startPosition
			doPath({ start: startPosition, end: endPosition, algo: currentAlgo })
		}
	})

	endMarker.on("dragend", () => {
		if (JSON.stringify(endPositionDrag) != JSON.stringify(endPosition)) {
			endPositionDrag = endPosition
			doPath({ start: startPosition, end: endPosition, algo: currentAlgo })
		}
	})

	startMarker.addTo(map)
	endMarker.addTo(map)

	startTile.addTo(map)
	endTile.addTo(map)

	endMarker.openPopup()
}

export function setTileIndicators(start: Point | undefined, end: Point | undefined) {
	if (start) {
		startTile.setBounds(toBounds(pointToLatLng(start)))
	}

	if (end) {
		endTile.setBounds(toBounds(pointToLatLng(end)))
	}
}

let startPosition = INITIAL_START_POSITION
let endPosition = INITIAL_END_POSITION

let startPositionDrag = startPosition
let endPositionDrag = endPosition

const startMarker = L.marker(pointToLatLng(INITIAL_START_POSITION), {
	draggable: true,
	icon: L.icon({
		iconUrl: "/marker-icon-green.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
	}),
})
	.bindPopup("Start (drag me)")
	.bindTooltip(L.tooltip({ direction: "right" }))
	.on("move", () => {
		startPosition = {
			...latLngToPoint(startMarker.getLatLng()),
			plane: currentPlane,
		}
		setTooltipText(startMarker, startPosition)
		startTile.setBounds(toBounds(startMarker.getLatLng()))
	})
const endMarker = L.marker(pointToLatLng(INITIAL_END_POSITION), {
	draggable: true,
	icon: L.icon({
		iconUrl: "/marker-icon-red.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
	}),
})
	.bindPopup("End (drag me)")
	.bindTooltip(L.tooltip({ direction: "right" }))
	.on("move", () => {
		endPosition = {
			...latLngToPoint(endMarker.getLatLng()),
			plane: currentPlane,
		}
		setTooltipText(endMarker, endPosition)
		endTile.setBounds(toBounds(endMarker.getLatLng()))
	})

setTooltipText(startMarker, startPosition)
setTooltipText(endMarker, endPosition)

const startTile = L.rectangle(toBounds(startMarker.getLatLng()), {
	color: "green",
	weight: 2,
	interactive: false,
})
const endTile = L.rectangle(toBounds(endMarker.getLatLng()), {
	color: "red",
	weight: 2,
	interactive: false,
})

function setTooltipText(marker: L.Marker, position: Position) {
	marker.getTooltip()!.setContent("(" + position.x + ", " + position.y + ", " + position.plane + ")")
}

export function addAlgoControl(map: L.Map) {
	map.addControl(new AlgoControl())
}

export let currentAlgo: Algo = "A_STAR"
const AlgoControl = L.Control.extend({
	options: {
		position: "bottomright",
	},
	onAdd: function (map: L.Map) {
		const containerName = "leaflet-control-algo"
		const container = L.DomUtil.create("div", `${containerName} leaflet-bar`)
		L.DomEvent.disableClickPropagation(container)

		const select = L.DomUtil.create("select", `${containerName}-select`, container)
		select.innerHTML = `
			<option value="A_STAR">A*</option>
			<option value="BFS">BFS</option>
		`
		select.value = currentAlgo
		select.onchange = () => {
			currentAlgo = select.value as Algo
		}

		return container
	},
})
