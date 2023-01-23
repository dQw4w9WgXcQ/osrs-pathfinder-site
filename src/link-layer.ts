import * as L from 'leaflet';
import {PLANE_COUNT} from "./plane-control";
import {capitalize, pointToLatLng} from "./util";
import {Link, Links, LinkType, Position} from "./dto";

const stairIcon = L.icon({iconUrl: '/stair.png', iconSize: [32, 32]})
const doorIcon = L.icon({iconUrl: '/door.png', iconSize: [16, 32]})
const dungeonIcon = L.icon({iconUrl: '/dungeon.png', iconSize: [32, 32]})

const doorMarkers: L.Marker[] = []
const stairMarkers: L.Marker[] = []
const dungeonMarkers: L.Marker[] = []

export function addLinkLayer(map: L.Map) {
    const doorPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT).fill(null).map(() => L.layerGroup())
    const stairPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT).fill(null).map(() => L.layerGroup())
    const dungeonPlaneLayers: L.LayerGroup[] = Array(PLANE_COUNT).fill(null).map(() => L.layerGroup())

    const doorLayer = L.layerGroup([doorPlaneLayers[0]])
    const stairLayer = L.layerGroup([stairPlaneLayers[0]])
    const dungeonLayer = L.layerGroup([dungeonPlaneLayers[0]])

    map.on('planechange', (e) => {
        doorLayer.clearLayers()
        stairLayer.clearLayers()
        dungeonLayer.clearLayers()

        const plane = (e as any).plane as number
        doorLayer.addLayer(doorPlaneLayers[plane])
        stairLayer.addLayer(stairPlaneLayers[plane])
        dungeonLayer.addLayer(dungeonPlaneLayers[plane])
    })

    fetchLinks()
        .then(links => {
            if (links === undefined) {
                throw new Error('Failed to fetch links')
            }

            addLinks(links.doorLinks, 'DOOR', doorMarkers, doorIcon, doorPlaneLayers)
            addLinks(links.stairLinks, 'STAIR', stairMarkers, stairIcon, stairPlaneLayers)
            addLinks(links.dungeonLinks, 'DUNGEON', dungeonMarkers, dungeonIcon, dungeonPlaneLayers)
        })
        .catch(error => console.error(error))

    const control = L.control.layers(
        undefined,
        {
            "Doors": doorLayer,
            "Stairs & Ladders": stairLayer,
            "Dungeons": dungeonLayer,
        },
        {collapsed: false}
    )

    map.addControl(control)
}

export function getMarker(type: LinkType, id: number) {
    switch (type) {
        case 'DOOR':
            return doorMarkers[id]
        case 'STAIR':
            return stairMarkers[id]
        case 'DUNGEON':
            return dungeonMarkers[id]
    }
}

function addLinks(links: Link[], type: LinkType, markers: L.Marker[], icon: L.Icon, planeLayers: L.LayerGroup[]) {
    links.forEach(link => {
        const marker = L.marker(pointToLatLng(link.origin), {icon: icon})
        marker.bindTooltip(linkDescription(type, link, type !== 'DOOR'))
        markers.push(marker)
        marker.addTo(planeLayers[link.origin.plane])
    })
}

function toCoordString(position: Position, includePlane: boolean) {
    return `(${position.x}, ${position.y}${includePlane ? `, ${position.plane}` : ''})`
}

function linkDescription(type: LinkType, link: Link, includePlane: boolean) {
    let objectId = (link as any).objectId ? (link as any).objectId : '';
    return `${capitalize(type)}#${link.id}<br>Object ID: ${objectId}<br>From: ${toCoordString(link.origin, includePlane)}<br>To: ${toCoordString(link.destination, includePlane)}`
}

async function fetchLinks() {
    return fetch('/links.json')
        .then(response => response.json())
        .then(data => data as Links)
        .catch(error => console.error(error))
}