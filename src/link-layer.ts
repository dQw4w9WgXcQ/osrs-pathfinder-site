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

export type Links = {
    doorLinks: DoorLink[]
}

export async function fetchLinks() {
    return fetch('https://raw.githubusercontent.com/dQw4w9WgXcQ/cdn/main/links.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data as Links
        })
        .catch(error => console.error(error))
}

//https://upload.wikimedia.org/wikipedia/commons/4/49/Farm-Fresh_stairs.png
//https://upload.wikimedia.org/wikipedia/commons/d/d4/Farm-Fresh_door_in.png
let stairIcon = L.icon({iconUrl: 'https://oldschool.runescape.wiki/images/thumb/Oak_staircase_built.png/252px-Oak_staircase_built.png?b69b8', iconSize: [32, 32]})
let doorIcon = L.icon({iconUrl: 'https://oldschool.runescape.wiki/images/thumb/Orange_door.png/121px-Orange_door.png?57a96', iconSize: [20, 32]})

export function addLinkLayer(map: L.Map) {
    let doorLayer = L.layerGroup().addTo(map)

    fetchLinks().then(links => {
        links?.doorLinks.forEach(doorLink => {
            let origin = L.latLng(doorLink.origin.y + 0.5, doorLink.origin.x + 0.5)
            let marker = L.marker(origin, {icon: doorIcon})
            marker.bindPopup(`Door ${doorLink.id} from (${doorLink.origin.x}, ${doorLink.origin.y}) to (${doorLink.destination.x}, ${doorLink.destination.y})`)
            marker.addTo(doorLayer)
        })
    })
}