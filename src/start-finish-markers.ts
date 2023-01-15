import * as L from "leaflet";
import {currentPlane} from "./plane";

const PLANE_COLORS = ['red', 'blue', 'green', 'yellow'];

let pathLinesLayer = L.layerGroup()

let startPlane = currentPlane
let finishPlane = currentPlane

export function addStartFinishMarkers(map: L.Map) {
    let startMarkerTooltip = L.tooltip({direction: 'right'})
    let startMarker = L.marker([3232, 3232], {draggable: true}).addTo(map)
        .bindPopup('Start (drag me)')
        .bindTooltip(startMarkerTooltip)
        .openPopup();
    setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng())
    startMarker.on('move', () => {
        setTooltipCoordinates(startMarkerTooltip, startMarker.getLatLng())
    })

    let finishMarkerTooltip = L.tooltip({direction: 'right'})
    let finishMarker = L.marker([3480, 3165], {draggable: true}).addTo(map)
        .bindPopup('Finish (drag me)')
        .bindTooltip(finishMarkerTooltip)
        .openPopup();
    setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng())
    finishMarker.on('move', () => {
        setTooltipCoordinates(finishMarkerTooltip, finishMarker.getLatLng())
    })

    startMarker.on('dragend', () => {
        startPlane = currentPlane
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