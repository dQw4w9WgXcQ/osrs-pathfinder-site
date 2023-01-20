import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import {addHoveredTile} from "./hovered-tile";
import {addPlaneControl} from "./plane-control";
import {addStartFinishMarkers} from "./start-finish-layer";
import {addPathLayer} from "./path-layer";
import {addLinkLayer} from "./link-layer";
import {addTileLayers} from "./tile-layers";

const map = L.map('map', {crs: L.CRS.Simple})
map.setView([3231.5, 3231.5], 2)

document.getElementById("map")?.style.setProperty('cursor', 'url(/cursor-dragon-scimitar.png), auto')

addTileLayers(map)
addHoveredTile(map)
addStartFinishMarkers(map)
addLinkLayer(map)
addPathLayer(map)
addPlaneControl(map)