// import './style.css'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import {createComponentsImageLayer} from "./components";
import {createRegionIndicatorLayer} from './region-indicator';
import {createLayerControl} from './layer-control';
import {registerHoveredTile} from "./hovered-tile";
import {initCursor} from "./cursor";

const map = L.map('map', {crs: L.CRS.Simple}).setView([3231.5, 3231.5], 2)

const componentsImageLayer = createComponentsImageLayer();

const regionIndicatorLayer = createRegionIndicatorLayer(map);
map.addLayer(regionIndicatorLayer)

const layerControl = createLayerControl(componentsImageLayer, regionIndicatorLayer)
map.addControl(layerControl)

registerHoveredTile(map)

initCursor()
