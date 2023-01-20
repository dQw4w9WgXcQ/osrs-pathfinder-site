import * as L from 'leaflet';

export type Point = {
    x: number
    y: number
}

export type Position = {
    x: number
    y: number
    plane: number
}

export type DoorLink = {
    id: number
    origin: Position
    destination: Position
    objectId: number
}

export type StairLink = {
    id: number
    origin: Position
    destination: Position
    objectId: number
    up: boolean
}

export type Links = {
    doorLinks: DoorLink[]
    stairLinks: StairLink[]
}

export async function fetchLinks() {
    return fetch('/links.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data as Links
        })
        .catch(error => console.error(error))
}

let stairIcon = L.icon({iconUrl: '/stair.png', iconSize: [32, 32]})
let doorIcon = L.icon({iconUrl: '/door.png', iconSize: [16, 32]})
let dungeonIcon = L.icon({iconUrl: '/dungeon.png', iconSize: [32, 32]})
let teleportIcon = L.icon({iconUrl: '/teleport.png', iconSize: [32, 32]})

export function addLinkLayer(map: L.Map) {
    let doorLayer = L.layerGroup()
    let stairLayer = L.layerGroup()

    fetchLinks().then(links => {
        links?.doorLinks.forEach(doorLink => {
            let origin = L.latLng(doorLink.origin.y + 0.5, doorLink.origin.x + 0.5)
            let marker = L.marker(origin, {icon: doorIcon})
            marker.bindPopup(`Door#${doorLink.id} from (${doorLink.origin.x}, ${doorLink.origin.y}) to (${doorLink.destination.x}, ${doorLink.destination.y})`)
            marker.addTo(doorLayer)
        })

        links?.stairLinks.forEach(stairLink => {
            let origin = L.latLng(stairLink.origin.y + 0.5, stairLink.origin.x + 0.5)
            let marker = L.marker(origin, {icon: stairIcon})
            marker.bindPopup(`Stair#${stairLink.id} from (${stairLink.origin.x}, ${stairLink.origin.y}, ${stairLink.origin.plane}) to (${stairLink.destination.x}, ${stairLink.destination.y}, ${stairLink.destination.plane})`)
            marker.addTo(stairLayer)
        })
    })

    const layerControl = L.control.layers(
        undefined,
        {
            "Doors": doorLayer,
            "Stairs": stairLayer,
        },
        {collapsed: false}
    )

    layerControl.addTo(map)
}