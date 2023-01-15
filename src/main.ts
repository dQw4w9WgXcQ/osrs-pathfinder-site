import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import {createMapLayer} from "./map-layer";
import {createComponentsLayer} from "./components-layer";
import {createBlockedLayer} from "./blocked-layer";
import {createRegionIndicatorLayer} from './region-indicator-layer';
import {registerHoveredTile} from "./hovered-tile";
import {addPlaneControl} from "./plane";
import {addStartFinishMarkers} from "./start-finish-markers";

const map = L.map('map', {crs: L.CRS.Simple}).setView([3231.5, 3231.5], 2)

const mapLayer = createMapLayer()
const componentsLayer = createComponentsLayer();

const blockedLayer = createBlockedLayer();

const regionIndicatorLayer = createRegionIndicatorLayer(map);

const layerControl = L.control.layers(
    undefined,
    {
        "Contiguous Components": componentsLayer,
        "Blocked Tiles": blockedLayer,
        "Region Indicator": regionIndicatorLayer
    },
    {collapsed: false}
)

map.addLayer(mapLayer)
map.addControl(layerControl)
addPlaneControl(map)

registerHoveredTile(map)
addStartFinishMarkers(map)

document.getElementById("map")!.style.setProperty('cursor', 'url(/cursor-dragon-scimitar.png), auto')