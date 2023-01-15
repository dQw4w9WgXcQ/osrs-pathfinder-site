import * as L from "leaflet"
import {currentPlane} from "./plane"
import {getTileBounds} from "./hovered-tile"

let startPlane = currentPlane
let finishPlane = currentPlane

let startMarker = L.marker([3232.5, 3232.5], {draggable: true})
let finishMarker = L.marker([3480.5, 3165.5], {draggable: true})

export function setStartMarkerLocation(plane: number, x: number, y: number) {
    startMarker.setLatLng([y + 0.5, x + 0.5])
    startPlane = plane
}

export function setFinishMarkerLocation(plane: number, x: number, y: number) {
    finishMarker.setLatLng([y + 0.5, x + 0.5])
    finishPlane = plane
}

export function addStartFinishMarkers(map: L.Map) {
    let startMarkerTooltip = L.tooltip({direction: 'right'})

    startMarker.bindPopup('Start (drag me)')
        .bindTooltip(startMarkerTooltip)
        .addTo(map)
    setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng())
    let startTile = L.rectangle(getTileBounds(startMarker.getLatLng()), {color: 'green', weight: 2, interactive: false})
    startTile.addTo(map)
    startMarker.on('move', () => {
        setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng())
        startTile.setBounds(getTileBounds(startMarker.getLatLng()))
    })
    startMarker.on('dragend', () => {
        startPlane = currentPlane
    })

    let finishMarkerTooltip = L.tooltip({direction: 'right'})
    finishMarker.bindPopup('Finish (drag me)')
        .bindTooltip(finishMarkerTooltip)
        .addTo(map)
        .openPopup()
    setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng())
    let finishTile = L.rectangle(getTileBounds(finishMarker.getLatLng()), {color: 'red', weight: 2, interactive: false})
    finishTile.addTo(map)
    finishMarker.on('move', () => {
        setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng())
        finishTile.setBounds(getTileBounds(finishMarker.getLatLng()))
    })
    finishMarker.on('dragend', () => {
        finishPlane = currentPlane
    })
}

function setTooltipCoordinates(tooltip: L.Tooltip, latlng: L.LatLng) {
    let lat = Math.trunc(latlng.lat)
    let lng = Math.trunc(latlng.lng)
    tooltip.setContent('(' + lat + ', ' + lng + ')')
}