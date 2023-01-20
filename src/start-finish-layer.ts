import * as L from "leaflet"
import {currentPlane} from "./plane-control"
import {toBounds} from "./util";

let startPlane = currentPlane
let finishPlane = currentPlane

const startMarker = L.marker([3232.5, 3232.5], {draggable: true})
const finishMarker = L.marker([3480.5, 3165.5], {draggable: true})

export function setStartLocation(plane: number, x: number, y: number) {
    startMarker.setLatLng([y + 0.5, x + 0.5])
    startPlane = plane
}

export function setFinishLocation(plane: number, x: number, y: number) {
    finishMarker.setLatLng([y + 0.5, x + 0.5])
    finishPlane = plane
}

export function addStartFinishMarkers(map: L.Map) {
    let startTile = L.rectangle(toBounds(startMarker.getLatLng()), {
        color: 'green',
        weight: 2,
        interactive: false
    })
    let startMarkerTooltip = L.tooltip({direction: 'right'})
    startMarker.bindPopup('Start (drag me)')
        .bindTooltip(startMarkerTooltip)
    setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng(), startPlane)
    startMarker.on('move', () => {
        setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng(), startPlane)
        startTile.setBounds(toBounds(startMarker.getLatLng()))
    })
    startMarker.on('dragstart', () => {
        startPlane = currentPlane
    })
    startMarker.on('dragend', () => {
        startPlane = currentPlane
    })
    startMarker.addTo(map)
    startTile.addTo(map)

    let finishTile = L.rectangle(toBounds(finishMarker.getLatLng()), {
        color: 'red',
        weight: 2,
        interactive: false
    })
    let finishMarkerTooltip = L.tooltip({direction: 'right'})
    finishMarker.bindPopup('Finish (drag me)')
        .bindTooltip(finishMarkerTooltip)
    setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng(), finishPlane)
    finishMarker.on('move', () => {
        setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng(), finishPlane)
        finishTile.setBounds(toBounds(finishMarker.getLatLng()))
    })
    finishMarker.on('dragstart', () => {
        finishPlane = currentPlane
    })
    finishMarker.on('dragend', () => {
        finishPlane = currentPlane
    })
    finishMarker.addTo(map)
    finishTile.addTo(map)
    finishMarker.openPopup()
}

function setTooltipCoordinates(tooltip: L.Tooltip, latlng: L.LatLng, plane: number) {
    let lat = Math.trunc(latlng.lat)
    let lng = Math.trunc(latlng.lng)
    tooltip.setContent('(' + lat + ', ' + lng + ', ' + plane + ')')
}