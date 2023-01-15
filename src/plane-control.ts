import * as L from 'leaflet'
import {tileUrlTemplate} from "./layer-util";

export let currentPlane = 0

const tileLayers: [string, L.TileLayer][] = [];

export function addTileLayer(name: string, layer: L.TileLayer) {
    tileLayers.push([name, layer]);
}

export function changePlane(plane: number) {
    if (plane === currentPlane) return

    for (const [name, layer] of tileLayers) {
        layer.setUrl(tileUrlTemplate(plane, name), false)
    }

    currentPlane = plane
}