import * as L from 'leaflet'
import {tileUrlTemplate} from "./layer-util";

export const PLANE_COUNT = 4;

export let currentPlane = 0

const tileLayers: [string, L.TileLayer][] = [];

export function addTileLayer(name: string, layer: L.TileLayer) {
    tileLayers.push([name, layer]);
}

export function changePlane(plane: number) {
    if (plane < 0) {
        plane = 0
    }

    if (plane >= PLANE_COUNT) {
        plane = PLANE_COUNT - 1
    }

    if (plane === currentPlane) return

    for (const [name, layer] of tileLayers) {
        layer.setUrl(tileUrlTemplate(plane, name), false)
    }

    currentPlane = plane
}

export function planeUp() {
    changePlane(currentPlane + 1)
}

export function planeDown() {
    changePlane(currentPlane - 1)
}

const PlaneControl = L.Control.extend({
    options: {
        position: "topleft",
    },

    onAdd: function (_: L.Map) {
        let containerName = "leaflet-control-plane";
        let container = L.DomUtil.create("div", `${containerName} leaflet-bar`);

        let upButton = L.DomUtil.create('a', `${containerName}-up`, container)
        upButton.innerHTML = '<div style="cursor:pointer;user-select: none;">▲Z</div>'
        upButton.title = "Plane Up"
        upButton.onclick = () => planeUp()
        L.DomEvent.disableClickPropagation(upButton)

        let downButton = L.DomUtil.create('a', `${containerName}-down`, container)
        downButton.innerHTML = '<div style="cursor:pointer;user-select: none;">▼Z</div>'
        downButton.title = "Plane Down"
        downButton.onclick = () => planeDown()
        L.DomEvent.disableClickPropagation(downButton)

        return container;
    }
});

export function addPlaneControl(map: L.Map) {
    map.addControl(new PlaneControl())
}