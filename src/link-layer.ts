import * as L from 'leaflet';
import {PLANE_COUNT} from "./plane-control";

export type Point = {
    x: number
    y: number
}

export type Position = Point & {
    plane: number
}

export type Link = {
    id: number
    origin: Position
    destination: Position
}

export type Links = {
    doorLinks: Link[]
    stairLinks: Link[]
    dungeonLinks: Link[]
}

export type LinkType = 'door' | 'stair' | 'dungeon'

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

            addLinks(links.doorLinks, 'door', doorMarkers, doorIcon, doorPlaneLayers)
            addLinks(links.stairLinks, 'stair', stairMarkers, stairIcon, stairPlaneLayers)
            addLinks(links.dungeonLinks, 'dungeon', dungeonMarkers, dungeonIcon, dungeonPlaneLayers)
        })
        .catch(error => console.error(error))

    const control = L.control.layers(
        undefined,
        {
            "Doors": doorLayer,
            "Stairs": stairLayer,
            "Dungeons": dungeonLayer,
        },
        {collapsed: false}
    )

    map.addControl(control)
}

export function getMarker(type: LinkType, id: number) {
    switch (type) {
        case 'door':
            return doorMarkers[id]
        case 'stair':
            return stairMarkers[id]
        case 'dungeon':
            return dungeonMarkers[id]
    }
}

function addLinks(links: Link[], type: LinkType, markers: L.Marker[], icon: L.Icon, planeLayers: L.LayerGroup[]) {
    links.forEach(link => {
        const marker = L.marker(toLatLng(link.origin), {icon: icon})
        marker.bindPopup(popupString(type, link, type !== 'door'))
        markers.push(marker)
        marker.addTo(planeLayers[link.origin.plane])
    })
}

function toCoordString(position: Position, includePlane: boolean): string {
    return `(${position.x}, ${position.y}${includePlane ? `, ${position.plane}` : ''})`
}

function popupString(type: LinkType, link: Link, includePlane: boolean) {
    return `${type}#${link.id} from ${toCoordString(link.origin, includePlane)} to ${toCoordString(link.destination, includePlane)}`
}

function toLatLng(point: Point) {
    return L.latLng(point.y + 0.5, point.x + 0.5)
}

async function fetchLinks() {
    return fetch('/links.json')
        .then(response => response.json())
        .then(data => data as Links)
        .catch(error => console.error(error))
}