import * as L from "leaflet"
import {currentPlane} from "./plane-control"
import {latLngToPoint, pointToLatLng, toBounds} from "./util";
import {Point, Position} from "./dto";
import {requestPath} from "./request-path";

export const INITIAL_START_POSITION = {x: 3222, y: 3218, plane: 0}//lumbridge
export const INITIAL_FINISH_POSITION = {x: 2515, y: 3160, plane: 0}//tree gnome village

export function addStartFinishMarkers(map: L.Map) {
    startMarker.on('dragend', () => {
        if (JSON.stringify(startPositionDrag) != JSON.stringify(startPosition)) {
            startPositionDrag = startPosition
            requestPath({start: startPosition, finish: finishPosition})
        }
    })

    finishMarker.on('dragend', () => {
        if (JSON.stringify(finishPositionDrag) != JSON.stringify(finishPosition)) {
            finishPositionDrag = finishPosition
            requestPath({start: startPosition, finish: finishPosition})
        }
    })

    startMarker.addTo(map)
    finishMarker.addTo(map)

    startTile.addTo(map)
    finishTile.addTo(map)

    finishMarker.openPopup()
}

export function setTileIndicators(start: Point, finish: Point) {
    startTile.setBounds(toBounds(pointToLatLng(start)))
    finishTile.setBounds(toBounds(pointToLatLng(finish)))
}

let startPosition = INITIAL_START_POSITION
let finishPosition = INITIAL_FINISH_POSITION

let startPositionDrag = startPosition
let finishPositionDrag = finishPosition

const startMarker = L.marker(
    pointToLatLng(INITIAL_START_POSITION),
    {
        draggable: true,
        icon: L.icon({
            iconUrl: '/marker-icon-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
        })
    }
).bindPopup('Start (drag me)')
    .bindTooltip(L.tooltip({direction: 'right'}))
    .on('move', () => {
        startPosition = {...latLngToPoint(startMarker.getLatLng()), plane: currentPlane}
        setTooltipText(startMarker, startPosition)
        startTile.setBounds(toBounds(startMarker.getLatLng()))
    })
const finishMarker = L.marker(
    pointToLatLng(INITIAL_FINISH_POSITION),
    {
        draggable: true,
        icon: L.icon({
            iconUrl: '/marker-icon-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
        })
    }
).bindPopup('Finish (drag me)')
    .bindTooltip(L.tooltip({direction: 'right'}))
    .on('move', () => {
        finishPosition = {...latLngToPoint(finishMarker.getLatLng()), plane: currentPlane}
        setTooltipText(finishMarker, finishPosition)
        finishTile.setBounds(toBounds(finishMarker.getLatLng()))
    })

setTooltipText(startMarker, startPosition)
setTooltipText(finishMarker, finishPosition)

const startTile = L.rectangle(toBounds(startMarker.getLatLng()), {
    color: 'green',
    weight: 2,
    interactive: false
})
const finishTile = L.rectangle(toBounds(finishMarker.getLatLng()), {
    color: 'red',
    weight: 2,
    interactive: false
})

function setTooltipText(marker: L.Marker, position: Position) {
    marker.getTooltip()!.setContent('(' + position.x + ', ' + position.y + ', ' + position.plane + ')')
}