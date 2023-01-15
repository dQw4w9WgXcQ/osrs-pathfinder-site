import * as L from "leaflet";
import {currentPlane} from "./plane";
import {getTileBounds} from "./hovered-tile";

const PLANE_COLORS = ['red', 'blue', 'green', 'yellow'];

let pathLinesLayer = L.layerGroup()

let startPlane = currentPlane
let finishPlane = currentPlane

export function addStartFinishMarkers(map: L.Map) {
    let startMarkerTooltip = L.tooltip({direction: 'right'})
    let startMarker = L.marker([3232.5, 3232.5], {draggable: true}).addTo(map)
        .bindPopup('Start (drag me)')
        .bindTooltip(startMarkerTooltip)
        .openPopup();
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
    let finishMarker = L.marker([3480.5, 3165.5], {draggable: true}).addTo(map)
        .bindPopup('Finish (drag me)')
        .bindTooltip(finishMarkerTooltip)
        .openPopup();
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

    pathLinesLayer.addTo(map)
}

function setTooltipCoordinates(tooltip: L.Tooltip, latlng: L.LatLng) {
    let lat = Math.trunc(latlng.lat)
    let lng = Math.trunc(latlng.lng)
    tooltip.setContent('(' + lat + ', ' + lng + ')')
}