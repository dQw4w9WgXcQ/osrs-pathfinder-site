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


        let upButtonEle = L.DomUtil.create('a', `${containerName}-up`, container)
        upButtonEle.innerHTML = '<div style="cursor:pointer;user-select: none;">▲</div>'
        upButtonEle.title = "Plane Up"
        upButtonEle.onclick = () => planeUp()
        L.DomEvent.disableClickPropagation(upButtonEle)

        let downButtonEle = L.DomUtil.create('a', `${containerName}-down`, container)
        downButtonEle.innerHTML = '<div style="cursor:pointer;user-select: none;">▼</div>'
        downButtonEle.title = "Plane Down"
        downButtonEle.onclick = () => planeDown()
        L.DomEvent.disableClickPropagation(downButtonEle)

        L.DomUtil.disableTextSelection();

        return container;
    }
});

export function addPlaneControl(map: L.Map) {
    map.addControl(new PlaneControl())
}