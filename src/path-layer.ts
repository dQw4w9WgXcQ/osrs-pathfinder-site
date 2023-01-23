import * as L from 'leaflet'
import {getMarker} from "./link-layer";
import {pointToLatLng} from "./util";
import {LinkStep, LinkType, PathStep, Point, WalkStep} from "./dto";

const layer = L.layerGroup()

export function addPathLayer(map: L.Map) {
    map.addLayer(layer)
}

export function setPath(steps: PathStep[] | null) {
    layer.clearLayers()

    if (steps === null) return

    let walkPaths: Point[][] = []
    let teleportPaths: Point[][] = []
    let linkPaths: Point[][] = []
    for (let step of steps) {
        if (step.type === 'WALK') {
            let walkStep = step as WalkStep
            walkPaths.push(walkStep.path)
        } else if (step.type === 'TELEPORT') {
            // let teleportStep = step as TeleportStep
            // addTeleportMarker(teleportStep.id)
            // linkPaths.push([linkStep.link.origin, linkStep.link.destination])
        } else {
            let linkStep = step as LinkStep
            addLinkMarker(linkStep.type, linkStep.link.id)
            linkPaths.push([linkStep.link.origin, linkStep.link.destination])
        }
    }
    addMultiPolyLine(walkPaths, 'blue')
    addMultiPolyLine(teleportPaths, 'purple')
    addMultiPolyLine(linkPaths, 'cyan')
}

function addMultiPolyLine(path: Point[][], color: string) {
    let latLngs = path.map(points => points.map(pointToLatLng))
    L.polyline(latLngs, {color}).addTo(layer)
}

function addLinkMarker(type: LinkType, id: number) {
    getMarker(type, id).addTo(layer).openTooltip()
}