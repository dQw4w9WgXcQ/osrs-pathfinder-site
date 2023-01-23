import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import {addHoveredTile} from "./hovered-tile";
import {addPlaneControl} from "./plane-control";
import {addStartFinishMarkers, INITIAL_FINISH_POSITION, INITIAL_START_POSITION} from "./start-finish-markers";
import {addPathLayer} from "./path-layer";
import {addLinkLayer} from "./link-layer";
import {addTileLayers} from "./tile-layers";
import {requestPath} from "./request-path";
import {pointToLatLng} from "./util";

const map = L.map('map', {crs: L.CRS.Simple})

map.fitBounds(L.latLngBounds(pointToLatLng(INITIAL_START_POSITION), pointToLatLng(INITIAL_FINISH_POSITION)))

document.getElementById('map')?.style.setProperty('cursor', 'url(/cursor-dragon-scimitar.png), auto')

addTileLayers(map)
addHoveredTile(map)
addStartFinishMarkers(map)
addLinkLayer(map)
addPathLayer(map)
addPlaneControl(map)
requestPath({start: INITIAL_START_POSITION, finish: INITIAL_FINISH_POSITION})